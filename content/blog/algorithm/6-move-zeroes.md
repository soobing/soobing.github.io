---
title: ๐โโ๏ธMove Zeroes
date: 2020-04-05 22:04:68
category: algorithm
thumbnail: './images/move-zero.jpg'
draft: true
---


์ ๋งค์ผ๋งค์ผ ์๊ณ ๋ฆฌ์ฆ์ ๊ณ์ํด์ ์ค์ฒํ๊ณ  ์์ต๋๋ค.๐ฅ leetcode์ 30Day Challenge [๋ฌธ์ ](https://leetcode.com/explore/challenge/card/30-day-leetcoding-challenge/528/week-1/3286/)๋ฅผ ํ์ด๋ด์๋ค. 

![move-zero](./images/move-zero.jpg)

# ๋ฌธ์  ์์ฝ
0์ ๋งจ๋ค๋ก ์ฎ๊ธฐ๊ธฐ. ๋จ, ๊ณต๊ฐ ๋ณต์ก๋๋ O(1)์ผ๋ก ์ ์งํ๊ณ , operation์ ์ต๋๋ก ์ค์ด๋ผ๊ณ  ๋์ด์๋ค.

# ๋ฌธ์  ํด๊ฒฐ
๋ฌธ์ ๋ ํด๊ฒฐํ๋๋ฐ ๊ณต๊ฐ ๋ณต์ก๋ O(1), ์๊ฐ ๋ณต์ก๋ O(n^2)์ผ๋ก ํด๊ฒฐํ๋ค. O(n)์ผ๋ก ํด๊ฒฐํ  ์ ์๋ ๋ฐฉ๋ฒ๋ค์ด ์๋ฃจ์์ ์์๋๋ฐ ํด๋น ๋ฐฉ๋ฒ๋ค๋ ๋ค์ ๊ฒํ  ํด ๋ณผ ํ์๊ฐ ์๋ค.

## 1) two pointer ์ด์ฉ
```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    for(let i=0; i<nums.length; i++) {
        let zeroIdx = -1;
        let nonZeroIdx = -1;
       for(let j=i; j<nums.length; j++) {
           if(nums[j] === 0) {
               zeroIdx = j;
               break;
           }
       }
        for(let j=i; j<nums.length; j++) {
           if(nums[j] !== 0) {
               nonZeroIdx = j;
               break;
           }
       }
        if(zeroIdx >= 0 && nonZeroIdx >= 0 && zeroIdx < nonZeroIdx) {
            const zero = nums[zeroIdx];
            nums[zeroIdx] = nums[nonZeroIdx];
            nums[nonZeroIdx] = zero;
        }
    }
    return nums;
};
```