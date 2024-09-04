// src/App.js
import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home.tsx'
import './App.css'


function App() {
  return (
    <div>
      <header>
        <Link to="/" className="header-link"><h1>nofrog</h1></Link>
        <nav>
          <Link to="/webdesign" className="nav-link ">Webdesign</Link>
          <Link to="/aboutus" className="nav-link">Über uns</Link>
          <Link to="/contact" className="nav-link">Kontakt</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />

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
          <img src="src/assets/frog.png" alt="Frog" />
        </div>
        <div id='footerlinks'>
          <Link>Kontakt</Link>
          <Link>Impressum</Link>
          <Link>Datenschutz</Link>
        </div>
      </footer>
    </div>
  );
}

export default App;
