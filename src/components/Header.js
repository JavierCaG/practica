import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.css";

const Header = ({ onSearch, limpiarBusqueda }) => {
  return (
    <header className="header">
      <div className="izquierda">
        <img src="path_to_icon" alt="Icon" className="icono" />
        <Link to="/" className="titulo" onClick={limpiarBusqueda}>
          PelisFilms
        </Link>
      </div>
      <nav className="header-nav">
        <Link to="/" className="nav-link" onClick={limpiarBusqueda}>
          Inicio
        </Link>
        <Link to="/peliculas" className="nav-link" onClick={limpiarBusqueda}>
          Películas
        </Link>
        <Link to="/series" className="nav-link" onClick={limpiarBusqueda}>
          Series
        </Link>
      </nav>
      <div className="derecha">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;
