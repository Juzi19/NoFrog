import {  useEffect, useRef, useState } from 'react'
import './Home.css'
import { Link } from 'react-router-dom';
import Contactform from './Contactform';


function Home() {
  //Start Code text Animation
  //Const text visible
  const [headline1visible, setheadline1visible] = useState(true);
  const [headline2visible, setheadline2visible] = useState(false);
  const [headline3visible, setheadline3visible] = useState(false);

  function handleScroll () {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 425) {
    setheadline1visible(false);
    setheadline2visible(false);
    setheadline3visible(true);
  } else if (scrollPosition > 25) {
    setheadline1visible(false);
    setheadline2visible(true);
    setheadline3visible(false);
  } else {
    setheadline1visible(true);
    setheadline2visible(false);
    setheadline3visible(false);
  }
  }

  
  useEffect (()=>{
    window.addEventListener('scroll', handleScroll);
    window.scrollTo(0, 0);


    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  //End Code text animation


  //Start Canvas animation Kreis

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circleSize, setCircleSize] = useState(10); // Initiale Größe des Kreises
  const [circlevisible, setCircleVisible] = useState(false);
  const [greenvisible, setGreenVisible] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [scrollPosition1, setScrollPosition1] = useState(0);
  const [samplesfixed, setSamplesFixed] = useState(false);
  const [nofrogisfastvisible, setNoFOrgIsFastVIsible] = useState(false);
  const [text1visible, setText1Visible] = useState(false);
  const [text2visible, setText2Visible] = useState(false);
  const [text3visible, setText3Visible] = useState(false);
  const [happyfrogrelative, setHappyFrogRelative] = useState(true);
  const [happyfrogtext1visible, setHappyFrogText1Visible] = useState(false);
  const [happyfrogtext2visible, setHappyFrogText2Visible] = useState(false);
  const [happyfrogtext3visible, setHappyFrogText3Visible] = useState(false);
  const [backgroundcolorgrey, setBackGroundColorGrey] = useState(false);

  const handleScroll2 = () => {
    if (canvasRef.current) {
      const scrollPosition = window.scrollY;
      //scrolldown animations
      if(scrollPosition > 850 && scrollPosition < 1400) {
        const newSize = Math.min((scrollPosition)-840); // Die Größe des Kreises wird basierend auf der Scroll-Position angepasst
        setCircleSize(newSize);
        setCircleVisible(true);
        setGreenVisible(false);
      }
      else if (scrollPosition < 850){
        const newSize = Math.min(10); // Die Größe des Kreises wird basierend auf der Scroll-Position angepasst
        setCircleSize(newSize);
      }
      //beenden der canva animation
      else if (scrollPosition > 1400 && scrollPosition < 1600){
        setCircleVisible(false);
        setGreenVisible(true);
        setTextVisible(false);
                
      }

      else if(scrollPosition > 1600 && scrollPosition < 2904)  {
        setTextVisible(true);
        setSamplesFixed(false);

      }
      else if (scrollPosition > 2904 && scrollPosition < 3100){
        setSamplesFixed(true);
        setScrollPosition1(0);
      }
      else if (scrollPosition > 3100 && scrollPosition < 4000){
        setScrollPosition1(scrollPosition - 3100);
        setNoFOrgIsFastVIsible(false);
        

      }
      else if(scrollPosition > 4000 && scrollPosition < 4450) {
        setNoFOrgIsFastVIsible(true);
        setText1Visible(false);
        
      }
      else if(scrollPosition > 4450 && scrollPosition < 4900) {
        setText1Visible(true);
        setText2Visible(false);
      }
      else if(scrollPosition > 4900 && scrollPosition < 5350) {
        setText1Visible(false);
        setText2Visible(true);
        setText3Visible(false);
      }
      else if(scrollPosition > 5350 && scrollPosition < 5800) {
        setText1Visible(false);
        setText2Visible(false);
        setText3Visible(true);
        setNoFOrgIsFastVIsible(true);
      }
      else if (scrollPosition > 5800 && scrollPosition < 6645) {
        setNoFOrgIsFastVIsible(false);
        setHappyFrogRelative(true);
      }
      else if(scrollPosition > 6645 && scrollPosition < 7100) {
        setHappyFrogRelative(false);
        setHappyFrogText1Visible(false);

      }
      else if(scrollPosition > 7100 && scrollPosition < 7550) {
        setHappyFrogRelative(false);
        setHappyFrogText1Visible(true);
        setHappyFrogText2Visible(false);
      }
      else if(scrollPosition > 7550 && scrollPosition < 8000) {
        setHappyFrogText1Visible(false);
        setHappyFrogText2Visible(true);
        setHappyFrogText3Visible(false);
      }
      else if(scrollPosition > 8000 && scrollPosition < 8450) {
        setHappyFrogText2Visible(false);
        setHappyFrogText3Visible(true);
      }
      else if(scrollPosition > 8450 && scrollPosition < 8900) {
        setHappyFrogText3Visible(false);
      }
      else if(scrollPosition >8900 && scrollPosition < 9300) {
        setBackGroundColorGrey(false);
      }
      else if (scrollPosition > 9300) {
        setBackGroundColorGrey(true);
        console.log("backgound grey")
      }
      


    }
  };



  useEffect(() => {
    window.addEventListener('scroll', handleScroll2);

    // Cleanup-Funktion zum Entfernen des Event-Listeners
    return () => {
      window.removeEventListener('scroll', handleScroll2);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    
    if (ctx) {
      // Canvas und Kontext zurücksetzen
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Zeichne den grünen Punkt
      ctx.fillStyle = '#98FF98';
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, circleSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [circleSize]); // Der Effekt wird ausgeführt, wenn die Größe des Kreises sich ändert


  //black canvas animation 

  
  const blackCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    console.log(scrollPosition1)
    const canvas2 = blackCanvasRef.current;
    if (!canvas2) return;
    const ctx2 = canvas2?.getContext('2d');
    if (!ctx2) return;

    canvas2.width = window.innerWidth;
    canvas2.height = window.innerHeight * 0.88;

    const rectWidth = canvas2.width / 5;
    const rectHeight = scrollPosition1;
    console.log("start drawing")
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height)


    ctx2.fillStyle = 'black';
    console.log("rectangel height" + rectHeight)
    
    ctx2.beginPath();

    ctx2.fillRect(0, 0, rectWidth + 1, rectHeight);
    ctx2.fillRect(rectWidth, canvas2.height, rectWidth +1 , -rectHeight);
    ctx2.fillRect(rectWidth * 2, 0, rectWidth + 1, rectHeight);
    ctx2.fillRect(rectWidth * 3, canvas2.height, rectWidth + 1, -rectHeight);
    ctx2.fillRect(rectWidth * 4, 0, rectWidth + 1, rectHeight);

    ctx2.fill();

    
  }, [scrollPosition1]);


  return (
    <>
    <section id='landing'>
        <div className='h1textcontainer' id={`${headline1visible ? 'headline1visible' : 'headline1notvisible'}`}><h1>Ihre <span>Website</span> ist die <span>digitale Visitenkarte.</span></h1></div>
        <div className='h1textcontainer' id={`${headline2visible ? 'headline2visible' : 'headline2notvisible'}`}><h1><span>Perfekt</span> gestaltet, gewinnt sie <span>Kunden.</span></h1></div>
        <div className='h1textcontainer' id={`${headline3visible ? 'headline3visible' : 'headline3notvisible'}`}><h1>Alles <span>andere</span> lässt sie <span>gehen.</span></h1></div>
      <img src="src/assets/business_card.png" alt="Visitenkarte" className='businesscard'/> 
      <canvas 
        ref={canvasRef} 
        width={window.innerWidth} 
        height={window.innerHeight} 
        id='circlecanvas'
        className={`${circlevisible ? 'visible' : 'notvisible'}`}
      /> 
    </section>
    <section id='greenbackground' className={`${greenvisible ? 'visible' : 'notvisible'}`}>
      <div className={`${textVisible ? 'visibletransition' : 'notvisibletransition'}`}>
        <del>durchschnittlich</del>
        <p>einzigartig.</p>
      </div>
      
    </section>
    <section id='scrolldown'></section>
    <section id='samples' className={`${samplesfixed ? 'samplesfixed' : 'samplesrelative'}`}>
      <div id='samplestext'>
          <div>
            <h2>Einzigartig sein ist keine Option</h2>
            <h2>Es ist ein Muss.</h2>
          </div>
          <div>
            <p>Bei nofrog erschaffen wir Websites, die nicht nur ins Auge fallen, sondern auch einzigartig sind.</p>
            <p>Zusammen erstellen wir Ihre Website mit echtem Code - kein stadarisiertes Wordpress.</p>
            <p>Ihr Online Auftritt wird nicht nur überzeugen, sondern in Erinnerung bleiben.</p>
            <p>Sie sind einzigartig - wird es Ihre Website auch?</p>

          </div>
        </div>
    </section>
    <section id='furtherscrolldown'></section>
    <section id='blackcanvassection'>
       <canvas ref={blackCanvasRef} id='blackcanvas'></canvas>
    </section>
    <section id='nofrogisfast'className={`${nofrogisfastvisible ? 'visibletransition' : 'notvisibletransition'}`}>
      <div >
      <h2 className={`${text1visible ? 'visibletransition' : 'notvisibletransition'}`}>Geschwindigkeit.</h2>
      <p className={`${text2visible ? 'visibletransition' : 'notvisibletransition'}`}>In nur <span>20</span> Tagen von der Idee zur beeindruckenden Website &ndash;
      Mit NoFrog Webdesign profitieren Sie von blitzschneller Umsetzung, ohne Abstriche bei Qualität und Design.</p>
      <p className={`${text3visible? 'visibletransition' : 'notvisibletransition'}`}>So gewinnen Sie schneller neue Kunden, bleiben der Konkurrenz voraus und können sich voll und ganz auf Ihr Geschäft konzentrieren. Zeit ist Geld &ndash;
      wir sparen Ihnen beides.</p>
      </div>
      
      <section>
      <img src="src/assets/frog.png" alt="" />
      </section>
    </section>
    <section id='happyfrog' className={`${happyfrogrelative ? 'relative' : 'fixed' }`}>
      <div id='happyfrogtext'>
      <h2 className={`${happyfrogtext1visible ? 'visibletransition' : 'notvisibletransition'}`}>Zufriedenheitsgarantie</h2>
        <p className={`${happyfrogtext2visible ? 'visibletransition' : 'notvisibletransition'}`}>
        Ihre Zufriedenheit ist unser Versprechen 
        &ndash; Sie zahlen nur, wenn Sie begeistert sind. 
        Mit unserer Geld-zurück-Garantie garantieren wir: 
        Keine Kompromisse, kein Risiko, 
        nur erstklassige Ergebnisse.
        </p>
        <p className={`${happyfrogtext3visible ? 'visibletransition' : 'notvisibletransition'}`}>
          Ihre Website &ndash; genau so, wie Sie es sich vorstellen.
        </p>
      </div>
    </section>
    <section id='furtherscrolldown2'></section>
    <section id='beforecontactform'>
      <p>Keine Sorge, unsere Frösche bei NoFrog 
        quaken nur, wenn es wichtig ist! <br />Hinterlassen
         Sie uns Ihre Kontaktdaten, und wir hüpfen direkt
          zu Ihnen rüber.
      </p>
    </section>
    <Contactform></Contactform>

<section id={`${backgroundcolorgrey ? 'backgroundcolorgrey' : ''}`}></section>

    </>
  )
}

export default Home