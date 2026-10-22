class Node {
  constructor(value) {
    this.data = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.array = this.normalize(arr);
    this.root = this.buildTree(this.array);
  }

  normalize(arr) {
    // Remove duplicates
    const unique = [...new Set(arr)];
    unique.sort((a, b) => a - b);
    return unique;
  }

  buildTree(arr) {
    // Base case
    if (arr.length <= 0) return null;

    // Get middle index
    const middle = Math.floor(arr.length / 2);

    const node = new Node(arr[middle]);

    node.left = this.buildTree(arr.slice(0, middle));
    node.right = this.buildTree(arr.slice(middle + 1));

    return node;
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
prettyPrint(tree);