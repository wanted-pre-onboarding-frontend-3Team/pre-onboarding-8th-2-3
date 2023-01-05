import { useRecoilValue } from 'recoil';
import { issueState } from 'states/issueState';
import styles from './AddModal.module.scss';
import ModalForm from './ModalForm';

const AddModal = () => {
  const issue = useRecoilValue(issueState);

  return (
    <div className={styles.container}>
      <ModalForm issue={issue} />
    </div>
  );
};

export default AddModal;
