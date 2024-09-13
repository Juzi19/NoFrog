const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); //Paket, welches Daten empfangen von einer anderen Domain(react fronend) erlaubt

//neue express app
const app = express();

const PORT = process.env.PORT||5000;

//Middleware(wird zwischen request and response ausgeführt)
//Fuer CORS und JSON

app.use(cors()); //Möglichkeit Anfragen von einer anderen Domain empfangen
app.use(express.json()); //Verarbeitet json daten, die von dem CLient gesendet werden

//Test route um Sicherzustellen, dass der Server läuft

app.get('/', (req, res) => {
    res.send('<h1>Server is running </h1>');
});

//Route für das Kontaktformular

app.post('/send-email', async (req, res) => {
    //Wir erwarten, bis der Client (react) die daten schickt
    const {email, message} = req.body;

    //Sichergehen, dass alle Felder ausgefüllt sind

    if (!message || !email){
        return res.status(400).json({error: 'Bitte alle Felder ausfüllen'});
    }
    try {
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
            html: `Thank you so much for your message. We will get in touch with you as soon as possible!🐸 <br><br> Your Message: ${message} <br><br> This message was created automatically. Please do not reply. We will reach you out as soon as possible.`
        }
        
        //Versende die Mail

        let info = await transporter.sendMail(mailOptions);
        let autoconfirm = await transporter.sendMail(mailConfirm);

        console.log('E-Mail gesendet' + info.response + autoconfirm.response);
        console.log("Erfolgreich gesendet");
        res.status(200).json({success: 'E-Mail erfolgreich gesendet'});
    }
    catch(error) {
        console.log(error);
        res.status(500).json({error: 'Fehler beim Senden der Mail'});
    }
})


//Startet den Server

app.listen(PORT, () => {
    console.log(`Server läuft auf Port ${PORT}`);
});

