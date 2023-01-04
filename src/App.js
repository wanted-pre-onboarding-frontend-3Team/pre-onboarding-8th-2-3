import Container from 'components/Container';
import Modal from 'components/modal/Modal';
import { useSearchParams } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

const App = () => {
  const [searchParams] = useSearchParams();

  return (
    <RecoilRoot>
      <Container />
      {searchParams.get('modal') && <Modal />}
    </RecoilRoot>
  );
};

export default App;
