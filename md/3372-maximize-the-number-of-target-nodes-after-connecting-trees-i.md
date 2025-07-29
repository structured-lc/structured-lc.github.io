### Leetcode 3372 (Medium): Maximize the Number of Target Nodes After Connecting Trees I [Practice](https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-i)

### Description  
You are given two undirected trees.  
- The first tree has `n` nodes labeled from 0 to n−1.  
- The second tree has `m` nodes labeled from 0 to m−1.  
- They're given as edge lists: `edges1` (length n−1) and `edges2` (length m−1).  
- You are also given an integer `k`.

A node u is a **target** to node v if the number of edges on the path from u to v is ≤ k. (A node is always target to itself.)

You must answer, for every node i in the first tree:  
If you can connect i to any node in the second tree (adding one edge), what is the **maximum possible number of nodes target to i** across both trees?

You must return an array of n integers, where answer[i] is that maximum for node i.  
Note: For each query (for each i), the extra edge is removed after considering it.

### Examples  

**Example 1:**  
Input:  
edges1 = `[[0,1],[1,2]]`,  
edges2 = `[[0,1]]`,  
k = `2`  
Output: ` [3,3,3] `  
Explanation:  
Each node in the first tree (which is a line 0–1–2) can reach all nodes in its own tree within distance 2. By connecting to the second tree (nodes 0–1), you can maximize the count. All nodes are within distance ≤2, so answer = 3 for each.

**Example 2:**  
Input:  
edges1 = `[[0,1],[1,2],[1,3]]`,  
edges2 = `[[0,1],[1,2]]`,  
k = `1`  
Output: ` [2,2,2,2] `  
Explanation:  
From any node in tree 1, only itself and its immediate neighbors (within distance ≤1) are targets. Connecting to the other tree doesn't help if k=1, since you'll always need at least 1 additional edge to reach any node in the second tree, so only the directly connected new node will help.

**Example 3:**  
Input:  
edges1 = `[[0,1]]`,  
edges2 = `[[0,1],[1,2]]`,  
k = `3`  
Output: ` [4,4] `  
Explanation:  
Connecting either node in tree 1 (a line: 0–1) to any node in tree 2 (a line: 0–1–2) enables all 5 nodes to be reached from the connecting node with ≤3 steps, *but* you cannot count both connecting nodes twice, so the maximum for each is all nodes in both trees, except the one furthest node in tree 2.

### Thought Process (as if you’re the interviewee)  
The core question is: For each node i in the first tree, if it could connect to any node in the second tree, to which node should it connect in order to maximize the count of all nodes (over both trees) within distance ≤k from i?

My brute-force idea:
- For node i, try connecting to every possible node j in the second tree.
- For the resulting merged graph, BFS from i and count all reachable nodes with ≤k steps.

That’s O(n × m × (n+m)) and is too slow.

Optimize:
- Note that for node i, its “own-tree” targets are all nodes within distance ≤k in tree 1.
- After connection (to node j in tree 2), all nodes in the second tree within distance ≤k–1 from j (because the new edge costs 1 step) are also reachable from i in ≤k steps.
- So, for each node in tree 2, precompute the number of nodes reachable in ≤k–1 steps.
- For each node i in tree 1, the answer is:  
  #targets in own tree from i (≤k) + max over all j in tree 2 of (#targets from j within ≤k–1 in tree 2)

This is much faster: For every node in both trees, precompute BFS to count targets for k and k–1.  
Then for each i in tree 1: answer[i] = (from i, count of nodes within distance ≤k in tree 1) + (max of precomputed for tree 2, for k–1 distance)

### Corner cases to consider  
- n = 1 or m = 1 (single-node trees)
- k = 0 (only the node itself is target)
- Very high k (can reach all nodes in both trees)
- Disconnected graphs (impossible by definition, but check for clear logic)
- Trees with varying degrees (some nodes much farther from center)

### Solution

```python
from collections import deque, defaultdict

def maximizeTargetNodes(n, edges1, m, edges2, k):
    # Build adjacency lists for both trees
    def build_graph(n, edges):
        graph = [[] for _ in range(n)]
        for u, v in edges:
            graph[u].append(v)
            graph[v].append(u)
        return graph

    tree1 = build_graph(n, edges1)
    tree2 = build_graph(m, edges2)
    
    # BFS to count nodes within distance d for every node in graph
    def bfs_count_within(graph, max_dist):
        res = []
        for start in range(len(graph)):
            visited = [False] * len(graph)
            queue = deque()
            queue.append((start, 0))
            cnt = 0
            while queue:
                node, dist = queue.popleft()
                if visited[node] or dist > max_dist:
                    continue
                visited[node] = True
                cnt += 1
                for neighbor in graph[node]:
                    if not visited[neighbor]:
                        queue.append((neighbor, dist+1))
            res.append(cnt)
        return res

    # For all nodes in tree2, count nodes within distance (k-1)
    within_k_minus_1_in_tree2 = bfs_count_within(tree2, k-1) if k-1 >= 0 else [0]*m
    
    # Get the maximum such count (max over all nodes in tree2)
    max_targets_in_tree2 = max(within_k_minus_1_in_tree2) if within_k_minus_1_in_tree2 else 0
    
    # For each node in tree1, compute the answer
    within_k_in_tree1 = bfs_count_within(tree1, k)
    
    answer = []
    for cnt in within_k_in_tree1:
        answer.append(cnt + max_targets_in_tree2)
    
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × (n + m)). For each node in both trees, we run BFS up to depth k or k–1. There are n + m nodes, and BFS runs up to k for each.
- **Space Complexity:** O(n + m). We store graphs and visited arrays. The BFS queue uses O(n) space at most.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could add **multiple** edges between the trees, not just one?  
  *Hint: Try dynamic programming or repeated application—think about union-find or minimum depth coverages.*

- How does the solution change if the original graphs are **not trees** but general connected graphs?  
  *Hint: The idea generalizes, but cycles may affect minimum distance computations.*

- Can you process **updates** (additions/removals) to the trees efficiently after answering some queries?  
  *Hint: Consider persistent or incremental BFS structures or precomputations.*

### Summary
This problem is a good application of BFS and precomputing local neighborhoods. The critical observation is BFS out from each node to a limited depth and combining results through the shortest connection. This pattern (precomputing distances/targets for all nodes, then maximizing with a cheap second pass) is common for “connectivity under modifications” problems and often appears in tree or sparse graph interview questions.