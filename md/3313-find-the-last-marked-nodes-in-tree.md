### Leetcode 3313 (Hard): Find the Last Marked Nodes in Tree [Practice](https://leetcode.com/problems/find-the-last-marked-nodes-in-tree)

### Description  
We’re given an undirected tree with n nodes labeled 0 to n-1, given as an edge list.  
For each node \(i\), imagine marking node \(i\) at time 0. After every second, all unmarked nodes with at least one marked neighbor become marked.  
For each possible choice of \(i\) as the initial marked node, output which node is the **last** to get marked — if multiple nodes are last (i.e., equally farthest), you may return any one.

### Examples  

**Example 1:**  
Input: `edges = [[0,1],[1,2],[1,3],[3,4]]`  
Output: `[4,4,0,0,0]`  
Explanation:  
- If you start from 0, marking order: 0 → 1 → 2/3 → 4. So 4 is last.
- If you start from 1, order: 1 → 0/2/3 → 4. So 4 is last.
- If from 2, order: 2 → 1 → 0/3 → 4. So 0 is last.
- If from 3, order: 3 → 1/4 → 0/2. So 0 is last.
- If from 4, 4 → 3 → 1 → 0/2. Last is 0.

**Example 2:**  
Input: `edges = [[0,1],[1,2]]`  
Output: `[2,2,0]`  
Explanation:  
- Start from 0: 0 → 1 → 2. Last is 2.
- Start from 1: 1 → 0/2. Last is 2.
- Start from 2: 2 → 1 → 0. Last is 0.

**Example 3:**  
Input: `edges = [[0,1],[1,2],[2,3],[3,4],[4,5]]`  
Output: `[5,5,5,0,0,0]`  
Explanation:  
- Start from 0 or 1 or 2: furthest is 5.  
- Start from 3 or 4 or 5: furthest is 0.  

### Thought Process (as if you’re the interviewee)  
Let’s rephrase: For each node, if we start marking from it, after simulating the marking spread, **which node is last to get marked?**  

Brute force idea:  
- For each node \(i\):
  - Run BFS from \(i\), using levels as “seconds.”
  - At each BFS level, mark new nodes.
  - Track which nodes are marked at the last level — that’s the set of last marked nodes.
  - Return any of them.
- This has O(n²) time (since BFS per node).

Optimization:  
- In a tree, the “last node to get marked” from starting at \(i\) is just the **farthest** node from \(i\).
- But asked for this for all \(i\) — seems repetitive.  
- Notice that the pair of nodes with **maximum distance** (diameter endpoints) determine the farthest points for any node.  
- For a tree, you only need to compare distance from each node to the two diameter endpoints.
- For each node, the “last node” is the diameter endpoint that is farthest from it.

Algorithm:
1. Run BFS (or DFS) from any node (say 0), find the farthest node \(a\) — one end of the diameter.
2. Run BFS from \(a\), find the farthest node \(b\) — other end of the diameter.
3. Precompute distance from every node to \(a\) and \(b\).
4. For each node \(i\):  
  - If distance to \(a\) > distance to \(b\), answer is \(a\).
  - Else, answer is \(b\).

This achieves O(n) time using three BFS/DFS traversals.

### Corner cases to consider  
- Chain/tree is a straight line: diameter covers all nodes.
- Star tree: all leaves equidistant from center, so “last marked” could be any leaf.
- n = 2: only two nodes, trivial.
- n very large.
- Multiple possible “last nodes” (equal distance) — any acceptable.

### Solution

```python
def find_last_marked_nodes(n, edges):
    # Construct adjacency list
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)
    
    def bfs(start):
        from collections import deque
        dist = [-1]*n
        dist[start] = 0
        queue = deque([start])
        while queue:
            node = queue.popleft()
            for nei in graph[node]:
                if dist[nei] == -1:
                    dist[nei] = dist[node] + 1
                    queue.append(nei)
        return dist

    # Step 1: find one diameter endpoint (a)
    dist_from0 = bfs(0)
    a = max(range(n), key=lambda x: dist_from0[x])
    
    # Step 2: find other diameter endpoint (b), get all distances
    dist_froma = bfs(a)
    b = max(range(n), key=lambda x: dist_froma[x])

    # Step 3: distances from b
    dist_fromb = bfs(b)

    # Step 4: For each i, decide farthest node (a or b)
    result = []
    for i in range(n):
        if dist_froma[i] > dist_fromb[i]:
            result.append(a)
        else:
            result.append(b)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  - Three BFS traversals; each processes all n nodes and n-1 edges.
- **Space Complexity:** O(n).  
  - Adjacency list, three distance arrays of length n, and queue up to n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the marking spreads with some latency (e.g., d seconds to visit neighbor)?  
  *Hint: BFS, but use multiplicative levels.*

- Can you output **all** nodes that are last (if there’s a tie)?  
  *Hint: Compare distances to both endpoints — if equal and maximal.*

- What if the graph is not a tree?  
  *Hint: Marking spread can reach the same node along different routes — BFS with visited check.*

### Summary
This is a classic **tree diameter** and multi-source BFS pattern. By leveraging tree properties, you avoid running O(n) BFS operations.  
Final approach uses three BFS traversals and computes distances from endpoints, reducing runtime from O(n²) to O(n).  
This template (find diameter, and use endpoints to answer queries about maximal path distances) is frequently useful in tree problems and can be adapted to shortest/farthest path or dynamic spreading problems in trees.

### Tags
Tree(#tree), Depth-First Search(#depth-first-search)

### Similar Problems
- Minimum Time to Visit Disappearing Nodes(minimum-time-to-visit-disappearing-nodes) (Medium)
- Time Taken to Mark All Nodes(time-taken-to-mark-all-nodes) (Hard)