---
title: ๐ Bitwise AND of Numbers Range
date: 2020-04-25 23:04:74
category: algorithm
thumbnail: './images/bitwise-and-of-numbers-range.jpg'
draft: true
---

๋์ ๋๋ฌด ๋ง์ด ๋ฐ๋ ค๋ฒ๋ ธ๋ค ๐ ๋ฐ๋ ธ๋ [๋ฌธ์ ](https://leetcode.com/problems/bitwise-and-of-numbers-range/)๋ถํฐ ํ๋์ฉ ์ด๋ฒ๋ฌ ๋๋๊ธฐ์ ์ ๋คํ๊ธฐ ๋์ ํ๋ค. ์ค ์ด ๋ฌธ์ ๋ ํ์๋๋ฐ ๋์ด๋ medium ์ด์์!

![bitwise-and-of-numbers-range](./images/bitwise-and-of-numbers-range.jpg)

# ๋ฌธ์  ์์ฝ
m๋ถํฐ n๊น์ง ๋นํธ์ฐ์ฐํ ๊ฒฐ๊ณผ ์ถ๋ ฅ

# ๋ฌธ์  ํด๊ฒฐ
๋, Brute Force๋ก ๋ฌธ์ ๋ฅผ ํด๊ฒฐใใใใใ ์ด์ ๋๋ฉด ๋ฏธ๋์์ด ๋์ด๋๊ฐ ๋ง๋ ์ถ๋ค;;;
์ ๋ง๋ก m๋ถํฐ n๊ฐ์ง ๋คํด๋ดค๋ค. ๊ทผ๋ฐ ๋ค๋ง 0์ผ ๊ฒฝ์ฐ ๋นํธ์ฐ์ฐ์ ๊ณ์ ํ  ํ์๊ฐ ์๊ธฐ๋๋ฌธ์ ๊ทธ๋ง ํ๋๋กํ๋ค.
## code
  * ์๊ฐ ๋ณต์ก๋: O(N)
  * ๊ณต๊ฐ ๋ณต์ก๋: O(1)
  
```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var rangeBitwiseAnd = function(m, n) {
    let result = m;
    for(let i=m+1; i<=n; i++) {
        result &= i;
        if(result===0) break;
    }
    return result
};
```
