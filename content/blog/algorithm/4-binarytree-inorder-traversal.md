---
title: ๐Binarytree Inorder Traversal
date: 2020-04-04 12:04:95
category: algorithm
thumbnail: './images/binarytree-inorder-traversal.jpg'
draft: true
---


์ค๋๋ ์ด๊น์์ด ์์ง ํํ๐ฅ Day3๊ฐ ๋ฐ์์ต๋๋ค. ์ค๋์ binary tree์ traversal๊ด๋ จ ๋ฌธ์ ๋ฅผ ํ์ด๋ณผ๊ป๋ฐ์, inorder ๋ฐฉ์์ผ๋ก ์ํํ๋ [๋ฌธ์ ](https://leetcode.com/problems/binary-tree-inorder-traversal/)๋ฅผ ํ์ด๋ด์๋ค!

![binary tree inorder traversal](./images/binarytree-inorder-traversal.jpg)

# ๋ฌธ์  ์์ฝ
inorder ๋ฐฉ์์ผ๋ก ํธ๋ฆฌ ์ํ. ๋จ, iteration ๋ฐฉ๋ฒ์ผ๋ก ๋ฌธ์ ํ๊ธฐ

# ๋ฌธ์  ํด๊ฒฐ
์ด ๋ฌธ์ ๋ stack์ ํ์ฌ ์ํํด์ผ ํ๋ ์ ๋ค์ ์์๋๊ณ  `์ผ์ชฝ-root-์ค๋ฅธ์ชฝ` ๋ฐฉ์์ผ๋ก ์ํํ๋ค.

## 1) iteration
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
 * @return {number[]}
 */
var inorderTraversal = function(root) {
    const stack = [];
    const result = [];
    let node = root;
    while(node != null || stack.length > 0) {
        while(node != null) {
            stack.push(node)
            node = node.left;
        }
        node = stack.pop();
        result.push(node.val);
        node = node.right;
    }
    return result;
};
```