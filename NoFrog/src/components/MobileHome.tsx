import  { useEffect, useState, useRef } from "react";
import './MobileHome.css';
import Contactform from "./Contactform";


function MobileHome() {
  //React Animation
  const [h1, seth1visible] = useState(true);
  const [h2, seth2visible] = useState(false);
  const [fixedvisible, setFixedVisible] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasstatus, setCanvassstatus] = useState(0);
  

  //Canvas Animated

  //initalizing the canvas

  const canvas = canvasRef.current;
  const ctx = canvas?.getContext('2d');


  const width = window.innerWidth;
  const height = window.innerHeight;

  const centerX = width /2;
  const centerY = height / 2;

  
  //function for drawing the canvas

  function drawCanvas (progress: number) {
    
    ctx?.beginPath();
    ctx?.rect((-width*0.12), 0, (width * (progress*0.5)), height);
    ctx?.rect(width, 0, (-width * (progress*0.5)), height);

    ctx?.closePath();
    ctx?.fill();
    
  }

  //use Effect hook um das canvas zu zeichnen
  
  useEffect(()=>{
    if (ctx === null || ctx === undefined || !ctx || !canvas) {
      console.error("Canvas not loaded properly");
    }
    else{
    canvas.width = window.innerWidth * 0.88;
    canvas.height = window.innerHeight;
    // Canvas und Kontext zurücksetzen
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    drawCanvas(canvasstatus);
    }
     }, [canvasstatus]);

  



  function handleScroll () {
    const scrollPosition = window.scrollY;
  if (scrollPosition < 50) {
   seth1visible(true);
   seth2visible(false);
  }
  else if (scrollPosition > 50 && scrollPosition < 450) {
   seth1visible(false);
   seth2visible(true);
  }
  else if (scrollPosition >  450 && scrollPosition < 900) {
   seth2visible(false);
  }
  else if (scrollPosition >  900 && scrollPosition < 1450) {
   setFixedVisible(false);
  }
  else if(scrollPosition > 1450 && scrollPosition < 1900) {
   setFixedVisible(true);
   setCanvassstatus(0);
  }
  else if (scrollPosition > 1900 && scrollPosition < 2350) {
    setCanvassstatus(((scrollPosition-1900) / 450)*1.12)
  }
  else if (scrollPosition > 2350) {
    
    setCanvassstatus(1.12);
  }
  }
  
  


  //React useEffect Hook for displaying content
  useEffect(()=> {
    window.addEventListener('scroll', handleScroll)
  }, []);

  return (
    <>
    <section id="firstsection1">
      <div className={`${h1 ? 'visibletransition' : 'notvisibletransition'}`}>
      <h3>Stellen Sie sich vor...</h3>
      </div>
      <div className={`${h2 ? 'visibletransition' : 'notvisibletransition'}`}>
      <h3>Ihre Website ist wie ein eleganter Frosch in einem Teich voller Enten</h3>
      </div>
    </section>
    <section id="mobilehomescrolldown" />
    <section id="section3mobile">
      <div id="div54">
      <img src="src/assets/frog.png" alt="Frosch" />
      </div>
      <div id="div55">
         <h2>Eine starke und hochwertige digitale Visitenkarte</h2>
      </div>
    </section>
    <section id="section4mobile" className={`${fixedvisible ? 'visibletransitionZ' : 'notvisibletransitionZ'}`}>
      <h2>Das ist unsere gemeinsame Vision.</h2>
      <h2>#FrogifyYourVision 🐸</h2>
    </section>
    <canvas ref={canvasRef} id="canvas9"></canvas>
    <section id="section5mobile">
      <div>
      <h2>Zusammen soll Ihre Website wie der elegante Frosch werden:</h2>
      </div>
      
    </section>
  
    <section>
      <div>      
        <h3>Einzigartig</h3>
        <p>Jede NoFrog Website ist ein echtes Unikat. </p>
      </div>
      <div>      
        <h3>Schnell</h3>
      </div>
      <div>      
        <h3>Ohne Risiken</h3>
      </div>
    </section>
    <section><h2>Gemeinsam erschaffen wir Ihr Edelamphib</h2></section>
    <Contactform></Contactform>
    </>
  )
}

export default MobileHome