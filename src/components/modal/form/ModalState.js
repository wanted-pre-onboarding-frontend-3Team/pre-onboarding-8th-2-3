import styles from './ModalState.module.scss';

const ModalState = ({ stateRef, state }) => {
  return (
    <div className={styles.container}>
      <span>상태: </span>
      <select className={styles.select} defaultValue={state} ref={stateRef}>
        <option value="todo">todo</option>
        <option value="doing">doing</option>
        <option value="done">done</option>
      </select>
    </div>
  );
};

export default ModalState;
