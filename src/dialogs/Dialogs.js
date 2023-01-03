import { DIALOG_TYPE_CUSTOM, DIALOG_TYPE_MODAL } from 'hooks/useDialog';
import { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { dialogState } from 'states/dialogs';
import Modal from './Modal';

const Dialogs = () => {
  const dialogs = useRecoilValue(dialogState);

  const prevOverflowState = useRef(null);

  useEffect(() => {
    if (dialogs.length <= 0) {
      window.document.body.style.overflow = prevOverflowState.current;
    } else {
      prevOverflowState.current = window.document.body.style.overflow;

      window.document.body.style.overflow = 'hidden';
    }
  }, [dialogs.length]);

  const Dialog = useCallback((dialog) => {
    const { type, id } = dialog;

    let component = null;

    if (type === DIALOG_TYPE_MODAL) {
      component = <Modal key={id} {...dialog} />;
    } else if (type === DIALOG_TYPE_CUSTOM) {
      component = <dialog.component key={id} {...dialog} />;
    }

    return component;
  }, []);

  return dialogs.map((dialog) => <Dialog key={dialog.id} {...dialog} />);
};

export default Dialogs;
