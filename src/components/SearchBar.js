//Importamos useImperativeHandle y fordward ref para pasar la referencia a otros componentes
import React, { useState, useImperativeHandle, forwardRef } from "react";
import "./SearchBar.css"; 
//este import es solo para un icono de lupa
import "@fortawesome/fontawesome-free/css/all.min.css";
const SearchBar = forwardRef(({ onSearch }, ref) => {
  const [buscar, setBuscar] = useState("");

  //Funcion de busqueda que se activa al presionar la tecla enter al buscar
  const handleBuscar = (event) => {
    if (event.key === "Enter") {
      onSearch(buscar);
    }
  };

  //Definimos la funcion clearInput para que luego sea llamada desde otro componente
  useImperativeHandle(ref, () => ({
    clearInput() {
      setBuscar("");
    },
  }));

  return (
    <div className="search-bar">
      {/* Permitimos ingresar texto para realizar busqueda de peliculas o series */}
      <input
        type="text"
        value={buscar}
        onChange={(e) => setBuscar(e.target.value)}
        onKeyPress={handleBuscar}
        placeholder="Encuentra tus series y películas favoritas aquí"
      />
      <span className="search-icon">
        <i className="fas fa-search"></i>
      </span>{" "}
      {/* Ícono de lupa */}
    </div>
  );
});

export default SearchBar;
