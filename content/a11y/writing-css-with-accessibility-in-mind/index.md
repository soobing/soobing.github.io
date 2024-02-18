---
title: (번역) 접근성을 고려하여 CSS 작성하기
date: '2024-02-18 00:00:00'
author: soobing
tags: css translate
categories: a11y
draft: false
---
> 원글: https://medium.com/@matuzo/writing-css-with-accessibility-in-mind-8514a0007939

*CSS를 사용하여 웹사이트와 앱의 접근성을 향상시키는 데 도움이 되는 팁에 대한 소개입니다.*

이 글은  [러시아어](https://medium.com/@ABatickaya/%D0%B4%D1%83%D0%BC%D0%B0%D1%8F-%D0%BE-%D0%B4%D0%BE%D1%81%D1%82%D1%83%D0%BF%D0%BD%D0%BE%D1%81%D1%82%D0%B8-%D0%BF%D0%B8%D1%88%D0%B5%D0%BC-css-9032d7b64fb2)(역자: [Workafrolic](https://medium.com/@ABatickaya)), [포르투갈어](https://maujor.com/tutorial/escrevendo-css-com-acessibilidade-em-mente.php)(역자: [Maujor](https://maujor.com/)), 그리고 [일본어](https://frasco.io/writing-css-with-accessibility-in-mind-4fc82b26aecb)(역자: [Keita Nakanishi](https://twitter.com/nakanishy))로 번역되었습니다.

읽기를 선호하지 않는다면, CSS Conf Budapest에서 이 글의 대부분에 대해 이야기한 [녹음본](https://www.youtube.com/watch?v=EOiC2M47GBY)을 들을 수 있습니다.

약 1년 전, 저는 웹 접근성에 좀 더 집중하기 시작했습니다. 저에게 가장 효과적인 학습 방식은 다른 사람들을 가르치는 것입니다. 이것이 바로 제가 [밋업과 컨퍼런스](https://speakerdeck.com/matuzo/)에서 발표하고, 이 주제에 대한 글을 쓰는 이유 중 하나입니다. 저는 Smashing Magazine에 [점진적인 향상](https://www.smashingmagazine.com/2017/07/enhancing-css-layout-floats-flexbox-grid/), 그리고 접근성 기초에 대해 Medium에 글을 작성했습니다. 이 글은 접근성 팁 모음 시리즈 중 세 번째 글입니다.  관심이 있다면 특별한 순서 없이, [접근성을 고려하여 HTML 작성하기](https://medium.com/alistapart/writing-html-with-accessibility-in-mind-a62026493412)와 [접근성을 고려하여 자바스크립트 작성하기](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9)를 지금이나 나중에 읽어보면 좋습니다.

---

제 첫 웹사이트를 만든 것은 약 17년 전이었고, 그때는 [CSS가 아직 상대적으로 새로운 것](https://www.w3.org/Style/CSS20/history.html)이었습니다. 그 이후로 많은 것이 변했고, CSS는 이제 우리에게 웹을 스타일링하기 위한 놀라운 도구를 제공합니다. 우리는 [Verdana](http://www.will-harris.com/verdana-georgia.htm)에서 웹폰트로, 고정된 너비에서 [반응형 웹 디자인](https://alistapart.com/article/responsive-web-design)으로, 테이블 기반 레이아웃에서 [그리드](https://www.w3.org/TR/css-grid-1/)로 넘어갔고, 이제는 border와 font 또는 [shadow](https://alistapart.com/article/cssdropshadows)에 이미지를 사용할 필요가 없습니다. 우리는 [사용자 정의 속성](https://developer.mozilla.org/en-US/docs/Web/CSS/--*), [쿼리](https://hacks.mozilla.org/2016/08/using-feature-queries-in-css/), [calc()](https://developer.mozilla.org/en-US/docs/Web/CSS/calc?retiredLocale=de) 및 많은 새로운 [단위](https://developer.mozilla.org/en-US/docs/Web/CSS/length)들을 가지고 있습니다. 물론 이것은 지난 몇 년간의 훌륭한 발전들 중 일부에 불과합니다.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*sFUYq_Kl0pEjvpwzVoquhA.png)

*접근성을 고려하여 CSS 작성하기*

CSS를 사용하여 문제를 해결하는 무한한 방법과 다양한 속성이 우리의 삶을 더 쉽게 만들어주지만, 동시에 사용자의 경험을 악화시킬 수도 있습니다. 사실, [단 세 줄의 CSS](http://outlinenone.com/) 만으로 웹사이트에 접근하기 어렵게 만들 수 있습니다.

이 글에서는 접근성 있는 CSS를 작성하는 데 도움이 될만한 기술과 고려 사항 그리고 접근방식을 모두 모았습니다. 이 컬렉션은 기본 개념과 잘 알려진 속성으로 시작하여, 끝에는 좀 더 새로운 것들을 다룹니다.

예상했던 것보다 많은 내용을 담게 되어, 가장 관심 있는 섹션으로 바로 이동할 수 있도록 링크가 걸린 목차를 마련했습니다.

- 🔗 [가독성 있는 텍스트에서 읽기 쉬운 텍스트로](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#가독성-있는-텍스트에서-읽기-쉬운-텍스트로)
- 🔗 [가상 요소에 콘텐츠 신중하게 사용하기](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#가상-요소에-콘텐츠-신중하게-사용하기)
- 🔗 [화면만이 유일한 매체가 아니다](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#화면만이-유일한-매체가-아니다)
- 🔗 [완전히 지원되지 않는 속성 값에 대한 대안](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#완전히-지원되지-않는-속성-값에-대한-대안)
- 🔗 [콘텐츠를 숨기는 여러 가지 방법](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#콘텐츠를-숨기는-여러-가지-방법)
- 🔗 [나쁜 대비는 신뢰할 수 없다](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#나쁜-대비는-신뢰할-수-없다)
- 🔗 [색상이 정보의 유일한 단서가 되어서는 안 된다](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#색상이-정보의-유일한-단서가-되어서는-안-된다)
- 🔗 [순서에 신경 쓰기](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#순서에-신경-쓰기)
- 🔗 [중요한 것에 집중하기: focus](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#중요한-것에-집중하기-focus)
- 🔗 [그리드와 평평한 문서 구조](https://soobing.github.io/a11y/writing-css-with-accessibility-in-mind/#그리드와-평평한-문서-구조)

즐겁게 읽어주세요!

# 🔗 가독성 있는 텍스트에서 읽기 쉬운 텍스트로

이미지, 아이콘, 동영상은 오늘날 웹 디자인에서 빼놓을 수 없는 요소이지만, 여전히 거의 모든 웹사이트에서는 텍스트가 콘텐츠의 대부분을 차지합니다. 텍스트는 어떤 기기에서든 읽을 수 있어야 하기 때문에, 폰트 속성을 스타일링하고, 테스트하며, 미세 조정하는 데 상당한 시간을 할애하는 것이 중요합니다.

## 글꼴 크기 확대

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*dHl0fVXbqfbQXE-UG-DFfA.jpeg)

*사용자가 화면에서 떨어진 거리에 따라 글꼴 크기는 확대해야 합니다 ([출처: Marvel](https://blog.marvelapp.com/body-text-small/))*

한때 [12px 글꼴 크기가 본문(body) 텍스트의 표준이었지만](https://www.smashingmagazine.com/2011/10/16-pixels-body-copy-anything-less-costly-mistake/), 해상도가 높은 기기의 등장으로 평균 글꼴 크기는 한동안 15에서 18px 사이에 정착했습니다. 최근 몇 년간, 글꼴 크기는 다시 20px 이상으로 상승했으며, 이는 좋은 일입니다. 텍스트는 스마트폰에서 충분히 커야 하며, TV와 같은 큰 화면에서 멀리서도 읽을 수 있도록 화면 크기에 따라 확대해야 합니다.

서체의 특성이 매우 다양하기 때문에 표준의 최소 크기를 정의하는 것은 의미가 없지만, 작은 화면 크기에 좋은 시작점은 아마도 18-20px일 것입니다.

물론 글꼴 크기에 대해 더 많이 말할 수 있지만, 이 글에서 다루기에는 너무 많습니다. 자세한 내용은 [Christian Miller](https://twitter.com/xtianmiller)의 [당신의 Body 텍스트는 너무 작습니다](https://blog.marvelapp.com/body-text-small/)를 읽어보시길 권장합니다.

## 라인 높이(line-height) 설정

브라우저의 기본 라인 높이는 대략 **`1.2`**입니다. [웹 콘텐츠 접근성 지침](https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-visual-presentation)에 따르면, 텍스트 블록 내의 문단에서는 최소 **`1.5`**여야 합니다.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*11s0oQqUyiWb3hhk1g5MAw.png)

`*line-height`가 1.2인 문단과 1.5인 문단 비교*

문단 내 라인 높이가 조정된 텍스트는 가독성이 향상될 뿐만 아니라, 시각적으로도 꽤 더 매력적입니다.

## 텍스트를 왼쪽 또는 오른쪽으로 정렬

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*yCJ2EkFtsYyKJ9K2FTDW6g.png)

*양쪽 정렬된 텍스트의 불규칙한 단어 간격*

양쪽 정렬이 왼쪽 또는 오른쪽 정렬된 텍스트보다 보기 좋다고 생각하는 사람들도 있지만, 이는 나쁜 관행으로 간주됩니다. `text-align: justify`는 같은 길이의 줄을 만들기 위해 단어 간격을 조정합니다. 이러한 불균일한 공백은 가독성을 해칠 수 있으며 매우 산만해질 수 있습니다. 필요한 경우 단어를 구분하는 것도 해결책이 될 수 있지만, [CSS 하이픈](https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens?redirectlocale=en-US&redirectslug=CSS%2Fhyphens#Languages_support_notes)은 잘 지원되지 않고 예상대로 작동하지 않을 수 있습니다.

## 문단 너비 정의

여러 출처에 따르면 디자이너들은 [줄당 45에서 85자](https://www.smashingmagazine.com/2014/09/balancing-line-length-font-size-responsive-web-design/#line-length-measure-and-reading)를 유지해야 한다고 합니다. 이상적인 문단 너비는 65자라고 여겨집니다.

텍스트 블록의 너비를 정의할 때 [ch 단위](http://caniuse.com/#feat=ch-unit)가 유용할 수 있습니다. `1ch`는 숫자 0을 나타내는 문자의 너비와 동일합니다. 또한, `font-family` 또는 `font-size`가 변경되면 이에 따라 변경됩니다.

```css
p {
  /* 최대 너비 65자 */
  max-width: 65ch;
}
```

어떠한 종류의 반응형 타이포그래피 기술을 사용한다면, 매우 큰 화면에서 사이트를 테스트해야 합니다. 글꼴 크기에 제한이 없다면, 특정 뷰포트 크기에서 텍스트가 읽기 어려워질 수 있습니다. 제한을 설정하는 방법이나 반응형 타이포그래피에 익숙하지 않다면, [Mike Riethmullers](https://twitter.com/MikeRiethmuller)의 글 [반응형 타이포그래피에 대한 정밀한 제어](https://madebymike.com.au/writing/precise-control-responsive-typography/)를 읽어보시기 바랍니다.

# 🔗 가상 요소에 콘텐츠 신중하게 사용하기

우리는 `::before`와 `::after`라는 가상 요소를 사용하여 요소의 맨 처음이나 맨 끝에 CSS를 추가할 수 있습니다. 이것은 디자인 요소를 우리 컴포넌트에 추가하는 매우 일반적이고 편리한 방법을 제공하지만, `content` 속성을 사용하여 내용을 추가하는 것도 가능합니다. [관심사의 분리](https://en.wikipedia.org/wiki/Separation_of_concerns)의 관점에서 보면, 우리는 이렇게 하지 않아야 합니다.

```css
h2 {
  content: "DON'T DO THIS";
}
```

우리의 내용은 HTML 파일, 데이터베이스 또는 API에서 오는 것이지, CSS에서 오는 것이 아닙니다. 때때로 우리는 폰트 아이콘 또는 특수 문자와 같은 텍스트가 아닌 콘텐츠를 추가하기 위해 `content` 속성을 사용합니다. 그렇게 할 때, [일부 스크린 리더가 생성된 콘텐츠를 인식하고 설명한다는 것을](https://tink.uk/accessibility-support-for-css-generated-content/) 기억해야 합니다. 생성된 콘텐츠가 순전히 표현적인 경우 보조 기술에서 숨겨야 합니다. 예를 들어 `aria-hidden`을 사용할 수 있습니다.

```html
<span class="icon icon-key" aria-hidden="true"></span>
```

# 🔗 화면만이 유일한 매체가 아니다

우리가 디지털 시대에 살고 있음에도 불구하고, 사람들은 여전히 물건을 인쇄합니다. 당신의 페이지가 인쇄되거나 PDF로 저장될 때도 접근성이 좋고 사용하기 쉬워야 합니다. 우리가 해야 할 일은 CSS에 `@media` 블록을 추가하여 종이에 어울리지 않거나 의미가 없는 요소(네비게이션 또는 광고)들을 숨기거나 스타일을 조정하는 것입니다.

```css
@media print {
  .header {
    position: static;
  }  nav {
    display: none;
  }
}
```

인쇄된 웹 페이지의 문제 중 하나는 링크가 완전히 쓸모없다는 것입니다. 왜냐하면 그것들이 어디로 이끄는지 알 수 없기 때문입니다. 다행히도 CSS는 [속성의 값들을 드러내고 화면(이 경우에는 종이)에 표시하는 방법을 제공합니다](https://alistapart.com/article/goingtoprint).

```css
@media print {
  a[href^="http"]:not([href*="mywebsite.com"])::after {
    content: " (" attr(href) ")";
  }
}
```

위의 코드는 `href` 속성이 있고 *http*로 시작하지만 mywebsite.com이 값에 포함되지 않은 모든 링크 옆에 `href` 속성의 값을 표시합니다.

Firefox와 특히 Chrome은 [인쇄용 스타일 시트를 테스트하고 디버깅하기 위한 도구를 제공합니다](https://uxdesign.cc/i-totally-forgot-about-print-style-sheets-f1e6604cfd6#63e3).

더 깊이 파고들고 싶다면, [인쇄 스타일 작업을 위한 팁과 트릭들을 모아놓은 것이 있습니다](https://uxdesign.cc/i-totally-forgot-about-print-style-sheets-f1e6604cfd6).

# 🔗 완전히 지원되지 않는 속성 값에 대한 대안

가끔 우리는 특정 속성 값을 사용하고 싶지만, 일부 브라우저에서 지원하지 않기 때문에 사용할 수 없는 상황에 처합니다. 하지만 대안을 제공하는 한, 그것을 사용하는 것을 멈출 필요는 없습니다. 종종 [쿼리](https://hacks.mozilla.org/2016/08/using-feature-queries-in-css/)나 다른 탐지 기능을 사용하지 않고도 할 수 있습니다.

예를 들어, IE와 [이전 버전의 Edge](https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/6514497-vmax-unit)가 이해하지 못하는 `vmax` 단위를 사용하고 싶다고 가정해 봅시다.

```css
div {
  width: 50vmax; /* IE와 Edge 이전 버전에서 작동하지 않음 */
}
```

대안을 제공하기 위해서, 덜 이상적이지만 브라우저가 이해할 수 있는 `width` 속성을 사용하면 됩니다. 예를 들어 `width: 50vw`처럼. 다음 줄에서 실제 원하는 값을 설정합니다.

```css
div {
  width: 50vw;
  width: 50vmax;
}
```

`vmax`를 이해하지 못하는 브라우저는 `width: 50vw`를 해석하고 `width: 50vmax`는 무시합니다. 반면에 `vmax`를 이해하는 브라우저는 먼저 `width: 50vw`를 해석한 다음 `width: 50vmax`를 해석합니다. `vmax` 선언이 `vw` 선언 다음에 오기 때문에, 유저는 `vmax` 로 설정한 버전이 적용 됩니다.

# 🔗 콘텐츠를 숨기는 여러 가지 방법

HTML의 제목들은 문서(document)의 개요를 잡는 데 매우 유용합니다. `<h1>`부터 `<h6>`까지의 제목을 사용함으로써, 브라우저와 다른 소프트웨어에게 문서가 어떻게 구성되어있고 각 부분들이 어떻게 연관되어 있는지 알려줍니다. [문서 개요를 가지는 것은 매우 중요합니다](https://medium.com/alistapart/writing-html-with-accessibility-in-mind-a62026493412#fd4b), SEO에 좋고 스크린 리더 사용자들이 사이트를 탐색하는 데 도움이 됩니다. 디자인에 제목이 없어도 제목이 있으면 좋을 것 같은 경우가 발생할 수 있습니다. 그것은 종종 디자인 자체가 구조를 전달할 때의 경우입니다. 이런 경우에는 마크업에서 제목을 단순히 제거하지 않고 시각적으로 숨깁니다. CSS가 있든 없든 문서의 구조가 명확해야 합니다.

이것은 물론 단 하나의 예일 뿐이며, 폼에서 라벨을 시각적으로 숨기는 것은 또 다른 예입니다(UX 관점에서 [라벨을 숨기는 것은 바람직하지 않습니다](https://www.nngroup.com/articles/form-design-placeholders/)).

CSS에서는 콘텐츠를 숨기는 여러 가지 방법이 있으며, 적절한 기술을 올바른 시나리오에 맞게 선택하는 것은 여러분에게 달려 있습니다.

## 모든 사람으로부터 콘텐츠 숨기기

`hidden` 속성을 사용하거나 `visibility: hidden` 또는 `display: none`을 설정함으로써 콘텐츠를 완전히 숨길 수 있습니다. 사용자는 볼 수 없으며 스크린 리더나 검색 엔진도 읽을 수 없습니다.

## 시각적으로만 콘텐츠 숨기기

시각적으로만 콘텐츠를 숨기는 것은 간단하지 않습니다. 스크린 리더는 여전히 접근 가능하게 해야 하며, 브라우저의 특이점을 다뤄야 하고 요소가 포커스될 때 무슨 일이 발생하는지 결정해야 합니다. 물론, 이미 다른 사람들이 이를 해냈고 해결책이 있습니다.

제가 [연구](https://codepen.io/matuzo/pen/dRzzGv)를 해본 결과, 많은 다양한 접근 방식이 있다는 것을 알게 되었습니다. 그래서 [전문가들에게 의견을 물어보았고](https://twitter.com/mmatuzo/status/878246196267057152), 추천된 기술을 분석하여 무슨 일이 일어나는지 완전히 이해했습니다.

```css
.visually-hidden {
  /* 일반적인 흐름에서 항목을 제거 */
  position: absolute;
  /* 잘못 발음되거나 뭉개지는 텍스트를 위한 해결책 */
  white-space: nowrap;
  /* 가능한 가장 작은 크기로 설정 (일부 화면 낭독기는 높이와 너비가 0인 요소를 무시함) */
  width: 1px;
  height: 1px;
  /* 크기 조정 후 넘치는 콘텐츠 숨기기 */
  overflow: hidden;
  /* 요소의 크기를 변경할 수 있는 모든 속성 초기화 */
  border: 0;
  padding: 0;
  /* 클리핑은 요소의 어떤 부분이 표시될지 정의함. */
  /* 구식 clip 속성은 구형 브라우저를 위함 */
  clip: rect(0 0 0 0);
  /* 최신 브라우저를 위한 clip-path. inset(50%)는 콘텐츠를 사라지게 하는 내부 사각형을 정의함. */
  clip-path: inset(50%);
  /* 현재 아무도 정확히 왜 margin: -1px이 있는지 확실하지 않음. 게다가 이것이 문제를 일으킬 수 있음 (참조:https://github.com/h5bp/html5-boilerplate/issues/1985). */
  margin: -1px;
}
```

이 클래스를 어딘가에 저장하고 시각적으로 콘텐츠를 숨기면서 보조 기술과 검색 엔진은 접근 가능하게 하고 싶을 때 사용하세요.

**스킵 링크**

앞의 클래스들은 스킵 링크로 사용하기에도 적합합니다. 스킵 링크는 초기에는 시각적으로 숨겨져 있지만 포커스될 때 보이는 링크입니다. 스크린 리더와 키보드 사용자들이 소개 콘텐츠를 건너뛰고 주요 콘텐츠로 바로 이동할 수 있도록 페이지의 첫 번째 항목 중 하나여야 합니다. 기본적으로 사용자를 페이지의 특정 부분으로 이동시키는 앵커 링크입니다.

![](https://miro.medium.com/v2/resize:fit:640/format:webp/0*rHLRgRcCEutpb2bD.gif)

*“Skip to content” 링크는 포커스될 때 보입니다*

이 [코드 펜](https://codepen.io/matuzo/pen/RZBNjP#content)에서 직접 시도해보고, `Tab`을 눌러 건너뛰기 링크를 드러내보세요.

## 의미론적으로 콘텐츠 숨기기

때때로 시각적으로 콘텐츠를 표시하되 스크린 리더에서는 숨기는 것이 의미가 있습니다. 예를 들어 아이콘을 사용할 때 그렇습니다. 그런 경우에는 숨기고자 하는 요소에 `aria-hidden` 속성을 추가하고 `true`로 설정하세요.

```html
<button>
  <span class="icon icon-hamburger" aria-hidden="true"></span>
  <span class="text">Menu</span>
</button>
```

## 기타

콘텐츠를 숨기는 다른 방법들도 있습니다. 예를 들어 음수 `text-indent`나 제로 `font-size` 또는 `height` 등입니다. 일부는 작동하지만 특정 주의사항이 있습니다. 자세한 내용은 [webaim.org](http://webaim.org/)의 [텍스트 숨기기 기술](http://webaim.org/techniques/css/invisiblecontent/#techniques)을 읽어보세요.

# 🔗 나쁜 대비는 신뢰할 수 없다

우리의 디자인은 가독성을 위해 텍스트와 배경 사이에 충분한 대비를 제공해야 합니다. 저시력자뿐만 아니라 시각 장애가 없는 사람들도 고대비에서 이익을 얻습니다. 맑은 날에 스마트폰을 밖에서 사용하는 것을 생각해 보세요.

## 색상 대비란 무엇이며 왜 중요한가

[세계보건기구(World Health Organization)](http://www.who.int/blindness/en/)에 따르면 인구의 약 4%가 시각 장애가 있습니다. 남성의 7~12%와 여성의 1% 미만이 어떤 형태의 색상 시력 결함을 가지고 있습니다. 이러한 장애 중 많은 것이 대비에 대한 민감도를 감소시키고, 일부 경우에는 색상을 구별하는 능력까지 줄입니다.

두 색상이 색상 휠의 다른 부분에서 올 때, 그 색상들은 대비를 이룹니다. 일반적으로 말해서, 두 색상의 차이가 클수록 대비가 높습니다. 웹 디자이너 및 개발자로서 우리에게는 단순히 대비 자체뿐만 아니라, 텍스트에 적용됐을 때 얼마나 잘 작동하는지가 중요합니다. 텍스트와 그 배경 사이의 대비는 적어도 중등도 저시력을 가진 사람들이 읽을 수 있을 정도로 높아야 합니다. 물론, 이 기준을 충족하는지 고민할 필요는 없습니다. [웹 접근성 이니셔티브(Web Accessibility Initiative, WAI)](https://www.w3.org/WAI/)는 이를 측정하기 위한 비율을 정의했습니다.

## 최소 대비 비율

대비 비율은 특정 배경에서 특정 크기와 너비를 가진 텍스트의 대비가 얼마나 높은지를 알려줍니다. 비율은 1:1에서 21:1까지 다양할 수 있습니다. 비교된 두 색상이 동일하면 1:1이고, 검정과 흰색이 대립되는 경우 21:1입니다.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*qtktww4-uNco582P.png)

*#777777 색상의 텍스트가 #DDDDDD 배경에서 3.3:1 비율을 가집니다. (출처: [대비 비율](http://leaverou.github.io/contrast-ratio/))*

[웹 콘텐츠 접근성 지침(WCAG) 2.0](https://www.w3.org/TR/WCAG20/)에 따르면, 배경과 그 텍스트(또는 텍스트 이미지) 사이에 최소 [4.5:1의 대비 비율](https://www.w3.org/TR/WCAG20-TECHS/G18.html)이 존재해야 합니다. 이는 `24px` 미만(굵지 않은 경우) 및 `19px` 미만(굵은 경우)인 텍스트에 적용됩니다. 더 큰 텍스트의 경우 3:1 비율이면 충분합니다. 이것들은 레벨 AA 기준을 충족하기 위한 최소 수치입니다. 레벨 AAA를 통과하려면 일반 텍스트의 최소 비율은 [7:1이고 굵은 텍스트는 4.5:1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/visual-audio-contrast7.html)입니다. 규정 준수를 위한 필수 사항은 아니지만, 우리가 아이콘을 사용한다면 텍스트 대비 규정을 충족하는 아이콘을 사용해야 합니다.

저는 제 친구 [Daniel](https://twitter.com/lctdnl)에게 비율에 대해 말했고, 우리가 현재 작업 중인 프로젝트에서 그것을 올바르게 가져가는 것이 중요하다고 말했습니다. 다양한 조합을 시도한 후, 그는 이것이 생각했던 것보다 어렵다고 전화로 말했습니다. 문제는 충분히 시각적으로 매력적인 조합이 없는 것이 아니라, 지난 몇 년 동안 디자이너들이 저대비 조합을 사용하는 데 익숙해졌다는 것입니다. 작은 에이전시뿐만 아니라 [애플이나 구글](https://www.wired.com/2016/10/how-the-web-became-unreadable/)과 같은 큰 회사들도 이 불리한 디자인 추세를 따르고 있습니다.

> 나이가 확실히 내 시력에 영향을 미쳤지만, 나는 디자인 트렌드로 고통받고 있다.
> 

[Kevin Marks](https://www.wired.com/2016/10/how-the-web-became-unreadable/)

대비 비율을 계산하기 위한 [공식이 있지만](https://www.w3.org/TR/WCAG20/#contrast-ratiodef), 오래된 계산기를 꺼내서 계산할 필요는 없습니다. 도구들이 있습니다.

## 대비 비율 측정

Chrome Canary에서는 개발자 도구에서 직접 대비 비율을 표시할 수 있습니다. Remy Sharp가 [블로그 글](https://remysharp.com/2017/08/17/contrast-ratio-in-devtools)에서 이를 공유합니다.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*jxW2YgkXxC1bCDBi.png)

*Chrome 개발자 도구에서의 대비 비율.*

색상 대비와 일반적인 접근성을 테스트하기 위한 많은 도구들이 있습니다. 다음 목록은 광범위하지는 않지만, 제가 선호하는 도구들의 작은 모음집 입니다.

**온라인**

- [대비 비율](http://leaverou.github.io/contrast-ratio/#blue-on-red) by [Lea Verou](http://lea.verou.me/) 
브라우저에서 빠르고 쉬운 대비 체커
- [Colour Contrast Check](https://snook.ca/technical/colour_contrast/colour.html#fg=33FF33,bg=333333) by [Jonathan Snook](https://snook.ca/)
브라우저에서 좀 더 많은 옵션을 가진 대비 체커
- [Wave 도구](http://wave.webaim.org/) 
브라우저 도구로 대비와 더 많은 것들을 체크
- [Accessible Color Spaces](http://kevingutowski.github.io/color.html) by Kevin Gutowski 
자동 대비 체크가 있는 색상 선택기

**브라우저 확장 프로그램과 개발자 도구**

- [Chrome 개발자 도구 감사 패널](https://www.youtube.com/watch?v=b0Q5Zp_yKaU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
Chrome 60은 Lighthouse를 기반으로 한 새로운 감사 패널과 함께 출시되었습니다. 접근성 점수를 부여하고 문제를 나열합니다.
- [tota11y](http://khan.github.io/tota11y/)
대비, 문서 개요 등을 테스트하기 위한 훌륭한 브라우저 확장 프로그램.
- [aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)
aXe Chrome 확장 프로그램을 사용하여 웹 사이트에서 접근성 결함을 자동으로 찾는 도구.

**기타**

- [Sketch용 색상 대비 분석기](https://github.com/getflourish/Sketch-Color-Contrast-Analyser)
“WCAG에 대한 두 레이어의 색상 대비를 계산하는 Sketch 플러그인.
- [더 많은 색상 대비 도구들](http://www.webaxe.org/color-contrast-tools/)

## 고대비의 경험

고대비의 색상을 사용하는 것도 훌륭하지만, 저시력을 가진 사람들은 여전히 웹사이트에서 사용하는 색상을 변경하고 싶어할 수 있습니다. [사용자의 요구는 매우 다양하며](https://www.w3.org/TR/low-vision-needs/#user-needs) 그에 따라 [색상 변경 방법](https://accessibility.blog.gov.uk/2017/03/27/how-users-change-colours-on-websites/)도 다양합니다. 이 사실은 어느 정도 예측 불가능성을 내포하고 있으며, 우리의 페이지들이 항상 완전한 접근성을 보장하기 어렵게 만듭니다. 그래서 우리는 단지, 대비 수준 AA 또는 AAA 기준을 충족하는 것에만 의존해서는 안 되며, 웹사이트를 철저히 테스트하고 대비가 높은 대안을 제공하는 것도 고려해야 합니다.

**윈도우에서의 고대비 모드**

윈도우에서는 [설정에서 고대비 옵션](https://support.microsoft.com/en-us/help/4026951/windows-turn-high-contrast-mode-on-or-off-in-windows)을 사용할 수 있습니다. 사용자는 자신만의 색상 설정을 정의하거나 사전 정의된 테마를 선택할 수 있습니다.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*2aPsF3bwXl5fZuBd.png)

*윈도우에서의 고대비 설정*

간단한 로그인 폼을 만들었고(첫 번째 스크린샷 중 하나. https://dribbble.com/shots/1687064-Simple-Login-Form으로 부터 영감을 받음.) 고대비를 가진 다양한 테마로 테스트해 보았습니다.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*0BWG55TdsZnDBiik.jpg)

*고대비 설정에서의 다양한 로그인 폼*

Anika Henke는 [사용자들이 웹사이트에서 색상을 어떻게 변경하는지](https://accessibility.blog.gov.uk/2017/03/27/how-users-change-colours-on-websites/)에 대해 썼습니다. 그녀는 폼을 테스트하던 중 [입력 필드가 보이지 않게 되었고](https://github.com/alphagov/govuk_elements/pull/397) [버튼이 인식되지 않게 되었다는 것을 발견했습니다](https://github.com/alphagov/govuk_frontend_toolkit/pull/377). 위 스크린샷에서도 같은 일이 발생하는 것을 볼 수 있습니다. 대체 텍스트가 없었다면, 사용자들은 두 개의 입력 필드가 있다는 것을 알지 못했을 것입니다. 인풋과 버튼에 기본 테두리를 추가하는 것은 빠른 해결책이었습니다(브라우저 간 테스트되지 않음).

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*5fii26pptxjctmx1.jpg)

*고대비 설정에서 인풋과 버튼에 테두리가 있는 개선된 로그인 폼*

미디어 쿼리를 사용하여 고대비 모드가 활성화되었는지 감지하고 특정 스타일을 제공할 수 있습니다.

```
/* 고대비 모드 활성화 */
@media (-ms-high-contrast:active) {
}/* 특정 검정-백색 테마의 고대비 모드 */
@media (-ms-high-contrast:black-on-white) {
}/* 특정 검정-백색 테마의 고대비 모드 */
@media (-ms-high-contrast:white-on-black) {
}
```

[Patrick H. Lauke](https://twitter.com/patrick_h_lauke) 는 [윈도우 고대비 모드: -ms-high-contrast의 제한된 유용성](https://www.paciellogroup.com/blog/2016/12/windows-high-contrast-mode-the-limited-utility-of-ms-high-contrast/)에서 이 미디어 기능에 대한 그의 생각과 우려를 공유했습니다. 이에 응답으로 [Greg Whitworth는 다음과 같이 지적했습니다.](http://www.gwhitworth.com/blog/2017/04/how-to-use-ms-high-contrast) "이 기능의 유일한 목적은 대비 민감도를 가진 사용자들에게 더 나은 경험을 제공하는 것입니다. 그러므로, 특정 색상이 무엇인지에 대해 반드시 신경 쓸 필요는 없습니다. 어느 정도까지는, 여러분의 사이트가 어떻게 보이는지보다 어떻게 고대비에서 기능하는지에 대해 신경 써야 합니다."

높은 **대비 크롬 확장 프로그램**

구글 크롬을 위한 [고대비 확장 프로그램](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph?hl=en-US)도 있어, 사용자들이 텍스트를 읽기 쉽게 만드는 여러 고대비 색상 필터로 웹을 탐색할 수 있습니다.

**고대비의 대안**

디자인의 일부분이 충분한 대비를 가지고 있지 않더라도, [*Alternate Version 조항*](https://www.w3.org/TR/WCAG20-TECHS/G174.html#G174-description)을 사용하여 WCAG 기준을 충족할 수 있습니다. 이에 따르면, 사용자에게 페이지의 고대비 버전으로 연결하는 링크나, 페이지의 모든 측면이 준수하도록 페이지를 변경할 수 있는 페이지 상의 컨트롤을 제공해야 합니다.

이 대안에 대한 몇 가지 기준이 있습니다.

- 링크 또는 컨트롤은 페이지에 눈에 띄게 배치되어야 합니다.
- 링크 또는 컨트롤 자체는 대비 요구사항을 충족해야 합니다.
- 새 페이지는 원래 페이지와 동일한 정보와 기능을 포함해야 합니다.
- 새 페이지는 모든 원하는 기준을 충족해야 합니다.

## NoCoffee로 테스트하기

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*1vQ04OwDBN6Q9P4x.png)

*NoCoffee는 저시력, 색상 결핍 및 차단된 시각 영역을 시뮬레이션합니다*

기준을 충족하는 것과 실제 사람을 대상으로 테스트하는 것은 별개의 문제입니다. 모든 사람이 전문적인 테스트 수단을 가지고 있는 것은 아닙니다. 다행히도, [NoCoffee](https://chrome.google.com/webstore/search/NoCoffee%20Vision%20Simulator?hl=en&gl=US)는 저시력, 색상 결핍 및 차단된 시각 영역을 쉽게 시뮬레이션할 수 있는 방법을 제공합니다. 이는 경미한~극심한 시력 문제를 가진 사람들이 직면하는 문제를 이해하는 데 도움이 될 수 있습니다.

# 🔗 **색상이 정보의 유일한 단서가 되어서는 안 된다**

앞서 언급했듯이, 많은 남성들이 시력 결함을 가지고 있습니다. 유형도 다양합니다. 가장 흔한 유형 중 하나인 중색 이상(Deuteranomaly)은 빨강과 녹색을 구분하기 어렵게 만듭니다. 색상 시력 결함이 있는 사람은 인터페이스를 사용할 수 없게 될 수 있으므로 [색상만을 시각적 단서로 사용하는 것을 피해야 합니다.](http://www.particletree.com/features/interfaces-and-color-blindness/)

이전 예시에서 보여준 폼의 입력 필드에 성공 및 오류 상태를 나타내는 테두리를 추가했습니다. 다음 스크린샷은 색상만으로 사용자에게 충분한 피드백을 주지 못한다는 것을 보여줍니다. 테두리 색상이 전혀 보이지 않거나 잘못 보이는 경우가 있습니다.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/0*j6Ao9ijKUk5FrDVB.jpg)

*고대비 모드에서 색상만으로 폼의 성공과 실패를 구별하는 것은 효과적이지 않습니다.*

[간단한 아이콘을 추가하면](https://aerolab.co/blog/web-accessibility/#color) 접근성과 사용자 경험을 개선하는 데 도움이 될 수 있습니다.

링크도 비슷한 예시 중 하나입니다. 링크는 색상만으로 일반 텍스트와 구별되어서는 안 됩니다. [링크에 밑줄을 유지하는 것이](http://adrianroselli.com/2016/06/on-link-underlines.html) 좋습니다.

# 🔗 순서에 신경 쓰기

아이템들을 배치 순서를 바꾸는 방법은 많이 있습니다. 예를 들어, Flexbox에는 `order`와 `flex-direction`이 있고, Grid에는 `order`, `flex-auto-flow` 및 명시적 배치가 있습니다. 이러한 속성들은 매우 유용하지만, [콘텐츠의 DOM 순서와 시각적 표현 사이의 연결이 끊어질 수 있습니다](https://tink.uk/flexbox-the-keyboard-navigation-disconnect/).

다음 예시에서는 여러 그리드 속성을 사용하여 배치된 갤러리의 이미지를 볼 수 있습니다.

<iframe height="300" style="width: 100%;" scrolling="no" title="Grid gallery with jumbled items" src="https://codepen.io/matuzo/embed/yoEXvg?default-tab=html%2Cresult" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
See the Pen <a href="https://codepen.io/matuzo/pen/yoEXvg">
Grid gallery with jumbled items</a> by Manuel Matuzovic (<a href="https://codepen.io/matuzo">@matuzo</a>)
on <a href="[https://codepen.io](https://codepen.io/)">CodePen</a>.
</iframe>

처음에는 문제가 없어 보이지만, 키보드를 사용하여 이미지에서 이미지로 이동할 때 순서를 전혀 예측할 수 없다는 것을 알 수 있습니다. `Tab` 키를 눌렀을 때 다음에 어떤 이미지가 강조될지 알 수가 없습니다. 여기에 포커스 스타일이 없으면 최악의 상황이 될 수 있습니다.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wbvZ9Y0yIcM?si=wQiDof3BePIzeHT4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

예측 불가능하거나 잘못된 순서는 키보드 사용자뿐만 아니라 스크린 리더 사용자에게도 문제가 됩니다. 스크린 리더는 DOM 순서대로 콘텐츠를 표시하므로 소프트웨어는 CSS 순서에 영향을 받지 않지만 사용자는 영향을 받습니다. 스크린 리더 사용자는 콘텐츠의 시각적 표현에 신경 쓰지 않는다고 생각할 수 있지만, [모든 스크린 리더의 사용자가 시각 장애가 있는 것은 아닙니다](http://adrianroselli.com/2017/02/not-all-screen-reader-users-are-blind.html). 일부는 저시력이나 학습 장애가 있어 화면에 표시되는 내용을 보완하기 위해 스크린 리더를 사용합니다.

이 순서 문제는 플렉스나 그리드 아이템뿐만 아니라 모든 종류의 위치 지정에도 적용됩니다. 스타일 없이도 의미가 있는 방식으로 콘텐츠를 정렬하는 것이 중요하며, 디자인에서의 순서와 일치하는지 확인해야 합니다. 일치하지 않으면 디자인을 다시 생각해야 할 수 있습니다. CSS에서 올바르게 위치시키지 못한다고 해서 마크업에서 요소들을 임의로 재배열하지 마세요.

[Rob Dodson’s](https://twitter.com/rob_dodson)의 [콘텐츠 재배열이 접근성에 영향을 미치는가?](https://www.youtube.com/watch?v=8MAvH6vYbDo&feature=em-subs_digest)와 Adrian Roselli의 [코드의 순서가 중요하다](http://adrianroselli.com/2015/09/source-order-matters.html) 글을 참고해 더 자세한 내용을 알아보세요.

# 🔗 중요한 것에 집중하기: focus

저는 이미 키보드 탐색 기초와 포커스 가능한 요소들에 대해 [접근성을 고려하여 자바스크립트 작성하기](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9#7a0c)라는 글을 썼습니다. 이 주제가 처음이시라면, 그 글을 빠르게 읽고 오세요.

키보드를 사용하여 웹사이트를 탐색할 수 있도록 하는 것은 중요합니다. 많은 사용자들이 웹 서핑을 할 때 키보드에 의존합니다. 그들 중에는 운동 장애가 있는 사람들, 시각 장애가 있는 사람들, 손이 없거나 어떤 이유로든 마우스나 트랙패드를 사용할 수 없는 사람들이 있습니다.

CSS를 사용해서 포커스 가능한 요소들에 스타일을 적용할 수 있는 몇 가지 방법이 있습니다.

## **포커스된 아이템 선택하기****

`:focus` 의사 클래스를 사용하여 [포커스 가능한 아이템들](https://allyjs.io/data-tables/focusable.html)이 포커스 되었을때 스타일을 적용할 수 있습니다.

```css
a:focus {
  background-color: #000000;
  color: #FFFFFF;
}
```

기본 포커스 스타일은 브라우저마다 일관성이 없으며 보기 좋지 않은 경우가 많으며, 때로는 [디자인과 잘 어울리지 않습니다](http://adrianroselli.com/2017/02/avoid-default-browser-focus-styles.html). 사용자 경험을 개선하고 디자인에 맞는 맞춤 포커스 스타일을 제공하는 것이 좋습니다.

하지만 무엇을 하든, 대체 스타일을 제공하지 않고 기본 윤곽선(점선 윤곽, 파란색 또는 주황색 반지)만 [제거하지 마세요](http://www.outlinenone.com/). 주로 키보드로 탐색하는 사용자들은 포커스 위치를 알 수 없다면 사이트를 사용할 수 없게 됩니다.

![](!https://miro.medium.com/v2/resize:fit:720/format:webp/0*87H0RkGyYO7cT-hf.png)

*대안 없이 기본 포커스 스타일을 제거하지 마세요 (출처: [outlinenone.com](http://www.outlinenone.com/))*

이것은 단순한 팁이 아니라 [레벨 AA 기준](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-visible.html) 기준입니다.

## 키보드와 마우스 사용자 구분하기

이미 언급했듯이, 디자이너들이 좌절하는 것 중 하나는 [브라우저 간 포커스 스타일의 일관성이 부족하다는 것입니다](https://allyjs.io/tests/focus-outline-styles/index.html#style=focus&key=text,radio,checkbox,textarea,button,link,div&browser=firefox,chrome,safari,ie11). 또한 마우스를 사용할 때도 일부 포커스 가능한 요소들에서 포커스 스타일이 보이는 점도 문제입니다. 때로는 마우스 사용자에게는 포커스 스타일을 보여줄 필요가 없으며, 심지어 방해가 되거나 미학적으로 불쾌할 수 있습니다.

![](!https://miro.medium.com/v2/resize:fit:720/format:webp/0*gZJRNP6GtlghkOn2.png)

*컨텐츠 영역이 클릭되었을 때 크롬에서 파란색 윤곽선이 보이는 맞춤 탭 컴포넌트 (출처: [frend.co](https://frend.co/components/tabs/))*

웹 페이지의 특정 요소에 포커스가 가 있을 때 `outline` 속성을 제거해서는 안됩니다. 왜냐하면 컴포넌트가 더 이상 키보드 사용자에게 접근 불가능하기 때문입니다. 우리에게 필요한 것은 키보드와 마우스 사용을 구별하는 방법입니다. 이것은 [CSS Level 4 선택자](https://drafts.csswg.org/selectors-4) 명세의 일부인 `:focus-ring` 가상 클래스를 사용하여 가능 합니다. "`:focus-ring` 가상 클래스는 요소가 `:focus` 가상 클래스와 일치하고, 사용자 에이전트(브라우저)가 휴리스틱(규칙이나 패턴)을 통해 요소에 특별히 표시되어야 함을 결정할 때 (일반적으로 'focus-ring'을 통해) 적용됩니다." (출처: [CSS 선택자 레벨 4 초안](https://drafts.csswg.org/selectors-4/#the-focusring-pseudo))

```css
/* 기본 윤곽선 제거 */
:focus {
  outline: none;
}

/* 윤곽선이 보여야 할 때만 추가 */
:focus-ring {
  outline: 2px solid blue;
}
```

아쉽게도 현재 어떤 브라우저도 `:focus-ring`의 표준 구현을 지원하지 않습니다. (Firefox는 [-moz-focus-ring](https://developer.mozilla.org/en-US/docs/Web/CSS/%3A-moz-focusring)을 지원함), 하지만 적절할 때 `.focus-ring` 클래스를 추가하는 [경량 폴리필](https://github.com/WICG/focus-ring)이 있습니다.

```css
/* 자바스크립트가 활성화되어 작동하고, .focus-ring 클래스가 없는 
모든 포커스 가능한 요소를 선택하여 윤곽선을 제거합니다 */
.js-focus-ring :focus:not(.focus-ring) {
    outline-width: 0;
}
```

자세한 내용은 Rob Dodson의 [a11ycasts 에피소드, Focus Ring!](https://www.youtube.com/watch?v=ilj2P5-5CjI&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)을 시청하세요.

## 포커스된 자식이 있는 요소에 대한 스타일링

`:focus-within`는 상대적으로 새로운 가상 클래스로, 이미 대부분의 주요 브라우저에서 [지원되고 있습니다](http://caniuse.com/#feat=css-focus-within). 이 클래스를 사용하면 현재 포커스된 자식 요소를 가진 요소를 선택할 수 있습니다.

![](!https://miro.medium.com/v2/resize:fit:640/format:webp/0*LCxl7Sx7ostMw4ZG.gif)

자식 항목 중 하나가 포커스되면 그림자가 표시되는 예시입니다.

```css
form:focus-within {
  box-shadow: 0 0 4px 6px rgba(80,88,156,0.2);
}
```

이 기능을 [CodePen](https://s.codepen.io/matuzo/debug/MvPddP)에서 확인할 수 있습니다.

포커스에 대한 자세한 내용은 YouTube에서 [포커스란 무엇인가요?](https://www.youtube.com/watch?v=EFv9ubbZLKw&index=18&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) 영상을 참조하세요.

# 🔗 그리드와 평평한 문서 구조

새로운 사이트를 만들 때, 우리는 보통 HTML 작성부터 시작합니다. 적절한 마크업을 선택하고 요소들을 논리적 순서에 맞게 배치합니다. 문서가 올바르게 작성되어 있고 잘 구조화되어 있으며 순서가 의미 있게 되면 CSS를 추가합니다. CSS Grid Layout이 나오기 전에는, 특히 DOM 순서와 디자인 순서가 일치하지 않은 경우에 레이아웃을 만드는 것이 매우 까다로웠습니다. `float`, `position` 그리고 때때로 Flexbox조차도 어떤 상황에서는 충분히 유연하지 않았고, 우리는 DOM 순서를 변경하고 싶은 유혹에 빠지곤 했습니다. Grid의 명시적 배치와 해당 영역 덕분에 아이템을 위치시키는 데 필요한 모든 유연성을 갖게 되었습니다. 이것은 훌륭하지만, Grid는 문서 구조를 해칠 수 있는 새로운 유혹을 도입합니다.

다음과 같은 디자인을 가지고 있고, 그 아이템들에 `h2`와 `ul`을 사용한다고 가정해 봅시다. 왜냐하면 그것이 당신에게 가장 의미가 있기 때문입니다.

![](!https://miro.medium.com/v2/resize:fit:720/format:webp/0*m7b7MyTjSmcPTa0U.png)

*제목과 목록이 있는 레이아웃*

```html
<div class="wrapper">
  <h2>Heading</h2>
  <ul>
    <li><a href="#">Element 1</a></li>
    <li><a href="#">Element 2</a></li>
    <li><a href="#">Element 3</a></li>
    <li><a href="#">Element 4</a></li>
    <li><a href="#">Element 5</a></li>
    <li><a href="#">Element 6</a></li>
  </ul>
</div>
```

이러한 요소들을 열에 넣고 `<h2>`를 위치시키는 것은 꽤 쉽습니다... 또는 적어도 그렇게 보입니다.

```css
.wrapper {
  display: grid;
  grid-template-columns: 120px repeat(2, 1fr);
  grid-gap: 20px;
}h2 {
  grid-column: 2 / -1;
}
```

![](!https://miro.medium.com/v2/resize:fit:720/format:webp/0*7ShmPNm7Y6qYovRM.png)

*제목과 목록이 있는 레이아웃. 그리드 컨테이너의 직접적인 자식만 그리드에 배치됩니다.*

하지만 예상과는 달리 보입니다. 문제는 그리드 컨테이너의 직접적인 자식만이 그리드에 배치된다는 것인데, 이 경우에는 `<h2>`와 `<ul>`이 해당됩니다. 하지만 여러분은 `<li>`들을 그리드 아이템으로 만들고 싶습니다. 이 문제에 대한 최악의 해결책은 구조를 단순화시켜 `<ul>`을 제거하고 `<li>`를 `<div>`로 변환하여 그리드 컨테이너의 직접적인 자식으로 만드는 것입니다.

가장 좋은 해결책은 `<ul>`의 `display` 속성을 `subgrid`로 설정하는 것이지만, 불행히도 `subgrid`는 명세의 레벨 1에 포함되지 않았고 우리는 그것이 출시될 때까지 더 기다려야 합니다.

`<ul>`에 `display: contents`를 사용할 수 있지만, 현재 Firefox만이 [이를 지원합니다](http://caniuse.com/#feat=css-display-contents). `display: contents`는 요소의 자식들이 마치 요소의 부모의 직접적인 자식인 것처럼 보이게 만듭니다.

결국, **`<ul>`**에 다른 그리드를 정의해야 합니다. 이것은 이상적이지 않지만, 문서의 구조를 단순화시키고 의미를 해치는 것보다는 낫습니다. 이것은 매우 기본적인 예제이며 목록이 전체 그리드를 차지하기 때문에 부모 그리드에서 일부 값을 상속받을 수 있습니다.

```css
ul {
  /* 전체 그리드를 차지함 */
  grid-column: 1 / -1;  /* 다른 그리드를 생성하고 부모 그리드에서 값을 상속받음 */
  display: inherit;
  grid-template-columns: inherit;
  grid-gap: inherit;  /* display: contents를 이해하는 브라우저를 위해 display 덮어쓰기 */
  display: contents;
}
```

[CodePen](https://codepen.io/matuzo/pen/zdarLX)에서 두 가지 솔루션을 볼 수 있습니다.

# 결론

이 글에서 꽤 많은 내용을 다루고 있지만 CSS와 접근성에 대해 알아야 할 모든 것을 다루지는 않습니다. 그러나 이것은 단순한 출발점 그 이상입니다. DOM 및 포커스 순서를 올바르게 설정하고 고대비에 신경 쓰고 일반적으로 접근성을 고려하여 디자인 하는 것만으로도 이미 훌륭한 작업을 하고 있는 것입니다. 새로운 페이지나 사이트를 만들 때마다 접근성을 약간만 더 고려한다면 웹을 더 나은 곳으로 만들 수 있습니다.

> 제약사항을 고려하여 디자인하는 것은 단순히 잘 디자인하는 것이다.
> 

*[Aaron Gustafson](https://channel9.msdn.com/Events/WebPlatformSummit/edgesummit2016/ES1612)*

이 글을 즐겁게 읽으셨고 새로운 것을 배우셨기를 바랍니다. 질문이나 피드백이 있으시면 댓글을 남겨주시거나 [트위터](http://twitter.com/mmatuzo)를 통해 연락해 주시기 바랍니다.

이 글을 작성하는 데 도움을 주신 멘토 [Aaron Gustafson](https://twitter.com/AaronGustafson)에게 감사드립니다.

# 더 많은 접근성 팁

이 글은 네 부분 시리즈 중 세 번째입니다. 마지막 글은 준비 중이며 곧 공개될 예정입니다.

1. [접근성을 고려한 HTML 작성하기](https://medium.com/@matuzo/writing-html-with-accessibility-in-mind-a62026493412#.3d2vtbp80)
2. [접근성을 고려한 JavaScript 작성하기](https://medium.com/@matuzo/writing-javascript-with-accessibility-in-mind-a1f6a5f467b9)
3. **접근성을 고려한 CSS 작성하기**
4. 다음 글: 접근성을 고려한 디자인 및 개발 방법 배우기

독자 여러분의 독서와 이 글을 좋아하시고 공유해 주시면 감사하겠습니다.

제가 작성한 다른 글도 확인해보실 수 있습니다.

[Progressively Enhancing CSS Layout: From Floats To Flexbox To Grid](https://www.smashingmagazine.com/2017/07/enhancing-css-layout-floats-flexbox-grid/?source=post_page-----8514a0007939--------------------------------)

[The Difference Between Explicit and Implicit Grids](https://css-tricks.com/difference-explicit-implicit-grids/?source=post_page-----8514a0007939--------------------------------)

# 추가적인 읽을 거리와 자료들

## 가독성 있는 텍스트 작성법

- [Your Body Text Is Too Small](https://blog.marvelapp.com/body-text-small/) by Christian Miller
- [How the Web Became Unreadable](https://www.wired.com/2016/10/how-the-web-became-unreadable/) by Kevin Marks
- [Why is Vertical Rhythm an Important Typography Practice?](https://zellwk.com/blog/why-vertical-rhythms/) by Zell Liew
- [Precise control over responsive typography](https://madebymike.com.au/writing/precise-control-responsive-typography/) by Mike Riethmuller

## 가상 요소에 콘텐츠 신중하게 사용하기

- [Accessibility support for CSS generated content](https://tink.uk/accessibility-support-for-css-generated-content/) by Léonie Watson

**화면만이 유일한 매체가 아니다**

- [I totally forgot about print style sheets](https://uxdesign.cc/i-totally-forgot-about-print-style-sheets-f1e6604cfd6) by Manuel Matuzović

**완전히 지원되지 않는 속성 값에 대한 대안**

- [CSS and progressive enhancement](https://justmarkup.com/log/2017/02/css-and-progressive-enhancement/) by Michael Scharnagl

**콘텐츠를 숨기는 여러 가지 방법**

- [Techniques for hiding text](http://webaim.org/techniques/css/invisiblecontent/#techniques)
- [Beware smushed off-screen accessible text](https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe) by J. Renée Beach
- [a11y.js: Hiding DOM elements](https://allyjs.io/tutorials/hiding-elements.html#2017-edition-of-visuallyhidden)
- [Bulletproof Accessible Icon Fonts](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html) by Zach Leatherman

**나쁜 대비는 신뢰할 수 없다**

- [How users change colours on websites](https://accessibility.blog.gov.uk/2017/03/27/how-users-change-colours-on-websites/) by Anika Henke
- [Color Contrast And Why You Should Rethink It](https://www.smashingmagazine.com/2014/10/color-contrast-tips-and-tools-for-accessibility/) by Cathy O’ Connor
- [What is Color Contrast?](http://a11yproject.com/posts/what-is-color-contrast/) by Rachel R. Vasquez
- [A Beginner’s Guide to Contrasting Colors](https://www.thoughtco.com/contrasting-colors-in-design-1078274) by Jacci Howard Bear

**색상이 정보의 유일한 단서가 되어서는 안 된다**

- [Be Kind to the Color Blind](http://www.particletree.com/features/interfaces-and-color-blindness/) by Chris Champbell
- [On Link Underlines](http://adrianroselli.com/2016/06/on-link-underlines.html) by Adrian Roselli

**순서에 신경 쓰기**

- [Not All Screen Reader Users Are Blind](http://adrianroselli.com/2017/02/not-all-screen-reader-users-are-blind.html) by Adrian Roselli
- [Source Order Matters](http://adrianroselli.com/2015/09/source-order-matters.html) by Adrian Roselli

**중요한 것에 집중하기: focus**

- [a11y.js: Default Browser Focus Outline Styles](https://allyjs.io/tests/focus-outline-styles/index.html#style=focus&key=text,radio,checkbox,textarea,button,link,div&browser=firefox,chrome,safari,ie11)
- [Keyboard-Only Focus](http://kizu.ru/en/blog/keyboard-only-focus/#x) by Roman Komarov

**그리드와 평평한 문서 구조**

- [Modern CSS Layout, power and responsibility](https://rachelandrew.co.uk/archives/2015/07/28/modern-css-layout-power-and-responsibility/) by Rachel Andrew