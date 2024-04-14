---
title: 모달 구현시 고려해야할 접근성
date: '2022-03-30 00:00:00'
author: soobing
tags: a11y modal aria-hidden
categories: a11y
draft: true
---

* 모달 레이어에 `role="dialog"` 속성 선언
* 레이어를 제외한 뒤에 보이는 영역(dimmed 된 영역) `aria-hidden="true"`
  - `aria-hidden="true"`로 설정한 영역에 모달이 children으로 들어가서는 안됨.
  - 다른 이유들도 있지만, dialog는 body 태그 밑으로 append 시키는 것이 좋은 이유중에 하나.
* 모달이 닫히고 초점이 어디로 이동해야 하는가?
* `aria-labeledby` 와 `id` 연결 
* `aria-hidden` 값이랑 open 값이랑 연결
# 참고
- https://web.dev/hiding-and-updating-content/
- `aria-hidden="true"`로 설정한 영역에 모달이 children으로 들어가서는 안됨.
