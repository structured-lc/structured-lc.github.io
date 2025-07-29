### Leetcode 2492 (Medium): Minimum Score of a Path Between Two Cities [Practice](https://leetcode.com/problems/minimum-score-of-a-path-between-two-cities)

### Description  
Given n cities numbered 1 through n and a list of bidirectional roads, each with a positive distance, you need to find the minimum "score" of any path from city 1 to city n. Here, a path score is defined as the smallest distance of any edge along that path. The path may revisit cities or roads multiple times. There is guaranteed to be at least one path from city 1 to city n.

### Examples  

**Example 1:**  
Input: `n = 4, roads = [[1,2,9],[2,3,6],[2,4,5],[1,4,7]]`  
Output: `5`  
*Explanation: One optimal path is 1 → 2 → 4. The score is min(9, 5) = 5. You can also go 1 → 4 directly (score 7), but 5 is smaller. Paths like 1 → 2 → 3 → 2 → 4 would yield min(9, 6, 9, 5) = 5.*

**Example 2:**  
Input: `n = 3, roads = [[1,2,2],[2,3,4],[1,3,3]]`  
Output: `2`  
*Explanation: One path 1 → 2 → 3 has score min(2, 4) = 2. The direct path 1 → 3 has score 3. The minimum overall is 2.*

**Example 3:**  
Input: `n = 3, roads = [[1,2,2],[2,3,2],[1,3,2]]`  
Output: `2`  
*Explanation: All paths from 1 to 3 have only roads of length 2, so the minimum score is 2.*

### Thought Process (as if you’re the interviewee)  
- Brute-force:  
  A naive way is to enumerate all possible paths from 1 to n, compute their scores (the smallest weight along the path), and return the minimum among them. However, this approach is infeasible, as the number of paths can be exponential.
- Optimization:  
  Notice that you can pass through cities and roads multiple times, and only the *minimum edge on some path from 1 to n* matters. We don’t care about the path shape—just about finding the lowest edge reachable when starting from 1 that is in the connected component containing n.
- Key Insight:  
  Since the path can revisit nodes and roads, the minimum edge in the entire connected component containing both 1 and n is the answer.
- Approach:  
  1. Use BFS or DFS from node 1 to mark all reachable nodes.
  2. For every edge connecting two nodes in this component, keep track of the smallest weight.
  3. Return this minimum weight.
- Trade-off:  
  This is efficient (linear in the number of nodes and edges) and easy to implement with DFS/BFS without cycles causing issues, because cycles do not introduce new minimums.

### Corner cases to consider  
- Only one road between 1 and n.
- Multiple roads between 1 and n, with duplicate weights.
- Roads form cycles (but the answer remains the smallest edge in the reachable component).
- Weights are all equal.
- Very large/small distances.
- Disconnected cities (though input guarantees path exists).
- Smallest possible component: n = 2, one road.

### Solution

```python
def minScore(n, roads):
    # Build adjacency list
    from collections import defaultdict, deque

    graph = defaultdict(list)
    for u, v, w in roads:
        graph[u].append((v, w))
        graph[v].append((u, w))

    # BFS to find all nodes in the connected component containing 1
    visited = set()
    q = deque([1])
    visited.add(1)

    # Track minimum road weight seen in the component
    min_score = float('inf')

    while q:
        curr = q.popleft()
        for neighbor, weight in graph[curr]:
            # Always update the minimum
            if weight < min_score:
                min_score = weight
            # Visit this neighbor if not seen before
            if neighbor not in visited:
                visited.add(neighbor)
                q.append(neighbor)

    return min_score
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(V + E), where V = number of cities and E = number of roads.  
  - Building the adjacency list takes O(E).
  - BFS/DFS traverses each city and edge at most once.

- **Space Complexity:**  
  O(V + E), for the adjacency list and the visited set.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle dynamic road closures or additions efficiently?  
  *Hint: Think about Disjoint Set Union (DSU) or dynamic connectivity data structures.*

- What if each edge had direction, and maybe all paths from 1 to n are not guaranteed?  
  *Hint: Modify traversal, and check for strong connectivity/reachability.*

- How to report the actual path(s) achieving that minimum score, not just the value?  
  *Hint: Store parent information during traversal or backtrack after finding the minimum edge.*

### Summary
This problem exemplifies a "minimum edge in a component" pattern; a variation on connected component identification using BFS/DFS, where path traversals may revisit both nodes and edges. Such logic—tracing reachability, and aggregating node or edge data—applies to network reliability, bottleneck analysis, and "maximum bandwidth path" variations in graphs.