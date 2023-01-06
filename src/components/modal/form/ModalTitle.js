import styles from './ModalTitle.module.scss';

const ModalTitle = ({ issue }) => {
  return (
    <div className={styles.title}>
      <label htmlFor="title">제목</label>
      <input type="text" id="title" required defaultValue={issue && issue.title} />
    </div>
  );
};

export default ModalTitle;
