import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { issueState } from 'states/issueState';
import styles from './DetailModal.module.scss';
import ModalForm from './ModalForm';

const DetailModal = () => {
  const issue = useRecoilValue(issueState);
  const [searchParams] = useSearchParams();

  const modalParams = useMemo(() => searchParams.get('id'), [searchParams]);

  const selectedIssue = issue.find((data) => data.id === modalParams);

  return (
    <div className={styles.container}>
      <ModalForm selectedIssue={selectedIssue} />
    </div>
  );
};

export default DetailModal;
