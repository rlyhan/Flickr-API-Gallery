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
let url = window.location.href;
const history = createBrowserHistory();



class App extends Component {

  constructor() {
    super();
    this.state = {
      images: [],
      loading: true,
      currentQuery: ""
    };
    history.push(url.split("/")[1]);
    this.performSearch = this.performSearch.bind(this);
    this.fetchData = this.fetchData.bind(this);
    history.listen((location, action) => {
      searchQuery = location.pathname.split("/search/")[1];
      if (searchQuery !== this.state.currentQuery) {
        console.log("Old query: " + this.state.currentQuery);
        console.log("New query: " + searchQuery);
        console.log('Route change!');
        this.fetchData();
      }
    });
  }

  componentDidMount() {
    history.push(url.split("/")[1]);
    searchQuery = url.split("/search/")[1];
    this.setState({ currentQuery: searchQuery });
    this.fetchData();
  }



  performSearch = () => {
    if (searchQuery == null) {
      searchQuery = "mountains";
      this.fetchData();
    } else {
      if (searchQuery !== this.state.currentQuery) {
        this.fetchData();
      }
    }
  }

  fetchData() {
    console.log("searchQuery: " + searchQuery);
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${searchQuery}&format=json&nojsoncallback=1`)
      .then(response => {
        console.log("Fetching new searchQuery: " + searchQuery);
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



  render() {
    return (
      <BrowserRouter>
        <Switch>
          <div className="container">

            <Header history={history} />

            <div className="photo-container">
              {
                (this.state.loading)
                  ? <p>Loading...</p>
                  : <Route path="/" render={ () => <Redirect to="/search/mountains" /> } />
              }

            <Route path="/search/:query" render={ (props) => <Gallery data={this.state.images}
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
