---
title: 🥊조큼 어려운 git 기능들
date: 2020-06-21 23:06:40
category: dev
thumbnail: './images/git.png'
draft: false
---

![git](./images/git.png)

부끄럽지만 여태껏 브랜치를 따고, git add, push, pull, merge, commit 하는 정도로만 git을 사용했었다. 현재 회사에서는 형상관리 룰을 따로 정해서 git을 사용하지 않기 때문에 몰랐던 git의 기능들을 알게 되었다. (진정한 형상 관리 느낌...)

## 목차

새로 알게된 내용 & 알았더라도 복습 할 만한 내용 리스트이다.

1. Head
2. checkout
3. cherry-pick
4. rebase
5. squash merge

## Head

Head는 브랜치와 연관이 깊다. `현재 브랜치를 가리키는 포인터` 로 보통 `브랜치에 담긴 커밋 중 가장 마지막 커밋을 가리킨다`. 그렇다면 브랜치는 여러 커밋이 있을 수 있는데 마지막 커밋이 아닌 다른 커밋을 가르키게 하고 싶을 수 있지 않은가(=[detached Head](https://stackoverflow.com/questions/34519665/how-can-i-move-head-back-to-a-previous-location-detached-head-undo-commits/34519716))? 그럴때 `[git reset](https://git-scm.com/book/ko/v2/Git-%EB%8F%84%EA%B5%AC-Reset-%EB%AA%85%ED%99%95%ED%9E%88-%EC%95%8C%EA%B3%A0-%EA%B0%80%EA%B8%B0)`을 쓰면 된다.

## Checkout

checkout 또한 브랜치와 연관이 있다. 보통 checkout은 branch를 변경할 때 사용한다. 브랜치를 변경하면 Head는 기본적으로 젤 마지막 커밋을 가르키므로 예를 들면 A라는 브랜치에 커밋을 a, b, c를 했다. 그러면 기본적으로 A 브랜치의 Head는 c를 가르키고 있는데 git reset b를 한 뒤 git checkout B를 했다가 다시 git checkout A 를 하면 Head가 c로 변경된 걸 볼 수 있다.

## Cherry-pick

체리픽은 간단히 말하면 특정 커밋만 딱 가져오는 거다. 커밋은 고유의 해시를 가지고 있어서 이게 가능한건데 뭐 A라는 브랜치의 a 커밋을 B라는 브랜치에 가지고 올 수 있다. `git cherry-pick 99daed(커밋 해시번호)` 체리픽은 처음 사용해봤는데 ㅋㅋ 이걸 이용해서 브랜치가 꼬였을 때 하나하나 푸는데 유용하다. 목걸이에 머리카락 끼인거 풀듯이;;;

## Rebase

두 브랜치를 합치는 방법은 [rebase와 merge](https://git-scm.com/book/ko/v2/Git-%EB%B8%8C%EB%9E%9C%EC%B9%98-Rebase-%ED%95%98%EA%B8%B0)가 있다. 일단 rebase든 merge든 A, B 두 브랜치를 합치려면 기준 브랜치가 있다. (예를들면 여기서 A라고 해보자. 보통 master 브랜치가 기준인 경우가 많다) 기준 브랜치에 어떻게 B브랜치를 합치는지가 rebase와 merge의 차이인데 아래 그림을 보면 좀 이해가 쉽다.

rebase는 A와 B의 차이(patch)를 만들어서 A의 Head(마지막 커밋) 뒤에 다가 그 차이를 커밋 하고 A의 Head를 방금 커밋한 곳으로 바꾸는 것이다. 그렇다면 merge는 뭔가? A브랜치와 B브랜치를 합쳐서 A브랜치에 커밋(머지 커밋)하는 것이다. 이 두개가 비슷해보이고 아리송 할 수 있을 텐데 참고 해둔 링크를 좀 더 자세히 읽어보면 명백히 다르다는 것을 알 수 있다.

## Squash Merge

위에서 두 브랜치를 합치는 방법은 rebase와 merge가 있다고 했다. 그것은 git에서 mergemerge 방법중에 squash 옵션을 줄 수 있는데, A라는 브랜치와 B라는 브랜치가 있는데, B라는 브랜치에서 a, b, c, 커밋이 있다. 근데 B라는 브랜치를 A라는 브랜치에 합칠때 a, b, c 커밋을 다 넣으면 지져분해 지니까 (관리 측면에서) a, b, c를 합친 하나의 뭉태기 커밋으로 머지를 시켜버리는 방법이다. [여기에](https://meetup.toast.com/posts/122) 이해하기 쉽게 그림이 잘 그려져 있다.
