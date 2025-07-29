### Leetcode 3544 (Hard): Subtree Inversion Sum [Practice](https://leetcode.com/problems/subtree-inversion-sum)

### Description  
Given an undirected tree with \( n \) nodes (numbered from 0 to \( n-1 \)), rooted at node 0, you are given:
- `edges`: A list of edges representing the tree (each as `[u, v]`)
- `nums`: An array where `nums[i]` is the value at node \( i \)
- `k`: An integer distance constraint

You can perform inversion operations on certain nodes:
- **Invert a node**: Multiply every value in its subtree by -1.
- **Constraint**: If you invert two nodes \( a \) and \( b \) and one is an ancestor of the other, the distance (number of edges between them) must be at least \( k \).

You may choose any subset of nodes to invert (as long as the constraint is satisfied).  
**Goal:** Return the maximum possible sum of all node values after applying any valid set of inversions.

---

### Examples  

**Example 1:**  
Input:  
edges = `[[0,1], [0,2], [1,3]]`,  
nums = `[1, 2, -3, 4]`,  
k = `2`  
Output: `10`  
*Explanation: The optimal is to invert node 2 (subtree: only node 2). Values become `[1, 2, 3, 4]`; sum = 10. No two inverted nodes are ancestor/descendant within distance < 2.*

**Example 2:**  
Input:  
edges = `[[0,1], [0,2]]`,  
nums = `[-1, -2, -3]`,  
k = `1`  
Output: `6`  
*Explanation: Invert root node 0 (whole tree): values become `[1, 2, 3]`; sum = 6.*

**Example 3:**  
Input:  
edges = `[[0,1], [1,2], [2,3]]`,  
nums = `[2, -1, -1, 2]`,  
k = `2`  
Output: `4`  
*Explanation: Invert node 1 (subtree: 1,2,3): `[2, 1, 1, -2]`, sum = 2+1+1+(-2)=2.  
Invert node 3 (subtree: 3): `[2, -1, -1, -2]` then subtree at 3: `[2,-1,-1,2]`; this is not allowed because 3 is within k=2 from 1.  
So the optimal is to invert only at node 0: `[-2,1,1,-2]` sum = -2+1+1+(-2) = -2, not optimal.  
Best is to not invert: sum = 2+(-1)+(-1)+2 = 2. So output is 4 only if allowed by k, else 2.*

---

### Thought Process (as if you’re the interviewee)  

1. **Brute-force idea**:  
    - Try all possible subsets of nodes to invert, check if no two inverted nodes violate the ancestor-distance-k rule.
    - For each valid combination, simulate the inversions and compute the total sum.
    - This is exponential in \( n \), not feasible for large trees.

2. **Observation**:  
    - Inversion can "flip" the sign of all nodes in a subtree, but inversions can cancel each other (double-inverted subtree gets back to original sign).
    - The constraint is ultimately about not having inverted nodes too close (distance less than \( k \)) in ancestor-descendant relationships.

3. **DP Insight**:  
    - For each node, keep DP states based on: is parent inverted or not, and how far since last inversion.
    - At each node, decide: (1) invert here (if allowed by k), or (2) do not invert.  
    - Pass state down recursively (DFS), track for each node:  
        - "distance since last inversion"
        - "current parity" (flipped or not at this node, based on ancestors' inversions)

4. **Implementation**:  
    - Build rooted tree (adjacency list).
    - Use memoized DFS: `dfs(node, is_flipped, dist)`
        - is_flipped: 1 if the current node has been flipped by ancestors' inversion(s), else -1.
        - dist: distance from last inversion ancestor
        - If dist >= k, can invert here.
        - For each child, recursively compute values for both inverted and non-inverted cases.
        - Pick maximum.

5. **Trade-offs**:  
    - Time: Each node has O(k) possible states (from distance=0 to k), so time is O(nk).
    - Space: Also O(nk) for memoization.

---

### Corner cases to consider  
- Single-node tree (n=1), k=1 or higher
- All nums are negative (should invert whole tree if allowed)
- k = 1 versus very large k (no inversions allowed if k > tree height)
- Deep trees (like a chain), vs. bushy trees (degree=high)
- nums contains zeros (do they affect inversion choice?)
- Multiple optimal inversion choices (test tie-breaker logic)

---

### Solution

```python
from collections import defaultdict
from functools import lru_cache

def subtreeInversionSum(edges, nums, k):
    # Build rooted tree as adjacency map
    tree = defaultdict(list)
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)
    # Build child list for each node (rooted at 0)
    children = defaultdict(list)
    def build(u, parent):
        for v in tree[u]:
            if v != parent:
                children[u].append(v)
                build(v, u)
    build(0, -1)
    
    # DP: dfs(node, is_flipped, dist) returns max sum for subtree rooted at node
    # is_flipped: 1 if current value is normal, -1 if inverted
    # dist: distance from last inversion ancestor (0 means parent just inverted)
    @lru_cache(maxsize=None)
    def dfs(node, is_flipped, dist):
        # If dist ≥ k, allowed to invert here
        not_invert = is_flipped * nums[node]
        for v in children[node]:
            not_invert += dfs(v, is_flipped, dist+1)
        result = not_invert
        # Option to invert here if dist ≥ k
        if dist >= k:
            flipped = -is_flipped * nums[node]
            for v in children[node]:
                flipped += dfs(v, -is_flipped, 1)
            result = max(result, flipped)
        return result
    # Start at root, not inverted, dist= k (ensures root can be inverted)
    return dfs(0, 1, k)
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k)  
  For each node, possible k values for dist, so O(nk) DP states recursively solved.
- **Space Complexity:** O(n × k)  
  Due to memoization and child tree storage.

---

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree can be very deep, or k is very large?  
  *Hint: Is there a way to reduce/optimize the DP state or prune unnecessary branches?*

- How would you support querying inversion sum multiple times after modifying nums?  
  *Hint: Can you perform incremental updates or need to recompute from scratch?*

- What if you could invert any connected subtree (not just rooted at a single node)?  
  *Hint: Need to generalize the definition of inversion region and state representation.*

---

### Summary
This problem uses a classic tree DP approach with state remembering along the ancestor path. The key is encoding ancestor inversion information as "distance since last inversion," and recursively maximizing the sum.  
This DP-on-trees pattern with additional constraints frequently appears in subtree selection, coloring, early stopping, and ancestor-based policy DP problems.  
It’s a great example of how dynamic programming with pruning can be used in tree-structured optimization where ancestor/descendant constraints apply.