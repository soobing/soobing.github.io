---
emoji: 🔫
title: cypress 주요 api 모음
date: '2022-03-03 00:00:00'
author: soobing
tags: cypress test e2e
categories: test
---

# get vs find
cy.get은 되지만, cy.find는 불가능.
cy.get.find 이런식으로 체이닝 가능

# within
cy.get or cy.find로 좁힌 범위 내에서 무언가 실행할때 within이  유용하다.

# should, and
then 사용하는 것보다 should와 and의 조합으로 여러가지 조건을 테스트하는것을 권장함.
