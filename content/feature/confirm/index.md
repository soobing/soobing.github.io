---
title: Promise를 사용하여 window.confirm 구현하기
date: '2022-08-19 00:00:00'
author: soobing
tags: promise
categories: feature
draft: false
---
보통 어플리케이션에서 공통된 디자인의 confirm 창을 사용한다. 이때, window.confirm과 같이 고객의 `OK/CANCEL` 클릭 여부에 따라서 다음 동작을 이어나가게 하고싶다면 어떻게 구현해야할까?

```jsx
import useConfirm from "@/hooks/useConfirm";

const { confirm } = useConfirm();

const result = await confirm({
  message: '이 페이지를 나가시겠습니까?',
  buttons: {
    ok: '예',
    cancel: '아니오',
  },
});

if (result) {
  window.history.back();
} else {
  console.log('이 페이지를 나가지 않았습니다.');
}
```

## 준비물

- Modal Component (global 하게 등록)
- Global State
- Modal Hook

<iframe src="https://codesandbox.io/embed/confirm-promise-tbpxgd?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="confirm-promise"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


보통 웹 어플리케이션에서는 공통된 디자인의 confirm을 사용하므로 화면에 보여지는 역할을 하는 Modal Component가 필요하다. 이 컴포넌트는 어플리케이션 전반에 걸쳐서 자주 사용하는 라이브러리이므로 App.js에서 global 하게 로드한다.

global 하게 등록된 Modal 컴포넌트를 제어하기 위해서는 어플리케이션 어느 곳에서든 제어 가능하게 하기 위해서 global state가 필요하다. 그래서 modal 관련 state가 변경되었을때, Modal 컴포넌트가 render 되게 한다. 

이제 window.confirm 처럼 사용하기 위해 confirm 함수를 구현하고 있는 modal 커스텀 훅을 만든다. confirm 함수는 Modal global state 값을 조작 하며 promise를 리턴한다. 앞으로 Modal 사용이 필요한 곳에서는 이 커스텀 훅만 import 해서 사용하면 된다. 

## 구현

이제부터는 위에서 설명한 준비물 3가지를 구현하기 위해서 고려했던 내용에 대해서 자세히 기술해보려고 한다.

### 1) Modal Component

```jsx
const ConfirmModal = () => {
  const { confirmList } = useConfirm();
  if (confirmList.length <= 0) return null;

  return (
    <div className="modal">
      {confirmList.map(({ id, message, buttons: { ok, close, cancel } }, i) => {
        return (
          <div className="modal-content" key={message}>
            <span className="close" onClick={close.click}>
              &times;
            </span>
            <p>{message}</p>
            <div className="modal-buttons">
              <button onClick={ok.click}>{ok.text}</button>
              {cancel && <button onClick={cancel.click}>{cancel.text}</button>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConfirmModal;
```

- state의 자료구조는 list로 한다.
    - ConfirmModal 컴포넌트는 `confirmList` 라는 global state 값에 따라 map으로 돌며 여러개의 모달을 그리고 있다.
    - 처음에 1개의 모달만 뜬다고 가정하고 자료구조를 list로 설계하지 않았었는데, 복잡한 어플리케이션을 구현하다보니 여러개의 Modal이 겹쳐서 뜨는 상황이 있어서 list로 자료구조를 변경했다.
    - 여러개의 모달을 핸들링하기 위해서 id 값이 필요했다. promise가 resolved/rejected 되면 id값을 넘겨서 confirmList에서 제거하도록 구현했다.
- button은 세 가지(ok, cancle, close) 타입이 있다.
    - button의 텍스트는 일단 커스텀이 가능하도록 `confirm` 함수 호출 시 button의 텍스트 정보도 넘겨주도록 설계했다.
    - 보통의 confirm은 ok, cancel이 있어서 두개의 버튼 텍스트를 받을 수 있게 했고, cancel 버튼은 필수가 아니다. ok 클릭시 promise의 resolve를 호출하고, cancel 클릭시 promise의 reject를 호출하게끔 click property에 설정해 두었다. 또한 resolved가 되던, rejected가 되던 confirm창은 닫힌다.
    - ok, cancel과 close 버튼은 다르다. close 버튼은 보통 성공/실패와 관련없이 해당 모달을 닫기 위해 사용한다. 즉 promise의 resolve, reject 둘의 어떤 함수든 호출하지 않고 그냥 modal을 닫기만 해야한다. 

### 2) Global State

- global 하게 등록된 Modal 컴포넌트를 제어하기 위해서는 global state가 필요하다.
- global 상태 관리 라이브러리의 의존성 없이 구현하기 위해서 React의 context api를 사용했는데, 자신의 어플리케이션에서 사용하고 있는 global 상태 관리 라이브러리에 맞게 응용하여 구현하면 된다.

```jsx
// ConfirmContextProvider.js

import React, { createContext, useState } from "react";

export const ConfirmContext = createContext();
const ConfirmContextProvider = ({ children }) => {
  const [confirmList, setConfirmList] = useState([]);

  return (
    <ConfirmContext.Provider value={[confirmList, setConfirmList]}>
      {children}
    </ConfirmContext.Provider>
  );
};
export default ConfirmContextProvider;
```

```jsx
export default function App() {
  return (
    <div className="App">
      <ConfirmContextProvider>
        <Home />
        <ConfirmModal />
      </ConfirmContextProvider>
    </div>
  );
}
```

### 3) Modal Hook ⭐️

modal 커스텀 훅이 오늘의 메인 구현이다.

```jsx
// useConfirm.js
import { useContext } from "react";
import { ConfirmContext } from "../context/ConfirmContextProvider";

const useConfirm = () => {
  const [confirmList, setConfirmList] = useContext(ConfirmContext);
  
  const hideConfirm = (id) => {
    setConfirmList((list) => {
      const index = list.findIndex(({ id: _id }) => id === _id);
      return [...list.slice(0, index), ...list.slice(index + 1)];
    });
  };

  const confirm = ({ message, buttons }) => {
    const promise = new Promise((resolve, reject) => {
      const id = Symbol();
      setConfirmList((list) => [
        ...list,
        {
          id,
          show: true,
          message,
          buttons: {
            ok: {
              text: buttons.ok,
              click: () => resolve(id)
            },
            close: {
              click: () => hideConfirm(id)
            },
            ...(buttons?.cancel && {
              cancel: {
                text: buttons.cancel,
                click: () => reject(id)
              }
            })
          }
        }
      ]);
    });

    return promise.then(
      (id) => {
        hideConfirm(id);
        return true;
      },
      (id) => {
        hideConfirm(id);
        return false;
      }
    );
  };

  return { confirm, confirmList };
};

export default useConfirm;
```

- modal을 띄우기 위해 필요한 데이터 = `message, buttons`
    - `confirm` 함수를 사용하는 입장에서는 message와 buttons 값만 지정해주면 된다.
    - promise 생성시, id 값을 생성하여 넣어주고 ok, cancel, close 버튼 클릭시 action을 정의해준다.
- promise 후속처리 메서드(`then`)를 통해 결과 return
    - resolve, reject 함수는 언제 호출 될 지 모른다. ok, cancel 버튼을 클릭해야만 호출 되므로 후속처리 메서드안에서 그 결과를 return하게 한다. 그러므로 사용하는 측에서는 `true or false` 의 return 값 여부에 따라서 깔끔한 로직 처리가 가능하다.
    - ok, cancel, close 버튼 클릭시 모두 confirm을 더이상 보이지 않게 해야한다. list 자료구조를 채택했으니 id 값을 바탕으로 `hideConfirm`을 호출하게 구현했다.
- confirm 함수의 반복적인 비동기 호출
    - confirm 함수가 같은 라이프사이클에서 여러번 호출 될 수 있다. 그런 경우 setState가 일괄적으로 한번만 처리되서는 안되고 호출된 만큼 모두 처리되어야 한다.
    - setState 호출 시, 함수를 전달하면 이 문제를 해결할 수 있다.
        - `setState(newValue)` → `setState((current) => newValue)`
        - 참고
            - [setState에 객체를 전달하는 것과 함수를 전달하는 것은 어떤 차이가 있나요?](https://ko.reactjs.org/docs/faq-state.html#what-is-the-difference-between-passing-an-object-or-a-function-in-setstate)
            - [Why you can't set state multiple times in a row in React](https://typeofnan.dev/why-you-cant-setstate-multiple-times-in-a-row/)

## 후기

- 나같은 경우 Vue 프로젝트에서 도입했었는데 mixin으로 confirm 함수를 만들고 global로 mixin을 등록했더니 import 구문조차 다 사라져서 더 깔끔하게 사용할 수 있었다.
- 간단한 confirm은 이제 confirm 함수만 사용하면 모두 제어되므로 로직에서 state를 변경하는 코드들이 사라져서 코드가 매우매우 깔끔해졌다.

## 참고

- [https://medium.com/@jaredloson/a-replacement-for-window-confirm-using-promises-and-react-hooks-cfc011e76a7a](https://medium.com/@jaredloson/a-replacement-for-window-confirm-using-promises-and-react-hooks-cfc011e76a7a)