import Backdrop from 'components/UI/Backdrop';
import { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EditModal from './EditModal';
import styles from './Modal.module.scss';

const ModalOverlay = ({ onClose }) => {
  const [searchParams] = useSearchParams();

  const page = useMemo(() => searchParams.get('modal'), [searchParams]);

  return (
    <div className={styles.container}>
      <EditModal mode={page} onClose={onClose} />
    </div>
  );
};

const Modal = () => {
  const navigate = useNavigate();

  const closeModalHandler = useCallback(() => navigate('/'), [navigate]);

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={closeModalHandler} />, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay onClose={closeModalHandler} />, document.getElementById('overlay-root'))}
    </>
  );
};

export default Modal;
