---
emoji: 🌋
title: Internet Explorer 이슈 모음
date: '2022-02-23 00:00:00'
author: soobing
tags: IE 브라우저
categories: browser
---

IE 11을 대응하면서 겪었던 이슈들

1. input 
- file 일때 e.target.value 값이 변경되면 onChange를 다시 탄다. 
- text 일때 value 값이 변경되면 onInput 핸들러를 항상 탄다.

2. Date 관련이슈들
- Date 생성자 호출시 leadingZeror를 붙이지 않을 경우 Invalid Date 반환
`new Date('2021-1')`

- IE에서는 toLocaleDateString 사용시 tokenizer가 `/`임.
(참고로 크롬은 `.`이다.) 해결방법은 toLocalDateString이 브라우저별로 이슈가 많으므로 getter를 사용한다.

3. ScrollTo 동작 안함. synctax error 백화현상.
`element.scrollTop = 0` 으로 조정해야 함

4. IE에서 window.open 시 반환하는 윈도우창에 global 변수 바인딩 안됨
5. IE에서 a tag target="_blank"로 새창 열 경우 window.opener가 chorme은 null이고, IE는 null이 아님

관련해서 알아볼 것 `rel="noopener noreferrer"`