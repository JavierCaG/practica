import React, { useState, useEffect, useMemo } from "react";
import { fetchGenres } from "../api";
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
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenreData = async () => {
      const genreData = await fetchGenres(
        type === "peliculas" ? "movie" : "tv"
      );
      setGenres(genreData);
    };

    fetchGenreData();
  }, [type]);

  const getGenreNames = (ids) => {
    return ids
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : "";
      })
      .join(", ");
  };

  const memorizedGenreNames = useMemo(
    () => getGenreNames(genreIds),
    [genres, genreIds]
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
        <p>Sinopsis: {overview}</p>
        <p>Géneros: {memorizedGenreNames}</p>
        {cast && (
          <>
            <h3>Actores Principales:</h3>
            <ul>
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
