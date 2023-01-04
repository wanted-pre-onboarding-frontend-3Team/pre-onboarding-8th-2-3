import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Content.module.scss';

const Content = ({ title }) => {
  const navigate = useNavigate();

  const detailCardHandler = useCallback(() => navigate('?modal=detail'), [navigate]);

  return (
    <li className={styles.content} role="presentation" onClick={detailCardHandler} draggable>
      {title}
    </li>
  );
};

// TODO: React.memo를 써야할지 퍼포먼스 탭 확인!
export default Content;
