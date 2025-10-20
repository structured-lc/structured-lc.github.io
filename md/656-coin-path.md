### Leetcode 656 (Hard): Coin Path [Practice](https://leetcode.com/problems/coin-path)

### Description  
Given an integer array `coins` (where coins[i] is the cost of landing on the (i+1)ᵗʰ position; -1 means impassable) and an integer `maxJump`, you start at index 1 and want to reach the last index with **minimum total cost**. Each move can jump forward up to `maxJump` steps (to any allowed position ahead).  
Return the **indices (1-indexed) of the minimum-cost path** as an array; if multiple exist with the same cost, **pick the lexicographically smallest** path. If it’s not possible, return an empty array.  

### Examples  

**Example 1:**  
Input: `coins=[1,2,4,-1,2]`, `maxJump=2`  
Output: `[1,3,5]`  
*Explanation: Start at 1 (cost 1), jump to 3 (cost 4), jump to 5 (cost 2). Total: 1+4+2 = 7. [1→2→4→5] is impossible due to the -1 at index 4.*

**Example 2:**  
Input: `coins=[1,2,4,-1,2]`, `maxJump=3`  
Output: `[1,2,5]`  
*Explanation: With a bigger jump, you can go 1→2 (cost 2), then directly jump to 5 (cost 2), skipping the impassable cells. Path: [1,2,5], cost 1+2+2=5, which is lower than previously possible.*

**Example 3:**  
Input: `coins=[1,2,4,-1,2]`, `maxJump=1`  
Output: `[]`  
*Explanation: With `maxJump=1`, you cannot skip the -1 cell at index 4 so you cannot reach the end.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible jump sequences, track min cost for each. Too slow: O(maxJumpⁿ).
- **DP idea:** For each index, store the minimum cost to reach the end and the actual path.  
  - Start from the end, move backwards.  
  - At position i, consider jumps of length 1,2,...,maxJump to position j (if j < n and coins[j] ≠ -1).
  - For each, pick the jump with minimal cost (and lex smallest path if a tie).
- **Why DP:**  
  - Overlapping subproblems — minimal cost from i re-used many times.  
  - Building optimal substructure backwards in array.
- **Lex order tie-break:**  
  - During DP, if two moves give same minimal cost, pick the one with the earlier index first in path.
- **Final Approach:**  
  - DP, O(n × maxJump) time, O(n) space for min cost and next-step tracking.
  - After building DP, reconstruct path using stored next-jump indices.

### Corner cases to consider  
- All cells passable and maxJump ≥ n-1 (direct jump possible).
- Some impassable (-1) cells close off last cell.
- Only one cell: coins length = 1.
- Path with same cost, different lex order.
- Large maxJump, but impassable blocks.
- Path not possible (should return []).

### Solution

```python
def cheapestJump(coins, maxJump):
    n = len(coins)
    if coins[0] == -1 or coins[-1] == -1:
        return []

    min_cost = [float('inf')] * n
    next_idx = [-1] * n
    min_cost[-1] = coins[-1]

    # Work backwards
    for i in range(n-2, -1, -1):
        if coins[i] == -1:
            continue
        # Try all jumps from i+1 to i+maxJump (within bounds)
        for j in range(i+1, min(i+maxJump+1, n)):
            if coins[j] == -1 or min_cost[j] == float('inf'):
                continue
            cost = coins[i] + min_cost[j]
            if cost < min_cost[i]:
                min_cost[i] = cost
                next_idx[i] = j
            elif cost == min_cost[i] and j < next_idx[i]:
                next_idx[i] = j  # Lex smallest

    # Reconstruct path
    path = []
    i = 0
    while i != -1:
        path.append(i+1)  # 1-indexed
        if i == n-1:
            return path
        i = next_idx[i]

    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × maxJump)  
  For each index (n), we check up to maxJump positions ahead.
- **Space Complexity:** O(n)  
  For storing min_cost and next_idx arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the number of minimum-cost paths, not just one?  
  *Hint: Use DP to count and aggregate number of optimal paths from each cell.*

- If the costs array is huge (hundreds of thousands), can you optimize for space?  
  *Hint: Optimize memory usage by reusing space or only storing rolling DP window.*

- If you return the minimum cost itself and not the path, what changes?  
  *Hint: You can use only min_cost array, ignore path reconstruction.*

### Summary
This problem is a variation of Zero-One DP/graph shortest-path in a DAG, with a lexicographical path constraint. It is solved by dynamic programming, moving backward, storing the minimum cost to reach the end from each cell and the next index of optimal path. The pattern appears in shortest-path, coin change, and jumping game type problems where you seek minimal moves/costs under movement constraints.


### Flashcard
Use DP from the end, for each index consider jumps of 1 to maxJump to valid coins, storing minimal cost and lexicographically smallest path.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- House Robber(house-robber) (Medium)
- House Robber II(house-robber-ii) (Medium)