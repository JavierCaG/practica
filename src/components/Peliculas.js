import React from "react";
import CarruselGenero from "./CarruselGenero"; // Importa el componente CarruselGenero
import ResultadoBusqueda from "./ResultadoBusqueda"; // Importa el componente para mostrar resultados de búsqueda

const Peliculas = ({ pelis, buscar }) => {
  //Esto se realiza para poder buscar desde la pagina de Peliculas
  const resultadosFiltrados = buscar.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.poster_path
  );

  return (
    <div>
      {resultadosFiltrados.length > 0 ? (
        <div>
          <h2>Resultados de Búsqueda en Películas</h2>
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
        //Si resultado de busqueda esta vacio se muestra el apartado de Peliculas dentro de diferentes carruseles divididas por genero
        <div className="carousel-wrapper">
          <CarruselGenero tipo="movie" items={pelis} />
        </div>
      )}
    </div>
  );
};

export default Peliculas;
