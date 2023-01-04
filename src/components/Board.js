import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import Portal from './Portal';

const Board = ({ currentIssue }) => {
  const navigator = useNavigate();

  const onClick = () => {
    navigator('/yeye');
  };

  return (
    <>
      <button type="button" onClick={onClick}>
        nav
      </button>
      {currentIssue && currentIssue.id > 0 && (
        <Portal>
          {
            // TODO: 딤드 눌렀을 때 모달 끄고, 홈으로 리다이렉트
          }
          <Modal currentIssue={currentIssue} />
        </Portal>
      )}
    </>
  );
};

export default Board;
