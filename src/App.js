import Container from 'components/Container';
import Modal from 'components/modal/Modal';
import useFetchState, { FETCH_STATE } from 'hooks/useFetchState';
import IssuesModel from 'models/IssuesModel';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { issuesState } from 'states';

const App = () => {
  const [searchParams] = useSearchParams();
  const setRecoilIssues = useSetRecoilState(issuesState);
  const [renderComponent, setRenderComponent] = useState('<div>로딩중</div>');

  const onFetch = useCallback(async () => {
    const { data: issues } = await IssuesModel.get();
    return issues;
  }, []);
  const [fetchState, issues] = useFetchState(onFetch);

  useEffect(() => {
    if (fetchState === FETCH_STATE.LOADING) {
      setRenderComponent(<div>로딩중</div>);
    } else if (fetchState === FETCH_STATE.SUCCESS) {
      setRecoilIssues(issues);
      setRenderComponent(
        <>
          <Container />
          {searchParams.get('modal') && <Modal />}
        </>,
      );
    } else {
      setRenderComponent(<div>Error</div>);
    }
  }, [fetchState, issues, searchParams, setRecoilIssues]);

  return renderComponent;
};

export default App;
