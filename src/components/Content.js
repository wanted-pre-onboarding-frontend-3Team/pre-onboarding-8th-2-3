import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPathTitle } from 'utils/sortIssueArray';
import styles from './Content.module.scss';

const Content = ({ title, id, pathState, manager }) => {
  const navigate = useNavigate();
  const [target, setTarget] = useState([0, 0]);

  const detailCardHandler = useCallback(
    () => navigate(`?modal=detail&state=${convertPathTitle(pathState)}&id=${id}`),
    [navigate, id, pathState],
  );
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('itemId', id);
    e.dataTransfer.setData('listName', e.target.parentElement.id);
  };

  return (
    <li
      className={styles.content}
      role="presentation"
      onClick={detailCardHandler}
      onDragStart={(e) => handleDragStart(e, id)}
      draggable
    >
      <span>{title}</span>
      {manager && <span className={styles.profile}> {manager.slice(0, 1)}</span>}
    </li>
  );
};

export default Content;
