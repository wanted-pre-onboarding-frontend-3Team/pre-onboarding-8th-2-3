import styles from './Cards.module.scss';
import Content from './Content';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPathTitle, sortIssueArray } from 'utils/sortIssueArray';

const Cards = ({ title, list, loading }) => {
  const navigate = useNavigate();

  const addCardHandler = useCallback(() => navigate(`/?modal=add&state=${convertPathTitle(title)}`), [navigate, title]);

  const filteredIssue = sortIssueArray(list, title);

  return (
    <section className={styles.container}>
      <p>{title}</p>
      <ul className={styles.content}>
        {!loading &&
          filteredIssue.map((issue) => <Content key={issue.id} title={issue.title} id={issue.id} pathState={title} />)}
        {loading && <p className={styles.loading}>loading...</p>}
      </ul>
      <button type="button" className={styles['add-button']} onClick={addCardHandler}>
        <AiOutlinePlus />
        Add a card
      </button>
    </section>
  );
};

export default Cards;
