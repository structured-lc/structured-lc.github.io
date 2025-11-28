### Leetcode 3373 (Hard): Maximize the Number of Target Nodes After Connecting Trees II [Practice](https://leetcode.com/problems/maximize-the-number-of-target-nodes-after-connecting-trees-ii)

### Description  
Given two undirected trees:  
- The first tree has **n** nodes labeled 0 to n-1, with edges `edges1`.
- The second tree has **m** nodes labeled 0 to m-1, with edges `edges2`.

You can connect **one node from the first tree** to **one node from the second tree** with an extra edge.  
A node *u* is called a **target node to v** if the path from *u* to *v* in the modified tree uses an **even number of edges** (path length parity is even).   
A node is always a target to itself.

For **each node i in the first tree**, compute the **maximum possible number of target nodes** for *i* after you connect *any* node from the first tree to *any* node in the second tree.  
Return an array of length n: result[i] = max # target nodes for node i.

Each query is independent (the extra edge is removed and can be added elsewhere for the next i).

### Examples  

**Example 1:**  
Input:  
`edges1 = [[0,1],[0,2],[2,3],[2,4]]`,  
`edges2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]]`  
Output: ` [8,7,7,8,8]`  
*Explanation:  
Tree1:*
```
      0
     / \
    1   2
       / \
      3   4
List: [0,1,2,3,4]
```
*Tree2:*
```
        0
      / | \
     1  2  3
     |    \
     4     7
    / \
   5   6
List: [0,1,2,3,4,5,6,7]
```
*For node 0 and 3,4 in tree1, you can get all 8 nodes in tree2 as target; for the rest, up to 7.*

**Example 2:**  
Input:  
`edges1 = [[0,1],[0,2],[0,3],[0,4]]`,  
`edges2 = [[0,1],[1,2],[2,3]]`  
Output: ` [3,6,6,6,6]`  
*Explanation:  
Tree1 is a star with center 0.  
Tree2 is a path 0-1-2-3.  
By carefully choosing the bridging nodes, node 0 can get 3 targets, others up to 6.*

**Example 3:**  
Input:  
`edges1 = [[0,1]]`,  
`edges2 = [[0,1]]`  
Output: ` [2,2]`  
*Explanation:  
Both are tiny trees. No matter how you connect, you can get at most 2 targets per node.*

### Thought Process (as if you’re the interviewee)

First, let’s break down the **target node** condition:  
A node u is a target to v if the shortest path u-v contains an even number of edges. In a tree, this is determined by the parity of the distance between u and v.

Key insight:
- In a connected tree, parity of path length between two nodes only depends on the parity of their depths from a root.  

For **each node i of Tree1**, after adding a bridge to some node in Tree2:
- For all nodes in the merged graph, their path to i may go through the bridge or not.
- The parity flips depending on the parity of the number of edges traversed.

So, we want to maximize the number of nodes with an even distance to i after the merge. The optimal way is to connect i to a node in Tree2 whose parity matches the largest group in Tree2 (more even or odd depth).  
- For Tree1, precompute for each i:
    - How many nodes are at even parity relative to i, how many at odd parity?
- For Tree2 (fixed for all queries):
    - For one node as bridge, it adds all nodes of one parity group as possible targets (depending on which parity matches the parity of i).

Approach:
1. For Tree1:
    - For each node i, count number of nodes with even distance to i (including itself), odd distance.
2. For Tree2:
    - For some fixed root, color all nodes by even/odd depth.
    - Count number of even (`cnt0`) and odd (`cnt1`) nodes.
3. For each node i:
    - Maximize target nodes by optimally connecting to an even or odd node in Tree2, depending on which group is larger for Tree2.
    - answer[i] = max(even_count[i] + cnt0, odd_count[i] + cnt1)

Optimized:
- Run a single BFS on Tree2 for parity.
- For Tree1, can DFS to get even/odd counts for all possible roots using rerooting technique.

### Corner cases to consider  
- One or both trees consist of a single node.
- All nodes are connected in a line (path).
- Trees with balanced vs. unbalanced depth.
- All nodes of one parity in Tree2 (e.g., even-sized star).
- Very large trees (check for O(n) per query inefficiency).

### Solution

```python
from collections import deque, defaultdict

def maximizeNumberOfTargetNodes(edges1, edges2):
    # Helper to build adjacency list from edge list
    def build_adj(n, edges):
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        return adj

    n = len(edges1) + 1
    m = len(edges2) + 1
    adj1 = build_adj(n, edges1)
    adj2 = build_adj(m, edges2)

    # BFS on Tree2 to color by parity
    color2 = [0]*m
    visited2 = [False]*m
    dq = deque()
    dq.append(0)
    visited2[0] = True
    color2[0] = 0
    cnt0, cnt1 = 1, 0
    while dq:
        node = dq.popleft()
        for nei in adj2[node]:
            if not visited2[nei]:
                color2[nei] = color2[node]^1
                if color2[nei] == 0:
                    cnt0 += 1
                else:
                    cnt1 += 1
                visited2[nei] = True
                dq.append(nei)

    # For each node in Tree1, DFS to count even and odd depths
    # We can do one initial DFS to get for root, then rerooting DP for all nodes
    even_count = [0]*n # number of nodes at even distance from i
    odd_count = [0]*n  # number of nodes at odd distance from i

    # DFS to get depth and counts for root 0
    depth1 = [0]*n
    def dfs(u, parent):
        for v in adj1[u]:
            if v == parent:
                continue
            depth1[v] = depth1[u] + 1
            dfs(v, u)
    dfs(0, -1)
    # The even/odd group sizes for root 0
    for i in range(n):
        if depth1[i]%2 == 0:
            even_count[0] += 1
        else:
            odd_count[0] += 1

    # Prepare for all roots using rerooting DP
    res_even = [0]*n
    res_odd = [0]*n
    res_even[0] = even_count[0]
    res_odd[0] = odd_count[0]

    def reroot(u, parent):
        for v in adj1[u]:
            if v == parent:
                continue
            # Before moving root from u to v, update counts
            res_even[v] = res_odd[u]
            res_odd[v] = res_even[u]
            reroot(v, u)
    reroot(0, -1)

    # For each node, answer = max(even_group + cnt0, odd_group + cnt1)
    ans = []
    for i in range(n):
        ans.append(max(res_even[i]+cnt0, res_odd[i]+cnt1))
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m)
    - BFS and DFS traversals for both trees are linear in node/edge count.
    - Rerooting DP is also O(n).
- **Space Complexity:** O(n + m)
    - Adjacency lists, color/depth arrays, result arrays are all linear.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the trees are not connected (can be forests).  
  *Hint: How would you modify your parity logic if trees are no longer single pieces?*

- What if you could connect more than one edge between Tree1 and Tree2?  
  *Hint: Try to generalize the parity logic for multiple bridge edges.*

- How would you answer queries for arbitrary pairs (i in Tree1, j in Tree2)?  
  *Hint: Precompute all depth groupings for both trees.*

### Summary

This problem uses the **tree coloring** and **parity** pattern. By coloring each tree node by even/odd depth and using rerooting DP, we efficiently track parity classes for any root. The **optimal selection** for each node leverages the property that parity only depends on distance, allowing efficient O(n + m) solutions. This approach is widely used in tree rerooting, dynamic programming on trees, and parity queries in subtrees.


### Flashcard
Use parity of distances; nodes at even distance from a node are targets; after connecting trees, count nodes with even parity distance.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Find Minimum Diameter After Merging Two Trees(find-minimum-diameter-after-merging-two-trees) (Hard)