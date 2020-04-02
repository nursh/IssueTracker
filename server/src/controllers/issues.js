/* eslint-disable */
import { ObjectId } from 'mongodb';
import { issueDB, buildIssue } from 'issues';

export async function getIssuesController(req, res) {
  try {
    const { projectId } = req.body;
    if (!projectId) {
      return res.status(400).json({ message: 'ProjectId is required.' });
    }
    const query = {
      project: projectId
    };
    const issues = await issueDB.find(query);
    return res.status(200).json({ issues });
  } catch (error) {
    throw new Error(error);
  }
}
