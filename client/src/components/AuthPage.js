import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useRouteMatch, 
  useLocation,
  useHistory
} from "react-router-dom";
import queryString from 'query-string';
import { connect } from 'react-redux';

import Header from "./Header";
import SignIn from "./AuthForms/SignIn";
import SignUp from './AuthForms/SignUp';
import { handleOAuth } from '../actions/auth';


function AuthPage({ handleOAuth }) {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (location.search) {
      const { token } = queryString.parse(location.search);
      handleOAuth(token, history);
    }
  }, [location.search, handleOAuth, history]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header url={url} />

      <Switch>
        <Route exact path={[path, `${path}/signin`]}>
          <SignIn />
        </Route>
        <Route path={`${path}/signup`}>
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
}


export default connect(
  null,
  { handleOAuth }
)(AuthPage);