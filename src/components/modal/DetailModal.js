import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { issues } from 'states/store';
import styles from './DetailModal.module.scss';

const DetailModal = () => {
  const issue = useRecoilValue(issues);
  const [searchParams] = useSearchParams();

  const modalParams = useMemo(() => searchParams.get('id'), [searchParams]);

  const selectedIssue = [...issue.todo, ...issue.doing, ...issue.done].find((data) => data.id === +modalParams); // 수정 필요

  return (
    <div className={styles.container}>
      <p>id: {selectedIssue?.id}</p>
      <p>title: {selectedIssue?.title}</p>
      <p>order: {selectedIssue?.order}</p>
      <p>content: {selectedIssue?.content}</p>
      <p>endDate: {selectedIssue?.endDate}</p>
      <p>state: {selectedIssue?.state}</p>
      <p>manager: {selectedIssue?.manager}</p>
    </div>
  );
};

export default DetailModal;
