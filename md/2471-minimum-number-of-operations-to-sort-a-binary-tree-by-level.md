### Leetcode 2471 (Medium): Minimum Number of Operations to Sort a Binary Tree by Level [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-sort-a-binary-tree-by-level)

### Description  
Given the root of a binary tree with **unique values**, for each level, you may swap values between any two nodes at the *same* level in a single operation.  
Your task: For every level, perform the *minimum number of swap operations* required so that the values at that level are in strictly increasing order. Return the total number of swaps needed over all levels.  
- Each swap operation can pick *any two* nodes at a given level.  
- Sorting of each level is independent from other levels.

### Examples  

**Example 1:**  
Input: `[1,4,3,7,6,8,5,null,null,null,null,null,null,9,null,null,null,2]`  
```
        1
      /   \
     4     3
    / \   / \
   7  6  8  5
         /
        9
       /
      2
```
Output: `3`  
*Explanation:  
Level 0: [1] (already sorted, 0 swaps)  
Level 1: [4,3] → needs 1 swap to [3,4]  
Level 2: [7,6,8,5] → [5,6,7,8] needs 2 swaps  
Level 3:  (already sorted, 0 swaps)  
Level 4: [2] (already sorted, 0 swaps)  
Total: 1+2 = 3.*

**Example 2:**  
Input: `[1,2,3,4,5,6,7]`  
```
      1
    /   \
   2     3
  / \   / \
 4  5  6  7
```
Output: `0`  
*Explanation:  
All levels are already sorted:  
Level 0: [1]  
Level 1: [2,3]  
Level 2: [4,5,6,7].*

**Example 3:**  
Input: `[1,3,2,7,6,5,4]`  
```
      1
    /   \
   3     2
  / \   / \
 7  6  5   4
```
Output: `3`  
*Explanation:  
Level 0: [1] (0 swaps)  
Level 1: [3,2] → needs 1 swap  
Level 2: [7,6,5,4] needs 2 swaps  
Total: 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each level, try every possible sequence of swaps to sort. This is infeasible due to the factorial number of possibilities.
- **Optimal:**  
  Realize that for *any array*, sorting it with the minimum number of swaps equals the number of permutation cycles (cycle decomposition).  
  So for each level:
  1. Use BFS to collect node values at each level.
  2. For those values, count minimal swaps needed = size minus number of cycles in their permutation-to-sorted-index mapping.
  3. Add all swaps over all levels.
- The unique-values guarantee means every level can always be fully sorted, and all swaps will progress independently.

### Corner cases to consider  
- Empty tree (root is None): Should return 0.
- Tree with just one node.
- Levels where all values are already sorted.
- Deep trees where some levels have only one value.
- Trees where the order is exactly reversed at a level (worst-case swaps).
- Zig-zag trees with uneven levels.

### Solution

```python
# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def minimumOperations(root):
    from collections import deque

    def min_swaps(arr):
        # Assign sorted positions
        n = len(arr)
        arrpos = sorted([(val, idx) for idx, val in enumerate(arr)])
        visited = [False] * n
        swaps = 0
        for i in range(n):
            if visited[i] or arrpos[i][1] == i:
                continue
            cycle_size = 0
            j = i
            while not visited[j]:
                visited[j] = True
                j = arrpos[j][1]
                cycle_size += 1
            if cycle_size > 0:
                swaps += (cycle_size - 1)
        return swaps

    q = deque([root])
    total = 0
    while q:
        level_size = len(q)
        level = []
        for _ in range(level_size):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        total += min_swaps(level)
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)
  - Each node is visited once (n).
  - At each level, sorting k-level elements is O(k log k), but ∑k = n, so total is O(n log n).
- **Space Complexity:** O(n)
  - For BFS queue, level lists, and arrays for swaps—at most O(n) at any point.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if values were not unique?
  *Hint: Consider if sorting is always possible, or handling duplicates when counting swaps.*

- Could you optimize for very wide trees where some levels are huge?
  *Hint: Try optimizing min_swaps logic or tracking only indices.*

- How would you return the swap operations themselves, not just the count?
  *Hint: Track cycle sequence during swaps calculation.*

### Summary
This approach leverages two classic patterns: **level-order BFS** for trees and **cycle decomposition** for minimum swaps to sort an array. Recognizing that these problems combine to solve each level efficiently is a common pattern in tree and permutation sort problems, and can be applied whenever you need to transform a structure using minimal local operations.