export function requiredParam(param) {
  throw new Error(`${param} is required, cannot be null or undefined.`);
}
