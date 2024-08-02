import React, { useState, useEffect } from "react";
import { obtenerGeneros, obtenerPeliculasPorGenero } from "../api"; // Actualizado según los nuevos nombres
import Carrusel from "./Carrusel";

const Generos = ({ type }) => {
  const [generos, setGeneros] = useState([]);
  const [peliculasGenero, setPeliculasGenero] = useState({});

  useEffect(() => {
    //Se definen los generos y obtienen los 5 principales, para cada uno de estos se obtienen las Series
    //o peliculas correspondientes
    const cargarGeneros = async () => {
      const datosGeneros = await obtenerGeneros(type);
      setGeneros(datosGeneros.slice(0, 5)); 
      datosGeneros.slice(0, 5).forEach(async (genero) => {
        const peliculas = await obtenerPeliculasPorGenero(genero.id);
        setPeliculasGenero((prev) => ({ ...prev, [genero.name]: peliculas }));
      });
    };

    cargarGeneros();
  }, [type]);

  return (
    <div>
      {/* Se realiza iteraciones por la cantidad de generos, poniendo su nombre de encabezado */}
      {generos.map((genero) => (
        <div key={genero.id}>
          <h2>{genero.name}</h2>
          <Carrusel items={peliculasGenero[genero.name] || []} />
        </div>
      ))}
    </div>
  );
};

export default Generos;
