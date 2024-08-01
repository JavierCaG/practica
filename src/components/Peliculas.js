import React from "react";

const Peliculas = ({ pelis }) => {
    return(
        <div>
            <h2>Peliculas Populares</h2>
            <ul>
                {pelis.map(peli =>(
                    <li key={peli.id}>{peli.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Peliculas;