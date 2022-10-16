---
title: 에러 핸들링에 대한 고민 (feat. React)
date: '2022-10-16 00:00:00'
author: soobing
tags: react error
categories: react
draft: false
---

## 고민

1. 에러를 발생 vs 사전 확인을 통해 예외 처리
2. 어느 부분까지 사전 확인이 필요한 걸까?

### 고민하게 된 배경

함수의 매개변수가 의도한 것과 다른 값이 들어왔을 때 에러가 발생할 수 있다. 그런데 문득 에러를 발생하게 하는 게 올바른 것인가? 아니면 애초에 에러가 발생할 상황을 하나도 빠짐없이 막는 것이 올바른 것인가? 고민이 들었다.

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // do something
};
```

위의 코드를 보면 event 객체가 무조건 존재할 상황을 가졍하고 있으므로 만약 비정상적인 event 객체가 첫 번째 인자로 전달된다면 에러가 발생할 것이다.

그렇다면 이렇게 코드를 짜는 것이 좋을까? 애초에 event 객체가 존재하지 않을 수 있는 케이스를 고려해서 절대로 에러를 발생하지 않게 하는 것이 좋을까?

```tsx
// optional chaining
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    // do something
};
```

```tsx
// early return
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!e) return;
    // do something
};
```

---

## 결론

App을 Crashed 시키지 않는 한해서 에러가 발생해야 하는 경우는 발생하게 내버려 두고, 예상할 수 있는 예외는 try…catch를 이용하여 에러가 전파되지 않도록 한다. React는 Error Boundaries를 제공하니, 예상치 못한 자바스크립트 이슈로 인해 앱이 붕괴되지 않도록 화면을 렌더 할 수 있다.

```tsx
const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // do something
};
```

이 복합적인 고민에 대해서 결론(?)을 낼 수 있도록 도움받은 곳은 `리팩터링 2판`과 `React 공식문서` 였다.

### 예외 발생과 오류 검출

- 예외는 프로그래밍 언어에서 제공하는 독립적인 오류 처리 메커니즘이다.
    - 오류가 발견되면 예외를 던진다. 그러면 적절한 예외 핸들러를 찾을 때까지 콜스택을 타고 위로 전파된다.
    - Javascript에서 에러를 핸들링 하기 위해서는 try…catch 문에서 처리를 해줘야 한다.
    

### App이 Crashed 되지 않는것이 가장 큰 목표!

- 예외는 정확히 예상 밖의 동작일때만 쓰여야 하며, 프로그램의 정상 동작 범주에 들지 않는 오류를 나타낼 때만 쓰여야 한다.
- 정상 동작하지 않을 것 같다면 예외를 사용하지 말고 오류를 검출하여 프로그램을 정상 흐름으로 되돌리게끔 처리해야 한다.

### 예외를 사전확인으로 바꾸기

- 예외는 ‘뜻밖의 오류'라는 뜻이다. 말 그대로 예외적으로 동작할 때만 쓰여야 한다.
- 함수 수행시 문제가 될 수 있는 조건을 함수 호출 전에 검사할 수 있다면, 예외를 던지는 대신 호출하는 곳에서 조건을 검사하도록 해야 한다.
- 함수는 파라미터가 의도한 값으로 입력되었다고 가정하고 구현되어 있다. 의도된 값으로 입력되지 않았을 경우를 함수내에서 처리하기보다는, 그 함수를 호출하는 곳에서 애초에 의도한 파라미터값을 넘길 수 있도록 처리해주는 것이 맞다!

### React는 ****Error Boundaries라는 것을 제공한다.****

[https://ko.reactjs.org/docs/error-boundaries.html](https://ko.reactjs.org/docs/error-boundaries.html)

- React 16에서 도입
- 자바스크립트 에러가 전체 애플리케이션을 중단시켜서는 안되기에, **하위 컴포넌트 트리의 어디에서든 자바스크립트 에러를 기록하며 깨진 컴포넌트 트리 대신 폴백 UI를 보여주는** React 컴포넌트이다.
- Error Boundaries는 다음과 같은 에러는 포착하지 **않는다.**
    - 이벤트 핸들러 ([더 알아보기](https://ko.reactjs.org/docs/error-boundaries.html#how-about-event-handlers))
    - 비동기적 코드 (예: `setTimeout` 혹은 `requestAnimationFrame` 콜백)
    - 서버 사이드 렌더링
    - 자식에서가 아닌 Error Boundaries 자체에서 발생하는 에러