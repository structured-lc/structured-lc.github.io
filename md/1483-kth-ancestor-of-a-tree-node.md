### Leetcode 1483 (Hard): Kth Ancestor of a Tree Node [Practice](https://leetcode.com/problems/kth-ancestor-of-a-tree-node)

### Description  
Given a rooted tree with n nodes (0-indexed, parent[i] gives the parent of node i, with parent = -1), design a data structure that efficiently supports queries: for given node x and integer k, return the kᵗʰ ancestor of node x (the node reached after following k parent links). If there is no such ancestor, return -1.

### Examples  
**Example 1:**  
Input: `n = 7`, `parent = [-1,0,0,1,1,2,2]`
Queries: `getKthAncestor(3,1)`, `getKthAncestor(5,2)`, `getKthAncestor(6,3)`  
Output: `1`, `0`, `-1`  
*Explanation: 3's parent is 1; 5's 2ᵗʰ ancestor is parent[2]=0; 6's 3ᵗʰ ancestor is -1.*

**Example 2:**  
Input: `parent = [-1,0]`, `n = 2`
Queries: `getKthAncestor(1,1)`, `getKthAncestor(1,2)`  
Output: `0`, `-1`

**Example 3:**  
Input: `[3,5,1,6,2,0,8,null,null,7,4]`, as a tree:
```
      3
     / \
    5   1
   / \   \
  6   2   0
 /   /
8   7
   /
  4
```

### Thought Process (as if you’re the interviewee)  
- Brute-force: To find kᵗʰ ancestor, walk up k times via parent links. O(k) per query, too slow for many queries or large k.
- Optimize: Binary lifting (preprocess jump pointers for every node at powers of two distances: 1,2,4,8,...)
- Precompute an up table: up[node][j] is 2ʲ-th ancestor. Each query then decomposes k into powers of two and can jump in O(log k).
- Trade-off: Preprocessing cost and memory, but queries are very efficient.

### Corner cases to consider  
- k = 0 (should return node itself or per problem - usually node itself)
- k > tree height (should return -1)
- node is root
- very deep queries (large k, test for O(log k))

### Solution
```python
class TreeAncestor:
    def __init__(self, n, parent):
        LOG = 16  # up to 2^16 > 10^5
        self.up = [[-1]*LOG for _ in range(n)]
        for i in range(n):
            self.up[i][0] = parent[i]
        for j in range(1, LOG):
            for i in range(n):
                if self.up[i][j-1] != -1:
                    self.up[i][j] = self.up[self.up[i][j-1]][j-1]
    def getKthAncestor(self, node, k):
        for j in range(16):
            if k & (1 << j):
                node = self.up[node][j]
                if node == -1:
                    break
        return node
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(log n) per query, O(n log n) to preprocess.
- **Space Complexity:** O(n log n) for up table.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you support ancestor queries for changing trees?
  *Hint: Rebuilding up table or using dynamic structures.*
- Can you optimize for trees that rarely change?
  *Hint: Preprocess deeply, rebuild lazily only when needed.*
- What's the best way to reduce space if memory is tight?
  *Hint: Store only up to log₂(n), compress sparse tables.*

### Summary
This problem is the textbook application of binary lifting on trees for range ancestor queries. This method also appears in LCA (Lowest Common Ancestor), and fast level jumps in many tree-based DS problems.