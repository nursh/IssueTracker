import { projectDB } from 'projects';

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
