import styles from './Modal.module.scss';
import { useSetRecoilState } from 'recoil';
import { changeModalState } from '../../states/index';
import { GrFormClose } from 'react-icons/gr';

const ModalHeader = () => {
  const setModalState = useSetRecoilState(changeModalState);
  return (
    <div className={styles.modal_header}>
      <button className={styles['modal_header--closeBtn']} type="button" onClick={() => setModalState(false)}>
        <GrFormClose size="24" />
      </button>
    </div>
  );
};

export default ModalHeader;
