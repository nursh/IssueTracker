import React from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

function AuthRoute({ children, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => auth
        ? (children)
        : (
            <Redirect 
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  )
}

const mapStateToProps = ({ auth }) => ({ auth: auth });
export default connect(
  mapStateToProps, {}
)(AuthRoute)