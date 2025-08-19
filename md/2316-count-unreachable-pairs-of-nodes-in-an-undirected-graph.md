### Leetcode 2316 (Medium): Count Unreachable Pairs of Nodes in an Undirected Graph [Practice](https://leetcode.com/problems/count-unreachable-pairs-of-nodes-in-an-undirected-graph)

### Description  
Given an undirected graph with `n` nodes labeled from `0` to `n-1` and a list of edges, count the number of **unordered pairs** of nodes \((u, v)\) where \(u \ne v\) and there is **no path** connecting `u` and `v` in the graph.  
Put another way: For every pair of distinct nodes, if you cannot travel from one to the other using the provided edges, that pair should count towards the answer.

### Examples  

**Example 1:**  
Input: `n = 3`, `edges = [[0,1],[0,2]]`  
Output: `0`  
*Explanation: There is a path between every pair of nodes (the graph is connected), so there are no unreachable pairs.*

**Example 2:**  
Input: `n = 7`, `edges = [[0,2],[0,5],[2,4],[1,6],[5,4]]`  
Output: `14`  
*Explanation: The graph has two components: [0,2,4,5] and [1,6] while node 3 is on its own.  
 - One component has 4 nodes: [0,2,4,5]  
 - Second component: [1,6] (2 nodes)  
 - Third component: [3] (1 node)  
Unreachable pairs:  
- Between [0,2,4,5] and [1,6]: 4 × 2 = 8  
- Between [0,2,4,5] and [3]: 4 × 1 = 4  
- Between [1,6] and [3]: 2 × 1 = 2  
Total: 8 + 4 + 2 = 14.*

**Example 3:**  
Input: `n = 5`, `edges = []`  
Output: `10`  
*Explanation: Each node is its own component (no edges), total pairs: 5 nodes ⇒ 5 × 4 / 2 = 10.*

### Thought Process (as if you’re the interviewee)  
- **Brute force**: For each pair of nodes, check if there is a path between them (using BFS/DFS). This would take O(n²) time for n nodes and is too slow for large graphs.
- **Observation**: If we can find all the connected components, then:
    - All nodes inside a component can reach each other.
    - *Unreachable pairs* are formed by choosing one node from component *A* and one node from component *B* (A ≠ B).
- **Optimized approach**:
    1. **Find connected components**: Use DFS/BFS to get the size of each component.
    2. **Count unreachable pairs**: Suppose component sizes are s₁, s₂, ..., sₖ.  
        For each component of size sᵢ, number of unreachable pairs involving sᵢ is sᵢ × (n - sᵢ).  
        But this counts each pair twice, so sum sᵢ × (n - sᵢ) for all i, then divide by 2 **or** use a running prefix approach.
    3. Choose DFS for clarity (or Union-Find/DSU for performance).
- **Pythonic pitfall**: Avoid using sets/dicts for union-find if not allowed; stick to basic data structures.

### Corner cases to consider  
- No edges (every node is its own component)
- Graph is already fully connected (no unreachable pairs)
- One large component and several singleton nodes
- Duplicate edges, self-loops (should be ignored)
- Empty graph (n = 0)

### Solution

```python
def countPairs(n, edges):
    # Build adjacency list for the undirected graph
    graph = [[] for _ in range(n)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    # Track visited nodes
    visited = [False] * n

    # Helper: DFS to compute size of component starting from node u
    def dfs(u):
        stack = [u]
        count = 0
        while stack:
            node = stack.pop()
            if not visited[node]:
                visited[node] = True
                count += 1
                for neighbor in graph[node]:
                    if not visited[neighbor]:
                        stack.append(neighbor)
        return count

    # Find all component sizes
    component_sizes = []
    for i in range(n):
        if not visited[i]:
            size = dfs(i)
            component_sizes.append(size)

    # Count unreachable pairs: for each component size, pairs with all the rest
    total_pairs = 0
    sum_so_far = 0
    for size in component_sizes:
        total_pairs += sum_so_far * size
        sum_so_far += size

    return total_pairs
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m), where n is the number of nodes and m is the number of edges. This is due to DFS/BFS traversing each node and edge once.
- **Space Complexity:** O(n + m) for adjacency list and visited array, and for stack (component_sizes is at most n entries).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a **dynamic graph** where edges are added or removed?
  *Hint: Use Union-Find data structures with union by rank and path compression for edge updates.*
- Suppose **edges can be added** at any time, how quickly can you report the new answer?
  *Hint: Efficient dynamic connectivity structures.*
- What if the graph is **directed**? How would your answer change?
  *Hint: Strongly connected components are key—need Kosaraju/Tarjan’s algorithms.*


### Summary
This problem leverages a **connected components** pattern, commonly solved via DFS/BFS or Union-Find/Disjoint Set Union (DSU). The insight is to count unreachable pairs by treating each component as a “group” and counting inter-group pairs combinatorially. This approach is efficient and widely applicable to questions on cluster connectivity, counting pairs in split groups, and network reliability analysis.

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Graph(#graph)

### Similar Problems
- Number of Islands(number-of-islands) (Medium)