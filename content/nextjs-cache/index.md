---
title: Next.js 캐싱 이해하기
date: '2025-02-02 00:00:00'
author: soobing
tags: next.js cache
categories: framework
draft: false
---

기존의 SPA(Single Page Application) 방식에서는 클라이언트가 API를 호출하여 데이터를 가져오는 반면, Next.js는 서버에서 미리 데이터를 가져와 렌더링할 수 있습니다. 캐싱을 제대로 활용하지 않으면, 사용자가 페이지를 방문할 때마다 서버가 동일한 요청을 반복해서 처리해야 합니다. 이로 인해 서버 부하가 증가하고, 특히 트래픽이 많은 서비스라면 서버 리소스 사용량이 급격히 증가할 수 있습니다. 

Next.js에서는 강력한 캐싱 기능을 제공하여 성능을 더욱더 극대화할 수 있습니다. 이번 글에서는 Next.js의 캐싱 방식과 활용법을 좀 더 이해하기 쉽게 간략히 설명해보도록 하겠습니다.

## 1. 캐싱이란?

캐싱(Caching)은 자주 사용하는 데이터를 미리 저장해 두었다가, 다음에 같은 요청이 들어오면 다시 계산하거나 가져오지 않고 빠르게 제공하는 기술입니다. 

## 2. Next.js에서 제공하는 캐싱 방식

| **Mechanism** | **What** | **Where** | **Purpose** | **Duration** |
| --- | --- | --- | --- | --- |
| [Request Memoization](https://nextjs-ko.org/docs/app/building-your-application/caching#request-memoization) | 함수의 반환 값 | Server | React Component 트리에서 데이터를 재사용 | 요청 라이프사이클 동안 |
| [Data Cache](https://nextjs-ko.org/docs/app/building-your-application/caching#data-cache) | 데이터 | Server | 사용자 요청 및 배포 간 데이터 저장 | 지속적 (재검증 가능) |
| [Full Route Cache](https://nextjs-ko.org/docs/app/building-your-application/caching#full-route-cache) | HTML 및 RSC 페이로드 | Server | 렌더링 비용 절감 및 성능 향상 | 지속적 (재검증 가능) |
| [Router Cache](https://nextjs-ko.org/docs/app/building-your-application/caching#client-side-router-cache) | RSC 페이로드 | Client | 네비게이션 시 서버 요청 감소 | 사용자 세션 또는 시간 기반 |

### 2.1. 요청 메모이제이션 (Request Memoization)

요청 메모이제이션 (Request Memoization)은 **React에서 제공하는 기능으로,** 하나의 렌더링 사이클에서 동일한 `fetch` 요청이 여러 번 발생할 경우, 첫 번째 요청의 결과를 캐시하여 이후 동일한 요청 시 재사용하는 기능입니다. 

이를 통해 **컴포넌트 트리의 여러 곳에서 동일한 데이터를 가져와야 할 때**, 데이터를 전역적으로 가져와서 props로 전달할 필요 없이, 필요한 컴포넌트 내에서 데이터를 가져올 수 있습니다. 이러한 메모이제이션은 R**eact의 렌더링 패스 동안에만 유지**되며, 렌더링이 완료되면 캐시는 사라집니다.

메모이제이션은 기본적으로 `GET` 메서드의 `fetch` 요청에만 적용되며, React 컴포넌트 트리 내부에서만 동작합니다. 따라서, `generateMetadata`, `generateStaticParams`, Layout, Page와 같은 **서버 컴포넌트 내에서 실행되는** `fetch` **요청에 적용**됩니다. (클라이언트 컴포넌트에서는 적용 안됨)

그러나 React 컴포넌트 트리와는 별개로 동작하는 [라우트 핸들러(Route Handlers)](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) 내에서 수행되는 `fetch` 요청은 React의 요청 메모이제이션 기능의 대상이 되지 않습니다.

메모이제이션은 **각 렌더링 중에만 적용되며, 서버 요청 간에 공유되지 않습니다.** 따라서 별도의 **재검증(revalidation)을 수행할 필요가 없습니다.** 데이터가 캐시되었든 캐시되지 않았든, 모든 요청은 렌더링 중 중복 요청을 방지하기 위해 메모이제이션 됩니다.

요약하면, React의 요청 메모이제이션은 동일한 `fetch` 요청의 중복 실행을 방지하여 성능을 최적화하는 데 도움이 됩니다. 이 기능은 React의 렌더링 패스 동안에만 적용되며, 서버 요청 간에는 공유되지 않습니다.

**✔️ 예시**

```tsx
async function fetchData() {
  const res = await fetch('/api/data');
  return res.json();
}

export default async function Page() {
  const data1 = await fetchData();
  const data2 = await fetchData(); // 캐싱된 응답이 재사용됨
  return <div>{JSON.stringify(data1)}</div>;
}

```

### 2.2. 데이터 캐시 (Data Cache)

데이터 캐시(Data Cache)는 **Next.js에서 제공하는 기능**으로, 데이터 요청 결과를 **서버 요청 및 배포 간에도 지속적으로 저장하여 재사용**할 수 있습니다. 이를 통해 동일한 데이터를 반복적으로 요청하는 것을 방지하고, 성능을 최적화할 수 있습니다.

✔️ **캐싱 과정**

1. **초기 요청:** `fetch` 요청이 렌더링 중 처음 호출되면, Next.js는 데이터 캐시에서 해당 요청의 캐시된 응답이 있는지 확인합니다.
2. **캐시 HIT:** 캐시된 응답이 있으면 즉시 반환되며, 메모이제이션됩니다.
3. **캐시 MISS:** 캐시된 응답이 없으면 데이터를 외부 소스에서 가져와 데이터 캐시에 저장하고, 메모이제이션합니다.

**✔️ 캐싱 제어**

개발자는 `fetch` 함수의 옵션을 통해 캐싱 방식을 세밀하게 조정할 수 있습니다. 

- **`{ cache: 'force-cache' }`:** 서버가 한 번 데이터를 가져오면 동일한 요청이 들어올 때마다 캐시된 데이터를 반환합니다. 이는 데이터가 자주 변경되지 않는 경우에 유용합니다.
- **`{ cache: 'no-store' }`:** 캐시를 사용하지 않고, 매번 새로운 데이터를 가져옵니다. 실시간 데이터가 필요한 경우에 적합합니다.

또한, `fetch` 함수의 `next` 옵션을 사용하여 데이터의 재검증 주기를 설정할 수 있습니다.

- **`{ next: { revalidate: 3600 } }`:** 데이터를 가져온 후 최대 3600초(1시간) 동안 캐시된 데이터를 사용하고, 그 이후에는 백그라운드에서 데이터를 재검증합니다.

**✔️ 예제**

```tsx
// 캐시를 사용하여 데이터를 가져오기
fetch('/api/data', { cache: 'force-cache' });

// 항상 최신 데이터를 가져오기
fetch('/api/data', { cache: 'no-store' });

// 최대 한 시간마다 재검증
fetch('https://...', { next: { revalidate: 3600 } })
```

### 2.3. 전체 페이지 캐싱 (Full Route Cache)

전체 페이지 캐싱 **서버 측에서 페이지의 렌더링 결과를 캐시**하여, 동일한 요청에 대해 서버의 렌더링 작업을 반복하지 않고 빠르게 응답할 수 있도록 합니다. 이는 서버 리소스 사용을 최적화하고, 사용자에게 빠른 페이지 로딩 경험을 제공합니다.

빌드 시 Next.js는 각 경로를 정적으로 렌더링하고, 그 결과를 **React Server Component Payload(RSC Payload)와 HTML 형태로 서버에 저장**합니다. 사용자가 해당 경로를 요청하면, 서버는 미리 저장된 RSC 페이로드와 HTML을 사용하여 빠르게 응답합니다. 

**✔️ 캐시 무효화 및 갱신**

- **데이터 재검증**: 데이터 캐시가 재검증되면, 서버는 컴포넌트를 다시 렌더링하고 새로운 결과를 캐시하여 최신 데이터를 제공합니다.
- **재배포**: 새로운 배포 시, 전체 경로 캐시는 초기화되어 최신 빌드 결과를 반영합니다.

**✔️ 옵트아웃(Opt-out) 방법**

특정 경로를 전체 경로 캐시에서 제외하고 **매 요청 시 동적으로 렌더링하려면,** 다음과 같은 설정을 사용할 수 있습니다.

- **동적 함수 사용**: 해당 경로를 전체 경로 캐시에서 제외하고, 요청 시마다 동적으로 렌더링합니다. 데이터 캐시는 여전히 사용할 수 있습니다.
- **경로 세그먼트 구성 옵션 설정**: `dynamic = 'force-dynamic'` 또는 `revalidate = 0` 옵션을 사용하여 전체 경로 캐시와 데이터 캐시를 건너뜁니다. 이 경우, 모든 요청에 대해 컴포넌트가 다시 렌더링되고 데이터가 가져와집니다. 클라이언트 측 라우터 캐시는 계속 적용됩니다.

아래 예시에서는 `dynamic = 'force-dynamic'` 설정을 통해 해당 페이지를 전체 경로 캐시에서 제외하고, 매 요청 시마다 데이터를 가져와 동적으로 렌더링합니다.

```tsx
export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await fetchData();
  return <div>{JSON.stringify(data)}</div>;
}
```

**✔️ 예제**

정적 사이트 생성(SSG)을 활용하여 블로그 게시물을 정적으로 생성하고, 이를 전체 경로 캐시에 저장하는 예시입니다.  `getStaticPaths` 함수에서 모든 블로그 게시물의 경로를 미리 생성합니다. `getStaticProps`에서 각 게시물의 데이터를 가져와 정적으로 렌더링하고, 결과를 전체 경로 캐시에 저장합니다. 페이지를 생성한 후 최대 1시간(3600초) 동안 캐시된 데이터를 사용하고, 그 이후에는 백그라운드에서 데이터를 재검증(revalidate)하여 최신 상태를 유지합니다.

```tsx
// pages/posts/[id].tsx

import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface PostProps {
  post: {
    id: string;
    title: string;
    content: string;
  };
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  // 페이지가 아직 생성되지 않았을 때 로딩 상태를 표시
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// 정적 경로를 정의
export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  const paths = posts.map((post: { id: string }) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: true };
};

// 각 게시물에 대한 정적 데이터를 가져옴
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://api.example.com/posts/${params?.id}`);
  const post = await res.json();

  return {
    props: {
      post,
    },
    // 1시간마다 캐시를 재검증하여 최신 데이터를 반영
    revalidate: 3600,
  };
};

```

### 2.4. 클라이언트 사이드 라우터 캐시 (Client-side Router Cache)

클라이언트 사이드 라우터 캐시 (Client-side Router ****Cache)는 **클라이언트 측에서 경로 세그먼트의 RSC Payload를 인메모리 캐시에 저장**하여, 사용자가 애플리케이션 내에서 페이지 간을 이동할 때 발생하는 서버 요청을 줄이고 탐색 경험을 향상시키는 기능입니다.

사용자가 경로 간에 탐색할 때, Next.js는 방문한 경로 세그먼트를 캐시하고, 사용자가 탐색할 가능성이 있는 경로를 사전 로드(prefetch)합니다.

이러한 캐시는 사용자가 애플리케이션을 탐색하는 동안 유지되지만, 페이지를 새로 고침하면 초기화됩니다. 또한, 레이아웃과 로딩 상태의 캐시는 자동으로 무효화되며, 그 기간은 리소스의 사전 로드 여부와 정적 생성 여부에 따라 최소 30초에서 최대 5분까지 다양합니다.

**✔️ 주의사항**

- **옵트아웃 불가**: 라우터 캐시는 클라이언트 측에서 자동으로 관리되며, 개발자가 이를 직접 비활성화할 수 없습니다.
- **클라이언트 컴포넌트 제외**: 라우터 캐시는 서버 컴포넌트의 RSC Payload를 저장하므로, 클라이언트 컴포넌트에서 실행되는 코드는 캐시되지 않습니다.

**✔️ 예제**

```tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/about">소개 페이지로 이동</Link>
    </div>
  );
}

```

## 3. 캐시를 갱신하는 방법 (Revalidation)

캐싱을 사용하면 속도는 빨라지지만, 데이터가 오래된 상태로 남아있을 수도 있습니다. Next.js에서는 `revalidate` 옵션을 통해 일정 시간마다 데이터를 새로고침 할 수 있습니다.

```tsx
// 60초마다 데이터 새로 가져오도록 설정
fetch('/api/data', { next: { revalidate: 60 } });

```

또한 특정 데이터를 업데이트하고 싶다면 `revalidateTag()`나 `revalidatePath()`를 사용할 수도 있습니다.

## 4. 언제 캐싱을 사용할까?

- **빠른 응답이 필요한 경우** → `force-cache`
- **실시간 데이터가 필요한 경우** → `no-store`
- **주기적으로 데이터가 업데이트되어야 하는 경우** → `revalidate`

## 5. 정리

Next.js에서 캐싱은 성능 최적화에 중요한 역할을 합니다. 기본적으로 Next.js는 최적의 성능을 위해 캐싱을 자동으로 관리하지만, 필요에 따라 직접 설정을 변경할 수도 있습니다.

- 자주 변경되지 않는 데이터는 **캐싱**을 활용하고,
- 실시간 업데이트가 필요한 데이터는 **캐싱을 끄고(no-store)**,
- 일정 주기로 갱신해야 하는 데이터는 **revalidate**를 설정하면 됩니다.