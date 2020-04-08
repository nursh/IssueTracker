export const GET_ERROR = 'GET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export function getError(error) {
  return {
    type: GET_ERROR,
    payload: error
  };
}

export function clearError() {
  return {
    type: CLEAR_ERROR
  };
}