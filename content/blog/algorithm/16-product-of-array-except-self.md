---
title: ๐ผProduct of Array Except Self
date: 2020-04-16 23:04:20
category: algorithm
thumbnail: './images/product-of-array-except-self.jpg'
draft: true
---


๋ฒ์จ Day15!! ํคํค ๊ทธ๋๋ ์ด์  ๋ฆฟ์ฝ๋๋ ๋ชปํ์์ง๋ง ์๊ณ ๋ฆฌ์ฆ ๋ฌธ์  3๊ฐ๋ ํ์๋ค ใใ ์ผ๋  ๋ฐ๋ฆฐ๊ฑฐ ํ์ด์ผ์ง~~ ์ค๋์ [๋ฌธ์ ](https://leetcode.com/problems/product-of-array-except-self/)๋ easy ๋ฌธ์ ์ผ๊ฒ ๊ฐ์๋๋ฐ, medium!! ๊ทผ๋ฐ ์ฌ์ง์ด ํ์๋ฐ!! ๋๋์ด ์ค๋ ฅ์ด ์กฐ๊ธ ๋๋๊ฑด๊ฐ??

![product-of-array-except-self](./images/product-of-array-except-self.jpg)

# ๋ฌธ์  ์์ฝ
์๊ธฐ ์์ ์ index ๋นผ๊ณ  ๋๋จธ์ง๋ฅผ ๋ค ๊ณฑํ๋ ๋ฌธ์ 

# ๋ฌธ์  ํด๊ฒฐ
๋ค ๊ณฑํ ๊ฐ์ ๋๊ฐ๋ค. ํญ์. ๊ทธ๋์ ๋จผ์  ๊ณฑํด๋๊ณ  ์๊ธฐ์์ ์ `divide(๋๋๊ธฐ)` ํ๋ ๋ฐฉ์์ผ๋ก ๋ฌธ์ ๋ฅผ ํ์๋ค.
๋ค๋ง 0์ด๋ ๋์ด ๊ณจ์น๊ฐ ์ํ๋ฐ, 0์ ๊ฐฏ์์ ์๊ธฐ์์ ์ด 0์ธ์ง์ ๋ฐ๋ผ์ ๋ถ๊ธฐ์ฒ๋ฆฌ๋ฅผ ์ข ํด์คฌ๋ค.

์๋ฃจ์์ ๋ดค๋๋ฐ ๋ฌด์จ๋ง์ธ์ง ๋ชจ๋ฅด๊ฒ ์ด์ ๊ป๋ค.

## 1) Multiply all items and divide only self
  * ์๊ฐ ๋ณต์ก๋: O(N) ? ์ด๋ผ๊ณ  ํด์ผํ๋?
  * ๊ณต๊ฐ ๋ณต์ก๋: O(1)
  
```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function(nums) {
    const totalMultiply = nums.reduce((a, b) => a*b);
    const filtered = nums.filter(item => item !== 0);
    const filteredMultiply = filtered.length === 0 ? 0 : filtered.reduce((a, b) => a*b, 1);;
    const result = [];
    for(let i=0; i<nums.length; i++) {
        if(totalMultiply === 0 && nums[i] === 0) {
            result.push(nums.length - filtered.length > 1 ? 0 : filteredMultiply);
        } else if(totalMultiply === 0 && nums[i] !== 0) {
            result.push(0);
        } else {
            result.push(totalMultiply/nums[i]);
        }
    }
    return result;
};
```
