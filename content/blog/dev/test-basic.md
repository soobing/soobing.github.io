---
title: π¨ test μ½λ μλ¬ΈκΈ°
date: 2020-05-19 23:05:77
category: dev
thumbnail: './images/test.png'
draft: false
---

# κΈ μμ± κ³κΈ°
> νμ€νΈ μ½λ κ·Έκ² λ¨ΈμΌ??? π«
> μνλ κ³ μΌ???

μ΄λ κ² μκ°νλ κ°λ°μ μμκΊΌλ€ ππ»~~λμΈ λ―Έ~~

νμ€νΈ μ½λ μμ±μ λν΄μ 1λ λͺ¨λ₯΄λ μ¬λμ΄ μμ±νλ `νμ€νΈ μ½λ μλ¬ΈκΈ°`λΌκ³  μκ°νκ³  μ½μ΄μ£Όμλ©΄ κ°μ¬νκ² μ΅λλ€. π©π»βπ»(κΎΈλ²)

# νμ€νΈ μ½λ μ μμ±ν΄μΌνλκ°?
> Testing is about making sure that the code in your application does what you expect it to do, and keeps doing what you expect it to do when you make changes so you have a working product when youβre done.

νμ€νΈ μ½λλ₯Ό μμ±νλ μ΄μ λ <b>κ°λ°μκ° μλν λλ‘ μ½λκ° μλνλλ‘ λ³΄μ₯νκΈ° μν΄μ</b> μ΄λ€. μ²μ μ½λλ₯Ό μμ±νμλ λΏλ§ μλλΌ <b>μμ μ μμ±ν μ½λμ κ΄λ ¨λ λ¬΄μΈκ°λ₯Ό λ³κ²½νμλλ κ³μν΄μ κ°λ°μκ° μλνλλ‘ μλνλμ§ λ³΄μ¦νκΈ° μν΄μ μμ±</b>νλ€κ³  μκ°νλ©΄ λλ€.
μ¦, μ₯κΈ°μ μΌλ‘ μ μ§ λ° κ΄λ¦¬λ₯Ό μν΄μμ΄λ€.

μ κΉπΌ
λλ μ κ·Έλμ νμ€νΈ μ½λλ₯Ό μμ±ν  μΌμ΄ μμμκΉ? γγγγγ μ©..
λ­ μΌλ¨ μν΄μΌλλμ§ λͺ°λκ³  μ§μ§λ‘ νμ€νΈ μ½λλ₯Ό ν΅ν΄ μ§μμ μΌλ‘ μ μ§ λ° κ΄λ¦¬κ° μλλκ±΄μ§(?) μ λͺ°λμκΈ° λλ¬Έμ νμλ€μκ² μ₯μ μ μ΄νν  μκ° μμλ€.
κ·Όλ° μ§κΈ μκ°ν΄λ³΄λ©΄ μ§μ¦μ νμμ΄μΌ νλ€. 
μλλ©΄ μ΄λ€ λ£¨ν΄μ λ°λ³΅νμλλ©΄

* AλΆλΆ κΈ°λ₯ μΆκ° β QA β νμΈ μλ£!
* BλΆλΆ κΈ°λ₯ μΆκ° (A λΆλΆλ κ΄λ ¨μμ΄μ Aλ μ‘°κΈ μμ ) β QA (ν΄λΉ κΈ°λ₯ μμ£Όλ‘ νμ€νΈνλκΉ Bλ§ μ§μ€μ μΌλ‘ νμ€νΈ) β νμΈ μλ£!
* μ κ°μκΈ°?? A μμλμ Έ?? β λ²κ·Έλ°κ²¬ β μμ 

μ΄λ° μν©μ΄ νλκ°κ° μλλΌ λμ€μ κ°μλ‘ μ΄λ§μ΄λ§νκ² λ§μμ‘μλ€... μ΄λ° μν©μ μν΄μ νμ€νΈ μ½λλ₯Ό μ§λ κ²μ΄μλ€ γγγ

# μ©μ΄ μ λ¦¬
> unit, e2e... TDD, BDD.... 

## νμ€νΈ μ’λ₯
unit, integration, e2e λͺ¨λ μ­ν μ΄ λ€λ₯΄κΈ° λλ¬Έμ λ€μκ³Ό κ°μ΄ [testing-pyramidλ₯Ό μ νμ±](https://testing.googleblog.com/2015/04/just-say-no-to-more-end-to-end-tests.html)νλ κ²μ΄ μ€μνλ€κ³  νλ€.
![testing-pyramid](./images/testing-pyramid.png)
> Googleμ 70% λ¨μ νμ€νΈ, 20% ν΅ν© νμ€νΈ, 10% e2e νμ€νΈλ₯Ό μ μ

νμ€νΈ μ’λ₯μ λν λ΄μ©μ [ν΄λΉ κΈ](https://medium.com/@lawrey/unit-tests-ui-tests-integration-tests-end-to-end-tests-c0d98e0218a6)μμ κ΅μ₯ν μ μ€λͺν΄ μ£Όκ³  μλλ°, κ°μΈμ μΈ κ²¬ν΄λ‘λ E2E νμ€νΈμ Integration, UI νμ€νΈλ₯Ό ν¬ν¨ μν€λ κ²½μ°κ° λ§μ κ² κ°λ€.
### λ¨μ νμ€νΈ(Unit tests)
* λΆλ¦¬ λ μ½λμ κΈ°λ₯μ κ²μ¦ (μ£Όλ‘ ν΄λμ€λ ν¨μ λ¨μλ‘ μ€ν λ¨)
* λ€νΈμν¬ μ‘μΈμ€, λ°μ΄ν°λ² μ΄μ€ μ‘μΈμ€μ κ°μ μ’μμ±κ³Ό λΆλ¦¬λμ΄μΌ νλ€.

### ν΅ν© νμ€νΈ(Integration tests)
* λ€νΈμν¬ μ‘μΈμ€, λ°μ΄ν°λ² μ΄μ€ μ‘μΈμ€λ₯Ό ν΅ν΄ νΉμ  κΈ°λ₯μ μλμ λν νλ¦μ΄λ κ΅¬μ± μμμ μνΈμμ©μ νμΈνλ νμ€νΈ

### UI νμ€νΈ(Integration tests)
* ν΅ν© νμ€νΈλ₯Ό UI μμμ μ§ν

### E2E νμ€νΈ(End-to-End tests)
* UI νμ€νΈλ₯Ό νλλ° <b>μ€μλ²</b>μμ νμ€νΈ νλ κ²
* κ·Έλμ endμ€ νλλ μ¬μ©μλ₯Ό λ»νκ³  λ€λ₯Έ endλ μλ²λ₯Ό μλ―Ένλ κ² κ°λ€.

## νμ€νΈ κ°λ° λ°©λ²λ‘ 
> TDD, BDD...

> ν... μ΄κ²μ μ’ μ΄ν΄κ° μλλ€... μ΄λ ΅λ€ γγγ μ°¨μ΄λ₯Ό μ΄ν΄νλκ² [μ¬κΈ°μ](https://softwareengineering.stackexchange.com/questions/135218/what-is-the-difference-between-writing-test-cases-for-bdd-and-tdd#135246) μ΄ μ°¨μ΄μ λν΄μ μ΄μΌκΈ°νκ³ μλλ° BDDλ μ λλ‘λ TDDλ€ μ΄μ©κ³ μ μ©κ³ ... λμ΄λ ΅κ² λ§λ λ€ γγγ

κ·Έλ₯ λ΄κ° μ΄κ³³ μ κ³³μμ μ°Ύμλ΄€μλ κ°μ₯ [λͺμΎνκ² μ λ¦¬λμ΄ μλ ν¬μ€ν](https://m.blog.naver.com/PostView.nhn?blogId=genycho&logNo=221546874461&proxyReferer=https:%2F%2Fwww.google.com%2F)μ μΈμ©νμλ©΄ μλμ κ°λ€.
###  TDD
* Test-Driven Development
* μ½λ κ΅¬μ‘°λ λ¦¬νν λ§(low-level) κ΄μ μμ μ κ·Ό

### BDD
* Behaviour-Driven Development
* μλλ¦¬μ€, λΉμ¦λμ€ λ λ²¨κ³Ό κ°μ ν΅ν©μ μΈ κ΄μ (high-level)μμ μ κ·Ό
* BDDκ° TDDμ κΈ°λ°μ λκ³  μλ€κ³  ν¨..

μ°¨μ΄λ₯Ό μμλλΆμ μλ €μ£Όμλ©΄ κ°μ¬νκ² μ΅λλ€.π¦

# νμ€νΈ κ΄λ ¨ λΌμ΄λΈλ¬λ¦¬
> jest, mocha

mochaμ κΈ°μ¬κΉμ§ νκ²λ§ μ°¨μ΄μ μ μ μ€λͺνμ§ λͺ»νκ² λ€. λ΄κ° μ΄μ¬ν μμ¨λ΄μ κ·Έλ°κ±°κ°λ€. μ΄κ²λ λ΄κ° μ’ λ μ¨λ³΄κ³  μΆκ°νλλ‘ νκ² λ€ γγ

### mocha
* κ°λ²Όμ β λ΄κ° μ’μνλ κΈ°λ₯μ μ κ³΅νλ λΌμ΄λΈλ¬λ¦¬λ€μ μλ κ² μ λ κ² λ κ³ μ²λΌ μ‘°λ¦½ν΄μ μΈ μ μλ€.

### jest
* λ¬΄κ±°μ β μ₯κ°νκ±΄ λ€μκ³  λ€ ν΄μ€λ€λ μλ―Έκ° λ  μλ μμ.

# νμ€νΈ κ΄λ ¨ ν΄
> cypress.. 

### cypress
* Javascript e2e νμ€νΈλ₯Ό μν Framework

# νμ€νΈ μ½λ μμ± λ°©λ²
> describe, it...
μ¬κΈ°μ TDD, BDD λ°©μμ λ°λΌμ μ©μ΄κ° μ’ λ€λ₯΄κ² μ¬μ©νλκ±° κ°λ€.
μ΄κ²μ λ΄κ° μ’ λ μ¨λ³΄κ³  μΆκ°νλλ‘ νκ² λ€.
