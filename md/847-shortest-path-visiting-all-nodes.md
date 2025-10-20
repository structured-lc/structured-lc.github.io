### Leetcode 847 (Hard): Shortest Path Visiting All Nodes [Practice](https://leetcode.com/problems/shortest-path-visiting-all-nodes)

### Description  
Given an undirected, connected graph, your task is to find the length of the shortest path (number of edges) that visits every node at least once. You can start and end at any node, revisit nodes, and use edges multiple times. The graph is represented as an adjacency list. The main challenge is to minimize the total number of edges traversed to ensure all nodes are visited.

### Examples  

**Example 1:**  
Input= [[1,2,3],[0],[0],[0]]  
Output= 4  
Explanation: Start at node 1, go to 0 (edge 1), then to 2 (edge 2), back to 0 (edge 3), and finally to 3 (edge 4). Total edges: 4.

**Example 2:**  
Input= [[1],[0,2,4],[1,3,4],[2],[1,2]]  
Output= 4  
Explanation: Start at 0, go to 1 (edge 1), to 4 (edge 2), to 2 (edge 3), to 3 (edge 4). All nodes visited in 4 steps.

**Example 3:**  
Input= [[1],[0]]  
Output= 1  
Explanation: Visit 0 and 1 (any order) in 1 step, since the graph is a simple pair.

### Thought Process (as if you’re the interviewee)  
**Brute-force:** Consider all possible starting nodes and explore every possible path, tracking visited nodes, until all are visited. This is extremely inefficient (O(n!)) due to repeated visits, reusing edges, and cycles.

**Optimized Approach:** Since the graph is small (n ≤ 12), we can use BFS with state tracking. The state is a pair: (current node, mask of visited nodes), where the mask is a bitmask (1 << i means node i is visited). This way, we BFS over states, not just nodes. For each state, enqueue all neighboring states (including revisits) and keep track of the shortest path to each state.

**Trade-offs and Choices:**  
- BFS ensures the first time we reach a node with a certain mask, it’s the shortest path.
- State tracking with bitmask is space-efficient for small n.
- This approach avoids the exponential explosion of the brute-force method by focusing on unique states.

### Corner cases to consider  
- Graph with 1 node: trivial, answer is 0.
- Fully connected graph: any node can start, but all must be visited.
- Disjoint graph (but problem ensures connected).
- All nodes form a cycle: answer is n-1 steps.
- Repeated visits to already visited nodes may be necessary to reach others.

### Solution

```python
def shortestPathLength(graph):
    n = len(graph)
    target = (1 << n) - 1  # all nodes visited
    visited = [[False for _ in range(1 << n)] for _ in range(n)]
    q = deque()

    # Initialize queue with all starting nodes and their initial masks
    for i in range(n):
        mask = 1 << i
        q.append((i, mask))
        visited[i][mask] = True

    steps = 0

    while q:
        for _ in range(len(q)):
            node, mask = q.popleft()
            if mask == target:
                return steps
            for neighbor in graph[node]:
                new_mask = mask | (1 << neighbor)
                if not visited[neighbor][new_mask]:
                    visited[neighbor][new_mask] = True
                    q.append((neighbor, new_mask))
        steps += 1
    return -1  # in case of no path (shouldn't happen for a connected graph)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(2ⁿ × n²). Each node (n) can be combined with each possible subset of visited nodes (2ⁿ), and for each, we process each neighbor (up to n). In practice, due to early termination, it is often much faster.
- **Space Complexity:** O(2ⁿ × n). The visited array stores for each of n nodes and each possible subset of visited nodes.

### Potential follow-up questions (as if you’re the interviewer)  
How would your solution change if the graph was directed instead of undirected?  
  *Hint: Consider directionality in the adjacency list and revisit semantics.*

How would you handle a graph with weighted edges (minimum path weight to visit all nodes)?  
  *Hint: Think priority-based search (e.g., Dijkstra’s algorithm) with state tracking.*

Can you extend the approach for graphs with a much larger number of nodes?  
  *Hint: Discuss the limits of bitmask/BFS and possible heuristics or approximations.*

### Summary  
This is a classic state-enhanced BFS, using bitmasking for visited node tracking. It is efficient for n ≤ 12, solving the Traveling Salesman Problem (TSP) variant for unweighted graphs. The pattern—augmenting BFS/Dijkstra with a bitmask—is useful in problems where you need to track visited subsets or configuration states, such as Hamiltonian Path, TSP, or puzzle-solving. This is a common pattern in problems requiring simultaneous exploration of both node/position and state.
```


### Flashcard
Use BFS with state (node, visited mask); shortest path to visit all nodes is when visited mask equals all 1s.

### Tags
Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Breadth-First Search(#breadth-first-search), Graph(#graph), Bitmask(#bitmask)

### Similar Problems
- Find the Minimum Cost Array Permutation(find-the-minimum-cost-array-permutation) (Hard)