import React from 'react';

import SearchForm from './SearchForm';
import Nav from './Nav';

const Header = (props) => {
  return (
    <header>
      <SearchForm search={props.search}
                  history={props.history} />
      <Nav search={props.search}
           history={props.history}/>
    </header>
  );
}

export default Header;
