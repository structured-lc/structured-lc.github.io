### Leetcode 1377 (Hard): Frog Position After T Seconds [Practice](https://leetcode.com/problems/frog-position-after-t-seconds)

### Description  
You're given an undirected tree with **n** nodes labeled 1 to n, represented by an edge list. A *frog* starts at node 1 and jumps to an unvisited neighbor each second. If at any time the frog cannot move (no unvisited neighbors) or t seconds have elapsed, it stops. Return the probability the frog is at a given node **target** after **t** seconds.
- At each move, the frog picks an unvisited neighbor uniformly at random.
- Probabilities must account for all possible paths.
- The frog cannot revisit a node.

### Examples  

**Example 1:**  
Input: `n = 7`, `edges = [[1,2],[1,3],[1,7],[2,4],[2,6],[3,5]]`, `t = 2`, `target = 4`
Output: `0.16666666666666666`
*Explanation: One way to reach node 4 in 2 seconds. The frog can go 1→2 (with probability 1/3), then 2→4 (1/3 × 1/2 = 1/6).* 

**Example 2:**  
Input: `n = 3`, `edges = [[2,1],[3,2]]`, `t = 1`, `target = 2`
Output: `1.0`
*Explanation: In one second, frog must go from 1→2 (as 1 has only one neighbor).* 

**Example 3:**  
Input: `n = 3`, `edges = [[2,1],[3,2]]`, `t = 1`, `target = 3`
Output: `0.0`
*Explanation: In one second, only possible to jump to 2. Frog can't reach 3 in one second.*

### Thought Process (as if you’re the interviewee)  
- The tree is undirected but always connected.
- At each point, the frog moves to an *unvisited* neighbor chosen at random; no cycles.
- **Brute force idea**: Try all possible paths from 1, simulate every possible outcome, and check the probability of ending at target at time t. But exploring all paths isn't efficient as n increases.
- **Optimization**: Use DFS to traverse all possible paths up to t seconds, passing the probability down with each recursive call.
- If the frog reaches the target before t but still has valid moves (unvisited neighbors), the probability becomes 0 because the frog would have to move on. If the frog reaches target at exactly t or is forced to stay (no neighbors), we can include that as a valid case.
- For each move, split probability equally among available (unvisited) neighbors.

### Corner cases to consider  
- The frog cannot reach the target in t seconds (return 0.0).
- The frog reaches the target before t seconds, but it still has moves.
- The frog reaches a leaf before t seconds and must stay still till t.
- The target is the root.
- The tree has only one node.

### Solution

```python
from collections import defaultdict

def frogPosition(n, edges, t, target):
    # Build the tree as adjacency list
    tree = defaultdict(list)
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)

    visited = set()
    ans = 0.0

    def dfs(node, parent, time_left, prob):
        nonlocal ans
        visited.add(node)
        # If time is up or stuck (leaf or all neighbors visited)
        unvisited = [child for child in tree[node] if child != parent]
        if time_left == 0 or not unvisited:
            if node == target:
                ans = prob
            visited.remove(node)
            return
        # Continue exploring
        nchoices = len(unvisited)
        for nb in unvisited:
            dfs(nb, node, time_left-1, prob * (1.0/nchoices))
        visited.remove(node)

    dfs(1, None, t, 1.0)
    return ans
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) in the best case due to pruning; worst-case O(#paths), which could be exponential if t is large and the tree is bushy.
- **Space Complexity:** O(n) due to recursion depth and adjacency list.

### Potential follow-up questions (as if you’re the interviewer)  

- How to handle cycles in the graph (if given)?  
  *Hint: The problem guarantees a tree, but for graphs, track visited nodes to avoid infinite loops.*

- What if edge weights introduce variable waiting times?  
  *Hint: Adapt the DFS to use weighted moves and manage time budget accordingly.*

- How to return all node probabilities at time t?  
  *Hint: Use a probabilities array updated at leaf nodes or time t.*

### Summary
This is a DFS/backtracking problem for probability flow in trees. The pattern also appears in general graphs (state space traversal), Markov processes, or simulation scenarios.