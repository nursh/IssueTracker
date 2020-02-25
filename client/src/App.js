import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';


function App() {
  return (
  <Router>
    <Switch>
      <Route path="/index">
        <Login />
      </Route>
    </Switch>
  </Router>
  );
}

export default App;
