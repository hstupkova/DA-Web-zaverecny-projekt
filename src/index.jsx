import React from 'react';
import { render } from 'react-dom';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './components/Home';
import Pairs from './components/Pairs';
import Audio from './components/Audio';
import Choice from './components/Choice';
import About from './components/About';

const App = () => (
  <Router>
    <Navigation />

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/hledani-dvojic">
        <Pairs />
      </Route>

      <Route path="/poslech">
        <Audio />
      </Route>

      <Route path="/vyber-slov">
        <Choice />
      </Route>

      <Route path="/o-projektu">
        <About />
      </Route>

    </Switch>

    <Footer />
  </Router>
);

render(<App />, document.querySelector('#app'));
