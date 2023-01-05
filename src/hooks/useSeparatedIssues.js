import { issueCards } from 'constants/common';
import { useEffect, useState } from 'react';

// TODO: 정리 필요함
export const convertedIssueCard = issueCards.map((card) => card.toLowerCase().replace(/ /g, ''));

const useSeparatedIssues = (issues) => {
  const [separatedIssues, setSeparatedIssues] = useState(initializeIssues(issues));

  useEffect(() => {
    if (issues.length !== 0) {
      setSeparatedIssues(initializeIssues(issues));
    }
  }, [issues]);

  return separatedIssues;
};

const initializeIssues = (issues) => {
  const newIssues = {};
  convertedIssueCard.forEach((card) => {
    newIssues[card] = [];
  });
  for (const issue of issues) {
    newIssues[issue.state].push(issue);
  }

  return newIssues;
};

export default useSeparatedIssues;
