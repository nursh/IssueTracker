export const AUTH = "AUTH";
export const CLEAR_AUTH = 'CLEAR_AUTH';

export function auth(data) {
  return {
    type: AUTH,
    payload: data.token,
  };
}

export function clearAuth() {
  return {
    type: CLEAR_AUTH
  };
}
