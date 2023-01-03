import { useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { dialogState } from '../states/dialogs';

export const DIALOG_TYPE_CUSTOM = 1;
export const DIALOG_TYPE_MODAL = 2;

const useDialog = () => {
  const setDialogs = useSetRecoilState(dialogState);

  const lastDialogId = useRef(1);

  const pushDialog = useCallback(
    (params) => {
      const id = lastDialogId.current;

      const dialog = {
        id,
        ...params,
      };

      setDialogs((prev) => {
        return [...prev, dialog];
      });

      lastDialogId.current += 1;

      return id;
    },
    [setDialogs],
  );

  /**
   * @param {
   *    type(int, *): dialog type (DIALOG_TYPE_CUSTOM)
   *    component(object): only DIALOG_TYPE_CUSTOM
   *    cancelable(bool): click outside close dialog
   *    history(bool): navigate url
   * }
   */
  const showDialog = useCallback(
    ({ type, component, cancelable = true, history = true }) => {
      let _resolve;

      const promise = new Promise((__resolve, __reject) => {
        _resolve = __resolve;
      });

      pushDialog({
        type,
        component,
        cancelable,
        history,
        resolve: (params) => {
          _resolve(params);
        },
      });

      return promise;
    },
    [pushDialog],
  );

  const hideDialog = useCallback(
    (id) => {
      setDialogs((prev) => {
        return prev.filter((dialog) => dialog.id !== id);
      });
    },
    [setDialogs],
  );

  const modal = useCallback((component) => showDialog({ type: DIALOG_TYPE_MODAL, component }), [showDialog]);

  return { pushDialog, hideDialog, modal };
};

export default useDialog;
