---
title: '(번역) React에서 UI와 로직 분리하기:헤드리스 컴포넌트를 사용한 클린 코드 접근법'
date: '2023-09-13 00:00:00'
author: soobing
tags: react headless ui
categories: react
draft: false
---

> 원글: https://itnext.io/decoupling-ui-and-logic-in-react-a-clean-code-approach-with-headless-components-82e46b5820c


프런트엔드 개발 영역에서는 용어와 패러다임이 때로는 이해하기 어려울 수 있으며 '헤드리스 UI' 또는 '헤드리스 컴포넌트'도 이 범주에 속할 수 있습니다. 이러한 용어들이 무엇을 의미하는지 궁금해서 고개를 갸웃거리고, 혼자만 그런 것이 아닙니다. 사실, 혼란스러운 `이름`에도 불구하고 이러한 개념들은 복잡한 사용자 인터페이스 관리를 상당히 단순화할 수 있는 매력적인 전략입니다.

헤드리스 컴포넌트는 난해해 보일 수 있지만, 그 진정한 힘은 유연성, 재사용 가능성, 그리고 코드베이스의 구성과 깔끔함을 향상시킬 수 있는 능력에 있습니다. 이 글에서는 이 패턴이 정확히 무엇인지, 왜 유용한지, 그리고 인터페이스 디자인에 대한 접근 방식을 어떻게 혁신할 수 있는지에 대해 탐구해 볼 것입니다.

설명을 위해, 먼저 헤드리스 컴포넌트를 간단하면서도 효과적으로 적용하는 방법, 즉 두 개의 유사한 컴포넌트에서 'useToggle' 훅을 추출하여 코드 중복을 줄이는 방법을 살펴보겠습니다. 이 예시는 사소해 보일 수 있지만, 헤드리스 컴포넌트의 핵심 원칙을 이해하는 데 도움이 됩니다. 공통 패턴을 인식하고 이를 재사용 가능한 부분으로 추출함으로써, 코드베이스를 간소화하고 더 효율적인 개발 과정을 위한 기반을 마련할 수 있습니다.

하지만 이것은 빙산의 일각에 불과합니다! 더 깊게 파고들면, 우리는 이 원칙이 실제로 적용되는 더 복잡한 사례를 만나게 될 것입니다. 그것은 향상된 입력 컴포넌트를 생성하기 위한 강력한 라이브러리인 Downshift를 활용하는 것입니다. 

이 글을 모두 읽고나서, 헤드리스 컴포넌트에 대한 이해뿐만 아니라, 이 강력한 패턴을 자신의 프로젝트에 통합할 수 있는 자신감도 얻을 수 있길 바랍니다. 이제, 헤드리스 컴포넌트에 대한 혼란을 뒤로하고 혁신적인 잠재력에 대해서 알아봅시다.

# 토글 컴포넌트

토글은 수많은 애플리케이션에서 필수적인 부분을 차지합니다. "이 기기에서 내 정보 기억", "알림 활성화" 또는 늘 인기 있는 "다크 모드"와 같은 기능을 뒤에서 조용히 수행합니다.


![토글 컴포넌트](https://miro.medium.com/v2/resize:fit:720/format:webp/1*2pB6tpnJo5O0YSgin4przg.png
)
*(사진: 토글 컴포넌트)*


React에서 이러한 토글을 만드는 것은 놀라울 정도로 간단한 과정입니다. 어떻게 구현할 수 있는지 살펴보겠습니다.

```tsx
const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggle = useCallback(() => {
    setIsToggled((prevState) => !prevState);
  }, []);

  return (
    <div className="toggleContainer">
      <p>Do not disturb</p>
      <button onClick={toggle} className={isToggled ? "on" : "off"}>
        {isToggled ? "ON" : "OFF"}
      </button>
    </div>
  );
};
```

`useState` 훅은 초기 값이 `false`인 상태 변수 `isToggled`를 설정합니다. `useCallback`으로 생성된 `toggle` 함수는 호출될 때마다 (버튼 클릭 시) `isToggled` 값을 `true`와 `false` 사이에서 전환합니다. 버튼의 모양과 텍스트("ON" 또는 "OFF")는 `isToggled` 상태를 동적으로 반영합니다.

이제 완전히 다른 컴포넌트인 ExpandableSection을 만들어야 한다고 가정해 보겠습니다. 이 컴포넌트는 섹션의 세부 정보를 표시하거나 숨깁니다. 제목 옆에 버튼이 있으며, 클릭하여 세부 정보를 펼치거나 접을 수 있습니다.

![ExpandableSection 컴포넌트](https://miro.medium.com/v2/resize:fit:720/format:webp/1*-2r7tI3HODG8znIbGcZ_gg.png)

*(사진: ExpandableSection 컴포넌트)*

구현도 그리 어렵지 않습니다. 아래와 같이 쉽게 할 수 있습니다.

```tsx
const ExpandableSection = ({ title, children }: ExpandableSectionType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prevState) => !prevState);
  }, []);

  return (
    <div>
      <h2 onClick={toggleOpen}>{title}</h2>
      {isOpen && <div>{children}</div>}
    </div>
  );
};
```

두 예제 사이에는 명백한 유사성이 있습니다. `ToggleButton`의 'on' 과 'off' 상태는 `ExpandableSection`의 '펼치기(expand)' 와 '접기(collapse)' 작업과 유사합니다. 이러한 공통점을 인식하면, 이 공통 기능을 별도의 기능으로 추상화할 수 있습니다. React 생태계에서는 사용자 정의 훅을 생성하여 이를 수행합니다.

```tsx
const useToggle = (init = false) => {
  const [state, setState] = useState(init);

  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  return [state, toggle];
};
```

리팩터링은 상당히 간단해 보일 수 있지만, 표현(UI)에서 동작을 분리한다는 중요한 개념을 강조합니다. 이 시나리오에서, 사용자 정의 훅은 JSX로부터 독립된 상태 머신 역할을 합니다. `ToggleButton`과 `ExpandableSection` 모두 이 동일한 기본 로직을 활용합니다.

중간 규모의 프론트엔드 프로젝트에 상당한 시간을 투자해 본 사람들은, 대부분의 업데이트나 버그가 UI 시각적 요소와 관련된 것이 아니라 UI 상태 관리와 관련된 로직에 문제가 있다는 것을 알게 될 것입니다. 훅은 이러한 로직을 중앙 집중화하는 강력한 도구를 제공하여, 코드 분석, 최적화 그리고 유지보수를 더욱 쉽게 만듭니다.

# 헤드리스 컴포넌트

실제로 이 패턴을 사용하여 동작(또는 상태 관리)과 표현을 분리하는 훌륭한 라이브러리가 이미 많이 있습니다. 그리고 이러한 컴포넌트 라이브러리 중 가장 유명한 것은 [Downshift](https://www.downshift-js.com/) 일 것입니다.

Downshift는 UI를 렌더링하지 않고 동작과 상태를 관리하는 헤드리스 컴포넌트의 개념을 적용합니다. render 속성 함수에서 상태와 일련의 액션을 제공하여 UI에 연결할 수 있게 합니다. 이러한 방식으로, Downshift는 복잡한 상태와 접근성 관리를 담당하는 동시에 UI 제어를 가능하게 해줍니다.

예를 들어, 드롭다운 목록을 만들고 싶다면, 당연히 목록의 데이터, 트리거, 그리고 선택한 항목을 강조하는 방법, 렌더링할 라인 수에 대한 몇 가지 사용자 정의가 필요합니다. 하지만 크로스 브라우저 및 크로스 디바이스를 포함하여 고려해야 할 수많은 예외 사항이 있기 때문에 접근성을 처음부터 구축하고 싶지 않습니다.

![StateSelect 컴포넌트](https://miro.medium.com/v2/resize:fit:720/format:webp/1*PpHMaCNGrahAiz5zOIiSAQ.png)

*(사진: StateSelect 컴포넌트)*

Downshift를 사용하면 몇 줄의 JSX만으로도 접근성 있는 select를 쉽게 만들 수 있습니다.

```tsx
const StateSelect = () => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({items: states});

  return (
    <div>
      <label {...getLabelProps()}>Issued State:</label>
      <div {...getToggleButtonProps()} className="trigger" >
        {selectedItem ?? 'Select a state'}
      </div>
      <ul {...getMenuProps()} className="menu">
        {isOpen &&
          states.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: '#bde4ff'} : {}
              }
              key={`${item}${index}`}
              {...getItemProps({item, index})}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}
```

이 컴포넌트는 Downshift의 `useSelect` 훅을 사용하는 상태 선택자입니다. 이를 통해 사용자는 드롭다운 메뉴에서 상태를 선택할 수 있습니다.

- `useSelect` 는 선택 입력에 대한 상태와 상호 작용을 관리합니다.
- `isOpen`, `selectedItem`, `highlightedIndex` 는 `useSelect` 에 의해 제어되는 상태 변수입니다.
- `getToggleButtonProps`, `getLabelProps`, `getMenuProps`, `getItemProps` 는 해당 요소에 필요한 속성을 제공하는 함수입니다.
- `isOpen` 은 드롭다운이 열려 있는지 여부를 결정합니다.
- `selectedItem` 은 현재 선택된 상태의 값을 보유합니다.
- `highlightedIndex` 는 현재 강조 표시된 목록 항목을 나타냅니다.
- 드롭다운이 열려 있으면, `states.map`은 선택 가능한 상태의 정렬되지 않은 목록을 생성합니다.
- 스프레드 (**`...`**) 연산자는 Downshift의 훅에서 컴포넌트에 props를 전달하는 데 사용됩니다. 여기에는 클릭 핸들러, 키보드 탐색 및 ARIA 속성과 같은 것들이 포함됩니다.
- 상태가 선택되면 버튼 내용으로 표시됩니다. 그렇지 않으면 'Select a state'라고 표시됩니다.

이 접근 방식은 렌더링에 대한 완전한 제어를 제공하므로, 애플리케이션의 모양과 느낌에 맞게 컴포넌트를 스타일링하고 필요한 경우 사용자 정의 동작을 적용할 수 있습니다. 또한 다양한 컴포넌트나 프로젝트 간에 동작 로직을 공유하는 데도 매우 좋습니다.

이미 이 패턴을 따르고 있는 헤드리스 컴포넌트 라이브러리도 몇 가지 더 있습니다.

- [Reakit](https://reakit.io/): 접근 가능한 고급 UI 라이브러리, 툴킷, 디자인 시스템 등을 구축하기 위한 헤드리스 컴포넌트 세트를 제공합니다.
- [React Table](https://tanstack.com/table/v8): 조립하기 위한 헤드리스 유틸리티입니다. 훅 기반이며 모든 종류의 테이블을 만들 수 있습니다.
- [react-use](https://github.com/streamich/react-use): 여러 헤드리스 컴포넌트가 포함된 훅의 모음입니다.

**지속 가능한 React 코드 작성법에 대해 자세히 알아보기 위해, leanpub에서 [관련 책](https://leanpub.com/react-clean-code)을 썼습니다. [이 링크를 통해 30% 할인](https://leanpub.com/react-clean-code/c/mYXp686cMFw1)된 가격으로 사본을 받으실 수 있습니다.**

# 좀 더 깊이 파보기

의도적으로 UI에서 로직을 계속 분리해 나가면, 점차적으로 계층 구조가 형성됩니다. 이 구조는 전체 애플리케이션에 걸쳐있는 기존의 계층형 아키텍처가 아니라 애플리케이션의 UI 일부에 한정된 구조입니다.

![헤드리스 UI 패턴](https://miro.medium.com/v2/resize:fit:720/format:webp/1*dMJwjz15l14yoLvFpxxaDg.png)

*(사진: 헤드리스 UI 패턴)*

이 배치에서 JSX(또는 대부분의 태그)는 최상위 계층에서 정의되며, 이 계층은 전달된 속성을 표시하는 것만을 담당합니다. 바로 아래에는 '헤드리스 컴포넌트'라고 불리는 것이 있습니다. 이 컴포넌트는 모든 동작을 유지하고 상태를 관리하며 JSX와 상호 작용할 인터페이스를 제공합니다. 이 구조의 기반에는 도메인별 로직을 캡슐화하는 데이터 모델이 있습니다. 이러한 모델들은 UI 또는 상태와 관련이 없습니다. 대신, 데이터 관리와 비즈니스 로직에 중점을 둡니다. 이 계층적 접근법은 문제를 깔끔하게 분리하여 코드의 명확성과 유지 관리성을 향상시킵니다.

# **균형 잡힌 시각**

다른 유형의 기술과 마찬가지로 헤드리스 UI도 채택하기 전에 알아야 할 장단점이 있습니다. 먼저 헤드리스 UI의 이점에 대해 논의해 보겠습니다.

1. **재사용성**:헤드리스 컴포넌트의 주요 장점은 재사용성입니다. 로직을 독립적인 컴포넌트로 캡슐화함으로써, 여러 UI 요소에서 이러한 컴포넌트를 재사용할 수 있습니다. 이는 코드 중복을 줄일 뿐만 아니라 애플리케이션 전반에 걸쳐 일관성을 강화합니다.
2. **관심사 분리**: 헤드리스 컴포넌트는 로직과 표현을 명확하게 분리합니다. 이로 인해 코드베이스가 더 관리하기 쉽고 이해하기 쉬워지며, 특히 업무가 분산된 대규모 팀에게 유용합니다.
3. **유연성**: 헤드리스 컴포넌트는 프레젠테이션에 구애받지 않기 때문에 디자인 유연성을 높일 수 있습니다. 기본 로직에 영향을 주지 않고 원하는 만큼 UI를 사용자 정의할 수 있습니다.
4. **테스트 가능성**: 프레젠테이션과 로직이 분리되어 있기 때문에, 비즈니스 로직에 대한 단위 테스트 작성이 더 쉽습니다.

반면, 일체형 컴포넌트보다 조금 더 복잡하기 때문에 다음 고려 사항을 염두에 두고 현명하게 사용해야 합니다.

1. **초기 부담**: 더 단순한 애플리케이션 또는 컴포넌트의 경우, 헤드리스 컴포넌트를 생성하는 것이 과도한 엔지니어링처럼 느껴져 불필요한 복잡성을 초래할 수 있습니다.
2. **학습 곡선**: 이 개념에 익숙하지 않은 개발자들은 처음에 이해하기 어려울 수 있으며, 학습 곡선이 더 가파르게 느껴질 수 있습니다.
3. 남용 **가능성**: 모든 컴포넌트를 헤드리스로 만들려고 하다 보면, 불필요한 경우에도 과도하게 사용하게 되어 코드베이스가 지나치게 복잡해질 수 있습니다.
4. **잠재적 성능 문제**: 일반적으로 큰 문제는 아니지만, 신중하게 처리하지 않으면 공통 로직을 사용하여 여러 컴포넌트를 다시 렌더링하는 것이 성능 문제로 이어질 수 있습니다.

기억하세요, 헤드리스 UI는 다른 아키텍처 패턴처럼 모든 것에 적용되는 만능 해결책이 아닙니다. 이를 사용할지 여부는 프로젝트의 특정 요구 사항과 복잡성을 기반으로 결정되어야 합니다.

# 추가적인 읽을거리

- [Headless User Interface Components](https://www.merrickchristensen.com/articles/headless-user-interface-components/)
- [Headless UI](https://tanstack.com/table/v8/docs/guide/introduction)
- [Modularizing React Applications with Established UI Patterns](https://martinfowler.com/articles/modularizing-react-apps.html)

# 요약

이 글에서, 복잡한 UI 작업을 처리하는 강력한 접근법인 헤드리스 UI의 세계를 탐구했습니다. 렌더링을 분리하는 것이 어떻게 더 유지보수가 쉽고 재사용 가능한 코드를 생성할 수 있게 해주며, 중복성과 잠재적인 버그를 줄일 수 있는지 살펴보았습니다. 먼저 `useToggle`이라는 사용자 정의 리액트 훅을 생성하고 두 개의 별도의 컴포넌트에서의 적용을 보여주는 간단한 예를 통해 이를 설명했습니다. 그런 다음 향상된 입력 컴포넌트 구현을 용이하게 하는 뛰어난 라이브러리인 Downshift와 함께 이 개념을 보다 복잡한 시나리오로 확장했습니다. '헤드리스' 접근법에 대한 더 깊은 이해를 통해, 향후 프로젝트에서 더 확장 가능하고 유지보수가 쉬운 UI를 만드는데 이 패턴을 활용할 수 있기를 바랍니다.

**이 글이 마음에 드신다면, [제 메일링 리스트에 가입](https://juntao.substack.com/)해주세요. 저는 매주 [블로그](https://juntao-qiu.medium.com/), [책](https://leanpub.com/u/juntao), [비디오](https://www.youtube.com/@icodeit.juntao)를 통해 클린 코드와 리팩토링 기법을 공유합니다.**