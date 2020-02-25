import React from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
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
        <Route exact path={path}>
          <SignIn />
        </Route>
        <Route path={`${path}/:formId`}>
          <Form />
        </Route>
      </Switch>
    </div>
  );
}

const Form = () => {
  let { formId } = useParams();

  return (
    formId === 'signin' 
      ? <SignIn />
      : <SignUp />
  );
}

export default Login;