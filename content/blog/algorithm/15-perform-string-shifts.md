---
title: 👣 Perform String Shifts
date: 2020-04-14 23:04:73
category: algorithm
thumbnail: { thumbnailSrc }
draft: false
---

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
