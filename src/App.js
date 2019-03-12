import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';

import Search from './Components/Search';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div className="container">
            <Route exact path="/" render={ () => <Redirect to="/search/mountains" /> } />
            <Route path="/search/:query" render={ (props) => <Search /> } />
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
