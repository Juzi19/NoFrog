import { useEffect, useState } from 'react';
import './YourRequest.css';
import { Helmet } from 'react-helmet';


function YourRequest() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  //use Effect Hook nach oben bei reoad zu scrollen

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  //Input wird geleert, sobald eine ID zur Anfrage eingegeben wurde
  const clearinput = () => {
    const element = document.getElementById('users_id') as HTMLInputElement;
    if (element) {
      element.value = ''; // oder als Zahl: element.value = 0 (aber als string ist es sicherer)
    }
  };
  //Daten werden im Text angezeigt, abhängig vom Zustand der Bearbeitung
  const showData = (data: string, message: string) => {
    console.log(data);
    switch (data) {
      case 'Request sent':
        setText1('Status: Ihre Nachricht wurde erfolgreich an NoFrog 🐸 übermittelt. Wir werden Ihnen innerhalb der nächsten 24 Stunden antworten!');
        break;
      case 'Message read':
        setText1('Status: Ihre Nachricht wurde Mr Frog 🐸 gelesen. Wir setzen uns schnellstmöglich mit Ihnen in Kontakt!');
        break;
      case 'Finished':
        setText1('Status: Mr. Frog 🐸 hat Ihnen geantwortet! Überprüfen Sie auch den Spam-Ordner, falls die Nachricht nicht im Posteingang erscheint!');
        break;
      case 'nodata':
        setText1('Keine Daten gefunden! Bitte Überprüfen Sie die ID');
        break;
      default:
        setText1('Status: Kein Tracking. Wir haben Ihre Nachricht erhalten und wir werden demnächst antworten. 🐸');
        break;
    };
    setText2(`Ihre Nachricht: "${message}"`);
    
  };
 //REact Hook für die ID, von welcher der Status angefragt wird
  const [requestid, setRequestId] = useState({
    id: 0
  });
  //Bei Veränderung im Input feld
  function handleChange (e: any) {
    setRequestId({
      ...requestid, //bestehende Daten behalten
      [e.target.name]: e.target.value //ID Überschreiben
  }); //Requestid nimmt wert des inputs an
  }

  //Daten an den Server senden
  async function handleSubmit (e:any) {
    e.preventDefault(); // Verhindert, dass die Seite beim Absenden neu geladen wird

    if (requestid.id === 0) {
      console.log("Bitte neuen Wert eingeben");
      return;
    } 
    console.log(`is submitting: ${requestid}`);
      
    try {
      //Url für deployement: /api/requestid
      const response = await fetch('https://localhost:443/requestid', {
        method: 'POST', //Sendet Daten mit der POST-Methode
        headers: {
            'Content-Type':'application/json', //Wir teilen dem Server mit, dass wir JSON Daten schicken
        },
        body: JSON.stringify(requestid) //Wandelen die Formulardaten in JSON um und schicken sie
      });
      const data = await response.json(); //wartet auf antwort vom server
      if (response.ok) { //wenn antwort ok
        setRequestId({id: 0});
        if(data === null){
          console.log('ID nicht gefunden');
          showData('nodata', '---')
          clearinput();
        }
        else {
          showData(data.status, data.message);
          clearinput();
        }

    } else {
        console.log(data.error ||'Fehler beim Senden der Daten'); //Fehlermeldung
    }
    }
    catch(error) {
      console.log(error); //Fehlermeldung
    }

  }
 
  return (
    <>
    <Helmet>
      <title>🐸 NoFrog Anfragen Status</title>
      <meta name='description' content='NoForg Anfragen Status, Überprüfen Sie den Status Ihrer NoForg Anfrage'/>
      <meta name='keywords' content='Status, Anfrage, NoFrog, MrFrog, Abfragen'/>
    </Helmet>
    <div id='requestbody'>
      <h1>NoFrog Anfragen Status</h1>
      <p>Geben Sie hier Ihre Anfragen ID ein, um den Status zu sehen
      </p>
      <div id='form'>
        <form onSubmit={handleSubmit}>
        <input type="number" name="id" id="users_id" onChange={handleChange}/>
        <button type='submit'>Los</button>
      </form>
      </div>
      <hr />
      <div>
        <p id='text11'><span>{text1}</span></p>
        <p>{text2}</p>
      </div>
    </div>
    </>
    
  )
}

export default YourRequest