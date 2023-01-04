import Cards from './Cards';
import styles from './Container.module.scss';
import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { listsState } from 'states';

const Container = () => {
  const setData = useSetRecoilState(listsState);
  const data = useRecoilValue(listsState);
  useEffect(() => {
    // 여기다 데이터 받아오기!
    // data받아오면 filter로
    fetch('https://csb-5mhw9m-9il39i3w4-sweesweett.vercel.app/issues')
      .then((data) => data.json())
      .then((data) => setData(data));
  }, [setData]);
  return (
    <div className={styles.container}>
      {Object.keys(data).map((card) => (
        <Cards key={card} title={card} />
      ))}
    </div>
  );
};

export default React.memo(Container);
