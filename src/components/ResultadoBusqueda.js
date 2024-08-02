import React, { useState } from "react";
import { obtenerCreditos, obtenerTrailer } from "../api";
import Modal from "./Modal";
import Card from "./Card"; // Usar el componente Card genérico
import "./ResultadoBusqueda.css";


//Props item= datos de series o peliculas y type= definir si es pelicula o serie
const ResultadoBusqueda = ({ item, type }) => {
  //showModal para determinar si mostramos el modal 
  const [showModal, setShowModal] = useState(false);

  //Almacenar trailer
  const [trailer, setTrailer] = useState(null);

  //Almacena los datos sobre actores y director
  const [credits, setCredits] = useState(null);

  //Funcion para obtener los datos al hacer click en la card y mostrar el modal
  const handleCardClick = async () => {
    const trailerUrl = await obtenerTrailer(item.id, type);
    const creditsData = await obtenerCreditos(item.id, type);
    setTrailer(trailerUrl);
    setCredits(creditsData);
    setShowModal(true);
  };

  //Funcion para cerrar el modal y restablecer los estados trailer y credits
  const handleCloseModal = () => {
    setShowModal(false);
    setTrailer(null);
    setCredits(null);
  };

  return (
    <>
      <div className="search-result">
        <Card item={item} onClick={handleCardClick} />
        {/* Muestra el modal y los datos que hay al interior de este */}
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
      </div>
    </>
  );
};

export default ResultadoBusqueda;
