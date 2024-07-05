import React from "react";

import "./Card.css";
import DocumentHome from "../document/DocumentHome";
function Card() {
  return (
    <div className="cards">
      <h1>SẢN PHẨM NỔI BẬT</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <DocumentHome />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
