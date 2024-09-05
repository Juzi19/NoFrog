import { useEffect, useState } from 'react'
import './Webdesign.css'

function Webdesign() {
    const [headline1visble, setHeadline1Visible] = useState(true);
    const [headline2visble, setHeadline2Visible] = useState(false);
    const [headline3visble, setHeadline3Visible] = useState(false);

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

    }
    useEffect (() => {
        window.addEventListener('scroll', OnScroll)

        return (() => 
        window.removeEventListener('scroll', OnScroll)
        )
    },[])


  return (
    <div id='bodywebdesign'>
        <section id='webdesignheader2'>
            <h2 className={`${headline1visble ? 'visibletransition' : 'notvisibletransition'}`}>nofrog Webdesign</h2>
            <img className={`${headline2visble ? 'visibletransition' : 'notvisibletransition'}`} src="src/assets/frog.png" alt="NoFrog Frog" />
            <h2 className={`${headline3visble ? 'visibletransition' : 'notvisibletransition'}`} >Schnelligkeit, Einzigartigkeit und deine Ideen im Fokus</h2>
        </section>
        <section id='scrolldown3'></section>
        <section id='webdesigntext1'>
            <p>Du willst nicht nur irgendeine Website &ndash; du willst <span>deine</span> Website. Bei <span>NoFrog Webdesign</span> bekommst du genau das. In nur <span>20 Tagen</span> liefern wir dir eine einzigartige Website, die schnell, professionell und zu 100% auf deine Bedürfnisse zugeschnitten ist. Aber das Beste daran? Du bist von Anfang an Teil des Prozesses.
            </p>
        </section>
        <section id='webdesigntext2'>
                Deine Ideen, deine Vision, deine Wünsche &ndash; bei uns spielen sie die Hauptrolle. Du hast konkrete Vorstellungen oder besondere Anforderungen? Kein Problem! Wir arbeiten eng mit dir zusammen und setzen deine Ideen so um, dass deine Website nicht nur schnell fertig ist, sondern auch wirklich dich und dein Unternehmen widerspiegelt. Keine Standardlösungen, sondern maßgeschneidertes Webdesign, das so einzigartig ist wie du selbst.
        </section>
        <section id='webdesigntext3'>
            Und das Beste: Unsere Designs sind nicht nur schön anzusehen, sondern auch darauf ausgelegt, dein Business voranzubringen. Durch gezielte Optimierung und ansprechendes Design sorgen wir dafür, dass deine Website nicht nur Besucher anzieht, sondern auch Conversion-Raten steigert und dein Geschäftswachstum fördert.
        </section>
        <section id='Webdesigntext4'>
            Solltest du am Ende nicht zufrieden sein, bieten wir dir eine 100% Geld-zurück-Garantie &ndash; bis zum letzten Schritt. Dein Risiko ist gleich null. Einfach und unkompliziert.
        </section>
        <section id='clients'>
            Unsere Kunden sagen es am besten: "Ich hatte viele Ideen, wusste aber nicht, wie ich sie umsetzen sollte. NoFrog hat nicht nur alles super schnell realisiert, sondern meine Vision perfekt getroffen. Seit dem Launch haben sich meine Umsätze deutlich erhöht!" &ndash; Lisa K.
        </section>
        <section id='pricing'>
            Bei NoFrog erhältst du hochwertiges Webdesign, das seine Kosten wert ist. Wir bieten exklusive Lösungen, die nicht nur dein Budget respektieren, sondern auch sicherstellen, dass du die beste Qualität erhältst.
        </section>
        <section id='endtext'>
            Bereit, deine Online-Präsenz zu verbessern? Lass uns quatschen!
        </section>


    </div>
  )
}

export default Webdesign