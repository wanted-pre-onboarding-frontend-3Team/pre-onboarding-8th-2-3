import Container from 'components/Container';
import Modal from 'components/modal/Modal';
import { useSearchParams } from 'react-router-dom';

const App = () => {
  const [searchParams] = useSearchParams();

  return (
    <>
      <Container />
      {searchParams.get('modal') && <Modal />}
    </>
  );
};

export default App;
