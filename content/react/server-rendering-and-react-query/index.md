---
title: '서버에서 React Query  prefetching 한 데이터 사용하기'
date: '2023-12-10 00:00:00'
author: soobing
tags: react react-query hydrate dehydrate
categories: react react-query
draft: false
---
Next.js나 Remix 같은 프레임워크 내에서 React-Query를 사용한다면, 서버 렌더링 될 때 요청 후 응답받은 데이터를 SPA 방식으로 전환되고 나서도 유지할 수 있을까요? 어떻게 가능할까요? React Query의 `hydrate`와 `dehydrate`는 서버에서 미리 가져온 데이터를 클라이언트 사이드에서 재사용 할 수 있게 해줍니다. 이번 글을 통해 서버 렌더링과 어떻게 이를 가능하게 하는지 `hydrate`와 `dehydrate`에  대해서 알아봅시다.

## Server Rendering

서버 렌더링은 사용자가 페이지를 로드하는 즉시 볼 수 있는 초기 HTML을 서버에서 생성하는 행위입니다. 이는 페이지 요청 시 즉시 발생할 수 있으며(SSR), 이전 요청이 캐시 되었거나 빌드 시간에 미리 생성(SSG) 할 수도 있습니다.

클라이언트 렌더링 애플리케이션에서는 사용자에게 화면에 콘텐츠를 표시하기 전에 최소 3번의 서버 왕복(roundtrips)이 필요합니다. 

```bash
1. |-> Markup (내용 없이 - 비어있는 index.html)
2.   |-> JS
3.     |-> Query
```

서버 렌더링은 위의 과정을 아래와 같이 같이 변환한다는 것입니다.

```bash
1. |-> Markup (내용이 채워져있고, data가 초기화 되어있음)
2.   |-> JS
```

1번이 완료되면 사용자는 콘텐츠를 볼 수 있고, 2번이 끝나면 페이지가 상호작용 가능하고 클릭할 수 있게 됩니다. 마크업에 필요한 초기 데이터가 포함되어 있기 때문에, 적어도 데이터를 다시 검증할 필요가 있을 때까지는 클라이언트에서 3번을 실행할 필요가 없습니다.

서버 렌더링을 통해 1번 과정에서 내용이 채워져 있고 data가 초기화되어있는 html을 생성하기 위해서는 마크업을 생성/렌더링 하기 전에 해당 데이터를 미리 가져와야(prefetch) 하며, 데이터를 직렬화 가능한(serializable) 형식으로 dehydrate 시켜 마크업에 포함(embed) 시키고, 클라이언트에서는 React Query 캐시로 해당 데이터를 hydrate 하여 새로운 fetch를 클라이언트에서 추가적으로 할 필요가 없도록 해야 합니다.

## `initialData` 를 사용하여 서버에서 fetch한 데이터 사용하기

React Query의 `prefetching`과 `dehydrate`/`hydrate` API를 전혀 사용하지 않고, useQuery에 raw 데이터를 `initialData` 옵션으로 전달하는 방법입니다. 이 방법을 이용해서도 서버에서 미리 가져온 데이터를 클라이언트 사이드에서 재사용할 수 있는데요, 어떤 문제점이 있고 왜 Hydration API가 나오게 되었는지 살펴봅시다. Next.js에서 React-Query를 사용한다고 가정해 봅니다. 

```tsx
// Next.js 페이지 라우터 예시
export async function getServerSideProps() {
  const posts = await getPosts()
  return { props: { posts } }
}

function Posts(props) {
  const { data } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
    initialData: props.posts,
  })
}
```

`getStaticProps`나 이전의 `getInitialProps`에서도 잘 작동합니다. 이 방법은 설정은 최소한으로 하고, 일부 경우에는 빠른 해결책이 될 수 있지만, 전체 접근법에 비해 고려해야 할 몇 가지 tradeoff가 있습니다.

 참고: 여기서는 React Query를 사용하되, 데이터를 사전에 가져오기 위해 `initialData` 옵션을 사용하는 경우를 이야기하고 있음.*

- 트리 매우 아래쪽에 있는 컴포넌트에서 `useQuery`를 호출하는 경우, `initialData`를 그 지점까지 전달해야 합니다.
- 여러 위치에서 동일한 쿼리로 `useQuery`를 호출하는 경우, `initialData`를 하나에만 전달하는 것은 앱이 변경될 때 취약하고 문제가 발생할 수 있습니다. `initialData`와 함께 `useQuery`를 가진 컴포넌트를 제거하거나 이동하면, 컴포넌트가 다른 컴포넌트 내부에 깊숙이 위치하고 있고, 이런 구조에서 `useQuery`를 사용한다면, *(상위 컴포넌트에서 제공되는 `initialData`가 중첩된 하위 컴포넌트의 `useQuery`에 올바르게 전달되지 않아서)* 더 이상 데이터를 가지고 있지 않을 수 있습니다. 필요한 모든 쿼리에 `initialData`를 전달하는 것도 번거로울 수 있습니다.
- 서버에서 쿼리가 언제 fetch 되었는지 알 수 없으므로, `dataUpdatedAt`와 쿼리의 refetching 여부는 페이지가 로드된 시점에 따라 결정됩니다.
- 쿼리에 대한 데이터가 캐시에 이미 존재하는 경우에도, `initialData`는 이 데이터를 결코 덮어쓰지 않습니다. 심지어 새 데이터가 기존 데이터보다 신선하더라도 말입니다.
    - 왜 특히 더 나쁜지를 이해하려면, 위의 `getServerSideProps` 예를 고려해 보세요. 페이지를 여러 번 왔다 갔다 하면, 매번 `getServerSideProps`가 호출되어 새로운 데이터를 가져오지만, `initialData` 옵션을 사용하기 때문에 클라이언트 캐시와 데이터는 결코 업데이트되지 않습니다.

이러한 단점은 Hydration API를 사용하여 해결할 수 있고, 설정 또한 더욱 간단합니다.

## [Hydration API](https://tanstack.com/query/v5/docs/react/guides/ssr#using-the-hydration-apis) 사용하기

React Query에서는 `dehydrate`와 `hydrate` 함수를 제공하여 이 과정을 간소화합니다. 각 API의 역할과 사용방법 그리고 공식 문서 예시에 대해서 알아보도록 합시다.

### Hydrate와 Dehydrate의 역할

- `dehydrate`는 서버에서 React Query의 상태를 클라이언트로 전송할 수 있는 형태로 만들기 위해 사용됩니다. 서버에서 데이터를 가져온 후, 이 데이터를 직렬화(serialization) 하여 클라이언트로 전송합니다. 직렬화된 데이터는 `DehydratedState` 형태로 표현되며, 클라이언트 측에서 `hydrate` 함수를 통해 다시 React Query 상태로 변환됩니다.
- `hydrate`는 클라이언트 측에서 직렬화된 상태를 받아 이를 React Query의 상태로 변환합니다. 이 과정은 서버에서 미리 가져온 데이터를 클라이언트의 쿼리 캐시에 적용하여, 네트워크 요청 없이 데이터를 사용할 수 있게 합니다.

### 사용방법

1. 프레임워크 로더 함수에서 `const queryClient = new QueryClient(options)`를 생성합니다.
2. 앱 로더 함수에서, 미리 가져오고 싶은 각 쿼리에 대해 `await queryClient.prefetchQuery(...)`를 실행합니다.
    - 가능하면 `await Promise.all(...)`을 사용해 쿼리들을 병렬로 가져옵니다.
    - 미리 가져오지 않은 쿼리들이 있어도 괜찮습니다. 이 쿼리들은 서버에서 렌더링 되지 않고, 애플리케이션이 상호작용할 수 있게 된 후 클라이언트에서 가져옵니다. 이는 사용자 상호작용 후에만 표시되거나 또는 페이지 하단에 있어 더 중요한 콘텐츠의 로딩을 방해하지 않기 위해 사용됩니다.
3. 로더에서 `dehydrate(queryClient)`를 반환합니다. 이 반환 구문의 정확한 문법은 프레임워크에 따라 다를 수 있습니다.
4. `<HydrationBoundary state={dehydratedState}>`로 트리를 감싸는데, `dehydratedState`는 프레임워크 로더에서 옵니다. `dehydratedState`를 얻는 방법도 프레임워크에 따라 다릅니다.
    - 이 작업은 각 라우트마다 수행하거나, 애플리케이션 최상단에서 수행하여 보일러플레이트를 줄일 수 있습니다.

### [Next.js에서 예시](https://tanstack.com/query/v5/docs/react/guides/ssr#full-nextjs-pages-router-example)

- 초기 세팅(앱 로더 함수)
    
    ```tsx
    // _app.tsx
    import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
    
    export default function MyApp({ Component, pageProps }) {
      const [queryClient] = React.useState(
        () =>
          new QueryClient({
            defaultOptions: {
              queries: {
                // SSR에서는 클라이언트에서 즉시 재요청하는 것을 피하기 위해,
                // default staleTime을 0보다 높게 설정하는 것이 일반적입니다.
                staleTime: 60 * 1000,
              },
            },
          }),
      )
    
      return (
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      )
    }
    ```
    
- 각 라우터에서
    
    ```tsx
    // pages/posts.jsx
    import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query'
    
    // 이것은 getServerSideProps에서도 동일할 수 있습니다.
    export async function getStaticProps() {
      const queryClient = new QueryClient()
    
      await queryClient.prefetchQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
      })
    
      return {
        props: {
          dehydratedState: dehydrate(queryClient),
        },
      }
    }
    
    function Posts() {
      // useQuery는 <PostsRoute>의 더 깊은 자식에서도 마찬가지로 사용될 수 있으며,
      // 어느 방식이든 데이터는 즉시 사용 가능합니다.
      const { data } = useQuery({ queryKey: ['posts'], queryFn: getPosts })
    
      // 이 쿼리는 서버에서 미리 가져오지 않았으며, 클라이언트에서 시작될 때까지 요청하지 않을 것입니다.
      // 이 두 가지 패턴을 혼합해서 사용하는 것은 문제가 없습니다.
      const { data: commentsData } = useQuery({
        queryKey: ['posts-comments'],
        queryFn: getComments,
      })
    
      // ...
    }
    
    export default PostsRoute({ dehydratedState }) {
      return (
        <HydrationBoundary state={dehydratedState}>
          <Posts />
        </HydrationBoundary>
      )
    }
    ```
    
- 팁1) 보일러 플레이트를 없애기 위한 예시
    - 모든 라우트에 이 부분을 포함하는 것은 상당한 보일러 플레이트처럼 보일 수 있습니다. 이 방법에 문제가 있는 것은 아니지만, 이 보일러 플레이트를 제거하고 싶다면, Next.js에서 설정을 다음과 같이 수정할 수 있습니다.
    - AS-IS (보일러 플레이트 없애기 전)
        
        ```tsx
        export default PostsRoute({ dehydratedState }) {
          return (
            <HydrationBoundary state={dehydratedState}>
              <Posts />
            </HydrationBoundary>
          )
        }
        ```
        
    - TO-BE (보일러 플레이트 없앤 후)
        
        ```tsx
        // _app.tsx
        import {
          HydrationBoundary,
          QueryClient,
          QueryClientProvider,
        } from '@tanstack/react-query'
        
        export default function MyApp({ Component, pageProps }) {
          const [queryClient] = React.useState(() => new QueryClient())
        
          return (
            <QueryClientProvider client={queryClient}>
              <HydrationBoundary state={pageProps.dehydratedState}>
                <Component {...pageProps} />
              </HydrationBoundary>
            </QueryClientProvider>
          )
        }
        
        // pages/posts.tsx
        // HydrationBoundary를 포함한 PostsRoute를 제거하고 대신 Posts를 직접 내보냅니다:
        export default function Posts() { ... }
        ```
        
    - 팁2) 서버에서 조건부 prefetch 하는 방법
        
        ```tsx
        export async function getServerSideProps() {
          const queryClient = new QueryClient()
        
          const user = await queryClient.fetchQuery({
            queryKey: ['user', email],
            queryFn: getUserByEmail,
          })
        
          if (user?.userId) {
            await queryClient.prefetchQuery({
              queryKey: ['projects', userId],
              queryFn: getProjectsByUser,
            })
          }
        
          return { props: { dehydratedState: dehydrate(queryClient) } }
        }
        ```
        
        - 참고 - 클라이언트에서 조건부 fetch 하는법 (`enabled` 이용하기)
            
            ```tsx
            // 사용자 가져오기
            const { data: user } = useQuery({
              queryKey: ['user', email],
              queryFn: getUserByEmail,
            })
            
            const userId = user?.id
            
            // 그 다음 사용자의 프로젝트 가져오기
            const {
              status,
              fetchStatus,
              data: projects,
            } = useQuery({
              queryKey: ['projects', userId],
              queryFn: getProjectsByUser,
              // userId가 존재할 때까지 쿼리는 실행되지 않음
              enabled: !!userId,
            })
            ```
            

## 기타 참고사항

- 서버와 클라이언트 간 시간 동기화: `staleTime` 설정은 서버에서 데이터를 가져온 시점을 기준으로 합니다. 서버의 시간 설정이 정확해야 올바르게 작동합니다.
- 메모리 관리: 각 요청마다 새로운 `QueryClient`를 생성하는 경우, 서버의 메모리 사용량이 증가할 수 있습니다. 적절한 가비지 컬렉션 설정이 필요합니다.
- 코드 분할과 요청 워터폴: 코드 분할을 사용하는 경우, 데이터 가져오기 코드를 메인 번들에 포함시킬지, 코드 분할된 번들에 넣을지 결정해야 합니다. 이는 성능과 요청 워터폴에 영향을 미칩니다.

## 결론

React Query의 `hydrate`와 `dehydrate`는 서버 사이드 렌더링을 구현하는 데 있어 필수적인 도구입니다. 이들은 데이터를 효과적으로 전달하고, 애플리케이션의 성능을 최적화하는 데 중요한 역할을 합니다. 그러나 이 기능들을 사용할 때는 데이터의 필요성, 네트워크 오버헤드, 그리고 서버와 클라이언트 간의 일관성을 고려해야 합니다. 이를 통해 효율적이고 사용자 친화적인 SSR 경험을 구축할 수 있습니다.