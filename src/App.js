//Importamos use useState para crear y manejar estados
//Importamos useEffect para cargar los datos al iniciar
import React, { useEffect, useState } from "react";
//Importamos los router dom para manejar el enrutamiento de la pagina y la navegacion
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  obtenerPeliculasPopulares, 
  obtenerSeriesPopulares, 
  realizarBusqueda, 
} from "./api";
import Header from "./components/Header";
import Carrusel from "./components/Carrusel";
import Peliculas from "./components/Peliculas";
import Series from "./components/Series";
import Home from "./components/Home";
import Info from "./components/Info";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [pelis, setPelis] = useState([]);
  const [series, setSeries] = useState([]);
  const [buscar, setBuscar] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const pelis = await obtenerPeliculasPopulares();
      const series = await obtenerSeriesPopulares();
      setPelis(pelis.slice(0, 15));
      setSeries(series.slice(0, 15));
    };
    fetchData();
  }, []);

  //Funcion de busqueda que actualiza el estado de buscar
  const handleBuscar = async (query) => {
    const busqueda = await realizarBusqueda(query);
    setBuscar(busqueda);
  };

  //Funcion para limpiar la barra de busqueda
  const limpiarBusqueda = () => {
    setBuscar([]);
  };



  return (
    //Definimos el header con sus funciones y definimos los enrutadores y a donde nos dirigen
    <Router>
      <div className="App">
        <Header onSearch={handleBuscar} limpiarBusqueda={limpiarBusqueda} />
        <div className="scrolling-container">
          <Routes>
            <Route
              path="/"
              element={<Home pelis={pelis} series={series} buscar={buscar} />}
            />
            <Route
              path="/peliculas"
              element={<Peliculas pelis={pelis} buscar={buscar} />}
            />
            <Route
              path="/series"
              element={<Series series={series} buscar={buscar} />}
            />
            <Route path="/detalles/:id" element={<Info />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
