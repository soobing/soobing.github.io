---
title: ๐ Symmetric Tree
date: 2020-04-03 16:04:69
category: algorithm
thumbnail: './images/symmetric-tree.jpg'
draft: true
---


์์ง ํํ๐ฅ Day2๊ฐ ๋ฐ์์ต๋๋ค. ์ค๋์ BFS์ [๋ฌธ์ ](https://leetcode.com/problems/symmetric-tree/)๋ฅผ ํ์ด๋ณด์!

![symmetric tree](./images/symmetric-tree.jpg)

# ๋ฌธ์  ์์ฝ
๋ฐ์นผ์ฝ๋ง๋์ธ์ง ํ์ธํ๋ ๋ฌธ์ !

# ๋ฌธ์  ํด๊ฒฐ
์ด ๋ฌธ์ ๋ BFS๋ณด๋ค๋ DP๋ก ํด๊ฒฐํ ๊ฒ ๊ฐ๋ค.

## 1) recursive
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isMirror = function(left, right) {
    if(left == null && right == null) return true;
    if(left == null || right == null) return false;
    return (left.val == right.val)
        && isMirror(left.right, right.left) 
        && isMirror(left.left, right.right)
}
var isSymmetric = function(root) {
    if (!root) return true;
    return isMirror(root.left, root.right);
};
```