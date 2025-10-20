### Leetcode 1473 (Hard): Paint House III [Practice](https://leetcode.com/problems/paint-house-iii)

### Description  
You are given a row of `m` houses, each can be painted one of `n` colors. Some houses may already be painted, indicated in the `houses` array; 0 means unpainted, otherwise the given color. Painting an unpainted house with color `j` costs `cost[i][j-1]`. You must paint the remaining houses so that there are exactly `target` **neighborhoods** — a maximal sequence of adjacent houses of the same color. Return the minimum cost to achieve this, or -1 if impossible.

### Examples  
**Example 1:**  
Input: `houses = [0,0,0,0,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3`  
Output: `9`  
*Explanation: Paint house 0 color 1 (1), house 1 color 2 (1), house 2 color 2 (1), house 3 color 1 (1), house 4 color 2 (5). Neighborhoods: [1], [2], [1], [2] ⇒ 3.*

**Example 2:**  
Input: `houses = [0,2,1,2,0], cost = [[1,10],[10,1],[10,1],[1,10],[5,1]], m = 5, n = 2, target = 3`  
Output: `11`  
*Explanation: Only houses 0 and 4 need painting. Color house 0 with 2 (10), house 4 with 2 (1). Neighborhoods: [2], [1], [2], so total 3 neighborhoods.*

**Example 3:**  
Input: `houses = [3,1,2,3], cost = [[1,1,1],[1,1,1],[1,1,1],[1,1,1]], m = 4, n = 3, target = 3`  
Output: `-1`  
*Explanation: All houses already painted, but only 2 neighborhoods can form: [3], [1,2], [3]. Impossible to reach 3 neighborhoods.*


### Thought Process (as if you’re the interviewee)  
Start by identifying the core of the problem: paint unpainted houses, choose colors, and control neighborhood transitions. If a house is pre-painted, we must keep that color. Otherwise, for each color choice, pay the cost and decide if the neighborhood count increases (color differs from previous house).

A straightforward brute-force would be: for every house, every color, every possible target count → try every combination. That has exponential time.

To optimize, use **dynamic programming** with memoization. The state is (`i`, `prev_color`, `t`) for the iᵗʰ house, previous color, and t remaining neighborhoods. Transition: if painting, compare against previous color to decide if a neighborhood increases.

Recursively try all colorings, cache results per (`i`,`prev_color`,`t`). Base cases: if we finish all houses with exactly 0 remaining neighborhoods, return 0; else, if over or out of houses, return infinity.

Since `m`, `n`, and `target` can each be up to 100, 20, and 100, complexity is feasible with DP.

### Corner cases to consider  
- Houses already painted completely (check if neighborhood count matches target).
- Impossible to reach required target neighborhoods (return -1)
- More neighborhoods than houses, or target = 0
- Paint cost includes very large numbers; ensure you use a constant for infinity.
- Only one color available.

### Solution

```python
# houses[i]: color (1-based), or 0 for not painted
def minCost(houses, cost, m, n, target):
    from functools import lru_cache
    INF = float('inf')
    
    @lru_cache(maxsize=None)
    def dp(i, prev_color, t):
        # t: number of neighborhoods remaining
        if t < 0:
            return INF
        if i == m:
            return 0 if t == 0 else INF
        if houses[i]:
            # Already painted, color fixed
            curr_color = houses[i]
            inc = 0 if prev_color == curr_color else 1
            return dp(i+1, curr_color, t - inc)
        else:
            min_cost = INF
            for color in range(1, n+1):
                paint = cost[i][color-1]
                inc = 0 if color == prev_color else 1
                next_cost = dp(i+1, color, t - inc)
                if next_cost != INF:
                    min_cost = min(min_cost, paint + next_cost)
            return min_cost
    res = dp(0, 0, target)
    return -1 if res == INF else res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n² × target). At each of the m houses, we consider up to n colors and can have up to target neighborhoods, and in worst case, for each, may look at n color transitions.
- **Space Complexity:** O(m × n × target), due to memoization over all DP states; call stack is O(m).


### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of colors is much larger — how could you optimize for larger n?
  *Hint: Early pruning if cost is already over minimum; storing only best for each color at each DP step.*

- How would you reconstruct the path (color choices) for the optimal solution?
  *Hint: Store parent pointers or backtrack from memo results.*

- Could you solve it bottom-up (iterative DP) rather than top-down?
  *Hint: Fill 3D array: dp[i][color][t], building up from 0 to m.*

### Summary
This problem uses the "multidimensional DP" technique, tracking three parameters (index, previous color, remaining neighborhoods) and memoizes results to avoid recomputation. Such DP patterns are useful for constrained sequence construction, assignment problems, and path cost optimizations. Understanding the transitions between states (especially when counting neighborhoods) is key for mastering DP in practical scenarios.


### Flashcard
Use DP: dp[i][c][t] = min cost to paint first i houses, ending with color c and t neighborhoods; try all colorings, respecting pre-painted houses.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Number of Distinct Roll Sequences(number-of-distinct-roll-sequences) (Hard)
- Paint House IV(paint-house-iv) (Medium)