---
title: (번역) React Query를 사용하여 서버 상태를 관리하는 방법
date: '2023-06-21 00:00:00'
author: soobing
tags: react state management react-query
categories: react
draft: false
---

> 원문: https://www.tecforfun.com/frameworks/how-to-manage-server-state-with-react-query/
> 

React Query는 React 애플리케이션에서 데이터 페칭과 캐싱 프로세스를 간소화하는 라이브러리입니다. 이 라이브러리는 API와 기타 데이터 소스로부터 데이터를 페칭하고 업데이트하는 데 필요한 도구와 유틸리티를 제공하며 데이터 페칭의 상태와 캐싱을 자동으로 관리합니다. 이 라이브러리는 React 컴포넌트에서 데이터를 더 쉽게 다룰 수 있도록 다양한 훅과 유틸리티를 제공합니다.

이 포스트에서는 React Query의 주요 기능에 대해 이야기하겠습니다. 여기서 제 목적은 가능한 한 빨리 React Query를 사용하여 작업을 시작할 수 있는 출발점을 제공하는 것입니다.

React 앱 개발에 경험이 있다면, 클라이언트 상태 관리를 위해 Redux와 같은 라이브러리를 사용한 적이 있을 수 있습니다. 반면에, React Query는 서버 상태를 관리하기 위한 라이브러리입니다. 그러므로 React Query에 대해 이야기하기 전에 클라이언트 상태와 서버 상태의 차이에 대해 알아보도록 하겠습니다.

## 클라이언트 상태 vs 서버 상태

클라이언트 상태와 서버 상태의 차이점을 살펴보겠습니다. 이는 React Query가 어떤 역할을 하는지와 서버 상태 관리를 위해 다른 라이브러리가 왜 필요한지를 이해하는 데 도움이 됩니다.

|  | 클라이언트 상태 | 서버 상태 |
| --- | --- | --- |
| 위치 | 클라이언트(브라우저 또는 기기)에 저장된 데이터 | 서버나 외부 데이터 소스에 저장된 데이터 |
| 접근성 | 저장한 클라이언트만 접근 가능 | 접근 권한이 있는 모든 클라이언트 접근 가능 |
| 데이터 관리 | 클라이언트에서 관리(예: Redux와 같은 상태 관리 라이브러리 사용) | 서버에서 관리(예: 데이터베이스 사용) |
| 지속성 | 세션 간에 지속성이 유지되거나 유지되지 않을 수 있음 | 일반적으로 세션 간에 지속성 유지 |
| 네트워크 요청 | 데이터를 가져오거나 업데이트하려면 네트워크 요청이 필요할 수 있음 | 데이터 접근 또는 업데이트를 위해 네트워크 요청이 필요할 수 있음 |
| 보안 | 클라이언트가 액세스할 수 있고 변조 또는 가로채기의 대상이 될 수 있으므로 보안 수준이 낮을 수 있음 | 인증 및 암호화로 보호할 수 있으므로 더 안전할 수 있음 |
| 성능 | 네트워크 요청이 필요하지 않기 때문에 서버 상태에 비해 접근하고 업데이트하는 속도가 빠를 수 있음 | 네트워크 요청이 필요할 수 있으므로 클라이언트 상태에 비해 접근하고 업데이트하는 속도가 느릴 수 있음 |
| 확장성 | 클라이언트 기기의 용량에 제한을 받을 수 있기 때문에 서버 상태보다 확장성이 떨어질 수 있음 | 전용 서버나 고용량의 데이터 소스로 관리되기 때문에 클라이언트 상태보다 확장성이 더 높을 수 있음 |
| 예시 | 컴포넌트 상태, Redux 상태, 브라우저 쿠키 | 데이터베이스 레코드, API 응답, 서버 세션 데이터 |

표: 클라이언트 상태 vs 서버 상태

기존에는 React 개발자들은 클라이언트 상태 관리를 위해 Redux나 React Context API를 사용해왔습니다. API 데이터와 상호작용할 때에는 주로 [`useState` 훅과 `useEffect` 훅의 조합](https://www.tecforfun.com/frameworks/how-to-create-a-dynamic-table-in-react-with-api-data/)을 통해 fetch API 데이터를 가져와 클라이언트 상태에 반영합니다.

React Query는 API 데이터를 캐싱하고 관리하기 위한 훅과 유틸리티를 제공함으로써, 원격 데이터 소스로부터 데이터 페칭을 위해 사용하는 `useState`와 `useEffect` 훅을 대체할 수 있는 라이브러리입니다. 이 라이브러리는 API 데이터를 가져오는 과정을 간소화하고, 캐시를 처리하며, API 요청의 로딩 및 오류 상태를 관리합니다.

## React Query에서의 네 가지 기본 개념

React Query를 사용하기 위해 반드시 이해해야 할 네 가지 기본 개념이 있습니다.

1. 쿼리(Queries):
    1. API 엔드포인트나 데이터베이스와 같은 원격 데이터 소스로부터 데이터를 요청
    2. `useQuery` 훅을 사용하여 관리됨
2. 뮤테이션(Mutations)
    1. 서버에 새로운 데이터를 추가하거나 기존 데이터를 수정하는 요청
    2. `useMutation` 훅을 사용하여 관리됨
3. 쿼리 캐싱(Query Caching): 쿼리 캐싱은 React Query의 내장 기능으로, 쿼리 결과를 메모리에 저장
4. 쿼리 무효화(Query Invalidation): 쿼리를 무효하거나 오래된 상태로 표시하는 과정

## useQuery 훅으로 데이터 페칭

공식 문서에서 "쿼리는 고유 키에 연결된 데이터의 비동기 소스에 대한 선언적 종속성(declarative dependency)입니다."라고 나와 있습니다.

정말 복잡한 설명이네요 !!!!

여기에서 **선언적 종속성**은 코드(useQuery훅 사용)에서 선언한 쿼리를 나타냅니다. 이 쿼리는 API 데이터 포인트 또는 데이터베이스에서 **비동기적으로** 데이터를 가져오도록 서버에 요청하는 것입니다.

이제 `useQuery` 훅으로 어떻게 이 작업을 수행하는 방법을 살펴보겠습니다.

useQuery 훅은 두 가지 필수 옵션(프로퍼티)을 사용합니다.

1. **고유한 키**
2. **promise를 반환하는 함수**

코드 구문:

```jsx
const query = useQuery( { queryKey: [ ‘key’ ],   queryFn: callback })
```

`querykey` 는 고유한 키 입니다. React Query의 최신 안정 버전에서는 이 키를 지정하기 위해 배열 표기법을 사용해야 합니다.

`queryFn` 은 useQuery 훅이 호출될 때 React Query에 의해 실행되는 콜백 함수입니다. 이 함수는 `useQuery` 훅의 실행 중에 특정 시점에서 명세한 작업(데이터 페칭)을 수행합니다.

https://www.tecforfun.com/ezoic/video/embed.go?contentId=56315d685adc63fc646ee2880771f3badc50210195c93583c60972921a420f7a

[자바스크립트 페치 API 예제 - A Real World App](https://humix.com/redirect?url=https%3A%2F%2Fwebninjadeveloper.com%2Fhumix%2Fvideo%2F56315d685adc63fc646ee2880771f3badc50210195c93583c60972921a420f7a)

이 두 가지 옵션 외에 선택적 프로퍼티를 가질 수도 있습니다. 다음 섹션에서 중요한 몇 가지를 다룰 예정 입니다.

예시:

```jsx
const getProducts = () => fetch( 'https://jsonplaceholder.typicode.com/users')
                          .then( res  => res.json() )

const query = useQuery( { queryKey: [‘users’],   queryFn: getTodos })
```

## 무엇을 반환하는가

`useQuery` 훅은 객체를 반환합니다. 이 객체는 쿼리의 상태에 대한 정보가 포함되어 있습니다. 중요한 프로퍼티 및 메서드 중 일부는 아래와 같습니다.

**프로퍼티**

1. `data`: 성공적으로 페칭된 경우 쿼리로부터 반환된 데이터
2. `error`: (에러가 발생했다면) 쿼리 도중 발생한 모든 에러
3. `isLoading`: 쿼리가 현재 로딩 중인지 여부를 나타내는 불리언 값
4. `isError`: 쿼리 결과가 오류인지 여부를 나타내는 불리언 값

**메서드**

- `refetch`: 쿼리 데이터를 수동으로 리페치 하도록 트리거하는 함수
- `remove`: 캐시에서 특정 쿼리를 제거할 수 있는 함수

따라서, 이러한 프로퍼티들의 값에 접근하기 위해 자바스크립트 구조 분해 할당을 사용할 수 있습니다.

```jsx
const { isLoading, isError, data, error } = useQuery( { queryKey: [‘todos’], queryFn: getTodos });
```

[공식 문서에서 `useQuery`의 모든 레퍼런스](https://tanstack.com/query/v4/docs/react/reference/useQuery)를 확인할 수 있습니다.

## useQuery와 데이터 리페칭 API

기본적으로, `useQuery`는 컴포넌트가 처음으로 마운트될 때 API에서 데이터를 자동으로 페칭합니다. 그러나 데이터의 이후 업데이트는 자동으로 가져오지 않습니다. 다시 말해, API 엔드포인트나 서버에서 업데이트가 발생한 후에도 `useQuery`는 데이터를 다시 가져오지 않습니다.

기본적으로, `useQuery`의 옵션인 `refetchOnMount`, `refetchOnReconnect`, `refetchOnWindowFocus`와 같은 값들은 true로 설정됩니다.

다음 표를 살펴보세요.

| useQuery 옵션 | 역할 | 기본값 |
| --- | --- | --- |
| refetchOnWindowFocus | 데이터가 오래된(stale) 경우 브라우저 창이 포커스 되면 리페치 | true |
| refetchOnMount | 데이터가 오래된 경우 마운트 시 리페치 | true |
| refetchOnReconnect | 데이터가 오래된 경우 재연결 시 리페치 | true |

브라우저를 백그라운드에서 유휴(idle) 상태로 유지하는 상황을 가정해 보겠습니다. 누군가는 API 데이터/서버를 업데이트하기 위해 요청을 보내고 데이터가 업데이트됩니다. 그러나 브라우저는 백그라운드에 있기 때문에 UI가 업데이트되지 않습니다. useQuery에는 API 엔드포인트/서버에서 업데이트된 데이터를 다시 가져올 트리거가 없습니다. 이러한 상황에서는 `refetchInterval` 옵션을 사용할 수 있습니다. 이 옵션을 사용하면 지정된 밀리초 단위의 주기로 useQuery를 실행하여 데이터를 다시 가져올 수 있습니다. 이렇게 하면 브라우저 창이 유휴(idle) 상태일 때에도 데이터를 다시 가져올 수 있습니다.

## useMutation 훅을 사용하여 데이터를 생성, 업데이트 및 삭제

이제 `useMutation` 훅을 살펴보겠습니다. 이 훅을 사용하여 API 엔드포인트나 서버에서 데이터를 생성, 업데이트 또는 삭제할 수 있습니다.

`useMutation` 훅은 적어도 하나의 옵션을 필요로 하며, 다른 옵션은 모두 선택적입니다.

코드 구문:

```jsx
const mutation =  useMutation({  mutationFn: mutationFunction })
```

예시:

```jsx
const AddUser = useMutation({
      mutationFn: ( user ) => {
       
        return fetch('https://jsonplaceholder.typicode.com/users',
        {
          method:'post',
          headers: {
             "Content-Type": "application/json",          
          },
          body:JSON.stringify( user )
        }).then( res =>  res.json() )
      })
```

## 무엇을 반환하는가

`useMutation` 훅은 객체를 반환합니다. 이 객체에는 뮤테이션과 상호 작용하고 결과를 처리하는 데 사용할 수 있는 여러 프로퍼티와 메서드가 포함되어 있습니다. 그 중 일부는 다음과 같습니다.

**프로퍼티**

- `isLoading`: 현재 뮤테이션이 진행 중인지 여부를 나타내는 불리언 값
- `isSuccess`: 뮤테이션이 성공적으로 완료되었는지 여부를 나타내는 불리언 값
- `isError`: 뮤테이션 중에 오류가 발생했는지 여부를 나타내는 불리언 값
- `data`: (데이터가 있다면) 뮤테이션에 의해 반환된 데이터

**메서드**

- `mutate`: 이 뮤테이션을 실행하기 위해 호출할 수 있는 함수. 첫 번째 인자로 필요한 변수를 가진 객체를 전달 가능
- `reset`: 뮤테이션을 초기 상태로 리셋하는 함수
- `onSuccess`: 뮤테이션이 성공적으로 완료되었을 때 호출될 콜백을 정의할 수 있는 함수
- `onError`: 뮤테이션 중 오류가 발생했을 때 호출될 콜백을 정의할 수 있는 함수

`[useMutation` 훅에 대한 모든 레퍼런스는 공식문서](https://tanstack.com/query/v4/docs/react/reference/useMutation)에서 확인할 수 있습니다.

## React Query에서의 쿼리 캐싱

useQuery 훅을 사용하여 원격 서버에서 일부 사용자 데이터를 가져오는 경우가 있다고 가정해 봅시다. 데이터를 받는 동안 시간이 걸릴 수 있습니다. React Query는 이 사용자 데이터를 캐시에 저장하여 이후 동일한 요청 시 더 빠르게 찾을 수 있도록 합니다. 이를 통해 데이터 로드하는 데 걸리는 시간을 줄일 수 있습니다.

앞서 언급한 대로, useQuery 훅은 고유한 키를 사용합니다. 서버에서 반환된 데이터는 이 키 아래에 캐시됩니다. 예를 들어, `[‘users’]`를 키로 사용한다면, 이 키는 캐시에서 동일한 API 엔드포인트에 대한 후속 요청 데이터를 추출하는 데 사용될 것입니다.

기본적으로, useQuery는 이 캐시 데이터를 오래된(stale) 상태로 표시합니다. React Query 캐싱과 관련된 두 가지 옵션을 알아야 합니다. 바로 `staleTime`과 `cacheTime`입니다.

`staleTime`: 쿼리 결과가 오래된 것으로 간주되는 데 걸리는 시간을 결정합니다. 시간은 밀리초로 지정됩니다.

예: `staleTime: 5000` // 데이터는 최대 5초 동안 stale 상태로 유지됨

이는 데이터가 5초가 지난 후에 stale 상태가 됨을 의미합니다.

반면에, `cacheTime` 옵션은 쿼리 결과가 캐시에 유지되는 시간을 지정합니다.

예: `cacheTime: 60000` // 데이터가 1분 동안 캐시에 유지됨

이는 쿼리 결과가 1분 동안 캐시에 유지되며 그 이후에는 데이터가 가비지 컬렉션됨을 의미합니다.

```jsx
const query = useQuery({
      queryKey: [‘users’],
      queryFn: getUsers,
      staleTime: 5000,
      cacheTime: 60000 
    })
```

## React Query에서의 쿼리 무효화(Invalidation)

이전에 설명한 대로, 캐시에 저장된 데이터는 staleTime 옵션에 따라 오래된 데이터로 처리될 수 있습니다. 그러나 특정 상황에서는 `staleTime`을 무시하고 데이터를 무효화시키거나 오래되었다고 표시해야 하는 상황이 발생할 수 있습니다. 예를 들어, API에 POST 요청을 보낼 때는 API 엔드포인트의 데이터가 최신 데이터이므로 수동으로 캐시에 있는 데이터를 유효하지 않은 것으로 표시해야 합니다. 결과적으로, POST 요청 후에는 즉시 캐시의 데이터가 오래되었다고 간주됩니다.

이를 해결하기 위해, React Query의 `QueryClient` 객체는 `invalidateQueries` 메서드를 제공합니다. 이 메서드는 모든 쿼리 또는 특정 쿼리를 오래된(stale) 상태로 표시할 수 있습니다. 또한 고유한 키를 사용하여 특정 쿼리를 오래된 상태로 표시할 수도 있습니다.

```jsx

import { useQueryClient } from '@tanstack/react-query'

// useQueryClient 훅을 사용하여 queryClient 객체 생성
const queryClient = useQueryClient()

// 캐시의 모든 쿼리 무효화
queryClient.invalidateQueries()

// 'users'로 시작하는 키가 있는 모든 쿼리 무효화
queryClient.invalidateQueries({ queryKey: ['users'] })
```

## 마무리

이 글에서는 React Query가 무엇인지와 그 필요성에 대해 다뤘습니다. React Query는 서버 상태를 관리하기 위한 강력한 라이브러리입니다. 이는 `useQuery`와 같은 React 훅을 활용하여 API 엔드포인트나 서버에서 데이터를 가져오고 `useMutation`을 사용하여 원격 데이터를 조작합니다. React Query는 메모리 내 캐시를 관리하는 스마트 캐싱 메커니즘을 갖추고 있습니다. 이를 통해 캐시가 원격 데이터 소스와 동기화되도록 보장합니다. React Query를 사용하면, 코드를 간소화하고 React 애플리케이션의 성능을 최적화할 수 있습니다.

## Resources

[전체 코드 다운로드](https://github.com/dineshigdd/react-query-js)

참고: 데모 프로젝트에서는 [mockapi.io](https://mockapi.io/)로 생성한 모의 API를 활용합니다. 그러나 mockapi.io를 사용하여 직접 자신만의 API 엔드포인트를 생성하는 것을 강력히 추천합니다. 이는 배우는 동안 실험을 하는 것이 더 쉬울 수 있기 때문입니다.

[mockapi.io에서 모의 API를 만드는 방법](https://www.tecforfun.com/misc/how-to-set-up-mock-api-at-mockapi-io/) 알아보기

[React Query 설치](https://tanstack.com/query/v4/docs/react/installation)

[React Query에서 쿼리들](https://tanstack.com/query/v4/docs/react/guides/queries)

[React Query 에서 뮤테이션들](https://tanstack.com/query/v4/docs/react/guides/mutations)

[React Query에서 쿼리 무효화](https://tanstack.com/query/v4/docs/react/guides/query-invalidation)