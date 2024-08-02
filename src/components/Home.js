import React from "react";
import Carrusel from "./Carrusel";
import ResultadoBusqueda from "./ResultadoBusqueda";

//Pasamos como props pelis y series para mostrarlos en el carrusel si no se hacen busquedas
//y buscar para realizar el filtrado cuando se realice una busqueda
const Home = ({ pelis, series, buscar }) => {
  const resultadosFiltrados = buscar.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.poster_path
  );

  return (
    <div>
      {/* Esto se realiza para seleccionar elementos que sean series o peliculas que tengan un poster */}
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
        {/* si el resultado de filtrado esta vacio se mostrara los carruseles de series 
        y peliculas populares */}
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
