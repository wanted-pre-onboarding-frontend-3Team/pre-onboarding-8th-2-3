import { useCallback, useEffect, useState } from 'react';
import { issueCards } from 'constants/common';
import Cards from './Cards';
import styles from './Container.module.scss';
import { editIssue, getIssues } from 'models/issue';
import { useRecoilState } from 'recoil';
import { issueState } from 'states/issueState';
import { convertPathTitle } from 'utils/sortIssueArray';

const Container = () => {
  const [issueList, setIssueList] = useRecoilState(issueState);
  const [loading, setLoading] = useState(false);
  const [dragStartCard, setDragStartCard] = useState(null);

  const onDragStart = useCallback((e) => {
    // TODO: 스타일 변경, 포인터 변경
    const { state } = e.target.dataset;
    const { id } = e.target;
    setDragStartCard({ id, state });
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
  }, []);

  const onDrop = useCallback(
    async (e) => {
      const section = e.target.closest('section');
      const changeState = convertPathTitle(section.id);

      if (changeState !== dragStartCard.state) {
        const issue = issueList.find((issue) => issue.id === dragStartCard.id);
        if (!issue) return;

        await editIssue(dragStartCard.id, { ...issue, state: changeState });

        setIssueList((prevIssues) =>
          prevIssues.map((issue) => {
            if (issue.id === dragStartCard.id) {
              return { ...issue, state: changeState };
            }

            return issue;
          }),
        );
      }

      setDragStartCard(null);
    },
    [dragStartCard, issueList, setIssueList],
  );

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
        <Cards
          key={card}
          title={card}
          list={issueList}
          loading={loading}
          dragHandlers={{ onDragStart, onDrop, onDragOver }}
        />
      ))}
    </div>
  );
};

export default Container;
