---
title: postmessage를 이용하여 window 간에 통신하기
date: '2022-02-28 00:00:00'
author: soobing
tags: IE Safari Chrome 브라우저
categories: browser
draft: true
---

IE에서 새창으로 열어 window 객체에 바인딩된 메서드 호출시, 호출후에 해당 메서드에서 사용했던 object 접근시,

`object permission denied`

에러가 발생하는 이슈가 있다.

결론 = IE에서 새창으로 데이터 주고받아야 하는경우

`postMessage`를 사용해야 한다.

# 주의할 점
message 이벤트 리스너를 등록할때 꼭, 필요한 이벤트만 받을 수 있도록
event.origin을 체크하도록 한다.
event.data를 통해 trigger 된 데이터를 받을 수 있다.

이벤트를 송출할때, target에 `'*'`을 넣지 않도록 한다.
왜냐하면 모든 창이 해당 메시지를 다 받을 수 있기 때문에 보안 이슈가있을 수 있다.