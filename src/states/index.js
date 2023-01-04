import { atom } from 'recoil';

export const ISSUES_STATE = 'issuesState';

export const issuesState = atom({
  key: ISSUES_STATE,
  default: [],
});
