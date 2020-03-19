/* eslint-disable no-unused-vars */
import { projectDB } from 'projects';
import { decodeToken } from 'helpers/jwt-helper';

export function getProjectsController(req, res) {
  try {
    res.status(200).json({ message: req.user });
  } catch (error) {
    console.error(error);
  }
}
