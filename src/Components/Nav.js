import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <li><Link to="/search/dogs" onClick={() => {props.search("dogs")}}>Dogs</Link></li>
        <li><Link to="/search/scenery" onClick={() => {props.search("scenery")}}>Scenery</Link></li>
        <li><Link to="/search/cars" onClick={() => {props.search("cars")}}>Cars</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
