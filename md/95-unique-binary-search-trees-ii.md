### Leetcode 95 (Medium): Unique Binary Search Trees II [Practice](https://leetcode.com/problems/unique-binary-search-trees-ii)

### Description  
Given an integer `n`, construct all **structurally unique** binary search trees (BSTs) that store values 1 to n.  
Return the list of root nodes of all the BSTs.  
Each tree must:
- Have nodes labeled from 1 to n (inclusive)—no repeats or skips,
- Obey BST properties (left subtree < root < right subtree),
- Only tree structure/shape matters; trees must be *structurally* unique (node value positions count).

### Examples  

**Example 1:**  
Input: `n = 3`  
Output:  
```
[
  [1,null,2,null,3],
  [1,null,3,2],
  [2,1,3],
  [3,1,null,null,2],
  [3,2,null,1]
]
```
Explanation:
- The above output shows list representations of all 5 unique BSTs with 1–3 as node values.  
- As trees (using [x,y,z] format, each row a depth):
  ```
  // [1,null,2,null,3]
    1
     \
      2
       \
        3

  // [1,null,3,2]
    1
     \
      3
     /
    2

  // [2,1,3]
    2
   / \
  1   3

  // [3,1,null,null,2]
    3
   /
  1
   \
    2

  // [3,2,null,1]
    3
   /
  2
 /
1
  ```
- Each tree is a structurally unique BST.

**Example 2:**  
Input: `n = 1`  
Output:  
```
[[1]]
```
Explanation:
- Only one BST can be formed: root 1 with no children.

**Example 3:**  
Input: `n = 0`  
Output:  
```
[]
```
Explanation:
- If n is 0, there are no numbers available—so no BSTs can be formed.

### Thought Process (as if you’re the interviewee)  
- **Brute-force / Recursion:**  
  - For each value between 1 to n:  
    - Pick it as root.
    - Recursively build all possible left subtrees from numbers less than the root.
    - Recursively build all possible right subtrees from numbers greater than the root.
    - Combine all left and right subtree combinations, attach to the root, and add to the result list.
  - Each subtree for a range is independent; subproblems are smaller ranges.
- **Why recursion:**  
  - For each possible root, the left/right children must themselves be BSTs (in smaller ranges).
  - Recursively splitting into subranges is naturally expressed via recursive calls.
- **Why not DP first?**  
  - DP/memoization may help with large n, but with unique values, recursion is straightforward and n is typically small.
- **Making new trees for each combination:**  
  - Need to create fresh nodes/subtrees for each configuration, to avoid tree sharing issues (so tree mutations don’t affect others).

### Corner cases to consider  
- n = 0 (empty input): Should return empty list ([]), not [None].
- n = 1 (single node): One tree: root with value 1.
- Tree reproducibility: Trees should be deep copies, not references to shared objects.
- Left/right being None—must handle cases where subtree is empty.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def generateTrees(n):
    # If n == 0, return empty list (no BSTs possible)
    if n == 0:
        return []

    # Helper to generate all BSTs in range [start, end]
    def build_trees(start, end):
        result = []
        if start > end:
            # Empty subtree is represented as [None]
            return [None]

        # Try every number between start and end as root
        for root_val in range(start, end + 1):
            # All possible left subtrees
            left_trees = build_trees(start, root_val - 1)
            # All possible right subtrees
            right_trees = build_trees(root_val + 1, end)

            # Combine every left and right subtree pair with current root
            for left in left_trees:
                for right in right_trees:
                    root = TreeNode(root_val)
                    root.left = left
                    root.right = right
                    result.append(root)
        return result

    # Build trees with values 1 to n
    return build_trees(1, n)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - The total number of unique BSTs with n nodes is given by the nᵗʰ Catalan number: Cₙ ≈ 4ⁿ / (n¹·⁵√π).
  - Each tree constructed involves combining every possible left/right subtree combination for every possible root, so the overall time is **O(Cₙ × n)** (since for each root, you combine trees; for each of Cₙ trees, the tree is of size at most n).
- **Space Complexity:**  
  - **O(Cₙ × n):** Need to store all unique BSTs (each with up to n nodes).
  - Also, recursion stack is O(n) at most (tree height).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you print all the trees in level order or visualize them?
  *Hint: Write a helper function for level-order traversal of each TreeNode root.*

- Can you extend this to generate all unique BSTs given any arbitrary set of values, not just 1 to n?
  *Hint: Accept an input list, recursively build using sorted slices of the input.*

- How would you speed this up for larger n or optimize for space?
  *Hint: Consider DP/memoization with key as (start, end), or store structure only.*

### Summary
This problem uses classic **recursion and backtracking**—for each possible root, recursively build all left/right subtree possibilities and combine them.  
The approach is a "construct all structures" variant: very similar patterns occur in problems where all unique structures or arrangements are requested (e.g., all full binary trees, all bracket combinations).  
It provides an example of recursive "divide and combine" for tree generation and is a great recursive enumeration template.


### Flashcard
Recursively generate all unique BSTs by picking each number as root and combining all left/right subtree possibilities for each range.

### Tags
Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Tree(#tree), Binary Search Tree(#binary-search-tree), Binary Tree(#binary-tree)

### Similar Problems
- Unique Binary Search Trees(unique-binary-search-trees) (Medium)
- Different Ways to Add Parentheses(different-ways-to-add-parentheses) (Medium)