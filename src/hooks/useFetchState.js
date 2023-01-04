import { useEffect, useState } from 'react';

export const FETCH_STATE = {
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  FAIL: 'FAIL',
};

const useFetchState = (onFetch) => {
  // FIX: 변수 명 수정
  const [state, setState] = useState(FETCH_STATE.LOADING);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const data = await onFetch();
        setResponseData(data);
        setState('SUCCESS');
      } catch (e) {
        setState(FETCH_STATE.FAIL);
      }
    };

    FetchData();
  }, [onFetch]);

  return [state, responseData];
};

export default useFetchState;
