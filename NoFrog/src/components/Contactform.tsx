import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';


function Contactform() {
    //React Hooks für das Styling der Progress bar

    const [progressvisible, setProgressvisible] = useState(false);

     //React Hook um den Eingabewert  zu speichern

     const [formData, setFormData] = useState ({
        email: '',
        message: ''
    });
    //Zustand für Erfolgsmeldungen
    const [status, setStatus] = useState('');
    const [csrfToken, setcsrfToken] = useState('');
    //Ändeurng im Contact form

    function handleChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const cleanMessage = DOMPurify.sanitize(e.target.value);
        setFormData ({
            ...formData, //Wir behalten bestehende Daten
            [e.target.name]: cleanMessage //aktualisieren das Feld, das sich verändert hat
        });
    };

    //Funktion für Änderung in der Progress bar

    async function changeProgressbar () {
        setProgressvisible(true);
        // Hide the progress bar after animation
        await new Promise(resolve => setTimeout(resolve, 10000));
        setProgressvisible(false);
    }

    //Diese Funktion wird aufgerufen, sobald das FOrmular abgesendet wird

    async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); //Verhindert, dass die Seite beim Absenden neu geladen wird

        //Schicke die Daten an das Backend

        try {
            const response = await fetch('https://localhost:5000/send-email', {
                method: 'POST', //Sendet Daten mit der POST-MEthode
                headers: {
                    'Content-Type':'application/json', //Wir teilen dem Server mit, dass wir JSON Daten schicken
                    'x-csrf-token': csrfToken, // Der Token wird im Header gesendet
                },
                credentials: 'include',
                body: JSON.stringify(formData) //Wandelen die Formulardaten in JSON um und schicken sie 
            });

            const data = await response.json(); //Antwort vom Server lesen

            if (response.ok) {
                setStatus('E-Mail gesendet!'); //Erfolgsmeldung
                setFormData({email: '', message: ''});
                changeProgressbar();

            } else {
                setStatus(data.error || 'Fehler beim Senden der EmAil'); //Fehlermeldung
            }
        } catch (error) {
            console.log('Fehler:', error);
            setStatus('Fehler beim Senden der Email');
        }
    };

    //Nachricht wird auf Button click unsichtbar
    const invisbleMessage = () => {
        setProgressvisible(false);
    }
    async function fetchCsrfToken() {
        //const response = await fetch('api/csrf-token');
        const response = await fetch('https://localhost:5000/csrf-token', {
            method: 'GET',
            credentials: 'include',
        });
        if (!response.ok) {
            console.log("Fehler beim Anfordern des csrf token")
        }
        const data:any = await response.json();
        return data.csrfToken;
    }
    function setCsrfToken(token:string){
        setcsrfToken(token);
    }

    useEffect(()=>{
        async function getToken() {
            const token = await fetchCsrfToken();
            setCsrfToken(token);
        }
        getToken();
    }, []);

  return (
    <>

    <section id="contactform">
            <form onSubmit={handleSubmit}>
            <input type="hidden" name="csrfToken" value={csrfToken} />
                <div id="form">
                    <div>
                    <label htmlFor="email">Email:&nbsp;</label>
                    <input type="email" name='email' value={formData.email} onChange={handleChange} required id="email" placeholder="mrfrog@nofrog-webdesign.de" />
                    </div>
                    <div>
                    <label htmlFor="message">Nachricht:&nbsp;</label>
                    <textarea  name='message' value={formData.message} onChange={handleChange} required id="message" placeholder="Quack!" />
                    </div>
                    <div>
                    <input type="submit" value="Absenden" />
                    </div>
                </div>
            </form>
            <div id='onsendresponse' className={`${progressvisible ? 'visible' : 'notvisible'}`}>
                <div>
                    <h1> {status} </h1>
                    <button onClick={invisbleMessage}>&#10006;</button>
                </div>
            </div>
        </section></>
  )
}

export default Contactform