import React, { useState, useEffect, useRef } from "react";
import {
  obtenerGeneros,
  obtenerPeliculasPorGenero,
  obtenerSeriesPopulares,
  obtenerTrailer,
  obtenerCreditos,
} from "../api";
import Card from "./Card";
import Modal from "./Modal";
import "./CarruselGenero.css";

const CarruselGenero = ({ tipo }) => {
  const [generos, setGeneros] = useState([]);
  const [itemsPorGenero, setItemsPorGenero] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [trailers, setTrailers] = useState({});
  const [credits, setCredits] = useState({});
  const refs = useRef({});


  //Se define una funcion para cargar los generos y los elementos de peliculas y series
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        //Obtiene los generos y establece el estado generos con los primeros 5
        const generosData = await obtenerGeneros(tipo);
        setGeneros(generosData.slice(0, 5));

        const promesas = generosData.map(async (genero) => {
          //se crean multiples solicitudes para obtener peliculas o series por generos
          const items =
            tipo === "movie"
              ? await obtenerPeliculasPorGenero(genero.id)
              : await obtenerSeriesPopulares(genero.id);
          return { [genero.id]: items };
        });

        const resultados = await Promise.all(promesas);
        setItemsPorGenero(
          resultados.reduce((acc, curr) => ({ ...acc, ...curr }), {})
        );
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatos();
  }, [tipo]);

  //Se obtienen los datos de la card al hacer click en esta
  const handleCardClick = async (item) => {
    setSelectedItem(item);
    if (!trailers[item.id]) {
      //Se obtiene el trailer del item si este no esta previamente cargado
      const trailerUrl = await obtenerTrailer(
        item.id,
        tipo === "movie" ? "movie" : "tv"
      );
      setTrailers((prevState) => ({ ...prevState, [item.id]: trailerUrl }));
    }
    //Se obtienen los creditos del item y se almacenan
    const creditData = await obtenerCreditos(
      item.id,
      tipo === "movie" ? "movie" : "tv"
    );
    setCredits((prevState) => ({ ...prevState, [item.id]: creditData }));
  };

  //Cierra el modal estableciendo el estado en null
  const handleCloseModal = () => {
    setSelectedItem(null);
  };


  return (
    <div>
      {generos.map((genero) => (
        <div key={genero.id} className="carrusel-container">
          <h2 className="titulo">{genero.name}</h2>
          <div
            className="carrusel"
            ref={(el) => (refs.current[genero.id] = el)}
          >
            {itemsPorGenero[genero.id]?.map((item) => (
              <Card
                key={item.id}
                item={item}
                onClick={() => handleCardClick(item)}
              />
            ))}
          </div>
        </div>
      ))}
      {/* Se carga los datos en el modal*/}
      {selectedItem && (
        <Modal
          show={selectedItem !== null}
          onClose={handleCloseModal}
          trailer={trailers[selectedItem.id]}
          title={selectedItem.title || selectedItem.name}
          overview={selectedItem.overview}
          cast={credits[selectedItem.id]?.cast}
          crew={credits[selectedItem.id]?.crew}
          genreIds={selectedItem.genre_ids}
          type={tipo}
        />
      )}
    </div>
  );
};

export default CarruselGenero;
