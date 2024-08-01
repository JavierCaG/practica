import React, { useState, useEffect, useRef } from "react";
import { fetchTrailer, fetchCredits } from "../api";
import Modal from "./Modal";
import "./Carrusel.css";

const Carrusel = ({ tipo, items }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [trailers, setTrailers] = useState({});
  const [credits, setCredits] = useState({});
  const carouselTrackRef = useRef(null);

  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }, []);

  const handleMouseEnter = async (id, index) => {
    setHoveredCard(id);
    if (!trailers[id]) {
      const trailerUrl = await fetchTrailer(
        id,
        tipo === "peliculas" ? "movie" : "tv"
      );
      setTrailers((prevState) => ({ ...prevState, [id]: trailerUrl }));
    }

    const track = carouselTrackRef.current;
    const card = track.children[index];
    const cardRect = card.getBoundingClientRect();
    const trackRect = track.getBoundingClientRect();

    if (cardRect.right > trackRect.right) {
      track.scrollLeft += cardRect.right - trackRect.right + 20;
    } else if (cardRect.left < trackRect.left) {
      track.scrollLeft -= trackRect.left - cardRect.left + 20;
    }
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleCardClick = async (item) => {
    setSelectedCard(item);
    const creditData = await fetchCredits(
      item.id,
      tipo === "peliculas" ? "movie" : "tv"
    );
    setCredits(creditData);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setCredits({});
  };

  const handleScroll = (direction) => {
    const track = carouselTrackRef.current;
    const cardWidth = track.children[0].getBoundingClientRect().width;
    if (direction === "prev") {
      track.scrollLeft -= cardWidth;
    } else {
      track.scrollLeft += cardWidth;
    }
  };

  return (
    <div className="carrusel" style={{ position: "relative" }}>
      <button
        className="carousel-button prev"
        onClick={() => handleScroll("prev")}
      >
        {"<"}
      </button>
      <div className="carousel-track" ref={carouselTrackRef}>
        {items.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`carousel-card`}
              onMouseEnter={() => handleMouseEnter(item.id, index)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleCardClick(item)}
            >
              <p className="popular">{index + 1}</p>
              <img
                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                alt={item.title || item.name}
              />
              <div className="card-title">{item.title || item.name}</div>
            </div>
          );
        })}
      </div>
      <button
        className="carousel-button next"
        onClick={() => handleScroll("next")}
      >
        {">"}
      </button>

      {selectedCard && (
        <Modal
          show={selectedCard !== null}
          onClose={handleCloseModal}
          trailer={trailers[selectedCard.id]}
          title={selectedCard.title || selectedCard.name}
          overview={selectedCard.overview}
          cast={credits.cast}
          crew={credits.crew}
          genreIds={selectedCard.genre_ids}
          type={tipo}
        />
      )}
    </div>
  );
};

export default Carrusel;
