import React from "react";
import {
  Switch,
  Route,
  useRouteMatch
} from "react-router-dom";

import Header from "./Header";
import SignIn from "./Forms/SignIn";
import SignUp from './Forms/SignUp';


function Login() {
  const { path, url } = useRouteMatch();

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


export default Login;