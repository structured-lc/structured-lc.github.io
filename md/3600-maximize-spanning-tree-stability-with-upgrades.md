### Leetcode 3600 (Hard): Maximize Spanning Tree Stability with Upgrades [Practice](https://leetcode.com/problems/maximize-spanning-tree-stability-with-upgrades)

### Description  
Given an undirected graph with `n` nodes and a list of edges (each edge is described by nodes u, v, its strength, and a boolean must), you must build a **spanning tree** (a tree connecting all nodes with exactly n-1 edges, no cycles). Some edges are **optional** (must=0), and others are **required** (must=1). You may "upgrade" up to k optional edges to forced (treat them as must for your selection). **Stability** of a spanning tree is defined as the minimum strength among its edges. Your task: maximize the stability of the spanning tree after selecting up to k upgrades. Return -1 if it's impossible to connect all the nodes.

### Examples  
**Example 1:**  
Input: `n = 4, edges = [[0,1,5,1],[1,2,4,0],[2,3,3,0]], k = 1`  
Output: `3`  
*Explanation: You must use the [0,1] edge since must=1, and you can choose to upgrade either [1,2] or [2,3], allowing you to build a spanning tree covering all nodes. The minimum edge strength in this tree is 3.*

**Example 2:**  
Input: `n = 3, edges = [[0,1,2,0],[1,2,2,0]], k = 0`  
Output: `2`  
*Explanation: Both edges are optional and can be picked with k=0 since you don't need to upgrade to select them. The minimum strength is 2.*

**Example 3:**  
Input: `n = 3, edges = [[0,1,1,1],[1,2,1,1],[0,2,2,0]], k = 0`  
Output: `1`  
*Explanation: Required edges [0,1] and [1,2] must be in the tree, and that already spans all nodes. Minimum strength is 1.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all combinations of upgrades for up to k optional edges (exponential, not feasible for large n).
- **Observation:** We want the **maximum possible minimum edge strength** in the spanning tree. This is a classic optimization property → think in terms of **binary search** on possible values of stability.
- For any given candidate stability S, ask "is it possible to build a spanning tree such that all chosen edges have strength ≥ S, using at most k upgrades?"
    - All required edges where must=1 must be included (if their strength < S, S is not possible).
    - Select further edges (required or optional; upgrade up to k optional) with strength ≥ S.
    - Use Union-Find (Disjoint Set) to check if a spanning tree covering all n nodes (n-1 edges, all nodes connected, no cycles) is possible for S.
- **Approach:** Use binary search over possible edge strengths. For each mid-value S, check feasibility.
- Store the maximal S for which spanning tree construction is possible.


### Corner cases to consider  
- Required edges with strength < candidate stability (cannot use S, must skip).
- Disconnected graph even after upgrades (return -1).
- k = 0 (cannot upgrade optional edges).
- Multiple edges between the same pair of nodes.
- All edges are required.
- n = 1 or n = 2.


### Solution

```python
class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
    def find(self, x):
        while x != self.parent[x]:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x
    def union(self, x, y):
        fx, fy = self.find(x), self.find(y)
        if fx == fy:
            return False
        self.parent[fx] = fy
        return True

def maximize_spanning_tree_stability_with_upgrades(n, edges, k):
    # Extract unique strengths
    strengths = sorted(set(edge[2] for edge in edges))

    def can_build(stab):
        dsu = DSU(n)
        used_upgrade = 0
        count = 0
        # Always add required edges (must=1)
        for u, v, w, must in edges:
            if must == 1 and w >= stab:
                if dsu.union(u, v):
                    count += 1
            elif must == 1 and w < stab:
                return False  # Required weak edge blocks this stability
        # Try to add other edges (must=0)
        opt = []
        for u, v, w, must in edges:
            if must == 0 and w >= stab:
                opt.append((w, u, v))
        # Sort by -w just for deterministic order (not necessary)
        opt.sort(reverse=True)
        for w, u, v in opt:
            if count >= n - 1:
                break
            if dsu.union(u, v):
                used_upgrade += 1
                count += 1
                if used_upgrade > k:
                    return False
        return count == n - 1

    lo, hi, ans = 1, max(edge[2] for edge in edges), -1
    while lo <= hi:
        mid = (lo + hi) // 2
        if can_build(mid):
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(E log W). We binary search over possible edge strengths (distinct W), and each step involves at most O(E) operations for union-find (E = num of edges).
- **Space Complexity:** O(n + E). DSU is O(n), edge storage O(E).

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if upgrades are unlimited?
  *Hint: Try constructing the most stable spanning tree with freedom to upgrade as many as needed.*

- What if multiple components are allowed, i.e. you may leave the graph disconnected if not all nodes can be connected?
  *Hint: Evaluate max stability among all connected components instead of the whole graph.*

- Can you return an actual list of edges used in the final spanning tree, not just the stability?
  *Hint: Store the edge indices while performing union-find and constructing the tree.*

### Summary
Used binary search to maximize the minimum strength (“stability”) of the spanning tree, and union-find to check if a given candidate strength and upgrade combination allows a valid tree. This is a classic greedy + binary search graph construction + union-find pattern, often seen in network design and MST variants.