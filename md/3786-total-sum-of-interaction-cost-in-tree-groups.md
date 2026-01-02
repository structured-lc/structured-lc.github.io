### Leetcode 3786 (Hard): Total Sum of Interaction Cost in Tree Groups [Practice](https://leetcode.com/problems/total-sum-of-interaction-cost-in-tree-groups)

### Description  
You are given an undirected tree with n nodes (numbered 0 to n-1) and an array group of size n where group[i] represents the group ID of node i. The interaction cost between two nodes u and v is the number of edges on the unique path connecting them. Compute the total sum of interaction costs over all unordered pairs (u, v) where u ≠ v and group[u] == group[v].

### Examples  

**Example 1:**  
Input: `n = 3, edges = [[0,1],[1,2]], group = [1,1,1]`  
Output: `3`  
*Explanation: All 3 nodes are in group 1. The pairs are (0,1) with cost 1, (0,2) with cost 2, and (1,2) with cost 1. Total: 1 + 2 + 1 = 3.*

**Example 2:**  
Input: `n = 6, edges = [[0,1],[0,2],[1,3],[1,4],[2,5]], group = [1,2,1,1,2,1]`  
Output: `12`  
*Explanation: Group 1 nodes: 0,2,3,5 (4 nodes). Group 2 nodes: 1,4 (2 nodes). For group 1, compute pairwise path costs through the tree structure; total contribution is 12. Group 2 contributes 2 (path 1-4 via 0 has 2 edges).*

**Example 3:**  
Input: `n = 1, edges = [], group = [1]`  
Output: `0`  
*Explanation: Only 1 node, no valid pairs exist.*

### Thought Process (as if you're the interviewee)  
First, brute force: For each group, collect all nodes in that group, then compute pairwise distances using LCA or BFS for each pair. This is O(n²) time due to O(n) pairs per group and O(n) distance queries—too slow for n ≤ 10⁵.  

To optimize, notice we need sum of distances only within same-group nodes. Tree distances relate to edge contributions: each edge contributes to the total based on how many same-group pairs have paths crossing it. But computing per-edge is complex.  

Better: Use DFS tree DP. For each subtree, track count of nodes per group value. The key insight is during DFS, when at a node with group g, the "outside" nodes with group g (total_g - subtree_g) each contribute depth[node] to the sum via paths crossing the parent edge. Accumulate this globally. Also recurse to compute subtree contributions. This handles all pairs efficiently by separating intra-subtree and cross-subtree pairs. Trade-off: O(n × G) time where G is max group value (≤20 per constraints), acceptable since n ≤ 10⁵, G ≤ 20.

### Corner cases to consider  
- n = 1: No pairs, return 0.  
- All nodes same group: Sum all pairwise distances.  
- Each node unique group: Return 0.  
- Star tree (one center, many leaves): Many cross-center paths.  
- Linear chain: Path costs are simple distances.  
- Disconnected groups: Groups split across subtrees.

### Solution

```python
class Solution:
    def totalCost(self, n: int, edges: List[List[int]], group: List[int]) -> int:
        # Build adjacency list for undirected tree
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        # total[g] = total nodes with group g across whole tree
        total = [0] * 21  # group values 1 to 20
        for g in group:
            total[g] += 1
        
        self.ans = 0  # global answer accumulator
        
        def dfs(node: int, parent: int, depth: int, cur_group: int):
            # Count nodes with cur_group in this subtree
            subtree_count = 1 if group[node] == cur_group else 0
            
            # Recurse on children
            for child in adj[node]:
                if child != parent:
                    subtree_count += dfs(child, node, depth + 1, cur_group)
            
            # For pairs crossing parent edge: (total[cur_group] - subtree_count) * depth
            # Each such outside node pairs with every node in subtree with cur_group
            outside = total[cur_group] - subtree_count
            self.ans += outside * subtree_count * depth
            
            return subtree_count
        
        # For each possible group 1 to 20, run DFS from root 0
        for g in range(1, 21):
            if total[g] > 0:
                dfs(0, -1, 0, g)
        
        return self.ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × 20) = O(n) since DFS visits each node once per group (20 groups), and group values ≤20. Building adj list is O(n).  
- **Space Complexity:** O(n) for adj list and recursion stack (tree height ≤n worst case).

### Potential follow-up questions (as if you're the interviewer)  

- (What if group values can be up to 10⁹?)  
  *Hint: Use a map or collect unique groups first to avoid fixed loop.*

- (Modify to return cost modulo 10⁹+7.)  
  *Hint: Add modular arithmetic to ans updates and counts.*

- (What if it's a general graph instead of tree?)  
  *Hint: Distance computation becomes APSP or multi-source BFS per group.*

### Summary
Use multi-group DFS tree DP: for each group, compute subtree counts and accumulate cross-edge contributions as outside_count × subtree_count × depth. Common pattern in tree sum-of-distances problems (e.g., sum distances within colors), applicable to similar contest hard problems.

### Flashcard
For each group, run DFS to compute subtree counts, adding (total_g - subtree_g) × subtree_g × depth for cross-parent contributions—captures all pairwise path costs in O(n) per group.

### Tags
Array(#array), Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
