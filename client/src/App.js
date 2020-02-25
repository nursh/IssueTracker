import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Main from './Main';


function App() {
  return (
  <Router>
    <Switch>
      <Route path="/index">
        <Login />
      </Route>
      <Route path="/project">
        <Main />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
