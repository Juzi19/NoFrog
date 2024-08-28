// src/App.js
import { Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home.tsx';


function App() {
  return (
    <div>
      <header>
        <Link to="/"><h1>nofrog</h1></Link>
        <nav>
          <Link to="/more">Mehr</Link>
          <Link to="/aboutus">Über uns</Link>
          <Link to="/contact">Kontakt</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
