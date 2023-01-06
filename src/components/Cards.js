import styles from './Cards.module.scss';
import Content from './Content';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { convertPathTitle, sortIssueArray } from 'utils/sortIssueArray';
import { useRecoilState, useRecoilValue } from 'recoil';
import { issueState } from 'states/issueState';

const Cards = ({ title, list, loading }) => {
  const navigate = useNavigate();
  const [data, setData] = useRecoilState(issueState);
  const addCardHandler = useCallback(() => navigate(`/?modal=add&state=${convertPathTitle(title)}`), [navigate, title]);

  const filteredIssue = sortIssueArray(list, title);

  const handleDrop = (e) => {
    const itemId = e.dataTransfer.getData('itemId');
    const from = e.dataTransfer.getData('listName').split('_')[0];
    const to = e.target.tagName === 'LI' ? e.target.parentElement.id : e.target.id;
    console.log(data);
    const newData = [...data].map((el) => {
      if (el.id === itemId) {
        return { ...el, state: convertPathTitle(to.split('_')[0]) };
      }
      return { ...el };
    });
    const dd = { ...data.filter((el) => el.id === itemId)[0], state: convertPathTitle(to.split('_')[0]) };
    setData(newData);
  };

  return (
    <section className={styles.container}>
      <p>{title}</p>
      <ul
        id={`${title}_list`}
        className={styles.content}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={handleDrop}
      >
        {!loading &&
          filteredIssue.map((issue) => (
            <Content key={issue.id} title={issue.title} id={issue.id} pathState={title} manager={issue.manager} />
          ))}
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
