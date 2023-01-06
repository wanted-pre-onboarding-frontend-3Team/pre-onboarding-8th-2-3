# 프로젝트 소개

- 개발 기간: 2023.01.03 ~ 2023.01.06
- 개발 스택: Javascript, React, Sass, Recoil
- 팀장: 안지웅
- 팀원: 이윤진, 박혜선, 최주은

### 실행 방법

```
npm install
npm start
```

### 기능

trello 같은 Issue 관리 툴 만들기

### 문제 해결

- #### 상태관리

Recoil의 atom 함수를 이용해 이슈에 대한 상태를 만들고 저장했습니다.

```js
// issueState.js
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
```

selector를 이용해 각 메서드마다 상태를 변경하는 selector를 이용해

```js
setIssues(['PUT', newIssue]);
```

selector는 1개의 parameter를 넘겨줄 수 있어 배열로 넘겨주어 처리했습니다.

- #### modal

createPortal을 이용해 Backdrop과 Modal을 이용해 AddModal, DetailModal 구현

```js
const page = useMemo(() => searchParams.get('modal'), [searchParams]);

const Content = useCallback(() => {
  let component;

  if (page === 'add') component = <AddModal />;
  else if (page === 'detail') component = <DetailModal />;

  return component;
}, [page]);

return (
  <div className={styles.container}>
    <Content />
  </div>
);
```

searchParams를 이용해 어떤 모달을 보여줄지 결정

`http://localhost:3000/?modal=detail&state=doing&id=5e29af20-8d9f-11ed-a55d-259ac2198438`

- modal: modal의 종류
- state: 클릭한 issue의 state
- id: 클릭한 issue의 id

- #### Drag&Drop

# Commit Convention

| Tag Name  | Description                                                                                   |
| :-------: | :-------------------------------------------------------------------------------------------- |
|   Feat    | 새로운 기능을 추가                                                                            |
|    Fix    | 버그 수정                                                                                     |
|  Design   | CSS 등 사용자 UI 디자인 변경                                                                  |
| !BREAKING | CHANGE 커다란 API 변경의 경우                                                                 |
|  !HOTFIX  | 급하게 치명적인 버그를 고쳐야하는 경우                                                        |
|   Style   | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우                                         |
| Refactor  | 프로덕션 코드 리팩토링                                                                        |
|  Comment  | 필요한 주석 추가 및 변경                                                                      |
|   Docs    | 문서 수정                                                                                     |
|   Test    | 테스트 코드, 리펙토링 테스트 코드 추가, Production Code(실제로 사용하는 코드) 변경 없음       |
|   Chore   | 빌드 업무 수정, 패키지 매니저 수정, 패키지 관리자 구성 등 업데이트, Production Code 변경 없음 |
|  Rename   | 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우                                            |
|  Remove   | 파일을 삭제하는 작업만 수행한 경우                                                            |
