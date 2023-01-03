import { useEffect } from 'react';
import styles from './ModalWrapper.module.scss';
// import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { changeModalState } from '../../states/index';
import ModalPortal from './ModalPortal';
import Modal from './Modal';

const ModalWrapper = () => {
  // useEffect(() => {
  //   history.pushState({ page: 'modal' }, document.title);
  //   showAnimatedModal();
  //   document.addEventListener('keyup', detectESC);
  //   window.addEventListener('popstate', goBack);
  //   return () => {
  //     document.removeEventListener('keyup', detectESC);
  //     window.removeEventListener('popstate', goBack);
  //   };
  // }, []);
  useEffect(() => {
    return () => {};
  }, []);
  const setModalState = useSetRecoilState(changeModalState);
  return (
    <ModalPortal>
      <div className={styles.bg} role="presentation" onClick={() => setModalState(false)} />
      <Modal />
    </ModalPortal>
  );
};
export default ModalWrapper;
