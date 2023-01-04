import IssueForm from 'components/IssueForm';
import styles from './AddModal.module.scss';

const AddModal = () => {
  return (
    <div className={styles.container}>
      <IssueForm />
    </div>
  );
};

export default AddModal;
