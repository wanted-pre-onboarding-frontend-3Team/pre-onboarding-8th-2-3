import { convertedIssueCard } from '../../hooks/useSeparatedIssues';
import styles from './ModalForm.module.scss';

const ModalForm = ({ issue, state: issueState, onSubmit, onDelete }) => {
  return (
    <form className={styles.container} onSubmit={onSubmit}>
      <input
        className={styles['issue-title']}
        type="text"
        defaultValue={issue?.title}
        placeholder="이슈를 입력하세요"
        required
      />
      <p>내용</p>
      <textarea className={styles['issue-content']} defaultValue={issue?.content} required />
      <p>상태</p>
      <select className={styles['issue-state']} id="state" defaultValue={issueState}>
        {convertedIssueCard.map((state) => (
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>
      <input className={styles['issue-date']} type="datetime-local" defaultValue={issue?.endDate} />
      <p>manager: {issue?.manager}</p>
      <button className={styles['issue-button']} type="submit" id={issue?.id}>
        저장
      </button>
      {issue && (
        <button className={styles['issue-button']} type="button" id={issue?.id} onClick={onDelete}>
          삭제
        </button>
      )}
    </form>
  );
};

export default ModalForm;
