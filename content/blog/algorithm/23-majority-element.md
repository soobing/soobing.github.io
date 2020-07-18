---
title: 👛majority element
date: 2020-05-07 14:05:56
category: algorithm
thumbnail: './images/majority-element.jpg'
draft: true
---
5월은 날씨따라 한없이 풀어지는구나~~

오늘의 [문제](https://leetcode.com/problems/majority-element/)는 n/2이상 나온 수를 찾는 문제.
easy해 easy해 너무너무 쉬워요~

# 문제 요약
n/2이상 나온 수를 찾기(n/2이상 나오는 수는 항상 있음)

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

# 배운 것
  * `for...in`에서 순회할 때는 key값으로 순회한다. 
  * value가 궁금하면 `object[key]`로 접근해서 얻어낸다.

