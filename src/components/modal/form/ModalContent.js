import styles from './ModalContent.module.scss';

const ModalContent = ({ issue }) => {
  return (
    <textarea
      rows="5"
      className={styles.textarea}
      placeholder="세부사항을 입력해주세요."
      required
      defaultValue={issue && issue.content}
    />
  );
};

export default ModalContent;
