export const sortIssueArray = (array, title) =>
  array.filter((data) => data.state === title.toLowerCase().replace(/ /g, '')).sort((a, b) => a.order - b.order);

export const convertPathTitle = (title) => title.toLowerCase().replace(/ /g, '');
