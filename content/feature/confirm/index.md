---
title: Promise를 사용하여 confirm창 구현하기
date: '2022-02-21 00:00:00'
author: soobing
tags: promise
categories: feature
draft: false
---

window.confirm과 같이 작동하는 confirm 컴포넌트를 만들어보자.

보통 어플리케이션에서 공통된 디자인의 confirm 창을 사용한다. 이때, window.confirm과 같이 상황에 맞는 메세지와 CANCEL/OK 혹은 OK 창을 띄우고 사용자가 확인 또는 취소버튼을 누를때까지 기다렸다가 다음 동작을 이어나가고 싶은 경우가 일반적이다.

이렇게 자주 사용되는 공통 confirm 컴포넌트는 어떻게 구현 하면 좋을까? 전역 컴포넌트 이므로 global 상태값을 이용하여 confirm 창을 띄워줄 수 있도록 하고, confirm의 버튼 클릭시 Promise를 리턴하여 유저의 선택을 async...await으로 기다리게 구현해볼 예정이다.

이것은 React이든, Vue 이든, Redux를 사용하든, Context API를 사용하든, Vuex를 사용하든 구현하는 큰틀은 동일하다.
## React에서 구현

## Vue에서 구현
## 참고
- https://ichi.pro/ko/promisewa-react-hooksleul-sayonghan-window-confirm-daeche-228423841049210


## 생각해볼것...
- 음.. 여러 모달이 뜨는케이스는 자료구조를 어떻게 할 것인가? 2개 이상 뜰 경우를 대비해야한다.
  - https://hackernoon.com/async-await-generators-promises-51f1a6ceede2 
  global 로 관리
- generator 실행기를 만들어서 async...await를 구현해볼 수 있다.