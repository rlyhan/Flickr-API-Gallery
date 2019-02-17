import React, { Component } from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

import './App.css';
import apiKey from './config.js'
import axios from 'axios';

import Header from './Components/Header';
import Gallery from './Components/Gallery';
import SearchForm from './Components/SearchForm';

let searchQuery;
const history = createBrowserHistory();

class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      loading: true
    };
  }

  componentDidMount() {
    this.performSearch();
  }

  performSearch = query => {
    console.log("Searching for: " + query);
    searchQuery = query;
    history.push(`/search/${query}`);
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          images: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">

          <Header search={this.performSearch}
                  history={this.history}/>
          <Route path={`/search/${searchQuery}`} render={ () => <SearchForm />} />

          <div className="photo-container">
            {
              (this.state.loading)
                ? <p>Loading...</p>
                : <Gallery data={this.state.images}
                           query={searchQuery}/>
            }
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
