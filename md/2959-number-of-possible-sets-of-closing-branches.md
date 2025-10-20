### Leetcode 2959 (Hard): Number of Possible Sets of Closing Branches [Practice](https://leetcode.com/problems/number-of-possible-sets-of-closing-branches)

### Description  
You are given a company with **n** branches, connected by a network of roads, where each road has a certain length. All the branches are initially connected, meaning it's possible to travel between any two of them (the graph is connected). The company wants to possibly **close some branches** to reduce expenses, but after closing a branch, both the branch and all roads connected to it will be gone. For any chosen set of remaining (open) branches, it must be true that:
- **Any two remaining branches must be reachable from each other,**
- **The distance between any two remaining branches must be at most** `maxDistance`.
You must find **how many different sets of branches can be kept open** (including the empty set), such that the above criteria are satisfied.

### Examples  

**Example 1:**  
Input: `n = 3, maxDistance = 10, roads = [[0,1,10],[1,2,10]]`  
Output: `2`  
*Explanation: The only valid sets are: keep all ([0,1,2]) since all pairwise shortest distances are 20 or less. If you keep only a single branch (i.e., any of , [1], or [2]), the graph is trivially connected. Keeping only [1,2] leaves path length 10, which is ≤10. So sets: [1,2,3], [1,2], [2,3], [1,3], [1], [2], [3]. But the only ones satisfying maxDistance=10 between all remaining branches are the full set and any single node, so 2 ways.*

**Example 2:**  
Input: `n = 2, maxDistance = 100, roads = [[0,1,20]]`  
Output: `4`  
*Explanation: Possible sets: [], , [1], [0,1]. All sets are valid: singletons and empty set are always fine; [0,1] has only one path of length 20 < 100.*

**Example 3:**  
Input: `n = 1, maxDistance = 10, roads = []`  
Output: `2`  
*Explanation: Options: close the only branch (empty set), or keep it open (). Both are valid; so 2 possible sets.*

### Thought Process (as if you’re the interviewee)  
Let's break down the approach step by step:

- **Brute Force:**  
  Since n ≤ 10, we can try **all subsets** of nodes (there are 2ⁿ possible sets). For each subset:
  - If the set is empty: always valid.
  - If the set is non-empty: 
    - The nodes must be a connected component.
    - The **shortest path** between any pair must be ≤ maxDistance.

- **For each subset:**  
  - Build the induced subgraph.
  - Use BFS/DFS to check it's connected.
  - Use Floyd-Warshall (since n is small) to compute shortest paths between every pair. Check that all are ≤ maxDistance.

- **Why this works:**  
  n is small (≤10), so 2¹⁰ = 1024. For each set, doing n³ work is acceptable.

**Optimizations / Trade-offs:**  
- Only check connected subsets (early reject).
- Floyd-Warshall after each subset extraction (O(n³) per subset, but it's fine for small n).
- Using bitmasking to enumerate all subsets/state.

This is a classic "brute-force all induced subgraphs since n is small" + "for each, check connectivity and path constraint".

### Corner cases to consider  
- n=1: single branch, no edges.
- Empty subset (no open branches): always valid.
- Sets where branches are singleton nodes.
- Multiple disconnected roads, or after some closure leads to disconnect.
- Large maxDistance versus small maxDistance.
- Roads with high weights, making direct connection not possible for the subset.

### Solution

```python
def numberOfSets(n, maxDistance, roads):
    # Adjacency matrix for the original graph, init with INF
    INF = 10**9
    adj = [[INF] * n for _ in range(n)]
    for i in range(n):
        adj[i][i] = 0
    for u, v, w in roads:
        adj[u][v] = min(adj[u][v], w)
        adj[v][u] = min(adj[v][u], w)

    total = 0
    # Try all 2^n subsets (use bitmask)
    for mask in range(1 << n):
        # Get list of present (not closed) branches in this subset
        present = [i for i in range(n) if (mask & (1 << i))]
        # If empty set (no branches), always valid
        if not present:
            total += 1
            continue

        # Build induced graph: only nodes in 'present', with their adjacents
        # Create distances initialized to INF
        dist = [[INF]*n for _ in range(n)]
        for i in present:
            dist[i][i] = 0
        for i in range(n):
            for j in range(n):
                if i in present and j in present:
                    dist[i][j] = adj[i][j]

        # Floyd-Warshall: for all-pairs shortest path on this induced subgraph
        for k in present:
            for i in present:
                for j in present:
                    if dist[i][j] > dist[i][k] + dist[k][j]:
                        dist[i][j] = dist[i][k] + dist[k][j]

        # Check if all present nodes are connected (dist < INF)
        is_connected = True
        for i in present:
            for j in present:
                if dist[i][j] == INF:
                    is_connected = False
                    break
            if not is_connected:
                break
        if not is_connected:
            continue

        # Check if all pairwise dists ≤ maxDistance
        ok = True
        for i in present:
            for j in present:
                if dist[i][j] > maxDistance:
                    ok = False
                    break
            if not ok:
                break

        if ok:
            total += 1

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ⁿ × n³)  
  - There are 2ⁿ subsets.
  - For each subset, Floyd-Warshall takes O(n³) for all-pairs shortest paths.
- **Space Complexity:** O(n²)
  - For adjacency matrices and for the induced subgraph per subset.
  - Negligible extra for output, since constraints are small.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n were much larger, say 20 or 30?  
  *Hint: Can you avoid brute force? Are there graph classes where a more efficient check is possible?*

- Can you optimize to avoid recomputing shortest paths for similar subsets?  
  *Hint: Think about DP on subsets or pruning duplicates.*

- How would you handle the case where edges can be dynamically removed and you must recheck the result efficiently?  
  *Hint: Union-Find or dynamic connectivity and dynamic shortest path?*

### Summary
The main insight is that **for very small input size (n ≤ 10), exhaustive subset enumeration is feasible**. This pattern—enumerate all subsets with pruning conditions and use all-pairs shortest paths for validation—appears in many problems involving subgraphs, masks, or small graphs. The solution mixes bitmask generation, Floyd-Warshall, and connectivity via explicit pairwise checks—a combination often used in bitmask DP and brute-force graph enumeration.


### Flashcard
Enumerate all subsets of nodes, check connectivity and max distance between any pair using BFS/DFS and Floyd-Warshall.

### Tags
Bit Manipulation(#bit-manipulation), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Enumeration(#enumeration), Shortest Path(#shortest-path)

### Similar Problems
