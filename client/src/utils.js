import jwt from 'jsonwebtoken';
import _ from 'lodash';

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

export function userInProject(user, project) {
  const inTeam = _.find(project.team, (member) => member.name === user);
  const author = project.createdBy.name === user;

  return (inTeam || author);
}