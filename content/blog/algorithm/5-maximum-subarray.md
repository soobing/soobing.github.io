---
title: ๐ Maximum Subway
date: 2020-04-04 14:04:57
category: algorithm
thumbnail: './images/maximum-subway.jpg'
draft: true
---


์์ง๊ฐ ๋๋ฌด ํํ๐ฅ leetcode์ 30Day Challenge [๋ฌธ์ ](https://leetcode.com/explore/featured/card/30-day-leetcoding-challenge/528/week-1/3285/)๋ฅผ ํ์ด๋ด์๋ค. 

![maximum-subway](./images/maximum-subway.jpg)

# ๋ฌธ์  ์์ฝ
๊ฐ์ฅ ํฉ์ด ํฐ ๋ถ๋ถ์งํฉ ๊ตฌํ๊ธฐ

# ๋ฌธ์  ํด๊ฒฐ
์ด ๋ฌธ์ ๋ ๋ค์ด๋๋ฏน ํ๋ก๊ทธ๋๋ฐ์ผ๋ก ์ค๋ฅธ์ชฝ ๋ถํฐ ๋ชจ๋  ๊ฒฝ์ฐ์ ์๋ฅผ ๊ตฌํด๋ณด๋ฉด ๋ฌธ์  ํ์ด๊ฐ ์ฌ์์ง๋๋ค.
๋ชจ๋  ๊ฒฝ์ฐ์ ์๋ฅผ ์ฐพ์ผ๋ฉด ๋ค์๊ณผ ๊ฐ๊ณ ,
![maximum-subway-1](./images/maximum-subway-1.png)

๋ฉ๋ชจ์ด์ ์ด์์ ์ฌ์ฉํ๋ฉด ๋ชจ๋  ๊ฒฝ์ฐ์ ์๋ฅผ ๋ค์๊ณผ ๊ฐ์ด ๊ตฌํ  ์ ์์ต๋๋ค.
![maximum-subway-2](./images/maximum-subway-2.png)

ํญ์ ๋ชจ๋  ๊ฐ์ ์ ์ฅํ๊ณ  ์์ ํ์๋ ์๊ณ , ํ์ฌ ๊ฐ, ์ง๋ ๊ฐ์์ ์ต๋๊ฐ, ์ฌํ๊ป ๊ฐ์ฅ ์ต๋๊ฐ(์ ๋ต)์ ๊ฐ์ง๊ณ  ๋น๊ต๋ฅผ ํ๋ฉด ๋ฉ๋๋ค.
๊ทธ๋ฆผ์ ์ฐธ๊ณ ํ์๊ณ  ์ ๊ฐ ํ์ดํ ์ฝ๋๋ฅผ ๋ณด์๋ฉด ๋ ์ฝ๊ฒ ์ดํดํ  ์ ์์ต๋๋ค.
![maximum-subway-3](./images/maximum-subway-3.png)

## 1) DP
```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let maxNum = nums[nums.length-1]; // ๋ง์ง๋ง ๊ฐ์ผ๋ก ์ด๊ธฐํ
    let sumNum = nums[nums.length-1]; // ๋ง์ง๋ง ๊ฐ์ผ๋ก ์ด๊ธฐํ
    if(nums.length == 1) return maxNum;
    for(let i=nums.length-2; i>=0; i--) {
        const curNum = nums[i]
        sumNum = Math.max(curNum + nums[i+1], curNum + sumNum);
        maxNum = Math.max(curNum, sumNum, maxNum);
        console.log(curNum, sumNum, maxNum)
    }
    return maxNum;
};
```