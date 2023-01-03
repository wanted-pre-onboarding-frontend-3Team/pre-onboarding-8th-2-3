import { useEffect } from 'react';
import styles from './Modal.module.scss';
// import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { changeModalState } from '../../states/index';
import ModalPortal from './ModalPortal';
import Modal from './Modal';

const ModalWrapper = () => {
  const setModalState = useSetRecoilState(changeModalState);
  useEffect(() => {
    const closeModal = () => {
      setModalState(false);
    };
    window.history.pushState({ page: 'modal' }, document.title);
    window.addEventListener('popstate', closeModal);
    return () => {
      window.removeEventListener('popstate', closeModal);
    };
  }, []);

  return (
    <ModalPortal>
      <div className={styles.bg} role="presentation" onClick={() => setModalState(false)} />
      <Modal />
    </ModalPortal>
  );
};
export default ModalWrapper;
