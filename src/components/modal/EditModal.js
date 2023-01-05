import { deleteIssue, postIssue, updateIssue } from 'models/issue';
import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { issuesState } from 'states/store';
import { uuidv4 } from 'util';
import ModalForm from './ModalForm';

const EditModal = ({ mode, onClose }) => {
  const [issues, setIssues] = useRecoilState(issuesState);
  const [searchParams] = useSearchParams();
  const propsState = useMemo(() => {
    let issue = null;
    let state = null;

    if (mode === 'detail') {
      const param = searchParams.get('id');
      issue = issues.find((data) => data.id === param);
      state = issue?.state;
    } else if (mode === 'add') {
      state = searchParams.get('state');
    }

    return { issue, state };
  }, [mode, issues, searchParams]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const form = e.target;
      const title = form[0].value;
      const content = form[1].value;
      const state = form[2].value;
      const endDate = form[3].value;
      const issueId = form[4].id;
      const newIssue = {
        title,
        content,
        state,
        endDate,
        order: '',
      };

      if (!issueId) {
        const id = uuidv4();

        newIssue.id = id;

        await postIssue(newIssue);
        setIssues((prev) => [...prev, newIssue]);
      } else {
        await updateIssue(issueId, newIssue);

        newIssue.id = issueId;

        setIssues((prev) => prev.map((issue) => (issue.id === issueId ? newIssue : issue)));
      }

      onClose();
    },
    [setIssues, onClose],
  );

  const onDelete = useCallback(
    async (e) => {
      const { id } = e.target;

      await deleteIssue(id);
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
      onClose();
    },
    [setIssues, onClose],
  );

  return <ModalForm issue={propsState.issue} state={propsState.state} onSubmit={onSubmit} onDelete={onDelete} />;
};

export default EditModal;
