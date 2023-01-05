import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPathTitle } from 'utils/sortIssueArray';
import styles from './Content.module.scss';

const Content = ({ title, id, pathState }) => {
  const navigate = useNavigate();

  const detailCardHandler = useCallback(
    () => navigate(`?modal=detail&state=${convertPathTitle(pathState)}&id=${id}`),
    [navigate, id, pathState],
  );

  return (
    <li className={styles.content} role="presentation" onClick={detailCardHandler} draggable>
      {title}
    </li>
  );
};

export default Content;
