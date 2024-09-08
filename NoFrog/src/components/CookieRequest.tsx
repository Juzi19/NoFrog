import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CookieRequest.css';

function CookieRequest() {
    const [answerCookie, setAnswerCookie] = useState(false); // Popup wird beim ersten Rendern angezeigt
    const [cookiesAllowed, setCookiesAllowed] = useState(false); // Zustand für erlaubte Cookies

    useEffect(() => {
        // Überprüfen, ob ein Cookie vorhanden ist
        const activeCookies = document.cookie;
        if (activeCookies === "") {
            setAnswerCookie(true); // Zeige das Popup, wenn keine Cookies gesetzt sind
        } else {
            setAnswerCookie(false); // Verstecke das Popup, wenn Cookies schon akzeptiert oder abgelehnt wurden
        }
    }, []);

    function acceptCookies() {
        setCookiesAllowed(true); // Cookies erlaubt
        setAnswerCookie(true); // Popup schließen
        document.cookie = "cookiesAllowed=true"; // Setzt einen Cookie
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
