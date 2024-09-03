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
    </div>
  );
}

export default App;
