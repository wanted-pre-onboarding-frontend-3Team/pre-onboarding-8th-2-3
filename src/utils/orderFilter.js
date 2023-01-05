export const orderHandler = (issue, state) => {
  const filterOrderIssue = issue.filter((data) => data.state === state);

  return filterOrderIssue.length + 1;
};
