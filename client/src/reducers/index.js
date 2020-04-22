import { combineReducers } from 'redux';
import auth from './auth';
import error from './error';
import projects from './projects';
import project from './project';
import issues from './issues';
import search from './search';


export default combineReducers({
  auth,
  error,
  projects,
  project,
  issues,
  search
});