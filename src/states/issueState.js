import { atom, selector } from 'recoil';

export const issueState = atom({
  key: 'issueState',
  default: [],
});

export const issuesSelector = selector({
  key: 'issuesSelector',
  get: ({ get }) => {
    const data = get(issueState);
    return data;
  },

  set: ({ get, set }, value) => {
    const data = [...get(issueState)];

    if (value[0] === 'POST') {
      const newData = value[1];
      data.push(newData);
      set(issueState, data);
    }

    if (value[0] === 'PUT') {
      const changeIssueIndex = data.findIndex((issue) => issue.id === value[1].id);
      data[changeIssueIndex] = value[1];
      set(issueState, data);
    }

    if (value[0] === 'DELETE') {
      const deleteData = data.filter((issue) => issue.id !== value[1]);
      set(issueState, deleteData);
    }
  },
});
