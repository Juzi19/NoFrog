import  { useEffect, useState, useRef, Component } from "react";
import './MobileHome.css';
import Contactform from "./Contactform";


function MobileHome() {
  //React Animation
  const [h1, seth1visible] = useState(true);
  const [h2, seth2visible] = useState(false);
  const [fixedvisible, setFixedVisible] = useState(false)





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
    <section>
      <h2>Zusammen soll Ihre Website wie der elegante Frosch werden</h2>
    </section>
    <section>
      <h3>Einzigartig</h3>
      <h3>Schnell</h3>
      <h3>Ohne Risiken</h3>
    </section>
    <section><h2>Gemeinsam erschaffen wir Ihr Edelamphib</h2></section>
    <Contactform></Contactform>
    </>
  )
}

export default MobileHome