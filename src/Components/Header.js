import React from 'react';
import {
  Route
} from 'react-router-dom';

import SearchForm from './SearchForm';
import Nav from './Nav';

const Header = (props) => {
  return (
    <header>
      <SearchForm search={props.search}
                  history={props.history} />
      <Nav search={props.search}/>
    </header>
  );
}

export default Header;
