---
title: ๐ณ LRU Cache
date: 2020-04-28 19:04:70
category: algorithm
thumbnail: './images/lru-cache.jpg'
draft: true
---

๋ฐ๋ ธ๋๊ฑฐ ๋คํ๋ผ๋๊น ๋ง์์ด ์๋ฐ๋ผ์ค์ ์ฝ์ง๊ฐ ์๋ค ๐. 
์ด์ ์ ๋๋ฒ์งธ [๋ฌธ์ ](https://leetcode.com/problems/lru-cache/)๋ [Least Recently Used (LRU) cache](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU) ๋ฌธ์ ์๋ค. ์ด๋์ ๋ง์ด ๋ดค๋ค~ ์ถ์๋๋ฐ ์ด์์ฒด์ ์์ ๋ฐฐ์ ์๋ค ใใใ ์ด์ฒด ใใ ์งฑ์ซ์ดํ์๋ค... ์ง๊ธ์ฒ๋ผ ๊ณต๋ถํ์ผ๋ฉด ์ฐธ ์ข์์ํ๋ฐ!๋ ๊ฐ๋ถ ์์ฌ์์ด ๋จ๋ ๋ฌธ์ .

![lru-cache](./images/lru-cache.jpg)

# ๋ฌธ์  ์์ฝ
Least Recently Used(LRU) ์๊ณ ๋ฆฌ์ฆ์ ๊ตฌํํ๋ ๋ฌธ์ 
๊ทผ๋ฐ!!! ๐ LRU๊ฐ ๋ญ์ง ์์์ผ ๋ฌธ์ ๋ฅผ ํ์ง;;;

๊ทธ๋์ ์ด๊ฒ์ ๊ฒ ์ ํฌ๋ธ์ ์ฐพ์๋ดค๋๋ฐ [์ด ์์](https://www.youtube.com/watch?v=S6IfqDXWa10)์ด ๋์์ด ๋ง์ด ๋์๋ค.
์์ ๋ฅผ ์ ๋ณด๋ฉด `put`๊ณผ `get`์ด ๋์จ๋ค. ๊ฐ๋จํ ์์ฝํ๋ฉด `put`์ ๋ฉ๋ชจ๋ฆฌ์ ํ ๋นํ๋ ๊ฒ์ด๊ณ , `get`์ ์ด๋ฏธ ๋ฉ๋ชจ๋ฆฌ์ ํ ๋น๋์๋ ๊ฐ์ ๋ฐํํ๋ ๊ฒ์ด๋ค.
์กฐ๊ธ ๋ ์์ธํ ์ด๋ป๊ฒ ๊ตฌํํ ์ง ์์๋ณด์. 

## 0. ์๋ฃ๊ตฌ์กฐ๋? queue

queue๋ฅผ ์ฌ์ฉํด์ ๊ตฌํํ๋ฉด ์ฝ๋ค.
![queue](./images/lru-cache-3.png)

## 1. put

`put`์ ํ  ๋, ์ด๋ฏธ ๋ฉ๋ชจ๋ฆฌ๊ฐ ๊ฝ ์ฐจ์๋ ๊ฒฝ์ฐ์๋ ๊ฐ์ฅ ์ต๊ทผ์ ์ฌ์ฉ์ํ๋ ๋ถ๋ถ์ ์ ๊ฑฐํ๊ณ  ์๋ก์ด ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํ ๋นํ๋ ๊ฒ์ด๋ค. ๊ทผ๋ฐ ์๋ก์ด ๋ฉ๋ชจ๋ฆฌ๋ฅผ ํ ๋นํ๋ค๋ ๊ฒ์ ๊ฐ์ฅ ์ต๊ทผ์ ์ฌ์ฉํ ์๋ฏธ๊ฐ ์๋๊ฐ? ๊ทธ๋์ ๊ฐ์ฅ ์์ชฝ์ผ๋ก ์์นํด์ฃผ๋ ์์์ ํจ๊ป ํด์ฃผ์ด์ผํ๋ค.
![put](./images/lru-cache-4.png)

## 2. get
`get`์ ๊ฒฝ์ฐ์๋ ์ฐพ์ผ๋ ค๊ณ ํ๋ key์ value๋ฅผ ๋ฆฌํดํด์ฃผ๋ฉด ๋๊ณ , ๋ง์ฝ ์ฐพ์ผ๋ ค๋ key๊ฐ์ด ์๋ ๊ฒฝ์ฐ์๋ -1์ ๋ฆฌํดํด์ค๋ค. ์ฌ๊ธฐ์ ์ฐพ์ผ๋ คํ๋ ๊ฐ์ด ์์์ผ๋ฉด ๊ทธ ๊ฐ์ ์ฝ๋ ์์์ ํด๋น ๋ฉ๋ชจ๋ฆฌ๊ฐ ์ฌ์ฉ๋๊ฑฐ๋๊น ์์ชฝ์ผ๋ก ์์นํด์ฃผ๋ ์์์ ํด์ค์ผํ๋ค.

![get](./images/lru-cache-5.png)

## ์์  ์ดํดํ๊ธฐ
๊ทธ๋์ ์์ ๋ฅผ ์ดํดํ๋ฉด ๋ค์๊ณผ ๊ฐ๋ค.
![์์ ๋ฅผ ๋์ผ๋ก ์ ๋ฆฌ](./images/lru-cache-2.png)

# ๋ฌธ์  ํด๊ฒฐ
์์ฑ์์์ ํธ์ถ๋ ๋ ์ฉ๋์ด ์ผ๋ง์ธ์ง๋ฅผ `this.capacity`์ ์ ์ฅํ๊ณ  `this.keys`์ ๋ฐ์ดํฐ๋ค์ ์ ์ฅํ๋๋ก ํ๋ค.

## code
```js
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.keys = [];
    this.capacity = capacity;
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    for(let i=0; i<this.keys.length; i++) {
        if(key === this.keys[i].key) {
            const tmp = this.keys[i];
            this.keys.splice(i, 1);
            this.keys.push(tmp);
            return tmp.value;
        }
    }
    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    for(let i=0; i<this.keys.length; i++) {
        if(key === this.keys[i].key) {
            this.keys.splice(i, 1);
            this.keys.push({
                key: key,
                value: value
            });
            return;
        }
    }
    
    this.keys.push({key: key, value: value});
    if(this.keys.length > this.capacity) {
        this.keys.shift();
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
```
