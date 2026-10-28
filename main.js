import { Tree, prettyPrint } from "./tree.js";

const arr = [55, 33, 22, 66, 21, 99, 87, 11, 10, 25, 75];
const tree = new Tree(arr);
prettyPrint(tree.root);
console.log(tree.isBalanced());

console.log("Post order:");
tree.postOrderForEach(console.log);

console.log("Pre order:");
tree.preOrderForEach(console.log);

console.log("Level order:");
tree.levelOrderForEach(console.log);

console.log("In order:");
tree.inOrderForEach(console.log);

// Unbalance tree
tree.insert(400);
tree.insert(900);
tree.insert(10000);
tree.insert(390);
tree.insert(101);

console.log(tree.isBalanced());

// Rebalance
tree.rebalance();
console.log(tree.isBalanced());

prettyPrint(tree.root);
