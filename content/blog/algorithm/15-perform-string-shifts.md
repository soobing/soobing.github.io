---
title: ๐ฃ Perform String Shifts
date: 2020-04-14 23:04:73
category: algorithm
thumbnail: './images/perform-string-shifts.jpg'
draft: true
---

๋ฒ์จ Day14!! ๋จ์ =_= ์ค๋ [๋ฌธ์ ](https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/529/week-2/3299/)๋ easy ๋ฌธ์ ์ผ๊ฒ ๊ฐ์๋ฐ, ๊ฒ์ํด๋ ๋์ค์ง์๊ณ  day30์๋ง ์กด์ฌํ๋ ๋ฌธ์ ์ด๋ค.

![perform-string-shifts](./images/perform-string-shifts.jpg)

# ๋ฌธ์  ์์ฝ
0์ด ๋ค์ด์ค๋ฉด ์ผ์ชฝ์ผ๋ก shift(์ฌ์ค์ index๋ 1 ์ฆ๊ฐ), 1์ด ๋ค์ด์ค๋ฉด ์ค๋ฅธ์ชฝ์ผ๋ก shift(์ฌ์ค์ index๋ 1๊ฐ์)ํ์ฌ ์ต์ข string์ ๊ตฌํ๋ ๊ฒ.


# ๋ฌธ์  ํด๊ฒฐ
์ค์ ๋ก shift ์ํค๋ ์์์ ๊ตณ์ด ํ์์๋ค๊ณ  ์๊ฐ์ด ๋ค์๊ณ , ์ธ๋ฑ์ค๋ฅผ ์ ์ฅํ๋ ํฌ์ธํฐ๋ฅผ ๋ฌ์ ์๋ฎฌ๋ ์ด์์ ๋๋ฆฌ๋๋กํ๋ค.
๊ทธ๋์ ๋์จ ๊ฒฐ๊ณผ์ ํฌ์ธํฐ๋ก ํด๋น ์ธ๋ฑ์ค๋ถํฐ ~ ๋๊น์ง, 0๋ถํฐ ~ ํด๋น ์ธ๋ฑ์ค -1 ๊น์ง ์ถ๋ ฅํ๋๋ก ํ๋ค.

## 1) Pointer Simulation
  * ์๊ฐ ๋ณต์ก๋: O(N)
  * ๊ณต๊ฐ ๋ณต์ก๋: O(N)

```js
/**
 * @param {string} s
 * @param {number[][]} shift
 * @return {string}
 */
var stringShift = function(s, shift) {
    let startPtr = 0;
    let result = '';
    for(let i=0; i<shift.length; i++) {
        const isLeft = shift[i][0] === 0 ? true : false;
        const cnt = shift[i][1];
        for(let j=0; j<cnt; j++) {
            if(isLeft) {
                startPtr = startPtr + 1 >  s.length - 1 ? 0 : startPtr + 1;
            } else {
                startPtr = startPtr - 1 < 0 ? s.length - 1 : startPtr - 1;
            }
        }
    }
    for(let i=startPtr; i<s.length; i++) {
        result += s[i];
    }
    for(let i=0; i<startPtr; i++) {
        result += s[i];
    }
    return result;
};
```
