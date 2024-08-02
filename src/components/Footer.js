import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      {/* Se carga la fecha actual */}
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} PelisFilms. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
