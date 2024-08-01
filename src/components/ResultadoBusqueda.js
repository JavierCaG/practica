import React, { useState } from "react";
import Modal from "./Modal";
import { fetchTrailer, fetchCredits } from "../api"; 
import "./ResultadoBusqueda.css";

const ResultadoBusqueda = ({ item, type }) => {
  const [showModal, setShowModal] = useState(false);
  const [trailer, setTrailer] = useState(null);
  const [credits, setCredits] = useState(null);

  const handleCardClick = async () => {
    const trailerUrl = await fetchTrailer(item.id, type);
    const creditsData = await fetchCredits(item.id, type);
    setTrailer(trailerUrl);
    setCredits(creditsData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setTrailer(null);
    setCredits(null);
  };

  const hasImage = !!item.poster_path;
  const imageUrl = hasImage
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : null;

  return (
    <>
      <div className="search-result">
        <div
          className={`resultado-busqueda ${!hasImage ? "no-image" : ""}`}
          onClick={handleCardClick}
        >
          {hasImage ? (
            <img src={imageUrl} alt={item.title || item.name} />
          ) : (
            <div className="no-image-placeholder"></div>
          )}
          <div className="resultado-busqueda-title">
            {item.title || item.name}
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          onClose={handleCloseModal}
          trailer={trailer}
          title={item.title || item.name}
          overview={item.overview}
          cast={credits ? credits.cast : []}
          crew={credits ? credits.crew : []}
          genreIds={item.genre_ids}
          type={type}
        />
      )}
    </>
  );
};

export default ResultadoBusqueda;
