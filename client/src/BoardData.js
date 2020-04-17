function filterIssues(issues, title) {
  if (!issues) return [];
  const filteredIssues = []
  for (const issue of issues) {
    if (issue.progress.toLowerCase() === title) {
      filteredIssues.push(issue._id);
    }
  }
  return filteredIssues;
}

function formatIssues(issues) {
  const formattedIssues = {};
  if (!issues) return formattedIssues;
  for (let issue of issues) {
    formattedIssues[issue._id] = issue
  }
  return formattedIssues;
}

export function initialData(issues) {
  return {
    issues: formatIssues(issues),
    boards: {
      'backlog': { title: 'backlog', issues: filterIssues(issues, 'backlog')},
      'in progress': { title: 'in progress', issues: filterIssues(issues, 'in progress') },
      'done': { title: 'done', issues: filterIssues(issues, 'done') }
    },
    boardOrder: ['backlog', 'in progress', 'done']
  }
}