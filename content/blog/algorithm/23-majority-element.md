---
title: ๐majority element
date: 2020-05-07 14:05:56
category: algorithm
thumbnail: './images/majority-element.jpg'
draft: true
---
5์์ ๋ ์จ๋ฐ๋ผ ํ์์ด ํ์ด์ง๋๊ตฌ๋~~

์ค๋์ [๋ฌธ์ ](https://leetcode.com/problems/majority-element/)๋ n/2์ด์ ๋์จ ์๋ฅผ ์ฐพ๋ ๋ฌธ์ .
easyํด easyํด ๋๋ฌด๋๋ฌด ์ฌ์์~

# ๋ฌธ์  ์์ฝ
n/2์ด์ ๋์จ ์๋ฅผ ์ฐพ๊ธฐ(n/2์ด์ ๋์ค๋ ์๋ ํญ์ ์์)

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    let obj = {};
    for(num of nums) {
        obj[num] = obj[num] ? obj[num] + 1 : 1;
    }
    for (const key in obj) {
        if(obj[key] > nums.length/2) return key
    }
};
```

# ๋ฐฐ์ด ๊ฒ
  * `for...in`์์ ์ํํ  ๋๋ key๊ฐ์ผ๋ก ์ํํ๋ค. 
  * value๊ฐ ๊ถ๊ธํ๋ฉด `object[key]`๋ก ์ ๊ทผํด์ ์ป์ด๋ธ๋ค.

