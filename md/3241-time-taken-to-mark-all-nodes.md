### Leetcode 3241 (Hard): Time Taken to Mark All Nodes [Practice](https://leetcode.com/problems/time-taken-to-mark-all-nodes)

### Description  
Given an undirected tree with n nodes labeled 0 to n-1 and edges, all nodes start unmarked. You start from any node:  
- If a node is **odd**, it will become marked at time `x` if any neighbor was marked at time `x-1`.  
- If a node is **even**, it will become marked at time `x` if any neighbor was marked at time `x-2`.  
For each node, compute the **minimum time** required to have all nodes marked if you start the process from that node.  
Return a list answer where answer[i] is the minimum time to mark all nodes, starting from node `i`.

### Examples  

**Example 1:**  
Input:  
```
n = 3, edges = [[0,1],[1,2]]
```
Output:  
```
[2,2,2]
```
*Explanation:  
- Start from 0: 0 is even, starts at 0.  
  - 1 is odd, marked at 1.  
    - 2 is even, marked at 3 (since its parent 1 is odd, takes 2 steps: 1→3)  
  - But, if you reverse the direction (start from leaf): for all roots, the "slowest" path determines total time; all are length 2  
- The same logic applies for all roots in this chain.*

**Example 2:**  
Input:  
```
n = 5, edges = [[0,1],[0,2],[1,3],[1,4]]
```
Output:  
```
[3,3,4,4,4]
```
*Explanation:  
- From root 0:  
  - 1 (odd) -> marked at 1  
    - 3 (odd) -> marked at 2  
    - 4 (even) -> marked at 3  
  - 2 (even) -> marked at 2  
- Furthest is time 3 for nodes 3 or 4, so answer = 3  
- Compute similarly from other roots.*

**Example 3:**  
Input:  
```
n = 4, edges = [[0,1],[1,2],[1,3]]
```
Output:  
```
[3,2,3,3]
```
*Explanation:  
- Start from 1: all reachable in 2 time.  
- From non-central nodes, more steps needed.  
- Similar stepwise DP updates happen as the process fans out.*

### Thought Process (as if you’re the interviewee)  
First thoughts:  
- This is a tree. Spreading a "mark" from the root with variable step cost:  
  - Mark an **odd** at x if adjacent is x-1.  
  - Mark an **even** at x if adjacent is x-2.  
- **Brute-force** approach: for every node, do BFS or DFS, tracking mark time for children.  
  - For each neighbor, propagate based on their parity.  
  - Too slow: O(n²).

Optimal:
- Tree DP, rerooting technique  
  - Do one DFS to find, for each node, the time to mark all nodes in its subtree if rooted here.  
  - Then, "reroot" to compute the answer for all roots using DP transfer.  
- At each node, need to track two things:  
  1. The maximum time to mark the entire subtree (by propagating slowest possible marking rules down).  
  2. When rerooting, compute for parent-to-child transition, since rerooting may change the time when a node's mark is available for each neighbor.  
- DFS downward to compute maximum cost in each subtree.  
- Then, reroot and update for parent effects.  
- Careful: Mark propagation is not symmetric because even/odd delay is different!

### Corner cases to consider  
- Tree is a chain (linear linked-list-like).
- Tree is a star.
- n = 1 (single node).
- All nodes are even or all nodes are odd.
- Deepest leaf at the end, leaf is even.
- Large tree (test efficiency).

### Solution

```python
def timeTakenToMarkAllNodes(n, edges):
    from collections import defaultdict

    # Build adjacency list
    tree = defaultdict(list)
    for u, v in edges:
        tree[u].append(v)
        tree[v].append(u)

    # DP array to store max time to mark all nodes from subtree rooted at each node
    down = [0] * n  # down[i]: max time to mark all descendants if root at i

    def dfs(u, parent):
        max_time = 0
        for v in tree[u]:
            if v == parent:
                continue
            dfs(v, u)
            edge_cost = 1 if v % 2 == 1 else 2
            max_time = max(max_time, down[v] + edge_cost)
        down[u] = max_time

    # Start DFS from arbitrary root (0)
    dfs(0, -1)

    res = [0] * n

    # Upward DP to reroot
    def reroot(u, parent, parent_time):
        # Time for current root is the max of:
        # - time from its children (down[u])
        # - time coming from parent
        res[u] = max(down[u], parent_time)
        prefix = []
        suffix = []

        # Precompute "down + edge_cost" for children
        children = []
        for v in tree[u]:
            if v == parent:
                continue
            edge_cost = 1 if v % 2 == 1 else 2
            children.append((down[v] + edge_cost, v))

        m = len(children)
        pre = [0] * (m + 1)
        suf = [0] * (m + 1)
        # Compute prefix/suffix max for rerooting
        for i in range(m):
            pre[i+1] = max(pre[i], children[i][0])
        for i in range(m-1, -1, -1):
            suf[i] = max(suf[i+1], children[i][0])

        for i, (child_time, v) in enumerate(children):
            # For child v, the best time is max of:
            # - time from parent
            # - time from other siblings (max of prefix/suffix without own)
            # For parent to child, edge_cost depends on u's parity
            edge_cost = 1 if u % 2 == 1 else 2
            max_sib = max(pre[i], suf[i+1])
            new_parent_time = max(parent_time, max_sib) + edge_cost
            reroot(v, u, new_parent_time)

    reroot(0, -1, 0)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Each node and edge visited a constant number of times; prefix/suffix precomputation and traversal per node.
- **Space Complexity:** O(n).  
  - Extra storage for down[], result array, recursion stack up to O(n), and adjacency list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the marking time function is arbitrary per node (given as a list, not just even/odd)?  
  *Hint: Generalize edge_cost selection.*

- If we also want to output the actual sequence/times for when each node gets marked, how would you modify the solution?  
  *Hint: Record step-by-step BFS or DFS, with timestamps.*

- Can this approach be extended for a dynamic tree (nodes/edges changing over time)?  
  *Hint: Consider using link-cut trees or centroid decomposition for efficiently updating rerooted results.*

### Summary
This problem uses the **rerooting DP** tree dynamic programming pattern. The key insight is to compute the slowest mark propagation for each possible root efficiently, using bottom-up (downward DP) and then rerooting via upward DP.  
The rerooting DP is a well-known approach for problems asking about "all possible tree roots" with substructure dependency, and also appears in centroid calculation, subtree sum, or influence problems in trees.


### Flashcard
Use tree DP with rerooting—first DFS computes mark time for each subtree, second DFS recomputes when considering parent direction.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Graph(#graph)

### Similar Problems
- Sum of Distances in Tree(sum-of-distances-in-tree) (Hard)
- Most Profitable Path in a Tree(most-profitable-path-in-a-tree) (Medium)
- Find the Last Marked Nodes in Tree(find-the-last-marked-nodes-in-tree) (Hard)