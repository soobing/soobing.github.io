---
title: (번역) 리액트 서버 컴포넌트를 위한 스토리북
date: '2024-02-02 00:00:00'
author: soobing
tags: storybook RSC react
categories: react
draft: false
---

> 원문: https://storybook.js.org/blog/storybook-react-server-components/

> 스토리북 8.0 알파 업그레이드를 통한 스토리북에서 RSC 사용


[리액트 서버 컴포넌트 (RSC)](https://nextjs.org/docs/app/building-your-application/rendering/server-components?ref=storybookblog.ghost.io)는 리액트 기반 웹 UI의 새로운 프로그래밍 모델입니다.  기존의 전통적인 리액트 "클라이언트" 컴포넌트와 달리, 서버에서만 렌더링됩니다. 이는 다양한 성능 및 보안 이점을 가져오지만, 기존의 리액트 도구 및 라이브러리와는 크게 다릅니다.

가장 크게 영향을 받는 부분 중 하나는 컴포넌트 기반 개발 및 테스트입니다. 스토리북, 테스팅 라이브러리 및 Playwright/Cypress와 같은 컴포넌트 테스팅과 같은 도구들은 사용자의 컴포넌트가 브라우저 (또는 JSDom)에서 렌더링되고 있다고 가정합니다. 그러나 서버 컴포넌트의 경우, 이러한 가정이 성립하지 않습니다.

이로 인해, 서버를 위한 격리된 컴포넌트 개발 및 테스트를 수행하는 것이 무엇을 의미하는가? 라는 의문이 생깁니다.

오늘은 이 질문에 대한 실험적인 답변으로 Next.js 프레임워크에서 스토리북의 RSC 지원을 공식적으로 발표하게 되어 기쁩니다. 이것은 완전히 클라이언트 측 구현이므로, 스토리북 애드온과 인테그레이션의 모든 생태계와 호환이 가능합니다.

이것이 어떻게 작동하는지, 사용하는지, 그리고 지금 바로 사용해 볼 수 있는 방법에 대해 알아보고 싶다면 계속 읽어보세요!

## 화성에서 온 서버, 금성에서 온 클라이언트

RSC는 기존의 클라이언트 컴포넌트와 두 가지 주요 차이점이 있으며, 다음 예제에서 이에 대해 보여주고 있습니다.

```tsx
// ApiCard.tsx

import { ComponentProps } from 'react';
import { Card } from './Card';
import { findById } from './db';

export async function DbCard({ id }: {id: number}) {
  let props;
  try {
    const contact = await findById(id);
    props = { state: 'success', contact };
  } catch (e) {
    props = { state: 'error' };
  }
  return <Card {...props} />;
}
```

1. 첫 번째 차이점은 컴포넌트가 `async` 라는 점인데, 이것은 클라이언트에서는 지원되지 않는 기능입니다.
2. 두 번째 차이점은 컴포넌트가 Node 코드에 직접 액세스할 수 있다는 것인데, 위의 경우에서는 인증된 데이터베이스 연결을 래핑하는 `findById` 함수에 액세스하고 있습니다.

RSC는 이러한 두 가지 차이점을 구현하기 위해 내부적으로 많은 작업을 수행합니다. 이 코드는 서버에서만 실행되며 클라이언트로 스트리밍되는 정적 JSON과 유사한 구조를 생성합니다.

Storybook은 순수 클라이언트 애플리케이션입니다. Node가 전혀 없는 순수한 HTML/CSS/JS의 정적 빌드를 생성합니다! 따라서 RSC를 지원하려면 RSC를 클라이언트에서 렌더링하거나 Storybook을 서버용으로 다시 설계하는 방법을 찾아야 합니다.

우리는 먼저 클라이언트 접근 방식에 중점을 두어 시작했습니다. 현재 아키텍처를 기반으로 수백 개의 애드온과 수백만 개의 스토리를 작성한 사용자에게 미치는 영향을 최소화하고 싶습니다.

어떻게 클라이언트에서 동작하게 할 수 있었을까요?

## 비동기로 처리하기

RSC를 클라이언트에서 렌더링하는 데, 첫 번째 과제는 async 컴포넌트를 지원하는 방법을 알아내는 것입니다. 이미 Next.js의 canary 리액트 버전에서 [비공식적으로](https://github.com/acdlite/rfcs/blob/first-class-promises/text/0000-first-class-support-for-promises.md?ref=storybookblog.ghost.io#why-cant-client-components-be-async-functions) 지원되고 있습니다. 이 간단한 솔루션에 기여한  [JamesManningR](https://github.com/JamesManningR?ref=storybookblog.ghost.io) 및 [julRuss](https://github.com/julRuss?ref=storybookblog.ghost.io)에게 특별한 감사를 전합니다!

```jsx
import { Suspense } from 'react';

export const ClientContact = ({ id }) => (
  <Suspense><DbCard id={id} /></Suspense>
);
```

Storybook 8에서부터 `@storybook/nextjs`는 `.storybook/main.js` 파일에서 `experimentalNextRSC` 기능 플래그를 사용하여 스토리를 `Suspense`로 감싸줄 수 있습니다.

```jsx
// .storybook/main.js
export default {
  features: {
    experimentalNextRSC: true,
  }
};
```

7.x 버전의 `@storybook/nextjs`에서도 RSC 스토리를 [데코레이터](https://storybook.js.org/docs/writing-stories/decorators/?ref=storybookblog.ghost.io)로 래핑하여 수동으로 이 작업을 수행할 수도 있습니다.

**참고**: 이 솔루션은 Next.js의 canary 버전 이외의 다른 Storybook React 프레임워크 (예: `react-vite`, `react-webpack5`)에서는 아직 작동하지 않습니다. 다음 버전에서는 이러한 제한이 해제되기를 바랍니다.

## 모킹 및 로딩

비동기 문제를 해결하는 것은 절반의 성공에 불과합니다. `DbCard` 컴포넌트는 데이터를 가져와 컴포넌트를 채우는 Node 코드를 참조합니다. 이것은 브라우저에서 Node 코드를 실행할 수 없는 문제가 있습니다!

차선책으로 이 문제를 해결하기 위해서는, 깔끔한 데이터 액세스 계층 구축이 필요합니다. 이것은 또한 [RSC의 설계자가 추천하는 최상의 권장 방법](https://nextjs.org/blog/security-nextjs-server-components-actions?ref=storybookblog.ghost.io)입니다.

데이터 액세스 계층이 있으면, 브라우저에서 실행할 수 있도록 모킹할 수 있고 데이터를 정확하게 제어하여 다양한 UI 상태(로딩, 오류, 성공, 등)를 테스트할 수 있습니다.

데이터 액세스 계층을 모킹하기 위해서는 Storybook에서 지원하는 **모듈 모킹** 또는 **네트워크 모킹**를 사용할 수 있습니다.

**모듈:** `jest.mock` 스타일의 목을 제공하는 [storybook-addon-module-mock](https://storybook.js.org/addons/storybook-addon-module-mock?ref=storybookblog.ghost.io) 커뮤니티 애드온이 있습니다(웹팩 프로젝트에서만 지원). 더 간단하지만 더 제한적인 해결책으로 [webpack](https://webpack.js.org/configuration/resolve/?ref=storybookblog.ghost.io#resolvealias)/[vite](https://vitejs.dev/config/shared-options?ref=storybookblog.ghost.io#resolve-alias) 별칭을 사용할 수도 있습니다. 향후 버전의 Storybook에서 모듈 모킹을 더 효율적으로 제공할 계획입니다.

**네트워크 API:** 네트워크 요청을 모킹하기 위해 [Mock Service Worker (msw)](https://storybook.js.org/addons/msw-storybook-addon?ref=storybookblog.ghost.io)를 추천합니다. Storybook은 다양한 [네트워크](https://storybook.js.org/integrations/tag/mocking/?ref=storybookblog.ghost.io)와 [GraphQL](https://storybook.js.org/integrations/tag/graphql?ref=storybookblog.ghost.io) 모킹 애드온을 지원합니다.

우리의 예제로 돌아와서, `storybook-addon-module-mock`을 사용한 스토리는 다음과 같습니다.

```jsx
// DbCard.stories.js

import { StoryObj, Meta } from '@storybook/react';
import { createMock } from 'storybook-addon-module-mock';

import { DbCard } from './DbCard';
import * as db from './db';

export default { component: DbCard };

export const Success {
  args: { id: 1 },
  parameters: {
    moduleMock: {
      mock: () => {
        const mock = createMock(db, 'findById');
        mock.mockReturnValue(Promise.resolve({
          name: 'Beyonce',
          img: 'https://blackhistorywall.files.wordpress.com/2010/02/picture-device-independent-bitmap-119.jpg',
          tel: '+123 456 789',
          email: 'b@beyonce.com'
        }))
        return [mock];
      },
    },
  },
}
```

## API + 모듈 모킹의 전체 데모

데이터베이스의 모듈 모킹 버전과 MSW2로 모킹된 API 버전을 포함한 위의 전체 예제에 대한 전체 내용은 [우리의 전체 RSC 데모 Storybook](https://6578430567214463f1df4629-htkembgskw.chromatic.com/?path=%2Fdocs%2Foverview--docs&ref=storybookblog.ghost.io) 또는 [GitHub 레포지토리](https://github.com/shilman/storybook-rsc-demo?ref=storybookblog.ghost.io)를 확인하십시오.

!https://storybookblog.ghost.io/content/images/2023/12/CleanShot-2023-12-13-at-10.02.38@2x.png

## 주의사항

이 글에서는, Storybook에서 첫 번째 RSC에 대한 스토리를 성공적으로 작성했으며 이 모든 것이 내부적으로 어떻게 구현되었는지 보여주었습니다.

이 모든 것은 꽤 간단한 과정이었지만, 이 접근 방식에는 제한 사항이 있습니다.

1. **일치성.** 순수한 클라이언트 구현은 애플리케이션에서 실행되는 서버측 스트리밍 RSC 구현과 크게 다릅니다.
2. **편의성.** 여기서 제공하는 모킹 솔루션은 개선될 여지가 있습니다. 현재의 모듈 모킹 솔루션은 장황할 뿐만 아니라 Storybook의 [args](https://storybook.js.org/docs/writing-stories/args?ref=storybookblog.ghost.io)/[controls](https://storybook.js.org/docs/api/doc-block-controls?ref=storybookblog.ghost.io)와 잘 호환되지 않습니다.

우리는 이러한 제한 사항을 향후에 해결할 계획이므로, 이 솔루션을 실험 단계로 표시했습니다.

## 오늘부터 RSC를 위한 Storybook 사용하기 🎊

RSC를 위한 Storybook을 사용하려면 Storybook을 8.0-alpha로 업그레이드하십시오.

```
npx storybook@next upgrade --prerelease

```

그런 다음 `.storybook/main.ts`에서 실험적 기능을 활성화하세요.

```jsx
// .storybook/main.js
export default {
  features: {
    experimentalNextRSC: true,
  },
};

```

더 많은 정보를 원하시면, `@storybook/nextjs` [README](https://github.com/storybookjs/storybook/blob/next/code/frameworks/nextjs/README.md?ref=storybookblog.ghost.io#experimental-react-server-components-rsc)를 참조하세요.

이것은 다음 메이져 버전인 Storybook 8.0의 내용을 자세히 설명하는 첫 번째 게시물이며, 앞으로 몇 달 안에 더 많은 내용이 추가될 예정입니다. 다음 릴리스에 대한 모든 소식을 확인하려면 [소셜 미디어에서 팔로우](https://twitter.com/storybookjs?ref=storybookblog.ghost.io)하거나 [Storybook 뉴스레터에 가입](https://storybook.us18.list-manage.com/subscribe?u=06a6fce3ab1327784d4342396&id=18b5cea6e6&ref=storybookblog.ghost.io)하세요!