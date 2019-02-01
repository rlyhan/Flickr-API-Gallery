import React, { Component } from 'react';
import './App.css';
import apiKey from './config.js'
import axios from 'axios';

import Header from './Components/Header';
import Nav from './Components/Nav'
import Gallery from './Components/Gallery';

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

  performSearch = () => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=sunsets&format=json&nojsoncallback=1`)
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
      <div className="container">
        <header>
          <Header />
        </header>

        <Nav />

        <div className="photo-container">
          <h2>Results</h2>
          {
            (this.state.loading)
              ? <p>Loading...</p>
              : <Gallery data={this.state.images} />
          }
        </div>
      </div>
    );
  }
}

export default App;
