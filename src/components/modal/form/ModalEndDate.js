import styles from './ModalEndDate.module.scss';

const ModalEndDate = ({ issue }) => {
  return (
    <div className={styles['end-date']}>
      <label htmlFor="endDate">마감일: </label>
      <input type="datetime-local" id="endDate" defaultValue={issue && issue.endDate} />
    </div>
  );
};

export default ModalEndDate;
