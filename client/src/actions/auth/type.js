export const AUTH = "AUTH";
export const CLEAR_AUTH = 'CLEAR_AUTH';

export function auth(token) {
  return {
    type: AUTH,
    payload: token,
  };
}

export function clearAuth() {
  return {
    type: CLEAR_AUTH
  };
}
