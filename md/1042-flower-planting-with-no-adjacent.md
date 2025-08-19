### Leetcode 1042 (Medium): Flower Planting With No Adjacent [Practice](https://leetcode.com/problems/flower-planting-with-no-adjacent)

### Description  
We are given `n` **gardens**, each represented by an integer from 1 to n. Each garden must be assigned **one of four types of flowers** (1, 2, 3, 4). Gardens are connected by bidirectional **paths**, where each path connects exactly two gardens, and no garden has more than 3 paths. The requirement is: **no two adjacent gardens (connected by a path) may have the same flower type**. Our goal is to assign a flower type to each garden such that this condition is met. It's guaranteed that at least one valid assignment exists.

### Examples  

**Example 1:**  
Input:  
`n = 3`, `paths = [[1,2],[2,3],[3,1]]`  
Output:  
`[1,2,3]`  
Explanation:  
Assign flower 1 to Garden 1, 2 to Garden 2, 3 to Garden 3. Each connected pair has different types (e.g. Gardens 1 and 2: 1 vs 2, etc.).

**Example 2:**  
Input:  
`n = 4`, `paths = [[1,2],[3,4]]`  
Output:  
`[1,2,1,2]`  
Explanation:  
Gardens 1–2 and 3–4 are connected, so their types differ. 1↔2, 3↔4. Any assignment with different types for each pair is valid.

**Example 3:**  
Input:  
`n = 4`, `paths = []`  
Output:  
`[1,1,1,1]`  
Explanation:  
No paths, so all gardens can be assigned the same type (for instance, all type 1).

### Thought Process (as if you’re the interviewee)  
First, this problem is essentially a **graph coloring** problem: assign one of k colors (flowers) to each node (garden) so no two connected nodes have the same color. Fortunately, since each garden has at most 3 connections and we have 4 flower types, there will always be a color available for each garden (this is why an answer is guaranteed).  
- **Brute-force:** Try all flower assignments for each garden and check if the constraints are met (like backtracking). However, with n up to 10⁴, this is computationally infeasible.
- **Efficient approach:** 
  - Build an adjacency list to represent the gardens and their connections.
  - For each garden, look at its neighbors, note the flowers they’ve used.
  - Assign to the current garden the lowest-numbered flower that is not being used by its neighbors.
This greedy coloring approach works, because maximum degree is 3 and there are 4 flower types, so there's always at least one available.

### Corner cases to consider  
- No paths: all gardens are isolated.  
- One garden only (n=1).  
- Multiple gardens but all disconnected.  
- Paths may form cycles, but degree ≤ 3.
- Paths may connect the same two gardens more than once (unlikely, but if so, handle duplicates).
- The returned order must correspond to garden 1, 2, ..., n.

### Solution

```python
def gardenNoAdj(n, paths):
    # Build adjacency list for the gardens
    adj = [[] for _ in range(n)]
    for x, y in paths:
        adj[x-1].append(y-1)
        adj[y-1].append(x-1)

    # To store the result flower for each garden
    res = [0] * n

    for i in range(n):
        # Collect the flower types of the neighbors
        used = set(res[nei] for nei in adj[i])
        # Assign the lowest available flower type (1..4) not used by neighbors
        for flower in range(1, 5):
            if flower not in used:
                res[i] = flower
                break

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m),  
  where n is the number of gardens, m the number of paths.  
  - We traverse all gardens and for each, check up to 3 neighbors (degree ≤ 3).
- **Space Complexity:** O(n + m),  
  for the adjacency list and the flower assignments array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there were only 3 flower types allowed?  
  *Hint: Maximum degree is 3, so this may not guarantee a solution anymore (triangle/cycle).*

- How would the algorithm change if the maximum number of neighbors was unbounded?  
  *Hint: Greedy coloring may fail; need proper k-coloring (graph coloring is NP-complete in general).*

- How to adapt the solution if some gardens must use a specific flower type?  
  *Hint: Treat those gardens as pre-colored and avoid assigning their type to neighbors.*

### Summary
This is a **greedy graph coloring** problem, made tractable by the constraint that each node has degree ≤ 3 and 4 available flower types. The solution iterates through each garden, greedily picking the lowest flower type not used by any neighbor. This greedy pattern is common for scheduling, coloring, and assignment problems where constraints assure a solution (such as low-degree graphs with k colors).

### Tags
Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Graph(#graph)

### Similar Problems
