import React from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({search}) => {
  return (
    <nav className="main-nav">
      <ul>
        <li><NavLink exact to="/dogs" onClick={() => search("dogs")}>Dogs</NavLink></li>
        <li><NavLink to="/scenery" onClick={() => search("scenery")}>Scenery</NavLink></li>
        <li><NavLink to="/cars" onClick={() => search("cars")}>Cars</NavLink></li>
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  performSearch: PropTypes.func
};

export default Nav;
