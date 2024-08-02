import axios from "axios";

export const API_KEY = "3fb38b786d562386d9dc4180a1efe6c4";
export const BASE_URL = "https://api.themoviedb.org/3";

export const obtenerPeliculasPopulares = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "es-ES", // Añadir el parámetro de idioma
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error en la obtención de películas populares:", error);
    return [];
  }
};

export const obtenerPeliculasPorGenero = async (genreId) => {
  const response = await axios.get(`${BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genreId,
      language: "es-ES",
    },
  });
  return response.data.results;
};

export const obtenerSeriesPopulares = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        language: "es-ES", // Añadir el parámetro de idioma
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error en la obtención de series populares:", error);
    return [];
  }
};

export const realizarBusqueda = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: API_KEY,
        query,
        language: "es-ES", // Añadir el parámetro de idioma
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    return [];
  }
};

export const obtenerGeneros = async (type) => {
  const response = await axios.get(`${BASE_URL}/genre/${type}/list`, {
    params: {
      api_key: API_KEY,
      language: "es-ES", // Añadir el parámetro de idioma
    },
  });
  return response.data.genres;
};

export const obtenerTrailer = async (id, type) => {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${id}/videos`, {
      params: {
        api_key: API_KEY,
        language: "es-ES", // Añadir el parámetro de idioma
      },
    });
    const trailer = response.data.results.find(
      (video) => video.type === "Trailer" && video.site === "YouTube"
    );
    return trailer
      ? `https://www.youtube.com/embed/${trailer.key}?enablejsapi=1&autoplay=1&controls=0`
      : null;
  } catch (error) {
    console.error("Error al obtener el trailer:", error);
    return null;
  }
};

export const obtenerCreditos = async (id, type) => {
  const response = await axios.get(`${BASE_URL}/${type}/${id}/credits`, {
    params: {
      api_key: API_KEY,
      language: "es-ES", // Añadir el parámetro de idioma
    },
  });
  return response.data;
};
