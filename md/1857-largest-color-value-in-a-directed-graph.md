### Leetcode 1857 (Hard): Largest Color Value in a Directed Graph [Practice](https://leetcode.com/problems/largest-color-value-in-a-directed-graph)

### Description  
Given a **directed graph** with n nodes (labeled 0 to n-1) where each node has a color (a lowercase English letter), find the maximum number of times any single color appears on a path through the graph. Paths must follow directed edges; cycles are not allowed (if a cycle exists, return -1). The color value of a path is the maximum count of any one color along that path.

### Examples  

**Example 1:**  
Input: `colors = "abaca", edges = [[0,1],[0,2],[2,3],[3,4]]`  
Output: `3`  
*Explanation: The path 0 → 2 → 3 → 4 contains 'a' (node 0, 2, 4) three times, which is the maximum color count for a path.*

**Example 2:**  
Input: `colors = "a", edges = [[0,0]]`  
Output: `-1`  
*Explanation: The only edge forms a cycle (0 → 0). Cycle detected, so output is -1.*

**Example 3:**  
Input: `colors = "abc", edges = [[0,1],[1,2]]`  
Output: `1`  
*Explanation: Any valid path visits each color only once, so the maximum is 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try every path, count the most common color along each—prohibitively slow (number of paths grows exponentially with graph size).
- **Observation:** Since cycles must return -1, cycle detection is required.
- **Optimization:** Use **topological sorting** (Kahn’s algorithm) to process nodes in dependency order and ensure no cycles. For each node, keep track of a color count vector for the most frequent occurrence along any path reaching that node.
- **Implementation sketch:**  
    - For each color, maintain a count for each node representing the max count of that color on any path to that node so far.
    - As you move through the graph (in topological order), for each neighbor, update its color counts using the parent’s color count.
    - At each node, its color count for its own color increments by 1.
    - If processing finishes fewer than n nodes (cycle detected), return -1.
- **Trade-offs:** This DP on DAG approach offers O(n × 26 + m) time and space, where 26 is for all lowercase letters.

### Corner cases to consider  
- Single node, no edges.
- Graph with self-loop or cycles.
- Disconnected nodes.
- Multiple paths converging to the same node with different color frequencies.
- Multiple nodes with the same color.
- All nodes have unique colors.

### Solution

```python
def largestPathValue(colors, edges):
    n = len(colors)
    # Build adjacency list and in-degree array
    graph = [[] for _ in range(n)]
    indegree = [0] * n
    for u, v in edges:
        graph[u].append(v)
        indegree[v] += 1

    # DP table, dp[node][color] = max count of color seen to this node
    dp = [[0]*26 for _ in range(n)]
    for i in range(n):
        dp[i][ord(colors[i]) - ord('a')] = 1

    from collections import deque
    queue = deque([i for i in range(n) if indegree[i]==0])
    seen = 0
    answer = 0

    while queue:
        node = queue.popleft()
        seen += 1
        for nei in graph[node]:
            for c in range(26):
                # If neighbor has color c, take max between current and 
                # path through node
                count = dp[node][c] + (1 if c == (ord(colors[nei]) - ord('a')) else 0)
                if count > dp[nei][c]:
                    dp[nei][c] = count
            indegree[nei] -= 1
            if indegree[nei]==0:
                queue.append(nei)
        answer = max(answer, max(dp[node]))

    # If not all nodes seen, cycle exists
    return answer if seen==n else -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* 26 + m) where n is the number of nodes and m is the number of edges (each node processes all 26 colors, each edge is checked once).
- **Space Complexity:** O(n \* 26 + m) for the color count DP table and the graph structure.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of colors could be up to 10⁹?
  *Hint: Can you map colors to indices and only store what you see, e.g., use a hash map for color counts?*
  
- How would you process the result if the graph is actually undirected?
  *Hint: Would cycle detection or DP approach fundamentally change?*

- Can you optimize for sparse color usage in huge graphs?
  *Hint: Use defaultdict or similar to avoid always allocating 26 slots per node.*

### Summary
This problem combines **cycle detection**, **topological sorting**, and **dynamic programming on DAGs**. The key DP idea is to propagate color counts along paths. This DP pattern—tracking and merging state across a topological order for nodes—is common in graph DP problems such as longest/shortest path in DAGs, and multi-source propagations.

### Tags
Hash Table(#hash-table), Dynamic Programming(#dynamic-programming), Graph(#graph), Topological Sort(#topological-sort), Memoization(#memoization), Counting(#counting)

### Similar Problems
