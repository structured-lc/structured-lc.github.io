### Leetcode 2077 (Medium): Paths in Maze That Lead to Same Room [Practice](https://leetcode.com/problems/paths-in-maze-that-lead-to-same-room)

### Description  
You’re given a maze with **n rooms** (numbered 1 to n), connected with undirected **corridors**. Each corridor connects two rooms directly. All corridors are two-way.  
You need to calculate the maze's **confusion score**, defined as the **number of different simple cycles of length 3** (i.e., distinct triangles: 3 rooms all connected to each other).  
Cycles are considered different if they contain at least one different room. For example, 1→2→3→1 is a valid cycle, but 1→2→3→4 or 1→2→3→2→1 are not valid.

### Examples  

**Example 1:**  
Input: `n = 4, corridors = [[1,2],[2,3],[3,1],[2,4],[1,4]]`  
Output: `2`  
*Explanation: The two triangles are (1,2,3) and (1,2,4).*

**Example 2:**  
Input: `n = 3, corridors = [[1,2],[2,3],[3,1]]`  
Output: `1`  
*Explanation: Only one triangle: (1,2,3).*

**Example 3:**  
Input: `n = 4, corridors = [[1,2],[2,3],[3,4]]`  
Output: `0`  
*Explanation: No triangles are formed, since room 1 is not directly connected to room 3 or 4.*

### Thought Process (as if you’re the interviewee)  
- **Initial approach:**  
  The brute-force way is to check every triple of rooms (a, b, c) and see if all three corridors (a,b), (b,c), and (c,a) exist.  
  For each group of three rooms, check all three edges.  
  This is O(n³).

- **Optimization:**  
  Since triangles are defined by three connected nodes, we can build a graph as a dictionary of sets (adjacency list).  
  For each edge (u, v), look for a third node w such that both (u, w) and (v, w) also exist—the intersection of the neighbors of u and v gives these nodes.  
  For each such triangle, if we count it once per edge, it gets counted three times overall, so we need to divide the result by 3 at the end.

- **Why this approach?**  
  - Building the adjacency list is O(E).
  - For each corridor (u,v), finding the intersection is (average) O(small degree).
  - Total complexity is O(E × d), where d is average degree, which is much faster than brute force for sparse graphs.

### Corner cases to consider  
- No cycles possible (fewer than 3 rooms, or no triangles).
- Duplicate corridors in input—should only count unique triangles.
- Multiple triangles sharing some edges/rooms.
- Corridors forming a complete graph: count all triangles.
- Disconnected rooms.
- Corridors are undirected: ensure that both [u,v] and [v,u] are treated as the same.

### Solution

```python
def numberOfPaths(n, corridors):
    # Build adjacency sets for each room
    graph = [set() for _ in range(n + 1)]  # 1-based
    for u, v in corridors:
        graph[u].add(v)
        graph[v].add(u)
        
    ans = 0
    # Loop through each corridor
    for u, v in corridors:
        # Find common neighbors (nodes both u and v are connected to)
        # These nodes, together with u and v, form triangles
        common = graph[u].intersection(graph[v])
        ans += len(common)
    
    # Each triangle is counted 3 times (once per side), so divide by 3
    return ans // 3
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E × d)  
  - Where E is number of corridors, d is average degree (since for each edge, set intersection of two sets of neighbors is O(min(deg(u), deg(v)))).
  - In the worst case (complete graph), could be O(n³) but typically much better for sparse graphs.
- **Space Complexity:** O(n²) in the worst case (if the maze is fully connected), due to the adjacency matrix/sets; O(n + E) on average.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want the confusion score for cycles of length k instead of 3?  
  *Hint: Think about subgraph enumeration, and how cliques/cycles generalize. For k=4, look for 4-cliques or 4-length cycles.*

- How would you handle repeated queries for different corridor modifications efficiently?  
  *Hint: Consider dynamic connectivity or maintaining triangles incrementally as the graph changes.*

- Can you return all the differing triangles (not just the count)?  
  *Hint: Instead of just adding to the count, store the sorted tuple (a,b,c) each time you find a triangle.*

### Summary
This problem is a classic example of **counting triangles in an undirected graph**, which is a common subproblem in social network analysis and graph theory.  
The efficient approach is to use adjacency sets and neighbor intersection, which avoids the brute force O(n³) method.  
The core pattern here is graph traversal with neighbor set intersection, a useful technique for detecting small cliques or cycles in graphs.  
This pattern generalizes to k-clique counting (counting complete subgraphs of size k) and is a core idea in network motif analysis and cycle detection.


### Flashcard
For each edge (u, v), count common neighbors w (i.e., intersection of adj[u] and adj[v]) to efficiently find all triangles (cycles of length 3).

### Tags
Graph(#graph)

### Similar Problems
- Number of Connected Components in an Undirected Graph(number-of-connected-components-in-an-undirected-graph) (Medium)
- Reachable Nodes In Subdivided Graph(reachable-nodes-in-subdivided-graph) (Hard)
- Distance to a Cycle in Undirected Graph(distance-to-a-cycle-in-undirected-graph) (Hard)
- Find if Path Exists in Graph(find-if-path-exists-in-graph) (Easy)