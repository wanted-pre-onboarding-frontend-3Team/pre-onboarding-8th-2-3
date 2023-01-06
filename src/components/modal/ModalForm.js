import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { selectManager } from 'states/selectManagerState';
import ModalContent from './form/ModalContent';
import ModalEndDate from './form/ModalEndDate';
import ModalManagers from './form/ModalManagers';
import ModalTitle from './form/ModalTitle';

import styles from './ModalForm.module.scss';
import { deleteIssue, editIssue, getManages, postIssue } from 'models/issue';
import { v1 } from 'uuid';
import ModalState from './form/ModalState';
import { orderHandler } from 'utils/orderFilter';
import { issuesSelector } from 'states/issueState';

const ModalForm = ({ issue, selectedIssue }) => {
  const [managers, setManagers] = useState([]);
  const setIssues = useSetRecoilState(issuesSelector);
  const selectedManager = useRecoilValue(selectManager);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const state = useMemo(() => searchParams.get('state'), [searchParams]);
  const pathId = useMemo(() => searchParams.get('id'), [searchParams]);

  const fetchManagerList = useCallback(() => {
    getManages()
      .then((manager) => {
        setManagers(manager);
      })
      .catch(() => {
        // 에러 처리
      });
  }, []);

  useEffect(() => {
    fetchManagerList();
  }, [fetchManagerList]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const id = form.id ? form.id : v1();
    const title = form[0].value;
    const content = form[1].value;
    const endDate = form[2].value;
    const state = form[4].value;
    const newIssue = {
      id,
      title,
      content,
      endDate,
      state,
    };

    if (selectedIssue) {
      newIssue.manager = selectedManager || selectedIssue.manager;
      newIssue.order = selectedIssue.order;

      await editIssue(pathId, newIssue);

      setIssues(['PUT', newIssue]);
    } else {
      newIssue.manager = selectedManager;
      newIssue.order = orderHandler(issue, newIssue.state);

      await postIssue(newIssue);

      setIssues(['POST', newIssue]);
    }

    navigate('/');
  };

  const cancelHandler = () => navigate('/');

  const deleteHandler = async () => {
    await deleteIssue(pathId);
    setIssues(['DELETE', pathId]);
    navigate('/');
  };

  return (
    <>
      <form id={selectedIssue?.id} onSubmit={submitHandler}>
        <ModalTitle issue={selectedIssue} />
        <ModalContent issue={selectedIssue} />
        <ModalEndDate issue={selectedIssue} />
        <ModalManagers managers={managers} issue={selectedIssue} />
        <ModalState state={state} />
        <div className={styles['button-wrapper']}>
          <button type="submit" className={styles['add-button']}>
            {selectedIssue ? '수정' : '추가'}
          </button>
          <button type="button" className={styles['cancel-button']} onClick={cancelHandler}>
            취소
          </button>
        </div>
      </form>

      {selectedIssue && (
        <button type="button" onClick={deleteHandler} className={styles['delete-button']}>
          삭제
        </button>
      )}
    </>
  );
};

export default ModalForm;
