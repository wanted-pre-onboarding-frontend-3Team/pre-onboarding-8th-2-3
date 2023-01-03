import styles from './Modal.module.scss';
import useDialog from 'hooks/useDialog';
import { useRef } from 'react';
import { useClickOutSide } from 'hooks/useClickOutside';

const Modal = (props) => {
  const { id, component, cancelable } = props;

  const { hideDialog } = useDialog();

  const outerRef = useRef(null);

  useClickOutSide(outerRef, (_, isMatched) => {
    if (isMatched && cancelable) {
      hideDialog(id);
    }
  });

  return (
    <div ref={outerRef} className={styles.outer}>
      <div className={styles.inner}>
        <button type="button" className={styles.close} onClick={() => hideDialog(id)} />
        {id}
        {component}
      </div>
    </div>
  );
};

export default Modal;
