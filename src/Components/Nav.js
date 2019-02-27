import React from 'react';
import { Route,
         NavLink } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink exact to="/search/dogs" onClick={() => {props.search("dogs")}}>Dogs</NavLink></li>
        <li><NavLink exact to="/search/scenery" onClick={() => {props.search("scenery")}}>Scenery</NavLink></li>
        <li><NavLink exact to="/search/cars" onClick={() => {props.search("cars")}}>Cars</NavLink></li>
      </ul>
    </nav>
  );
}

export default Nav;
