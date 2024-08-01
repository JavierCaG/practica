import React from "react";
import Carrusel from "./Carrusel";
import ResultadoBusqueda from "./ResultadoBusqueda"; 

const Home = ({ pelis, series, buscar }) => {
  const resultadosFiltrados = buscar.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.poster_path
  );

  return (
    <div>
      {resultadosFiltrados.length > 0 ? (
        <div>
          <h2>Resultados de Búsqueda</h2>
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
        <>
          <h2>Top 15 Películas del Momento</h2>
          <div className="carousel-wrapper">
            <Carrusel tipo="peliculas" items={pelis} />
          </div>
          <h2>Top 15 Series del Momento</h2>
          <div className="carousel-wrapper">
            <Carrusel tipo="series" items={series} />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
