---
title: ๐ฅSubarray Sum Equals K
date: 2020-04-22 23:04:18
category: algorithm
thumbnail: './images/subarray-sum-equals-k.jpg'
draft: true
---

์ค๋์ [๋ฌธ์ ](https://leetcode.com/problems/subarray-sum-equals-k/) ๋ํ ๋๋ฌด ํ๊ธฐ ์ซ์์ง๋ง ์ค์ค๋ก ํด๊ฒฐํ๋ค. ๋์๋๋ medium ์ด์๋ค :) ์ค๋ ฅ์ด ๋๊ธด ๋์๋๋ด

![subarray-sum-equals-k](./images/subarray-sum-equals-k.jpg)

# ๋ฌธ์  ์์ฝ
๋ํด์ k๊ฐ ๋๋ ๋ชจ๋  ๋ถ๋ถ์งํฉ ๊ตฌํ๊ธฐ ๋ฌธ์ 

# ๋ฌธ์  ํด๊ฒฐ
Brute Force๋ก ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๋๋ฐ, ์ ค ์ฌ์ด๋ฐฉ๋ฒ์ผ๋ก ํด๊ฒฐํ ๊ฒ์ด๊ณ  Hashmap์ ์ฌ์ฉํด์๋ ์๊ฐ๋ณต์ก๋๋ฅผ ์ด๋ง๋ฌด์งํ๊ฒ ์ค์ผ ์ ์์๋ค.

## code
  * ์๊ฐ ๋ณต์ก๋: O(N^3)
  * ๊ณต๊ฐ ๋ณต์ก๋: O(1)
  
```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    let sums = Array.from(nums);
    let cnt = 0;
    for(let i=1; i<nums.length; i++) {
        sums[i] += sums[i-1];
    }
    console.log(sums)
    for(let i=nums.length-1; i>=0; i--) {
        if(sums[i] === k) cnt++;
        for(let j=i-1; j>=0; j--) {
            if(k === (sums[i]-sums[j]))  {
                cnt++;
            }
        }
    }
    return cnt;
};
```
