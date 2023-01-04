import { atom, selector } from 'recoil';

const listState = atom({
  key: 'listState',
  default: {},
});
// const itemListState = atom({
//   key: 'itemListState',
//   default: [],
// });
export const listsState = selector({
  key: 'listsState',
  get: ({ get }) => {
    const prev = get(listState);
    return prev;
  },
  set: ({ set, get }, value) => {
    const data = {};
    for (let i = 0; i < value.length; i += 1) {
      data[value[i].state] = value[i].list;
    }

    set(listState, { ...get(listState), ...data });
  },
});

// export const listMapState = selector({
//   key: 'listMapState',
//   get: ({ get }, target) => {
//     const prev = get(listState);
//     return prev[target];
//   },
//   set({ set, get }, target, value) {
//     const prev = get(listState);
//     set([...value, ...prev[target]]);
//   },
// });
