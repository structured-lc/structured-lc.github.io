### Leetcode 2313 (Hard): Minimum Flips in Binary Tree to Get Result [Practice](https://leetcode.com/problems/minimum-flips-in-binary-tree-to-get-result)

### Description  
You're given the root of a binary tree representing a *boolean expression*. Each **leaf node** holds a value `0` (false) or `1` (true). Each **non-leaf node** contains an *operator*:
- `2`: OR
- `3`: AND
- `4`: XOR
- `5`: NOT (unary operator; only one child)

You can *flip* any leaf value (0 → 1 or 1 → 0) any number of times. Your goal: **Find the minimum number of flips so the whole tree evaluates to the target boolean result.**

### Examples  

**Example 1:**  
Input: 
Tree = `[4,1,2,0,1]`, result=`0`  
```
      4 (XOR)
     /     \
   1       2 (OR)
          /   \
        0     1
```
Output: `1`  
*Explanation: To make the tree evaluate to 0, we can flip the left leaf (1 → 0):  
(0) XOR (0 OR 1) = 0 XOR 1 = 1 (still not zero).  
If we flip the rightmost leaf (1 → 0):  
(1) XOR (0 OR 0) = 1 XOR 0 = 1 (still not zero).  
But if we flip the left child of the OR (0 → 1):  
(1) XOR (1 OR 1) = 1 XOR 1 = 0, which matches target. Only 1 flip is needed.*

**Example 2:**  
Input:  
Tree = `[5,0]`, result=`1`  
```
    5 (NOT)
   /
  0
```
Output: `0`  
*Explanation: The NOT of 0 is 1, which matches the target. No flip needed.*

**Example 3:**  
Input:  
Tree = `[2,0,1]`, result=`1`  
```
   2 (OR)
  /   \
 0     1
```
Output: `0`  
*Explanation: 0 OR 1 = 1. Already matches target. No flips needed.*


### Thought Process (as if you’re the interviewee)  
- The brute-force idea would be to try all `2^{number of leaves}` combinations, flipping each leaf to both values and checking if the evaluated result matches the goal. But this is exponential.
- Instead, use recursion and **dynamic programming/memoization**:
  - For each node, compute the **min flips needed** for the subtree to evaluate to 0 and to 1.
  - For leaf nodes:  
    - If leaf is 0, min flips for 0 is 0, for 1 is 1 (and vice versa).
  - For internal nodes, for each operator, combine the results from child subtrees:
    - `OR`, `AND`, `XOR` combine children in standard boolean fashion.
    - For `NOT`, just swap 0/1 results.
  - Store results to avoid recomputing subproblems.
- This results in post-order DFS with memoization. No need to simulate all flip choices; just keep track of minimal flips for each possible value at each subtree.

### Corner cases to consider  
- Tree of depth 1 (just a single leaf).
- Tree with only NOT operators (i.e., a chain).
- All leaves are initially the opposite of the goal.
- Multiple ways to achieve the goal: ensure the *minimum* flips is chosen.
- Large, unbalanced trees.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def minimumFlips(root, result):
    # dp[node][val]: min flips needed for subtree rooted at node to become val (0 or 1)
    from functools import lru_cache

    # 2: OR, 3: AND, 4: XOR, 5: NOT
    @lru_cache(maxsize=None)
    def dfs(node, target):
        if node is None:
            return float('inf')
        if node.val in (0,1):
            # Leaf: 0 → need 0 flips for 0, 1 flip for 1 (and vice versa)
            return 0 if node.val == target else 1
        if node.val == 2:  # OR
            return min(
                dfs(node.left, target) + dfs(node.right, 0),
                dfs(node.left, 0) + dfs(node.right, target)
            ) if target == 0 else min(
                dfs(node.left, 1) + dfs(node.right, b)
                for b in [0,1]
            )
        if node.val == 3:  # AND
            return min(
                dfs(node.left, target) + dfs(node.right, 1),
                dfs(node.left, 1) + dfs(node.right, target)
            ) if target == 1 else min(
                dfs(node.left, a) + dfs(node.right, b)
                for a in [0,1] for b in [0,1]
                if not (a and b)
            )
        if node.val == 4:  # XOR
            if target == 0:
                return min(
                    dfs(node.left, 0) + dfs(node.right, 0),
                    dfs(node.left, 1) + dfs(node.right, 1)
                )
            else:
                return min(
                    dfs(node.left, 0) + dfs(node.right, 1),
                    dfs(node.left, 1) + dfs(node.right, 0)
                )
        if node.val == 5:  # NOT
            # Only one child (left), target is the opposite
            return dfs(node.left, 1 - target)
        return float('inf')

    return dfs(root, result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of nodes. Each node has at most 2 possible states (for 0 or 1), and each state is computed once due to memoization.
- **Space Complexity:** O(n), for recursion stack and the memoization cache.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the approach change if you could also flip internal nodes' operators?
  *Hint: Think about how dynamic programming state space would increase.*

- What if you could only flip at most k leaves?
  *Hint: Modify your DP to track the number of flips used.*

- How do you handle evaluating a large tree (millions of nodes) with memory constraints?
  *Hint: Consider iterative traversal or limited cache, or reconstruct result using generators.*

### Summary
This problem leverages **tree DP** with **post-order DFS** and memoization, a common pattern in evaluating and optimizing structured boolean/arithmetical expressions over binary trees. The same design is applicable for expressions with minimal edit/change/flip operations for desired results, such as "minimum swaps to evaluate expression" or "minimum operations in expression trees."