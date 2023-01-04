import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Content.module.scss';

const Content = ({ title, id }) => {
  const navigate = useNavigate();

  const detailCardHandler = useCallback(() => navigate(`?modal=detail?id=${id}`), [navigate, id]);

  return (
    <li className={styles.content} role="presentation" onClick={detailCardHandler} draggable>
      {title}
    </li>
  );
};

export default Content;
