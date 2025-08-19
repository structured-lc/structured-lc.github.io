### Leetcode 1135 (Medium): Connecting Cities With Minimum Cost [Practice](https://leetcode.com/problems/connecting-cities-with-minimum-cost)

### Description  
You are given **n** cities labeled from 1 to n and an array **connections** where each element is a triplet `[x, y, cost]`. Each triplet indicates that it costs **cost** to build a bidirectional connection between city **x** and city **y**. The task is to connect all the cities such that for every pair of cities, there is a path between them (the network is connected). You need to find the **minimum total cost** required to connect all the cities.  
- If it is not possible to connect all the cities using the given connections, return **-1**.

### Examples  

**Example 1:**  
Input: `n = 3, connections = [[1,2,5],[1,3,6],[2,3,1]]`  
Output: `6`  
*Explanation: Choose connections [2,3,1] and [1,2,5]. Both connect all three cities with a total cost of 1+5=6. Any two connections will do, but this is the cheapest.*

**Example 2:**  
Input: `n = 4, connections = [[1,2,3],[3,4,4]]`  
Output: `-1`  
*Explanation: City 2 and city 4 have no way to connect, so it is impossible to connect all cities. Return -1.*

**Example 3:**  
Input: `n = 2, connections = [[1,2,3]]`  
Output: `3`  
*Explanation: There are only two cities, one direct connection. Take it, so total cost is 3.*

### Thought Process (as if you’re the interviewee)  
At first, this problem sounds like we need to connect all the cities at the minimum cost. This is a classic **Minimum Spanning Tree (MST)** problem.  
- For **n** nodes, the MST connects all nodes with exactly **n-1 edges** at minimum total cost (if possible).  
- We can use **Kruskal's algorithm** with a Union-Find (Disjoint Set) to efficiently connect cities with the smallest edges first and ensure no cycles.  
- Sort all connections by their cost.  
- Iterate over them, union each pair if not already connected, and keep adding their cost, until we connect all cities (i.e., we've added n-1 connections).  
- If by the end we have fewer than n-1 connections added, some cities remain disconnected, return -1.

**Why not use other approaches?**  
- Prim's Algorithm would also work but requires building adjacency lists and a priority queue; Kruskal's is more direct when edges are already provided.

**Trade-off:**  
- Sorting edges: O(m log m), where m is the number of connections.
- With Union-Find, each union/find op is nearly O(1) (amortized).

### Corner cases to consider  
- n = 1: Only one city, no connections needed, cost is 0.
- Impossible to connect all cities: e.g. no possible connections for some cities → return -1.
- Duplicate edges: Multiple possible connections between the same two cities.
- Input connections may be empty.
- Self-loops: connections like [1,1,0], should not exist by constraints.

### Solution

```python
def minimumCost(n, connections):
    # Helper function: Union-Find (Disjoint Set)
    parent = [i for i in range(n + 1)]  # 1-indexed

    def find(u):
        while parent[u] != u:
            parent[u] = parent[parent[u]]  # Path compression
            u = parent[u]
        return u

    def union(u, v):
        pu, pv = find(u), find(v)
        if pu == pv:
            return False  # already connected
        parent[pu] = pv
        return True

    # Sort connections by cost
    connections.sort(key=lambda x: x[2])
    edges_used = 0
    total_cost = 0

    for u, v, cost in connections:
        if union(u, v):
            total_cost += cost
            edges_used += 1
            if edges_used == n - 1:
                return total_cost

    # If not all cities connected
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting connections: O(m log m), where m is number of connections.
  - Union-Find operations: For each edge, nearly O(1) amortized with path compression. Total is O(m).
  - Thus, overall: **O(m log m)**.

- **Space Complexity:**  
  - Parent array: O(n).
  - Input storage: O(m).
  - No extra data structures proportional to n\*m.
  - Thus, overall: **O(n + m)**.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the connections are frequently added or removed?  
  *Hint: Consider dynamic connectivity, maybe dynamic MST approaches or link-cut trees.*

- If each connection has a reliability score in addition to the cost, can you optimize for reliability and cost together?  
  *Hint: Multi-objective optimization or constraints in Kruskal's selection.*

- What if cities are dynamic: new cities added or removed?  
  *Hint: How to adjust the MST efficiently for incremental changes?*

### Summary
This problem implements the **Greedy** and **Union-Find/Disjoint Set** coding patterns, specifically using **Kruskal's MST Algorithm**. It's a standard pattern for network connectivity under cost constraints and is widely applicable in network design, clustering, and social network analysis where optimal and efficient connectivity is needed.

### Tags
Union Find(#union-find), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Minimum Spanning Tree(#minimum-spanning-tree)

### Similar Problems
- Minimum Cost to Reach City With Discounts(minimum-cost-to-reach-city-with-discounts) (Medium)