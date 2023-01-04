import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Content.module.scss';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';

const Content = ({ title, manager }) => {
  const content = useRef();
  const navigate = useNavigate();

  const detailCardHandler = useCallback(() => navigate('?modal=detail'), [navigate]);

  const onDown = () => {
    console.log(content.current);
    const startX = content.current.clientX;
    const startY = content.current.clientY;
    // firstCard.addEventListener('pointermove', onPointerMove);
    // firstCard.addEventListener('pointerup', onPointerUp);
    // firstCard.addEventListener('pointerleave', onPointerUp);
    console.log(startX, startY);
  };
  return (
    <li
      className={styles.content}
      ref={content}
      onPointerDown={onDown}
      role="presentation"
      onClick={detailCardHandler}
      draggable
    >
      <p>{title}</p>
      {manager !== null && <span className={styles.profile}> {manager.slice(0, 1)}</span>}
    </li>
  );
};

export default Content;
