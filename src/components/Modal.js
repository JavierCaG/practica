//Importamos useMemo para memorizar los resultados de las funciones para evitar calculos costosos
import React, { useState, useEffect, useMemo } from "react";
import { obtenerGeneros } from "../api";
import "./Modal.css";

const Modal = ({
  show,
  onClose,
  trailer,
  title,
  overview,
  cast,
  crew,
  genreIds,
  type,
}) => {
  const [generos, setGeneros] = useState([]);

  useEffect(() => {
    //Cuando se carga o cuando type cambia este se ejecuta llamando a obtener generos y actualizando al tipo correcto (movies, tv)
    const cargarDatosGenero = async () => {
      const datosGenero = await obtenerGeneros(
        type === "peliculas" ? "movie" : "tv"
      );
      setGeneros(datosGenero);
    };

    cargarDatosGenero();
  }, [type]);

  useEffect(() => {
    //Esto se utiliza para evitar que se pueda mover la pagina cuando hay un modal activo y que se reactive el movimiento al cerrarla
    if (show) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [show]);

  //Convierte la lista de ids en una lista de con los nombres de los generos correspondientes
  const obtenerNombresGeneros = (ids) => {
    return ids
      .map((id) => {
        const genero = generos.find((g) => g.id === id);
        return genero ? genero.name : "";
      })
      .join(", ");
  };

  //Utilizamos memo para evitar recalcular los generos
  const nombresGenerosMemorizados = useMemo(
    () => obtenerNombresGeneros(genreIds),
    [generos, genreIds]
  );

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <span className="close" onClick={onClose}>
        &times;
      </span>
      <div className="modal-content">
        <div className="trailer-container">
          {/* Muestra un iframe con el trailer cargado  */}
          {trailer && (
            <iframe
              src={trailer}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          )}
        </div>
        <h2>{title}</h2>
        {/* Muestra la sinopsis */}
        <p>Sinopsis: {overview}</p>
        {/* Muestra los generos de la pelicula */}
        <p>Géneros: {nombresGenerosMemorizados}</p>
        {cast && (
          <>
            <h3>Actores Principales:</h3>
            <ul>
              {/* Muestra los 5 actores principales y a quien caracterizan */}
              {cast.slice(0, 5).map((actor) => (
                <li key={actor.cast_id}>
                  {actor.name} como {actor.character}
                </li>
              ))}
            </ul>
          </>
        )}
        {crew && (
          <>
          {/* Muestra al director de la pelicula */}
            <h3>Directores:</h3>
            <ul>
              {crew
                .filter((member) => member.job === "Director")
                .map((director) => (
                  <li key={director.credit_id}>{director.name}</li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Modal;
