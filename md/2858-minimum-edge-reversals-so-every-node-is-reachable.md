### Leetcode 2858 (Hard): Minimum Edge Reversals So Every Node Is Reachable [Practice](https://leetcode.com/problems/minimum-edge-reversals-so-every-node-is-reachable)

### Description  
You are given a **directed tree** with `n` nodes (`0` to `n-1`). The given edges form a **tree** if you ignore direction, but as given, some nodes may not be reachable from others. For each node \(i\), compute the **minimum number of edge reversals** needed so that, starting from node \(i\), you can reach **every other node** through a sequence of directed edges. Return an array `answer` where `answer[i]` is the minimal reversals needed for root node \(i\).

- Each reversal means one directed edge's direction can be flipped.
- Think: "From node \(i\), how many edge reversals are needed to make the entire graph reachable from \(i\)?"

### Examples  

**Example 1:**  
Input: `n = 4, edges = [[0,1],[2,0],[3,2]]`  
Output: `[1,2,1,2]`  
*Explanation:  
- Tree view (undirected):  
  ```
      1
      |
      0
      |
      2
      |
      3
  ```
- Directed: 0→1, 2→0, 3→2  
- To make all nodes reachable from:
    - 0: Only 2→0 needs reversal (to 0→2): 1 reversal.
    - 1: Need to reverse 0→1 (to 1→0), and 2→0 (to 0→2): 2 reversals.
    - 2: Just reverse 3→2 (to 2→3): 1 reversal.
    - 3: Reverse 3→2 (to 2→3), and 2→0 (to 0→2): 2 reversals.*

**Example 2:**  
Input: `n = 3, edges = [[1,0],[2,0]]`  
Output: `[2,1,1]`  
*Explanation:  
- Tree view (undirected):  
  ```
    1   2
     \ /
      0
  ```
- Directed: 1→0, 2→0  
- To make all reachable from:
  - 0: Need to reverse both edges (to 0→1, 0→2): 2
  - 1: Reverse 2→0 (to 0→2): 1
  - 2: Reverse 1→0 (to 0→1): 1*

**Example 3:**  
Input: `n = 5, edges = [[1,0],[1,2],[3,2],[3,4]]`  
Output: `[3,2,2,1,2]`  
*Explanation:  
- Directed: 1→0, 1→2, 3→2, 3→4  
- Root at 3: can reach all except 1 and 0, needs 1 reversal
- See above pattern for other roots.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** For each node \(i\), brute-force BFS or DFS to count reversals per root. This is slow (O(n²)), since for each node you must walk the tree, simulating edge reversals.  
- **Observation:** The problem has "tree" structure (n-1 edges, connected, acyclic), so traversals from different roots relate closely.
- **Key insight:** When moving the root from parent to child, only one edge's direction relevance flips; "re-rooting" transfer can be done with a trick.
- **Optimal Approach:**
  - Build an undirected tree, but for each edge, store if the direction is *forwards* or *backwards* relative to your first DFS.
  - Start DFS from root 0. For every move:
      - If the edge goes from parent→child (in edge), no reversal needed.
      - If from child→parent, one reversal needed (must flip direction away from root).
  - For root 0, count number of reversals needed: call this ans.
  - For other nodes: When you shift root to child, only the edge to former parent flips direction (subtract or add 1 reversal).
  - Second DFS: propagate reversal counts, updating answer for each root in O(n).
- **Why optimal:** Two DFS passes, O(n) time and space. Efficient and matches tree nature.

### Corner cases to consider  
- Only one node: n = 1.
- All edges initially point away from a chosen root (no reversals needed).
- All edges point towards a chosen root (max reversals needed for that root).
- Already strongly connected (no reversals needed for any root).
- Large n (performance, stack depth).

### Solution

```python
def minEdgeReversals(n, edges):
    # Build graph with information about edge direction
    # For each u->v in edges, 
    # graph[u].append((v, True)) means original direction u→v (no reversal), 
    # graph[v].append((u, False)) is reverse (would require reversal to reach u→v)
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append((v, True))
        graph[v].append((u, False))

    ans = [0] * n

    # First DFS: Count reversals starting from node 0
    def dfs1(u, parent):
        count = 0
        for v, isForward in graph[u]:
            if v == parent:
                continue
            count += dfs1(v, u) + (0 if isForward else 1)
        return count

    ans[0] = dfs1(0, -1)

    # Second DFS: Propagate reversal counts to other nodes
    def dfs2(u, parent):
        for v, isForward in graph[u]:
            if v == parent:
                continue
            # If edge is forward, then for child, result increases by 1;
            # Else, decreases by 1 (since root shifts and direction flips)
            if isForward:
                ans[v] = ans[u] + 1
            else:
                ans[v] = ans[u] - 1
            dfs2(v, u)
            
    dfs2(0, -1)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of nodes—two passes over all nodes/edges.
- **Space Complexity:** O(n) for the adjacency list and O(n) for the answer array, plus recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- If the input graph contains cycles (i.e., is not a tree), how would your solution change?  
  *Hint: Consider strongly connected components or graph condensation.*

- Can you do it without recursion or using an iterative traversal?  
  *Hint: Use an explicit stack or queue to avoid recursion limits.*

- What if some nodes are disconnected?  
  *Hint: Do a component-wise calculation; unreachable nodes may need special handling (possibly -1 in output).*

### Summary
This problem uses a classic **tree rerooting / dynamic programming on trees** pattern. The trick is to propagate edge reversal costs as you reroot—from parent to child—using two DFS traversals. This approach is general for problems where root choice requires efficient global recalculation, and can be found in problems involving sum of distances, subtree statistics, or reroot path costs.