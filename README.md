# Binary Search Tree

A JavaScript implementation of a binary search tree, built for [The Odin Project's Binary Search Trees assignment](https://www.theodinproject.com/lessons/javascript-binary-search-trees).

The tree is initialized as a balanced tree from an array of numbers. It supports searching, insertion and deletion, breadth-first and depth-first traversals, height and depth queries, balance checking, and rebalancing.

## Requirements

- Node.js with ES module support; no additional packages are required.

## Run the demo

From the project directory, run:

```sh
node main.js
```

The demo builds a tree, prints its structure and traversal orders, adds values to make it unbalanced, then rebalances it. The output shows the balance check before and after each change.

## Use the tree

Import `Tree` and (optionally) `prettyPrint` from `tree.js`:

```js
import { Tree, prettyPrint } from "./tree.js";

const tree = new Tree([8, 3, 10, 1, 6, 14, 4, 7, 13]);

console.log(tree.includes(6)); // true
tree.insert(5);
tree.deleteItem(14);

tree.inOrderForEach((value) => console.log(value));
console.log(tree.isBalanced());

tree.rebalance();
prettyPrint(tree.root);
```

`Tree` removes duplicate values and sorts the input before building a balanced tree. Duplicate insertions are ignored.

## API

| Method | Description |
| --- | --- |
| `new Tree(array)` | Creates a balanced tree from an array of numbers. |
| `includes(value)` | Returns whether the value is in the tree. |
| `insert(value)` | Inserts a value while preserving the binary search tree ordering. |
| `deleteItem(value)` | Removes a value if it exists. |
| `levelOrderForEach(callback)` | Calls the callback with each value in breadth-first order. |
| `inOrderForEach(callback)` | Calls the callback with each value in in-order depth-first order. |
| `preOrderForEach(callback)` | Calls the callback with each value in pre-order depth-first order. |
| `postOrderForEach(callback)` | Calls the callback with each value in post-order depth-first order. |
| `height(value)` | Returns the height of the value's node, or `undefined` if it is not found. |
| `depth(value)` | Returns the depth of the value's node, or `undefined` if it is not found. |
| `isBalanced()` | Returns whether every node in the tree is balanced. |
| `rebalance()` | Rebuilds the tree as a balanced tree. |

Traversal methods require a callback function. `prettyPrint(node)` prints a tree's structure; pass it `tree.root`.

## Project files

- `tree.js` — `Tree` implementation and the `prettyPrint` helper.
- `main.js` — runnable example demonstrating tree operations.
