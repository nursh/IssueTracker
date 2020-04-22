import {
  FETCH_ISSUES,
  CREATE_ISSUE,
  EDIT_ISSUE, 
  FILTER_ISSUES,
  RESET_ISSUES
} from "../actions/issues";
import { CLEAR_AUTH } from "../actions/auth/type";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_ISSUES:
      return {
        ...state,
        issues: action.payload,
        filtered: false,
        filteredIssues: null
      };
    case CREATE_ISSUE:
      return state;
    case EDIT_ISSUE:
      return state;
    case FILTER_ISSUES:
      return {
        ...state,
        filtered: true,
        filteredIssues: filterIssues(state, action.payload),
      };
    case RESET_ISSUES:
      return {
        ...state,
        filtered: false,
        filteredIssues: null
      };
    case CLEAR_AUTH:
      return null;
    default:
      return state;
  }
}

function filterIssues(state, filters) {
  if (state) {
    const filteredIssues = state.issues.filter((issue) => {
      for (const key in filters) {
        if (key === 'createdBy') {
          if (issue.createdBy.id === filters[key]) return true;
        }
        if (issue[key] !== filters[key]) return false;
      }
      return true;
    });
    return filteredIssues.length > 0 ? filteredIssues : null;
  }

  return null;
}