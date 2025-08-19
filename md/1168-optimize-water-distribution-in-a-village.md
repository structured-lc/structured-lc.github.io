### Leetcode 1168 (Hard): Optimize Water Distribution in a Village [Practice](https://leetcode.com/problems/optimize-water-distribution-in-a-village)

### Description  
We are given `n` houses in a village. For each house, we can either **build a well** in it at a certain cost (given in an array), or **lay pipes** between houses at certain costs (given as a list of connections). Every house must have access to water, either directly or by being connected via pipes to a house that has water. Our task is to **supply water to every house at the minimum possible total cost**, choosing optimally between building wells and laying pipes for each house. Pipes are bidirectional, and we want all houses connected to at least one water source.

### Examples  

**Example 1:**  
Input:  
`n = 3`, `wells = [1, 2, 2]`, `pipes = [[1,2,1],[2,3,1]]`  
Output: `3`  
Explanation.  
- We can build a well at house 1 for cost 1.
- Lay a pipe between house 1 and 2 for cost 1.
- Lay a pipe between house 2 and 3 for cost 1.
- Total cost: 1 + 1 + 1 = 3.

**Example 2:**  
Input:  
`n = 2`, `wells = [2, 1]`, `pipes = [[1,2,1]]`  
Output: `2`  
Explanation.  
- Build a well at house 2 (cheaper, cost 1).
- Lay a pipe between house 1 and 2 for cost 1.
- We do NOT need a well at house 1, because water can be delivered from house 2.
- Total cost: 1 (well) + 1 (pipe) = 2.

**Example 3:**  
Input:  
`n = 3`, `wells = [5, 4, 6]`, `pipes = [[1,2,1],[2,3,2]]`  
Output: `7`  
Explanation.  
- Build a well at house 2 (cost 4).
- Lay a pipe between house 2 and 1 (cost 1), and between house 2 and 3 (cost 2).
- Skip wells for house 1 and 3.
- Total cost: 4 + 1 + 2 = 7.

### Thought Process (as if you’re the interviewee)  
- **Brute-force Idea:** For every house, either build a well or connect to another house through a pipe. Try all combinations — extremely inefficient for large n.
- **Graph Representation:** Think of wells as virtual connections from a “super node” (the water source) to each house, with the cost being the well’s cost. Pipes are edges between houses.
- **Minimum Spanning Tree (MST):** The problem reduces to connecting all houses (nodes) to the water source (virtual node 0) at minimum cost. This fits the MST problem, where wells are edges from node 0 to each house, and pipes are edges between houses.
- **Approach:**  
  - Add all pipes, plus a pipe from the virtual node 0 to each house.  
  - Run Kruskal’s (with Union-Find) or Prim’s algorithm to find the minimum spanning tree.
- **Why MST?:** Because it naturally finds the cheapest set of edges connecting all nodes (houses + virtual water source).

### Corner cases to consider  
- All well costs are less than any pipe (should build a well in every house).
- All pipes are so cheap that using only pipes (plus one well) is optimal.
- Disconnected pipes: some houses have no connection, must build a well there.
- Zero or negative costs (input description: costs ≥ 1, but check code).
- No pipes at all.
- Only one house.

### Solution

```python
def minCostToSupplyWater(n, wells, pipes):
    # Build edges: well edges from virtual node 0 to each house, and all pipes.
    edges = []
    for i, cost in enumerate(wells):
        edges.append((cost, 0, i+1))  # connect virtual node 0 to house i+1

    for pipe in pipes:
        house1, house2, cost = pipe
        edges.append((cost, house1, house2))

    # Sort all edges based on cost
    edges.sort()

    # Union-Find (Disjoint Set) for MST
    parent = [i for i in range(n+1)]  # node 0 for virtual well node
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    def union(x, y):
        root_x = find(x)
        root_y = find(y)
        if root_x == root_y:
            return False
        parent[root_y] = root_x
        return True

    total_cost = 0
    edges_used = 0

    for cost, u, v in edges:
        if union(u, v):
            total_cost += cost
            edges_used += 1
            if edges_used == n:  # All houses are connected (n edges thanks to virtual node)
                break

    return total_cost

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E log E), where E is the total number of edges (`n` wells + given pipes). Sorting edges dominates; union-find operations are nearly constant.
- **Space Complexity:** O(E + n) for edges and parent array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if well costs change dynamically (after each query)?
  *Hint: Can you handle online updates efficiently?*

- What if there are constraints on maximum number of wells or pipes you can use?
  *Hint: Think about adding constraints to the MST approach.*

- How would you modify the approach if houses could run out of water and need to refill at intervals?
  *Hint: Consider repeated MST building or Dijkstra-like propagation.*

### Summary
This problem models as a **minimum spanning tree (MST)** problem with a virtual source node. We use **Kruskal’s algorithm** (or Prim’s) and **union-find** for efficient connection and cycle detection. The reduction of construction/connection problems to MST is a common pattern and frequently appears in infrastructure, clustering, and network design problems.

### Tags
Union Find(#union-find), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Minimum Spanning Tree(#minimum-spanning-tree)

### Similar Problems
