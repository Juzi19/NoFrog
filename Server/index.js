const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); //Paket, welches Daten empfangen von einer anderen Domain(react fronend) erlaubt
const mongoose = require('mongoose');
const Message = require('./Message');
const Math = require('math');
const fs = require('fs');
const https = require('https');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const xss = require('xss');

//Import für Sitemap, welche google beim crawlen der website hilft (seo)
const {SitemapStream, streamToPromise} = require('sitemap');
const { createGzip }= require('zlib');

// justuszimmermann khZ6zQjvuaOH5ZGf;

//Mongo DB  Atlas-Verbindungs-URL
const mongoURI = "mongodb+srv://justuszimmermann:khZ6zQjvuaOH5ZGf@users.pdmct.mongodb.net/Users_Contactform?retryWrites=true&w=majority&appName=Users";

//Stellt Verbindung mit der MongoDB Atlas Verbindungs URL her

mongoose.connect(mongoURI, {
    useNewUrlParser: true, //stellt sicher, dass die Verbindung stabil ist
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Atlas connected!'))
.catch((error) => console.log('Error connecting to MongoDB Atlas:', error));


//SSL Zertifikate einbinden
const privateKey = fs.readFileSync('./https/key.pem', 'utf8');
const certificate = fs.readFileSync('./https/cert.pem', 'utf8');
const credentials =  {key: privateKey , cert: certificate};

//neue express app
const app = express();


//Middleware(wird zwischen request and response ausgeführt)
//Fuer CORS und JSON

app.use(cors()); //Möglichkeit Anfragen von einer anderen Domain empfangen
app.use(express.json()); //Verarbeitet json daten, die von dem CLient gesendet werden

//Test route um Sicherzustellen, dass der Server läuft
app.get('/', (req, res) => {
    res.send(`Server is running: Session: ${Date.now()}`);
});

//Route für Sitemap (SEO)
app.get('/sitemap.xml', async (req, res) => {
    res.header('Content-Type', 'application/xml'); //Client knows that its receiving a xml file
    res.header('Content-Encoding', 'gzip'); //Response will be compressed by using gzip

    const sitemapStream = new SitemapStream({hostname: 'https://nofrog-webdesign.de'}); //Erstellt einen Stream, der eine Sitemap erstellt, der hostname spezifiziert die basis url
    const pipeline = sitemapStream.pipe(createGzip()); //verbindet den stream zu Gzip um ihn zu komprimieren

    //Jede URL die zu der SItemap hinzugefügt werden soll
    sitemapStream.write({ url: '/', changefreq: 'daily', priority: 1.0 });
    sitemapStream.write({ url: '/webdesign', changefreq: 'weekly', priority: 0.8 });
    sitemapStream.write({ url: '/aboutus', changefreq: 'monthly', priority: 0.6 });
    sitemapStream.write({ url: '/contact', changefreq: 'monthly', priority: 0.6 });
    sitemapStream.write({ url: '/yourrequest', changefreq: 'monthly', priority: 0.5 });


    //Finish the sidestream
    sitemapStream.end();

    //Verändert den Sidestream in ein Promise, .then schickt, wenn das promise aufgelöst ist den befehl die sidemap zu erstellen
    streamToPromise(pipeline).then((sm) => {
        fs.writeFileSync('public/sitemap.xml.gz', sm);
    });
    //Schickt Sidemap an den Client, error wird geloggt
    pipeline.pipe(res).on('error', (e) => console.log(e))

});


//Route für das Kontaktformular

app.post('/send-email', async (req, res) => {
    //Wir erwarten, bis der Client (react) die daten schickt
    let {email, message} = req.body;
    const id = Date.now() + Math.round(Math.random()*1000);
    const status = "Request sent";
    if (!validator.isEmail(email)) {
        return res.status(400).json({error: 'Invalid email format'});
      }
    
    message = sanitizeHtml(message);
    message = xss(message);

    //Sichergehen, dass alle Felder ausgefüllt sind

    if (!message || !email || !id || !status){
        return res.status(400).json({error: 'Bitte alle Felder ausfüllen'});
    }
    try {
        //MONGO DB
        //Erstelle eine neue Nachricht/Eintragung
        const newMessage = new Message ({email, message, id, status});
        //Sichere die neue Nachricht
        await newMessage.save();
        console.log("Added/Saved to MongoDB");

        //NODEMAILER
        //Nodemailer Einstellungen für den Email-Versand

        let transporter = nodemailer.createTransport({
            service: 'Gmail', //Gmail als email dienst
            auth: {
                user: 'nofrog.webdesign@gmail.com', //GMial Adresse
                pass: 'rtci otki qjda rxds ', //Passwort
            },
        });

        //E-Mail Konfiguration

        let mailOptions = {
            from: email, //Die Absenderadresse vom Kontaktformular
            to: 'justus.zimmermann@gmx.de', //Empfängeradresse
            subject: `Neue Nachricht von ${email}`,
            text: message, //Der Inhalt

        };

        let mailConfirm = {
            from: 'nofrog.webdesign@gmail.com',
            to: email,
            subject: 'Your NoFrog Request',
            html: `
  <div style="background-color:#8CD2EE; padding: 20px; font-family: Arial, sans-serif;">
    <p style="font-weight: bold; color: black;">
      Thank you so much for your message. We will get in touch with you as soon as possible! 🐸
    </p>
    <p style="color: black;">
      To see any changes in the status of your request, you can check your request on our website: ${id}
    </p>
    <p style="color: black;">
      Your Message: ${message}
    </p>
    <p style="color: black; font-size: 12px;">
      This message was created automatically. Please do not reply. We will reach you out as soon as possible.
    </p>
  </div>
`
        }
        
        //Versende die Mail

        let info = await transporter.sendMail(mailOptions);
        let autoconfirm = await transporter.sendMail(mailConfirm);

        console.log('E-Mail gesendet' + info.response + autoconfirm.response);
        console.log("Erfolgreich gesendet");
        res.status(200).json({success: 'E-Mail & Message erfolgreich gesendet'});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: 'Fehler beim Senden der Mail/Message'});
    }
});

//Route für den Statuscheck von dem Requestid

app.post('/requestid', async (req, res) => {
    const {id} = req.body;

    if (!id) {
        return res.status(400).json({error: 'Bitte alle Felder ausfüllen'});
    }
    try {
        //Fragt den passenden Datensatz in der MongoDB Datenbank nach
        Message.findOne({ id: id }) //sucht nach dem User mit der id innerhalb des message schemas
        .then(user => {
            console.log('Gefundener Benutzer:', user);
            console.log('Sending data to the frontend');
            return res.status(200).json(user);  //beantwortet die anfrage und schickt daten an das frontend
        })
        .catch(err => {
            console.error('Fehler beim Abrufen des Benutzers:', err);
        });
    }
    catch(error) {
        return res.status(500).json({error: `Internal error occured at: ${error}`})
    }
});


//PORT
const PORT = process.env.PORT||443;

const httpsServer = https.createServer(credentials, app);

//Startet den Server

httpsServer.listen(PORT, () => {
    console.log(`Https Server läuft auf Port ${PORT}`);
});

