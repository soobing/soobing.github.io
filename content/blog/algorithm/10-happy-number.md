---
title: ๐ Happy Number
date: 2020-04-08 00:04:49
category: algorithm
thumbnail: './images/happy-number.jpg'
draft: true
---


์ค๋์ ๋ง์ง๋ง ๋ฌธ์ ํ์ด๐ ์ด๊ฒ์ happy number์ ๋ํ ์ง์์ด ์์ผ๋ฉด ์ข ๋ ํ๊ธฐ ์ฌ์ ์ [๋ฌธ์ ](https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/528/week-1/3284/)์ด๋ค.

![happy-number](./images/happy-number.jpg)

# ๋ฌธ์  ์์ฝ
happy number์ด๋ฉด true ์๋๋ฉด false๋ฅผ ๋ฐํํด๋ผ!
๊ทธ๋ ๋ค๋ฉด happy number๋ ๋ฌด์์ธ๊ฐ? happy number๋ ์ซ์๋ฅผ ๋ชจ๋ ์ชผ๊ฐ์ ์ ๊ณฑํ๊ณ  ๊ทธ ๊ฒฐ๊ณผ๋ค์ ๋ํ๋ ๊ฒ์ ๋ฐ๋ณตํ์ ๋, 1์ด ๋๋ ์ซ์๋ฅผ ๋งํ๋ค. 


# ๋ฌธ์  ํด๊ฒฐ
happy number๋ฅผ ์๋ฉด ๋ฌธ์ ๋ฅผ ํ๊ธฐ ์ฌ์์ง๋ค. 
happy number๊ฐ ๋  ์ ์๋ ์ซ์๋ฅผ ์์๋ด์ผ ๋ฌดํ๋ฃจํ์ ๋ช์ ๋น ์ง์ง ์๋๋ฐ,
happy number๊ฐ ๋  ์ ์๋ ์ซ์๊ฐ ์๋๋ฐ ๋ฐ๋ก 4์ด๋ค. 4๋ ๊ณ์ ๋๊ณ ๋์ ๋ 4๊ฐ๋์ด ๋ฌดํ๋ฃจํ๋ฅผ ๋๊ฒ ๋๋ค.
์๋ ๊ทธ๋ฆผ์ ๋ณด๋ฉด ์ดํดํ๊ธฐ ์ฝ๋ค. happy number๊ฐ ์๋ ์๋ค์ ์ฌ๋ฌ๊ฐ ์์ง๋ง ๊ฒฐ๊ตญ 4๊ฐ ์ ์ผ ์์ ์ซ์๊ณ  4๋ก ๊ท๊ฒฐ๋๋ค.
![happy-number](./images/happy-number-2.jpg)

## 1) Recursion
๊ทธ๋์ ๋๋ ์ฌ๊ท๋ฅผ ์ด์ฉํ์ฌ ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ์๋ค.
```js
/**
 * @param {number} n
 * @return {boolean}
 */

var isHappy = function(n) {
    const arr = String(n).split('').map(n => n*n);
    const sum = arr.reduce((a, b) => a+b);
    let result = false;
    if(sum === 1) {
        return true;
    } else if(sum === 4) {
        return false
    } else {
        result = isHappy(sum);
    }
    return result;
};

```