import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { issuesState } from 'states';
import Cards from './Cards';
import styles from './Container.module.scss';

const Container = () => {
  const [issues, setIssues] = useRecoilState(issuesState);
  const todoIssues = useMemo(() => issues.filter((issue) => issue.state === 'todo'), [issues]);
  const doingIssues = useMemo(() => issues.filter((issue) => issue.state === 'doing'), [issues]);
  const doneIssues = useMemo(() => issues.filter((issue) => issue.state === 'done'), [issues]);

  return (
    <div className={styles.container}>
      <Cards key="todo" title="todo" list={todoIssues} />
      <Cards key="doing" title="doing" list={doingIssues} />
      <Cards key="done" title="done" list={doneIssues} />
    </div>
  );
};

export default Container;
