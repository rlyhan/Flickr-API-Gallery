import React from 'react';

import SearchForm from './SearchForm';
import Nav from './Nav';

const Header = (props) => {
  return (
    <header>
      <SearchForm history={props.history} />
      <Nav history={props.history}/>
    </header>
  );
}

export default Header;
