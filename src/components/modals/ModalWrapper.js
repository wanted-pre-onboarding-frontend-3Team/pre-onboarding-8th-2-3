import { useCallback, useEffect } from 'react';
import styles from './Modal.module.scss';
// import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { changeModalState } from '../../states/index';
import ModalPortal from './ModalPortal';
import Modal from './Modal';

const ModalWrapper = () => {
  const setModalState = useSetRecoilState(changeModalState);
  const closeModal = useCallback(() => {
    setModalState(false);
    window.history.back();
  }, [setModalState]);

  useEffect(() => {
    window.history.pushState({ page: 'modal' }, document.title, '/modal');
    window.addEventListener('popstate', closeModal);
    return () => {
      window.removeEventListener('popstate', closeModal);
    };
  }, [closeModal]);

  return (
    <ModalPortal>
      <div className={styles.bg} role="presentation" onClick={closeModal} />
      <Modal />
    </ModalPortal>
  );
};
export default ModalWrapper;
