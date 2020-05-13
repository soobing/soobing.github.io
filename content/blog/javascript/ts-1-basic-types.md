---
title: 🧞‍♂️TS 1 - Basic Types
date: 2020-05-13 20:05:96
category: javascript
thumbnail: './images/ts.jpg'
draft: false
---

> [공식문서](https://www.typescriptlang.org/docs/handbook/basic-types.html) 기준으로 특이사항 위주로 정리를 해봅니다.

쫘잔✨1탄, 변수부터 알아봅시다.
# Basic Types
일단 타입 종류는 아래와 같음
* Boolean, Number, String, Null, Undefined
* Array, Object
* Tuple, Enum, Any, Void, Never

## Array
  Array 안에 담길 element 타입을 지정해 줄 수 있다.
  ```ts
  // 방법 1.
  let list: number[] = [1, 2, 3];
  ```

   ```ts
  // 방법 2. generic array type
  let list: Array<number> = [1, 2, 3];
  ```

  > ❓`generic type`이 뭐야?

  ## Tuple
  Array에 서로 다른 타입들을 담고 싶을때 (총 길이 length는 알아야 함.)
  ```ts
  // 선언
  let x: [string, number];
  // 초기화 (정상)
  x = ["hello", 10];
  // 초기화 (에러발생)
  x = [10, "hello"];
  ```

  ## Enum
  ```ts
  enum Color {Red, Green, Blue}; // 0, 1, 2
  enum Color {Red = 1, Green, Blue}; // 1, 2, 3
  enum Color {Red = 1, Green = 2, Blue = 4} // 1, 2, 4
  ```

  ```ts
  // 사용은 이렇게
  let c: Color = Color.Green;
  ```

  ## Any
  안쓰는게 낫겠지...? ㅋㅋㅋㅋ
  ## Void
  * any의 반대
  * `null`(strict 아닐때 만)이나 `undefined`만 assign 가능.

  ```ts
  let unusable: void = undefined;
  unusable = null; // `--strictNullChecks`가 아닐때만!
  ```

  ## Never
  * 절대 발생하지 말아야 할 곳에 사용
  * `에러` 같은 것
  * `무한루프` 같은 것

  ## Type assertion
  > * `요것의 타입이 뭔지 알고있다~` 라고 적어주는 느낌
  > * 사용 방법은 두 가지
  #### 1) “angle-bracket” syntax
  ```ts
  let someValue: any = "this is a string";

  let strLength: number = (<string>someValue).length;
  ```
  #### 2) "as" syntax
  ```ts
  let someValue: any = "this is a string";

  let strLength: number = (someValue as string).length;
  ```