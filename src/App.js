import React, { Component } from 'react';
import {
  Link,
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

  performSearch = (query) => {
    console.log("new query: " + query);
    console.log("old searchQuery: " + searchQuery);
    if (query == null) {
      searchQuery = "mountains";
      console.log("Searching for " + searchQuery);
      this.fetchData();
    } else {
      if (query != searchQuery) {
        searchQuery = query;

        console.log("Searching for new searchQuery: " + searchQuery);
        this.fetchData();
      }
    }
    console.log("--------");
  }

  fetchData() {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&format=json&nojsoncallback=1`)
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
        <Switch>
          <div className="container">

            <Header search={this.performSearch}
                    history={history}/>

            <div className="photo-container">
              {
                (this.state.loading)
                  ? <p>Loading...</p>
                  : <Route exact path="/" render={ () => <Gallery data={this.state.images}
                                                                  query={searchQuery}
                                                                  history={history} /> } />
              }

              <Route path="/search/:query" render={ (props) => <Gallery data={this.state.images}
                                                                              search={this.performSearch(props.match.params.query)}
                                                                              query={props.match.params.query}
                                                                              history={history} /> } />
            </div>
          </div>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
