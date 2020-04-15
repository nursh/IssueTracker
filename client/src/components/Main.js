import React, { useEffect } from 'react'
import {
  Switch,
  Route,
  useRouteMatch,
  useParams,
  useLocation
} from 'react-router-dom';
import { connect } from 'react-redux';


import Sidebar from './Sidebar';
import Boards from './Boards';
import DeleteProject from './Project/DeleteProject';
import DeleteIssue from './Issue/DeleteIssue';
import CreateIssue from './Issue/CreateIssue'
import Modal from '../Modals/useModal';
import ManageIssues from './Issue/ManageIssues';
import EditIssue from './Issue/EditIssue';
import { handleFetchIssues } from '../actions/issues';


function Main({ project, handleFetchIssues, token }) {
  const { path, url } = useRouteMatch();
  const location = useLocation();
  
  const modal = location.state && location.state.modal;
  const issueToEdit = location.state && location.state.issue;

  useEffect(() => {
    handleFetchIssues(project._id, token);
  }, [project, handleFetchIssues])

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
          <Page issue={issueToEdit} />
        </Route>
      )}
    </div>
  );
}

function Page({ issue }) {
  let { page } = useParams();
  switch(page) {
    case 'create-issue':
      return <Modal UI={CreateIssue} />
    case 'delete-project':
      return <Modal UI={DeleteProject} />
    case 'edit-issue':
      return <Modal UI={EditIssue} issue={issue} />
    case 'delete-issue':
      return <Modal UI={DeleteIssue} issue={issue} />
    default: break;    
  }
}

const mapStateToProps = (state) => ({ project: state.project, token: state.auth.token });
export default connect(mapStateToProps, { handleFetchIssues })(Main);