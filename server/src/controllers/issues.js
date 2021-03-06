import { ObjectId } from 'mongodb';
import { issueDB, buildIssue } from 'issues';

export async function getIssuesController(req, res) {
  try {
    const { projectId } = req.query;
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

export async function createIssueController(req, res) {
  try {
    let { issue } = req.body;
    issue = {
      ...issue,
      createdBy: {
        id: req.user._id.toString(),
        name: req.user.name
      }
    };

    const validatedIssue = buildIssue(issue);
    const { success, inserted } = await issueDB.insertOne(validatedIssue);

    if (success) {
      return res.status(200).json({ issue: inserted });
    }
    return res.status(422).json({ message: 'Could not create issue.' });
  } catch (error) {
    throw new Error(error);
  }
}

export async function deleteIssueController(req, res) {
  try {
    const { issueId } = req.query;

    if (!issueId) {
      return res.status(403).json({ message: 'IssueId is required' });
    }

    const query = {
      _id: ObjectId(issueId)
    };

    await issueDB.deleteOne(query);
    res.status(200).json({ message: 'Success' });
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateIssueController(req, res) {
  try {
    const { issue } = req.body;
    if (issue.status === 'CLOSED') {
      issue.progress = 'DONE';
    } else if (issue.status === 'OPEN') {
      if (issue.progress === 'DONE') {
        issue.progress = 'IN PROGRESS';
      }
    }

    const { title, description, status, priority, progress } = issue;
    const query = {
      $set: {
        title,
        description,
        status,
        priority,
        progress
      }
    };
    const { updated } = await issueDB.updateOne(ObjectId(issue._id), query);
    res.status(200).json({ issue: updated });
  } catch (error) {
    throw new Error(error);
  }
}
