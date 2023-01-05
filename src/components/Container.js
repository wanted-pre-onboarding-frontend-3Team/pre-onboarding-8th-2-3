import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { issuesState } from 'states/store';
import { getIssues } from 'models/issue';
import useSeparatedIssues from 'hooks/useSeparatedIssues';
import Cards from './Cards';
import styles from './Container.module.scss';

const Container = () => {
  const [storeIssue, setStoreIssue] = useRecoilState(issuesState);
  const separatedIssues = useSeparatedIssues(storeIssue);
  useEffect(() => {
    getIssues()
      .then((issues) => {
        setStoreIssue(issues);
      })
      .catch(() => {
        // 에러 처리
      });
  }, []);

  return (
    <div className={styles.container}>
      {Object.keys(separatedIssues).map((card, idx) => {
        return <Cards key={card} title={card} list={separatedIssues[card]} />;
      })}
    </div>
  );
};

export default Container;
