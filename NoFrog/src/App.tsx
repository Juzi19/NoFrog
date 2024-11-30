// src/App.js
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import Homepage from './components/Homepage.tsx';
import './App.css';
import Contact from './components/Contact.tsx';
import Webdesign from './components/Webdesign.tsx';
import Aboutus from './components/Aboutus.tsx';
import Legals from './components/Legals.tsx';
import DataUsage from './components/DataUsage.tsx';
import CookieRequest from './components/CookieRequest.tsx';
import YourRequest from './components/YourRequest.tsx';
import NotFound from './components/NotFound.tsx'

function App() {
  //React Code for hamburger menu
  const [submenuvisible, setSubmenuvisible] = useState(false);

  const hidesubmenu = (()=> {
    setSubmenuvisible(false);
  })

  const handleClick = (()=>{
    if(submenuvisible) {
      setSubmenuvisible(false);
    }
    else if (submenuvisible === false){
      setSubmenuvisible(true);
    }
    else {
      console.log('I dont know what to do');
    }
  })
  return (
    <div>
      <header>
        <Link to="/" className="header-link"><h1>nofrog</h1></Link>
        <nav>
          <Link to="/webdesign" className="nav-link ">Webdesign</Link>
          <Link to="/aboutus" className="nav-link">Über uns</Link>
          <Link to="/contact" className="nav-link">Kontakt</Link>
          <div onClick={handleClick} id='hammenu'>&#9776;</div>
        </nav>
      </header>

      <section id='navlinks' className={`${submenuvisible ? 'menuvisible' : 'menunotvisible'}`} onClick={hidesubmenu}>
          <Link to="/webdesign" className="link1">Webdesign</Link>
          <Link to="/aboutus" className="link1">Über uns</Link>
          <Link to="/contact" className="link1">Kontakt</Link>
      </section>
      <CookieRequest></CookieRequest>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/contact' element={<Contact />}/>
        <Route path='/webdesign' element={<Webdesign />}/>
        <Route path='/aboutus' element={<Aboutus />}/>
        <Route path='/legals' element={<Legals />}/>
        <Route path='/dataguidelines' element={<DataUsage />}/>
        <Route path='/yourrequest' element={<YourRequest />}/>
        <Route path='/*' element={<NotFound />}/>




      </Routes>
      <footer>
        <div id='socialmedia'>
          <a href="https://www.instagram.com/yourprofile" target="_blank" aria-label="Instagram" id='insta'>
            <i className="fab fa-instagram"></i>
          </a>

          <a href="https://www.linkedin.com/in/yourprofile" target="_blank" aria-label="LinkedIn" id='linkedin'>
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
        <div id='footerimage'>
          <img src="/assets/frog.webp" alt="Frog" />
        </div>
        <div id='footerlinks'>
          <Link to='/contact'>Kontakt</Link>
          <Link to='/legals'>Impressum</Link>
          <Link to='/dataguidelines'>Datenschutz</Link>
          <Link to='/yourrequest'>Anfragen</Link>
      
        </div>
      </footer>
    </div>
  );
}

export default App;
