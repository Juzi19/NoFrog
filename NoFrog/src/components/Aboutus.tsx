import { useEffect } from 'react';
import './Aboutus.css';
import { Helmet } from 'react-helmet';

function Aboutus() {
    useEffect(()=> {
        window.scrollTo(0,0);
    }, [])
  return (
    <>
    <Helmet>
      <title>🐸 Über NoFrog</title>
      <meta name='description' content='Über NoFrog. NoForg ist eine der froschigsten Webdesign Agenturen die der TEich so zu bieten hat. Doch wie viele Frösche sind wirklich hier?'/>
      <meta name='keywords' content='Über Uns, Über NoFrog, Wer ist NoFrog, Webdesign, agentur, Webdevelopment, Webentwicklung, Frösche'/>
    </Helmet>
    <div id='bodyaboutus'>
        <section id='aboutusheadline'><h2>It's all about frogs...</h2></section>
        <section id='aboutustext1'><p>Bei NoFrog Webdesign sitzen keine starren Agentur-Strukturen im Teich, sondern ein quirliges Team von kreativen Fröschen, die mit Sprungkraft und Köpfchen deine Website zum Leben erwecken. Hier arbeitet jeder Frosch Hand in Flosse, um aus deinen Ideen etwas Großartiges zu machen &ndash; flott, effizient und immer bereit, ins nächste Abenteuer zu hüpfen. Und ganz ehrlich, wer will schon ein riesiges Team, wenn man echte Leidenschaft und Herzblut direkt von uns bekommt?</p></section>
        <section id='aboutustext2'><p>Unser Team liebt es, die Dinge frisch und originell zu halten &ndash; keine Teichstandards! Wir hören zu, brainstormen und setzen deine Vision so um, dass deine Website nicht nur top aussieht, sondern auch einen ordentlichen Sprung nach vorn für dein Business macht. Und falls mal ein Frosch daneben quakt? Keine Sorge, mit unserer 100% Geld-zurück-Garantie bleiben nur die besten Sprünge übrig.</p></section>
        <section id='lineargradientyellowblack'></section>
        <section id='team'>
            <h2>Team:</h2>
            <div id='teamcontainer'>
            <div><h3>Justus</h3><p>Mr. Frog & Chief Frog Officer</p></div>
            <img src="./src/assets/Justus.webp" alt="Justus" />
            </div>
            <div id='teamcontainer2'>
            <img src="./src/assets/John.webp" alt="John" />
            <div><h3>John</h3><p>Designer</p></div>
            </div>
            
        </section>
    </div>
    </>
    
  )
}

export default Aboutus