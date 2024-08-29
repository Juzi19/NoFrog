import { useCallback, useEffect, useRef, useState } from 'react'
import './Home.css'


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

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);

  //End Code text animation


  //Start Canvas animation Kreis

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [circleSize, setCircleSize] = useState(10); // Initiale Größe des Kreises

  const handleScrollCircle = () => {
    if (canvasRef.current) {
      const scrollPosition = window.scrollY;
      if(scrollPosition > 800) {
        const newSize = Math.min(scrollPosition-790); // Die Größe des Kreises wird basierend auf der Scroll-Position angepasst
        setCircleSize(newSize);
      }
      else if (scrollPosition < 800){
        const newSize = Math.min(10); // Die Größe des Kreises wird basierend auf der Scroll-Position angepasst
        setCircleSize(newSize);
      }
      //beenden der canva animation
      
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScrollCircle);

    // Cleanup-Funktion zum Entfernen des Event-Listeners
    return () => {
      window.removeEventListener('scroll', handleScrollCircle);
    };
  }, []);

  useEffect(() => {
    const canvas  = canvasRef.current;
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



  return (
    <>
    <section id='landing'>
        <div className='h1textcontainer' id={`${headline1visible ? 'headline1visible' : 'headline1notvisible'}`}><h1>Ihre <span>Website</span> ist die <span>digitale Visitenkarte.</span></h1></div>
        <div className='h1textcontainer' id={`${headline2visible ? 'headline2visiible' : 'headline2notvisible'}`}><h1><span>Perfekt</span> gestaltet, gewinnt sie <span>Kunden.</span></h1></div>
        <div className='h1textcontainer' id={`${headline3visible ? 'headline3visible' : 'headline3notvisible'}`}><h1>Alles <span>andere</span> lässt sie <span>gehen.</span></h1></div>
      <img src="src/assets/business_card.png" alt="Visitenkarte" className='businesscard'/> 
      <canvas 
        ref={canvasRef} 
        width={window.innerWidth} 
        height={window.innerHeight} 
        id='circlecanvas'
      /> 
    </section>
    <section id='scrolldown'>

    </section>
    </>
  )
}

export default Home