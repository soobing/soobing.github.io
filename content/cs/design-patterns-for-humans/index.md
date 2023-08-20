---
title: 인간을 위한 디자인 패턴
date: '2023-08-22 00:00:00'
author: soobing
tags: cs design-pattern
categories: cs
draft: false
---

> 원글: https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md
> 
- 역자주: 이 글은 [Kamran Ahmed](https://twitter.com/kamranahmedse)의 글이며, 예제 코드는 TypeScript로 변경하였습니다.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/4dcc01ad-01a9-4e7e-9c30-0e8a71ff8754/Untitled.png)

---

🎉 디자인 패턴에 대한 초간단 설명입니다! 🎉

누구의 기억도 쉽게 흔들릴 수 있는 주제입니다. 이 글에서는 최대한 *간단한* 방식으로 설명함으로써 당신의 기억 속 (그리고 아마도 제 기억)에 각인시키기 위해 노력할 것입니다.

---

저의 [다른 프로젝트](http://roadmap.sh/)도 확인하고 [트위터](https://twitter.com/kamranahmedse)에서 “안녕”이라고 인사해 보세요.

| 생성 패턴 | 구조 패턴 | 행위 패턴 |
| --- | --- | --- |
| https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-simple-factory | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-adapter | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-chain-of-responsibility |
| https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-factory-method | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-bridge | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-command |
| https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-abstract-factory | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-composite | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-iterator |
| https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-builder | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-decorator | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-mediator |
| https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-prototype | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-facade | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-memento |
| https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-singleton | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-flyweight | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-observer |
|  | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-proxy | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-visitor |
|  |  | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-strategy |
|  |  | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-state |
|  |  | https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-template-method |

# 소개

디자인 패턴은 반복되는 문제에 대한 해결책이며, **특정 문제를 해결하는 방법에 대한 지침**입니다. 이것들은 애플리케이션에 연결하고 마법이 일어나기를 기다릴 수 있는 클래스, 패키지 또는 라이브러리가 아닙니다. 오히려, 특정 상황에서 특정 문제를 해결하는 방법에 대한 지침입니다. 

> 디자인 패턴은 반복되는 문제에 대한 해결책이며, 특정 문제를 해결하는 방법에 대한 지침입니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서 소프트웨어 디자인 패턴은 소프트웨어 디자인에서 주어진 맥락 안에서 주로 발생하는 문제에 대한 일반적이고 재사용 가능한 솔루션입니다. 이는 직접적으로 소스 코드나 기계 코드로 변환될 수 있는 완성된 디자인이 아닙니다. 다양한 상황에서 활용될 수 있는 문제 해결을 위한 설명이나 템플릿입니다.
> 

## ⚠️ 조심할 것

- 디자인 패턴은 모든 문제에 대한 묘책은 아닙니다.
- 강제로 적용하려고 하지 마세요. 그렇게 하면 나쁜 일이 일어나게 되어 있습니다.
- 디자인 패턴은 **문제의** 해결책이며, **문제를 찾는** 해결책은 아니라는 점을 명심하세요. 따라서 과도한 고민은 하지 마세요.
- 올바른 곳에서 올바른 방식으로 사용된다면 구원자가 될 수 있지만, 그렇지 않으면 코드가 끔찍하게 엉망이 될 수 있습니다.

> 또한 아래의 예제 코드는 TypeScript 기준으로 작성되었지만, 이는 개념적으로는 동일하기 때문에 이로 인해 읽기를 멈추지 마세요.
* 역자주: 번역 시 PHP-7 기준으로 작성된 코드를 TypeScript로 변경하였습니다.
> 

## 디자인 패턴 종류

- 생성(Creational)
- 구조(Structural)
- 행위(Behavioral)

# 생성(Creational) 패턴

일반적인 용어로 설명하면

> 생성 패턴은 객체 또는 관련된 객체 그룹을 인스턴스화하는 방법에 초점을 맞춥니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서 생성 패턴은 객체 생성 메커니즘을 다루는 디자인 패턴으로, 상황에 적합한 방식으로 객체를 생성하려고 합니다. 객체 생성의 기본 형태는 설계에 문제를 일으킬 수 있거나 설계에 복잡성을 더할 수 있습니다. 생성 패턴은 이러한 객체 생성을 어떻게든 제어함으로써 이 문제를 해결합니다.
> 
- [Simple Factory](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-simple-factory)
- [Factory Method](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-factory-method)
- [Abstract Factory](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-abstract-factory)
- [Builder](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-builder)
- [Prototype](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-prototype)
- [Singleton](https://github.com/kamranahmedse/design-patterns-for-humans/blob/master/readme.md#-singleton)

## 🏠 Simple Factory

실생활 예시

> 집을 짓는 중에 문이 필요하다고 가정해보세요. 집 안에서 목수 옷을 입고 나무, 접착제, 못과 문을 만드는 데 필요한 모든 도구를 가져와 직접 문을 만들 수도 있지만, 간단히 공장에 전화를 걸어 만들어진 문을 받아서 아무것도 배우지 않고 문 제작과정에 필요한 혼란을 겪을 필요 없이 문을 사용할 수 있습니다.
> 

일반적인 용어로 설명하면

> Simple factory는 인스턴스화 하는 로직을 클라이언트에게 노출하지 않고 클라이언트를 위해 인스턴스를 생성합니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 객체지향 프로그래밍(OOP)에서 팩토리는 다른 객체를 생성하기 위한 객체입니다. 형식적으로 팩토리는 변화하는 프로토타입 또는 클래스에서 어떤 메소드 호출로 “새로운” 객체를 반환하는 함수 또는 메소드입니다.
> 

**프로그래밍 예시**

우선 문(door) 인터페이스와 구현을 가지고 있습니다.

```tsx
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

```tsx
class DoorFactory {
  public static makeDoor(width: number, height: number): Door {
    return new WoodenDoor(width, height);
  }
}
```

그리고 다음과 같이 사용할 수 있습니다.

```tsx
// 100x200의 문을 만들어줘
const door: Door = DoorFactory.makeDoor(100, 200);

console.log('Width: ' + door.getWidth());
console.log('Height: ' + door.getHeight());

// 50x100의 문을 만들어줘
const door2: Door = DoorFactory.makeDoor(50, 100);
```

**언제 사용하나요?**

객체를 생성하는 것이 단순히 몇 가지 할당이 아니라 일부 로직을 포함하는 경우, 모든 곳에서 동일한 코드를 반복하는 대신 전용 팩토리에 넣는 것이 좋습니다.

## 🏭 Factory Method

실생활 예시

> 인사 담당자의 경우를 생각해보세요. 각 포지션에 대해 한 사람이 모든 면접을 진행하는 것은 불가능합니다. 그녀는 채용 공고에 따라 다른 사람들에게 면접 절차를 결정하고 위임해야 합니다.
> 

일반적인 용어로 설명하면

> 팩토리 메서드는 하위 클래스에 인스턴스화 로직을 위임하는 방법을 제공합니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 클래스 기반 프로그래밍에서 팩토리 메서드 패턴은 생성 패턴 중 하나로, 생성할 객체의 정확한 클래스를 지정하지 않고 객체를 생성하는 문제를 다룹니다. 이는 생성자를 호출하는 대신 인터페이스에서 명세되고 자식 클래스에서 구현되거나 부모 클래스에서 구현되어, 자식 클래스에서 선택적으로 재정의된 팩토리 메서드를 호출하여 객체를 생성함으로써 수행됩니다.
> 

**프로그래밍 예시**

위의 인사 담당자 예시를 살펴보겠습니다. 우선, 우리는 면접관 인터페이스와 그에 대한 몇 가지 구현체들을 가지고 있습니다.

```tsx
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

```tsx
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

```tsx
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

```tsx
const devManager = new DevelopmentManager();
devManager.takeInterview(); // 출력: Asking about design patterns!

const marketingManager = new MarketingManager();
marketingManager.takeInterview(); // 출력: Asking about community building.
```

**언제 사용하나요?**
클래스에 일부 일반적인 처리가 있지만 필수 하위 클래스가 런타임에 동적으로 결정될 때 유용합니다. 다른 말로 하면, 클라이언트가 정확히 어떤 하위 클래스가 필요한지 모를 때 사용됩니다.

## 🔨 Abstract Factory

실생활 예시

> Simple Factory에서 문(door) 예시를 확장해보겠습니다. 필요에 따라 나무 문 가게에서 나무 문을, 철문 가게에서 철문을, PVC 관련 가게에서 PVC 문을 구할 수 있습니다. 또한, 문을 설치하기 위해 다른 전문 기술을 가진 사람이 필요할 수 있습니다. 예를 들어 나무 문에는 목수, 철문에는 용접사가 필요합니다. 보시다시피 이제 문들 간에 의존성이 존재하며, 나무 문에는 목수가 필요하고 철문에는 용접사가 필요합니다.
> 

일반적인 용어로 설명하면

> 팩토리들의 팩토리; 구체적인 클래스를 지정하지 않고 관련된/의존적인 개별 팩토리들을 그룹화 하는 팩토리입니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 추상 팩토리 패턴은 공통 테마를 가진 개별 팩토리들을 구체적인 클래스를 지정하지 않고 캡슐화하는 방법을 제공합니다.
> 

**프로그래밍 예시**

위의 문 예시를 옮겨봅니다. 먼저, **`Door`** 인터페이스와 일부 구현을 가지고 있습니다.

```tsx
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

```tsx
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

```tsx
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

```tsx
const woodenFactory: DoorFactory = new WoodenDoorFactory();

const door: Door = woodenFactory.makeDoor();
const expert: DoorFittingExpert = woodenFactory.makeFittingExpert();

door.getDescription();  // Output: I am a wooden door
expert.getDescription(); // Output: I can only fit wooden doors

// Same for Iron Factory
const ironFactory: DoorFactory = new IronDoorFactory();

const door: Door = ironFactory.makeDoor();
const expert: DoorFittingExpert = ironFactory.makeFittingExpert();

door.getDescription();  // Output: I am an iron door
expert.getDescription(); // Output: I can only fit iron doors
```

보시다시피, 나무 문 팩토리는 `목수`와 `나무 문`을 캡슐화했으며, 철문 팩토리는 `철문`과 `용접사`를 캡슐화했습니다. 이를 통해 생성된 각 문에 대해 잘못된 설치 전문가가 배정되지 않도록 도와주었습니다.

**언제 사용하나요?**

상호 의존성이 있고, 복잡한 생성 로직이 있는 경우 사용합니다.

## 👷 Builder

실생활 예시

> 하디스(Hardee's)에 가서 특정한 메뉴를 주문한다고 상상해보세요. 예를 들어, "빅 하디"를 주문하고, 그들은 아무 질문 없이 그것을 건네줍니다. 이는 간단한 팩토리의 예입니다. 그러나 생성 로직에 더 많은 단계가 포함될 수 있는 경우도 있습니다. 예를 들어, 당신이 커스터마이즈된 서브웨이 메뉴를 원한다면, 당신은 버거를 만드는 여러 가지 옵션(e.g 어떤 빵을 원하시나요? 어떤 종류의 소스를 원하시나요? 어떤 치즈를 원하시나요? 등등)을 가지고 있습니다. 이와 같은 경우에 빌더 패턴이 도움이 됩니다.

** 역자주: 하디스(Hardee's)는 미국을 비롯한 여러 나라에서 운영되고 있는 패스트푸드 프랜차이즈 입니다. "빅 하디"는 하디스에서 제공하는 햄버거 중 하나의 상표명입니다. 이는 하디스의 대표적인 제품 중 하나로, 크기가 크고 맛있는 햄버거 입니다.*
> 

일반적인 용어로 설명하면

> 생성자의 오염을 방지하면서 객체의 다양한 변종을 생성할 수 있게 해주는 패턴입니다. 객체의 여러 변종이 있을 때, 또는 객체의 생성에 많은 단계가 포함될 때 유용합니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 빌더 패턴은 점층적 생성자(Telescoping Constructor) 안티 패턴 방지 솔루션을 찾기 위한 객체 생성 패턴입니다.
> 

점층적 생성자 안티 패턴이 무엇인지 설명을 조금 추가하겠습니다. 우리는 한 번쯤 아래와 같은 생성자를 보았을 것입니다.

```tsx
constructor(size: string, cheese: boolean = true, pepperoni: boolean = true, tomato: boolean = false, lettuce: boolean = true) {
  // 생성자의 내용
}
```

보시다시피, 생성자의 매개변수 개수가 금세 많아질 수 있으며, 매개변수의 배열을 이해하기 어려워질 수 있습니다. 또한, 이러한 매개변수 목록은 앞으로 더 많은 옵션을 추가하고자 할 경우 계속해서 늘어날 수 있습니다. 이를 점층적 생성자(Telescoping Constructor) 안티 패턴이라고 합니다.

** 역자주: 점층적 생성자 패턴은 생성자에 매우 많은 매개변수가 포함되어 가독성이 떨어지고, 매개변수의 순서를 기억해야 하며, 새로운 옵션이 추가될 때마다 생성자를 수정해야 하는 번거로움이 발생합니다. 그래서 코드의 복잡성을 증가시키고 유지 보수를 어렵게 만들므로 안티 패턴입니다.*

**프로그래밍 예시**

이에 대한 올바른 대안은 빌더 패턴을 사용하는 것입니다. 먼저 우리가 만들고자 하는 버거가 있습니다.

```tsx
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

```tsx
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

그리고 다음과 같이 사용될 수 있습니다

```tsx
const burger = new BurgerBuilder(14)
  .addPepperoni()
  .addLettuce()
  .addTomato()
  .build();
```

**언제 사용하나요?**

객체의 여러 변종이 있을 수 있고 점층적 생성자를 피하기 위해 사용합니다. 팩토리 패턴과의 주요 차이점은, 팩토리 패턴은 생성이 한 단계인 경우에 사용되는 반면, 빌더 패턴은 생성이 여러 단계인 경우에 사용됩니다.

## 🐑 Prototype

실생활 예시

> 돌리(dolly)라고 기억하는가? 복제된 양! 자세한 내용은 다루지 않겠지만, 여기서 중요한 점은 복제에 관한 것입니다.
> 

일반적인 용어로 설명하면

> 복제를 통해 기존 객체를 기반으로 객체를 생성합니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 프로토타입 패턴은 소프트웨어 개발에서의 생성적인 디자인 패턴입니다. 생성할 객체의 유형이 원형 인스턴스에 의해 결정되며, 이를 복제하여 새로운 객체를 생성합니다.
> 

즉, 처음부터 객체를 만들고 설정하는 수고를 겪는 대신, 기존 객체의 복사본을 만들고 필요에 따라 수정할 수 있게 해주는 것입니다.

**프로그래밍 예시**

타입스크립트에서는 `Object.create`를 사용하여 간단히 수행할 수 있습니다.

```tsx
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

```tsx
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

## 💍 Singleton

실생활 예시

> 한 나라에는 한 번에 하나의 대통령만 존재할 수 있습니다. 의무 호출이 발생할 때마다 동일한 대통령이 행동에 나서야 합니다. 여기에서 대통령은 싱글톤입니다.
> 

일반적인 용어로 설명하면

> 특정 클래스의 객체가 한 번만 생성되도록 보장합니다.
> 

위키피디아에서는 다음과 같이 설명하고 있습니다.

> 소프트웨어 공학에서 싱글톤 패턴은 클래스의 인스턴스화를 한 개의 객체로 제한하는 소프트웨어 디자인 패턴입니다. 이는 시스템 전체에서 작업을 조정하는 데 정확히 하나의 객체가 필요한 경우에 유용합니다.
> 

싱글톤 패턴은 실제로 안티 패턴으로 간주되며, 과도한 사용은 피해야 합니다. 이 패턴은 반드시 나쁜 것은 아니며 일부 유효한 사용 사례가 있을 수 있지만, 애플리케이션에서 전역 상태를 도입하고 한 곳에서 변경하면 다른 영역에 영향을 미칠 수 있고 디버그하기가 매우 어려워질 수 있으므로 주의해야 합니다. 또 다른 문제는 코드의 결합도를 높이며, 싱글톤을 목킹(Mocking)하는 것이 어려울 수 있다는 것입니다.

**프로그래밍 예시**

싱글톤을 생성하려면 생성자를 비공개로 만들고, 복제와 확장을 비활성화하고, 인스턴스를 저장할 정적 변수를 생성합니다.

```tsx
class President {
  private static instance: President;

  private constructor() {
    // Hide the constructor
  }

  public static getInstance(): President {
    if (!President.instance) {
      President.instance = new President();
    }

    return President.instance;
  }

  private clone(): void {
    // Disable cloning
  }

  private wakeup(): void {
    // Disable unserialize
  }
}
```

그런 다음 아래와 같이 사용합니다.

```tsx
const president1: President = President.getInstance();
const president2: President = President.getInstance();

console.log(president1 === president2); // true
```

# 구조(Structural) 패턴