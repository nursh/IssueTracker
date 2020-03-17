import React from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useLocation
} from 'react-router-dom'
import Sidebar from './Sidebar';
import Boards from './Boards';
import DeleteProject from './DeleteProject';
import DeleteIssue from './DeleteIssue';
import CreateIssue from './CreateIssue'
import Modal from './Modals/useModal';
import ManageIssues from './ManageIssues';
import EditIssue from './EditIssue';



export default function Main() {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  
  const modal = location.state && location.state.modal;
  console.log(modal);

  return (
    <div className="h-screen flex">
      <Sidebar url={url} />
      <Switch location={modal || location}>
        <Route exact path={`${path}`}>
          <Boards />
        </Route>
        <Route path={`${path}/manage-issues`}>
          <ManageIssues url={url} />
        </Route>
      </Switch>

      {modal && (
        <Route path={`${path}/:page`}>
          <Page />
        </Route>
      )}
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
    case 'edit-issue':
      return <Modal UI={EditIssue} />
    case 'delete-issue':
      return <Modal UI={DeleteIssue} />
    default: break;    
  }
}
