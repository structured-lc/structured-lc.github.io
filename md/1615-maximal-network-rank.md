### Leetcode 1615 (Medium): Maximal Network Rank [Practice](https://leetcode.com/problems/maximal-network-rank)

### Description  
Given n cities labeled 0 to n-1 and a list of roads connecting pairs of cities, the **network rank** of a pair (A, B) is the **number of unique roads** connected to either city, counting the shared road between A and B **only once**. Return the **maximum network rank** among all possible pairs.

### Examples  
**Example 1:**  
Input: `n = 4, roads = [[0,1],[0,3],[1,2],[1,3]]`  
Output: `4`  
*Explanation: Cities 1 and 3 are each connected to 3 and 2 roads, with 1 road shared. Their total is 3 + 2 - 1 = 4.*

**Example 2:**  
Input: `n = 5, roads = [[0,1],[0,3],[1,2],[1,3],[2,3],[2,4]]`  
Output: `5`  
*Explanation: Max network rank is between cities 1 and 2: (3 + 3 - 1 = 5).*  

**Example 3:**  
Input: `n = 2, roads = [[0,1]]`  
Output: `1`  
*Explanation: Only 2 cities and 1 road.

### Thought Process (as if you’re the interviewee)  
This is a **degree counting and pair testing** problem:
- For each city, count how many roads touch it (its degree)
- For every unique city pair (A, B), their network rank = deg[A] + deg[B] - (1 if they have a direct road; 0 otherwise)
- Brute-force: O(n²) pairs. For each, check if road exists (using set for O(1) lookup)

### Corner cases to consider  
- No roads at all (all pairs have rank 0)
- Only one road
- Multiple roads between same pair (constraints say roads are unique)
- Large n but very sparse roads

### Solution

```python
def maximalNetworkRank(n: int, roads: list[list[int]]) -> int:
    degree = [0] * n
    connected = set()
    for a, b in roads:
        degree[a] += 1
        degree[b] += 1
        connected.add((min(a, b), max(a, b)))  # To check shared road
    max_rank = 0
    for i in range(n):
        for j in range(i+1, n):
            rank = degree[i] + degree[j]
            if (i, j) in connected:
                rank -= 1  # Only one count for shared road
            max_rank = max(max_rank, rank)
    return max_rank
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n²) for all pairs, but road lookup per pair is O(1)
- **Space Complexity:** O(n + m) for degree array and set (m = roads)

### Potential follow-up questions (as if you’re the interviewer)  
- What if the network can have multiple roads per pair?
  *Hint: Adjust set to multiset/counts for lookups.*

- Find **all pairs** with the maximal network rank.
  *Hint: Store pairs alongside ranks, output those hitting max.*

- Can you do it faster if the network is very sparse?
  *Hint: Only check pairs among the k most connected cities.*

### Summary
This problem uses the standard **graph degree + pairwise combination pattern**. The specific deduction (subtract 1 if directly connected) is a classic tweak when dealing with undirected graphs and unique edge counts.

### Tags
Graph(#graph)

### Similar Problems
