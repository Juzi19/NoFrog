import { useEffect, useState } from 'react'
import './Webdesign.css'
import Contactform from './Contactform';
import { Helmet } from 'react-helmet';

function Webdesign() {
    const [headline1visble, setHeadline1Visible] = useState(true);
    const [headline2visble, setHeadline2Visible] = useState(false);
    const [headline3visble, setHeadline3Visible] = useState(false);
    const [backgroundcolorwhite , setBackGroundCOlorWHite] = useState(false);
    
    function OnScroll () {
        const scrollPosition = window.scrollY;

        if (scrollPosition  < 25) {
            setHeadline1Visible(true);
            setHeadline2Visible(false);
        }
        else if (scrollPosition < 475 && scrollPosition > 25) {
            setHeadline2Visible(true);
            setHeadline1Visible(false);
            setHeadline3Visible(false);
        }
        else if (scrollPosition < 925 && scrollPosition > 475) {
            setHeadline3Visible(true);
            setHeadline2Visible(false);
        }
        else if (scrollPosition < 1500 && scrollPosition > 925) {
            setHeadline3Visible(false);
            setBackGroundCOlorWHite(false);
        }
        else if (scrollPosition > 2500) {
            setBackGroundCOlorWHite(true);
        }

    }
    useEffect (() => {
        window.addEventListener('scroll', OnScroll);
        window.scrollTo(0, 0);


        return (() => 
        window.removeEventListener('scroll', OnScroll)
        )
    },[])


  return (
    <>
    <Helmet>
        <title>🐸 NoFrog | Webdesign</title>
        <meta name='description' content='NoFrog Webdesign ist einzigartig, schnell, effizient und auf Ihre Bedürfnisse zugeschnitten'/>
        <meta name='keywords' content='NoFrog, Webdesign, Arbeit, Web, Webdevelopement, INternetdesign, Webentwicklung, schnelles Webdesign, schnelle Webentwicklung, einzigartig, einzigartige Webentwicklung, Einzigartigkeit'/>
    </Helmet>
    <div id='bodywebdesign'>
        
        <section id={`${backgroundcolorwhite ? 'whitewebdesignheader' : 'webdesignheader2'}`}>
            <h2 className={`${headline1visble ? 'visibletransition' : 'notvisibletransition'}`}>nofrog Webdesign</h2>
            <img id='frogimage' className={`${headline2visble ? 'visibletransition' : 'notvisibletransition'}`} src="src/assets/frog.png" alt="NoFrog Frog" />
            <h2 className={`${headline3visble ? 'visibletransition' : 'notvisibletransition'}`} >Schnelligkeit, Einzigartigkeit und deine Ideen im Fokus</h2>
        </section>
        <section id='scrolldown3'></section>
        <section id='webdesigntext1'>
            <div>
            <p>Du willst nicht nur irgendeine Website &ndash; du willst <span>deine</span> Website. Bei <span>NoFrog Webdesign</span> bekommst du genau das. <br /> In nur <span>20 Tagen</span> liefern wir dir eine einzigartige Website, die schnell, professionell und zu 100% auf deine Bedürfnisse zugeschnitten ist. <br /> <span>Aber das Beste daran? </span> Du bist von Anfang an <span>Teil des Prozesses.</span>
            </p>
            </div>
            <img src="src/assets/picture_1.webp" alt="Glühbirne_aus" />
        </section>
        <section id='webdesigntext2'>
        <img src="src/assets/keyboard.webp" alt="Keyboard" />

            <div>
                <p>
                    Deine Ideen, deine Vision, deine Wünsche &ndash; bei uns spielen sie die Hauptrolle. Du hast konkrete Vorstellungen oder besondere Anforderungen? Kein Problem! Wir arbeiten eng mit dir zusammen und setzen deine Ideen so um, dass deine Website nicht nur <span>schnell fertig</span> ist, sondern auch wirklich <span>dich</span> und dein Unternehmen widerspiegelt. <span>Keine Standardlösungen</span>, sondern maßgeschneidertes Webdesign, das so einzigartig ist wie du selbst.
                </p>
            </div>
        </section>
        <section id='webdesigntext3'>
            <div>
                <p>
                Und das Beste: Unsere Designs sind nicht nur schön anzusehen, sondern auch darauf ausgelegt, dein <span>Business voranzubringen</span>. Durch gezielte Optimierung und ansprechendes Design sorgen wir dafür, dass deine Website nicht nur Besucher anzieht, sondern auch <span>Conversion-Raten steigert</span>  und <span>dein Geschäftswachstum </span>fördert.
                </p>
            </div>
            <img src="src/assets/succes.webp" alt="Wachstum" />
        </section>
        <section id='webdesigntext4'>
            <img src="src/assets/money.webp" alt="Geld" />
            <div><p>
                Solltest du am Ende nicht zufrieden sein, bieten wir dir eine <span>100% Geld-zurück-Garantie</span> &ndash; bis zum letzten Schritt. Dein Risiko ist gleich null. Einfach und unkompliziert.
            </p></div>
        </section>
        <section id='clients'>
            <div><p>Ich hatte viele Ideen, wusste aber nicht, wie ich sie umsetzen sollte. NoFrog hat nicht nur alles super schnell realisiert, sondern meine Vision perfekt getroffen. Seit dem Launch haben sich meine Umsätze deutlich erhöht! &ndash; Lisa K.
            </p></div>
        </section>
        <section id='pricing'>
            <div><p>
                Bei NoFrog erhältst du <span>hochwertiges Webdesign</span>, das seine Kosten wert ist. Wir bieten exklusive Lösungen, die nicht nur dein <span>Budget respektieren</span>, sondern auch sicherstellen, dass du die beste Qualität erhältst.
            </p></div>
            <img src="src/assets/business.webp" alt="Tinte" />
        </section>
        <section id='endtext'>
            <p>            Bereit, deine Online-Präsenz zu verbessern? Lass uns quatschen!
            </p>
        </section>
        <section id='bluebackground'></section>
        <Contactform></Contactform>
    </div>
    </>
    
  )
}

export default Webdesign