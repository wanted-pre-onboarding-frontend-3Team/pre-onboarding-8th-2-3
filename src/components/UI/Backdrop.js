import styles from './Backdrop.module.scss';

const Backdrop = ({ onClose }) => {
  return <div className={styles.container} onClick={onClose} role="presentation" />;
};

export default Backdrop;
