import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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

  const selectedManager = useRecoilValue(selectManager);
  const setIssue = useSetRecoilState(issuesSelector);
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const dateRef = useRef(null);
  const stateRef = useRef(null);

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

    if (selectedIssue) {
      await editIssue(pathId, {
        id: selectedIssue.id,
        order: selectedIssue.order,
        title: titleRef.current.value,
        content: contentRef.current.value,
        endDate: dateRef.current.value,
        state: stateRef.current.value,
        manager: selectedManager || selectedIssue.manager,
      }).then((data) => setIssue(['PUT', data]));
    } else {
      await postIssue({
        id: v1(),
        order: orderHandler(issue, stateRef.current.value),
        title: titleRef.current.value,
        content: contentRef.current.value,
        endDate: dateRef.current.value,
        state: stateRef.current.value,
        manager: selectedManager,
      }).then((data) => setIssue(['POST', data]));
    }
    navigate('/');
  };

  const cancelHandler = () => navigate('/');

  const deleteHandler = async () => {
    await deleteIssue(pathId).then(() => setIssue(['DELETE', pathId]));
    navigate('/');
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <ModalTitle titleRef={titleRef} issue={selectedIssue} />
        <ModalContent contentRef={contentRef} issue={selectedIssue} />
        <ModalEndDate dateRef={dateRef} issue={selectedIssue} />
        <ModalManagers managers={managers} issue={selectedIssue} />
        <ModalState stateRef={stateRef} state={state} />
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
