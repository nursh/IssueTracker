/* eslint-disable */
import { requiredParam } from '../helpers/required-param';

function buildUser({
  email = requiredParam('email'),
  createdOn = new Date(),
  signinMethod = requiredParam('signinMethod'),
  password
}) {}
