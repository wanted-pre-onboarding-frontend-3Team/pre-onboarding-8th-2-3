import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './IssueForm.module.scss';
import { useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { issues } from 'states/store';
import useForm from 'hooks/useForm';
import { editIssue, postIssue } from 'models/issue';
import SelectManagers from './SelectManagers';

const IssueForm = ({ issue }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const state = useMemo(() => searchParams.get('state'), [searchParams]);
  const [list, setList] = useRecoilState(issues);
  const { form, setForm, setValue } = useForm({
    order: 0,
    title: '',
    content: '',
    endDate: '',
    state,
    manager: '',
  });

  useEffect(() => {
    if (issue) {
      setForm({
        ...issue,
      });
    }
  }, [issue]); // setForm을 넣으면 초기의 form이 유지가 안 됨. 렌더링 될 때마다 useForm이 새로 만들어지는 것인가?

  const handleSubmit = (e) => {
    e.preventDefault();
    if (issue !== undefined) {
      editIssue(issue.id, form)
        .then((res) => {
          const newList = list[issue.state].map((el) => (el.id === res.id ? res : el));
          setList({ ...list, [issue.state]: newList });
          navigate('/');
        })
        .catch();
    } else {
      postIssue(form)
        .then((res) => {
          const nowStateList = [...list[state], res];
          setList({ ...list, [state]: nowStateList });
          navigate('/');
        })
        .catch();
    }
  };

  const handleClickManager = (e) => {
    setForm({ ...form, manager: e.target.getAttribute('value') });
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input name="title" value={form.title || ''} className={styles.title} onChange={setValue} required />
      <div className={styles.content}>내용</div>
      <textarea name="content" value={form.content || ''} onChange={setValue} />
      <div className={styles.content}>마감일</div>
      <input name="endDate" type="datetime-local" value={form.endDate || ''} onChange={setValue} />
      <div className={styles.content}>상태</div>
      <select name="state" onChange={setValue} value={form.state || 'todo'} required>
        {['todo', 'doing', 'done'].map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <div className={styles.content}>담당자</div>
      <input name="manager" type="text" onChange={setValue} value={form.manager || ''} />
      <SelectManagers form={form} handleClickManager={handleClickManager} />
      <button type="submit">저장</button>
    </form>
  );
};

export default IssueForm;
