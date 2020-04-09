export const AUTH = "AUTH";

export function auth(data) {
  return {
    type: AUTH,
    payload: data.token,
  };
}
