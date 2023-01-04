import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { issuesState } from 'states';

export const STATE = {
  PENDING: 'PENDING',
  RESOLVE: 'RESOLVE',
  REJECT: 'REJECT',
};

const useGuardRouter = () => {
  const [state, setState] = useState(STATE.PENDING);
  const [isFetched, setIsFetched] = useState(false);
  const [currentIssue, setCurrentIssue] = useState({});
  const [issues, setIssues] = useRecoilState(issuesState);

  const location = useLocation();

  useEffect(() => {
    (async () => {
      const response = await axios('http://localhost:3001/issues');
      if (response.status === 200) {
        const dbData = response.data;

        setIssues(dbData);
        setIsFetched(true);
      }
    })();
  }, []);

  useEffect(() => {
    const issue = issues.find((issue) => issue.id === Number(location.pathname.substring(1)));

    if (!isFetched) {
      setState(STATE.PENDING);
    } else if (issue || location.pathname === '/') {
      setState(STATE.RESOLVE);
      setCurrentIssue(issue ?? {});
    } else {
      setState(STATE.REJECT);
      setCurrentIssue({});
    }
  }, [location.pathname, isFetched]);

  return { state, currentIssue };
};

export default useGuardRouter;
