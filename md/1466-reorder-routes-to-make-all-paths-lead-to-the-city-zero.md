### Leetcode 1466 (Medium): Reorder Routes to Make All Paths Lead to the City Zero [Practice](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero)

### Description  
Given `n` cities (numbered from 0 to n-1) and `n-1` directed roads between them (`connections`), each road is a one-way edge from city `A` to city `B`. The network forms a tree (i.e., all cities are connected and there are no cycles). Your task is to compute the minimum number of roads that need to be reversed so that every city can reach city 0 (the capital), directly or through other cities. Each reverse operation changes a road's direction.

### Examples  

**Example 1:**  
Input:  
`n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]`  
Output:  
`3`  
*Explanation: The tree is:*

- [Visual: [0,1],[1,3],[2,3],[4,0],[4,5]]
- 0 → 1
- 1 → 3
- 2 → 3
- 4 → 0
- 4 → 5

*We want all roads to point towards 0. The minimum reversals: [0,1], [1,3], [4,5] (any three that point away from 0).*

**Example 2:**  
Input:  
`n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]`  
Output:  
`2`  
*Explanation: The tree is:*

- 1 → 0
- 1 → 2
- 3 → 2
- 3 → 4

*Reverse [3,2] and [3,4] to point towards 0 via 1 and 2.*

**Example 3:**  
Input:  
`n = 3, connections = [[1,0],[2,0]]`  
Output:  
`0`  
*Explanation: All roads already point towards 0; no reversals are needed.*


### Thought Process (as if you’re the interviewee)  

1. **Brute Force:**  
   - Try all combinations of road reversals, check if all nodes can reach 0. Too slow—exponential time.
   
2. **Observation:**  
   - The network is a tree (no cycles, exactly \( n-1 \) roads).
   - Only direction of roads matters for reachability to 0.
   
3. **Optimized Approach:**  
   - Treat the graph as undirected for traversal.
   - For each edge, record original direction (from->to).
   - Traverse (DFS/BFS) from city 0; for each outgoing edge from current node to neighbor, if the original direction *does not* point towards 0, increment the "reversal" counter.
   - Thus, for each walk from 0 to all others, count the number of edges "pointing away from 0" (i.e., that need reversal).

   - **Why this works:** Since the network is a tree, each edge is visited once, and the only ones we need to reverse are the ones which lead *away* from the root in the original orientation.

**Trade-offs:**  
- Using DFS or BFS both result in \( O(n) \) time complexity.
- No fancy data structures needed other than adjacency list and a set to record original directions.


### Corner cases to consider  
- All roads already point to city 0 (no changes needed).
- All roads point away from city 0 (maximum reversals needed).
- Roads are already bi-directionally connected due to reversals.
- Smallest graph: n = 2, only one road.
- Disconnected roads (should never occur, as it’s a tree).


### Solution

```python
def minReorder(n, connections):
    # Build the undirected adjacency list and set for original directions
    from collections import defaultdict, deque

    graph = defaultdict(list)
    # Store all edges (from, to) that point away in the original graph
    edges = set()
    
    for u, v in connections:
        graph[u].append(v)
        graph[v].append(u)
        edges.add((u, v))  # Store direction u -> v

    # Traverse using BFS or DFS
    res = 0
    visited = set()
    queue = deque([0])
    visited.add(0)

    while queue:
        current = queue.popleft()
        for neighbor in graph[current]:
            if neighbor not in visited:
                # If original direction is current -> neighbor,
                # it needs to be reversed.
                if (current, neighbor) in edges:
                    res += 1
                visited.add(neighbor)
                queue.append(neighbor)
    return res
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each node and edge is visited once during traversal.

- **Space Complexity:** O(n)  
  Extra space for the adjacency list, visited set, and edges set.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve it if the network was not a tree?
  *Hint: You would need to check for cycles and disconnected components.*

- Can you return the actual list of roads to reverse, not just the count?
  *Hint: Instead of just counting, track the edges you add to `res`.*

- How would the solution change if the directions could be reversed at varying costs?
  *Hint: Think Dijkstra's algorithm with edge weight as cost of reversal.*


### Summary

This problem is a textbook example of DFS/BFS tree traversal with a focus on *edge orientation*. The checked pattern is "counting necessary changes via traversal from a fixed root." This algorithm is widely applicable to problems on directed trees, edge reversals, and reachability. You can adapt the approach to variant problems involving different traversal costs or non-tree graphs with care.


### Flashcard
Treat roads as undirected, traverse from city 0; count edges that must be reversed to ensure all paths lead to 0.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
- Minimum Edge Reversals So Every Node Is Reachable(minimum-edge-reversals-so-every-node-is-reachable) (Hard)