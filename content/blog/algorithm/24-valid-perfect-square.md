---
title: Valid Perfect Square
date: 2020-05-09 16:05:77
category: algorithm
thumbnail: './images/valid-perfect-squre.jpg'
draft: false
---

내가 가끔가다가 푸는 문제들이 너무 쉬워서 포스팅하기가 민망하다;; ㅋㅋ

첫 출근을 앞두고있어서 조금 풀어지기도하고 좀 내 생활의 루틴을 정하기가 쉽지가 않은데,
다음주 부터는 어떤식으로 알고리즘을 쉬지않고 풀어나갈지 좀 고민을 해보아야 겠다.

오늘의 [문제](https://leetcode.com/problems/valid-perfect-square/)는 루트를 씌웠을때 정수인지를 판단하는 문제이다. 오늘 또한 너무너무 easy해 easy해~

# 문제 요약
루트를 씌웠을때 정수인지 여부를 반환

```js
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
      return Number.isInteger(Math.sqrt([num]));
};
```

# 배운 것
  * JS의 Number는 기본적으로 부동소수점을 사용하고있어서 정수의 개념이 없는데, 정수인지 판단을 하려면  `Number.isInteger(숫자)`를 사용하면 된다.
  * 루트를 씌울려면 `Math.sqrt([숫자])`를 사용하면 된다.

