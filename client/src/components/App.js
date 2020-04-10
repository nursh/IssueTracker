import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Projects from './Project/Projects';
import AuthPage from './AuthPage';
import AuthRoute from './AuthRoute';
import Main from './Main';


function App() {
  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/index" />
      </Route>
      <Route path="/index">
        <AuthPage />
      </Route>
      <AuthRoute path="/projects">
        <Projects />
      </AuthRoute>
      <AuthRoute path="/project">
        <Main />
      </AuthRoute>
    </Switch>
  </Router>
  );
}

export default App;
