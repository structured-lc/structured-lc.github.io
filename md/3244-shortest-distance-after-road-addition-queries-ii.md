### Leetcode 3244 (Hard): Shortest Distance After Road Addition Queries II [Practice](https://leetcode.com/problems/shortest-distance-after-road-addition-queries-ii)

### Description  
Given n cities (numbered 0 to n-1) connected in a line (each city i has a unidirectional road to i+1 if 0 ≤ i < n-1), and a list of queries. Each query adds a unidirectional road from city u to city v. After each query, return the length of the shortest path from city 0 to city n-1.

There’s a key constraint: There are no two queries such that queries[i] < queries[j] < queries[i][1] < queries[j][1]—meaning, added roads never "cross" over each other, which implies that once you can skip over a segment, it's not possible for other added roads to overlap/interleave that segment.

### Examples  

**Example 1:**  
Input: `n = 4, queries = [[0, 2], [2, 3]]`  
Output: `[2, 2]`  
Explanation:  
- Initially, the route from 0 → 1 → 2 → 3 has length 3.
- Add [0,2]: Now 0 → 2 → 3, path length = 2.
- Add [2,3]: 0 → 2 → 3 or 0 → 1 → 2 → 3, but shortest path remains length 2.

**Example 2:**  
Input: `n = 5, queries = [[0, 4]]`  
Output: `[1]`  
Explanation:  
- Initial path: 0 → 1 → 2 → 3 → 4, length 4.
- Add [0,4]: Now 0 → 4, path length = 1.

**Example 3:**  
Input: `n = 6, queries = [[1, 4], [0, 3], [2, 5]]`  
Output: `[4, 3, 3]`  
Explanation:  
- Initially: 0→1→2→3→4→5, path length 5.
- Add [1,4]: 0→1→4→5, path length 3.
- Add [0,3]: 0→3→4→5, path length 3.
- Add [2,5]: 0→1→2→5, but 0→1→4→5 and 0→3→4→5 are still length 3.

### Thought Process (as if you’re the interviewee)  
First, model the cities as a directed graph: Each city i has an edge to i+1. Each query adds a new directed edge. After every query, compute the shortest path from 0 to n-1.

- **Brute-force idea:**  
  After each added edge, run BFS or Dijkstra’s from 0 to n-1.
  - Time: O(q × n)

- **Optimize:**  
  The "no-crossing" property suggests that each added shortcut "removes" a block of cities from computation (since no shortcut will cross inside another’s range).  
  Maintain an array next[i] = the next city that can be reached directly from i (initially i+1). For each query [u, v], set next[u] = v, i.e., now you can jump directly from u to v.  
  After each addition, traverse using next[] from 0 until n-1, counting jumps.

- **Trade-offs:**  
  - This approach is O(qn) if we scan from 0 each time, but since the graph is in the form of "chains" with jump positions being rare, we can optimize further by maintaining the jump chain only at changed positions and only recalculating when necessary.
  - Final optimal: After each query, adjust next[u] to v and count the number of jumps from 0 → n-1 as the current shortest path.

### Corner cases to consider  
- Only one city (n=1): the distance is zero.
- Queries that add an edge which doesn’t improve the path (e.g., [1,3] when already have [0,3]).
- Duplicate queries.
- Long chains of queries.
- n is very small or very large.
- Adding a shortcut that skips directly to n-1.

### Solution

```python
def shortestDistance(n, queries):
    # next_city[i] = which node can be reached from i in one step (initially i+1)
    next_city = [i + 1 for i in range(n - 1)] + [n - 1]
    res = []

    for u, v in queries:
        next_city[u] = v

        # Greedily follow next_city from 0 to n-1, counting the hops
        cnt = 0
        city = 0
        while city < n - 1:
            city = next_city[city]
            cnt += 1
        res.append(cnt)

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × q) in the worst case, since we might reset the chain and need to count every link from 0 to n-1 after every query. For sparse queries, it behaves much faster.
- **Space Complexity:** O(n) for the next_city array, plus O(q) output.

### Potential follow-up questions (as if you’re the interviewer)  

- Handling bidirectional edges:  
  *Hint: How would your model or "next" array change if edges weren’t just one-way?*

- What if queries could "cross" each other?  
  *Hint: Try finding cycle detection or interval management techniques.*

- How to answer shortest-path queries (not just from 0 to n-1, but any a to b) after arbitrary additions?  
  *Hint: Need a more flexible data structure; maybe consider BFS trees or segment trees.*

### Summary
This problem leverages an **interval/jump pointer compression** pattern, akin to flattening linked list jumps. Because the constraints guarantee no "crossing" intervals, a greedy update of jump pointers suffices for optimal paths. This pattern generalizes to range/jump pruning and is common where non-overlapping intervals must be handled, like certain greedy greedy graph sequence optimizations and union-interval problems.

### Tags
Array(#array), Greedy(#greedy), Graph(#graph), Ordered Set(#ordered-set)

### Similar Problems
