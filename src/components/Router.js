import useGuardRouter, { STATE } from 'hooks/useGuardRouter';
import Board from './Board';
import Error from './Error';

const Router = () => {
  const { state, currentIssue } = useGuardRouter();
  let component = null;

  if (state === STATE.RESOLVE) {
    component = <Board currentIssue={currentIssue} />;
  } else if (state === STATE.PENDING) {
    component = <div>pending</div>;
  } else {
    component = <Error />;
  }

  return component;
};

export default Router;
