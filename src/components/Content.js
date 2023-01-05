import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPathTitle } from 'utils/sortIssueArray';
import styles from './Content.module.scss';

const Content = ({ title, id, pathState, manager }) => {
  const navigate = useNavigate();

  const detailCardHandler = useCallback(
    () => navigate(`?modal=detail&state=${convertPathTitle(pathState)}&id=${id}`),
    [navigate, id, pathState],
  );

  return (
    <li className={styles.content} role="presentation" onClick={detailCardHandler} draggable>
      <span>{title}</span>
      {manager && <span className={styles.profile}> {manager.slice(0, 1)}</span>}
    </li>
  );
};

export default Content;
