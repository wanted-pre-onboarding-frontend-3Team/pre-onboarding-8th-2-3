import styles from './Cards.module.scss';
import Content from './Content';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = ({ title, list }) => {
  const navigate = useNavigate();
  const addCardHandler = useCallback(() => navigate('/?modal=add'), [navigate]);

  return (
    <section className={styles.container}>
      <p>{title}</p>
      <ul className={styles.content}>
        {list.map((dummy) => (
          <Content key={dummy.id} title={dummy} />
        ))}
      </ul>
      <button type="button" className={styles['add-button']} onClick={addCardHandler}>
        <AiOutlinePlus />
        Add a card
      </button>
    </section>
  );
};

// TODO: React.memo를 써야할지 퍼포먼스 탭 확인!
export default Cards;
