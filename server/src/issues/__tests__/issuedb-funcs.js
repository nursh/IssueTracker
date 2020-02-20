import { issueDB } from '../index';
import { buildTestIssue } from 'test/generate';

let issue;

beforeAll(async () => {
  const { inserted } = await issueDB.insertOne(buildTestIssue());
  issue = inserted;
});

afterAll(async () => {
  await issueDB.delete({});
});

describe('insertOne(): ', () => {
  it('inserts a new issue given valid issue info details', async () => {
    const testIssue = buildTestIssue();
    const { inserted } = await issueDB.insertOne(testIssue);

    expect(inserted.title).toBe(testIssue.title);
  });
});

describe('find(): ', () => {
  it('returns an issue when filtered by an existing createdBy id', async () => {
    const {
      createdBy: { id }
    } = issue;
    const result = await issueDB.find({ 'createdBy.id': id });

    expect(result).not.toBeNull();
    expect(result[0].createdBy.id).toBe(id);
  });

  it('returns null, when an issue filtered by unknown title', async () => {
    const fakeTitle = 'Take ring to Mordor';
    const result = await issueDB.find({ title: fakeTitle });

    expect(result).toBeNull();
  });
});

describe('remove(): ', () => {
  it('removes an existing issue', async () => {
    const testIssue = buildTestIssue();
    await issueDB.insertOne(testIssue);

    const { title } = testIssue;
    await issueDB.delete({ title });

    const result = await issueDB.find({ title });
    expect(result).toBeNull();
  });
});

describe('update(): ', () => {
  it('updates an existing issue', async () => {
    const { priority, _id: issueId } = issue;
    const newPriority = 'NEW PRIORITY';
    const { updated } = await issueDB.updateOne(issueId, {
      $set: { priority: newPriority }
    });

    expect(updated.priority).not.toBe(priority);
  });
});
