import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { API_KEY, BASE_URL } from "../api";

const Info = () => {
  const { id } = useParams();
  const [detalles, setDetalles] = useState(null);

  useEffect(() => {
    const fetchDetalles = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
          },
        });
        setDetalles(response.data);
      } catch (error) {
        console.error('Error al obtener detalles:', error);
      }
    };
    fetchDetalles();
  }, [id]);

  return (
    <div>
      {detalles ? (
        <div> 
          <h1>{detalles.title}</h1>
          <p>{detalles.overview}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Info;