---
title: React의 상태관리 종류 4가지
date: '2023-02-03 00:00:00'
author: soobing
tags: react state management
categories: react
draft: false
---

## Introduction

react의 상태관리 종류 4가지를 알아보고, 각각의 종류별로 왜 다르게 관리해야하는지와 React에서 제공하는 API 혹은 어떤 라이브러리를 사용해서 관리하면 좋을지 알아보도록 하자.

```
- 🐥 나중에 작은 주제로 다뤄볼까 하는 포인트들
- ✅ 체크하고 가야할 포인트들
```

## 상태관리 종류

1. Local state
2. Global state
    - App 어느곳(여러 컴포넌트)에서 state를 확인하거나 업데이트하기 위해서 필요함.
        - 예: authenticated user state - logged in/out
3. Server state
    - 서버로 받은 데이터가 UI 상태와 통합되어야 하는 경우 필요함.
        - 예: loading, error…
        - 대표 라이브러리: SWR, react-query
4. URL state
    - URL에 존재하는 데이터(pathname, query params..)

-----------
### 1) Local state

- useState
- useReducer
    - useReducer vs useState 차이
        - useState는 하나의 state operation만 가능했다면, useReducer는 여러개의 state operation이 가능하다는 것이 가장 큰 차이점이다.
        - 🐥 useReducer는 redux를 대체할 수 있는건가?
- useContext(Context API)

### 2) Global state

- ✅ Context API는 state manage solution이 아니다.
    - props drilling 해결을 위한 솔루션
        - 컴포넌트의 불필요한 props를 많이 만들어야하는..? 문제
        - state를 읽는데에만 유용하고 update 하는것에는 유용하진 않다. 많은 업데이트가 일어나는 곳에서는 Context API가 아닌 다른 state manage solution을 사용하는 것이 좋겠다.
        - 🐥 Context API의 작동원리
    - Global state 관리를 위해 사용하지 말아야 하는 이유
        - Context는 provider로 주입된 하위의 모든 children component를 re-render 시킨다.
- ✅ Redux, Mobx, Zustand, Jotai vs Recolie
    - redux는 외부 라이브러리이므로 react와 완전 분리되어 있어, React 동시성 모드를 사용할 수 없다는 점이 가장 크리티컬함.
        - [https://www.reddit.com/r/reactjs/comments/pt76wt/redux_vs_recoil/](https://www.reddit.com/r/reactjs/comments/pt76wt/redux_vs_recoil/)
        - [https://www.youtube.com/watch?v=P95DuIBwnqw](https://www.youtube.com/watch?v=P95DuIBwnqw)
        - [https://ui.toast.com/weekly-pick/ko_20200616](https://ui.toast.com/weekly-pick/ko_20200616)

### 3) Server state

- Server state는 데이터를 가져와서 페이지에 그리는것 뿐만아니라, 데이터 fetching 동안 loading indicator를 띄워야하고 서버 오류가 난 경우 그에 맞는 화면을 표시해야 한다.
- SWR, React Query 라이브러리 추천
    - API에서 데이터를 가져오고(get), 변경하고(mutate), 필요한 모든 상태를 지속적으로 추적(tracking)하면서 캐싱(cache) 해준다.
    - Global state 관리로서도 사용할 수 있다.
        
        ```jsx
        import useSWR, { SWRConfig } from 'swr'
        
        function Admin () {
          // no need to pass in the fetcher function
          const { data: courses } = useSWR('/api/courses')
          const { data: orders } = useSWR('/api/orders')
          const { data: users } = useSWR('/api/users')
        
          // ...
        }
        
        function App () {
          return (
            <SWRConfig 
              value={{
                errorRetryCount: 2, 
                errorRetryInterval: 5000,
                fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
              }}
            >
              <Admin />
            </SWRConfig>
          )
        }
        ```
        
    - 🐥 SWR vs React Query
        - [https://npmtrends.com/react-query-vs-swr](https://npmtrends.com/react-query-vs-swr) → react-query가 점유율이 더 높음

### 4) URL state

- Next.js, React Router 최신버전을 사용하고 있다면 URL state는 이미 기본적으로 관리되고 있다.


-----------
## TO-BE-CONTINUED
- Global State → Client State + Server State 로 분리해야하는 이유
- React-Query 도입기
- Recoil 도입기