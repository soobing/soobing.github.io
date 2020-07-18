---
title: 🌹Number Complement
date: 2020-05-04 23:05:75
category: algorithm
thumbnail: './images/number-complement.jpg'
draft: true
---
5월 챌린지가 벌써 시작하고 있었다... ㄷㄷ 벌써 3개를 놓쳤는데, 지난번과는 다르게 다시풀순 있지만 지난 문제를 푸는건 카운팅 되지 않는것 같다. 

어쨌든 오늘의 [문제](https://leetcode.com/problems/number-complement/)는 2진수로 바꿔서 반전시키는 문제였는데, 쉬웠다(왜냐면 stackoverflow 찾아봤으니까). 

# 문제 요약
`10진수 -> 2진수 -> 반전(invert) -> 10진수`로 바꾸는 문제

```js
/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    var flipbits = function (v, digits) {
        return ~v & (Math.pow(2, digits) - 1);
    }
    return flipbits(num, num.toString(2).length)
};
```

# 배운 것
  * 10진수를 2진수로 바꿀땐 `(num).toString(2)`를 하면 된다.
  * flipbits 하는 방법은 `~v & (Math.pow(2, digits) - 1)`(v:10진수, digits:2진수 자리수) 걍 외워버리자;;