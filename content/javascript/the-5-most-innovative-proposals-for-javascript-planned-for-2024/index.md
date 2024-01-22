---
title: '2024년 자바스크립트의 5가지 가장 혁신적인 제안'
date: '2023-12-20 00:00:00'
author: soobing
tags: javascript
categories: javascript
draft: false
---

> 원문: https://javascript.plainenglish.io/the-5-most-innovative-proposals-for-javascript-planned-for-2024-22139dd2f546


![](https://miro.medium.com/v2/resize:fit:1114/format:webp/1*VmErsdZluCmilqbcYLIxTg.png)

*JavaScript Logo 2024*

자바스크립트가 빠른 속도로 발전함에 따라 2024년은 이 프로그래밍 언어에 있어 중요한 해가 될 것입니다. 이 글에서는 개발자들이 자바스크립트 코딩에 접근하는 방식을 재정의하기 위한 최신 제안을 자세히 살펴보겠습니다.

이 글이 유용하길 바랍니다!

시작해 봅시다!

**목차**

- 데코레이터
- Temporal API
- 파이프라인 연산자
- Error cause
- 레코드와 튜플

# 1. 데코레이터

자바스크립트에 데코레이터가 도입된 것은 개발자가 클래스, 메서드, 프로퍼티 및 매개변수의 동작을 조작하고 개선할 수 있는 방법이 크게 발전했음을 의미합니다. 파이썬과 타입스크립트와 같은 다른 프로그래밍 언어에서 유래한 데코레이터는 기능을 추가하거나 수정하는 간결하고 선언적인 방법을 제공합니다. 언어 구문 내에서 직접 메타 프로그래밍 패턴을 허용하여, 보다 명확하고 표현력이 풍부한 코드로 만들 수 있습니다. 이를 통해 로깅, 성능 모니터링, 기존 코드의 동작 수정 또는 확장과 같은 작업을 간소화할 수 있습니다. 따라서 데코레이터는 자바스크립트 코드를 모듈화하고, 유지보수하기 쉽고, 다재다능하게 만들어 모던 프로그래밍 방식 및 패러다임에 부합하도록 합니다.

예시

```jsx
function log(target, name, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
    console.log(`Calling ${name} with arguments:`, args);
    return originalMethod.apply(this, args);
  };
  return descriptor;
}
```

```jsx
class MyClass {
  @log
  myMethod(arg1, arg2) {
    // 메서드 구현
  }
}const myInstance = new MyClass();
myInstance.myMethod(1, 2);
// 로그: "Calling myMethod with arguments: [1, 2]"
```

또는 메서드 실행 시간을 측정한다고 가정해 봅니다. 메서드가 실행되는 데 걸리는 시간을 로깅하는 데코레이터를 만들 수 있습니다.

```jsx
function measureExecutionTime(target, name, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args) {
  const start = performance.now();
  const result = originalMethod.apply(this, args);
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds.`);
  return result;
  };
  return descriptor;
}
```

```jsx
class ExampleClass {
  @measureExecutionTime
  someMethod() {
    // 메서드 구현
  }
}const example = new ExampleClass();
example.someMethod(); // someMethod에 소요된 시간을 로깅
```

3단계

더 보기: https://github.com/tc39/proposal-decorators

# 2. Temporal API

자바스크립트의 Temporal API 제안은 기존 `Date` 객체의 한계와 복잡성에 대한 대응입니다. 독특하고 직관적이지 않은 디자인으로 유명한 `Date` API는 시간대와 날짜를 비효율적으로 처리하여 개발자들을 불편하게 했습니다. 이와 대조적으로, Temporal API는 더 직관적이고 강력하며 사용자 친화적으로 설계되었습니다. 이는 날짜, 시간 및 시간대를 더 잘 관리할 수 있게하여, 이러한 요소를 더 쉽게 생성하고 조작할 수 있습니다. 또한, 비교 및 계산과 같은 일반적인 시간 관련 작업을 처리하기 위해 더 풍부한 데이터 타입과 편리한 방법을 제공합니다. 이 API는 자바스크립트에서 날짜와 시간을 다루는 작업을 더욱 견고하고, 가독성 있게 만들며, `Date` 객체와 관련된 일반적인 오류를 없애기 위한 노력의 결과물입니다. 이 API의 도입으로 개발자들은 애플리케이션의 시간적 측면을 더 효율적으로 처리할 수 있게 되어, 코드 품질과 사용자 경험을 향상시킬 수 있습니다.

**UTC 처리 개선**

AS-IS

UTC 시간을 특정 시간대로 변환하는 것은 번거롭고 오류가 발생하기 쉬운데, 특히 서머 타임(Daylight Saving Time)과 같은 변경 사항을 고려할 때 그렇습니다.

```jsx
let now = new Date();
let utcHour = now.getUTCHours();
// UTC 시간을 수동으로 다른 시간대로 변환하기
```

TO-BE

Temporal을 사용하면 어떤 시간대에서든 쉽게 시간을 얻을 수 있으며, 서머 타임과 같은 미묘한 부분들을 자동으로 처리할 수 있습니다.

```jsx
let now = Temporal.now.instant();
let hourInTokyo = now.toZonedDateTimeISO('Asia/Tokyo').hour;
```

이 예시에서, Temporal API는 UTC 시간을 다루고 다른 시간대로 변환하는 작업을 크게 간소화 해줍니다. `Date` 객체에서는 더 복잡하고 직관적이지 않았습니다.

**날짜에 일수 추가하기**

AS-IS

```jsx
let today = new Date();
let nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);
```

TO-BE

```jsx
let now = Temporal.now.plainDate();
let nextWeek = today.add({ days: 7 });
```

**두 날짜 비교하기**

AS-IS

```jsx
let date1 = new Date(2023, 3, 1); // April 1, 2023
let date2 = new Date(2023, 3, 15); // April 15, 2023
let isAfter = date2 > date1; // true
```

TO-BE

```jsx
let date1 = Temporal.PlainDate.from({ year: 2023, month: 4, day: 1 });
let date2 = Temporal.PlainDate.from({ year: 2023, month: 4, day: 15 });
let isAfter = Temporal.PlainDate.compare(date2, date1) > 0; // true
```

3단계

더 보기: https://tc39.es/proposal-temporal/docs/

# 3. 파이프라인 연산자 (`|>`)

자바스크립트의 파이프라인 연산자(`|>`)는 여러 함수 호출이 포함된 코드의 가독성과 효율성을 향상시키기 위해 제안된 기능입니다. 이 연산자는 보다 더 함수형 스타일의 문법을 가능하게 하여, 데이터를 일련의 함수를 통해 흐르게 하는 것을 용이하게 합니다. 특히 데이터 변환 또는 수학적 연산과 같은 시나리오에서 복잡한 표현을 단순화하며, 하나의 함수 출력을 다음 함수의 입력으로 직접 전달할 수 있게 함으로써 중첩된 함수 호출의 필요성을 줄이고 전반적인 코드의 명확성을 높입니다. 파이프라인 연산자의 도입은 자바스크립트를 함수형 프로그래밍 패턴에 더 접근하기 쉽게 만드는 중요한 단계로, 개발자들이 더 직관적이고 유지보수가 쉬운 코드를 작성할 수 있게 지원합니다.

AS-IS

```jsx
const double = (x) => x * 2;
const addFive = (x) => x + 5;
const result = addFive(double(10)); // 25
```

TO-BE

```jsx
const double = (x) => x * 2;
const addFive = (x) => x + 5;
const result = 10 |> double |> addFive; // 25
```

또는

```jsx
const result = -16 |> Math.abs |> Math.sqrt |> Math.round;
```

또는

```jsx
const data = [1, 2, 3, 4, 5];
const doubledAndFiltered = data |> (_ => _.map(x => x * 2)) |> (_ => _.filter(x => x % 3 !== 0));
console.log(doubledAndFiltered); // [4, 8, 10]
```

2단계

더 보기: https://github.com/tc39/proposal-pipeline-operator

# 4. Error Cause

자바스크립트의 "Error Cause" 기능은 에러 객체에 선택적인 `cause` 속성을 도입하여 디버깅 능력을 크게 향상시킵니다. 이 제안은 보다 상세한 에러 정보의 필요성에 의해 추진되며, 개발자들이 에러의 근본 원인을 더 쉽게 이해할 수 있게 합니다. `cause` 속성은 에러에 대한 구조화된 데이터를 제공하여 더 나은 문제 진단과 빠른 해결을 가능하게 합니다. 이는 에러가 중첩되거나 여러 원인에서 발생할 수 있는 복잡한 애플리케이션에서 특히 유용합니다. 에러 객체와 함께 추가적인 맥락을 포함할 수 있게 함으로써, "Error Cause" 기능은 디버깅 과정을 간소화하고 자바스크립트 애플리케이션에서의 에러 처리를 개선하려는 목적을 가집니다.

예시

```jsx
function doRSA(p, q) {
  if (!Number.isInteger(p) || !Number.isInteger(q)) {
    throw new Error("RSA key generation requires integer inputs.", {
      cause: { code: "NonInteger", values: [p, q] },
    });
  }
  // 추가 코드는 여기에...
}
```

# 5. 레코드와 튜플

자바스크립트에서 레코드와 튜플에 대한 제안은 불변 데이터 구조를 도입하여, 데이터를 처리하는 데 있어 더 견고하고 효율적인 방법을 제공합니다. 객체와 유사한 레코드와 배열과 비슷한 튜플은 주로 그들의 불변성(immutability)에서 차이가 있습니다. 이들을 수정하려는 모든 시도는 새로운 인스턴스를 생성하게 되어, 원래 상태를 보존합니다. 이러한 특성은 데이터의 무결성을 보장하고, 불변 구조가 추적하고 비교하기 더 간단하기 때문에 코드의 오류와 복잡성을 줄이는 데 도움이 됩니다. 이는 성능 개선으로 이어질 수 있습니다.

예시

```jsx
const myRecord = #{ name: "Anibal", age: 30 };
const updatedRecord = myRecord.with({ age: 31 });
console.log(updatedRecord); // #{ name: "Anibal", age: 31 }
console.log(myRecord); // #{ name: "Anibal", age: 30 } (unchanged)

const myTuple = #[1, 2, 3];
const updatedTuple = myTuple.with(1, 4);
console.log(updatedTuple); // #[1, 4, 3]
console.log(myTuple); // #[1, 2, 3] (unchanged)
```

2단계

더 보기: https://github.com/tc39/proposal-record-tuple

# 마지막 생각

2024년 자바스크립트에 제안된 업데이트들은 이 언어를 더욱 강력하고 직관적이며 개발자 친화적으로 만드는 데 있어 중요한 도약을 보여줍니다. Temporal API의 단순함이든 파이프라인 연산자의 효율성이든, 이러한 변경사항들은 지속적인 개선과 혁신에 대한 헌신을 반영합니다.