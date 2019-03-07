import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav className="main-nav">
      <ul>
        <li><Link to="/search/dogs" onClick={() => {props.history.push("/search/dogs")}}>Dogs</Link></li>
        <li><Link to="/search/scenery" onClick={() => {props.history.push("/search/scenery")}}>Scenery</Link></li>
        <li><Link to="/search/cars"  onClick={() => {props.history.push("/search/cars")}}>Cars</Link></li>
      </ul>
    </nav>
  );
}

export default Nav;
