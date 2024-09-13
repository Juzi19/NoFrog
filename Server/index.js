const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); //Paket, welches Daten empfangen von einer anderen Domain(react fronend) erlaubt

//neue express app
const app = express();

const PORT = process.env.PORT||5000;

//Middleware(wird zwischen request and response ausgeführt)
//Fuer CORS und JSON

app.use(cors()); //Möglichkeit Anfragen von einer anderen Domain empfangen
app.use(express.json()); //Verarbeitet json daten, sie von dem CLient gesendet werden

//Test route um Sicherzustellen, dass der Server läuft

app.get('/', (req, res) => {
    res.send('<h1>Server is running </h1>');
});

//Route für das KOntaktformular

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
                user: 'mylogindata@gmail.com', //GMial Adresse
                pass: 'mypassword', //Passwort
            },
        });

        //E-Mail Konfiguration

        let mailOptions = {
            from: email, //Die Absenderadresse vonm KOntaktformular
            to: 'ziel@email.com', //Empfängeradresse
            subject: `Neue Nachricht von ${email}`,
            text: message, //Der Inhalt

        };
        
        //Versende die Mail

        let info = await transporter.sendMail(mailOptions);

        console.log('E-Mail gesendet' + info.response);
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

