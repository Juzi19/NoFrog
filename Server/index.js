const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); //Paket, welches Daten empfangen von einer anderen Domain(react fronend) erlaubt
const mongoose = require('mongoose');
const Message = require('./Message');
const Math = require('math');

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



//neue express app
const app = express();

const PORT = process.env.PORT||5000;

//Middleware(wird zwischen request and response ausgeführt)
//Fuer CORS und JSON

app.use(cors()); //Möglichkeit Anfragen von einer anderen Domain empfangen
app.use(express.json()); //Verarbeitet json daten, die von dem CLient gesendet werden

//Test route um Sicherzustellen, dass der Server läuft

app.get('/', (req, res) => {
    res.send(`Server is running`);
});

//Route für das Kontaktformular

app.post('/send-email', async (req, res) => {
    //Wir erwarten, bis der Client (react) die daten schickt
    const {email, message} = req.body;
    const id = Date.now() + Math.round(Math.random()*1000);
    const status = "Request sended";


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
            html: `Thank you so much for your message. We will get in touch with you as soon as possible! 🐸 To see any changes in the status of your request, you can check your request on our website: ${id} <br><br> Your Message: ${message} <br><br> This message was created automatically. Please do not reply. We will reach you out as soon as possible.`
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




//Startet den Server

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

