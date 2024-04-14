---
title: (번역) 스트리밍 HTML과 DOM 비교 알고리즘
date: '2024-03-21 00:00:00'
author: soobing
tags: webdev javascript experimental
categories: translate react
draft: false
---


> 원글: https://aralroca.com/blog/html-node-streaming

![썸네일](https://aralroca.com/_next/image?url=%2Fimages%2Fcover-images%2F28_cover_image.jpg&w=1080&q=75)

최근 몇 년간 브라우저는 HTML과 자바스크립트를 스트리밍을 지원하기 시작했습니다. 이 글에서는 이에 대한 장점과 브라우저가 자동으로 수행하지 않는 다른 작업들을 통해 스트리밍의 이점을 최대한 활용할 수 있는 방법에 대해 이야기할 것입니다.

## 스트리밍 HTML

초기 로드하는 동안에는 브라우저가 자동으로 처리하기 때문에 크게 신경 쓸 필요가 없습니다. 스트리밍 하는 동안 HTML 청크를 받으면, 브라우저는 그 콘텐츠를 출력합니다.

서버에서 스트리밍을 활성화하려면 헤더를 조정해야 합니다. 아래는 예시입니다.

```json
{
  "transfer-encoding": "chunked",
  "vary": "Accept-Encoding",
  "content-type": "text/html; charset=utf-8"
}
```

그리고 응답에서는 [`ReadableStream`](https://bun.sh/docs/api/streams)을 사용합니다. 이것은 [Bun](https://bun.sh/)을 사용한 예시입니다.

```jsx
const encoder = new TextEncoder()

// ...

return new Response(
  new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode('<html lang="en">'))
      controller.enqueue(encoder.encode('<head />'))
      controller.enqueue(encoder.encode('<body>'))
      controller.enqueue(encoder.encode('<div class="foo">Bar</div>'))
      controller.enqueue(encoder.encode('</body>'))
      controller.enqueue(encoder.encode('</html>'))
      controller.close()
    },
  })
)

```

`enqueue` 안에 있는 각 문자열은 브라우저가 받게 될 청크입니다.

## 스트리밍 중 HTML 콘텐츠 변경

성능상의 이점이 많기 때문에 많이 사용되는 방법 중 하나는 스트리밍 되는 동안 HTML 콘텐츠를 변경하는 것입니다. 대표적인 예가 [React Suspense](https://react.dev/reference/react/Suspense)입니다. 이 아이디어는 HTML의 나머지 부분을 로드하는 동안 빈 콘텐츠(플레이스홀더, 스켈레톤 또는 스피너)를 보여주고 그동안 누락된 콘텐츠를 로드하는 것입니다. 서버에 누락된 콘텐츠가 있으면 스트리밍 시간에 이를 변경합니다!

아마 당신이 처음 이 내용을 듣는다면 이런 궁금증이 생길겁니다. 브라우저에 의해 이미 전송되어 처리된 HTML의 일부를 어떻게 수정할 수 있다는 것일까요 🤔? 

음, 브라우저는 스트리밍하는 동안 작은 JS 스크립트를 실행할 수 있을 만큼 충분히 똑똑합니다. 하지만, `module(모듈)` 타입이 아닌 스크립트여야 합니다. 왜냐하면 모듈 타입은 항상 모든 HTML이 로드될 때까지 실행 되지 않고 기다리기 때문입니다. 그래서 이번 경우 모듈 타입에는 관심이 없습니다.

다음은 시각적으로 이해하기 쉽게 만든 예시 입니다.(보통 이것보다 복잡합니다.)

```jsx
return new Response(
  new ReadableStream({
    async start(controller) {
      const suspensePromises = []

      controller.enqueue(encoder.encode('<html lang="en">'))
      controller.enqueue(encoder.encode('<head>'))
      // "unsuspense"를 허용하는 코드 로드
      controller.enqueue(
        enconder.encode('<script src="unsuspense.js"></script>')
      )
      controller.enqueue(encoder.encode('</head>'))
      controller.enqueue(encoder.encode('<body>'))

      // 플레이스홀더 추가 (suspense)
      controller.enqueue(
        encoder.encode('<div id="suspensed:1">Loading...</div>')
      )

      // 콘텐츠 로드 - "await" 없음 (중요)
      suspensePromises.push(
        computeExpensiveChunk().then((content) => {
          // 실제 콘텐츠 큐 인입
          controller.enqueue(
            encoder.encode(
              `<template id="suspensed-content:1">${content}</template>`
            )
          )
          // suspensed 콘텐츠를 실제 콘텐츠로 대체할 스크립트를 enqueue
          controller.enqueue(encoder.encode(`<script>unsuspense('1')</script>`))
        })
      )

      controller.enqueue(encoder.encode('<div class="foo">Bar</div>'))
      controller.enqueue(encoder.encode('</body>'))
      controller.enqueue(encoder.encode('</html>'))

      // 스트림을 닫기 전에 suspend된 모든 콘텐츠를 기다림
      await Promise.all(suspensePromises)

      controller.close()
    },
  })
)
```

`unsuspense.js` 파일은 `window.unsuspense`를 노출하여 스트리밍 중에 실행될 수 있게 하고, 이를 통해 `suspensed:1`의 콘텐츠를 `suspensed-content:1` 템플릿의 콘텐츠로 교체 합니다. 이 경우, 사용자는 `Loading...` 텍스트와 `Bar`텍스트가 있는 `div`를 볼 수 있습니다. 콘텐츠가 처리되면, `Loading...` 콘텐츠는 실제 콘텐츠로 변경됩니다.

이점을 생각해보면, 모든 것이 **단일 요청**으로 이루어지고 사용자는 추가 요청을 하지 않아도 HTML과 그 변경사항을 즉시 확인 할 수 있습니다. 지난 몇 년 동안 이러한 요청은 클라이언트에서 만들어졌습니다. 예를 들어 React에서는 `useEffect`를 사용했고, 모든 HTML이 로드될 때까지 실행되지 않았으며, 서버에 다른 추가 요청을 하여 개발자들의 작업을 복잡하게 만들었습니다.

정리해보면, 스트리밍 중에 HTML 콘텐츠를 수정할 수 있게 되어 `async` 컴포넌트를 사용할 수 있고, `Suspense`와 함께 직접 `fetch`를 사용하거나 데이터베이스 요청을 할 수 있게 되었습니다.

## 런타임 중 HTML 스트리밍

우리는 HTML 스트리밍의 실용성에 대해 HTML의 초기 로딩에 초점을 맞춰 이야기했습니다. 그러나, 초기 로딩 외에도 HTML을 스트리밍하고자 하는 다른 시나리오가 있을까요?

네, 두 가지 경우가 있습니다.

- [내비게이션 (뷰 트랜지션 API)](https://soobing.github.io/react/html-node-streaming/#내비게이션-뷰-트랜지션-api)
- [RPCs (예: 서버 액션)](https://soobing.github.io/react/html-node-streaming/#rpcs-예-서버-액션)

### **내비게이션 (뷰 트랜지션 API)**

2023년부터 크롬이 [뷰 트랜지션 API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)를 발표했으며, 사파리도 [곧](https://github.com/WebKit/WebKit/commit/7d082967d8f5667853d07abe11396426417c5e68) 지원할 것으로 보입니다.

뷰 트랜지션 API는 싱글 페이지 애플리케이션(SPA)을 모방하여, 다양한 DOM 상태 간의 애니메이션 전환을 쉽게 생성할 수 있는 메커니즘을 제공하면서 동시에 DOM 콘텐츠를 한 번에 업데이트합니다.

내비게이션 중에는 보통 모든 HTML 콘텐츠를 다른 콘텐츠로 바꾸고 싶어 합니다. 하지만, 우리는 대기할 필요 없이 스트리밍의 이점을 최대한 활용해야 합니다.

```jsx
window.navigation.addEventListener('navigate', navigate)

function navigate(event) {
  const url = new URL(event.destination.url)
  const decoder = new TextDecoder()

  // 보안을 위해 동일 출처 내비게이션만 가로챕니다
  if (location.origin !== url.origin) return

  event.intercept({
    async handler() {
      const res = await fetch(url.pathname)
      // 새로운 "샌드박스" HTML 문서 생성
      const doc = document.implementation.createHTMLDocument()
      const stream = res.body.getReader()

      // 부드러운 스크롤링과 함께 새 문서로 전환
      await document.startViewTransition(() => {
        // 현재 문서의 DOM과 샌드박스의 DOM을 연결
        document.documentElement.replaceWith(doc.documentElement)
        document.documentElement.scrollTop = 0
      }).ready

      // 응답 body를 청크로 처리
      while (true) {
        const { done, value } = await stream.read()

        if (done) break // 스트림이 끝나면 루프 종료

        // 트랜지션 중에 샌드박스 문서에 디코드된 콘텐츠 주입
        // 샌드박스는 문자열을 처리하고 파싱한 다음, 트랜지션 중에
        // 실제 DOM으로 옮긴다.
        await document.startViewTransition(() =>
          doc.write(decoder.decode(value))
        ).ready
      }
    },
  })
}

```

이 예시에서는 [`document.implementation.createHTMLDocument`](https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createHTMLDocument)이 `doc.write`와 함께 사용되어 스트림을 처리함으로써 각 청크를 다른 트랜지션으로 만듭니다. `doc.write`는 경고를 일으키지 않아야 하는데, 이 컨텍스트에서는 잘 사용되었습니다. 이 트릭에 대한 더 자세한 내용은 [크롬에서 제공된 영상](https://www.youtube.com/watch?v=LLRig4s1_yA&t=1286s)을 살펴보세요.

위의 예시는 오직 모든 HTML 콘텐츠를 다른 콘텐츠로 대체하기 위해서만 사용되지만, 스트리밍 중에 HTML 노드들을 더 효과적으로 제어하고 싶다면 어떨까요? 아마도 이 스트리밍 중에 특정 노드들을 필터링할 수도 있을 것입니다.

이를 가능하게 하기 위해, 스트림 리더를 HTML 노드 생성기로 쉽게 변환할 수 있게 하는 [`parse-html-stream`](https://github.com/aralroca/parse-html-stream) 라이브러리를 사용할 수 있습니다. 이 경우, 다음과 같이 사용할 수 있습니다.

```jsx
import parseHTMLStream from 'parse-html-stream' // 임포트

window.navigation.addEventListener('navigate', navigate)

function navigate(event) {
  const url = new URL(event.destination.url)
  const decoder = new TextDecoder()

  if (location.origin !== url.origin) return

  event.intercept({
    async handler() {
      const res = await fetch(url.pathname)
      const doc = document.implementation.createHTMLDocument()
      const stream = res.body.getReader()

      await document.startViewTransition(() => {
        document.documentElement.replaceWith(doc.documentElement)
        document.documentElement.scrollTop = 0
      }).ready

      // 사용하기
      for await (const node of parseHTMLStream(reader)) {
        // 스트리밍 중에 각 HTML 노드를 완전히 통제 가능
        console.log(node.nodeName)
      }
    },
  })
}

```

그러나 이제 메인 document의 올바른 위치에 노드를 추가하는 것이 훨씬 더 복잡해지지 않았나요? 그렇다면 이 모든 것이 의미가 있을까요?

정확하게 이해하기 위해 조금만 더 알아보죠.

### RPCs (**예: 서버 액션**)

원격 프로시저 호출([RPC](https://en.wikipedia.org/wiki/Remote_procedure_call))은 개발자가 엔드포인트를 구현할 필요가 없고 브라우저-서버와 서버-브라우저 간의 모든 통신 로직이 RPC에 의해 처리되도록 사용됩니다. RPC의 예로는 스트리밍 도중 DOM 업데이트를 트리거할 수 있는 [React 서버 액션](https://react.dev/reference/react/use-server#server-actions-in-forms)이 있습니다. 하지만, 여기서 React는 하이퍼미디어(HTML)를 전송하는 대신 가상 DOM을 사용하고 실제 DOM과 함께 diff(비교) 알고리즘을 사용합니다.

이 글에서는 RPC 구현 방법에 대한 기술적인 세부 사항을 설명하지 않겠지만, React와 다른 컨텍스트에서 서버 액션이 어떻게 작동할지 이해하기 위해, `onClick`과 같은 이벤트가 서버 컴포넌트에서 작동하는 예시를 보여주는 이 동영상을 시청 하시길 바랍니다. 즉, 사용자가 브라우저에서 버튼을 클릭하면 `onClick` 함수가 서버에서 실행됩니다.

<iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 528px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=aralroca&amp;dnt=false&amp;embedId=twitter-widget-0&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1753061161866572213&amp;lang=en&amp;origin=https%3A%2F%2Faralroca.com%2Fblog%2Fhtml-node-streaming&amp;sessionId=5a74b26c0da2da7e28afa5cb0702a44f45e45cf4&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1753061161866572213"></iframe>


이 트윗의 영상은 제가 진행 중인 실험적인 프레임워크에 대한 것으로, 몇 달 내에 공개하여 더 자세한 정보를 제공할 수 있기를 바랍니다.

서버에서 DB나 원하는 모든 것을 수정할 수 있고 브라우저에 반영된 HTML 변경 사항을 볼 수 있다는 것이 매력적입니다.

<iframe id="twitter-widget-1" scrolling="no" frameborder="0" allowtransparency="true" allowfullscreen="true" class="" style="position: static; visibility: visible; width: 550px; height: 572px; display: block; flex-grow: 1;" title="X Post" src="https://platform.twitter.com/embed/Tweet.html?creatorScreenName=aralroca&amp;dnt=false&amp;embedId=twitter-widget-1&amp;features=eyJ0ZndfdGltZWxpbmVfbGlzdCI6eyJidWNrZXQiOltdLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X2ZvbGxvd2VyX2NvdW50X3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9iYWNrZW5kIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19yZWZzcmNfc2Vzc2lvbiI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfZm9zbnJfc29mdF9pbnRlcnZlbnRpb25zX2VuYWJsZWQiOnsiYnVja2V0Ijoib24iLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X21peGVkX21lZGlhXzE1ODk3Ijp7ImJ1Y2tldCI6InRyZWF0bWVudCIsInZlcnNpb24iOm51bGx9LCJ0ZndfZXhwZXJpbWVudHNfY29va2llX2V4cGlyYXRpb24iOnsiYnVja2V0IjoxMjA5NjAwLCJ2ZXJzaW9uIjpudWxsfSwidGZ3X3Nob3dfYmlyZHdhdGNoX3Bpdm90c19lbmFibGVkIjp7ImJ1Y2tldCI6Im9uIiwidmVyc2lvbiI6bnVsbH0sInRmd19kdXBsaWNhdGVfc2NyaWJlc190b19zZXR0aW5ncyI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdXNlX3Byb2ZpbGVfaW1hZ2Vfc2hhcGVfZW5hYmxlZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9LCJ0ZndfdmlkZW9faGxzX2R5bmFtaWNfbWFuaWZlc3RzXzE1MDgyIjp7ImJ1Y2tldCI6InRydWVfYml0cmF0ZSIsInZlcnNpb24iOm51bGx9LCJ0ZndfbGVnYWN5X3RpbWVsaW5lX3N1bnNldCI6eyJidWNrZXQiOnRydWUsInZlcnNpb24iOm51bGx9LCJ0ZndfdHdlZXRfZWRpdF9mcm9udGVuZCI6eyJidWNrZXQiOiJvbiIsInZlcnNpb24iOm51bGx9fQ%3D%3D&amp;frame=false&amp;hideCard=false&amp;hideThread=false&amp;id=1760028908647559375&amp;lang=en&amp;origin=https%3A%2F%2Faralroca.com%2Fblog%2Fhtml-node-streaming&amp;sessionId=8fcd4678e1e62c18ee473537226fc2943432262f&amp;theme=light&amp;widgetsVersion=2615f7e52b7e0%3A1702314776716&amp;width=550px" data-tweet-id="1760028908647559375"></iframe>



이를 가능하게 하기 위해, RPC 클라이언트 코드(200B)에서 액션에 대한 요청을 하고, 첫 번째 요청인 경우, 응답을 처리하기 위한 지연 로딩 클라이언트 코드(1kb)를 다운로드하기 위해 다시 요청을 합니다. 이 마지막 코드는 [DOM 비교 알고리즘](https://aralroca.com/blog/html-node-streaming#dom-diffing-algorithm)을 사용하여 변경된 부분에 대해서만 HTML을 처리하고 DOM을 업데이트하는 역할을 담당합니다.

이것의 이점을 이해하기 위해 클라이언트에서 거의 JS 없이 SPA를 구축할 수 있다고 생각해보세요. 단지 RPC만 있으면 됩니다. 다만 서버 액션은 서버를 포함하는 상호작용에 대해 의미가 있습니다. 순수하게 클라이언트 상호작용이나 Web API가 필요한 경우에는 웹 컴포넌트를 사용할 수 있습니다.

전체 DOM이 아닌 DOM의 수정된 부분만 업데이트하는 또 다른 이점은 웹 컴포넌트와의 탁월한 통합입니다. 변경사항에 반응하기 위해 signal을 활용하는 웹 컴포넌트는 동기화를 잃지 않고 내부 상태를 유지할 수 있습니다.

### DOM 비교 알고리즘

React는 [문서 객체 모델](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) (DOM)을 업데이트하기 위해 비교 알고리즘을 사용하지만 [가상 DOM](https://demystifying-rsc.vercel.app/static-content/2/)을 사용하므로, 하이퍼미디어(HTML) 대신 가상 DOM을 직접 전송합니다. 이는 클라이언트 컴포넌트는 DOM에 반응하지 않기 때문에 더 효과적으로 제어하기 위함입니다. 반면, 우리의 클라이언트 컴포넌트가 시그널을 사용하는 웹 컴포넌트인 경우, 프로퍼티들은 반응형이며 새로운 어트리뷰트를 추가하여 엘리먼트가 업데이트되면, 웹 컴포넌트는 내부 상태를 잃지 않고 변경 사항에 반응합니다. 이를 통해 HTML을 직접 전송하고 DOM과 직접 작업할 수 있습니다.

현재 여러 오픈소스 DOM 비교 알고리즘이 있으며, 아래 몇 가지 예시가 있습니다.

- [morphdom](https://github.com/patrick-steele-idem/morphdom)
- [set-dom](https://github.com/DylanPiercey/set-dom)
- [diffhtml](https://diffhtml.org/)
- [diffDOM](https://github.com/fiduswriter/diffDOM)
- [nanomorph](https://github.com/choojs/nanomorph)
- [incremental-dom](https://google.github.io/incremental-dom/)

대부분의 구현은 [너비 우선 탐색(BFS)](https://en.wikipedia.org/wiki/Breadth-first_search)을 사용하여 DOM 트리를 탐색하고 업데이트합니다.

![](https://aralroca.com/images/blog-images/BFS.gif)

*예시: 너비 우선 탐색(BFS) 애니메이션*

그러나 HTML 스트리밍 중에는 노드가 [깊이 우선 탐색(DFS)](https://en.wikipedia.org/wiki/Depth-first_search) 순서로 도착합니다.

![](https://aralroca.com/images/blog-images/DFS.gif)

*예시: 깊이 우선 탐색(DFS) 애니메이션*

서버가 가능한 한 빨리 HTML을 전송을 시작할 수 있고 브라우저가 전체 응답이 도착할 때까지 기다리지 않는다면, 도착하는 대로 HTML 코드를 조각으로 처리할 수 있습니다.

![](https://aralroca.com/images/blog-images/html-parsing-tasks.png)

*서버에서 제공하는 HTML 코드의 파싱 및 렌더링*

마지막 이미지는 브라우저가 [HTML 스트리밍을 처리](https://web.dev/articles/client-side-rendering-of-html-and-interactivity)하는 방법이지만, 스트리밍을 위한 DOM 비교 알고리즘을 지원하려면 동일한 작업을 수행해야 합니다.

페이지 변경사항을 사용자에게 최대한 빨리 제공하기 위해 렌더링 작업이 점진적으로 진행됩니다. 이 접근 방식은 페이지의 [상호작용 이후 다음 페인트까지(INP)](https://web.dev/articles/inp) 점수를 더 높게 만듭니다.

청크가 DFS 순서로 도착하더라도, 브라우저는 엘리먼트를 정의하는 모든 정보를 받기 전까지는 렌더링할 수 없습니다.

[내비게이션](https://aralroca.com/blog/html-node-streaming#navigation-view-transitions-api)에 대해 이야기했을 때를 기억해보면, 우리는 다음과 같은 예를 들었습니다.

```jsx
for await (const node of parseHTMLStream(reader)) {
  // 스트리밍 중에 각 HTML 노드를 완전히 제어할 수 있습니다.
  console.log(node.nodeName)
}
```

이 시점에서, 노드는 항상 DFS 순서로 도착합니다. 하지만 이것만으로는 충분하지 않습니다. 왜냐하면 우리는 DOM 비교 알고리즘 내부의 트리를 살펴봐야 하기 때문입니다. 즉, `firstChild`, `nextSibling`, `parentNode` 등을 방문하여 실제 DOM 노드와 비교해야 합니다.

이를 위해 제가 최근에 오픈소스로 공개한 [`parse-html-stream`](https://github.com/aralroca/parse-html-stream) 라이브러리는 스트리밍 중에 노드 트리를 순회하는 것을 지원하여 점진적인 렌더링을 수행할 수 있습니다. 노드 트리를 순회하는 동안 라이브러리가 HTML 청크를 도착하는 순서대로 파싱하고, 파싱된 노드가 있을 때 렌더링 변경을 할 수 있게 해줍니다.

```jsx
import htmlStreamWalker from 'parse-html-stream/walker'

// ...

const reader = res.body.getReader()
const walker = await htmlStreamWalker(reader)

// 루트 노드
const rootNode = walker.rootNode

// 스트림 청크를 고려하여 firstChild를 제공
const child = await walker.firstChild(rootNode)

// 스트림 청크를 고려하여 nextSibling을 제공
const brother = await walker.nextSibling(rootNode)

// 모든 HTML 노드에서 수행 가능
const childOfBrother = await walker.firstChild(brother)

```

이 경우 `rootNode`, `child`, `brother`, `childOfBrother`는 노드입니다. 그리고 우리는 모든 노드 속성에 접근할 수 있습니다. 그러나 스트리밍 청크가 아직 도착하지 않았기 때문에 다음 두 속성이 참이 아닐 수 있음에 유의하세요.

- `node.firstChild` ❌ - 경우에 따라 정확히 작동할 수도 있지만, 그렇지 않을 수도 있습니다. 왜냐하면 다음 청크가 노드의 자식일 수 있기 때문입니다.

- `node.nextSibling` ❌ - 경우에 따라 정확히 작동할 수도 있지만, 그렇지 않을 수도 있습니다. 왜냐하면 다음 청크가 노드의 형제일 수 있기 때문입니다.

이러한 경우를 위해 `parse-html-stream` **walker**는 항상 작동하도록 그들을 대체하는 두 메서드를 제공합니다.

- `walker.firstChild(node)` ✅ - 먼저 `firstChild`를 가져오려고 시도하고, 아직 없다면 다음 청크가 그것을 가지고 있는지 확인하기 위해 다음 청크를 기다립니다. 다음 청크가 도착하면 다음 노드를 처리합니다.
- `walker.nextSibling(node)` ✅ - 먼저 `nextSibling`를 가져오려고 시도하고, 아직 없다면 다음 청크가 그것을 가지고 있는지 확인하기 위해 다음 청크를 기다립니다. 다음 청크가 도착하면 다음 노드를 처리합니다.

이러한 함수의 실행 후에도 초기 노드들은 컨텍스트를 잃지 않고 사용될 수 있습니다.

## 결론

이 글에서는 초기 렌더링을 넘어 HTML 스트리밍의 이점과 실용적인 응용에 대해 이야기했습니다.

우리는 [RPC](https://soobing.github.io/react/html-node-streaming/#rpcs-%EC%98%88-%EC%84%9C%EB%B2%84-%EC%95%A1%EC%85%98), [뷰 트랜지션 API](https://soobing.github.io/react/html-node-streaming/#%EB%82%B4%EB%B9%84%EA%B2%8C%EC%9D%B4%EC%85%98-%EB%B7%B0-%ED%8A%B8%EB%9E%9C%EC%A7%80%EC%85%98-api), [DOM 비교 알고리즘](https://soobing.github.io/react/html-node-streaming/#dom-%EB%B9%84%EA%B5%90-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98) 같은 더 기술적인 개념들에 대해 언급했지만, 각각의 주제에 대해 자세히 들어가기보다는 각각에서 HTML 스트리밍을 어떻게 사용하는지에 대해 이야기했습니다. 이 글에서 깊이 다루지 않은 주제에 대해 더 알고 싶다면, 댓글로 달아주시면 주제에 초점을 맞춘 다른 글을 작성하는 데 참고하겠습니다.

또한, [parse-html-stream](https://github.com/aralroca/parse-html-stream)에 대해서도 이야기했는데, 이는 제가 최근에 오픈소스로 공개한 작은 라이브러리로 누구나 사용할 수 있습니다.

마지막으로, 웹은 하이퍼미디어(HTML)를 전송하기 위해 발명되었습니다. 지난 몇 년 동안 JSON과 많은 클라이언트 코드를 사용했지만, 개발을 더 쉽게 하고 매우 적은 자바스크립트 코드로 웹사이트를 더 가볍게 만들 수 있는 [하이퍼미디어 주도(Hypermedia-Driven) 응용 프로그램](https://htmx.org/essays/hypermedia-driven-applications/)이 더 많이 나오기를 바랍니다. 따라서, 저는 초기 로드를 넘어 HTML 스트리밍의 미래가 매우 밝다고 생각합니다.

## 참조

- https://bun.sh/docs/api/streams
- https://react.dev/reference/react/Suspense
- https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- https://github.com/aralroca/parse-html-stream
- https://web.dev/articles/client-side-rendering-of-html-and-interactivity
- https://htmx.org/essays/hypermedia-driven-applications/
- https://en.wikipedia.org/wiki/Depth-first_search
- https://en.wikipedia.org/wiki/Breadth-first_search
- https://github.com/patrick-steele-idem/morphdom
- https://github.com/DylanPiercey/set-dom
- https://diffhtml.org/
- https://github.com/fiduswriter/diffDOM
- https://github.com/choojs/nanomorph
- https://google.github.io/incremental-dom/
- https://demystifying-rsc.vercel.app/static-content/2/