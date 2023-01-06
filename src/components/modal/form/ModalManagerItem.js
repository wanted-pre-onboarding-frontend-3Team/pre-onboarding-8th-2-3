import { useSetRecoilState } from 'recoil';
import { selectManager } from 'states/selectManagerState';
import styles from './ModalManagerItem.module.scss';

const ModalManagerItem = ({ manager, setSearchValue }) => {
  const setSelectedManager = useSetRecoilState(selectManager);
  const selectedHandler = () => {
    setSearchValue('');
    setSelectedManager(manager.name);
  };

  return (
    <li key={manager.id} role="presentation" onClick={selectedHandler} className={styles.manager}>
      {manager.name}
    </li>
  );
};

export default ModalManagerItem;
