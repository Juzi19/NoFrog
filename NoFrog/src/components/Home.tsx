import './Home.css'


function Home() {
  return (
    <>
    <section id='main'>
        <div className='h1textcontainer'><h1>Ihre <span>Website</span> ist die <span>digitale Visitenkarte</span>.</h1></div>
        <div className='h1textcontainer'><h1><span>Perfekt</span> gestaltet, gewinnt sie <span>Kunden</span>.</h1></div>
        <div className='h1textcontainer'><h1>Alles <span>andere</span> lässt sie <span>gehen</span>.</h1></div>
      <img src="src/assets/business_card.png" alt="Visitenkarte" className='businesscard'/>  
      
    </section>
    </>
  )
}

export default Home