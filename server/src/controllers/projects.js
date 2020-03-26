import { ObjectId } from 'mongodb';
import { projectDB, buildProject } from 'projects';

export async function getProjectsController(req, res) {
  try {
    let query;
    if (req.body.search) {
      query = {
        $text: {
          $search: req.body.search
        }
      };
    } else {
      query = {
        'createdBy.id': req.user._id
      };
    }
    const projects = await projectDB.find(query);

    res.status(200).json({ projects });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProjectController(req, res) {
  try {
    const { projectId, createdById } = req.body;

    if (createdById !== req.user._id.toString()) {
      res.status(403).json({ message: 'User not allowed to delete project' });
    } else {
      const query = {
        _id: ObjectId(projectId),
        'createdBy.id': createdById
      };

      await projectDB.deleteOne(query);
      /**
       * TO DO -> must add deletion of related issues.
       */
      res.status(200).json({ message: 'success' });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function createProjectController(req, res) {
  try {
    const { project } = req.body;
    const validatedProject = buildProject(project);
    const result = await projectDB.insertOne(validatedProject);

    if (result.success) {
      res.status(200).json({ message: result.inserted });
    } else {
      res.status(422).json({ message: 'Could not create project.' });
    }
  } catch (error) {
    console.log(error);
  }
}
