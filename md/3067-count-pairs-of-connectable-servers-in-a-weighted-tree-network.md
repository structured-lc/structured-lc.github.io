### Leetcode 3067 (Medium): Count Pairs of Connectable Servers in a Weighted Tree Network [Practice](https://leetcode.com/problems/count-pairs-of-connectable-servers-in-a-weighted-tree-network)

### Description  
You are given a network of servers represented as a weighted undirected tree (n nodes, n-1 edges, no cycles). Each edge has a weight. For a given integer `signalSpeed`, your task is:  
For each server (call it c), determine how many pairs of distinct servers (a, b) (with a < b and both a ≠ c, b ≠ c) are **connectable through c**.  
Two servers a and b are connectable through c if:  
- The path from c to a does not share any edge with the path from c to b (“edge-disjoint” paths starting from c, i.e., a and b are in different subtrees rooted at c).
- The total distance from c to a is divisible by signalSpeed, and similarly for c to b.

Return an array where the ith element is the number of connectable pairs for server i.

### Examples  

**Example 1:**  
Input:  
`edges = [[0,1,2],[1,2,4],[1,3,6]], signalSpeed = 2`  
Output:  
`[0,2,0,0]`  
*Explanation:  
- For server 1:  
  - Subtrees from 1: nodes 0, 2, 3  
  - Distance (from 1): to 0: 2, to 2: 4, to 3: 6.  
  - All are divisible by 2, so for each pair of subtrees, the product of counts = 1\*1 + 1\*1 + 1\*1 = 3, but since a < b must be satisfied and order doesn't matter, the answer is 2 (pairs: (0,2), (0,3)).  
- Other servers cannot be centers for any suitable pair, so the rest are 0.*

**Example 2:**  
Input:  
`edges = [[0,1,1],[0,2,2],[0,3,3]], signalSpeed = 1`  
Output:  
`[3,0,0,0]`  
*Explanation:  
- For server 0: all distances to leaves: 1, 2, 3, all divisible by 1  
- 3 subtrees, every pair forms a connectable pair through 0: (1,2), (1,3), (2,3) ⇒ 3 pairs.*

**Example 3:**  
Input:  
`edges = [[0,1,5]], signalSpeed = 5`  
Output:  
`[0,0]`  
*Explanation:  
- Only two servers, so no valid pairs through any server.*

### Thought Process (as if you’re the interviewee)  
- Brute force: For each server c, enumerate all pairs of (a, b) (with a,b ≠ c, a < b), check the divisibility conditions and edge-disjointness (which in trees is equivalent to being in different subtrees of c). This is O(n³) and clearly not efficient.
- Optimize:
  - Since the graph is a tree, all “through c” pairs correspond to picking nodes from **different subtrees** of c. So for each server c, find its immediate subtrees, and for each subtree, count the number of nodes whose path-sum is divisible by signalSpeed.
  - For center c, let each subtree have count t₁, t₂, …, tₖ valid nodes. The total number of connectable pairs is:  
    sum over all pairs i < j of tᵢ × tⱼ.
  - This can be done for each server with a DFS for each child subtree.
- Trade-off: We perform (for every node) a DFS for each neighbor, leading to O(n²) time in the worst case, but for trees this is typically manageable for interview constraints.

### Corner cases to consider  
- Only two servers (n = 2) — cannot form any pair through any node.
- All edge weights are 0 (distance always zero).
- signalSpeed = 1 (all distances divisible).
- No path from a to c with distance divisible by signalSpeed.
- Large weights or large signalSpeed so no distances are divisible.
- Unbalanced trees (star, chain, bushy).

### Solution

```python
from typing import List

def countPairsOfConnectableServers(edges: List[List[int]], signalSpeed: int) -> List[int]:
    # Build adjacency list with weights
    n = len(edges) + 1
    graph = [[] for _ in range(n)]
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w))

    def dfs(node: int, parent: int, acc_dist: int) -> int:
        # Returns count of nodes in this subtree whose distance from subtree root is divisible by signalSpeed
        cnt = 1 if acc_dist % signalSpeed == 0 else 0
        for neighbor, weight in graph[node]:
            if neighbor == parent:
                continue
            cnt += dfs(neighbor, node, acc_dist + weight)
        return cnt

    ans = [0] * n

    for center in range(n):
        valid_counts = []
        for neighbor, weight in graph[center]:
            # Count valid in this subtree rooted at neighbor (excluding center)
            valid_in_subtree = dfs(neighbor, center, weight)
            valid_counts.append(valid_in_subtree)
        # Compute sum over all pairs i < j of valid_counts[i] * valid_counts[j]
        s = 0
        prefix = 0
        for count in valid_counts:
            s += prefix * count
            prefix += count
        ans[center] = s

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  For each node, we do a DFS starting at each neighbor — up to n nodes, with up to n traversals.
- **Space Complexity:** O(n)  
  For the adjacency list and recursion stack (since it’s a tree), both O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tree becomes a general graph with cycles?
  *Hint: How would you handle edge-disjoint paths and not counting duplicates?*

- Can you optimize further for very large trees (n up to 10⁵)?
  *Hint: Can you precompute and merge subtree information?*

- What if you’re asked for all pairs (not just a < b), or required to return them explicitly?
  *Hint: How can you store parent information and reconstruct the paths/pairs?*

### Summary
This problem showcases the **Tree DP/DFS** paradigm: for each node, analyze its disjoint subtrees recursively, and count combinations using the counts from each subtree (a classic application of “count pairs from multiple groups/subsets”).  
The pattern (sum over pairs of valid counts from disjoint tree branches) is common in tree-pairing problems and is applicable in network analysis, distributed systems reachability, and subtree queries.


### Flashcard
For each server c, find nodes in each subtree, count pairs from different subtrees where both paths' edge products are divisible by k.

### Tags
Array(#array), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Minimum Height Trees(minimum-height-trees) (Medium)
- Sum of Distances in Tree(sum-of-distances-in-tree) (Hard)