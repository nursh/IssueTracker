import { ObjectId } from 'mongodb';
import { projectDB, buildProject } from 'projects';
import { issueDB } from 'issues';

export async function getProjectsController(req, res) {
  try {
    let query;
    if (req.query.search) {
      query = {
        $text: {
          $search: req.query.search
        }
      };
    } else {
      query = {
        $or: [
          { 'createdBy.id': req.user._id.toString() },
          { 'team.id': req.user._id.toString() }
        ]
      };
    }
    const projects = await projectDB.find(query);
    res.status(200).json({ projects });
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteProjectController(req, res) {
  try {
    const { projectId, createdById } = req.query;

    if (createdById !== req.user._id.toString()) {
      res.status(403).json({ message: 'User not allowed to delete project' });
    } else {
      const query = {
        _id: ObjectId(projectId),
        'createdBy.id': createdById
      };

      const issueQuery = {
        project: projectId
      };

      await projectDB.deleteOne(query);
      await issueDB.deleteMany(issueQuery);

      res.status(200).json({ message: 'success' });
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function createProjectController(req, res) {
  try {
    let { project } = req.body;
    project = {
      ...project,
      createdBy: {
        id: req.user._id.toString(),
        name: req.user.name
      }
    };
    const validatedProject = buildProject(project);
    const result = await projectDB.insertOne(validatedProject);

    if (result.success) {
      res.status(200).json({ project: result.inserted });
    } else {
      res.status(422).json({ message: 'Could not create project.' });
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateProjectController(req, res) {
  try {
    let user = {
      id: req.user._id.toString(),
      name: req.user.name
    };
    const { projectId } = req.body;
    await projectDB.addTeamMember(ObjectId(projectId), user);
    res.status(200).json({ message: 'success' });
  } catch (error) {
    throw new Error(error);
  }
}
