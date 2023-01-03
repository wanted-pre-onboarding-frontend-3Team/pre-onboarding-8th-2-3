import { useMemo, useState } from 'react';
import styles from './App.module.scss';
import cn from 'classnames';

const App = () => {
  const [state, setState] = useState(false);

  const classname = useMemo(() => {
    return cn(styles.test, { [styles.classnames]: state });
  }, []);

  return (
    <div className={classname}>
      <button type="button">버튼</button>
    </div>
  );
};

export default App;
