---
title: 🧞‍♂️TS 2 - Interface
date: 2020-05-13 21:05:83
category: javascript
thumbnail: './images/ts.jpg'
draft: true
---


> [공식문서](https://www.typescriptlang.org/docs/handbook/interfaces.html) 기준으로 특이사항 위주로 정리를 해봅니다.

쫘잔✨2탄, interface를 알아봅시다.
# Interface
basic types를 이용하여 조금 더 우리에게 맞는 타입을 만들고 싶어질 것이다.

`얼굴`이라는 타입을 만든다면 그 안에 눈, 코, 입은 최소한 있어야 할 것이다. 이런것들을 정의하고자 할 때, Interface를 사용한다.

## 필수 vs 필수가 아닌 요소
  `얼굴`에는 필수적인 요소가 있지만(눈, 코, 입) 필수적이지 않은(머리카락) 요소들도 있다. 
  * Interface는 기본적으로 필수적인 요소들을 보여주기 위해서 작성한다.

    ```ts
    interface LabeledValue {
        label: string;
    }

    function printLabel(labeledObj: LabeledValue) {
        console.log(labeledObj.label);
    }

    let myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);
    ```

  * 필수적이지 않은 요소들도 `이런 것들도 있다~`라는 느낌으로 작성하고 싶을 수 있다. 그럴땐 `물음표`를 붙여주면 된다.
    ```ts
      interface SquareConfig {
        color?: string;
        width?: number;
      }

      function createSquare(config: SquareConfig): {color: string; area: number} {
          let newSquare = {color: "white", area: 100};
          if (config.color) {
              newSquare.color = config.color;
          }
          if (config.width) {
              newSquare.area = config.width * config.width;
          }
          return newSquare;
      }

      let mySquare = createSquare({color: "black"});
    ```

  ## Readonly
  * `const`로 변수를 선언하는 것 처럼, 생성시에만 값이 셋팅되고 그 이후에는 항상 `읽기전용` 으로 하고 싶을 수 있다.
  * 그때는, `readonly` 키워드를 사용하면 된다.
    ```ts
    interface Point {
        readonly x: number;
        readonly y: number;
    }
    let p1: Point = { x: 10, y: 20 };
    
    // error 발생
    p1.x = 5; 
    ```
  * 읽기 전용 배열 - `ReadonlyArray<T>`는 `Array<T>`이거랑 똑같은데 읽기 전용일 뿐이다.
    ```ts
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;

    // error!
    ro[0] = 12;

    // error!
    ro.push(5);

    // error!
    ro.length = 100;

    // error!
    // 심지어 읽기전용 아닌 배열에 set하는 것도 에러가 난다.
    a = ro; 
    ```
  * 앞에서 봤던 `type assertion`도 가능
    ```ts
    a = ro as number[];
    ```
  * `readonly vs const`  차이는 readonly는 `속성(property)`에 적용시키는 것이고 const는 `변수(variable)`에 적용시킨다는 점이 차이가 있다.

  ## Excess Property Checks
  번역하자면 과도한 property 체크? ㅋㅋㅋ
  * 일단 혼란스러웠던 것은, 바로 아래의 예시에서는 에러가 안나는데
    ```ts
    interface LabeledValue {
        label: string;
    }

    function printLabel(labeledObj: LabeledValue) {
        console.log(labeledObj.label);
    }

    let myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);
    ```
    * `Excess Property Checks`의 예시인 아래 코드에서는 에러가 난단 말이다.
    ```ts
    interface SquareConfig {
        color?: string;
        width?: number;
    }

    function createSquare(config: SquareConfig): { color: string; area: number } {
        // ...
    }

    let mySquare = createSquare({ colour: "red", width: 100 })
    ```
    * 아무리 생각해도 이해가 안가서 한글 번역 문서를 봐보니까 조금 도움이 됬다.
    * 물음표가 붙는 `Optional Properties`의 경우 조금 특별해진다. 이때 버그가 발생할 수 있다고 생각하고 `excess property checking` 관리가 들어간다.
    * 이 경우, 조금 더 엄격하게 관리를 하는데
    * `대상 타입 (target type)`이 갖고 있지 않은 프로퍼티를 갖고 있으면, 에러를 발생시킨다.
    * 이 검사(excess property checking)를 피하려면 
      * 방법1. `type assertion`을 걸어서 내가 체킹하게끔 코드를 짜줄수도 있고
        ```ts
        let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
        ```
      * 방법2. 아니면 `string index signature` 요 방법을 써서 다른 문자열도 들어올 수 있음을 명시하여 해결 할 수도 있다.
        ```ts
        interface SquareConfig {
          color?: string;
          width?: number;
          [propName: string]: any;
        }
        ```
      * 방법3. 아니면 `객체를 다른 변수에 할당`하여 해당 변수는 `excess property checking` 검사를 받지 않아 컴파일이 에러를 안주게 할수도 있다. -> 이것 또한 복잡하군;; 걍 넘기자;;
        ```ts
        // 통과
        let squareOptions = { colour: "red", width: 100 };
        let mySquare = createSquare(squareOptions);
        ```
        ```ts
        // 이럴 경우엔 또 에러라네;;
        let squareOptions = { colour: "red" };
        let mySquare = createSquare(squareOptions);
        ```
  ## Function Types
  * 인터페이스로 function type도 기술할 수 있다.
  * = `인터페이스에 call signature를 준다.` 라고 하는군!
  * 매개변수(이름, 타입)와 반환값(타입)이 필요
    ```ts
    interface SearchFunc {
      (source: string, subString: string): boolean;
    }
    ```
  * 사용방법
    * 방법 1.
      ```ts
      let mySearch: SearchFunc;
      mySearch = function(src: string, sub: string): boolean {
          let result = src.search(sub);
          return result > -1;
      }
      ```
    * 방법 2.
      ```ts
      let mySearch: SearchFunc;
      mySearch = function(src, sub) {
          let result = src.search(sub);
          return result > -1;
      }
      ```
  ## Indexable Types
  * `index into(~로 인덱스)`하는 것도 구현 가능
  * `인덱싱 할 때`와 `인덱싱 되었을 때`를 지정해주면 된다. = `index signature`(이것을 index signature라고 부름)
    ```ts
    interface StringArray {
      [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];

    let myStr: string = myArray[0];
    ```
      * StringArray는 index signature를 가지고 있고,
      * index signature가 의미하길, StringArray는 number로 인덱싱 되었고, string를 반환한다고 의미하고 있다.
  * `index signatures`를 지원하는 타입은 두 가지가 있다. `number`, `string`

  ## Class Type
  ### 클래스 인터페이스 구현
    ```ts
    interface ClockInterface {
      currentTime: Date;
      setTime(d: Date): void;
    }

    class Clock implements ClockInterface {
        currentTime: Date = new Date();
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }
    ```

  ### 인터페이스 확장
  ```ts
  interface Shape {
    color: string;
  }

  interface PenStroke {
      penWidth: number;
  }

  interface Square extends Shape, PenStroke {
      sideLength: number;
  }

  let square = {} as Square;
  square.color = "blue";
  square.sideLength = 10;
  square.penWidth = 5.0;
  ```
  