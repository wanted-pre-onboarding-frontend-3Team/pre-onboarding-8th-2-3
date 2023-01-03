import ModalHeader from './ModalHeader';
import styles from './Modal.module.scss';

const Modal = () => {
  return (
    <div className={styles.modal}>
      <ModalHeader />
      <input type="text" />
    </div>
  );
};
export default Modal;
