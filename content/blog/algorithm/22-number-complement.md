---
title: πΉNumber Complement
date: 2020-05-04 23:05:75
category: algorithm
thumbnail: './images/number-complement.jpg'
draft: true
---
5μ μ±λ¦°μ§κ° λ²μ¨ μμνκ³  μμλ€... γ·γ· λ²μ¨ 3κ°λ₯Ό λμ³€λλ°, μ§λλ²κ³Όλ λ€λ₯΄κ² λ€μνμ μμ§λ§ μ§λ λ¬Έμ λ₯Ό νΈλκ±΄ μΉ΄μ΄ν λμ§ μλκ² κ°λ€. 

μ΄μ¨λ  μ€λμ [λ¬Έμ ](https://leetcode.com/problems/number-complement/)λ 2μ§μλ‘ λ°κΏμ λ°μ μν€λ λ¬Έμ μλλ°, μ¬μ λ€(μλλ©΄ stackoverflow μ°Ύμλ΄€μΌλκΉ). 

# λ¬Έμ  μμ½
`10μ§μ -> 2μ§μ -> λ°μ (invert) -> 10μ§μ`λ‘ λ°κΎΈλ λ¬Έμ 

```js
/**
 * @param {number} num
 * @return {number}
 */
var findComplement = function(num) {
    var flipbits = function (v, digits) {
        return ~v & (Math.pow(2, digits) - 1);
    }
    return flipbits(num, num.toString(2).length)
};
```

# λ°°μ΄ κ²
  * 10μ§μλ₯Ό 2μ§μλ‘ λ°κΏλ `(num).toString(2)`λ₯Ό νλ©΄ λλ€.
  * flipbits νλ λ°©λ²μ `~v & (Math.pow(2, digits) - 1)`(v:10μ§μ, digits:2μ§μ μλ¦¬μ) κ± μΈμλ²λ¦¬μ;;