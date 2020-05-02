import setDB from '../db';
import buildProject from './project';
import projectDBFuncs from './projectdb-funcs';
import { createProjectSchema } from './project-schema';

const database = setDB();

createProjectSchema(database);
const projectDB = projectDBFuncs(database);

export { projectDB, buildProject };
