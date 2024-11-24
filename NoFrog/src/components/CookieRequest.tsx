import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieRequest.css';

//Might work on the cookie banners style and consider letting it drop in after a catching a glimpse

function CookieRequest() {
    const [answerCookie, setAnswerCookie] = useState(false); // Popup wird beim ersten Rendern angezeigt
    const [cookiesAllowed, setCookiesAllowed] = useState(false); // Zustand für erlaubte Cookies

    useEffect(() => {
        // Überprüfen, ob der Cookie 'cookiesAllowed' vorhanden ist
        const activeCookies = document.cookie
            .split('; ')
            .find(row => row.startsWith('cookiesAllowed='));
        
        if (!activeCookies) {
            setAnswerCookie(true); // Zeige das Popup, wenn der Cookie nicht existiert
        } else {
            setAnswerCookie(false); // Verstecke das Popup, wenn der Cookie bereits gesetzt ist
        }
    }, []);

    function acceptCookies() {
        setCookiesAllowed(true); // Cookies erlaubt
        setAnswerCookie(true); // Popup schließen
        if (cookiesAllowed === true){
            document.cookie = "cookiesAllowed=true; max-age=31536000"; // Setzt Cookie für ein Jahr
        }
    }

    function denyCookies() {
        setCookiesAllowed(false); // Cookies nicht erlaubt
        setAnswerCookie(true); // Popup schließen
    }

    return (
        <div id={`${answerCookie ? 'invisible' : 'cookies'}`}>
            <div id="firstdiv">
                <div>
                    <h2>Verwendung von Cookies</h2>
                    <p>Diese Website verwendet Cookies, um Ihre Benutzererfahrung zu verbessern. Einige Cookies sind essenziell für den Betrieb der Website, während andere uns helfen, Ihr Nutzerverhalten zu analysieren und unsere Services zu optimieren. Indem Sie unsere Website weiterhin nutzen, stimmen Sie der Verwendung von Cookies zu. Weitere Informationen finden Sie in unserer <Link to="/dataguidelines">Datenschutzerklärung</Link>.</p>
                </div>
                <div>
                    <button onClick={acceptCookies}>Akzeptieren</button>
                    <button onClick={denyCookies}>Ablehnen</button>
                </div>
            </div>
        </div>
    );
}

export default CookieRequest;
