---
title: react-query 시작하기 (feat. Tanstack)
date: '2023-02-05 00:00:00'
author: soobing
tags: react state management react-query
categories: react
draft: false
---

## Introduction

이 글을 읽기전 [**React의 상태관리 종류 4가지**](https://soobing.github.io/react/react-state-management/)를 먼저 읽으면 이해가 쉬울 수 있다.

얼마전 회사 프로젝트에 react-query를 도입하여 사용중인데 정말 너무너무 좋다. react-query를 이용해서 server state를 분리하다보니 loading 처리나, refetch 등 불필요한 코드가 많이 줄었다.

뭐든지 처음이 어렵지 큰 그림을 알고있으면 도입하여 적용하는데에는 큰 문제가 없고, 사용하면서 상황에 맞게 옵션과 아키텍쳐를 변경하면 된다고 생각하기 때문에, 이번 포스팅에서는 react-query를 적용하기 위해 필요한 전반적인 개념을 정리해보고자 한다. 

## 용도

react-query는 서버 데이터 관리를 위한 라이브러리다.  이 라이브러리는 API 호출, 캐시 및 상태 관리, 오류 처리 등의 작업을 간단하게 처리할 수 있도록 도와준다.

서버 데이터 관리는 중요한 부분 중 하나다. 클라이언트에서는 서버로부터 데이터를 가져와(Read) 화면에 그려주고, 데이터를 생성(Create), 삭제(Delete), 업데이트(Update)하는 할 수 있도록 한다.

매번 API 호출를 통해서 데이터를 가져와 화면을 그릴수도 있겠지만 서버에서 데이터를 가져오는 것은 요청-응답과정이 있으므로 느리고 서버의 트래픽을 늘려 부하가 증가할 수 있으므로 최소한의 요청으로 화면을 그릴 수 있도록 최적화해야 한다. 데이터를 캐시하고, 요청을 최소화하고, 데이터를 이전 요청 결과를 재사용하여 처리 시간을 줄이는 등의 방법으로 최적화할 수 있다.

react-query는 이러한 데이터 관리 작업을 간단하고 효율적으로 처리할 수 있는 방법을 제공한다. 데이터를 캐시하고, 자동으로 재시도하고, 데이터에 대한 오류 처리를 수행하며, 데이터 상태와 흐름을 추적할 수 있다. 또한, React Query는 라이브러리 사용자의 입맛에 맞게 커스터마이징이 가능하다. 이를 통해 개발자는 데이터 관리 작업에 더 많은 시간과 노력을 투자하지 않아도, 더 나은 애플리케이션을 만들 수 있다.

정리하면 react-query에서 해주는일은 아래와 같다.

1. API 호출
    - useQuery, useMutation을 통해서 CRUD 처리를 할 수 있습니다.
2. 캐시 및 상태 관리
    - 데이터에 대한 유효성 검사(캐싱하고 있는 데이터와 서버데이터 동기화)
        - 특정 state 변경시 data refetch → dependency variable
        - 이벤트 발생 후에 refetch → Query Invalidation
        - 백그라운드에서 캐시된 데이터를 자동으로 업데이트
    - 데이터 흐름을 추적 → debugger 제공
3. 오류 처리 - 서버에서 문제가 발생했을 경우 재시도, 실패 처리 등

## 큰 개념 3가지

[공식문서 Quick Start 섹션](https://tanstack.com/query/latest/docs/react/quick-start)에서도 3가지 core concept를 간략하게 설명하고 있다. 이 3가지 개념만 이해하면 처음 도입하는데 문제가 없고 왠만한 CRUD 케이스는 거의 커버가 가능하다.

### 1) Queries

### 2) Mutations

### 3) Query Invalidation