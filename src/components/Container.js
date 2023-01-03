import { issueCards } from 'constants/common';
import Cards from './Cards';
import styles from './Container.module.scss';

const Container = () => {
  return (
    <div className={styles.container}>
      {issueCards.map((card) => (
        <Cards key={card} title={card} />
      ))}
    </div>
  );
};

export default Container;
