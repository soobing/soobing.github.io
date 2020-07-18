---
title: 📏Diameter of Binary Tree
date: 2020-04-11 21:04:44
category: algorithm
thumbnail: './images/diameter-of-binary-tree.jpg'
draft: true
---

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
 * @return {number}
 */

var max;
var diameterOfBinaryTree = function(root) {
    max=0;
    dfs(root);
    return max;
};

function dfs(node)
{
    if(node === null) return 0;
    
    var left = dfs(node.left);
    var right = dfs(node.right);
    
    max = Math.max(max,left+right);
    return Math.max(left, right)+1;
}
```