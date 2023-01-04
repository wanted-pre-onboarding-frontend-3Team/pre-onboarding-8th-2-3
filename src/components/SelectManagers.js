import { useEffect, useState } from 'react';
import styles from './SelectManagers.module.scss';
import { getManagerList } from 'models/issue';

const SelectManagers = ({ form, handleClickManager }) => {
  const [managerList, setManagerList] = useState([]);

  useEffect(() => {
    getManagerList()
      .then((res) => {
        const newManager = res.map((manager) => manager.name);
        setManagerList(newManager);
      })
      .catch((error) => {
        //
      });
  }, []);

  return (
    <ul>
      {managerList.map((manager) => {
        return (
          manager.includes(form.manager) && (
            <li
              key={manager}
              value={manager}
              className={styles.manager}
              onClick={handleClickManager}
              role="presentation"
            >
              {manager}
            </li>
          )
        );
      })}
    </ul>
  );
};

export default SelectManagers;
