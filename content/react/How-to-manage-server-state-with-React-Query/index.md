---
title: React Query를 사용하여 서버 상태를 관리하는 방법
date: '2023-06-21 00:00:00'
author: soobing
tags: react state management react-query
categories: react
draft: false
---

# React Query를 사용하여 서버 상태를 관리하는 방법

React Query는 React 애플리케이션에서 데이터 페칭과 캐싱 프로세스를 간소화하는 라이브러리입니다. 이 라이브러리는 API와 기타 데이터 소스로부터 데이터를 페칭하고 업데이트하는 데 필요한 도구와 유틸리티를 제공하며 데이터 페칭의 상태와 캐싱을 자동으로 관리합니다. 이 라이브러리는 데이터를 React 컴포넌트에서 더 쉽게 다룰 수 있도록 다양한 훅과 유틸리티를 제공합니다.

이 포스트에서는 React Query의 주요 기능에 대해 이야기하겠습니다. 여기서 제 목적은 가능한 한 빨리 React Query를 사용하여 작업을 시작할 수 있는 출발점을 제공하는 것입니다.

React 앱 개발에 경험이 있다면, 클라이언트 상태 관리를 위해 Redux와 같은 라이브러리를 사용한 적이 있을 수 있습니다. 반면에, React Query는 서버 상태를 관리하기 위한 라이브러리입니다. 그러므로 React Query에 대해 이야기하기 전에 클라이언트 상태와 서버 상태의 차이에 대해 알아보도록 하겠습니다.