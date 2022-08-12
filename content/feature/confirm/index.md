---
title: Promise를 사용하여 window.confirm 구현하기
date: '2022-08-19 00:00:00'
author: soobing
tags: promise
categories: feature
draft: false
---

보통 어플리케이션에서 공통된 디자인의 confirm 창을 사용한다. 이때, window.confirm과 같이 고객의 `OK/CANCEL` 클릭 여부에 따라서 다음 동작을 이어나가게 하고싶다면 어떻게 구현해야할까?

## 준비물

- Global State
- Modal Component
- Modal Hook

보통 웹 어플리케이션에서는 공통된 디자인의 confirm을 사용하므로 화면에 보여지는 역할을 하는 Modal Component가 필요하다. 이 컴포넌트는 Modal의 global state가 변경될 경우 화면에 표시되거나 숨겨져야한다. 모달을 화면에 그리기위한 모든 정보를 들고있는 global state는 show/hide 이외에도 표시할 텍스트, 어떤 타입의 버튼을 표시할 것인지, 버튼의 text는 어떻게 할것인지 등등 모달을 그리기위한 모든 정보를 들고 있다. 모달이 겹쳐져서 뜨는 경우도 있으므로 배열로 그 데이터를 가지고 있는게 좋다.

## 참고

- [https://ichi.pro/ko/promisewa-react-hooksleul-sayonghan-window-confirm-daeche-228423841049210](https://ichi.pro/ko/promisewa-react-hooksleul-sayonghan-window-confirm-daeche-228423841049210)