import styles from './Cards.module.scss';
import Content from './Content';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Cards = ({ title, issue }) => {
  const navigate = useNavigate();

  const addCardHandler = useCallback(() => navigate('/?modal=add'), [navigate]);

  const filteredIssue = issue.filter((data) => data.state === title.toLowerCase().replace(/ /g, ''));

  return (
    <section className={styles.container}>
      <p>{title}</p>
      <ul className={styles.content}>
        {filteredIssue.map((data) => (
          <Content key={data.id} id={data.id} title={data.title} />
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
