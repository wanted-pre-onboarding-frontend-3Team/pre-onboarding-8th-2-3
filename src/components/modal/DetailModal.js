import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { issueState } from 'states/issueState';
import styles from './DetailModal.module.scss';

const DetailModal = () => {
  const issue = useRecoilValue(issueState);
  const [searchParams] = useSearchParams();

  const modalParams = useMemo(() => searchParams.get('id'), [searchParams]);

  const selectedIssue = issue.find((data) => data.id === +modalParams);

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
