---
title: '환경 변수(process.env)를 구조 분해 할당하면 안되는 이유 🦷'
date: '2024-06-26 00:00:00'
author: soobing
tags: config next.js process.env destructuring 환경변수 구조-분해-할당
categories: react next
draft: false
---

process.env 값을 구조 분해 할당 하셨나요? 우리가 환경변수를 접근할 때 객체의 속성값에 접근할 때 사용하는 점 표기법을 사용하기 때문에 구조 분해 할당을 자연스럽게 사용해도 될 것 같은데요. 이런 경우, 왜 에러가 발생하는지 이번 글을 통해 알아보겠습니다.

## 문제 상황

다음과 같은 코드가 있다고 가정해 봅시다.

```javascript
const { API_KEY, NEXT_PUBLIC_ANALYTICS_ID } = process.env;
```

위 코드는 process.env 객체에서 `API_KEY`와 `NEXT_PUBLIC_ANALYTICS_ID` 변수를 구조 분해 할당하여 사용하려고 합니다. 그러나 Next.js에서는 이 코드가 제대로 작동하지 않을 수 있고, 오류가 발생할 수 있습니다.

## 왜 이런 문제가 발생할까요?

`process.env`는 일반적인 자바스크립트 객체와는 다르기 때문입니다. 이는 Node.js 환경에서 환경 변수를 담고 있는 특수한 객체로, 모든 속성이 문자열 형태로 저장됩니다. Next.js는 빌드 타임과 런타임에서 환경 변수에 접근하는 방식이 다르므로, 이로 인해 구조 분해 할당을 사용할 때 예기치 않은 동작이나 오류가 발생할 수 있습니다.

클라이언트 사이드에서 환경 변수 사용시 `NEXT_PUBLIC_`라는 prefix를 붙여야 한다고 [공식문서에서 가이드](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables#bundling-environment-variables-for-the-browser) 하고 있습니다.

_(공식문서 인용)_

> Non-`NEXT_PUBLIC_` environment variables are only available in the Node.js environment, meaning they aren't accessible to the browser (the client runs in a different environment).

> In order to make the value of an environment variable accessible in the browser, Next.js can "inline" a value, at build time, into the js bundle that is delivered to the client, replacing all references to `process.env.[variable]` with a hard-coded value. To tell it to do this, you just have to prefix the variable with `NEXT_PUBLIC_`. For example:

정리하면, `NEXT_PUBLIC_`이 붙지 않은 코드 `process.env.API_KEY`는 Node.js에서만 사용 가능한 환경 변수이고, 브라우저에서는 접근할 수 없습니다.

환경 변수 값을 브라우저에서 접근 가능하도록 하려면, `process.env.NEXT_PUBLIC_ANALYTICS_ID`와 같이 `NEXT_PUBLIC_` 접두사를 붙여야 하고, 이런 환경 변수들을 클라이언트 코드 내에서 참조하고 있는 경우, 빌드 시점에 환경 변수 "값"으로 대체(인라인)한다는 것입니다.

## 해결 방법

> 구조 분해 할당을 피하고, 개별적으로 환경 변수에 접근합니다.

```javascript
const apiKey = process.env.API_KEY;
const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;
```

이와 같이 환경 변수를 개별적으로 할당하면, Next.js에서 올바르게 환경 변수에 접근할 수 있습니다. 이는 Next.js의 빌드 타임과 런타임 환경 모두에서 안전하게 작동합니다.

## 예제 코드

다음은 환경 변수를 안전하게 사용하는 예제 코드입니다:

```javascript
// app/api/kakaoMap/route.js
export async function GET(request: Request) {
  const apiKey = process.env.API_KEY;

  return Response.json({ apiKey });
}
```

```jsx
// components/AnalyticsComponent.js
import { useEffect } from 'react';

const AnalyticsComponent = () => {
  useEffect(() => {
    const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

    if (analyticsId) {
      initializeAnalytics(analyticsId);
    }
  }, []);

  const initializeAnalytics = (id) => {
    // do something
  };

  return (
    <div>
      <h1>Analytics Component</h1>
    </div>
  );
};

export default AnalyticsComponent;
```

## 결론

Next.js에서 process.env 값을 구조 분해 할당할 때 발생하는 오류는 process.env 객체의 특수한 성질과 빌드 타임 및 런타임의 차이로 인해 발생합니다. 이러한 문제를 피하기 위해서는 구조 분해 할당 대신 개별적으로 환경 변수에 접근하는 것이 좋습니다. 이를 통해 안정적이고 예측 가능한 방식으로 환경 변수를 사용할 수 있습니다.

Next.js를 사용하면서 환경 변수와 관련된 문제를 겪고 계셨다면, 이번 글이 도움이 되셨기를 바랍니다. Happy Coding!
