import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Projects from './Project/Projects';
import Auth from './Auth';
import Main from './Main';


function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/index" />
      </Route>
      <Route path="/index">
        <Auth />
      </Route>
      <Route path="/projects">
        <Projects />
      </Route>
      <Route path="/project">
        <Main />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
