import { useCallback, useEffect, useState } from 'react';
import { issueCards } from 'constants/common';
import Cards from './Cards';
import styles from './Container.module.scss';
import { getIssues } from 'models/issue';
import { useRecoilState } from 'recoil';
import { issueState } from 'states/issueState';

const Container = () => {
  const [issueList, setIssueList] = useRecoilState(issueState);
  const [loading, setLoading] = useState(false);

  const fetchIssueHandler = useCallback(async () => {
    setLoading(true);
    await getIssues()
      .then((issues) => {
        setIssueList(issues);
        setLoading(false);
      })
      .catch(() => {
        // 에러 처리
      });
  }, [setIssueList]);

  useEffect(() => {
    fetchIssueHandler();
  }, [fetchIssueHandler]);

  return (
    <div className={styles.container}>
      {issueCards.map((card) => (
        <Cards key={card} title={card} list={issueList} loading={loading} />
      ))}
    </div>
  );
};

export default Container;
