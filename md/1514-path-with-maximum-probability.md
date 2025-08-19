### Leetcode 1514 (Medium): Path with Maximum Probability [Practice](https://leetcode.com/problems/path-with-maximum-probability)

### Description  
Given an undirected weighted graph with n nodes, edges, and a list of edge probabilities (each edge i has probability[i] of success), find the maximum probability to travel from start to end. Path probability is product of probabilities along the path. Return 0 if no such path.

### Examples  
**Example 1:**  
Input: `n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.2], start = 0, end = 2`  
Output: `0.25`  
*Explanation: Best path is 0 → 1 → 2, probability = 0.5 × 0.5 = 0.25; direct 0→2 is only 0.2.*

**Example 2:**  
Input: `n = 3, edges = [[0,1],[1,2],[0,2]], succProb = [0.5,0.5,0.3], start = 0, end = 2`  
Output: `0.3`  
*Explanation: Direct path 0→2 has 0.3, higher than 0.25 via 0→1→2.*

**Example 3:**  
Input: `n = 3, edges = [[0,1]], succProb = [0.5], start = 0, end = 2`  
Output: `0.0`  
*Explanation: Node 2 is unreachable from 0.*

### Thought Process (as if you’re the interviewee)  
This is a graph shortest/maximum path problem, but instead of sum, we multiply probabilities. We want the path from start to end with the maximal product of edge probabilities. This is a variation of Dijkstra's algorithm, but instead of summing, update a node only if prod-prob is increased. Use a max-heap priority queue to always expand the node with highest current probability. For each neighbor, calc new probability (curr × edge_prob), update if higher. 

### Corner cases to consider  
- No path exists from start to end
- Start and end are the same node
- Zero or low probabilities (some edges impossible)
- Disconnected graph

### Solution

```python
import heapq
from collections import defaultdict

def maxProbability(n, edges, succProb, start, end):
    graph = defaultdict(list)
    for (u, v), prob in zip(edges, succProb):
        graph[u].append((v, prob))
        graph[v].append((u, prob))
    max_prob = [0.0] * n
    max_prob[start] = 1.0
    heap = [(-1.0, start)]  # Python minheap: use -prob to simulate maxheap
    while heap:
        curr_prob, node = heapq.heappop(heap)
        curr_prob = -curr_prob
        if node == end:
            return curr_prob
        for neighbor, edge_prob in graph[node]:
            path_prob = curr_prob * edge_prob
            if path_prob > max_prob[neighbor]:
                max_prob[neighbor] = path_prob
                heapq.heappush(heap, (-path_prob, neighbor))
    return 0.0
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × log n), where m is number of edges (for heap operations).
- **Space Complexity:** O(n + m) for graph and heap structures.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you modify for directed graphs?
  *Hint: Only add graph[u].append((v, p)), not v→u.*

- What if you want all paths exceeding a minimum probability?
  *Hint: BFS/DFS, collect those with prod(p) ≥ threshold.*

- How to handle very small probabilities (floating point underflow)?
  *Hint: Use log-probabilities and sum.*

### Summary
This is a classic modification of Dijkstra's technique for max-product path, not sum. The pattern appears in stochastic pathfinding, probability networks, and anywhere max-likelihood or reliability is computed with multiplication along a path.

### Tags
Array(#array), Graph(#graph), Heap (Priority Queue)(#heap-priority-queue), Shortest Path(#shortest-path)

### Similar Problems
- Number of Ways to Arrive at Destination(number-of-ways-to-arrive-at-destination) (Medium)