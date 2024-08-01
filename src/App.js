import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  fetchPelisPopulares,
  fetchSeriesPopulares,
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
      const pelis = await fetchPelisPopulares();
      const series = await fetchSeriesPopulares();
      setPelis(pelis.slice(0, 15)); 
      setSeries(series.slice(0, 15)); 
    };
    fetchData();
  }, []);

  const handleBuscar = async (query) => {
    const busqueda = await realizarBusqueda(query);
    setBuscar(busqueda);
  };

  const limpiarBusqueda = () => {
    setBuscar([]);
  };

  return (
    <Router>
      <div className="App">
        <Header onSearch={handleBuscar} limpiarBusqueda={limpiarBusqueda} />
        <div className="scrolling-container">
          <Routes>
            <Route
              path="/"
              element={<Home pelis={pelis} series={series} buscar={buscar} />}
            />
            <Route path="/peliculas" element={<Peliculas pelis={pelis} />} />
            <Route path="/series" element={<Series series={series} />} />
            <Route path="/detalles/:id" element={<Info />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
