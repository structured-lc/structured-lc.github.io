### Leetcode 834 (Hard): Sum of Distances in Tree [Practice](https://leetcode.com/problems/sum-of-distances-in-tree)

### Description  
Given an undirected, connected tree with \( N \) nodes labeled from \( 0 \) to \( N-1 \), and a list of \( N-1 \) edges (with each edge connecting two nodes), return a list `ans` where `ans[i]` is the **sum of the distances** between node \( i \) and every other node in the tree.  
Distances are measured as the number of edges in the path connecting two nodes.

### Examples  

**Example 1:**  
Input: `N = 6, edges = [[0,1],[0,2],[2,3],[2,4],[2,5]]`  
Output: `[8,12,6,10,10,10]`  
*Explanation:*

Visual tree:
```
      0
     / \
    1   2
       /|\
      3 4 5
```
- For node 0: dist to 1 (1), to 2 (1), to 3 (2), to 4 (2), to 5 (2): 1+1+2+2+2 = 8
- Node 1: dist to 0 (1), 2 (2), 3 (3), 4 (3), 5 (3): 1+2+3+3+3 = 12
- Node 2: 1+1+1+1+2 = 6
- Node 3: 2+3+1+2+2 = 10
- Node 4: 2+3+1+2+2 = 10
- Node 5: 2+3+1+2+2 = 10

**Example 2:**  
Input: `N = 1, edges = []`  
Output: ``  
*Explanation:*
- Only one node, so distance sum is 0.

**Example 3:**  
Input: `N = 2, edges = [[1,0]]`  
Output: `[1,1]`  
*Explanation:*
- Each node is distance 1 from the other.

### Thought Process (as if you’re the interviewee)  
This problem asks for the sum of distances from every node to every other node in a tree.

- **Brute-force idea:**  
  For each node, run BFS or DFS to compute distances to all other nodes.  
  For each node: Time is O(N). Doing this for every node is O(N²).  
  Not efficient for large N (up to 3×10⁴).

- **Optimization:**  
  The tree structure (acyclic, connected) allows us to exploit properties for dynamic programming.

  **Two-pass DFS approach:**
  - First DFS (post-order):  
    - Count subtree sizes and compute, for root node (say 0), the sum of distances to all other nodes.
    - For node `i`, store:
      - size[i]: the number of nodes in its subtree (including itself)
      - res[i]: the sum of distances from node i to all nodes in its subtree.

  - Second DFS (pre-order):  
    - Propagate results from parent to children, using the following relationship:
      When moving from parent u to child v:
      ```
      res[v] = res[u] - size[v] + (N - size[v])
      ```
      - When moving root from u to v: nodes in v's subtree get closer by 1, and all other nodes get further by 1.

  - This gives O(N) solution.

### Corner cases to consider  
- Single node (`N=1`): Output ``
- Line/chain tree (e.g. path): Check per-node distances.
- Star tree (one root, all other nodes as leaves): Ensure propagation logic is correct.
- Very deep/unbalanced tree.
- Multiple children per node.

### Solution

```python
def sumOfDistancesInTree(N, edges):
    # Build adjacency list
    tree = [[] for _ in range(N)]
    for a, b in edges:
        tree[a].append(b)
        tree[b].append(a)

    res = [0] * N      # Sum of distances for each node
    count = [1] * N    # Subtree sizes; each node itself

    # First DFS: post-order, compute count[] and initial res[0]
    def dfs1(node, parent):
        for child in tree[node]:
            if child == parent:
                continue
            dfs1(child, node)
            count[node] += count[child]
            res[node] += res[child] + count[child]

    # Second DFS: pre-order, propagate results to children
    def dfs2(node, parent):
        for child in tree[node]:
            if child == parent:
                continue
            res[child] = res[node] - count[child] + (N - count[child])
            dfs2(child, node)

    dfs1(0, -1)
    dfs2(0, -1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N)  
  - Each node and edge is visited at most twice (2 DFS traversals).

- **Space Complexity:** O(N)  
  - For the adjacency list, result arrays, and recursion stack.

### Potential follow-up questions  

- How would you solve the problem if the tree can change dynamically (supporting edge insertions/removals)?  
  *Hint: Think about dynamic trees / centroid decomposition / link-cut trees.*

- How could you output not just the sum, but the sorted list of all pairwise distances per node?  
  *Hint: Store actual distances, not just their sum; efficiency might suffer.*

- What changes if the input graph can have cycles (i.e., is not a tree)?  
  *Hint: Need to guard against infinite loops and revisit BFS/DFS strategies.*

### Summary
This approach exploits **tree dynamic programming with rerooting**—a common technique for tree-based problems where information about parent/child relationships lets you propagate results efficiently. The pattern is widely applicable for problems involving per-node aggregates that depend on subtree and "rest-of-tree" properties. Examples include problems about subtree sums, distances, or influence propagation in hierarchical data.

### Tags
Dynamic Programming(#dynamic-programming), Tree(#tree), Depth-First Search(#depth-first-search), Graph(#graph)

### Similar Problems
- Distribute Coins in Binary Tree(distribute-coins-in-binary-tree) (Medium)
- Count Nodes With the Highest Score(count-nodes-with-the-highest-score) (Medium)
- Collect Coins in a Tree(collect-coins-in-a-tree) (Hard)
- Maximum Score After Applying Operations on a Tree(maximum-score-after-applying-operations-on-a-tree) (Medium)
- Count Pairs of Connectable Servers in a Weighted Tree Network(count-pairs-of-connectable-servers-in-a-weighted-tree-network) (Medium)
- Time Taken to Mark All Nodes(time-taken-to-mark-all-nodes) (Hard)