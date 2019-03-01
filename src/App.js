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
import Error from './Components/Error';

let searchQuery;

const history = createBrowserHistory();

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
      console.log("Searching for " + searchQuery);
      this.fetchData();
    } else {
      if (query != searchQuery) {
        searchQuery = query;
        console.log("Searching for new searchQuery: " + searchQuery);
        this.fetchData();
      } else {

      }
    }
  }

  fetchData() {
    console.log("currentQuery: " + this.state.currentQuery);
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&format=json&nojsoncallback=1`)
      .then(response => {
        console.log("Fetching " + searchQuery);
        console.log("--------");
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

  repeatSearch() {
    this.setState({
      images: [],
      loading: true,
      currentQuery: ""
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
              <Route path="/home/:query" render={ (props) => <Gallery data={this.state.images}
                                                                      query={this.state.currentQuery}
                                                                      url={"/home"}
                                                                      history={history} /> } />
              <Route path="/search/:query" render={ (props) => <Gallery data={this.state.images}
                                                                        search={this.performSearch(props.match.params.query)}
                                                                        query={this.state.currentQuery}
                                                                        url={"/search"}
                                                                        history={history} /> } />
            </div>

          </div>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
