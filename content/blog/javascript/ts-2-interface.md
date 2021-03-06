---
title: ๐งโโ๏ธTS 2 - Interface
date: 2020-05-13 21:05:83
category: javascript
thumbnail: './images/ts.jpg'
draft: true
---


> [๊ณต์๋ฌธ์](https://www.typescriptlang.org/docs/handbook/interfaces.html) ๊ธฐ์ค์ผ๋ก ํน์ด์ฌํญ ์์ฃผ๋ก ์ ๋ฆฌ๋ฅผ ํด๋ด๋๋ค.

์ซ์โจ2ํ, interface๋ฅผ ์์๋ด์๋ค.
# Interface
basic types๋ฅผ ์ด์ฉํ์ฌ ์กฐ๊ธ ๋ ์ฐ๋ฆฌ์๊ฒ ๋ง๋ ํ์์ ๋ง๋ค๊ณ  ์ถ์ด์ง ๊ฒ์ด๋ค.

`์ผ๊ตด`์ด๋ผ๋ ํ์์ ๋ง๋ ๋ค๋ฉด ๊ทธ ์์ ๋, ์ฝ, ์์ ์ต์ํ ์์ด์ผ ํ  ๊ฒ์ด๋ค. ์ด๋ฐ๊ฒ๋ค์ ์ ์ํ๊ณ ์ ํ  ๋, Interface๋ฅผ ์ฌ์ฉํ๋ค.

## ํ์ vs ํ์๊ฐ ์๋ ์์
  `์ผ๊ตด`์๋ ํ์์ ์ธ ์์๊ฐ ์์ง๋ง(๋, ์ฝ, ์) ํ์์ ์ด์ง ์์(๋จธ๋ฆฌ์นด๋ฝ) ์์๋ค๋ ์๋ค. 
  * Interface๋ ๊ธฐ๋ณธ์ ์ผ๋ก ํ์์ ์ธ ์์๋ค์ ๋ณด์ฌ์ฃผ๊ธฐ ์ํด์ ์์ฑํ๋ค.

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

  * ํ์์ ์ด์ง ์์ ์์๋ค๋ `์ด๋ฐ ๊ฒ๋ค๋ ์๋ค~`๋ผ๋ ๋๋์ผ๋ก ์์ฑํ๊ณ  ์ถ์ ์ ์๋ค. ๊ทธ๋ด๋ `๋ฌผ์ํ`๋ฅผ ๋ถ์ฌ์ฃผ๋ฉด ๋๋ค.
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
  * `const`๋ก ๋ณ์๋ฅผ ์ ์ธํ๋ ๊ฒ ์ฒ๋ผ, ์์ฑ์์๋ง ๊ฐ์ด ์ํ๋๊ณ  ๊ทธ ์ดํ์๋ ํญ์ `์ฝ๊ธฐ์ ์ฉ` ์ผ๋ก ํ๊ณ  ์ถ์ ์ ์๋ค.
  * ๊ทธ๋๋, `readonly` ํค์๋๋ฅผ ์ฌ์ฉํ๋ฉด ๋๋ค.
    ```ts
    interface Point {
        readonly x: number;
        readonly y: number;
    }
    let p1: Point = { x: 10, y: 20 };
    
    // error ๋ฐ์
    p1.x = 5; 
    ```
  * ์ฝ๊ธฐ ์ ์ฉ ๋ฐฐ์ด - `ReadonlyArray<T>`๋ `Array<T>`์ด๊ฑฐ๋ ๋๊ฐ์๋ฐ ์ฝ๊ธฐ ์ ์ฉ์ผ ๋ฟ์ด๋ค.
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
    // ์ฌ์ง์ด ์ฝ๊ธฐ์ ์ฉ ์๋ ๋ฐฐ์ด์ setํ๋ ๊ฒ๋ ์๋ฌ๊ฐ ๋๋ค.
    a = ro; 
    ```
  * ์์์ ๋ดค๋ `type assertion`๋ ๊ฐ๋ฅ
    ```ts
    a = ro as number[];
    ```
  * `readonly vs const`  ์ฐจ์ด๋ readonly๋ `์์ฑ(property)`์ ์ ์ฉ์ํค๋ ๊ฒ์ด๊ณ  const๋ `๋ณ์(variable)`์ ์ ์ฉ์ํจ๋ค๋ ์ ์ด ์ฐจ์ด๊ฐ ์๋ค.

  ## Excess Property Checks
  ๋ฒ์ญํ์๋ฉด ๊ณผ๋ํ property ์ฒดํฌ? ใใใ
  * ์ผ๋จ ํผ๋์ค๋ฌ์ ๋ ๊ฒ์, ๋ฐ๋ก ์๋์ ์์์์๋ ์๋ฌ๊ฐ ์๋๋๋ฐ
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
    * `Excess Property Checks`์ ์์์ธ ์๋ ์ฝ๋์์๋ ์๋ฌ๊ฐ ๋๋จ ๋ง์ด๋ค.
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
    * ์๋ฌด๋ฆฌ ์๊ฐํด๋ ์ดํด๊ฐ ์๊ฐ์ ํ๊ธ ๋ฒ์ญ ๋ฌธ์๋ฅผ ๋ด๋ณด๋๊น ์กฐ๊ธ ๋์์ด ๋ฌ๋ค.
    * ๋ฌผ์ํ๊ฐ ๋ถ๋ `Optional Properties`์ ๊ฒฝ์ฐ ์กฐ๊ธ ํน๋ณํด์ง๋ค. ์ด๋ ๋ฒ๊ทธ๊ฐ ๋ฐ์ํ  ์ ์๋ค๊ณ  ์๊ฐํ๊ณ  `excess property checking` ๊ด๋ฆฌ๊ฐ ๋ค์ด๊ฐ๋ค.
    * ์ด ๊ฒฝ์ฐ, ์กฐ๊ธ ๋ ์๊ฒฉํ๊ฒ ๊ด๋ฆฌ๋ฅผ ํ๋๋ฐ
    * `๋์ ํ์ (target type)`์ด ๊ฐ๊ณ  ์์ง ์์ ํ๋กํผํฐ๋ฅผ ๊ฐ๊ณ  ์์ผ๋ฉด, ์๋ฌ๋ฅผ ๋ฐ์์ํจ๋ค.
    * ์ด ๊ฒ์ฌ(excess property checking)๋ฅผ ํผํ๋ ค๋ฉด 
      * ๋ฐฉ๋ฒ1. `type assertion`์ ๊ฑธ์ด์ ๋ด๊ฐ ์ฒดํนํ๊ฒ๋ ์ฝ๋๋ฅผ ์ง์ค์๋ ์๊ณ 
        ```ts
        let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
        ```
      * ๋ฐฉ๋ฒ2. ์๋๋ฉด `string index signature` ์ ๋ฐฉ๋ฒ์ ์จ์ ๋ค๋ฅธ ๋ฌธ์์ด๋ ๋ค์ด์ฌ ์ ์์์ ๋ช์ํ์ฌ ํด๊ฒฐ ํ  ์๋ ์๋ค.
        ```ts
        interface SquareConfig {
          color?: string;
          width?: number;
          [propName: string]: any;
        }
        ```
      * ๋ฐฉ๋ฒ3. ์๋๋ฉด `๊ฐ์ฒด๋ฅผ ๋ค๋ฅธ ๋ณ์์ ํ ๋น`ํ์ฌ ํด๋น ๋ณ์๋ `excess property checking` ๊ฒ์ฌ๋ฅผ ๋ฐ์ง ์์ ์ปดํ์ผ์ด ์๋ฌ๋ฅผ ์์ฃผ๊ฒ ํ ์๋ ์๋ค. -> ์ด๊ฒ ๋ํ ๋ณต์กํ๊ตฐ;; ๊ฑ ๋๊ธฐ์;;
        ```ts
        // ํต๊ณผ
        let squareOptions = { colour: "red", width: 100 };
        let mySquare = createSquare(squareOptions);
        ```
        ```ts
        // ์ด๋ด ๊ฒฝ์ฐ์ ๋ ์๋ฌ๋ผ๋ค;;
        let squareOptions = { colour: "red" };
        let mySquare = createSquare(squareOptions);
        ```
  ## Function Types
  * ์ธํฐํ์ด์ค๋ก function type๋ ๊ธฐ์ ํ  ์ ์๋ค.
  * = `์ธํฐํ์ด์ค์ call signature๋ฅผ ์ค๋ค.` ๋ผ๊ณ  ํ๋๊ตฐ!
  * ๋งค๊ฐ๋ณ์(์ด๋ฆ, ํ์)์ ๋ฐํ๊ฐ(ํ์)์ด ํ์
    ```ts
    interface SearchFunc {
      (source: string, subString: string): boolean;
    }
    ```
  * ์ฌ์ฉ๋ฐฉ๋ฒ
    * ๋ฐฉ๋ฒ 1.
      ```ts
      let mySearch: SearchFunc;
      mySearch = function(src: string, sub: string): boolean {
          let result = src.search(sub);
          return result > -1;
      }
      ```
    * ๋ฐฉ๋ฒ 2.
      ```ts
      let mySearch: SearchFunc;
      mySearch = function(src, sub) {
          let result = src.search(sub);
          return result > -1;
      }
      ```
  ## Indexable Types
  * `index into(~๋ก ์ธ๋ฑ์ค)`ํ๋ ๊ฒ๋ ๊ตฌํ ๊ฐ๋ฅ
  * `์ธ๋ฑ์ฑ ํ  ๋`์ `์ธ๋ฑ์ฑ ๋์์ ๋`๋ฅผ ์ง์ ํด์ฃผ๋ฉด ๋๋ค. = `index signature`(์ด๊ฒ์ index signature๋ผ๊ณ  ๋ถ๋ฆ)
    ```ts
    interface StringArray {
      [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];

    let myStr: string = myArray[0];
    ```
      * StringArray๋ index signature๋ฅผ ๊ฐ์ง๊ณ  ์๊ณ ,
      * index signature๊ฐ ์๋ฏธํ๊ธธ, StringArray๋ number๋ก ์ธ๋ฑ์ฑ ๋์๊ณ , string๋ฅผ ๋ฐํํ๋ค๊ณ  ์๋ฏธํ๊ณ  ์๋ค.
  * `index signatures`๋ฅผ ์ง์ํ๋ ํ์์ ๋ ๊ฐ์ง๊ฐ ์๋ค. `number`, `string`

  ## Class Type
  ### ํด๋์ค ์ธํฐํ์ด์ค ๊ตฌํ
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

  ### ์ธํฐํ์ด์ค ํ์ฅ
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
  