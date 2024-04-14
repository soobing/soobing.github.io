---
title: "(번역) 타입스크립트에서 'As Const' 이해하기"
date: '2024-04-14 00:00:00'
author: soobing
tags: typescript as-const
categories: translate typescript
draft: false
---

> 원글: https://www.omarileon.me/blog/typescript-as-const

새로운 구문인 "상수 어설션(const assertions)"은 TypeScript 3.4에서 도입되었습니다. 이것은 변수가 변경되지 않을 것(immutable)이고 가능한 엄격한 타입을 제공해야 한다는 것을 타입스크립트에 알려줍니다. 이는 타입의 종류에 따라 다르게 영향을 미치므로, 이 글에서는 상수 어설션을 어떻게 사용하고 왜 유용한지에 대해 설명할 것입니다.

## 문자열/숫자

문자열이나 숫자에 "as const"를 추가하면 특정 값으로 타입을 좁힐 수 있습니다.

```tsx
let foo = 'foo';
// let foo: string

let foo = 'foo' as const;
// let foo: 'foo'
```

숫자의 경우

```tsx
let foo = 7;
// let foo: number

let foo = 7 as const;
// let foo: 7;
```

문자열 또는 숫자의 경우 일반적으로 "const"를 사용하여 변수를 정의하면 동일한 효과를 얻을 수 있기 때문에 덜 유용합니다.

```tsx
let foo = 7;
// let foo: number

const foo = 7;
// const foo: 7;
```

런타임 안전성이라는 추가 이점도 있습니다.

때로는 변수로 값을 정의하지 않고, 단순히 문자열 리터럴을 사용하고 싶을 수 있습니다. 예를 들어 값을 반환할 때처럼요. 그때 "as const"가 유용하게 사용됩니다. 다음 예제를 살펴보세요.

```tsx
type Colour = 'red' | 'green' | 'blue';
type Variant = 'light' | 'dark';
function createColourVariant(colour: Colour, variant: Variant) {
    return `${variant}-${colour}`;
}

// function createColourVariant(colour: Colour, variant: Variant): string
```

색상 변형(colour variant) 이름을 생성하는 간단한 함수입니다. 앱의 팔레트 또는 이와 비슷한 무언가를 정의하는 것을 상상해 보세요. 이 함수에서 반환되는 타입은 단순히 문자열일 뿐입니다.

다음처럼 색상 변형에 대한 명시적인 타입을 생성할 수도 있습니다.

```tsx
type ColourVariant = `${Variant}-${Colour}`;
// "light-red" | "light-green" | "light-blue" | "dark-red" | "dark-green" | "dark-blue"

function createColourVariant(colour: Colour, variant: Variant): ColourVariant {
    return `${variant}-${colour}`;
}
```

이것은 당신의 사용 사례에 적합할 수 있지만, 상수 어설션을 사용하여 타입 생성을 완전히 생략할 수 있습니다.

```tsx
function createColourVariant(colour: Colour, variant: Variant) {
    return `${variant}-${colour}` as const;
}

// function createColourVariant(colour: Colour, variant: Variant): "light-red" | "light-green" | "light-blue" | "dark-red" | "dark-green" | "dark-blue"
```

어느 것이 더 나을까요? 첫 번째 옵션은 타입을 많이 재사용하려는 경우, 그리고 타입이 변수에 의존하는 것이 아니라 함수가 타입을 준수하기 원할 때도 유용합니다. 두 번째 옵션은 더 짧고, 추가 타입을 정의하는 추가 작업을 생략할 수 있게 합니다.

한 가지 중요한 점은 "as const"를 리터럴 값에만 사용할 수 있다는 것입니다.

```tsx
const foo = 'foo' as const;
const bar = foo as const; // 'const' 어셜션은 열거형(enum) 멤버, 문자열, 숫자, 불리언, 배열, 객체 리터럴에 대한 참조에만 적용될 수 있습니다.
```

## 객체

객체와 배열에서 "as const"가 훨씬 더 흥미로워집니다. 객체의 경우, "as const"는 모든 속성을 읽기 전용(readonly)으로 변경하고 값의 범위를 좁힙니다.

```tsx
const myObject = {
    foo: 'bar',
    baz: 7,
};

/*
    const myObject: {
    foo: string;
    baz: number;
}
*/
const myObject = {
    foo: 'bar',
    baz: 7,
} as const;

/*
    const myObject: {
        readonly foo: "bar";
        readonly baz: 7;
    }
*/
```

이는, 속성 값을 변경할 수 없음을 의미합니다.

```tsx
const myObject = {
    foo: 'bar',
    baz: 7,
} as const;

myObject.baz = 6;
// 읽기 전용 속성이기 때문에 'baz'에 할당할 수 없습니다.
```

그리고 객체 또는 배열을 변형(mutate)시키는 메서드도 사용할 수 없습니다.

```tsx
const me = {
    name: 'Omari',
    hobbies: ['coding', 'cooking', 'gaming'],
} as const;
// 성장할 시간입니다 :(
me.hobbies = ['coding', 'cooking'];
// 읽기 전용 속성이기 때문에 'hobbies'에 할당할 수 없습니다.

me.hobbies.pop();
// 'readonly ["coding", "cooking", "gaming"]'에 'pop' 속성이 존재하지 않습니다.
// 야호 :)
```

## 배열

"as const"는 배열을 읽기 전용 값의 튜플로 변경합니다.

```tsx
const goodLanguages = ['typescript', 'csharp'];
// const goodLanguages: string[]
const goodLanguages = ['typescript', 'csharp'] as const;
// const goodLanguages: readonly ["typescript", "csharp"]
```

튜플이 무엇인지 잘 모르시나요? 본질적으로 순서가 지정된 값의 배열입니다. 객체처럼 변수들을 그룹화하는 데 유용하지만, 조금 더 간단합니다.

따라서 "as const"는 배열의 순서와 항목 수를 보존하기 때문에, 튜플을 생성하고 다루는 데 특히 유용합니다. 값을 토글 시키는 리액트 사용자 정의 훅을 만드는 것을 생각해 보세요.

```tsx
function useToggle(defaultValue = false) {
    const [active, setActive] = useState(false);
    const toggle = () => setActive((v) => !v);

    return [active, toggle];
}
```

함수의 추론된 반환 타입은 다음과 같습니다:

```tsx
(boolean | (() => void))[]
```

우리는 반환 타입 중 첫 번째는 값, 두 번째는 값을 토글하는 함수를 갖는 튜플이라는 것을 알고 있습니다. 하지만 타입스크립트는 값과 토글 함수가 배열 내 어느 위치에나 있을 수 있으며, 그 배열은 임의의 길이가 될 수 있다고 가정했습니다.

그래서 훅을 사용하면 예상대로 작동하지 않습니다.

```tsx
const [dialogOpen, toggleDialogOpen] = useToggle();
// const dialogOpen: boolean | (() => void)
// const toggleDialogOpen: boolean | (() => void)
```

여기서 "as const"가 등장합니다.

```tsx
function useToggle(defaultValue = false) {
    const [active, setActive] = useState(false);
    const toggle = () => setActive((v) => !v);

    return [active, toggle] as const;
}
// function useToggle(defaultValue?: boolean): readonly [boolean, () => void]
```

그러면 우리는 훅에서 반환된 튜플을 예상대로 사용할 수 있습니다.

```tsx
const [dialogOpen, toggleDialogOpen] = useToggle()
// const dialogOpen: boolean
// const toggleDialogOpen: () => void
```

## const vs "as const"

비슷하게 들릴지라도, 변수를 const 변수로 선언하는 것과 변수 끝에 "as const"를 추가하는 것은 다릅니다.

const 변수를 선언하면 해당 변수가 참조하는 대상이 변경되지 않을 것임을 타입스크립트에게 알릴 수 있습니다. 자바스크립트에서 문자열과 숫자는 불변이므로, 어느 쪽으로 변수를 선언하든 타입스크립트에게는 두 기술 간에 차이는 없습니다. 차이점은 "const"가 자바스크립트 기능이라는 사실과, "as const"는 타입스크립트 기능이라는 점에 있습니다.

```tsx
const link = 'youtu.be/pHqC0uoatag';
// const link: 'youtu.be/pHqC0uoatag';
let link = 'youtu.be/pHqC0uoatag' as const;
// let link: "youtu.be/pHqC0uoatag"
```

예를 들어, 다음 코드를 Bun으로 실행해보세요. 이 코드는 실행될 것입니다.

```tsx
let link = 'youtu.be/pHqC0uoatag' as const;
// const link: 'youtu.be/pHqC0uoatag';
link = '';
// '""' 타입은 '"youtu.be/pHqC0uoatag"' 타입에 할당할 수 없습니다.
```

하지만 이 코드는 실행되지 않을 것입니다.

```tsx
const link = 'youtu.be/pHqC0uoatag';
// const link: 'youtu.be/pHqC0uoatag';
link = '';
// 상수이므로 'link'에 할당할 수 없습니다.
```

객체와 배열의 경우, 참조와 값에 차이점이 있습니다. 객체/배열을 const를 사용하여 선언하는 것은 해당 변수가 다른 객체/배열을 참조하지 않을 것임을 타입스크립트와 자바스크립트에 알리지만, 값이 변경되지 않을 것임을 의미하지는 않습니다.

```tsx
const bestNumbers = [1, 12, 24]; // 훌륭한 숫자들
bestNumbers = [1, 7, 8]; // 작동하지 않을 것입니다. 이것은 다른 배열입니다.
bestNumbers = [1, 12, 24]; // 작동하지 않을 것입니다. 이것은 다른 배열입니다.
// 'bestNumbers'에 값을 할당할 수 없습니다. 상수이기 때문입니다.
bestNumbers.pop(); // 정상 동작

```

참조를 변경하지 않고 객체/배열 내의 값을 수정할 수 있습니다.

참조와 값 모두 변경할 수 없는 "as const"와 비교됩니다.

```tsx
const bestNumbers = [1, 12, 24] as const; // 훌륭한 숫자들
bestNumbers = [1, 7, 8]; // 다른 배열이므로 동작하지 않습니다.
bestNumbers = [1, 12, 24]; // 작동하지 않을 것입니다. 이것은 다른 배열입니다.
// 'bestNumbers'에 값을 할당할 수 없습니다. 상수이기 때문입니다.
bestNumbers.pop(); // 이것도 이제 작동하지 않을 것입니다.
bestNumbers[2] = 7; // 이것도 마찬가지입니다.

```

## 결론

따라서 모든 것을 요약하자면, "as const" 또는 상수 어설션은 변수에 더 좁은 타입을 부여하는 훌륭한 타입스크립트 기능입니다. 항상 필요한 것은 아니지만 도구 상자에 넣어뒀다가, 특히 튜플을 생성하고, 함수에서 더 좁은 타입의 값을 반환할 때 꺼내 쓰면 좋은 기능입니다. 이 글을 읽은 후, 이제 여러분은 그것들을 언제, 어디서 사용해야 하는지 알게 되었기를 바랍니다. 읽어주셔서 감사합니다!