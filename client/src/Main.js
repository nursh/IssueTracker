import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useParams
} from 'react-router-dom'
import Sidebar from './Sidebar';
import Boards from './Boards';
import DeleteProject from './DeleteProject';
import CreateIssue from './CreateIssue'
import Modal from './Modals/useModal';



export default function Main() {
  const { path, url } = useRouteMatch();

  return (
    <div className="h-screen flex">
      <Sidebar url={url} />
      <Switch>
        <Route exact path={`${path}`}>
          <Boards />
        </Route>
        <Route path={`${path}/:page`}>
          <Page />
        </Route>
      </Switch>
    </div>
  );
}

function Page() {
  let { page } = useParams();
  switch(page) {
    case 'create-issue':
      return <Modal UI={CreateIssue} />
    case 'delete-project':
      return <Modal UI={DeleteProject} />
    default: break;    
  }
}
