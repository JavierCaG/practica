import React from "react";
//Importamos link para la navegacion interna sin necesidad
//de recargar la pagina
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import "./Header.css";
import filmIcon from "../Imagenes/24806.png";


//Pasamos el prop onSearch para ejecutar la busqueda cuando se haga la consulta
//y limpiar busqueda para limpiar el campo cuando se navegue por las paginas
const Header = ({ onSearch, limpiarBusqueda }) => {
  return (
    <header className="header">
      <div className="izquierda">
        <img src={filmIcon} alt="Icon" className="icono" />
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
