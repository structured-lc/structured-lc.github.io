### Leetcode 2583 (Medium): Kth Largest Sum in a Binary Tree [Practice](https://leetcode.com/problems/kth-largest-sum-in-a-binary-tree)

### Description  
Given the root of a binary tree and an integer k, compute the sum of node values at each tree level. Then, return the kᵗʰ largest among these level sums. If there are fewer than k levels, return -1.

### Examples  

**Example 1:**  
Input: `root = [5,8,9,2,1,3,7,4,6]`, `k = 2`  
Output: `13`  
*Explanation:  
Level sums:  
- Level 1: 5  
- Level 2: 8 + 9 = 17  
- Level 3: 2 + 1 + 3 + 7 = 13  
- Level 4: 4 + 6 = 10  
2ⁿᵈ largest is 13.*

(tree representation)
```
      5
    /   \
   8     9
  / \   / \
 2   1 3   7
/ \         \
4  6         (null)
```

**Example 2:**  
Input: `root = [1,2,null,3]`, `k = 1`  
Output: `3`  
*Explanation:  
Level sums:  
- Level 1: 1  
- Level 2: 2  
- Level 3: 3  
Largest is 3.*

```
    1
   /
  2
 /
3
```

**Example 3:**  
Input: `root = `, `k = 1`  
Output: `10`  
*Explanation:  
Only one level. 1ˢᵗ largest sum is 10.*

```
10
```

### Thought Process (as if you’re the interviewee)  
First, I notice that I need to find sums at each *tree level*. This is a classic BFS (Breadth-First Search) where you traverse level by level and calculate the sum per level.  
My brute-force idea is:

- Traverse each level, sum all node values at that level, and collect all such sums.
- After I have all level sums, sort them in decreasing order and pick the kᵗʰ largest (or just use a heap to optimize space if k is much smaller than the tree depth).

BFS is naturally suited: I enqueue nodes level-wise, calculate the current level sum, and proceed.  
If the number of unique levels < k, I return -1.

Sorting all levels is O(L log L) where L is number of levels (much less than n in practice), or a min-heap of size k runs O(L log k).

I choose level-order BFS with sum per level, then sort and select, for clarity and predictability. Heap optimization is possible but often unnecessary since the number of levels in a binary tree of size n is at most ⌊log₂ n⌋ + 1.

### Corner cases to consider  
- Tree with only root node.
- Tree with skewed shape (all left or all right children).
- Tree with negative numbers as node values.
- k > number of levels ⇒ should return -1.
- Tree with duplicate level sums.
- Large/unbalanced trees.

### Solution

```python
# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right

from collections import deque

def kthLargestLevelSum(root, k):
    # Collect all level sums using BFS
    level_sums = []
    queue = deque()
    queue.append(root)
    
    while queue:
        level_sum = 0
        size = len(queue)
        # Traverse all nodes at the current level
        for _ in range(size):
            node = queue.popleft()
            level_sum += node.val
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        level_sums.append(level_sum)
    
    if len(level_sums) < k:
        return -1
    
    # Sort in non-increasing order and pick the kᵗʰ largest
    level_sums.sort(reverse=True)
    return level_sums[k-1]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n) to traverse all nodes (BFS).  
  Additional O(L log L) to sort, where L is the number of levels (L ≤ n).  
  So overall, O(n + L log L); in practice, L ≪ n.

- **Space Complexity:**  
  O(L) for the level sums list, and O(W) for BFS queue where W is the max width of the tree.  
  Both are at most O(n) for extremely flat trees.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle continuous insertions or deletions in the tree and always need the kᵗʰ largest sum?
  *Hint: Maintain a live priority queue of level sums and a mapping from levels to latest sums.*

- Can you solve the problem without sorting all level sums?
  *Hint: Use a min-heap of size k while iterating level sums.*

- What if node values could be extremely large or small?
  *Hint: Watch for integer overflow (if language-dependent) or need for big integers.*

### Summary
This problem follows the *Level-order BFS* pattern to compute layer-based aggregates (like per-level sums). Collecting, then sorting (or heap-selecting) the results is a common follow-up. Similar aggregation logic applies in problems involving per-layer statistics, tree views, and hierarchical data queries.