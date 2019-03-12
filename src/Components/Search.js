import React, { Component } from 'react';
import axios from 'axios';
import { createBrowserHistory } from 'history';

import Header from './Header';
import Gallery from './Gallery';
import apiKey from '../config.js'

let searchQuery = "";
let url = window.location.href;
const history = createBrowserHistory();

class Search extends Component {

  constructor(props) {
    super(props);
    if (url.includes("search") === false) {
      searchQuery = 'mountains';
    } else {
      searchQuery = url.split("/search/")[1];
    }
    this.state = {
      images: [],
      loading: true,
      currentQuery: ""
    };
    this.fetchData(searchQuery);
  }

  componentDidMount() {
    this.performSearch(searchQuery);
  }

  performSearch = (query) => {
    if (query == null) {
      searchQuery = "mountains";
      this.fetchData();
    } else {
      if (query !== searchQuery) {
        searchQuery = query;
        this.fetchData(searchQuery);
      }
    }
  }

  fetchData = (query) => {
    history.push(`/search/${query}`);
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          images: response.data.photos.photo,
          loading: false,
          currentQuery: query
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });
  }

  render() {
    return (
      <React.Fragment>
          <Header search={this.performSearch} />
          <div className="photo-container">
            {
              (this.state.loading)
                ? <p>Loading...</p>
                : <Gallery data={this.state.images}
                           query={this.state.currentQuery}
                           history={history} />
            }
          </div>
      </React.Fragment>
    );
  }

}

export default Search;
