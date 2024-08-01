import React, { useState, useImperativeHandle, forwardRef } from "react";
import "./SearchBar.css"; 
import "@fortawesome/fontawesome-free/css/all.min.css";
const SearchBar = forwardRef(({ onSearch }, ref) => {
  const [buscar, setBuscar] = useState("");

  const handleBuscar = (event) => {
    if (event.key === "Enter") {
      onSearch(buscar);
    }
  };

  useImperativeHandle(ref, () => ({
    clearInput() {
      setBuscar("");
    },
  }));

  return (
    <div className="search-bar">
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
