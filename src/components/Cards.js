import styles from './Cards.module.scss';
import Content from './Content';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const DUMMY_CONTENT = ['asdasd', 'asddgg', 'stejn', 'btdjkn'];

const Cards = ({ title }) => {
  const navigate = useNavigate();

  const addCardHandler = useCallback(() => navigate('/?modal=add'), [navigate]);

  return (
    <section className={styles.container}>
      <p>{title}</p>
      <ul className={styles.content}>
        {DUMMY_CONTENT.map((dummy) => (
          <Content key={dummy} title={dummy} />
        ))}
      </ul>
      <button type="button" className={styles['add-button']} onClick={addCardHandler}>
        <AiOutlinePlus />
        Add a card
      </button>
    </section>
  );
};

export default Cards;
