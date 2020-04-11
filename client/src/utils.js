import jwt from 'jsonwebtoken';

export function format(date) {
  const dateToFormat = new Date(date);
  const year = dateToFormat.getFullYear();
  const day = dateToFormat.getDate();

  const options = { month: "long" };
  const month = new Intl.DateTimeFormat("en-US", options).format(dateToFormat);

  return `${month} ${day}, ${year}`;
}

export function decodeToken(token) {
  try {
    const decoded = jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
    return decoded.name;
  } catch (error) {
    throw new Error(error);
  }
}