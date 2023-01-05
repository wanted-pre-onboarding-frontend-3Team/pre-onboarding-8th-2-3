import { useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { issueState } from 'states/issueState';
import { convertPathTitle } from 'utils/sortIssueArray';
import styles from './Content.module.scss';

const Content = ({ title, id, pathState, manager }) => {
  const navigate = useNavigate();
  const [issues, setIssues] = useRecoilState(issueState);
  const startIssueRef = useRef(null);
  const endIssueRef = useRef(null);

  const detailCardHandler = useCallback(
    () => navigate(`?modal=detail&state=${convertPathTitle(pathState)}&id=${id}`),
    [navigate, id, pathState],
  );

  const onDragStartHandler = (e) => {
    startIssueRef.current = id;
  };

  const onDropHandler = (e) => {
    endIssueRef.current = id;
    const endEl = issues.find((issue) => issue.id === endIssueRef.current);
    console.log(endEl);
  };

  const onDragEndHandler = () => {
    const startEl = issues.find((issue) => issue.id === startIssueRef.current);

    console.log(startEl);
  };

  return (
    <li
      className={styles.content}
      role="presentation"
      onClick={detailCardHandler}
      draggable
      onDragStart={onDragStartHandler}
      onDrop={onDropHandler}
      onDragEnd={onDragEndHandler}
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <span>{title}</span>
      {manager && <span className={styles.profile}> {manager.slice(0, 1)}</span>}
    </li>
  );
};

export default Content;
