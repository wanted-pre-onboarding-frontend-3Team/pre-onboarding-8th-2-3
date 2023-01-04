import { useNavigate } from 'react-router-dom';

const Board = ({ currentIssue }) => {
  const navigator = useNavigate();

  const onClick = () => {
    navigator('/yeye');
  };

  return (
    <button type="button" onClick={onClick}>
      nav
    </button>
  );
};

export default Board;
