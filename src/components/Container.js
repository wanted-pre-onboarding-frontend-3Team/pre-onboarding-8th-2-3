import axios from 'axios';
import { issueCards } from 'constants/common';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { issueState } from 'states/issueState';
import Cards from './Cards';
import styles from './Container.module.scss';

const Container = () => {
  const [issue, setIssue] = useRecoilState(issueState);

  const fetchIssueHandler = useCallback(async () => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/issues`);

    setIssue(response.data);
  }, [setIssue]);

  useEffect(() => {
    fetchIssueHandler();
  }, [fetchIssueHandler]);

  return (
    <main className={styles.container}>
      {issueCards.map((card) => (
        <Cards key={card} title={card} issue={issue} />
      ))}
    </main>
  );
};

export default Container;
