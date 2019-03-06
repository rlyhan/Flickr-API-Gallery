import React, { Component } from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
import apiKey from './config.js'
import axios from 'axios';

import Header from './Components/Header';
import Gallery from './Components/Gallery';

let searchQuery;

const history = createBrowserHistory();
history.push("/");

class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      loading: true,
      currentQuery: ""
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = (query) => {
    if (query == null) {
      searchQuery = "mountains";
      this.fetchData();
    } else {
      if (query !== searchQuery) {
        searchQuery = query;
        this.fetchData();
      }
    }
  }

  fetchData() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          images: response.data.photos.photo,
          loading: false,
          currentQuery: searchQuery
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div className="container">

            <Header search={this.performSearch}
                    history={history}/>

            <div className="photo-container">
              {
                (this.state.loading)
                  ? <p>Loading...</p>
                  : <Route exact path="/" render={ () => <Redirect to="/search/mountains" /> } />
              }

              <Route path="/search/:query" render={ () => <Gallery data={this.state.images}
                                                                   query={this.state.currentQuery}
                                                                   history={history} /> } />
            </div>

          </div>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
