### Leetcode 2065 (Hard): Maximum Path Quality of a Graph [Practice](https://leetcode.com/problems/maximum-path-quality-of-a-graph)

### Description  
Given an undirected graph with nodes labeled 0 to n−1, each node has a value given by values[i]. The edges array gives undirected, weighted edges: each [u, v, t] means you can go between u and v (back and forth) in t seconds. Starting **and ending** at node 0, you can walk any path (possibly revisiting nodes/edges), spending at most maxTime seconds in total. The “quality” of a path is the sum of unique nodes’ values visited (each value counts only once per path). Find the **maximum path quality** of all possible paths starting and ending at node 0 and within maxTime.

### Examples  

**Example 1:**  
Input: `values = [0,32,10,43]`, `edges = [[0,1,10],[1,2,15],[0,3,10]]`, `maxTime = 49`  
Output: `75`  
*Explanation: Path 0 → 1 → 0 → 3 → 0 uses total time 10+10+10+10 = 40 ≤ 49. Unique nodes visited: 0, 1, 3 → quality = 0+32+43 = 75.*

Graph and one optimal path:
```
0(0)---10---1(32)
 |         /
10       15
 |      /
3(43)
```
List: [0, 1, 2, 3]
Path: 0 → 1 → 0 → 3 → 0

**Example 2:**  
Input: `values = [5,10,15,20]`, `edges = [[0,1,10],[1,2,10],[0,3,10]]`, `maxTime = 30`  
Output: `25`  
*Explanation: Path 0 → 3 → 0 has total time 10+10 = 20 ≤ 30. Unique nodes: 0, 3 → quality = 5+20 = 25.*

Tree:
```
    0(5)
   /   \
10    10
 /       \
1(10)   3(20)
 |
10
 |
2(15)
```
List: [5,10,15,20]
Path: 0 → 3 → 0

**Example 3:**  
Input: `values = [1,2,3,4]`, `edges = [[0,1,10],[1,2,11],[2,3,12],[1,3,13]]`, `maxTime = 50`  
Output: `7`  
*Explanation: Path 0 → 1 → 3 → 2 → 1 → 0 uses 10+13+12+11+10 = 56 > 50, so not allowed. Path 0 → 1 → 3 → 1 → 0 uses 10+13+13+10 = 46 ≤ 50. Unique nodes: 0, 1, 3 → quality = 1+2+4 = 7.*

Tree:
```
0(1)---10---1(2)
           /   \
         11    13
        /        \
     2(3)-----12---3(4)
```
Path: 0 → 1 → 3 → 1 → 0

### Thought Process (as if you’re the interviewee)  
- Initial brute force: List all possible paths starting and ending at node 0, calculate the total time, sum unique values, and keep max.  
- Observe constraints: Each node ≤ 4 edges means graph is “narrow”, which lets us explore all paths recursively (DFS/backtracking) within maxTime.  
- For each path, we must not double-count node values. So, record which nodes have been visited uniquely on each path.  
- Since we can revisit nodes/edges, and “quality” only accumulates once per node per path, use a set/visited count.  
- At every node, try all connected neighbors, but only proceed if total time so far + edge time ≤ maxTime.  
- Every time we reach node 0 (could be the start or after some cycles), check if this path’s quality is a new max.  
- Backtracking instead of DP: there’s too many possible “states” (node, time, mask), but brute DFS is feasible due to small degree.
- Optimization: Prune paths early if exceeding maxTime.  
- Final approach: DFS with backtracking, tracking unique nodes on path, and current total time. At each visit to node 0 (even if looping), check the quality.

### Corner cases to consider  
- Only one node (n=1), edges empty (only path is ).
- Edge time(s) larger than maxTime, cannot travel from 0.
- Can revisit nodes many times—should not retally value.
- Cycles in the graph.
- edge cases: zero values, all values same, maxTime very small (can’t move).
- maxTime much larger than necessary (don’t double count node values).
- Graph disconnected (edges that don’t involve 0).

### Solution

```python
def maximalPathQuality(values, edges, maxTime):
    from collections import defaultdict

    # Build graph: node -> [(neighbor, time)]
    graph = defaultdict(list)
    for u, v, t in edges:
        graph[u].append((v, t))
        graph[v].append((u, t))

    n = len(values)
    result = [values[0]]  # max quality so far

    def dfs(node, time_so_far, visited, quality):
        # Whenever we are at node 0, update result
        if node == 0:
            result[0] = max(result[0], quality)
        for neighbor, t in graph[node]:
            new_time = time_so_far + t
            if new_time > maxTime:
                continue  # Prune paths exceeding maxTime
            # Count neighbor's value only if first visit in this path
            add_value = 0
            newly_visited = False
            if visited[neighbor] == 0:
                add_value = values[neighbor]
                newly_visited = True
            visited[neighbor] += 1
            dfs(neighbor, new_time, visited, quality + add_value)
            visited[neighbor] -= 1  # Backtrack

    # visited[node]: number of times visited on the current path
    visited = [0]*n
    visited[0] = 1
    dfs(0, 0, visited, values[0])
    return result[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × 3^N) in the worst theoretical case, since each node has at most 4 edges and n is small, but in practice much less due to pruning with maxTime and unique visit masking.
- **Space Complexity:** O(N + E) for the graph adjacency, O(N) recursion stack, and O(N) visited array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if each node could have many (>4) edges?
  *Hint: Discuss how pruning, memoization, or DP/state compression might be needed as DFS would become infeasible for dense graphs.*

- How would you return the actual path, not just quality?
  *Hint: Track path list during DFS, and record path when updating result.*

- How would you handle directed or weighted graphs with negative node values?
  *Hint: Describe modeling for directed edges, and the effect of negatives on path scoring and potential cycles.*

### Summary
This problem is an example of **DFS + backtracking** over all possible loop paths respecting a time constraint, while gathering node set properties along the way. The heavy constraint (≤4 edges per node) lets us use simple recursion with pruning—no need for DP or heavy optimization. This template is common in “find max/min cost along all paths under constraint” graph problems where the number of possible states (by visit history & time) is small. Variants show up in cycle-finding, state-enumeration, and resource-limited pathing questions.