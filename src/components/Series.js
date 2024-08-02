import React from "react";
import CarruselGenero from "./CarruselGenero"; // Importa el componente CarruselGenero
import ResultadoBusqueda from "./ResultadoBusqueda";

const Series = ({ buscar }) => {
  //Esto se realiza para poder buscar desde la pagina de Series
  const resultadosFiltrados = buscar.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.poster_path
  );
  return (
    <div>
      {resultadosFiltrados.length > 0 ? (
        <div>
          <h2>Resultados de Búsqueda en Series</h2>
          <div className="search-results">
            {resultadosFiltrados.map((item) => (
              <ResultadoBusqueda
                key={item.id}
                item={item}
                type={item.media_type === "movie" ? "movie" : "tv"}
              />
            ))}
          </div>
        </div>
      ) : (
        //Si resultado de busqueda esta vacio se muestra el apartado de series dentro de diferentes carruseles divididas por genero
        <div className="carousel-wrapper">
          <CarruselGenero tipo="tv" />
        </div>
      )}
    </div>
  );
};

export default Series;
