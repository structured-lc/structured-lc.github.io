### Leetcode 589 (Easy): N-ary Tree Preorder Traversal [Practice](https://leetcode.com/problems/n-ary-tree-preorder-traversal)

### Description  
Given the root of an **n-ary tree** (each node may have any number of children), return the **preorder traversal** of its nodes' values. In preorder traversal, you:
- Visit the node itself first
- Then recursively traverse each child (from leftmost to rightmost)

The input tree may be serialized using level order in an array, with `null` values marking group-dividers between a node’s children.

### Examples  

**Example 1:**  
Input: `[1,null,3,2,4,null,5,6]`  
Output: `[1,3,5,6,2,4]`  
*Explanation: The tree is:*
```
        1
      / | \
     3  2  4
    / \
   5   6
```
We traverse: 1 → 3 → 5 → 6 → 2 → 4.

**Example 2:**  
Input: `[1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]`  
Output: `[1,2,3,6,7,11,14,4,8,12,5,9,13,10]`  
*Explanation: The tree is:*
```
                  1
         /   /   \    \
        2   3     4    5
           / \   /    / \
          6   7 8    9  10
               |  |  |    |
              11 12 13   14
```
Traverse order: 1 → 2 → 3 → 6 → 7 → 11 → 14 → 4 → 8 → 12 → 5 → 9 → 13 → 10.

**Example 3:**  
Input: `[]`  
Output: `[]`  
*Explanation: The tree is empty; no nodes to visit.*

### Thought Process (as if you’re the interviewee)  
I’d clarify that an **n-ary tree** has nodes that can have many children (not just left and right like a binary tree).

For **preorder traversal**, I need to:
- Process the current node’s value
- Recursively traverse and collect values from each child (left-to-right order)

**Brute-force** is just using recursion:
- Visit the node
- Traverse children in order, gather their results

**Iterative approach**: Use a stack to mimic recursion.
- Start with the root on the stack.
- Pop a node, visit, then push children **in reverse order** (so the leftmost child is on top and visited next).

Both methods work for n-ary trees.
Tradeoff: recursion uses call stack (may need to watch stack overflow on deep trees), while stack-based is explicit and can sometimes be clearer/larger in space.

### Corner cases to consider  
- Tree is empty (`root=None`)
- Only one node (root, no children)
- Tree with varying number of children at each node
- Very deep/unbalanced tree (could hit recursion limit)
- Maximum constraints (`10⁴` nodes)

### Solution

```python
# Definition for a Node.
class Node:
    def __init__(self, val, children=None):
        self.val = val
        self.children = children if children is not None else []

def preorder(root):
    result = []
    def dfs(node):
        if node is None:
            return
        # Visit current node
        result.append(node.val)
        # Traverse all children, left to right
        for child in node.children:
            dfs(child)
    dfs(root)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each of n nodes is visited exactly once during traversal.
- **Space Complexity:** O(n)
  - Worst-case call stack (recursion) in a skewed tree is O(n)
  - Result array also stores every value (O(n))

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this **iteratively** (without recursion)?  
  *Hint: Use a stack; push children in reverse order.*

- What if the tree is **very deep** and could cause a stack overflow in recursion?  
  *Hint: Switch to iterative/stack-based traversal to handle deep trees safely.*

- Could you generalize this to **other traversal orders** (postorder, level order)?  
  *Hint: Adjust the order nodes are visited or gathered depending on the traversal type.*

### Summary
This problem uses a classic **Depth-First Search (DFS)** coding pattern, specifically the preorder variant. Preorder, postorder, and other traversals share the DFS principle and recursive/stack-based approaches. This code pattern is common for all kinds of tree traversal problems, including parsing n-ary trees, working with hierarchies, and many graph exploration tasks.