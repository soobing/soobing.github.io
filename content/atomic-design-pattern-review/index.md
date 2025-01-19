---
title: Atomic Design에서 명확한 기준점 찾기
date: '2025-01-19 00:00:00'
author: soobing
tags: atomic-design-pattern design pattern
categories: review troubleshooting
draft: false
---

안녕하세요. 오늘은 1년간 Atomic Design Pattern을 활용하여 디자인 시스템을 구축하면서 겪었던 **구분 기준의 모호함과, 이를 해결하기 위해 명확한 규칙을 정립한 과정**을 회고해보려고 합니다.

이 글에서는 Atomic Design Pattern의 개념 설명은 생략하고, 도입 계기와 겪었던 어려움, 문제 해결 과정, 그리고 그 과정에서 느낀 점을 공유하겠습니다.

## Atomic Design을 도입한 이유

React에서는 [UI를 계층화하여 컴포넌트를 분할](https://ko.react.dev/learn/thinking-in-react)하고, [단일 책임 원칙](https://ko.wikipedia.org/wiki/%EB%8B%A8%EC%9D%BC_%EC%B1%85%EC%9E%84_%EC%9B%90%EC%B9%99)에 따라 설계하는 방식을 권장합니다. 프로젝트가 성장하면서 공통적으로 사용되는 컴포넌트가 점점 증가했고, 이를  체계적으로 관리하고 재사용성을 높이기 위한 방법이 필요했습니다. **컴포넌트를 작은 단위로 나누어 조합하는 방식**은 유지보수성과 확장성을 높이는 데 유용했으며, 이를 효과적으로 적용할 수 있는 패턴으로 [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/)이 적절하다고 판단했습니다.

Brad Frost의 [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) 개념은 화학적 구조를 빗대어 컴포넌트를 작은 단위(Atoms, Molecules)에서 시작해 복잡한 구조(Organisms, Templates, Pages)로 확장하는 방식으로 설명합니다. 이 접근 방식은 **기존의 UI 설계 방식과도 잘 맞았고, 디자인 시스템을 보다 일관성 있게 운영하는 데 도움이 될 것**이라 판단하여 도입하게 되었습니다.

## 겪었던 문제점

Atomic Design Pattern은 **추상적인 개념을 기반으로 한 Mental Model**이기 때문에, 컴포넌트를 어느 단계로 구분할지에 대한 기준이 모호했습니다. 특히 **Atoms-Molecules, Molecules-Organisms 사이의 경계가 불분명**하여 팀원들 간의 의견 차이가 발생했습니다.

예를 들어, `Button`, `Input`, `Textarea` 같은 컴포넌트들은 일반적으로 Atoms로 쉽게 분류할 수 있었지만, `Tooltip`, `BottomSheet`, `Tab` 같은 컴포넌트는 Atoms와 Molecules 사이에서 애매한 위치를 차지했습니다. `Tooltip`은 단독으로도 사용될 수 있지만,  Atom 컴포넌를 활용하여 만들어 졌기에 Molecules로도 볼 수 있었습니다. 또한 `ProductCardThumbnail`이나 `ProductCardPrice` 같은 컴포넌트는 Atomic하지만 우리 서비스에서만 의미를 가지는 UI로, Atoms인지 Molecules인지 의견이 분분했습니다.

이와 같은 모호함은 Molecules-Organisms 사이에서도 발생했습니다. `ProductCardGrid`는 `ProductCard`를 활용하여 그리드 형태로 레이아웃을 구성하는 컴포넌트인데, 이것을 Molecules로 볼 것인지, Organisms로 볼 것인지 논란이 있었습니다. `ProductCardGrid`는 단순한 `ProductCard`의 집합이지만, 페이지 내에서 독립적인 섹션을 형성하기도 하고, 경우에 따라 다른 Organisms 내부에서 사용되기도 했기 때문입니다. 이처럼 **컴포넌트가 단순한 요소의 조합인지, 아니면 독립적인 레이아웃을 구성하는 요소인지 판단하는 것이 어려웠습니다.**

이처럼 컴포넌트들이 명확한 기준 없이 해석될 수 있는 상태에서는 **팀원들 간의 논의가 길어지고, 불필요한 논쟁이 발생하며, 분류 기준에 대한 신뢰도가 낮아지는 문제가 생겼습니다.** 결국, Atomic Design의 목적이었던 효율적인 관리와 확장성이 오히려 방해받는 상황이 되었습니다. 이에 따라 보다 명확한 기준을 마련할 필요가 있었습니다.

## 새로운 분류 기준 정의

Atomic Design Pattern을 완전히 포기하는 대신, **구성 요소를 작은 단위에서 점진적으로 확장하는 방식은** 유지하면서도 분류 기준을 더욱 명확하게 정립하는 방향으로 접근했습니다.

또한 Template, Page는 컴포넌트 단위가 아니기에 과감하게 제거하였고,  Atoms, Molecules, Organisms에 대해서만 확실하게 규칙을 정립했습니다.

### ⭐️ 고려해야 할 사항

1. 컴포넌트가 **특정 계층에 속하기 위해 반드시 하위 계층의 요소를 포함할 필요는 없다.**
    - 예를 들어, Molecules는 Atoms를 하나라도 포함해야만 한다거나, Organisms는 Atoms와 Molecules를 반드시 조합해야만 형성되는 것은 아닙니다.
2. 디자인 시스템은 기본적으로 우리 서비스의 디자인 가이드를 따르기 때문에, **모든 컴포넌트가 어느 정도 서비스의 맥락을 포함할 수밖에 없다.**
    - 따라서, 컴포넌트의 **범용성**을 기준으로 Atoms와 Molecules을 명확히 구분할 필요가 있었습니다.
    - [Shadcn UI,](https://ui.shadcn.com/docs/components/accordion) [Chakra UI](https://www.chakra-ui.com/docs/components/concepts/overview), [Tailwind UI](https://tailwindui.com/components), [Matarial UI,](https://mui.com/material-ui/all-components/) [Ant Design](https://2x.ant.design/docs/react/introduce)과 같은 UI 라이브러리들이 제공하는 컴포넌트들을 살펴보면 “범용성”을 가지는 컴포넌트에 대해서 정의할 수 있습니다.

### 📌 Atoms

Atoms는 UI 라이브러리에서도 공통적으로 활용되는 **범용적인 기본 UI** 요소로, 우리 서비스의 디자인 가이드를 따르지만 특정 도메인에 종속되지 않는 컴포넌트들 입니다. 

- `Button`, `Input`, `Textarea`, `Radio`, `Select`, `Tab`, `Tooltip`, `Backdrop`, `BottomSheet`, `Filter` 등은 보통의 UI 라이브러리들이 제공하는 범용적인 UI 컴포넌트 입니다.
- `BottomSheet`는 `Backdrop`을 활용하여 개발되었지만, 두 컴포넌트 모두 일반적인 UI 패턴이며, 서로 독립적으로도 사용할 수 있기 때문에 Atoms에 속합니다.

### 📌 Molecules

Molecules는 Atoms를 조합하여 만든 UI 또는 Atomic하지만 우리 서비스에서만 의미를 가지는 UI를 포함합니다. 범용성이 떨어지고, 우리 서비스에서만 사용되는 경우가 많으며, 독립적인 레이아웃을 구성하기에는 부족하지만 특정 기능을 수행하는 UI 입니다.

- `ProductCardPrice`: `ProductCard`에서 사용되는 Atomic한 컴포넌트. 그러나, 범용적이지 않고 우리 서비스에서만 사용됩니다.
- `ProductCard`: `ProductCardPrice` 등 다양한 Atomic한 컴포넌트를 조합해서 만든 상품 카드 컴포넌트 입니다.
- `VideoPlayer`: Atoms 컴포넌트를 포함하지는 않지만, 범용적이지 않는 UI로 보기에 Molecules에 속합니다.

### 📌 Organisms

Organisms는 Atoms와 Molecules를 조합하여 만든 복합적인 UI로, 페이지 내에서 독립적인 섹션을 형성할 수 있는 UI를 의미 합니다. 즉, 특정한 기능을 담당하는 큰 UI 블록이며, 화면 내에서 중요한 역할을 수행하며 독립적으로 배치될 수 있습니다. 

- `Header`, `Footer`: 전체 레이아웃을 구성하는 컴포넌트 입니다.
- `ProductCardGrid`: `ProductCard` 를 조합하여 상품 정보를 표시하는 컴포넌트로, 화면 내에서 상품을 Display 하는 독립적인 역할을 수행할 수 있기에 Organisms로 분류 합니다.
- `AttachmentForm`: Textarea, 파일 업로드 및 미리보기, Submit 버튼이 포함된 컴포넌트로, Form을 제출하는 화면에서 자주쓰입니다.
- `Comment`: 댓글 작성자, 첨부된 파일, 미리보기가 포함된 컴포넌트로 댓글을 표시하는 영역에서 독립적으로 역할을 수행합니다.

## 회고 및 느낀 점

Atomic Design은 2013년에 제시된 유명한 프론트엔드 디자인 패턴입니다. 하지만, 이를 실제로 적용하면서 많은 개발자들이 저와 비슷한 고민을 했다는 사실을 알게 되었습니다.

이번 경험을 통해, 새로운 개념이나 라이브러리를 도입하기 전에 **단점과 비판적인 글을 함께 검토**하는 것이 중요하다는 점을 깨달았습니다.

또한, **Atomic Design을 맹목적으로 따르기보다는, 프로젝트의 특성과 팀의 협업 방식에 맞게 유연하게 적용**하는 것이 더 효과적이라는 점도 배울 수 있었습니다.