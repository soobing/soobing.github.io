---
title: ๐ณConstruct Binary Search Tree from Preorder Traversal
date: 2020-04-22 02:04:73
category: algorithm
thumbnail: './images/construct-bst-from-preorder-traversal.jpg'
draft: true
---


์์ฃผ์์ฃผ ํ์์ด ํ์ด์ง๋ ์ด ๋ง์์ ์ด์ฐํ ๊ผฌ~๐ฉ ์ผ๋จ ๋ฐ๋ฆฐ๊ฑธ ๋คํ๋ ค๊ณ ๋ ๋ง์์ ์๊ฐ์ง๋ ค๊ณ ํ๋ค๋ณด๋ ๊พธ์ญ๊พธ์ญ ๋งจ๋  ์๋ฒฝ ๋์๊น์ง ๋๋ค๊ฐ ๋ฌธ์ ๋ฅผ ํผ๋ค....
์กฐ๋ง๊ฐ ๋์ฑ ๋ง๋ จ์ด ์๊ธํ๋ค ์์

์ค๋์ [๋ฌธ์ ](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)๋ medium ๋ฌธ์ ์ด๊ณ  ๋ฌธ์ ๊ฐ ์ฅํฉํ๊ธด ํ๋ฐ, ๊ทธ๋ฅ BST๋ฅผ ๊ตฌ์ฑํ๊ณ  root ๋ธ๋๋ฅผ ๋ฆฌํดํ๋ฉด ๋๋ค.

![construct-bst-from-preorder-traversal](./images/construct-bst-from-preorder-traversal.jpg)

# ๋ฌธ์  ์์ฝ
pre-order๋ก ๊ตฌ์ฑ๋ ํธ๋ฆฌ๋ฅผ BST๋ก ๋ค์ ์ฌ๊ตฌ์ฑ ํด๋ณด๋ ๋ฌธ์ 

# ๋ฌธ์  ํด๊ฒฐ
BST๋ ๊ฐ ๋ธ๋๋ฅผ ๊ธฐ์ค์ผ๋ก ์ผ์ชฝ ๋ธ๋๋ ๋ ์์๊ฒ, ์ค๋ฅธ์ชฝ ๋ธ๋๋ ๋ ํฐ๊ฒ์ผ๋ก ๊ตฌ์ฑ๋๋ค. ์ด๋ฐ ๋ฐฉ์์ผ๋ก ๋ฃจํธ๋ธ๋๋ถํฐ ๊ตฌ์ฑํ๋ฉด ๋๋ค.
์ฝ๋๋ฅผ ๋ณด๋ฉด ๋ ์ดํดํ๊ธฐ ์ฝ๋ค. ์ฌ๊ท๋ก ๋ฌธ์ ๋ฅผ ํด๊ฒฐํ๊ณ , ๋ด๊ฐ ํด๊ฒฐํ ๊ฒ์ ์๋๊ณ  ๋ค๋ฅธ ์ฌ๋์ ๋ต์ง๋ฅผ ๋ณด์๋ฐ ๐ฏ


## code
  * ์๊ฐ ๋ณต์ก๋: O(N^2) ??? โ๏ธ ์ ํํ ๋ง๋์ง ๋ชจ๋ฅด๊ฒ ๋ค.
  * ๊ณต๊ฐ ๋ณต์ก๋: O(1)
  
```js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @return {TreeNode}
 */
var bstFromPreorder = function(preorder) {
    var go = (root, x) => {
        if(root.val > x) {
            if(!root.left) {
                root.left = new TreeNode(x);
            } else {
                go(root.left, x);
            }
        } else {
            if(!root.right) {
                root.right = new TreeNode(x);
            } else {
                go(root.right, x);
            }
        }
    }
    let root = new TreeNode(preorder[0]);
    for(let i=1; i<preorder.length; i++) {
        go(root, preorder[i])
    }
    return root;
};
```
