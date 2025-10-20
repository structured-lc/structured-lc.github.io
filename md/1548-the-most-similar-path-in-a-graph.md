### Leetcode 1548 (Hard): The Most Similar Path in a Graph [Practice](https://leetcode.com/problems/the-most-similar-path-in-a-graph)

### Description  
Given a graph with `n` cities labeled from 0 to n-1 and a list of edges (bidirectional roads), as well as a `targetPath` sequence of cities, find the **most similar path** in the graph to this sequence. The path must be of the same length as `targetPath`, must be a valid walk through the graph (adjacent cities must have an edge), and similarity is defined as the number of matching cities at each step. Find a path with **minimum edit distance** (minimum number of non-matches).

### Examples  

**Example 1:**  
Input: `n = 5`, `roads = [[0,2],[0,3],[1,2],[1,3],[1,4],[2,4]]`, `targetPath = [2,4,3,0]`  
Output: `[2,4,3,0]`  
*Explanation: The path exactly matches targetPath—ideal similarity (0 mismatch).*

**Example 2:**  
Input: `n = 4`, `roads = [[1,0],[2,0],[3,1],[3,2]]`, `targetPath = [0,3,2,1,0]`  
Output: `[0,1,2,1,0]`  
*Explanation: A path that gets as similar to targetPath as possible: at each step, picks a connected city closest to the request.*

**Example 3:**  
Input: `n = 6`, `roads = [[0,1],[1,2],[2,3],[4,2],[5,3]]`, `targetPath = [2,0,1,3]`  
Output: `[2,0,1,3]`  
*Explanation: The ideal output matches targetPath in all positions (0 replacements needed).*

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to generate all paths of length equal to targetPath, starting from any city. But the number of possible paths is huge (n^L where L is targetPath length).

Optimize using **dynamic programming**:
- For each position (step) in targetPath and each city, store the minimum edit distance to reach that city at this step.
- dp[step][city] = minimum edit distance for step and city
- For each next step, try all neighbors to transition into and update dp accordingly.
- Finally, pick the city at the last step with the smallest edit distance and reconstruct the path by backtracking predecessor pointers.

### Corner cases to consider  
- Disconnected cities (may need to start from multiple candidates)
- All cities are connected in a line
- Graph is a star or has cycles
- targetPath contains cities outside the actual city indices (input validation)
- Multiple optimal answers (pick any)
- targetPath of length 1

### Solution

```python
from collections import defaultdict

def mostSimilar(n, roads, targetPath):
    m = len(targetPath)
    graph = [[] for _ in range(n)]
    for u, v in roads:
        graph[u].append(v)
        graph[v].append(u)

    # dp[i][v]: min edit distance to reach city v at step i
    dp = [[float('inf')] * n for _ in range(m)]
    parent = [[-1] * n for _ in range(m)]
    for v in range(n):
        dp[0][v] = (0 if v == targetPath[0] else 1)

    for i in range(1, m):
        for v in range(n):
            for u in graph[v]:
                cost = dp[i-1][u] + (0 if v == targetPath[i] else 1)
                if cost < dp[i][v]:
                    dp[i][v] = cost
                    parent[i][v] = u
    # Find city with minimal edit distance at final step
    last = min(range(n), key=lambda v: dp[m-1][v])
    # Reconstruct path
    path = [last]
    for i in range(m-1, 0, -1):
        last = parent[i][last]
        path.append(last)
    return path[::-1]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n × d), where d is the maximum degree in the graph (since inner loops over neighbors), m = targetPath length, n = number of cities.
- **Space Complexity:** O(m × n) for dp and parent arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the graph is directed (one-way roads)?  
  *Hint: Build the graph without adding reverse edges.*

- What if ties in edit distance? (Multiple equally similar paths)  
  *Hint: Any valid path is acceptable.*

- What if transitions (edges) have weights/costs?  
  *Hint: Use edge weights as cost in DP state, adjust recurrence to add edge cost.*

### Summary
Uses classic DP over sequence and graph search, also called **Viterbi algorithm** pattern (DP + backtracking for path). Applies in sequence alignment, speech recognition, and path similarity problems.


### Flashcard
Employ dynamic programming to find the most similar path in a graph by minimizing edit distances at each step.

### Tags
Dynamic Programming(#dynamic-programming), Graph(#graph)

### Similar Problems
