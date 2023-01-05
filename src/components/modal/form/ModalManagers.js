import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectManager } from 'states/selectManagerState';
import ModalManagerItem from './ModalManagerItem';
import styles from './ModalManagers.module.scss';

const ModalManagers = ({ managers, issue }) => {
  const [searchValue, setSearchValue] = useState('');
  const [filteredManager, setFilteredManager] = useState([]);
  const selectedManager = useRecoilValue(selectManager);

  const searchHandler = (e) => {
    const regExp = new RegExp(e.target.value, 'd');
    const matchedManagers = managers.filter((manager) => manager.name.match(regExp));

    setSearchValue(e.target.value);
    setFilteredManager(matchedManagers);
  };

  return (
    <div className={styles.manager}>
      <label htmlFor="manager">담당자 검색: </label>
      <input type="text" id="manager" onChange={searchHandler} value={searchValue} />
      {searchValue !== '' && (
        <ul className={styles.list}>
          {filteredManager.length > 0 &&
            filteredManager.map((manager) => (
              <ModalManagerItem key={manager.id} manager={manager} setSearchValue={setSearchValue} />
            ))}
          {filteredManager.length === 0 && <div className={styles['search-box']}>담당자를 검색해주세요.</div>}
        </ul>
      )}
      {issue && selectedManager === '' && (
        <div className={styles['select-manager']}>
          <span>담당자: </span>
          <p>{issue.manager}</p>
        </div>
      )}
      {selectedManager !== '' && (
        <div className={styles['select-manager']}>
          <span>담당자: </span>
          <p>{selectedManager}</p>
        </div>
      )}
    </div>
  );
};

export default ModalManagers;
