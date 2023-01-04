import styles from './Cards.module.scss';
import Content from './Content';
import { AiOutlinePlus } from 'react-icons/ai';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { listsState } from 'states';

const Cards = ({ title }) => {
  const navigate = useNavigate();
  const addCardHandler = useCallback(() => navigate('/?modal=add'), [navigate]);
  const [data, setData] = useRecoilState(listsState);
  const [listTitle, setListTitle] = useState(title);
  const editTitle = (e) => {
    setListTitle(e.target.value);
  };
  const editTitleBlur = () => {
    if (title === listTitle) return;
    // 통신
    console.log('test');
  };
  return (
    <section className={styles.container}>
      <input
        type="text"
        value={listTitle}
        onBlur={editTitleBlur}
        onChange={editTitle}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            e.target.blur();
          }
        }}
        className={styles.container__input}
      />
      <ul className={styles.content}>
        {data[title].map((dummy) => (
          <Content key={dummy.id} title={dummy.title} manager={dummy.manager} />
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
