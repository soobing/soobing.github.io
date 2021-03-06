---
title: π§ββοΈTS 1 - Basic Types
date: 2020-05-13 20:05:96
category: javascript
thumbnail: './images/ts.jpg'
draft: true
---

> [κ³΅μλ¬Έμ](https://www.typescriptlang.org/docs/handbook/basic-types.html) κΈ°μ€μΌλ‘ νΉμ΄μ¬ν­ μμ£Όλ‘ μ λ¦¬λ₯Ό ν΄λ΄λλ€.

μ«μβ¨1ν, λ³μλΆν° μμλ΄μλ€.
# Basic Types
μΌλ¨ νμ μ’λ₯λ μλμ κ°μ
* Boolean, Number, String, Null, Undefined
* Array, Object
* Tuple, Enum, Any, Void, Never

## Array
  Array μμ λ΄κΈΈ element νμμ μ§μ ν΄ μ€ μ μλ€.
  ```ts
  // λ°©λ² 1.
  let list: number[] = [1, 2, 3];
  ```

   ```ts
  // λ°©λ² 2. generic array type
  let list: Array<number> = [1, 2, 3];
  ```

  > β`generic type`μ΄ λ­μΌ?

  ## Tuple
  Arrayμ μλ‘ λ€λ₯Έ νμλ€μ λ΄κ³  μΆμλ (μ΄ κΈΈμ΄ lengthλ μμμΌ ν¨.)
  ```ts
  // μ μΈ
  let x: [string, number];
  // μ΄κΈ°ν (μ μ)
  x = ["hello", 10];
  // μ΄κΈ°ν (μλ¬λ°μ)
  x = [10, "hello"];
  ```

  ## Enum
  ```ts
  enum Color {Red, Green, Blue}; // 0, 1, 2
  enum Color {Red = 1, Green, Blue}; // 1, 2, 3
  enum Color {Red = 1, Green = 2, Blue = 4} // 1, 2, 4
  ```

  ```ts
  // μ¬μ©μ μ΄λ κ²
  let c: Color = Color.Green;
  ```

  ## Any
  μμ°λκ² λ«κ² μ§...? γγγγ
  ## Void
  * anyμ λ°λ
  * `null`(strict μλλ λ§)μ΄λ `undefined`λ§ assign κ°λ₯.

  ```ts
  let unusable: void = undefined;
  unusable = null; // `--strictNullChecks`κ° μλλλ§!
  ```

  ## Never
  * μ λ λ°μνμ§ λ§μμΌ ν  κ³³μ μ¬μ©
  * `μλ¬` κ°μ κ²
  * `λ¬΄νλ£¨ν` κ°μ κ²

  ## Type assertion
  > * `μκ²μ νμμ΄ λ­μ§ μκ³ μλ€~` λΌκ³  μ μ΄μ£Όλ λλ
  > * μ¬μ© λ°©λ²μ λ κ°μ§
  #### 1) βangle-bracketβ syntax
  ```ts
  let someValue: any = "this is a string";

  let strLength: number = (<string>someValue).length;
  ```
  #### 2) "as" syntax
  ```ts
  let someValue: any = "this is a string";

  let strLength: number = (someValue as string).length;
  ```