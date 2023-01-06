import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPathTitle } from 'utils/sortIssueArray';
import styles from './Content.module.scss';

const Content = ({ pathState, issue }) => {
  const navigate = useNavigate();

  const detailCardHandler = useCallback(
    () => navigate(`?modal=detail&state=${convertPathTitle(pathState)}&id=${issue.id}`),
    [navigate, issue.id, pathState],
  );

  return (
    <li
      id={issue.id}
      className={styles.content}
      role="presentation"
      onClick={detailCardHandler}
      data-state={issue.state}
      draggable
    >
      <span>{issue.title}</span>
      {issue.manager && <span className={styles.profile}> {issue.manager.slice(0, 1)}</span>}
    </li>
  );
};

export default Content;
