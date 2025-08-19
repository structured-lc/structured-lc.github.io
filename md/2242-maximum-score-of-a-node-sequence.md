### Leetcode 2242 (Hard): Maximum Score of a Node Sequence [Practice](https://leetcode.com/problems/maximum-score-of-a-node-sequence)

### Description  
Given an undirected graph with **n** nodes (numbered 0 to n-1), each node has a score. You're also given a set of undirected **edges**.  
Find the **maximum possible score** of any valid sequence of **exactly four nodes** (a, b, c, d), such that each consecutive pair in the sequence is connected by an edge, **no node appears more than once**, and the **score** is simply the sum of the four nodes' scores.  
If no such sequence exists, return -1.

### Examples  

**Example 1:**  
Input:  
scores = `[5,2,9,8,4]`,  
edges = `[[0,1],[0,2],[0,3],[1,2],[1,3],[2,3],[2,4]]`  
Output: `24`  
*Explanation: One valid sequence is 1-2-3-0. The score is 2+9+8+5=24.*

**Example 2:**  
Input:  
scores = `[9,20,6,4,11,12]`,  
edges = `[[0,3],[5,3],[2,4],[1,3]]`  
Output: `-1`  
*Explanation: There is no sequence of four nodes where each consecutive pair is connected.*

**Example 3:**  
Input:  
scores = `[1,1,1,1]`,  
edges = `[[0,1],[1,2],[2,3],[3,0],[1,3]]`  
Output: `4`  
*Explanation: Any cycle of 4 nodes has a total score 1+1+1+1=4.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force**:  
  Try all possible permutations of 4 distinct nodes and check if they are connected in order.  
  This is O(n⁴), and will TLE for n up to 10⁵.

- **Observation**:  
  For any sequence a-b-c-d, each consecutive pair must have an edge (a-b, b-c, c-d).  
  Think about optimizing search by focusing on the central edge (b-c).  
  For every edge (u, v), try finding another node a connected to u (a ≠ v) and b connected to v (b ≠ u), making candidates: a-u-v-b.

- **Optimization**:  
  For each node, keep its top 3 neighbors with the highest scores (since only top 3 needed per node for best sum and at most 3 could participate without repetition).  
  For every edge (u, v), enumerate all pairs (a, b) where a is a heavy neighbor of u, b is a heavy neighbor of v, with all four nodes distinct.

- **Trade-off**:  
  Using this, time drops to O(|E|\*9), since for each edge (u, v) at most 3 candidates for a and 3 for b.

- **Summary**:  
  - For each node u, keep the 3 neighbors with the highest node score.
  - For each edge (u, v), try all (a, u, v, b) where a is among top neighbors of u and b is among top neighbors of v, none repeated.
  - Return maximal sum, or -1 if invalid.

### Corner cases to consider  
- Less than 4 nodes or not enough edges to form a length-4 path
- Duplicate edges in the input
- All nodes have same score or edge cases with lowest/highest node scores
- Isolated nodes with no edges
- Multiple possible sequences – ensure maximal sum is returned

### Solution

```python
def maximumScore(scores, edges):
    from collections import defaultdict
    import heapq

    n = len(scores)
    # For each node, maintain at most top 3 neighbors by their scores
    neighbors = defaultdict(list)
    for u, v in edges:
        neighbors[u].append(v)
        neighbors[v].append(u)
    # For each node, keep top 3 neighboring nodes with the highest scores
    best = {}
    for u in range(n):
        # Get up to 3 neighbor indices with the highest scores
        best[u] = sorted(neighbors[u], key=lambda v: -scores[v])[:3]

    max_score = -1
    # For every edge (u, v), try to pick (a, u, v, b)
    for u, v in edges:
        for a in best[u]:
            if a == v: continue
            for b in best[v]:
                if b == u or b == a or a == v or b == u: continue
                sum_score = scores[a] + scores[u] + scores[v] + scores[b]
                if sum_score > max_score:
                    max_score = sum_score
    return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(E), since for each edge we check at most 3 × 3 = 9 pairs, and building top 3 neighbors for all nodes is O(E).
- **Space Complexity:** O(N + E), for the adjacency list and the best (top-3) neighbors.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the node sequence length is k instead of 4?  
  *Hint: How would you generalize the search and pruning?*

- How would you optimize for very dense graphs?  
  *Hint: Can you further bound candidate neighbors?*

- How would you handle dynamic edge insertions/deletions in the graph?  
  *Hint: Think about how neighbor lists could be updated incrementally.*

### Summary
This problem depends on efficiently pruning candidates using the graph structure, specifically by leveraging the top-k neighbors for each node.  
It’s a graph enumeration + best-candidates pattern, and similar optimizations appear in problems involving friend circles, k-way path finding, or clique/subgraph enumeration where maximal-structure scores are needed.

### Tags
Array(#array), Graph(#graph), Sorting(#sorting), Enumeration(#enumeration)

### Similar Problems
- Get the Maximum Score(get-the-maximum-score) (Hard)