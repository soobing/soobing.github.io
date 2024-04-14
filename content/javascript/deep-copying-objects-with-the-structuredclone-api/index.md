---
title: (번역) StructuredClone API를 사용하여 객체를 깊은 복사하는 법
date: '2023-05-07 00:00:00'
author: soobing
tags: javascript StructuredClone object deep-copy
categories: translate javascript
draft: false
---

> 원문: [https://blog.openreplay.com/deep-copying-objects-with-the-structuredclone-api/](https://blog.openreplay.com/deep-copying-objects-with-the-structuredclone-api/)


![Deep Copying Objects with the StructuredClone API](https://blog.openreplay.com/images/deep-copying-objects-with-the-structuredclone-api/images/hero.png)

> 개요: 자바스크립트에서 객체를 복사하는 것은 간단하지 않으며, 이는 잘 알려진 문제입니다. 그러나 이 글에서는 해결책을 제공합니다. StructuredClone API를 사용하면 모든 객체를 간단하고 빠르게 복사할 수 있습니다.


자바스크립트에서 객체가 변수에 저장될 때, 해당 변수는 객체의 [참조값](https://blog.openreplay.com/javascript-types-and-values-explained/)을 갖습니다. 이는 변수 자체에 객체를 저장하는 것이 아니라, 객체의 메모리 위치를 나타내는 식별자를 저장한다는 것을 의미합니다. 객체의 복사는 원시 타입과는 다른 방식으로 동작합니다.

## 얕은 복사(Shallow Copy) vs. 깊은 복사(Deep Copy)

자바스크립트에서 값은 두 가지 방법으로 복사할 수 있습니다. 얕은 복사와 깊은 복사입니다.

### 얕은 복사(Shallow Copy)

[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy)에 따르면,

> 객체의 얕은 복사는 복사본의 프로퍼티가 원본 객체와 동일한 참조(메모리의 위치)를 공유하는 복사본입니다. 결과적으로 원본 또는 복사본 중 하나를 변경하면 다른 객체도 변경될 수 있으므로, 의도치 않게 원본 또는 복사본의 변경을 유발할 수 있습니다.
> 

이는 간단히 말하자면, 얕은 복사를 사용하면 객체의 첫 번째 레벨의 값은 복사되지만 그 안에 포함된 하위 객체는 참조됩니다. 그래서 원본 객체가 변경되면 복사본 객체도 함께 변경된다는 의미입니다.

자바스크립트에서는 `Object.assign()` 메소드를 사용하여 얕은 복사본을 생성할 수 있습니다.

```js
const theOriginal = {
  someProp: "with a string value",
  anotherProp: {
    withAnotherProp: 1,
    andAnotherProp: true,
  },
};

const theShallowCopy = Object.assign({}, theOriginal);
```

얕은 복사로 생성한 `theShallowCopy`객체의 첫 번째 레벨에 프로퍼티를 추가하거나 변경하더라도, 원본인 `theOriginal`객체에는 영향을 주지 않습니다. 변경이 발생한 얕은 복사본만 영향을 받습니다.

```js
theShallowCopy.aNewProp = "a new value";
console.log(theOriginal.aNewProp); // undefined
```

그러나 깊게 중첩된 프로퍼티를 수정할 때는, 원본과 얕은 복사본 모두 영향을 받게 됩니다.

```js
theShallowCopy.anotherProp.aNewProp = "a new value";
console.log(theOriginal.anotherProp.aNewProp); // a new value
```

이는 깊게 중첩된 프로퍼티가 복사되는 것이 아니라 참조되기 때문입니다.

### 깊은 복사(Deep Copy)

[MDN](https://developer.mozilla.org/en-US/docs/Glossary/Deep_copy)에 따르면,

> 객체의 깊은 복사는 원본 객체와 동일한 참조를 공유하지 않는 복사본입니다. 따라서 원본 또는 복사본 중 하나를 변경하더라도 다른 객체가 변경되지 않도록 보장할 수 있으며, 의도치 않은 원본 또는 복사본 변경을 방지할 수 있습니다.
> 

즉, 깊은 복사는 원본 객체와는 별도의 데이터 셋을 갖는 새로운 객체를 만듭니다. 원본 객체가 변경되어도 복사본은 영향을 받지 않습니다.

객체의 깊은 복사를 만들기 위해서는, `JSON.parse(JSON.stringify(obj))` 메서드를 사용할 수 있습니다.

```js
let theOriginalObject = {
  name: "Mary",
  age: 20,
  address: {
    street: "12 Wall St",
    city: "NY",
    state: "New York",
  },
};

let theDeepCopy = JSON.parse(JSON.stringify(theOriginalObject));
```

만약 `theOriginalObject`의 `address` 프로퍼티를 변경하더라도, `theDeepCopy`의 `address` 속성은 수정되지 않을 것입니다. 왜냐하면 이들은 두 개의 다른 객체이기 때문입니다.

```js
theOriginalObject.address.state = "california";
console.log(theDeepCopy.address.state); //결과: "New York"
```

하지만, 깊은 복사는 [Lodash](https://lodash.com/docs/#cloneDeep)와 같은 서드 파티 라이브러리를 사용하여 생성할 수도 있음을 알아두면 유용합니다.

## `StructuredClone()` 네이티브 함수를 이용해 깊은 복사하기

`structuredClone()`은 자바스크립트 값을 깊은 복사하는 데 사용되는 내장 함수입니다. 이 함수는 [구조화된 복제 알고리즘](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)을 사용합니다. 이전에는 이 알고리즘이 개발자에게 제공되지 않았기 때문에 다른 방법을 사용해야 했습니다. 그러나 최근 업데이트된 [HTML 명세](https://html.spec.whatwg.org/#safe-passing-of-structured-data)는 구조화된 복제 알고리즘을 실행하는 `structuredClone()`이라는 함수를 제공하여 이 문제를 해결하였습니다. 이제 자바스크립트에서 깊은 복사를 수행하는 것이 더욱 쉬워졌습니다.

이제 `structuredClone()`를 사용하여 객체의 깊은 복사를 해봅시다.

```js
const original = {
  site: "https://blog.openreplay.com/",
  published: new Date(),
  socials: [
    {
      name: "twitter",
      url: "https://twitter.com/openreplay",
    },
    {
      name: "youtube",
      url: "shorturl.at/insT6l", //구독!
    },
  ],
};

const copy = structuredClone(original);
```

이것이 전부입니다. `structuredClone()` 함수를 사용하여 객체의 전체/깊은 복사본을 생성하는 방법을 간단히 보여줍니다.

## 왜 `structuredClone()`을 사용해야 할까요?

자바스크립트에서 깊은 복사를 하는 다른 방법들도 효율적인데, `structuredClone()` 함수를 사용하는 것이 중요한 이유는 무엇일까요?

`structuredClone()`은 성능이 뛰어날 뿐만 아니라 모든 주요 브라우저에서 지원되기 때문입니다.

![Can I use structuredClone?](https://i.imgur.com/CFusZDF.png)

출처 [canIUSE](https://caniuse.com/?search=structuredClone)

### `structuredClone()` vs `JSON.parse(JSON.stringify(x))`

`JSON.parse(JSON.stringify(x))`는 `structuredClone()` 이 나오기 전에 깊은 복사를 위해 일반적으로 사용되던 JSON 기반의 해결책이었습니다. 이 방법은 인기가 많아 [V8에서 최적화](https://v8.dev/blog/cost-of-javascript-2019#json)되기도 했습니다. 그러나 `structuredClone()`은 기존의 `JSON.parse(JSON.stringify(x))`의 몇 가지 문제점을 해결합니다.

예를 들면

```js
const Person = {
  name: "John",
  date: new Date("2022-03-25"),
  friends: ["Steve", "Karen"]
}

// JSON.stringify `date`를 문자열로 변환합니다.
const buggyCopy = JSON.parse(JSON.stringify(Person))
```

만약 우리가 `buggyCopy`를 로그에 찍는다면 다음과 같은 결과를 얻을 것입니다.

```js
{
    name: "John",
    date: "2022-03-25T00:00:00.000Z",
    friends: Array(2)
}
```

![Untitled](https://i.imgur.com/LRRbGQM.png)

결과는 예상한 대로 나오지 않았습니다. `date`는 문자열이 아니라 `Date` 객체여야 합니다.

JSON은 객체를 문자열로 인코딩하는 형식입니다. [직렬화(serialization)](https://developer.mozilla.org/en-US/docs/Glossary/Serialization)를 사용하여 객체를 문자열로 변환하고, 역직렬화(deserialization)를 통해 문자열을 객체로 변환합니다.

이것이 `JSON.stringify`가 기본 객체, 배열 및 원시 타입만 다룰 수 있는 이유입니다. 이는 다른 타입과 함께 작동하는 방법을 예측하기 어렵습니다. 예를 들어, `Date`는 `string`으로 변환되고 `Set`은 `{}`로 변환됩니다.

그러나 `structuredClone()`에서는 이와 같은 문제가 발생하지 않습니다.

```js
const Person = {
  name: "John",
  date: new Date("2022-03-25"),
  friends: ["Steve", "Karen"]
}

const bugfreeCopy = structuredClone(Person)
```

만약 우리가 `bugfreeCopy`를 로그에 찍는다면 다음과 같은 결과를 얻을 것입니다.

```js
{
    name: "John",
    date: Object,
    friends: Array(2)
}
```

![Untitled](https://i.imgur.com/veJaL7j.png)

`structuredClone()`을 사용하면, 모든 것이 예상한 대로 작동합니다.

### `structuredClone()` vs `_.cloneDeep`

Lodash의 [cloneDeep](https://lodash.com/docs/4.17.15#cloneDeep) 함수는 자바스크립트에서 값의 깊은 복사를 하는 또 다른 인기 있는 방법입니다. 이 함수는 효율적이고 기대한 대로 작동합니다. 이 [codepen](https://codepen.io/myogeshchavan97/pen/vYyqjxg?editors=0012)을 확인해보세요.

하지만 이 함수를 임포트하면 gzip시 5.3K가 필요하며, Lodash 전체 라이브러리를 사용할 경우 gzip시 25K가 필요합니다. 단순히 깊은 복사를 위해서는 이는 너무 많은 용량입니다. Lodash의 `cloneDeep()` 함수와 같은 서드 파티 라이브러리를 사용하여 문제를 해결하는 데 드는 성능 비용을 고려하면, 더 나은 성능을 제공하는 네이티브 솔루션을 선택하는 것이 좋습니다.

## `structuredClone()`의 한계

`structuredClone()`은 `JSON.stringify()` 메서드의 대부분(모든 것은 아니지만)의 약점을 보완했지만, 몇 가지 주의사항이 있습니다.

- 함수는 복사할 수 없습니다. 함수를 포함하는 객체를 복사하면 `DataCloneError`가 throw 됩니다.

```js
//  에러!
structuredClone({ fn: () => { } })
```

---

- DOM 노드는 복사할 수 없습니다. DOM 노드를 복제하려고 하면 `DataCloneError`가 throw 됩니다.

```js
//  에러!
structuredClone({ element: document.body })
```

---

- 프로퍼티 디스크립터(Property descriptors), 세터(setter), 게터(getter)는 복사할 수 없습니다.

---

- 프로토타입은 복제할 수 없습니다. 구조화된 복제(Structured cloning)는 프로토타입 체인을 복제하지 않습니다. `Class`의 인스턴스를 복사하면 복사된 객체는 더 이상 해당 `Class`의 인스턴스가 아닙니다. 원래 `Class` 대신 일반 객체가 반환됩니다.

```js
class mainClass { 
  greet = 'hello' 
  Method() { /* ... */ }
}
const instanceClass = new mainClass()

const copied = structuredClone(instanceClass)
// 결과: { greet: 'hello' }

copied instanceof instanceClass // false
```

---
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#javascript_types)에서 복사할 수 있는 지원되는 타입의 전체 목록을 확인하세요. 이 목록에 없는 타입은 복사할 수 없습니다.

## 결론

`structuredClone`의 등장으로, 우리는 이제 자바스크립트에서 어렵게 돌아가지 않고도 쉽게 깊은 복사를 수행할 수 있습니다. 가장 좋은 방법은 이미 내장되어 제공되는 솔루션을 사용하여 문제를 해결하는 것입니다. 이렇게 함으로써, 우리는 더 나은 자바스크립트 생태계를 수용할 수 있습니다.

### 추가 자료

- [MDN—StructuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
- [WebDev—StructuredCloned](https://web.dev/structured-clone/)