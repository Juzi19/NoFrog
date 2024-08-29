import { useCallback, useEffect, useState } from 'react'
import './Home.css'


function Home() {
  //Start Code text Animation

  //Const text visible
  const [headline1visible, setheadline1visible] = useState(true);
  const [headline2visible, setheadline2visible] = useState(false);
  const [headline3visible, setheadline3visible] = useState(false);

  console.log(window.scrollY);
  console.log(window.document.documentElement.scrollHeight);
  function handleScroll () {
    const scrollPosition = window.scrollY;
    const scrollArea = document.documentElement.scrollHeight;

    console.log(scrollArea)
    console.log(scrollPosition)

    if (scrollPosition > (scrollArea*(2/4))) {
    setheadline1visible(false);
    setheadline2visible(false);
    setheadline3visible(true);
  } else if (scrollPosition > (scrollArea*(1/4))) {
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


  


  return (
    <>
    <section id='landing'>
        <div className='h1textcontainer' id={`${headline1visible ? 'headline1visible' : 'headline1notvisible'}`}><h1>Ihre <span>Website</span> ist die <span>digitale Visitenkarte.</span></h1></div>
        <div className='h1textcontainer' id={`${headline2visible ? 'headline2visiible' : 'headline2notvisible'}`}><h1><span>Perfekt</span> gestaltet, gewinnt sie <span>Kunden.</span></h1></div>
        <div className='h1textcontainer' id={`${headline3visible ? 'headline3visible' : 'headline3notvisible'}`}><h1>Alles <span>andere</span> lässt sie <span>gehen.</span></h1></div>
      <img src="src/assets/business_card.png" alt="Visitenkarte" className='businesscard'/>  
    </section>
    <section id='scrolldown'>

    </section>
    </>
  )
}

export default Home