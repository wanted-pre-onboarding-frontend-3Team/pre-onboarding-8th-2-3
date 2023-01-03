import { useMemo, useState } from 'react';
import styles from './App.module.scss';
import cn from 'classnames';

function App() {
  const [state, setState] = useState(false);

  const classname = useMemo(() => {
    return cn(styles.test, { [styles.classnames]: state });
  }, []);

  return <div className={classname}>ddd</div>;
}

export default App;
