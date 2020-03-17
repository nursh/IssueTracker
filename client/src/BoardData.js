export default {
  issues: {
    "issue-1": {
      id: 'issue-1',
      title: "of letters, as opposed to using Content here",
      priority: "High",
      author: "John Tofobu"
    },
    "issue-2": {
      id: 'issue-2',
      title: "making it over 2000 years old. ",
      priority: "Low",
      author: "Sarah Connor"
    },
    "issue-3": {
      id: 'issue-3',
      title: "combined with a handful of model sentence",
      priority: "Medium",
      author: "Michael Abdul"
    }
  },

  boards: {
    "backlog": { title: "backlog", issues: ["issue-1", "issue-2", "issue-3"] },
    "in progress": { title: "in progress", issues: [] },
    "done": { title: "done", issues: [] }
  },

  boardOrder: ["backlog", "in progress", "done"]
};
