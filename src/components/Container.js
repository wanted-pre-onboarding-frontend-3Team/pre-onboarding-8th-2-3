import { useEffect } from 'react';
import { issueCards } from 'constants/common';
import Cards from './Cards';
import styles from './Container.module.scss';
import { getIssueList } from 'models/issue';
import { useRecoilState } from 'recoil';
import { issues } from 'states/store';

const Container = () => {
  const [list, setList] = useRecoilState(issues);

  useEffect(() => {
    getIssueList()
      .then((issues) => {
        setList(initializeIssues(issues));
      })
      .catch((error) => {
        // 에러 처리
        console.log(error);
      });
  }, [setList]);

  const initializeIssues = (issues) => {
    const newList = { todo: [], doing: [], done: [] };
    for (const issue of issues) {
      newList[issue.state]?.push(issue);
    }
    return newList;
  };

  return (
    <div className={styles.container}>
      {issueCards.map((card) => (
        <Cards key={card} title={card} list={list[card.toLowerCase().replace(/ /g, '')]} />
      ))}
    </div>
  );
};

export default Container;
