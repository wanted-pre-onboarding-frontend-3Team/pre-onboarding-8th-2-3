import Backdrop from 'components/UI/Backdrop';
import { useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AddModal from './AddModal';
import DetailModal from './DetailModal';
import styles from './Modal.module.scss';

const ModalOverlay = () => {
  const [searchParams] = useSearchParams();

  const page = useMemo(() => searchParams.get('modal'), [searchParams]);

  const Content = useCallback(() => {
    let component;

    if (page === 'add') component = <AddModal />;
    else if (page === 'detail') component = <DetailModal />;

    return component;
  }, [page]);

  return (
    <div className={styles.container}>
      <Content />
    </div>
  );
};

const Modal = () => {
  const navigate = useNavigate();

  const closeModalHandler = useCallback(() => navigate('/'), [navigate]);

  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={closeModalHandler} />, document.getElementById('backdrop-root'))}
      {ReactDOM.createPortal(<ModalOverlay />, document.getElementById('overlay-root'))}
    </>
  );
};

export default Modal;
