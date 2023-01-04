import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './DetailModal.module.scss';
import { getIssue } from 'models/issue';
import IssueForm from 'components/IssueForm';

const DetailModal = () => {
  const [searchParams] = useSearchParams();

  const modalParams = useMemo(() => searchParams.get('id'), [searchParams]);
  const [selectedIssue, setSelectedIssue] = useState();

  useEffect(() => {
    getIssue(+modalParams)
      .then((data) => {
        setSelectedIssue(data);
      })
      .catch(() => {
        //
      });
  }, [modalParams]);

  return (
    <div className={styles.container}>
      <IssueForm issue={selectedIssue} />
    </div>
  );
};

export default DetailModal;
