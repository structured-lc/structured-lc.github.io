### Leetcode 2912 (Hard): Number of Ways to Reach Destination in the Grid [Practice](https://leetcode.com/problems/number-of-ways-to-reach-destination-in-the-grid)

### Description  
You're given a grid of size n×m (1-indexed), and two positions:
- source = [x₁, y₁]
- dest = [x₂, y₂]

You want to count the number of ways to go from source to dest in exactly k steps.  
Each move, you can:
- move to any **other** cell in the same row or the same column (but not stay in place).
- No diagonal or knight moves, no teleporting, and you cannot stay in the same cell on a move.

Since the answer may be very large, return the result modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `n = 3, m = 3, k = 2, source = [1, 2], dest = [1, 3]`  
Output: `2`  
*Explanation: You can go: (1,2) → (1,3) → (1,2) → (1,3) or (1,2) → (2,2) → (2,3) → (1,3).*

**Example 2:**  
Input: `n = 2, m = 2, k = 1, source = [1, 1], dest = [2, 2]`  
Output: `0`  
*Explanation: Any single step lands only on same row or same column, so you can't reach (2,2) in 1 step.*

**Example 3:**  
Input: `n = 1, m = 4, k = 3, source = [1, 1], dest = [1, 4]`  
Output: `1`  
*Explanation: Only path is (1,1) → (1,2) → (1,3) → (1,4).*

### Thought Process (as if you’re the interviewee)  
First, understand that in each move, I must change either row or column (but not both), and cannot remain in the same cell.  
A brute-force solution would be to do a k-step DFS or BFS, but that's exponential in k and not feasible.

Instead, since only rows or columns change with a move, and the position in the previous step influences my next move, this is perfect for DP.  
Define dp[r][c][steps] as the number of ways to reach (r, c) with "steps" moves.

But notice:
- At each step, to reach (r, c), I can come from any other cell in the same row or same column except itself.
- Precompute for each dp state:  
  For each cell (r, c), sum all dp in row r (excluding c), and all in col c (excluding r) from the previous step.

This leads to a space- and time-efficient DP formulation.

Space can be reduced to 2D since only the last step and current step matter.

### Corner cases to consider  
- Source and dest are the same, but k is odd.
- 1×n or n×1 grid (can only move along the row/column).
- k = 0 (only valid if source == dest)
- Destination is unreachable within k steps (e.g., parity mismatch).
- k is very large, but grid is small (watch for DP re-use).

### Solution

```python
MOD = 10**9 + 7

def numberOfWays(n, m, k, source, dest):
    # 1-indexed input, convert to 0-indexed
    sx, sy = source[0]-1, source[1]-1
    dx, dy = dest[0]-1, dest[1]-1

    prev = [[0] * m for _ in range(n)]
    prev[sx][sy] = 1

    for step in range(k):
        # Compute row and column sums for optimization
        row_sum = [sum(prev[i]) % MOD for i in range(n)]
        col_sum = [sum(prev[i][j] for i in range(n)) % MOD for j in range(m)]

        curr = [[0] * m for _ in range(n)]
        for i in range(n):
            for j in range(m):
                # Exclude staying in place
                total = (row_sum[i] + col_sum[j] - prev[i][j]) % MOD
                curr[i][j] = total
        prev = curr

    return prev[dx][dy]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(k × n × m)  
  For each of k steps, we compute row_sum in O(n × m), col_sum in O(m × n), and then O(n × m) for updating curr.
- **Space Complexity:** O(n × m)  
  Only two 2D matrices (previous and current step) are stored.

### Potential follow-up questions (as if you’re the interviewer)  

- What if diagonal moves are allowed as well?
  *Hint: How would your DP state and transitions change if more movement directions are possible?*

- Can you return the paths themselves, not just the count?
  *Hint: Consider memory and combinatorial explosion if k is large.*

- Can you solve for variable k, i.e., what’s the count in at most k steps?
  *Hint: How would you sum over all possible k and adjust DP?*

### Summary
This solution uses the “DP on grids with precomputed row/col sums” pattern, optimizing multi-move transitions with fast prefix sums.  
This is common in path-counting grid problems, chessboard moves, and state DP with multi-way transitions.  
Key idea: optimize per-step transitions by precomputing aggregate info, and save time with 2D DP states.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
