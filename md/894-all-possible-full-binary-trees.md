### Leetcode 894 (Medium): All Possible Full Binary Trees [Practice](https://leetcode.com/problems/all-possible-full-binary-trees)

### Description  
Given an integer **n**, return a list of all possible *full binary trees* with **n** nodes.  
A *full binary tree* is a binary tree where each node has exactly **0 or 2 children** (never only one). All tree nodes must have the value 0.  
You must return the list of root nodes, one for each distinct tree. The output list can be in any order.

Key points:
- Only **odd** n can form full binary trees — for even n, the answer is always empty (no valid tree).
- Each subtree in the answer must itself be a full binary tree.

### Examples  

**Example 1:**  
Input: `n = 3`  
Output: `[[0,0,0]]`  
Explanation: Only one structure possible (root with two children).  
```
  0
 / \
0   0
```
List representation: `[0,0,0]`

**Example 2:**  
Input: `n = 7`  
Output:  
```
[
  [0,0,0,null,null,0,0,null,null,0,0],
  [0,0,0,null,null,0,0,0,0],
  [0,0,0,0,0,0,0],
  [0,0,0,0,0,null,null,null,null,0,0],
  [0,0,0,0,0,null,null,0,0]
]
```
Explanation: Five distinct full binary trees possible with 7 nodes.  
Some visualizations:
```
Tree 1:          Tree 2:
    0                0
   / \              / \
  0   0            0   0
     / \              / \
    0   0            0   0
   / \                  / \
  0   0                0   0
```

**Example 3:**  
Input: `n = 2`  
Output: `[]`  
Explanation: 2 is even. Impossible to make a full binary tree where every node has 0 or 2 children.

### Thought Process (as if you’re the interviewee)  
- Start by understanding what a full binary tree requires: **every node has 0 or 2 children**, so whenever we "add" nodes below, we must do it in pairs.
- For **n = 1**, only possibility: a single node (just root).
- For **n > 1** (and odd), the root must have two children. We divide the *remaining* n-1 nodes among the left and right subtree:
  - Try all possible odd splits (left count from 1 to n-2, always odd).
  - For each split, recursively generate all left and right full binary trees, and combine every left with every right to create a new tree.
- This is a classic recursive problem, but **many subproblems repeat**, so memoization (caching) is a key optimization.
- Tradeoff: Recursive with memoization drastically improves performance by not rebuilding the same subtree arrangements for the same n repeatedly.

### Corner cases to consider  
- n is **even**: Return `[]`.
- n is **1**: Only a single-node tree is possible.
- n is very **large** (likely near upper bound): Efficiency of recursion and memoization matters.
- Trees must use exactly n nodes (no more, no less).

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def allPossibleFBT(n: int):
    # Memoization dictionary
    memo = {}

    def dfs(nodes):
        # Base case: 0 or even -> impossible
        if nodes % 2 == 0:
            return []
        if nodes == 1:
            return [TreeNode(0)]

        if nodes in memo:
            return memo[nodes]
        ans = []
        # i is the number of nodes in the left subtree (must be odd)
        for i in range(1, nodes, 2):
            left_trees = dfs(i)
            right_trees = dfs(nodes - 1 - i)
            # Combine each left and right tree
            for left in left_trees:
                for right in right_trees:
                    root = TreeNode(0)
                    root.left = left
                    root.right = right
                    ans.append(root)
        memo[nodes] = ans
        return ans
    return dfs(n)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ) in the worst case, but much less in practice due to memoization. Each n only gets computed once, with results reused for all splits.
- **Space Complexity:** O(2ⁿ) for memo storage and for storing all possible trees, plus recursion stack proportional to n.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you print all trees in pre-order, in-order, or as level-order lists?  
  *Hint: Tree traversals and serialization routines.*

- How would you generate only the count of such trees, not the structures themselves?  
  *Hint: Dynamic programming (like counting full binary trees, similar to Catalan numbers but with different recurrence).*

- What if each node’s value wasn’t fixed, or unique values were needed?  
  *Hint: Extra complexity from value permutations; combinatorics increases.*

### Summary
This problem is a classic example of *Recursive Tree Construction with Memoization*.  
Every full binary tree with n nodes can be built by combining all pairs of smaller full binary trees whose sizes sum to n-1 (for the subtrees). The memoization (DP) pattern here is common in tree structure generation problems, such as generating unique BSTs, and appears in counting (Catalan number style) and construction (tree enumeration) variants.  
Key patterns include recursion, memoization, and cartesian product of subproblem results.


### Flashcard
Recursively generate all full binary trees by splitting n-1 nodes into all odd left/right pairs; memoize results for efficiency.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Recursion(#recursion), Memoization(#memoization), Binary Tree(#binary-tree)

### Similar Problems
