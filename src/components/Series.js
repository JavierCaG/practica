import React from "react";

const Series = ({ series }) => {
    return(
        <div>
            <h2>Series Populares</h2>
            <ul>
                {series.map(serie =>(
                    <li key={serie.id}>{serie.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Series;