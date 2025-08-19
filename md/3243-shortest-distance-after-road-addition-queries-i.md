### Leetcode 3243 (Medium): Shortest Distance After Road Addition Queries I [Practice](https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i)

### Description  
Given n cities labeled 0 to n-1, there is a **unidirectional** road from city i to city i+1 (for 0 ≤ i < n-1). You are given a list of queries, where each query [u, v] means a new unidirectional road from city u to city v is temporarily added.  
For **each query**, return the *length of the shortest path* from city 0 to city n-1 after **adding only that road for that query (not cumulative)**. If no valid path exists, return -1.  
The graph has only unidirectional roads and may form cycles after queries.

### Examples  

**Example 1:**  
Input:  
n = 4, queries = [[1, 3], [2, 0]]
Output:  
[2, 3]  
*Explanation:*
- Base: Path is 0 → 1 → 2 → 3 (length 3).
- 1ˢᵗ query: Add 1 → 3. Shortest path: 0 → 1 → 3 (length 2).
- 2ⁿᵈ query: Add 2 → 0. There’s a cycle but shortest path is still 0 → 1 → 2 → 3 (length 3).

**Example 2:**  
Input:  
n = 3, queries = [[0, 2], [1, 0], [2, 1]]
Output:  
[1, 2, 2]  
*Explanation:*
- Base: 0 → 1 → 2 (length 2).
- 1ˢᵗ: Add 0 → 2, path 0 → 2 (length 1).
- 2ⁿᵈ: Add 1 → 0 creates a cycle, but 0 → 1 → 2 (length 2).
- 3ʳᵈ: Add 2 → 1, path 0 → 1 → 2 (still length 2).

**Example 3:**  
Input:  
n = 2, queries = [[0, 1], [1, 0], [0, 0]]
Output:  
[1, 1, 1]  
*Explanation:*
- Base: 0 → 1 (length 1).
- All queries add self-loops or redundant edges, shortest path stays 1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For every query, temporarily add the new edge and run BFS from 0 to n-1. Because the base graph is a line, BFS is O(n), so for q queries overall O(qn). This is acceptable for moderate input sizes.

- **Optimizing:**  
  Precompute the default distance from 0 to every node. For each query, see if the new direct path makes a shorter route, i.e., via 0 → ... → u → v → ... → n-1.  
  But if cycles can be created, generally BFS per query ensures correctness for any graph shape after addition.

- **Trade-off:**  
  - Precomputing only works if queries don’t create cycles.  
  - Since a single edge addition keeps the graph mostly linear, BFS will be fast enough for each query.

### Corner cases to consider  
- n = 1 (just one node; no movement required)
- u = v (self-loop added, shouldn’t change shortest path)
- Edge added already exists in path (no effect)
- Adding an edge that creates a cycle (cycle shouldn’t affect shortest path)
- No path from 0 to n-1 possible (should return -1)
- Queries with invalid city numbers (for testing)
- Long graphs, where naive DFS could be too slow (use BFS)

### Solution

```python
from collections import deque, defaultdict

def shortestDistance(n, queries):
    # Build the base graph: i → i+1
    base_graph = defaultdict(list)
    for i in range(n - 1):
        base_graph[i].append(i + 1)

    result = []
    for u, v in queries:
        # Copy base graph for this query (Shallow copy is fine: edges are small)
        graph = defaultdict(list, {key: list(val) for key, val in base_graph.items()})
        # Add the new road for this query
        graph[u].append(v)

        # BFS from 0 to n-1
        queue = deque()
        visited = [False] * n
        dist = [float('inf')] * n

        queue.append(0)
        dist[0] = 0
        visited[0] = True

        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if not visited[neighbor]:
                    visited[neighbor] = True
                    dist[neighbor] = dist[node] + 1
                    queue.append(neighbor)

        answer = dist[n - 1] if dist[n - 1] != float('inf') else -1
        result.append(answer)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  For each query, BFS runs on n nodes and at most n edges, so O(n). For q queries: **O(q × n)**.
- **Space Complexity:**  
  Graph storage is O(n), auxiliary arrays O(n). Per query O(n) extra for BFS storage—total **O(n)** extra.

### Potential follow-up questions (as if you’re the interviewer)  

- What if queries are **cumulative** (edges stay after each query)?  
  *Hint: Precompute distances incrementally, or use dynamic shortest path techniques.*

- If roads have **weights** (positive costs), how would your approach change?  
  *Hint: Dijkstra’s algorithm per query (O(m log n)).*

- What if you wanted not just the shortest path length, but to **output the path** itself?  
  *Hint: Keep parent pointers during BFS.*

- What if the city network is **bidirectional** from the start?  
  *Hint: Construct adjacency list accordingly, ensure BFS explores all directions.*

### Summary
This problem applies the classic BFS (Breadth-First Search) pattern for shortest path in unweighted graphs. For each query, we leverage a simple on-demand graph update and search. The approach is robust to cycles or edge multiplicity, and is a common interview pattern for dynamic graph path queries and for problems involving one-off changes to a static structure.

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
