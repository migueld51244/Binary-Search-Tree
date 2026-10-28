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

  includes(value) {
    let currentNode = this.root;
    while (currentNode) {
      if (currentNode.data === value) {
        return true;
      }
      if (currentNode.data > value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }
    return false;
  }

  insert(value) {
    let currentNode = this.root;
    let prevNode;
    if (!currentNode) {
      this.root = new Node(value);
      return;
    }
    while (currentNode) {
      if (currentNode.data === value) {
        return;
      }
      if (currentNode.data > value) {
        prevNode = currentNode;
        currentNode = currentNode.left;
      } else {
        prevNode = currentNode;
        currentNode = currentNode.right;
      }
    }
    if (prevNode.data > value) {
      prevNode.left = new Node(value);
    } else {
      prevNode.right = new Node(value);
    }
  }

  deleteItem(value) {
    let currentNode = this.root;
    if (!currentNode) {
      return;
    }

    // Find value
    let prevNode = currentNode;
    while (currentNode) {
      if (currentNode.data === value) {
        break;
      } else if (currentNode.data < value) {
        prevNode = currentNode;
        currentNode = currentNode.right;
      } else {
        prevNode = currentNode;
        currentNode = currentNode.left;
      }
    }
    if (!currentNode) return;

    // Handle deletion
    // Leafs
    if (currentNode.right === null && currentNode.left === null) {
      if (this.root === currentNode) {
        this.root = null;
        return;
      }
      if (prevNode.data > currentNode.data) {
        prevNode.left = null;
      } else {
        prevNode.right = null;
      }
      return;
    }

    // Two child
    if (currentNode.right !== null && currentNode.left !== null) {
      // Get the smallest node on the right subtree
      let minRightNode = currentNode.right;
      let prev = currentNode;
      while (minRightNode) {
        if (!minRightNode.left) break;
        prev = minRightNode;
        minRightNode = minRightNode.left;
      }

      if (prev.left === minRightNode) {
        prev.left = minRightNode.right;
      } else if (prev.right === minRightNode) {
        prev.right = minRightNode.right;
      }

      currentNode.data = minRightNode.data;
      return;
    }

    // One child
    // Handle root with one leaf
    if (this.root === currentNode) {
      this.root = currentNode.left ?? currentNode.right;
      return;
    }

    if (prevNode.right === currentNode) {
      prevNode.right = currentNode.left ?? currentNode.right;
      return;
    } else if (prevNode.left === currentNode) {
      prevNode.left = currentNode.left ?? currentNode.right;
      return;
    }
  }

  levelOrderForEach(callback) {
    if (!callback || typeof callback !== "function")
      throw new Error("Missing callback!");
    if (!this.root) return;
    const queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      const current = queue.shift();
      callback(current.data);
      if (current.left !== null) {
        queue.push(current.left);
      }
      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  inOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== "function")
      throw new Error("Missing callback!");
    if (!root) return;
    this.inOrderForEach(callback, root.left);
    callback(root.data);
    this.inOrderForEach(callback, root.right);
  }

  preOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== "function")
      throw new Error("Missing callback!");
    if (!root) return;
    callback(root.data);
    this.preOrderForEach(callback, root.left);
    this.preOrderForEach(callback, root.right);
  }

  postOrderForEach(callback, root = this.root) {
    if (!callback || typeof callback !== "function")
      throw new Error("Missing callback!");
    if (!root) return;
    this.postOrderForEach(callback, root.left);
    this.postOrderForEach(callback, root.right);
    callback(root.data);
  }

  height(value) {
    // Find node
    const getNode = (value) => {
      let currentNode = this.root;
      while (currentNode) {
        if (currentNode.data === value) {
          return currentNode;
        }
        if (currentNode.data > value) {
          currentNode = currentNode.left;
        } else {
          currentNode = currentNode.right;
        }
      }
      return null;
    };

    const isPresent = getNode(value);
    if (!isPresent) return undefined;

    // Calculate height of the node
    return this.#computeHeight(isPresent);
  }

  depth(value) {
    let depth = 0;
    // Find node
    const getNode = (value) => {
      let currentNode = this.root;
      while (currentNode) {
        if (currentNode.data === value) {
          return currentNode;
        }
        if (currentNode.data > value) {
          currentNode = currentNode.left;
          depth++;
        } else {
          currentNode = currentNode.right;
          depth++;
        }
      }
      return null;
    };

    const isPresent = getNode(value);
    if (!isPresent) return undefined;

    return depth;
  }

  #computeHeight(root = this.root) {
    if (!root) return -1;
    const leftSubtreeHeight = this.#computeHeight(root.left);
    const rightSubtreeHeight = this.#computeHeight(root.right);
    return Math.max(leftSubtreeHeight, rightSubtreeHeight) + 1;
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
prettyPrint(tree.root);
console.log(tree.height(2));
