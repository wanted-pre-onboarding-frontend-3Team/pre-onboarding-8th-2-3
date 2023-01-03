import { useMemo, useState } from 'react';
import styles from './App.module.scss';
import cn from 'classnames';
import ModalWrapper from 'components/modals/ModalWrapper';
import { useRecoilState } from 'recoil';
import { changeModalState } from './states/index';

const App = () => {
  const [state, setState] = useState(false);
  const [modalState, setModalState] = useRecoilState(changeModalState);
  const classname = useMemo(() => {
    return cn(styles.test, { [styles.classnames]: state });
  }, [state]);

  return (
    <div className={classname}>
      {modalState && <ModalWrapper />}
      <button type="button" onClick={() => setModalState(true)}>
        버튼
      </button>
    </div>
  );
};

export default App;
