import React from "react";
import "./Card.css";

const Card = ({ item, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        alt={item.title || item.name}
      />
      <div className="card-title">{item.title || item.name}</div>
    </div>
  );
};

export default Card;
