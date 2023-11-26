---
title: (번역) 우리들을 위한 디자인 패턴
date: '2023-08-27 00:00:00'
author: soobing
tags: cs design-pattern
categories: cs
draft: false
---
> 원글: https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md

- 역자주: 이 글은 [Kamran Ahmed](https://twitter.com/kamrify)의 글이며, PHP-7 기준으로 작성된 예제 코드를 타입스크립트로 변경하였습니다.

![logo](./design-patterns-for-humans.svg)

---

🎉 디자인 패턴에 대한 초간단 설명입니다! 🎉

누구든지 혼란스럽게 만들 수 있는 주제입니다. 이 글에서는 최대한 *간단한* 방식으로 설명함으로써 당신의 기억 속 (그리고 아마도 제 기억)에 각인시키기 위해 노력할 것입니다.

---

저의 [다른 프로젝트](http://roadmap.sh/)도 확인하고 [트위터](https://twitter.com/kamranahmedse)에서 “안녕”이라고 인사해 보세요.

<!-- 블로그 배포 후 링크 연결 확인 필요 -->
| 생성 패턴 | 구조 패턴 | 행동 패턴 |
| --- | --- | --- |
| [심플 팩토리(Simple Factory)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%8B%AC%ED%94%8C-%ED%8C%A9%ED%86%A0%EB%A6%ACsimple-factory) | [어댑터(Adapter)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%96%B4%EB%8C%91%ED%84%B0adapter) | [책임 연쇄(Chain of Responsibility)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%B1%85%EC%9E%84-%EC%97%B0%EC%87%84chain-of-responsibility) |
| [팩토리 메서드(Factory Method)](https://soobing.github.io/cs/design-patterns-for-humans/#%ED%8C%A9%ED%86%A0%EB%A6%AC-%EB%A9%94%EC%84%9C%EB%93%9Cfactory-method) | [브릿지(Bridge)](https://soobing.github.io/cs/design-patterns-for-humans/#%EB%B8%8C%EB%A6%BF%EC%A7%80bridge) | [명령(Command)](https://soobing.github.io/cs/design-patterns-for-humans/#%EB%AA%85%EB%A0%B9command) |
| [추상 팩토리(Abstract Factory)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%B6%94%EC%83%81-%ED%8C%A9%ED%86%A0%EB%A6%ACabstract-factory) | [컴포지트(Composite)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%BB%B4%ED%8F%AC%EC%A7%80%ED%8A%B8composite) | [반복자(Iterator)](https://soobing.github.io/cs/design-patterns-for-humans/#%EB%B0%98%EB%B3%B5%EC%9E%90iterator) |
| [생성자(Builder)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%83%9D%EC%84%B1%EC%9E%90builder) | [데코레이터(Decorator)](https://soobing.github.io/cs/design-patterns-for-humans/#%EB%8D%B0%EC%BD%94%EB%A0%88%EC%9D%B4%ED%84%B0decorator) | [중재자(Mediator)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%A4%91%EC%9E%AC%EC%9E%90mediator) |
| [프로토타입(Prototype)](https://soobing.github.io/cs/design-patterns-for-humans/#%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85prototype) | [퍼사드(Facade)](https://soobing.github.io/cs/design-patterns-for-humans/#%ED%8D%BC%EC%82%AC%EB%93%9Cfacade) | [메멘토(Memento)](https://soobing.github.io/cs/design-patterns-for-humans/#%EB%A9%94%EB%A9%98%ED%86%A0memento) |
| [싱글톤(Singleton)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%8B%B1%EA%B8%80%ED%86%A4singleton) | [플라이웨이트(Flyweight)](https://soobing.github.io/cs/design-patterns-for-humans/#%ED%94%8C%EB%9D%BC%EC%9D%B4%EC%9B%A8%EC%9D%B4%ED%8A%B8flyweight) | [옵저버(Observer)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%98%B5%EC%A0%80%EB%B2%84observer) |
| | [프록시(Proxy)](https://soobing.github.io/cs/design-patterns-for-humans/#%ED%94%84%EB%A1%9D%EC%8B%9Cproxy) | [방문자(Visitor)](https://soobing.github.io/cs/design-patterns-for-humans/#%EB%B0%A9%EB%AC%B8%EC%9E%90visitor) |
| | | [전략(Strategy)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%A0%84%EB%9E%B5strategy) |
| | | [상태(State)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%83%81%ED%83%9Cstate) |
| | | [템플릿 메서드(Template Method)](https://soobing.github.io/cs/design-patterns-for-humans/#%ED%85%9C%ED%94%8C%EB%A6%BF-%EB%A9%94%EC%84%9C%EB%93%9Ctemplate-method) |

## 소개

디자인 패턴은 반복되는 문제에 대한 해결책이며, **특정 문제를 해결하는 방법에 대한 지침**입니다. 디자인 패턴은 애플리케이션에 연결하고 마법이 일어나기를 기다릴 수 있는 클래스, 패키지 또는 라이브러리가 아닙니다. 오히려 특정 상황에서 특정 문제를 해결하는 방법에 대한 지침입니다. 

> 디자인 패턴은 반복되는 문제에 대한 해결책이며, 특정 문제를 해결하는 방법에 대한 지침입니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서 소프트웨어 디자인 패턴은 소프트웨어 디자인에서 주어진 맥락 내에 주로 발생하는 문제에 대한 일반적이고 재사용 가능한 솔루션입니다. 이는 직접적으로 소스 코드나 기계어로 변환될 수 있는 완성된 디자인이 아닙니다. 다양한 상황에서 활용될 수 있는 문제 해결을 위한 설명이나 템플릿입니다.

### ⚠️ 조심할 것

- 디자인 패턴은 모든 문제에 대한 묘책은 아닙니다.
- 억지로 적용하려고 하지 마세요. 그렇게 하면 나쁜 일이 생길 수 있습니다.
- 디자인 패턴은 **문제의** 해결책이며, **문제를 찾는** 해결책은 아니라는 점을 명심하세요. 따라서 과도한 고민은 하지 마세요.
- 올바른 곳에서 올바른 방식으로 사용된다면 구원자가 될 수 있지만, 그렇지 않으면 코드가 끔찍하게 엉망이 될 수 있습니다.

> 또한 아래의 예제 코드는 타입스크립트 기준으로 작성되었지만, 이는 개념적으로는 동일하기 때문에 이로 인해 읽기를 멈추지 마세요.

### 디자인 패턴 종류

- [생성(Creational)](https://soobing.github.io/cs/design-patterns-for-humans/#%EC%83%9D%EC%84%B1creational-%ED%8C%A8%ED%84%B4)
- [구조(Structural)](https://soobing.github.io/cs/design-patterns-for-humans/#%EA%B5%AC%EC%A1%B0structural-%ED%8C%A8%ED%84%B4)
- [행동(Behavioral)](https://soobing.github.io/cs/design-patterns-for-humans/#%ED%96%89%EB%8F%99behavioral-%ED%8C%A8%ED%84%B4)

## 생성(Creational) 패턴

일반적인 용어로 설명하면 다음과 같습니다.

> 생성 패턴은 객체 또는 관련된 객체 그룹을 인스턴스화하는 방법에 초점을 맞춥니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서 생성 패턴은 객체 생성 메커니즘을 다루는 디자인 패턴으로, 상황에 적합한 방식으로 객체를 생성하려고 합니다. 객체 생성의 기본 형태는 설계에 문제를 일으킬 수 있거나 설계에 복잡성을 더할 수 있습니다. 생성 패턴은 이러한 객체 생성을 어떻게든 제어함으로써 이 문제를 해결합니다.
- [Simple Factory](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-simple-factory)
- [Factory Method](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-factory-method)
- [Abstract Factory](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-abstract-factory)
- [Builder](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-builder)
- [Prototype](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-prototype)
- [Singleton](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-singleton)

### 🏠 심플 팩토리(Simple Factory)

실생활에 비유한 예시는 다음과 같습니다.

> 집을 짓는 중에 문이 필요하다고 가정해보세요. 집 안에서 목수 옷을 입고 나무, 접착제, 못과 문을 만드는 데 필요한 모든 도구를 가져와 직접 문을 만들 수도 있지만, 간단히 공장에 전화하여 만들어진 문을 받아 설치할 수도 있습니다. 그렇게 하면 아무것도 배울 필요가 없으면서 문의 제작과정에서 발생하는 혼란을 다룰 필요가 없습니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 심플 팩토리는 클라이언트에게 인스턴스화 로직을 노출하지 않고 클라이언트용 인스턴스를 생성합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 객체지향 프로그래밍(OOP)에서 팩토리는 다른 객체를 생성하기 위한 객체입니다. 형식적으로 팩토리는 다양한 프로토타입 또는 클래스에서 어떤 메소드 호출로 “새로운” 객체를 반환하는 함수 또는 메소드입니다.

**프로그래밍 예시**

우선 문(door) 인터페이스와 구현체를 가지고 있습니다.

```ts
interface Door {
  getWidth(): number;
  getHeight(): number;
}

class WoodenDoor implements Door {
  protected width: number;
  protected height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  getWidth(): number {
    return this.width;
  }

  getHeight(): number {
    return this.height;
  }
}
```

그런 다음 문(door)을 만들고 반환하는 팩토리가 있습니다.

```ts
class DoorFactory {
  public static makeDoor(width: number, height: number): Door {
    return new WoodenDoor(width, height);
  }
}
```

그리고 다음과 같이 사용할 수 있습니다.

```ts
// 100x200의 문을 만들어줘
const door: Door = DoorFactory.makeDoor(100, 200);

console.log('Width: ' + door.getWidth());
console.log('Height: ' + door.getHeight());

// 50x100의 문을 만들어줘
const door2: Door = DoorFactory.makeDoor(50, 100);
```

**언제 사용하나요?**

객체를 생성할 때 단순히 몇 가지 할당이 아니라 일부 로직을 포함하는 경우, 모든 곳에서 동일한 코드를 반복하는 대신 전용 팩토리에 넣는 것이 좋습니다.

### 🏭 팩토리 메서드(Factory Method)

실생활에 비유한 예시는 다음과 같습니다.

> 인사 담당자의 경우를 생각해보세요. 각 포지션에 대해 한 사람이 모든 면접을 진행하는 것은 불가능합니다. 채용 공고에 따라 면접 절차를 결정하고 다른 사람들에게 위임해야 합니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 팩토리 메서드는 자식 클래스에 인스턴스화 로직을 위임하는 방법을 제공합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 클래스 기반 프로그래밍에서 팩토리 메서드 패턴은 생성 패턴 중 하나로, 생성할 객체의 정확한 클래스를 지정하지 않고도 팩터리 메서드를 사용하여 객체를 생성하는 문제를 다룹니다. 이는 생성자를 호출하는 대신 인터페이스에서 명세되고 자식 클래스에서 구현되기도 하고, 부모 클래스에서 구현되어 자식 클래스에서 선택적으로 재정의된 팩토리 메서드를 호출하여 객체를 생성함으로써 수행됩니다.

**프로그래밍 예시**

위의 인사 담당자 예시를 살펴보겠습니다. 우선, 우리는 면접관 인터페이스와 그에 대한 몇 가지 구현체들을 가지고 있습니다.

```ts
interface Interviewer {
  askQuestions(): void;
}

class Developer implements Interviewer {
  askQuestions() {
    console.log('Asking about design patterns!');
  }
}

class CommunityExecutive implements Interviewer {
  askQuestions() {
    console.log('Asking about community building');
  }
}
```

`HiringManager`를 생성해 보겠습니다.

```ts
abstract class HiringManager {
  // Factory method
  protected abstract makeInterviewer(): Interviewer;

  public takeInterview() {
    const interviewer = this.makeInterviewer();
    interviewer.askQuestions();
  }
}
```

이제 어떤 자식 클래스든 이를 상속받고 필요한 면접관을 제공할 수 있습니다.

```ts
class DevelopmentManager extends HiringManager {
  protected makeInterviewer(): Interviewer {
    return new Developer();
  }
}

class MarketingManager extends HiringManager {
  protected makeInterviewer(): Interviewer {
    return new CommunityExecutive();
  }
}
```

그리고 다음과 같이 사용할 수 있습니다.

```ts
const devManager = new DevelopmentManager();
devManager.takeInterview(); // 출력: Asking about design patterns!

const marketingManager = new MarketingManager();
marketingManager.takeInterview(); // 출력: Asking about community building.
```

**언제 사용하나요?**
클래스에 일부 일반적인 처리가 있지만 필수 자식 클래스가 런타임에 동적으로 결정될 때 유용합니다. 다른 말로 하면, 클라이언트가 정확히 어떤 자식 클래스가 필요한지 모를 때 사용됩니다.

### 🔨 추상 팩토리(Abstract Factory)

실생활에 비유한 예시는 다음과 같습니다.

> Simple Factory에서 문(door) 예시를 확장해보겠습니다. 필요에 따라 나무 문 가게에서 나무 문을, 철문 가게에서 철문을, PVC 관련 가게에서 PVC 문을 구할 수 있습니다. 또한, 문을 설치하기 위해 다른 전문 기술을 가진 사람이 필요할 수 있습니다. 예를 들어 나무 문에는 목수, 철문에는 용접사가 필요합니다. 보시다시피 이제 문들 간에 의존성이 존재하며, 나무 문에는 목수가 필요하고 철문에는 용접사가 필요합니다.
> 

일반적인 용어로 설명하면 다음과 같습니다.

> 팩토리들의 팩토리; 구체적인 클래스를 지정하지 않고 개별적이지만 관련된/의존적인 팩토리들을 그룹화 하는 팩토리입니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 추상 팩토리 패턴은 구체적인 클래스를 지정하지 않고 공통 테마를 가진 개별 팩토리들을 캡슐화하는 방법을 제공합니다.

**프로그래밍 예시**

위의 문 예시를 옮겨봅니다. 먼저, **`Door`** 인터페이스와 일부 구현체를 가지고 있습니다.

```ts
interface Door {
  getDescription(): void;
}

class WoodenDoor implements Door {
  getDescription() {
    console.log('I am a wooden door');
  }
}

class IronDoor implements Door {
  getDescription() {
    console.log('I am an iron door');
  }
}
```

그런 다음 각 문 유형에 대한 설치 전문가가 있습니다.

```ts
interface DoorFittingExpert {
  getDescription(): void;
}

class Carpenter implements DoorFittingExpert {
  getDescription() {
    console.log('I can only fit wooden doors');
  }
}

class Welder implements DoorFittingExpert {
  getDescription() {
    console.log('I can only fit iron doors');
  }
}
```

이제 추상 팩토리를 가지고 관련된 객체들의 그룹을 만들 수 있습니다. 즉, 나무 문 팩토리는 나무 문과 목수를 생성하고, 철문 팩토리는 철문과 용접사를 생성합니다.

```ts
interface DoorFactory {
  makeDoor(): Door;
  makeFittingExpert(): DoorFittingExpert;
}

// 나무 문과 목수를 얻을 수 있는 나무 문 팩토리
class WoodenDoorFactory implements DoorFactory {
  makeDoor(): Door {
    return new WoodenDoor();
  }

  makeFittingExpert(): DoorFittingExpert {
    return new Carpenter();
  }
}

// 철문과 용접사를 얻을 수 있는 철문 팩토리
class IronDoorFactory implements DoorFactory {
  makeDoor(): Door {
    return new IronDoor();
  }

  makeFittingExpert(): DoorFittingExpert {
    return new Welder();
  }
}
```

그리고 다음과 같이 사용할 수 있습니다.

```ts
const woodenFactory: DoorFactory = new WoodenDoorFactory();

const door: Door = woodenFactory.makeDoor();
const expert: DoorFittingExpert = woodenFactory.makeFittingExpert();

door.getDescription();  // 출력: I am a wooden door
expert.getDescription(); // 출력: I can only fit wooden doors

// Iron Factory도 마찬가지 입니다.
const ironFactory: DoorFactory = new IronDoorFactory();

const door: Door = ironFactory.makeDoor();
const expert: DoorFittingExpert = ironFactory.makeFittingExpert();

door.getDescription();  // 출력: I am an iron door
expert.getDescription(); // 출력: I can only fit iron doors
```

보시다시피, 나무 문 팩토리는 `목수`와 `나무 문`을 캡슐화했으며, 철문 팩토리는 `철문`과 `용접사`를 캡슐화했습니다. 이를 통해 생성된 각 문에 대해 잘못된 설치 전문가가 배정되지 않도록 도와주었습니다.

**언제 사용하나요?**

상호 의존성이 있고, 복잡한 생성 로직이 있는 경우 사용합니다.

### 👷 생성자(Builder)

실생활에 비유한 예시는 다음과 같습니다.

> 하디스(Hardee's)에 가서 특정한 메뉴를 주문한다고 상상해보세요. 예를 들어, "빅 하디"를 주문하고, 그들은 아무 질문 없이 그것을 건네줍니다. 이는 간단한 팩토리의 예입니다. 그러나 생성 로직에 더 많은 단계가 포함될 수 있는 경우도 있습니다. 예를 들어, 커스텀된 서브웨이 메뉴를 원한다면 이에 대한 여러 가지 옵션(e.g 어떤 빵을 원하시나요? 어떤 종류의 소스를 원하시나요? 어떤 치즈를 원하시나요? 등등)을 가지고 있습니다. 이와 같은 경우에 빌더 패턴이 도움이 됩니다.

* 역자주: 하디스(Hardee's)는 미국을 비롯한 여러 나라에서 운영되고 있는 패스트푸드 프랜차이즈 입니다. "빅 하디"는 하디스에서 제공하는 햄버거 중 하나의 상표명입니다. 이는 하디스의 대표적인 제품 중 하나로, 크기가 크고 맛있는 햄버거 입니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 생성자의 오염을 방지하면서 객체의 다양한 버전을 생성할 수 있게 해주는 패턴입니다. 한 객체에 여러 가지 버전이 있을 때, 또는 객체의 생성에 많은 단계가 포함될 때 유용합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 빌더 패턴은 점층적 생성자 안티 패턴(telescoping constructor anti-pattern)을 해결하기 위한 의도로 개발된 객체 생성 패턴입니다.

점층적 생성자 안티 패턴이 무엇인지 설명을 조금 추가하겠습니다. 우리는 한 번쯤 아래와 같은 생성자를 보았을 것입니다.

```ts
constructor(size: string, cheese: boolean = true, pepperoni: boolean = true, tomato: boolean = false, lettuce: boolean = true) {
  // 생성자의 내용
}
```

보시다시피, 생성자의 매개변수 개수가 금세 많아질 수 있으며, 매개변수의 배열을 이해하기 어려워질 수 있습니다. 또한, 이러한 매개변수 목록은 앞으로 더 많은 옵션을 추가하고자 할 경우 계속해서 늘어날 수 있습니다. 이를 점층적 생성자(Telescoping Constructor) 안티 패턴이라고 합니다.

* 역자주: 점층적 생성자 패턴은 생성자에 매우 많은 매개변수가 포함되어 가독성이 떨어지고, 매개변수의 순서를 기억해야 하며, 새로운 옵션이 추가될 때마다 생성자를 수정해야 하는 번거로움이 발생합니다. 그래서 코드의 복잡성을 증가시키고 유지 보수를 어렵게 만들므로 안티 패턴입니다.

**프로그래밍 예시**

이에 대한 올바른 대안은 빌더 패턴을 사용하는 것입니다. 먼저 우리가 만들고자 하는 버거가 있습니다.

```ts
class Burger {
  protected size: number;
  protected cheese: boolean = false;
  protected pepperoni: boolean = false;
  protected lettuce: boolean = false;
  protected tomato: boolean = false;

  constructor(builder: BurgerBuilder) {
    this.size = builder.size;
    this.cheese = builder.cheese;
    this.pepperoni = builder.pepperoni;
    this.lettuce = builder.lettuce;
    this.tomato = builder.tomato;
  }
}
```

그리고 빌더가 있습니다.

```ts
class BurgerBuilder {
  public size: number;
  public cheese: boolean = false;
  public pepperoni: boolean = false;
  public lettuce: boolean = false;
  public tomato: boolean = false;

  constructor(size: number) {
    this.size = size;
  }

  addPepperoni(): BurgerBuilder {
    this.pepperoni = true;
    return this;
  }

  addLettuce(): BurgerBuilder {
    this.lettuce = true;
    return this;
  }

  addCheese(): BurgerBuilder {
    this.cheese = true;
    return this;
  }

  addTomato(): BurgerBuilder {
    this.tomato = true;
    return this;
  }

  build(): Burger {
    return new Burger(this);
  }
}
```

그리고 다음과 같이 사용될 수 있습니다.

```ts
const burger = new BurgerBuilder(14)
  .addPepperoni()
  .addLettuce()
  .addTomato()
  .build();
```

**언제 사용하나요?**

객체의 여러 변종이 있을 수 있고 점층적 생성자를 피하기 위해 사용합니다. 팩토리 패턴과의 주요 차이점은, 팩토리 패턴은 생성이 한 단계인 경우에 사용되는 반면, 빌더 패턴은 생성이 여러 단계인 경우에 사용됩니다.

### 🐑 프로토타입(Prototype)

실생활에 비유한 예시는 다음과 같습니다.

> 복제된 양! 돌리(dolly)를 기억하시나요? 자세한 내용은 다루지 않겠지만, 여기서 중요한 점은 복제에 관한 것입니다. 

일반적인 용어로 설명하면 다음과 같습니다.

> 기존 객체의 복제 기반으로 객체를 생성합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 프로토타입 패턴은 소프트웨어 개발에서의 창조적인 디자인 패턴입니다. 생성할 객체의 유형이 원형 인스턴스에 의해 결정되며, 이를 복제하여 새로운 객체를 생성합니다.

즉, 처음부터 객체를 만들고 설정하는 수고를 겪는 대신, 기존 객체의 복사본을 만들고 필요에 따라 수정할 수 있게 해주는 것입니다.

**프로그래밍 예시**

타입스크립트에서는 `Object.create`를 사용하여 간단히 수행할 수 있습니다.

```ts
class Sheep {
  protected name: string;
  protected category: string;

  constructor(name: string, category: string = 'Mountain Sheep') {
    this.name = name;
    this.category = category;
  }

  setName(name: string): void {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setCategory(category: string): void {
    this.category = category;
  }

  getCategory(): string {
    return this.category;
  }
}
```

아래와 같이 복제할 수 있습니다.

```ts
const original: Sheep = new Sheep('Jolly');
console.log(original.getName()); // Jolly
console.log(original.getCategory()); // Mountain Sheep

// 필요한 부분을 복제하고 수정하세요.
const cloned: Sheep = Object.create(original);
cloned.setName('Dolly');
console.log(cloned.getName()); // Dolly
console.log(cloned.getCategory()); // Mountain Sheep
```

**언제 사용하나요?**

기존 객체와 유사한 객체가 필요하거나 복제에 비해 생성 비용이 많이 드는 경우에 사용합니다.

### 💍 싱글톤(Singleton)

실생활에 비유한 예시는 다음과 같습니다.

> 한 나라에는 한 번에 하나의 대통령만 존재할 수 있습니다. 업무를 할 때마다 동일한 대통령이 행동에 나서야 합니다. 여기에서 대통령은 싱글톤입니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 특정 클래스의 객체가 한 번만 생성되도록 보장합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서 싱글톤 패턴은 클래스의 인스턴스화를 한 개의 객체로 제한하는 소프트웨어 디자인 패턴입니다. 이는 시스템 전체에서 작업을 조정하는 데 정확히 하나의 객체가 필요한 경우에 유용합니다.

싱글톤 패턴은 실제로 안티 패턴으로 간주되며, 과도한 사용은 피해야 합니다. 반드시 나쁜 것은 아니며 일부 유효한 사용 사례가 있을 수 있지만, 애플리케이션에서 전역 상태를 도입하고 한 곳에서 변경하면 다른 영역에 영향을 미칠 수 있고 디버그하기가 매우 어려워질 수 있으므로 주의해야 합니다. 또 다른 문제는 코드의 결합도를 높이며, 싱글톤을 목킹(Mocking)하는 것이 어려울 수 있다는 것입니다.

**프로그래밍 예시**

싱글톤을 생성하려면 생성자를 비공개로 만들고, 복제와 확장을 비활성화하고, 인스턴스를 저장할 정적 변수를 생성합니다.

```ts
class President {
  private static instance: President;

  private constructor() {
    // 생성자 숨기기
  }

  public static getInstance(): President {
    if (!President.instance) {
      President.instance = new President();
    }

    return President.instance;
  }

  private clone(): void {
    // 복제 비활성화
  }

  private wakeup(): void {
    // 데이터 역직렬화(unserialize) 비활성화
  }
}
```

그런 다음 아래와 같이 사용합니다.

```ts
const president1: President = President.getInstance();
const president2: President = President.getInstance();

console.log(president1 === president2); // true
```

## 구조(Structural) 패턴

일반적인 용어로 설명하면 다음과 같습니다.

> 구조 패턴은 주로 객체의 구성에 관련되어 있으며, 즉 엔티티가 어떻게 사용될 수 있는지에 관한 것입니다. 또 다른 설명으로는, "소프트웨어 구성요소를 어떻게 만들 것인가?"에 대한 답을 하는데 도움이 됩니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서, 구조적 디자인 패턴은 엔터티 간의 관계를 구현하기 위한 간단한 방법을 파악해냄으로써 디자인하는 것을 쉽게 만드는 디자인 패턴입니다.
- [Adapter](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-adapter)
- [Bridge](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-bridge)
- [Composite](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-composite)
- [Decorator](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-decorator)
- [Facade](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-facade)
- [Flyweight](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-flyweight)
- [Proxy](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-proxy)

### 🔌 어댑터(Adapter)

실생활에 비유한 예시는 다음과 같습니다.

> 메모리 카드에 몇 장의 사진이 저장되어 있고 이를 컴퓨터로 전송해야 합니다. 메모리 카드를 컴퓨터에 연결하려면, 컴퓨터 포트와 호환되는 어댑터가 필요합니다. 이 경우 카드 리더기는 어댑터입니다. 또 다른 예로 유명한 전원 어댑터가 있습니다. 3구 플러그는 2구 콘센트에 직접 연결할 수 없으며, 전원 어댑터를 사용하여 2구 콘센트와 호환되도록 만들어야 합니다. 또한, 한 사람이 말한 단어를 다른 사람에게 번역해주는 번역가를 예로 들 수 있습니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 어댑터 패턴을 사용하면 호환되지 않는 객체를 어댑터로 감싸 다른 클래스와 호환되도록 할 수 있습니다.


위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서 어댑터 패턴은 기존 클래스의 인터페이스를 다른 인터페이스로 사용할 수 있도록 하는 소프트웨어 디자인 패턴입니다. 소스 코드를 수정하지 않고 기존 클래스가 다른 클래스와 함께 작동하도록 만들 때 자주 사용됩니다.

**프로그래밍 예시**

사냥꾼이 사자를 사냥하는 게임을 생각해보겠습니다.

먼저 모든 유형의 사자가 구현해야 하는 `Lion` 인터페이스가 있습니다.

```ts
interface Lion {
  roar(): void;
}

class AfricanLion implements Lion {
  roar(): void {
  }
}

class AsianLion implements Lion {
  roar(): void {
  }
}
```

그리고 사냥꾼은 `Lion` 인터페이스의 어떤 구현체든 사냥을 기대합니다.

```ts
class Hunter {
  hunt(lion: Lion): void {
    lion.roar();
  }
}
```

이제 사냥꾼이 사냥할 수 있도록 게임에 `WildDog`라는 새로운 동물인 개를 추가해야 한다고 가정해 보겠습니다. 그러나 개는 다른 인터페이스를 가지고 있기 때문에 직접 추가할 수는 없습니다. 사냥꾼과 호환되도록 하려면 호환 어댑터를 생성해야 합니다.

```ts
// 이것은 게임에 추가해야 합니다.
class WildDog {
  bark(): void {
  }
}

// 게임과 호환되도록 wild dog 주위에 어댑터를 만듭니다.
class WildDogAdapter implements Lion {
  protected dog: WildDog;

  constructor(dog: WildDog) {
    this.dog = dog;
  }

  roar(): void {
    this.dog.bark();
  }
}
```

이제 `WildDogAdapter`를 사용하여 `WildDog`를 게임에서 사용할 수 있습니다.

```ts
const wildDog = new WildDog();
const wildDogAdapter = new WildDogAdapter(wildDog);

const hunter = new Hunter();
hunter.hunt(wildDogAdapter);
```

### 🚡 브릿지(Bridge)

실생활에 비유한 예시는 다음과 같습니다.

> 웹사이트에 다양한 페이지가 있고 사용자가 테마를 변경할 수 있게 해야한다고 가정해보세요. 어떻게 할 것인가요? 각 테마마다 페이지별로 복사본을 만들 것인가요? 또는 별도의 분리된 테마를 만들고 사용자의 기본 설정에 따라 테마를 따로 로드할 것인가요? 브릿지 패턴은 두 번째 방법을 수행할 수 있게 해줍니다.

![åBridge](https://cloud.githubusercontent.com/assets/11269635/23065293/33b7aea0-f515-11e6-983f-98823c9845ee.png)

일반적인 용어로 설명하면 다음과 같습니다.

> 브릿지 패턴은 상속보다 구성을 선호합니다. 구현 세부 정보는 다른 계층 구조를 가진 별도의 객체로 푸시(push)됩니다.
* 역자주: 웹 페이지는 페이지의 계층 구조에 따라 달라질 수 있으며, 테마는 사용자의 선택에 따라 달라질 수 있습니다. 브릿지 패턴을 사용하면, 웹 페이지의 렌더링 방식을 담당하는 계층 구조와 테마를 담당하는 별도의 계층 구조를 분리할 수 있습니다

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 브릿지 패턴은 소프트웨어 공학에서 사용되는 디자인 패턴으로, "추상화를 구현에서 분리하여 두 개가 독립적으로 변경될 수 있게 하는" 것을 의미합니다.

**프로그래밍 예시**

위의 WebPage 예제를 번역하면 다음과 같습니다. 여기에서 우리는 `WebPage` 계층구조를 가지고 있습니다.

```ts
interface WebPage {
    theme: Theme;
    getContent(): string;
}

class About implements WebPage {
    protected theme: Theme;

    constructor(theme: Theme) {
        this.theme = theme;
    }

    getContent(): string {
        return `About page in ${this.theme.getColor()}`;
    }
}

class Careers implements WebPage {
    protected theme: Theme;

    constructor(theme: Theme) {
        this.theme = theme;
    }

    getContent(): string {
        return `Careers page in ${this.theme.getColor()}`;
    }
}
```

그리고 별도의 테마 계층구조 입니다.

```ts
interface Theme {
    getColor(): string;
}

class DarkTheme implements Theme {
    getColor(): string {
        return 'Dark Black';
    }
}

class LightTheme implements Theme {
    getColor(): string {
        return 'Off white';
    }
}

class AquaTheme implements Theme {
    getColor(): string {
        return 'Light blue';
    }
}
```

그리고 두 계층 전부 입니다.

```ts
const darkTheme = new DarkTheme();

const about = new About(darkTheme);
const careers = new Careers(darkTheme);

console.log(about.getContent());  // "About page in Dark Black"
console.log(careers.getContent()); // "Careers page in Dark Black"
```

### 🌿 컴포지트(Composite)

실생활에 비유한 예시는 다음과 같습니다.

> 모든 조직은 직원으로 구성되어 있습니다. 모든 직원들은 같은 특징을 가지고 있습니다. 즉, 급여를 받고, 일정한 책임을 가지며, 보고를 할 수도 있고 아닐 수도 있으며, 부하 직원이 있을 수도 있고 없을 수도 있습니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 컴포지트 패턴을 사용하면 클라이언트가 개별 객체를 동일한 방식으로 처리할 수 있습니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서, 컴포지트 패턴은 분할 디자인 패턴입니다. 컴포지트 패턴은 객체의 그룹이 단일 객체의 인스턴스와 같은 방식으로 처리되는 것을 설명합니다. 컴포지트의 목적은 객체를 트리 구조로 "구성"하여 부분-전체 계층을 나타내는 것입니다. 컴포지트 패턴을 구현하면 클라이언트가 개별 객체와 구성을 동일하게 처리할 수 있습니다.

**프로그래밍 예시**

위의 직원 예제를 기반으로 합니다. 여기에서는 다양한 유형의 직원들이 있습니다.

```ts
interface Employee {
    name: string;
    salary: number;
    roles: string[];

    getName(): string;
    getSalary(): number;
    getRoles(): string[];
}

class Developer implements Employee {
    protected salary: number;
    protected name: string;
    protected roles: string[] = [];

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    getName(): string {
        return this.name;
    }

    setSalary(salary: number): void {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }

    getRoles(): string[] {
        return this.roles;
    }
}

class Designer implements Employee {
    protected salary: number;
    protected name: string;
    protected roles: string[] = [];

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    getName(): string {
        return this.name;
    }

    setSalary(salary: number): void {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }

    getRoles(): string[] {
        return this.roles;
    }
}

class Designer implements Employee {
    protected salary: number;
    protected name: string;
    protected roles: string[] = [];

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    getName(): string {
        return this.name;
    }

    setSalary(salary: number): void {
        this.salary = salary;
    }

    getSalary(): number {
        return this.salary;
    }

    getRoles(): string[] {
        return this.roles;
    }
}

class Organization {
    protected employees: Employee[] = [];

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    getNetSalaries(): number {
        let netSalary = 0;

        for (const employee of this.employees) {
            netSalary += employee.getSalary();
        }

        return netSalary;
    }
}
```

그 다음, 여러 유형의 직원으로 구성된 조직이 있습니다.

```ts
class Organization {
    protected employees: Employee[] = [];

    addEmployee(employee: Employee): void {
        this.employees.push(employee);
    }

    getNetSalaries(): number {
        let netSalary = 0;

        for (const employee of this.employees) {
            netSalary += employee.getSalary();
        }

        return netSalary;
    }
}
```

그리고 다음과 같이 사용될 수 있습니다.

```ts
// 직원 준비하기
let john = new Developer('John Doe', 12000);
let jane = new Designer('Jane Doe', 15000);

//조직에 추가하기
let organization = new Organization();
organization.addEmployee(john);
organization.addEmployee(jane);

console.log("Net salaries: " + organization.getNetSalaries());  // 출력: Net Salaries: 27000
```

### ☕ 데코레이터(Decorator)

실생활에 비유한 예시는 다음과 같습니다.

> 당신이 다양한 서비스를 제공하는 자동차 서비스 매장을 운영한다고 상상해보세요. 이제 청구할 요금을 어떻게 계산할까요? 하나의 서비스를 선택하고 제공된 서비스의 가격을 동적으로 계속 추가하여 최종 비용을 얻습니다. 여기서 각 서비스 유형은 데코레이터입니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 데코레이터 패턴은 데코레이터 클래스의 객체에 래핑함으로써, 런타임에 객체의 동작을 동적으로 변경할 수 있게 합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 객체 지향 프로그래밍에서 데코레이터 패턴은 동일한 클래스의 다른 객체의 동작에 영향을 주지 않고, 정적 또는 동적으로 개별 객체에 동작을 추가할 수 있게 하는 디자인 패턴입니다. 데코레이터 패턴은 종종 단일 책임 원칙을 준수하는 데 유용하며, 이를 통해 고유한 관심 영역이 있는 클래스 간에 기능을 나눌 수 있습니다.

**프로그래밍 예시**

예를 들어 커피를 생각해봅시다. 먼저 커피 인터페이스를 구현하는 단순한 커피 클래스가 있습니다.

```ts
interface Coffee {
    getCost(): number;
    getDescription(): string;
}

class SimpleCoffee implements Coffee {
    getCost(): number {
        return 10;
    }

    getDescription(): string {
        return 'Simple coffee';
    }
}
```

필요한 경우 옵션을 수정할 수 있도록 코드를 확장 가능하게 만들고 싶습니다. 몇 가지 추가 기능(데코레이터)을 만들어 보겠습니다.

```ts
class MilkCoffee implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getCost(): number {
        return this.coffee.getCost() + 2;
    }

    getDescription(): string {
        return this.coffee.getDescription() + ', milk';
    }
}

class WhipCoffee implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getCost(): number {
        return this.coffee.getCost() + 5;
    }

    getDescription(): string {
        return this.coffee.getDescription() + ', whip';
    }
}

class VanillaCoffee implements Coffee {
    protected coffee: Coffee;

    constructor(coffee: Coffee) {
        this.coffee = coffee;
    }

    getCost(): number {
        return this.coffee.getCost() + 3;
    }

    getDescription(): string {
        return this.coffee.getDescription() + ', vanilla';
    }
}
```

이제 커피를 만들어 봅시다.

```ts
let someCoffee: Coffee = new SimpleCoffee();
console.log(someCoffee.getCost()); // 10
console.log(someCoffee.getDescription()); // Simple Coffee

someCoffee = new MilkCoffee(someCoffee);
console.log(someCoffee.getCost()); // 12
console.log(someCoffee.getDescription()); // Simple Coffee, milk

someCoffee = new WhipCoffee(someCoffee);
console.log(someCoffee.getCost()); // 17
console.log(someCoffee.getDescription()); // Simple Coffee, milk, whip

someCoffee = new VanillaCoffee(someCoffee);
console.log(someCoffee.getCost()); // 20
console.log(someCoffee.getDescription()); // Simple Coffee, milk, whip, vanilla
```

### 📦 퍼사드(Facade)

실생활에 비유한 예시는 다음과 같습니다.

> 컴퓨터를 어떻게 켜나요? "전원 버튼을 누르세요"라고 말할 것입니다! 이것은 당신이 컴퓨터가 외부에서 제공하는 간단한 인터페이스를 사용하기 때문에 이렇게 생각하는 것입니다. 내부적으로는 이를 가능하게 하기 위해 많은 작업을 수행해야 합니다. 이러한 복잡한 하위 시스템에 대한 간단한 인터페이스는 퍼사드입니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 퍼사드 패턴은 복잡한 하위 시스템에 대한 단순화된 인터페이스를 제공합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 퍼사드는 클래스 라이브러리와 같은 더 큰 코드 본문에 대한 단순화된 인터페이스를 제공하는 객체입니다.

**프로그래밍 예시**

위의 컴퓨터 예시를 가져와 봅시다. 여기에 컴퓨터 클래스가 있습니다.

```ts
class Computer
{
    public function getElectricShock()
    {
        echo "Ouch!";
    }

    public function makeSound()
    {
        echo "Beep beep!";
    }

    public function showLoadingScreen()
    {
        echo "Loading..";
    }

    public function bam()
    {
        echo "Ready to be used!";
    }

    public function closeEverything()
    {
        echo "Bup bup bup buzzzz!";
    }

    public function sooth()
    {
        echo "Zzzzz";
    }

    public function pullCurrent()
    {
        echo "Haaah!";
    }
}
```

여기에 퍼사드가 있습니다.

```ts
class ComputerFacade {
    protected computer: Computer;

    constructor(computer: Computer) {
        this.computer = computer;
    }

    turnOn(): void {
        this.computer.getElectricShock();
        this.computer.makeSound();
        this.computer.showLoadingScreen();
        this.computer.bam();
    }

    turnOff(): void {
        this.computer.closeEverything();
        this.computer.pullCurrent();
        this.computer.sooth();
    }
}
```

이제 퍼사드를 사용합니다.

```ts
const computer = new ComputerFacade(new Computer());
computer.turnOn(); // Ouch! Beep beep! Loading.. Ready to be used!
computer.turnOff(); // Bup bup buzzz! Haah! Zzzzz
```

### 🍃 플라이웨이트(Flyweight)

실생활에 비유한 예시는 다음과 같습니다.

> 어떤 노점에서 신선한 차를 마신 적이 있나요? 그들은 종종 여러분이 요구한 한 잔 이상을 만들고 나머지는 다른 고객을 위해 남겨두어 가스 등과 같은 자원을 절약합니다. 플라이웨이트 패턴은 공유에 관한 것입니다.


일반적인 용어로 설명하면 다음과 같습니다.

> 유사한 객체와 최대한 많은 것을 공유함으로써 메모리 사용량이나 계산 비용을 최소화하는 데 사용됩니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 컴퓨터 프로그래밍에서 플라이웨이트는 소프트웨어 디자인 패턴입니다. 플라이웨이트는 다른 유사한 객체와 최대한 많은 데이터를 공유하여 메모리 사용을 최소화하는 객체입니다. 이는 단순한 반복 표현이 허용할 수 없는 양의 메모리를 사용할 때 객체를 대량으로 사용하는 방법입니다.

**프로그래밍 예시**

위의 차 예시를 번역하면. 우리는 차 종류와 차 메이커를 가지고 있습니다.

```ts
// 캐시될 모든 것은 플라이웨이트 입니다.
// 차 종류들도 플라이웨이트가 될 것입니다.
class KarakTea {}

// 공장 역할을 하며 차를 저장합니다.
class TeaMaker {
    protected availableTea: Map<string, KarakTea> = new Map();

    public make(preference: string): KarakTea {
        if (!this.availableTea.has(preference)) {
            this.availableTea.set(preference, new KarakTea());
        }

        return this.availableTea.get(preference)!;
    }
}
```

그런 다음 주문을 받고 서비스를 제공하는 `TeaShop`이 있습니다.

```ts
class TeaShop {
    protected orders: Map<number, KarakTea> = new Map();
    protected teaMaker: TeaMaker;

    constructor(teaMaker: TeaMaker) {
        this.teaMaker = teaMaker;
    }

    public takeOrder(teaType: string, table: number): void {
        this.orders.set(table, this.teaMaker.make(teaType));
    }

    public serve(): void {
        this.orders.forEach((tea, table) => {
            console.log(`Serving tea to table## ${table}`);
        });
    }
}
```

그리고 아래와 같이 사용할 수 있습니다.

```ts
const teaMaker = new TeaMaker();
const shop = new TeaShop(teaMaker);

shop.takeOrder('less sugar', 1);
shop.takeOrder('more milk', 2);
shop.takeOrder('without sugar', 5);

shop.serve();
// 1번 테이블에 차 제공
// 2번 테이블에 차 제공
// 5번 테이블에 차 제공
```

### 🎱 프록시(Proxy)

실생활에 비유한 예시는 다음과 같습니다.

> 문을 통과하기 위해 출입 카드를 사용한 적이 있습니까? 문을 여는 데에는 여러 가지 방법이 있습니다. 즉, 출입 카드를 사용하거나 보안 검색대를 우회하는 버튼을 눌러 문을 열 수 있습니다. 문의 주요 기능은 여는 것이지만, 그 위에 어떤 기능을 추가하기 위해 프록시가 추가되었습니다. 아래의 예제 코드를 통해 더 자세히 설명하겠습니다.

일반적인 용어로 설명하면 다음과 같습니다.

> **프록시 패턴을 사용하여 하나의 클래스가 다른 클래스의 기능을 나타냅니다.**

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 가장 일반적인 형태의 프록시는 다른 것에 대한 인터페이스 역할을 하는 클래스입니다. 프록시는 클라이언트가 뒷단에서 실제 객체에 접근하기 위해 호출되는 래퍼 또는 에이전트 객체입니다. 프록시의 사용은 단순히 실제 객체로의 전달만을 의미할 수도 있고, 추가적인 로직을 제공할 수도 있습니다. 프록시는 추가 기능을 제공할 수 있습니다. 예를 들면 실제 객체에 대한 작업이 리소스를 많이 사용할 때 캐싱을 하거나, 실제 객체에 대한 연산이 호출되기 전에 사전 조건을 확인하는 등.

**프로그래밍 예시**

위의 보안 문 예제를 가져와봅시다. 먼저 문의 인터페이스와 문의 구현이 있습니다.

```ts
interface Door {
    open(): void;
    close(): void;
}

class LabDoor implements Door {
    open(): void {
        console.log("Opening lab door");
    }

    close(): void {
        console.log("Closing the lab door");
    }
}
```

그런 다음 우리가 원하는 모든 문을 보호하기 위한 프록시가 있습니다.

```ts
class SecuredDoor implements Door {
    protected door: Door;

    constructor(door: Door) {
        this.door = door;
    }

    open(password: string): void {
        if (this.authenticate(password)) {
            this.door.open();
        } else {
            console.log("Big no! It ain't possible.");
        }
    }

    authenticate(password: string): boolean {
        return password === '$ecr@t';
    }

    close(): void {
        this.door.close();
    }
}
```

그리고 이것이 사용되는 방법은 다음과 같습니다.

```ts
const door = new SecuredDoor(new LabDoor());
door.open('invalid'); // Big no! It ain't possible.

door.open('$ecr@t'); // Opening lab door
door.close(); // Closing lab door
```

또 다른 예는 일종의 데이터 매퍼(data-mapper) 구현일 것입니다. 예를 들어, 최근에 이 패턴을 사용하여 MongoDB를 위한 ODM(Object Data Mapper)을 만들었는데, 여기서 mongo 클래스 주위에 프록시를 작성하면서 마법의 메서드 `__call()`을 활용했습니다. 모든 메서드 호출은 원래의 mongo 클래스로 프록시되었고 검색된 결과는 그대로 반환되었지만, `find`나 `findOne`의 경우 데이터가 필요한 클래스 객체에 매핑되었고 `Cursor` 대신 객체가 반환되었습니다.

## 행동(Behavioral) 패턴

일반적인 용어로 설명하면 다음과 같습니다.

> 이것은 객체 간의 책임 할당과 관련이 있습니다. 구조 패턴과 다른 점은 구조만 지정하는 것이 아니라, 이들 사이의 메시지 전달/통신 패턴도 간략하게 설명한다는 것입니다. 다른 말로 하면, "소프트웨어 구성 요소에서 어떻게 동작을 실행할 것인가?"라는 질문에 답하는 데 도움이 됩니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서, 행동 디자인 패턴은 객체 간의 공통적인 통신 패턴을 식별하고 이러한 패턴을 구현하는 설계 패턴입니다. 이렇게 함으로써, 이러한 패턴은 통신을 수행하는 데 있어 유연성을 증가시킵니다.
- [Chain of Responsibility](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-chain-of-responsibility)
- [Command](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-command)
- [Iterator](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-iterator)
- [Mediator](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-mediator)
- [Memento](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-memento)
- [Observer](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-observer)
- [Visitor](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-visitor)
- [Strategy](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-strategy)
- [State](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-state)
- [Template Method](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-template-method)

### 🔗 책임 연쇄(Chain of Responsibility)

실생활에 비유한 예시는 다음과 같습니다.

> 예를 들어, 계좌에 세 가지 결제 방법 (A, B, C)이 설정되어 있고 각각 다른 금액이 있습니다. A는 100 달러, B는 300 달러, C는 1000 달러를 가지고 있습니다. 그리고 결제 선호 순서는 A, B, C 순입니다. 210 달러 의 물건을 구매하려고 합니다. 책임 연쇄를 사용하면, 먼저 A 계좌가 구매를 할 수 있는지 확인하고 가능하다면 구매가 이루어지고 연쇄는 중단됩니다. 그렇지 않다면, 요청은 B 계좌로 이동하여 금액을 확인하고, 구매가 가능하면 연쇄가 중단됩니다. 가능하지 않다면 적절한 핸들러를 찾을 때까지 요청이 계속 전달됩니다. 여기서 A, B, C는 연쇄의 링크이며 전체 현상은 책임 연쇄입니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 이것은 객체의 연쇄를 구축하는 데 도움을 줍니다. 요청은 한쪽 끝에서 들어와 객체에서 객체로 계속 이동하여 적절한 핸들러를 찾을 때까지 계속 이동합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 객체 지향 설계에서, 책임 연쇄 패턴은 명령 객체의 원천(source)과 일련의 처리 객체로 구성된 디자인 패턴입니다. 각 처리 객체에는 그것이 처리할 수 있는 명령 객체의 유형을 정의하는 로직이 포함되어 있으며, 나머지는 연쇄의 다음 처리 객체로 전달됩니다.

**프로그래밍 예시**

위의 계좌 예제를 번역하면, 먼저 계좌들을 연결하는 로직을 가진 기본 계좌와 일부 계좌들이 있습니다.

```ts
abstract class Account {
    protected successor?: Account;
    protected balance: number;

    public setNext(account: Account): void {
        this.successor = account;
    }

    public pay(amountToPay: number): void {
        if (this.canPay(amountToPay)) {
            console.log(`Paid ${amountToPay} using ${this.constructor.name}`);
        } else if (this.successor) {
            console.log(`Cannot pay using ${this.constructor.name}. Proceeding ..`);
            this.successor.pay(amountToPay);
        } else {
            throw new Error('None of the accounts have enough balance');
        }
    }

    public canPay(amount: number): boolean {
        return this.balance >= amount;
    }
}

class Bank extends Account {
    constructor(balance: number) {
        super();
        this.balance = balance;
    }
}

class Paypal extends Account {
    constructor(balance: number) {
        super();
        this.balance = balance;
    }
}

class Bitcoin extends Account {
    constructor(balance: number) {
        super();
        this.balance = balance;
    }
}
```

이제 위에서 정의한 링크들 (즉, 은행, 페이팔, 비트코인)을 사용하여 연쇄를 준비합시다.

```ts
// 아래와 같은 연쇄를 준비합니다.
//      bank->paypal->bitcoin
//
// 첫 번째 우선순위는 은행입니다.
//      은행이 지불할 수 없으면 페이팔
//      페이팔이 지불할 수 없으면 비트코인

const bank = new Bank(100);       // 잔액이 100인 은행
const paypal = new Paypal(200);   // 잔액이 200인 페이팔
const bitcoin = new Bitcoin(300); // 잔액이 300인 비트코인

bank.setNext(paypal);
paypal.setNext(bitcoin);

// 첫 번째 우선순위인 은행을 사용하여 지불하려고 시도합니다.
bank.pay(259);

// 출력은 다음과 같습니다.
// ==============
// Cannot pay using bank. Proceeding ..
// Cannot pay using paypal. Proceeding ..
// Paid 259 using Bitcoin!
```

### 👮 명령(Command)

실생활에 비유한 예시는 다음과 같습니다.

> 일반적인 예는 레스토랑에서 음식을 주문하는 것입니다. 당신(클라이언트)은 웨이터(호출자)에게 음식(명령)을 가져다 달라고 요청하고 웨이터는 단순히 무엇을 어떻게 요리할지 아는 요리사(수신자)에게 요청을 간단히 전달합니다. 또 다른 예로는 당신(클라이언트)이 리모컨(호출자)을 사용하여 텔레비전(수신기)을 켜는 것(명령)이 있습니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 객체 내의 동작들을 캡슐화할 수 있게 해줍니다. 이 패턴의 핵심 아이디어는 클라이언트와 수신자를 분리하는 수단을 제공하는 것입니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 객체 지향 프로그래밍에서, 명령 패턴은 특정 동작을 수행하거나 나중에 이벤트를 트리거하는 데 필요한 모든 정보를 캡슐화하기 위해 객체를 사용하는 행동 디자인 패턴입니다. 이 정보에는 메서드 이름, 메서드를 소유한 객체 및 메서드 매개변수의 값이 포함됩니다.

**프로그래밍 예시**

우선 수행할 수 있는 모든 작업을 구현한 수신자가 있습니다.

```ts
// 수신자
class Bulb {
    public turnOn(): void {
        console.log("전구가 켜졌습니다.");
    }

    public turnOff(): void {
        console.log("어둠!");
    }
}
```

그 다음 각 명령이 구현할 인터페이스가 있고 일련의 명령들이 있습니다.

```ts
interface Command {
    execute(): void;
    undo(): void;
    redo(): void;
}

// 명령
class TurnOn implements Command {
    protected bulb: Bulb;

    constructor(bulb: Bulb) {
        this.bulb = bulb;
    }

    public execute(): void {
        this.bulb.turnOn();
    }

    public undo(): void {
        this.bulb.turnOff();
    }

    public redo(): void {
        this.execute();
    }
}

class TurnOff implements Command {
    protected bulb: Bulb;

    constructor(bulb: Bulb) {
        this.bulb = bulb;
    }

    public execute(): void {
        this.bulb.turnOff();
    }

    public undo(): void {
        this.bulb.turnOn();
    }

    public redo(): void {
        this.execute();
    }
}
```

그 다음 클라이언트와 상호 작용하여 모든 명령을 처리할 `Invoker`가 있습니다.

```ts
// 호출자
class RemoteControl {
    public submit(command: Command): void {
        command.execute();
    }
}
```

마지막으로 클라이언트에서 어떻게 사용할 수 있는지 살펴봅니다.

```ts
const bulb = new Bulb();

const turnOn = new TurnOn(bulb);
const turnOff = new TurnOff(bulb);

const remote = new RemoteControl();
remote.submit(turnOn); // 전구가 켜졌습니다!
remote.submit(turnOff); // 어둠!
```

명령 패턴은 트랜잭션 기반 시스템을 구현하는 데에도 사용될 수 있습니다. 명령을 실행하자마자 명령의 기록을 계속 유지합니다. 최종 명령이 성공적으로 실행되면 모두 좋지만, 그렇지 않으면 기록을 반복하고 모든 실행된 명령에 대해 `undo`를 계속 실행합니다.

### ➿ 반복자(Iterator)

실생활에 비유한 예시는 다음과 같습니다.

> 오래된 라디오 카세트는 반복자의 좋은 예시가 될 수 있습니다. 사용자는 어떤 채널에서 시작하여 다음 또는 이전 버튼을 사용하여 해당 채널을 이동할 수 있습니다. 또는 다음 및 이전 버튼을 눌러 연속 채널을 이동할 수 있는 MP3 플레이어나 TV 세트의 예를 들어 보겠습니다. 다시 말해서, 이것들 모두 해당 채널, 노래 또는 라디오 방송국을 반복할 수 있는 인터페이스를 제공합니다.


일반적인 용어로 설명하면 다음과 같습니다.

> 객체의 요소에 접근하는 방법을 제시하면서 내부 구조를 드러내지 않습니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 객체 지향 프로그래밍에서 반복자 패턴은 반복자를 사용하여 컨테이너를 탐색하고 컨테이너의 요소에 접근하는 디자인 패턴입니다. 반복자 패턴은 알고리즘과 컨테이너를 분리합니다. 어떤 경우에는 알고리즘이 반드시 컨테이너별로 다르므로 분리할 수 없습니다.

**프로그래밍 예시**

위의 라디오 방송국 예를 번역합니다. 우선 `RadioStation`이 있습니다.

```ts
class RadioStation {
    protected frequency: number;

    constructor(frequency: number) {
        this.frequency = frequency;
    }

    public getFrequency(): number {
        return this.frequency;
    }
}
```

그 다음에 우리는 반복자가 있습니다.

```ts
class StationList implements Iterable<RadioStation> {
    protected stations: RadioStation[] = [];
    protected counter = 0;

    public addStation(station: RadioStation): void {
        this.stations.push(station);
    }

    public removeStation(toRemove: RadioStation): void {
        const toRemoveFrequency = toRemove.getFrequency();
        this.stations = this.stations.filter(station => station.getFrequency() !== toRemoveFrequency);
    }

    public [Symbol.iterator](): Iterator<RadioStation> {
        return {
            next: () => {
                if (this.counter < this.stations.length) {
                    return { done: false, value: this.stations[this.counter++] };
                } else {
                    this.counter = 0;  // counter를 재설정합니다.
                    return { done: true, value: null };
                }
            }
        };
    }
}
```

그리고 다음과 같이 사용할 수 있습니다.

```ts
const stationList = new StationList();

stationList.addStation(new RadioStation(89));
stationList.addStation(new RadioStation(101));
stationList.addStation(new RadioStation(102));
stationList.addStation(new RadioStation(103.2));

for (let station of stationList) {
    console.log(station.getFrequency());
}

stationList.removeStation(new RadioStation(89));  // 89 채널을 제거합니다.
```

### 👽 중재자(Mediator)

실생활에 비유한 예시는 다음과 같습니다.

> 일반적인 예로는 휴대폰으로 누군가와 통화할 때, 여러분과 그 사람 사이에 네트워크 제공자가 있어서 대화가 직접 전송되는 것이 아니라 네트워크 공급자를 통해 이루어집니다. 이 경우 네트워크 공급자는 중재자입니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 중재자 패턴은 두 객체(동료) 간의 상호 작용을 제어하기 위해 서드 파티 객체(중재자)를 추가합니다. 이는 서로 통신하는 클래스 간의 결합도를 줄이는 데 도움을 줍니다. 왜냐하면 서로의 구현에 대한 지식이 필요 없기 때문입니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 엔지니어링에서 중재자 패턴은 여러 객체가 상호 작용하는 방식을 캡슐화하는 객체를 정의합니다. 이 패턴은 프로그램의 실행 동작을 변경할 수 있는 방식으로 인해 행동 패턴으로 간주됩니다.

**프로그래밍 예시**

다음은 사용자(동료)가 서로 메시지를 보내는 채팅방(중재자)의 가장 간단한 예입니다.

먼저 중재자인 채팅방이 있습니다.

```ts
interface ChatRoomMediator {
    showMessage(user: User, message: string): void;
}

// 중재자
class ChatRoom implements ChatRoomMediator {
    public showMessage(user: User, message: string): void {
        const time = new Date().toLocaleString();
        const sender = user.getName();

        console.log(`${time} [${sender}]: ${message}`);
    }
}
```

그런 다음 사용자(동료)가 있습니다.

```ts
class User {
    protected name: string;
    protected chatMediator: ChatRoomMediator;

    constructor(name: string, chatMediator: ChatRoomMediator) {
        this.name = name;
        this.chatMediator = chatMediator;
    }

    public getName(): string {
        return this.name;
    }

    public send(message: string): void {
        this.chatMediator.showMessage(this, message);
    }
}
```

그리고 사용방법은 아래와 같습니다.

```ts
const mediator = new ChatRoom();

const john = new User('John Doe', mediator);
const jane = new User('Jane Doe', mediator);

john.send('Hi there!');
jane.send('Hey!');

// 출력 결과는 다음과 같습니다.
// 2023-08-22 11:58:00 [John Doe]: Hi there!
// 2023-08-22 11:58:00 [Jane Doe]: Hey!
```

### 💾 메멘토(Memento)

실생활에 비유한 예시는 다음과 같습니다.

> 계산기(발원자, originator)의 예를 들어봅시다. 계산을 수행할 때마다 마지막 계산이 메모리(메멘토)에 저장되어서, 원한다면 이를 다시 가져와 일부 액션 버튼(관리자)을 사용하여 복원할 수 있습니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 메멘토 패턴은 객체의 현재 상태를 나중에 원활하게 복원할 수 있도록 캡처하고 저장하는 것에 관한 것입니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 메멘토 패턴은 객체를 이전 상태로 복원(롤백을 통한 되돌리기)하는 기능을 제공하는 소프트웨어 디자인 패턴입니다.

이는 주로 되돌리기 기능을 제공해야 할 때 유용합니다.

**프로그래밍 예시**

시간이 지나면서 상태를 계속 저장하고 원한다면 복원할 수 있는 텍스트 편집기의 예를 들어보겠습니다.

먼저, 편집기 상태를 저장할 수 있는 메멘토 객체가 있습니다.

```ts
class EditorMemento {
    protected content: string;

    constructor(content: string) {
        this.content = content;
    }

    public getContent(): string {
        return this.content;
    }
}
```

그런 다음 메멘토 객체를 사용할 편집기(발원자, originator)가 있습니다.

```ts
class Editor {
    protected content: string = '';

    public type(words: string): void {
        this.content = this.content + ' ' + words;
    }

    public getContent(): string {
        return this.content;
    }

    public save(): EditorMemento {
        return new EditorMemento(this.content);
    }

    public restore(memento: EditorMemento): void {
        this.content = memento.getContent();
    }
}
```

그리고 그것은 다음과 같이 사용될 수 있습니다.

```ts
const editor = new Editor();

// 몇 가지 내용을 입력합니다.
editor.type('이것은 첫 번째 문장입니다.');
editor.type('이것은 두 번째입니다.');

// 복원할 상태를 저장합니다: 이것은 첫 번째 문장입니다. 이것은 두 번째입니다.
const saved = editor.save();

// 더 많은 내용을 입력합니다.
editor.type('그리고 이것은 세 번째입니다.');

// 저장하기 전의 내용을 출력합니다.
console.log(editor.getContent()); // 이것은 첫 번째 문장입니다. 이것은 두 번째입니다. 그리고 이것은 세 번째입니다.

// 마지막으로 저장된 상태로 복원합니다.
editor.restore(saved);

console.log(editor.getContent()); // 이것은 첫 번째 문장입니다. 이것은 두 번째입니다.
```

### 😎 옵저버(Observer)

실생활에 비유한 예시는 다음과 같습니다.

> 좋은 예는 구직자들이 어떤 채용 공고 사이트에 가입하고 일치하는 채용 기회가 있을 때마다 알림을 받는 경우입니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 객체 간의 의존성을 정의하여 객체의 상태가 변경될 때마다 모든 종속 객체에 알림을 보냅니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 옵저버 패턴은 객체(주최)가 그 종속성(관찰자)의 목록을 유지하고 상태 변화가 있을 때마다 주로 그들의 메서드 중 하나를 호출함으로써 자동으로 알림을 보내는 소프트웨어 디자인 패턴입니다.

**프로그래밍 예시**

위의 예제를 번역해 보겠습니다. 먼저 채용공고에 대한 알림이 필요한 구직자가 있습니다.

```ts
class JobPost {
    protected title: string;

    constructor(title: string) {
        this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }
}

class JobSeeker implements Observer {
    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    public onJobPosted(job: JobPost): void {
        // 구인 게시물과 관련된 작업을 수행합니다.
        console.log('Hi ' + this.name + '! New job posted: ' + job.getTitle());
    }
}
```

그런 다음 구직자가 구독할 채용 게시물이 있습니다.

```ts
class EmploymentAgency implements Observable {
    protected observers: Observer[] = [];

    protected notify(jobPosting: JobPost): void {
        for (const observer of this.observers) {
            observer.onJobPosted(jobPosting);
        }
    }

    public attach(observer: Observer): void {
        this.observers.push(observer);
    }

    public addJob(jobPosting: JobPost): void {
        this.notify(jobPosting);
    }
}
```

그런 다음 다음과 같이 사용할 수 있습니다.

```ts
// 구독자 생성
const johnDoe = new JobSeeker('John Doe');
const janeDoe = new JobSeeker('Jane Doe');

// 발행자 생성 및 구독자 첨부
const jobPostings = new EmploymentAgency();
jobPostings.attach(johnDoe);
jobPostings.attach(janeDoe);

// 새로운 직업을 추가하고 구독자가 알림을 받는지 확인합니다.
jobPostings.addJob(new JobPost('Software Engineer'));

// 출력
// Hi John Doe! New job posted: Software Engineer
// Hi Jane Doe! New job posted: Software Engineer
```

### 🏃 방문자(Visitor)

실생활에 비유한 예시는 다음과 같습니다.

> 누군가 두바이에 방문한다고 생각해 보세요. 두바이에 입국하기 위한 방법(예: 비자)이 필요합니다. 도착 후에는 특별한 허가나 추가 작업 없이 두바이의 어떤 장소든 방문할 수 있습니다. 그들에게 장소를 알려주기만 하면 방문할 수 있습니다. 방문자 패턴은 이를 가능하게 해줍니다. 그들이 추가 작업 없이 최대한 많은 곳을 방문할 수 있도록 장소를 추가하는 데 도움을 줍니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 방문자 패턴을 사용하면 객체를 수정하지 않고도 객체에 추가 작업을 수행할 수 있습니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 객체 지향 프로그래밍 및 소프트웨어 엔지니어링에서 방문자 디자인 패턴은 알고리즘을 그것이 작동하는 객체 구조로부터 분리하는 방법입니다. 이러한 분리의 실질적인 효과는 기존 객체 구조를 수정하지 않고도 기존 객체 구조에 새로운 작업을 추가할 수 있다는 것입니다. 이것은 개방/폐쇄 원칙을 따르는 방법 중 하나입니다.

**프로그래밍 예시**

동물원 시뮬레이션의 예를 들어보겠습니다. 여기에는 여러 가지 동물이 있으며 그들에게 소리를 내게 해야 합니다. 이를 방문자 패턴으로 번역해보겠습니다.

```ts
// 방문 대상
interface Animal {
    accept(operation: AnimalOperation): void;
}

// 방문자
interface AnimalOperation {
    visitMonkey(monkey: Monkey): void;
    visitLion(lion: Lion): void;
    visitDolphin(dolphin: Dolphin): void;
}
```

그런 다음 동물에 대한 구현이 있습니다.

```ts
class Monkey implements Animal {
    shout(): void {
        console.log('Ooh oo aa aa!');
    }

    accept(operation: AnimalOperation): void {
        operation.visitMonkey(this);
    }
}

class Lion implements Animal {
    roar(): void {
        console.log('Roaaar!');
    }

    accept(operation: AnimalOperation): void {
        operation.visitLion(this);
    }
}

class Dolphin implements Animal {
    speak(): void {
        console.log('Tuut tuttu tuutt!');
    }

    accept(operation: AnimalOperation): void {
        operation.visitDolphin(this);
    }
}
```

방문자를 구현해봅시다.

```ts
class Speak implements AnimalOperation {
    visitMonkey(monkey: Monkey): void {
        monkey.shout();
    }

    visitLion(lion: Lion): void {
        lion.roar();
    }

    visitDolphin(dolphin: Dolphin): void {
        dolphin.speak();
    }
}
```

그런 다음 이렇게 사용할 수 있습니다.

```ts
const monkey = new Monkey();
const lion = new Lion();
const dolphin = new Dolphin();

const speak = new Speak();

monkey.accept(speak);    // Ooh oo aa aa!
lion.accept(speak);      // Roaaar!
dolphin.accept(speak);   // Tuut tuttu tuutt!
```

동물들에게 상속 계층을 갖게 함으로써 간단히 이 작업을 수행할 수 있었지만, 그러면 동물에 새로운 작업을 추가해야 할 때마다 동물들을 수정해야 했을 것입니다. 하지만 이제 그것들을 변경할 필요가 없습니다. 예를 들어 동물에 점프 행동을 추가하라는 요청을 받았다고 가정하면, 새 방문자를 생성하여 간단히 추가할 수 있습니다.

```ts
class Jump implements AnimalOperation {
    visitMonkey(monkey: Monkey): void {
        console.log('Jumped 20 feet high! on to the tree!');
    }

    visitLion(lion: Lion): void {
        console.log('Jumped 7 feet! Back on the ground!');
    }

    visitDolphin(dolphin: Dolphin): void {
        console.log('Walked on water a little and disappeared');
    }
}
```

다음은 사용하는 방법 입니다.

```ts
const jump = new Jump();

const monkey = new Monkey();
const lion = new Lion();
const dolphin = new Dolphin();

monkey.accept(speak);   // Ooh oo aa aa!
monkey.accept(jump);    // Jumped 20 feet high! on to the tree!

lion.accept(speak);     // Roaaar!
lion.accept(jump);      // Jumped 7 feet! Back on the ground!

dolphin.accept(speak);  // Tuut tutt tuutt!
dolphin.accept(jump);   // Walked on water a little and disappeared
```

### 💡 전략(Strategy)

실생활에 비유한 예시는 다음과 같습니다.

> 정렬에서 예를 들어 보면, 버블 정렬을 구현했지만 데이터가 커지면서 버블 정렬이 매우 느려졌습니다. 이 문제를 해결하기 위해 퀵 정렬을 구현했습니다. 그러나 퀵 정렬 알고리즘이 큰 데이터 세트에는 잘 작동했지만 작은 데이터 세트에는 매우 느렸습니다. 이 문제를 해결하기 위해 작은 데이터 세트에는 버블 정렬을 사용하고 큰 데이터 세트에는 퀵 정렬을 사용하는 전략을 구현했습니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 전략 패턴은 상황에 따라 알고리즘 또는 전략을 전환할 수 있게 해줍니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 컴퓨터 프로그래밍에서 전략 패턴(정책 패턴이라고도 함)은 런타임에 알고리즘의 동작을 선택할 수 있게 하는 행동 디자인 패턴입니다.

**프로그래밍 예시**

위의 예를 번역하면, 먼저 우리는 전략 인터페이스와 다양한 전략 구현을 가지고 있습니다.

```ts
interface SortStrategy {
    sort(dataset: number[]): number[];
}

class BubbleSortStrategy implements SortStrategy {
    sort(dataset: number[]): number[] {
        console.log("버블 정렬을 사용하여 정렬합니다.");

        // 정렬을 수행합니다.
        return dataset;
    }
}

class QuickSortStrategy implements SortStrategy {
    sort(dataset: number[]): number[] {
        console.log("퀵 정렬을 사용하여 정렬합니다.");

        // 정렬을 수행합니다.
        return dataset;
    }
}
```

그리고 나서, 어떤 전략이든 사용할 클라이언트를 가지고 있습니다.

```ts
class Sorter {
    protected sorterSmall: SortStrategy;
    protected sorterBig: SortStrategy;

    constructor(sorterSmall: SortStrategy, sorterBig: SortStrategy) {
        this.sorterSmall = sorterSmall;
        this.sorterBig = sorterBig;
    }

    sort(dataset: number[]): number[] {
        if (dataset.length > 5) {
            return this.sorterBig.sort(dataset);
        } else {
            return this.sorterSmall.sort(dataset);
        }
    }
}
```

그리고 이는 다음과 같이 사용될 수 있습니다.

```ts
const smalldataset: number[] = [1, 3, 4, 2];
const bigdataset: number[] = [1, 4, 3, 2, 8, 10, 5, 6, 9, 7];

const sorter = new Sorter(new BubbleSortStrategy(), new QuickSortStrategy());

sorter.sort(smalldataset); // 출력: 버블 정렬을 사용하여 정렬합니다.
sorter.sort(bigdataset); // 출력: 퀵 정렬을 사용하여 정렬합니다.
```

### 💢 상태(State)

실생활에 비유한 예시는 다음과 같습니다.

> 그림 그리기 애플리케이션을 사용한다고 상상해보세요. 그림을 그리기 위해 페인트 브러시를 선택합니다. 이제 브러시는 선택된 색상에 따라 동작을 변경합니다. 즉, 빨간색을 선택하면 빨간색으로 그려지고 파란색이면 파란색으로 그려집니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 상태가 변경될 때 클래스의 동작을 변경하게 해줍니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 상태 패턴은 객체 지향 방식으로 상태를 구현하는 행동 소프트웨어 디자인 패턴입니다. 상태 패턴을 사용하면 각 개별 상태를 상태 패턴 인터페이스의 파생 클래스로 구현하고 패턴의 슈퍼클래스에 정의한 메서드를 호출하여 상태 전환을 구현합니다. 상태 패턴은 패턴의 인터페이스에 정의된 메서드의 호출을 통해 현재 전략을 전환할 수 있는 전략 패턴으로 해석될 수 있습니다.

**프로그래밍 예시**

전화기를 예로 들어보겠습니다. 먼저 우리는 상태 인터페이스와 일부 상태 구현체를 가지고 있습니다.

```ts
interface PhoneState {
    pickUp(): PhoneState;
    hangUp(): PhoneState;
    dial(): PhoneState;
}

// 상태 구현
class PhoneStateIdle implements PhoneState {
    pickUp(): PhoneState {
        return new PhoneStatePickedUp();
    }
    hangUp(): PhoneState {
        throw new Error("이미 대기 상태입니다");
    }
    dial(): PhoneState {
        throw new Error("대기 상태에서는 다이얼 할 수 없습니다");
    }
}

class PhoneStatePickedUp implements PhoneState {
    pickUp(): PhoneState {
        throw new Error("이미 수화기를 들었습니다");
    }
    hangUp(): PhoneState {
        return new PhoneStateIdle();
    }
    dial(): PhoneState {
        return new PhoneStateCalling();
    }
}

class PhoneStateCalling implements PhoneState {
    pickUp(): PhoneState {
        throw new Error("이미 수화기를 들었습니다");
    }
    hangUp(): PhoneState {
        return new PhoneStateIdle();
    }
    dial(): PhoneState {
        throw new Error("이미 다이얼 중입니다");
    }
}
```

그 다음에는 다양한 동작 호출에 따라 상태를 변경하는 Phone 클래스가 있습니다.

```ts
class Phone {
    private state: PhoneState;

    constructor() {
        this.state = new PhoneStateIdle();
    }
    pickUp() {
        this.state = this.state.pickUp();
    }
    hangUp() {
        this.state = this.state.hangUp();
    }
    dial() {
        this.state = this.state.dial();
    }
}
```

그리고 나서 아래와 같이 사용할 수 있으며, 관련된 상태 메서드를 호출합니다.

```ts
const phone = new Phone();

phone.pickUp();
phone.dial();
```

### 📒 템플릿 메서드(Template Method)

실생활에 비유한 예시는 다음과 같습니다.

> 집을 짓고 있다고 가정해 보겠습니다. 건축에 필요한 단계는 다음과 같습니다.
> - 집의 기반을 준비
> - 벽 세우기
> - 지붕 설치
> - 다른 층 추가

> 이 단계의 순서는 절대로 변경될 수 없습니다. 즉, 벽 등을 짓기 전에 지붕을 설치할 수 없습니다. 그러나 각 단계는 수정될 수 있습니다. 예를 들어, 벽은 나무나 폴리에스터, 돌로 만들 수 있습니다.

일반적인 용어로 설명하면 다음과 같습니다.

> 템플릿 메서드는 특정 알고리즘이 어떻게 수행될 수 있는지에 대한 구조를 정의하지만, 그 단계의 구현은 자식 클래스로 위임합니다.

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 엔지니어링에서 템플릿 메서드 패턴은 연산에서의 알고리즘의 프로그램 구조를 정의하고 일부 단계를 자식 클래스로 위임하는 동작 디자인 패턴입니다. 이를 통해 알고리즘의 구조를 변경하지 않고 특정 단계를 재정의할 수 있습니다.

**프로그래밍 예시**

테스트, 린트, 빌드, 빌드 보고서(예: 코드 커버리지 보고서, 린팅 보고서 등) 생성 및 테스트 서버에 앱을 배포하는 데 도움이 되는 빌드 도구가 있다고 상상해보십시오.

먼저, 빌드 알고리즘의 구조를 정의하는 기본 클래스가 있습니다.

```ts
abstract class Builder {

    // 템플릿 메서드
    public build(): void {
        this.test();
        this.lint();
        this.assemble();
        this.deploy();
    }

    abstract test(): void;
    abstract lint(): void;
    abstract assemble(): void;
    abstract deploy(): void;
}
```

그런 다음 구현을 할 수 있습니다.

```ts
class AndroidBuilder extends Builder {
    test(): void {
        console.log('Running android tests');
    }

    lint(): void {
        console.log('Linting the android code');
    }

    assemble(): void {
        console.log('Assembling the android build');
    }

    deploy(): void {
        console.log('Deploying android build to server');
    }
}

class IosBuilder extends Builder {
    test(): void {
        console.log('Running ios tests');
    }

    lint(): void {
        console.log('Linting the ios code');
    }

    assemble(): void {
        console.log('Assembling the ios build');
    }

    deploy(): void {
        console.log('Deploying ios build to server');
    }
}
```

그리고 나서 다음과 같이 사용할 수 있습니다.

```ts
const androidBuilder = new AndroidBuilder();
androidBuilder.build();

// 출력:
// Running android tests
// Linting the android code
// Assembling the android build
// Deploying android build to server

const iosBuilder = new IosBuilder();
iosBuilder.build();

// 출력:
// Running ios tests
// Linting the ios code
// Assembling the ios build
// Deploying ios build to server
```

## 🚦 마무리

이로써 글이 마무리되었습니다. 계속해서 이 내용을 개선할 예정이므로, 이 저장소를 주시/별표하면 나중에 다시 방문하기 유용할 것입니다. 또한, 아키텍처 패턴에 대해서도 같은 내용을 작성할 계획이 있으니 기대해 주세요.

## License
- [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)