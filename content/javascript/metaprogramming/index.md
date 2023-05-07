---
title: Proxy, Reflect와 메타프로그래밍
date: '2023-05-07 00:00:00'
author: soobing
tags: javascript metaprogramming proxy reflect
categories: javascript
draft: false
---

ES6에서는 Proxy, Reflect 객체를 통해 메타프로그래밍을 할 수 있습니다. 메타프로그래밍이 무엇인지? 그리고 Proxy와 Reflect에 대해서 알아보도록 하겠습니다.

## Metaprogramming

메타프로그래밍은 프로그램이 자기 자신을 조작할 수 있는 능력을 말합니다. 이를 통해 프로그램은 동적으로 자기 자신을 변화시키거나, 다른 프로그램을 분석하거나, 새로운 코드를 생성할 수 있습니다. 메타프로그래밍을 통해 코드의 유연성과 재사용성을 높일 수 있으며, 런타임에서 객체의 동작을 수정할 수 있어서 더욱 강력한 코드를 작성할 수 있습니다.

### 메타프로그래밍에서 가장 중요한 세 가지 개념

1. **Introspection**
    
    Introspection은 코드가 자기 자신을 검사할 수 있는 능력을 의미합니다. 이를 통해 코드의 내부 구조와 데이터를 검사하거나, 코드의 실행 시점에서 객체의 메소드나 프로퍼티에 접근할 수 있습니다. 자바스크립트에서는 ES6부터 Reflect 객체를 제공하여 Introspection을 지원하고 있습니다.
    
    - ES6 이전(`Object.getOwnPropertyDescriptor`)
        
        ```jsx
        const myObject = {
          myProperty: 'Hello, World!'
        };
        
        // myObject의 myProperty 프로퍼티 값에 접근하기
        console.log(Object.getOwnPropertyDescriptor(myObject, 'myProperty').value); // 'Hello, World!'
        
        // myObject의 프로퍼티를 추가하기
        Object.defineProperty(myObject, 'myNewProperty', {
          value: 'Goodbye, World!',
          writable: true,
          configurable: true,
          enumerable: true
        });
        console.log(myObject.myNewProperty); // 'Goodbye, World!'
        
        // myObject의 프로퍼티를 제거하기
        delete myObject.myNewProperty;
        console.log(myObject); // { myProperty: 'Hello, World!' }
        ```
        
    - ES6 이후(`Reflect`)
        
        ```jsx
        const myObject = {
          myProperty: 'Hello, World!'
        };
        
        // myObject의 myProperty 프로퍼티 값에 접근하기
        console.log(Reflect.get(myObject, 'myProperty')); // 'Hello, World!'
        
        // myObject의 프로퍼티를 추가하기
        Reflect.set(myObject, 'myNewProperty', 'Goodbye, World!');
        console.log(myObject.myNewProperty); // 'Goodbye, World!'
        
        // myObject의 프로퍼티를 제거하기
        Reflect.deleteProperty(myObject, 'myNewProperty');
        console.log(myObject); // { myProperty: 'Hello, World!' }
        ```
        
2. Self-Modification
    
    Self-Modification은 코드가 자기 자신을 수정할 수 있는 능력을 의미합니다. 이를 통해 코드를 동적으로 생성하거나, 객체의 동작을 수정할 수 있습니다. 자바스크립트에서는 이러한 Self-Modification이 보안상 문제가 될 수 있으므로, 보안성을 고려한 코드 작성이 필요합니다.
    
    - 보안상의 이슈로 인해 **`eval()`, `Function 생성자`** 함수의 사용은 권장되지 않으며, 다른 방법을 사용 권장
    
    ```jsx
    // eval
    let x = 1;
    eval('x = 2');
    console.log(x); // 출력값: 2
    
    // Function 생성자
    var myFunction = new Function("a", "b", "return a * b");
    console.log(myFunction(3, 4)); // 출력: 12
    ```
    
3. **Intercession**: “대신 해 주기”를 의미. 메타프로그래밍에서 Intercession은 wrapping, trapping, intercepting과 같은 기법을 사용하여 다른 객체나 코드의 동작을 대신해서 제어하거나 수정할 수 있습니다.
    - ES6 이전 (`Object.defineProperty()`, `Object get(), set()`)
        
        ```jsx
        // Object.defineProperty() 사용
        var sun = {};
        
        Object.defineProperty(sun, 'rises', {
            value: true,
            configurable: false,
            writable: false,
            enumerable: false
        });
        
        console.log('sun rises', sun.rises);
        sun.rises = false;
        console.log('sun rises', sun.rises);
        
        // 객체의 get, set 메소드 사용
        const myObj = {
          name: 'Alice',
          age: 20,
          get: function(prop) {
            console.log(`getting ${prop}`);
            return this[prop];
          },
          set: function(prop, value) {
            console.log(`setting ${prop} to ${value}`);
            this[prop] = value;
          }
        };
        
        myObj.get('name'); // "getting name"
                           // "Alice"
        myObj.set('age', 30); // "setting age to 30"
        console.log(myObj.age); // 30
        ```
        
    - ES6 이후 (Proxy)
        
        ```jsx
        const myObj = {
          name: 'Alice',
          age: 20
        };
        
        const handler = {
          get: function(target, prop) {
            console.log(`getting ${prop}`);
            return target[prop];
          },
          set: function(target, prop, value) {
            console.log(`setting ${prop} to ${value}`);
            target[prop] = value;
          }
        };
        
        const proxyObj = new Proxy(myObj, handler);
        
        proxyObj.name; // "getting name" -> "Alice"
        proxyObj.age = 30; // "setting age to 30"
        console.log(proxyObj.age); // 30
        ```
        

## Proxy

Proxy 라는 단어는 대리인, 대행자, 대리인 역할을 하는 사람 또는 것을 의미합니다. 컴퓨터 과학에서 Proxy 는 다른 객체에 대한 접근을 제어하거나 중개하는 데 사용되는 객체를 가리킵니다. 

```jsx
let proxy = new Proxy(target, handler);
```

ES6에서는 Proxy 객체를 통해 메타프로그래밍을 할 수 있습니다. Proxy는 대상 객체를 감싸고 대상 객체의 동작을 가로채서 다양한 작업을 수행할 수 있습니다. 예를 들어, 객체의 프로퍼티에 접근하거나 값을 변경하기 전에 검증을 수행할 수 있습니다.

### API

```
handler.apply()
handler.construct()
handler.get()
handler.has()
handler.ownKeys()
handler.set()
handler.setPrototypeOf()
handler.getPrototypeOf()
handler.defineProperty()
handler.deleteProperty()
handler.getOwnPropertyDescriptor()
handler.preventExtensions()
handler.isExtensible()
```

### 예시

```jsx
const target = {
  name: "John",
  age: 30
};

const proxy = new Proxy(target, {
  get(target, key) {
    console.log(`Accessing ${key} property`);
    return target[key];
  },
  set(target, key, value) {
    console.log(`Setting ${key} property to ${value}`);
    target[key] = value;
  }
});

console.log(proxy.name); // "Accessing name property" 출력 후 "John" 반환
proxy.age = 35; // "Setting age property to 35" 출력
```

위 코드에서는 Proxy 객체를 생성하여 **`get`**과 **`set`** 메소드를 정의하였습니다. **`get`** 메소드는 프로퍼티에 접근할 때 호출되며, **`set`** 메소드는 프로퍼티 값을 변경할 때 호출됩니다. 이를 이용하여 프로퍼티에 접근하거나 값을 변경할 때 로그를 출력하는 작업을 추가하였습니다.

## Reflect

ES6에서는 Reflect 객체를 통해 Introspection을 할 수 있습니다. Reflect는 자바스크립트의 내장 객체로, 객체와 관련된 메소드를 제공합니다. 예를 들어, **`Reflect.get`** 메소드를 사용하여 객체의 프로퍼티 값을 가져올 수 있습니다.

### API

- Proxy에 의해 추적 가능한 모든 내부 메서드에는 해당하는 메서드가 Reflect에 있으며, 프록시 트랩과 동일한 이름과 인수를 갖습니다.

```jsx
// Reflect object methods

Reflect.apply()
Reflect.construct()
Reflect.get()
Reflect.has()
Reflect.ownKeys()
Reflect.set()
Reflect.setPrototypeOf()
Reflect.defineProperty()
Reflect.deleteProperty()
Reflect.getOwnPropertyDescriptor()
Reflect.getPrototypeOf()
Reflect.isExtensible()
```

### 예시

- 예제1 - Reflect를 통해, 연산자(new, delete 등)를 함수(Reflect.construct, Reflect.deleteProperty 등) 처럼 호출

```jsx
const obj = {
  name: "John",
  age: 30
};

console.log(Reflect.get(obj, "name")); // "John" 출력
```

- 예제2 - get과 set 트랩. 객체로의 읽기/쓰기 작업을 메시지로 보여주며 투명하게(forward) 전달

```jsx
let user = {
  name: "John",
};

user = new Proxy(user, {
  get(target, prop, receiver) {
    alert(`GET ${prop}`);
    return Reflect.get(target, prop, receiver); // (1)
  },
  set(target, prop, val, receiver) {
    alert(`SET ${prop}=${val}`);
    return Reflect.set(target, prop, val, receiver); // (2)
  }
});

let name = user.name; // shows "GET name"
user.name = "Pete"; // shows "SET name=Pete"
```

### Reflect를 사용해야 하는 이유

대부분의 경우에는 Reflect 없이도 동일한 작업을 수행할 수 있습니다. 예를 들어, 속성을 읽는 Reflect.get(target, prop, receiver)은 target[prop]로 대체될 수 있습니다. 

하지만 아래의 3가지 이유로 인해서 Reflect를 사용해야 하고, Proxy와 함께 사용할때 Reflect를 사용하지 않는다면 어떤일이 벌어지는지는 아래 예시 코드로 넣어 두겠습니다. 이는 3번 확장성과 관련있습니다.

1. 표준화된 방식의 코드 작성: Reflect는 ECMAScript 표준의 일부입니다. 따라서 Reflect.get()를 사용하여 코드를 작성하면 코드를 이해하기 쉬우며 유지 보수 및 업그레이드 작업이 용이해집니다.
2. 객체 reflection 관련 기능 지원: Reflect는 객체 리플렉션 관련 기능을 제공하는 유용한 메서드들을 모아 놓은 객체입니다. 따라서 객체의 속성을 접근할 때 Reflect.get()을 사용하면 다른 리플렉션 관련 메서드들과의 일관성을 유지할 수 있습니다.
3. 확장성: Reflect.get()는 프로퍼티에 대한 접근을 가로챌 수 있는 Proxy 객체에서도 사용할 수 있습니다. **Proxy 객체를 사용하여 객체에 대한 커스텀 로직을 추가할 때, Reflect.get()을 사용하면 기존 동작을 유지하면서 커스텀 로직을 추가할 수 있습니다.**

```jsx
let user = {
  _name: "Guest",
  get name() {
    return this._name;
  }
};

let userProxy = new Proxy(user, {
  get(target, prop, receiver) { // receiver = admin
    // return target[prop]; // (*) target = user
    return Reflect.get(target, prop, receiver); // (*)
  }
});

let admin = {
  __proto__: userProxy,
  _name: "Admin"
};

alert(admin.name); // Admin
```

출처:  **[Proxying a getter](https://ko.javascript.info/proxy#ref-652)**

## 결론

메타프로그래밍은 프로그램의 유지보수성과 재사용성을 향상시키는 중요한 기술입니다. ES6에서는 Proxy와 Reflect 객체를 통해 메타프로그래밍을 할 수 있습니다. 이를 이용하여 코드의 동작을 수정하거나 객체의 내부 정보에 접근할 수 있습니다. 이를 이용하여 코드를 더욱 유연하고 강력하게 만들 수 있습니다.

하지만, Self-Modification(자기 자신을 수정하는 것)은 코드의 복잡도를 높이고 디버깅을 어렵게 만드는 등 위험성이 높기 때문에 최대한 피하는 것이 좋습니다. 이에 대한 대안으로는 Proxy와 Reflect 객체를 이용하여 동적으로 객체를 생성하고 조작할 수 있습니다.

이상으로 메타프로그래밍, Proxy, Reflect에 대해 간단히 살펴보았습니다. 이를 이용하여 좀 더 유연하고 강력한 코드를 작성할 수 있습니다.

## 참고자료

- [https://ko.javascript.info/proxy](https://ko.javascript.info/proxy)
- [https://www.freecodecamp.org/news/what-is-metaprogramming-in-javascript-in-english-please/](https://www.freecodecamp.org/news/what-is-metaprogramming-in-javascript-in-english-please/)