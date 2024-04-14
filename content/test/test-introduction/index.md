---
title: 자바스크립트 테스트 개념정리
date: '2022-04-14 00:00:00'
author: soobing
tags: test
categories: test
draft: false
---

> 🔨 다듬을 필요가 있는 글입니다.

## 테스트 flow

- 테스트 코드 작성 → 테스트 읽고 → 실행 → 출력(Reporter)

## 테스트 종류

- 단위 테스트: 모듈을 분리된 환경에서 테스트
    - 의존성이 있는 모듈을 제어하기 위해 필연적으로 모의 객체(Mocking)을 사용할 수밖에 없으며, 이 경우 각 모듈이 실제로 잘 연결되어 상호 작용하는지에 대해서는 검증하지 못한다.
- 통합 테스트: 2개 이상의 모듈 간의 상호작용을 테스트 (개발자 관점의 테스트)
    - 단위 테스트에 비해 mocking을 덜하며, 모듈 간의 연결에서 발생하는 에러를 검증할 수 있다.
- E2E 테스트: 사용자의 실행 환경과 거의 동일한 환경에서 테스트를 진행 (사용자 관점의 테스트)
    - 세부 모듈들이 갖는 다양한 상황들의 조합을 고려해야 하기 때문에 테스트

## 자바스크립트 테스트 도구

자바스크립트 테스트는 도구들은 아래와 같이 분류할 수 있다.

1. `Test Runners`
2. `Testing Frameworks`
3. `Assertion Libraries`
4. `Testing Plugins`

테스트를 구동할 수 있는 환경을 제공하는 **테스트 러너**와 테스트 코드 작성을 위한 기반을 만들어주는 **테스트 프레임워크**, 실제로 테스트 할 항목이 테스트 하려는 것과 동일한지 체크할 수 있게 해주는 **단언(assertion) 라이브러리**, mocks, stubs, and fake servers를 만들 수 있게 해주는 **테스팅 플러그인**이 있다.

## Test Runner

테스트 러너 중 유명한 라이브러리를 예시로 들면 `Karma` 같은 것이 있다. 

더 많은 종류의 라이브러리를 살펴보려면 아래 사이트를 들어가보면 된다.

https://www.browserstack.com/docs/automate/javascript-testing/test-runners

### 자바스크립트 테스트 환경

자바스크립트 테스트는 `브라우저 환경`과 `Node.js 환경`에서 실행할 수 있다. 

위에서 예시를 들었던 Karma는 브라우저 환경에서 테스트를 돌릴 수 있게 해주는 runner 이고, 다양한 브라우저에서 테스트를 돌릴 수 있는 [fake server만 만들어 줄 뿐](http://karma-runner.github.io/0.13/dev/public-api.html) `Mocha`와 같은 테스트 프레임워크를 함게 사용해서 테스트를 작성해야 한다. 

그렇다면 Node.js 환경에서 돌아가는 테스트 러너들은 어떤 것이 있을까?  테스트 러너의 실행 환경과 테스트 코드의 실행 환경을 구분할 필요가 없기 때문에(둘다 Node.js) `Node.js 환경에서 돌아가는 테스트 러너` 보다는  대부분 `테스트 프레임워크`로써 통합된 형태로 제공 된다. 즉, `Mocha, Jest, Jasmine` 는 Node.js 환경에서 돌아가는 테스트 프레임워크이다.

### 다시한번, Test Runner 정리

- 자바스크립트 테스트는 `브라우저 환경`과 `Node.js 환경`에서 실행할 수 있다.
- 하는 일 (기능)
    - 테스트 읽고 → 실행 → 출력(Reporter)
    - Watcher
- 종류
    - `브라우저`에서 직접 코드 실행
        - 종류
            - Karma
                - **테스트 과정**: command에서 Karma 실행 → 자체 웹서버 구동 → 테스트를 위한 HTML 페이지 생성 → 소스코드 로드(테스트 + 소스) → 브라우저 직접 실행 → 테스트 실행 결과는 브라우저 콘솔로 출력 → Karma가 지정된 리포터를 사용해 결과를 정리하여 커멘드에 보여줌
                - 테스트 러너의 역할만 하므로 Jasmine 사용을 권장함
                - Selenium 도구를 이용하면 다양한 환경(운영체제, 브라우저) 테스트를 실행 가능
        - **장점**: 브라우저의 모든 기능(네트워크 IO, 렌더링 엔진 등)을 활용해서 테스트
        - **단점**
            - 테스트의 초기 구동 속도가 느림 (Node.js 프로세스보다 무거움)
            - 모듈 단위의 테스트를 실행하기가 어려움(번들러 사용 필요)
            - 브라우저 런처(launcher)를 추가로 설치해 줘야 함.
            - 크로스 부라우징 테스트를 위한 별도 환경 구축 비용이 큼
                - → **단점 극복1**:  headless 브라우저 사용 (개발시에는 headless 브라우저 사용으로 빠른 피드백을 얻고 개발 완료 혹은 배포시에만 CI를 통해 크로스 부라우징 테스트)
                - → **단점 극복2**: Browser Stack, Sauce Lab 등의 외부 서비스 사용. (테스트 환경을 직접 구축할 필요없이 Karama와 쉽게 연동 가능)
    - `Node.js`에서 실행 (= Testing Framework)
        - 테스트 러너의 실행 환경과 코드의 실행 환경을 구분할 필요가 없기 때문에 대부분 테스트 프레임워크와 통합된 형태로 제공.
        - → 즉, 테스트 러너와 테스트 프레임워크가 통합되어 있어 설치 및 실행이 비교적 간단
        - 종류
            - Jest
            - Mocha
            - Jasmine
        - **장점**
            - 속도(브라우저의 프로세스에 비해 훨씬 가벼움 → 실행 속도가 빠르다)
            - 원하는 모듈만 가져와서(import) 테스트할 수 있기 때문에 훨씬 간단하고 안전한 방식으로 테스트 가능
        - **단점**
            - 브라우저의 모든 API를 제대로 활용할 수 없음. (브라우저가 제공하는 DOM(Document Object Model)이나 BOM(Browser Object Model) 등의 API가 없음)
                - → 단점 극복: 이 문제를 해결하기 위해 jsdom과 같은 라이브러리를 사용해서 브라우저 환경을 가상으로 구현하는 방식을 사용
    

## Testing Framework

Framework에서는 `Jest` 와 같이 assertion library까지 포함하는 라이브러리들도 있고, `Mocha` 와 같이 assertion library는 포함하지 않는 경우도 있다. Mocha에서는 `Chai`와 같은 assertion library를 이용해야 한다.

### 작성법 요약

`describe`를 이용해서 테스트를 grouping 하고 `it`이나 `test`구문을 써서 하나의 테스트를 작성한다.

그리고 하나의 테스트 안에서 `expect` ... `toBe, toHave, 등등` 을 기술한다.

```jsx
describe('updateAll', () => {
  it('no force', () => {
    return updateAll(TableName, ["fileName"], {compandId: "test"})
        .then(updatedItems => {
          let undefinedCount = 0;
          for (let item of updatedItems) {
            undefinedCount += item === undefined ? 1 : 0;
          }
          // console.log("result", result);
          expect(undefinedCount).toBe(updatedItems.length);
        })
  });
  
  test('force update', () => {
    return updateAll(TableName, ["fileName"], {compandId: "test"}, true)
        .then(updatedItems => {
          let undefinedCount = 0;
          for (let item of updatedItems) {
            undefinedCount += item === undefined ? 1 : 0;
          }
          // console.log("result", result);
          expect(undefinedCount).toBe(0);
        })
  });
});
```

참고로, it과 test의 차이는 둘다 똑같은 역할을 하는데 it은 [RSpec](https://en.wikipedia.org/wiki/RSpec) 스타일의 기술 방식이고, test는 [xUnit](https://en.wikipedia.org/wiki/XUnit) 스타일의 기술 방식의 차이이다. ([참고](https://stackoverflow.com/questions/45778192/what-is-the-difference-between-it-and-test-in-jest/47399770))

그렇다면, 어느 부분까지가 Testing Framework고 어디까지가 assertion 일까?

it이나 test 블록 안에서 우리는 세부적인 테스트를 작성하는데, 그때 `expect...toBe, toHave, equal` 등등의 문구로 작성하게 된다. 이부분이 assertion library  부분이라고 보면 된다. 

Jest 같은 경우에는 assertion library를 함께 제공하므로 Mocha + chai 와 같이 추가적인 조합을 해주지 않아도 된다.

### 다시한번, Test Framework 정리

- 하는일 (기능)
    - 테스트 코드를 작성할 수 있는 기반을 제공
    - 프레임워크가 제공하는 함수들을 사용해서 테스트 코드를 작성
    - 프레임워크가 테스트 코드를 자동으로 실행
    - 테스트 성공 및 실패에 대한 결과를 반환
- 종류
    - Mocha, Jasmine, AVA, Jest, Selenium

## Assertion Library

- 하는일
    - assertion은 개별 테스트가 통과하기 위한 조건을 명확하게 기술하기 위해 사용
    - 보통은 테스트 프레임워크에서 다양한 방식의 단언 API를 기본 제공
    - 테스트 프레임워크에서 기본 제공되는 경우가 대부분이며, Mocha의 경우에만 Chai와 같은 별도의 단언 라이브러리를 사용하도록 권장하고 있다.
- 종류
    - BDD
        - Chai
        - Jasmine
    - TDD?
        - JUnit?

## Testing Plugin

`테스트 더블 라이브러리` 라고도 불리는데, 실제 객체 대신 테스트를 위해 동작하는 객체를 만들기 위해 `스파이(spy), 스텁(stub), 목(mock) 등등`을 도와주는 라이브러리이다. 

테스트 프레임워크에서 기본 제공되는 경우가 대부분이며, Mocha의 경우에만 Sinon.JS 등의 별도 라이브러리를 사용하도록 권장하고 있다.

요즘 msw를 사용해 보았는데 다음 글에서는 mocking 라이브러리를 비교해보고자 한다

# 참고

https://amzotti.github.io/testing/2015/03/16/what-is-the-difference-between-a-test-runner-testing-framework-assertion-library-and-a-testing-plugin/

[https://ui.toast.com/fe-guide/ko_TEST/#단언assertion-라이브러리](https://ui.toast.com/fe-guide/ko_TEST/#%EB%8B%A8%EC%96%B8assertion-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC)