### Leetcode 790 (Medium): Domino and Tromino Tiling [Practice](https://leetcode.com/problems/domino-and-tromino-tiling)

### Description  
Given a 2×n board, find the total number of ways to tile the board completely using 2×1 dominoes and "L-shaped" trominoes (which can be rotated). The board must be covered without gaps or overlaps, and tiles can be placed either vertically or horizontally.

### Examples

**Example 1:**  
Input=`3`  
Output=`5`  
Explanation: For a 2x3 board, there are five distinct ways to tile using dominos and trominoes. These configurations include combinations of vertical and horizontal dominos and trominoes in all possible orientations.

**Example 2:**  
Input=`1`  
Output=`1`  
Explanation: A 2x1 board can only be tiled with one vertical domino.

**Example 3:**  
Input=`2`  
Output=`2`  
Explanation: A 2x2 board can be tiled with two horizontal dominos (top and bottom) or two vertical dominos (left and right).

### Thought Process (as if you’re the interviewee)  
First, I considered all possible ways to place the first tile: vertical domino, horizontal dominos (top and bottom), or L-shaped tromino (in all four possible rotations). For small boards (n=1,2), I could enumerate all tilings by hand. For larger n, enumerating all possibilities quickly becomes intractable due to the combinatorial explosion, so recursion or dynamic programming (DP) is necessary.

In a brute-force approach, I tried recursive backtracking, placing each possible tile and recursively solving the remaining board. However, this results in a lot of redundant calculations due to overlapping subproblems, so I moved to a DP solution. I realized I need to track two states: fully tiled boards (`dp[i]` for a 2×i board) and partially tiled boards (`dp1[i]` where one cell is missing in the last column).

The recurrence relations emerged as follows:
- `dp[i]`: Number of ways to fully tile a 2×i board.  
  This is the sum of:
  - `dp[i-1]` (place a vertical domino on the right).
  - `dp[i-2]` (place two horizontal dominos on top of each other).
  - `2 * dp1[i-1]` (place a tromino in two possible orientations, each leaving a complementary gap that's covered by a tromino or domino).
- `dp1[i]`: Number of ways to tile a 2×i board with one cell missing in the last column.  
  This is:
  - `dp[i-2] + dp1[i-1]` (the gap can be filled by a horizontal domino or another tromino, respectively).

This DP approach efficiently computes the result by reusing previously calculated values, dramatically reducing time complexity.

### Corner cases to consider  
- `n = 0`: There's exactly one way to tile a 2×0 board—by doing nothing (trivial case).
- `n = 1`: Only one vertical domino fits.
- `n = 2`: Two ways—two vertical dominos or two horizontal.
- Very large `n` (millions): Use modulo to prevent integer overflow and keep numbers tractable.
- Edge case of `dp1[1]`: When i=1, `dp1[1] = 1` (only missing one cell).
- Make sure to initialize `dp` and `dp1` with the correct base cases.

### Solution

```python
def numTilings(n):
    MOD = 10**9 + 7
    if n <= 2:
        return n
    dp =  * (n + 1)
    dp1 =  * (n + 1)
    dp, dp[1], dp[2] = 1, 1, 2
    dp1[1] = 1

    # Fill dp1 array
    for i in range(2, n):
        dp1[i] = (dp1[i-2] + dp[i-1]) % MOD

    # Fill dp array
    for i in range(3, n + 1):
        dp[i] = (dp[i-1] + dp[i-2] + 2 * dp1[i-1]) % MOD

    return dp[n]
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n)  
  We iterate once through the table from 0 to n to fill both `dp` and `dp1`, making each computation in constant time.
- **Space Complexity:** O(n)  
  We maintain two arrays of size n+1, `dp` and `dp1`, so the extra space is linear with respect to n. This can be optimized to O(1) space by noticing that we only need the last few values, but the canonical interview answer is O(n).

### Potential follow-up questions

- Can you solve this problem with only O(1) space?  
  Hint: You only need to keep track of dp[i], dp[i-1], dp[i-2], dp1[i], and dp1[i-1] at each step.

- What if the board dimensions are m×n (with m > 2)?  
  Hint: DP state becomes more complex, and you need to consider different missing cell configurations.

- How would you count the number of tilings modulo a very large prime to prevent overflow, and why?  
  Hint: Keep intermediate results in mod 10⁹+7 to handle large numbers and prevent overflow.

### Summary

This is a classic **dynamic programming** problem that requires careful consideration of different tiling configurations, especially due to the introduction of trominoes. The two-state DP approach is efficient and generalizable to many tiling problems. The pattern (DP with multiple states) is common in grid/challenge/board tiling problems and in problems where multiple actions affect the state differently. This approach is also relevant for problems involving laying out tiles, making cuts, or covering areas with specific shapes.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
