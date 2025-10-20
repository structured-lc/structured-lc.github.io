### Leetcode 2509 (Hard): Cycle Length Queries in a Tree [Practice](https://leetcode.com/problems/cycle-length-queries-in-a-tree)

### Description  
Given a perfect binary tree (every node has 2 children, except leaves) of height `n`, where nodes are numbered 1 to 2ⁿ - 1 in level order.  
You are given several queries. Each query gives two node labels (a, b).  
If you add an edge between a and b, a unique cycle is formed.  
**For each query, return the length (number of edges) in the cycle created by connecting the given nodes.**

**In other words:**  
- Find the cycle length if you connect nodes a and b in a perfect binary tree.  
- The cycle includes the path up from a to their Lowest Common Ancestor (LCA), down to b, and back using the new edge.

### Examples  

**Example 1:**  
Input: `n=3, queries=[[4,5],[4,6],[3,4],[2,6]]`  
Output: `[3, 4, 5, 4]`  
*Explanation:*

- For [4,5]:  
  - Path: 4 → 2 → 5, add direct 4-5: the cycle is 3 edges (4-2, 2-5, new 4-5).

- For [4,6]:  
  - Path: 4 → 2 → 1 → 3 → 6, with 4-6 edge: cycle is 4 edges.

- For [3,4]:  
  - Path: 3 → 1 → 2 → 4, add 3-4: cycle is 5 edges.

- For [2,6]:  
  - Path: 2 → 1 → 3 → 6, add 2-6: cycle is 4 edges.

Tree for n=3 ([1,2,3,4,5,6,7]):
```
         1
       /   \
      2     3
     / \   / \
    4   5 6   7
```

**Example 2:**  
Input: `n=2, queries=[[2,3],[1,2]]`  
Output: `[3, 2]`  
*Explanation:*

- For [2,3]: Path 2→1→3, plus 2-3 (new edge): cycle has 3 edges.
- For [1,2]: They are direct parent-child. Cycle: 1-2 plus the new edge 1-2 (2 edges).

Tree for n=2 ([1,2,3]):
```
     1
    / \
   2   3
```

**Example 3:**  
Input: `n=1, queries=[[1,1]]`  
Output: `[1]`  
*Explanation:*
- For [1,1]: Only one node, adding new "cycle" loop: cycle has 1 edge.

Tree:
```
 1
```

### Thought Process (as if you’re the interviewee)  
First, let's note the problem reduces to computing the path length between the two nodes (a, b) in a binary tree, then adding 1 for the new edge to make a cycle.

Brute-force:  
- Build the entire tree as a structure, store parents, and for each query, trace the path from a and b up to the root to find their lowest common ancestor, then count the steps to LCA from both sides and sum.

Optimized approach:
- Since the labeling is level-order, each node's parent is node // 2.
- The path from node a to the root can be found by repeatedly dividing by 2 (right shift).
- To find the LCA, we can move up:  
  - While a ≠ b:  
    - If a > b, set a = a // 2  
    - Else, set b = b // 2  
    - Count steps.
- The total steps from a to LCA plus b to LCA, plus 1 for the new edge, gives the cycle length.

Trade-offs:  
- No tree construction is needed.  
- Each query runs in O(log N), worst case.

### Corner cases to consider  
- Query where both nodes are the same (cycle of length 1)
- Direct parent-child pairs (cycle of 2)
- n=1 (single-node tree)
- Highest possible nodes (near 2ⁿ-1)
- Very large n, single query

### Solution

```python
def cycleLengthQueries(n, queries):
    res = []
    for a, b in queries:
        cnt = 1   # Start with 1 for the new edge
        x, y = a, b
        # Move up until both meet at LCA
        while x != y:
            if x > y:
                x //= 2
            else:
                y //= 2
            cnt += 1
        res.append(cnt)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(q × log N), where q = len(queries) and N = number of nodes.  
  - Each query can require up to log₂N ancestor jumps.
- **Space Complexity:** O(1) extra (or O(q) for output array), since no tree or explicit storage is needed.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where the tree is not perfect?  
  *Hint: You may need to explicitly store parent-child maps or traverse via other structures.*

- How would you handle dynamic queries (insert, delete edges, or subtree)?  
  *Hint: Advanced tree data structures like LCA with Binary Lifting, or DSU.*

- Can this be generalized for k-ary trees?  
  *Hint: Parent calculation changes, now parent = (node-2)//k + 1.*

### Summary
This problem uses the **binary tree parent-child index property** with bit manipulation (or integer division) for lowest common ancestor finding.  
It’s a classic usage of "climbing ancestors" and is related to LCA finding, but simplified for perfect trees labeled level-order.  
This technique also appears in other ancestor/path problems, especially on perfect/(almost) complete trees with labeled nodes.


### Flashcard
In complete binary tree with level-order labels, parent of node i is i/2; find LCA by walking both nodes to root via parent pointers, count total steps plus 1.

### Tags
Array(#array), Tree(#tree), Binary Tree(#binary-tree)

### Similar Problems
- Populating Next Right Pointers in Each Node(populating-next-right-pointers-in-each-node) (Medium)
- Lowest Common Ancestor of a Binary Tree(lowest-common-ancestor-of-a-binary-tree) (Medium)
- Path In Zigzag Labelled Binary Tree(path-in-zigzag-labelled-binary-tree) (Medium)