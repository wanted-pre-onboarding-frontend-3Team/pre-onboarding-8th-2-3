export const sortIssueArray = (array, title) =>
  array.filter((data) => data.state === title.toLowerCase().replace(/ /g, '')).sort((a, b) => b.order - a.order);

export const convertPathTitle = (title) => title.toLowerCase().replace(/ /g, '');
