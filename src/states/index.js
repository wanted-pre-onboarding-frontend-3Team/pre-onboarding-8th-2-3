import { atom, selector } from 'recoil';

const modalState = atom({
  key: 'modalState',
  default: false,
});
export const changeModalState = selector({
  key: 'changeModalState',
  get: ({ get }) => {
    const prev = get(modalState);
    return prev;
  },
  set: ({ set }, value) => {
    set(modalState, value);
  },
});
