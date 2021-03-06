---
title: ๐Reverse String
date: 2020-04-02 23:04:39
category: algorithm
thumbnail: './images/reverse-string.jpg'
draft: true
---

์์ง ํํ๐ฅ Day1์ ๋๋ฒ์งธ ๋ฌธ์ ๋ฅผ ํด์ด๋ณด์! [Reverse String](https://leetcode.com/explore/learn/card/recursion-i/250/principle-of-recursion/1440/) ์ด๋ค.

![single number](./images/reverse-string.jpg)

# ๋ฌธ์  ์์ฝ
string array๋ฅผ ๋ค์ง์ด๋ณด์.
์๊ฐ๋ณต์ก๋๋ ๋ฐ๋ก ๋ช์๋์ด ์์ง ์๊ณ , ๊ณต๊ฐ ๋ณต์ก๋๋ O(1)๋ผ๊ณ  ๋์ด์๋ค. ์ถ๊ฐ์ ์ผ๋ก ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํ ๋นํ์ง ๋ง๊ณ  ๋ฌธ์ ๋ฅผ ํด๊ฒฐํด์ผ ํ๋ค.

# ๋ฌธ์  ํด๊ฒฐ
์ด ๋ฌธ์ ๋ two pointer๊ด๋ จ ๋ฌธ์ ์ธ๋ฐ ใใ ๋๋ JS๋ก ํธ๋๊น ํ์ค๋ก ๋๋ฌ๋ค. ๋ฃฐ๋ฃจ๋๋ผ~ ํ๋ฉด์ ๋ฌธ์  ํด๊ฒฐ์ ๋ฑ ์ผฐ๋๋ฐ ํด์ค์ง ์ฒซ ์์๊ธ์ด ๋๋ฌด ์๊ฒผ๋ค. 
LIFE IS SHORT ใใใ
  ![life is short](./images/reverse-string-2.jpg)

์ด์จ๋  ์ด ๋ฌธ์ ์ ํต์ฌ์ two pointer์ด๊ณ , ์ถ์  ์๋์ ๋ง๊ฒ ๋ค์ ํ์ด๋ณด์๋ค.

## 1) ๋ด์ฅ ํจ์ ์ด์ฉ
```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    return s.reverse();
};
```
## 2) Recursion์ ์ด์ฉํ two pointer 
  - ์๊ฐ ๋ณต์ก๋: O(n)
  - ๊ณต๊ฐ ๋ณต์ก๋: O(1)
  ```js
  /**
    * @param {character[]} s
    * @return {void} Do not return anything, modify s in-place instead.
  */
  var helper = (s, left, right) => {
      if(left < right) {
          const s_right_temp = s[right];
          s[right] = s[left];
          s[left] = s_right_temp;
              helper(s, left + 1, right - 1)
      } else {
          return
      }
  }
  var reverseString = function(s) {
      helper(s, 0, s.length-1)
      return s;
  };
  ```

## 3) Iteration์ ์ด์ฉํ two pointer 
  - ์๊ฐ ๋ณต์ก๋: O(n)
  - ๊ณต๊ฐ ๋ณต์ก๋: O(1)

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let left = 0, right = s.length - 1;
    while (left < right) {
        let tmp = s[left];
        s[left++] = s[right];
        s[right--] = tmp;
    }
    return s;
};
```
