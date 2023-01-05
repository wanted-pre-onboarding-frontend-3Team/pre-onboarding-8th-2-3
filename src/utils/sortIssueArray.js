export const sortIssueArray = (array, title) =>
  array.filter((data) => data.state === title.toLowerCase().replace(/ /g, '')).sort((a, b) => b.id - a.id);

export const convertPathTitle = (title) => title.toLowerCase().replace(/ /g, '');
