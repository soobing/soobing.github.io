---
title: ๐โโ๏ธ Counting Elements
date: 2020-04-07 23:04:76
category: algorithm
thumbnail: './images/counting-elements.jpg'
draft: true
---


์ค๋์ ๋๋ฒ์งธ ๋ฌธ์  ๐์ ์ ํผ anagrams ๋ฌธ์  ๋๋ถ์ ์ด [๋ฌธ์ ](https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/528/week-1/3289/)๋ ์กฐ๊ธ ๋ ์ฝ๊ฒ ํ ์ ์์๋ค.

![counting-elements](./images/counting-elements.jpg)

# ๋ฌธ์  ์์ฝ
๋ฌธ์ ๋ ๊ต์ฅํ ์ฌํํ๋ค. ์๊ธฐ ์์  + 1์ธ ์์ ๊ฐฏ์๋ฅผ ์ธ๋ ๋ฌธ์ ๋ค.

# ๋ฌธ์  ํด๊ฒฐ
anagram์์ ์ฒ๋ผ ๋ฐฐ์ด์ ๋ชจ๋  element๋ฅผ ์ํํ๋ฉด์ map์ ์ ์ฅํ๋๋ฐ, ํด๋น ๊ฐ์ ํค๊ฐ์ผ๋ก ํ๊ณ  value๋ก true๋ฅผ ์ฃผ๋๋ก ํ๋ค. ๊ทธ๋ฌ๊ณ  ๋ค์ ์ํ๋ฅผ ํ๋ฉด์ ์๊ธฐ ์์ ๋ณด๋ค ํ๋ ๋ ํฐ์๊ฐ map์ ์ ์ฅ๋์๋์ง ํ์ธํ๊ณ  counting์ ํ๋๋ก ํ๋ค.

## 1) Categorize by element
  * ์๊ฐ ๋ณต์ก๋ O(n)
  * ๊ณต๊ฐ ๋ณต์ก๋ O(n)
  ์ผ๋ก ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๋ค.
```js
/**
 * @param {number[]} arr
 * @return {number}
 */
var countElements = function(arr) {
    const map = new Map();
    for (let num of arr) {
        map.set(num, true);
    }
    let cnt = 0;
    for (let num of arr) {
        if (map.get(num+1)) {
           cnt++;
        }
    }
    return cnt;
};
```