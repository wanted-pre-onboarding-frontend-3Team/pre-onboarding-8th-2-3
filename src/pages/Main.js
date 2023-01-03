import { useCallback } from 'react';
import Dialogs from 'dialogs/Dialogs';
import useDialog from 'hooks/useDialog';

const Main = () => {
  const { modal } = useDialog();

  const Component = useCallback(() => {
    return <div>ddd</div>;
  }, []);

  return (
    <div style={{ paddingBottom: '5000px' }}>
      <button
        type="button"
        onClick={() => {
          modal(<Component />);
        }}
      >
        버튼
      </button>
      <Dialogs />
    </div>
  );
};

export default Main;
