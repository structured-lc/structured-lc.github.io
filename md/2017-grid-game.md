### Leetcode 2017 (Medium): Grid Game [Practice](https://leetcode.com/problems/grid-game)

### Description  
Given a 2 × n grid where each `grid[r][c]` represents points at position (r, c), two robots start from the top-left cell (0, 0) and both want to reach the bottom-right cell (1, n-1), moving only right or down.  
- **Robot 1** moves first, collecting points along its path and setting those cells to 0.  
- **Robot 2** then moves, collecting remaining points.  
**Robot 1 wants to minimize Robot 2's score; Robot 2 wants to maximize it.**  
Return the number of points Robot 2 will collect if both play optimally.

### Examples  

**Example 1:**  
Input: `grid = [[2,5,4],[1,5,1]]`  
Output: `4`  
Explanation.  
Robot 1 goes (0,0)→(0,1)→(0,2)→(1,2).  
Robot 2 goes (1,0)→(1,1)→(1,2).  
Robot 2 collects: 1 + 5 + 1 = 7, but cells at (1,2) were set to 0 by Robot 1, so final sum is 0 + 5 + 0 = 5. Optimal is for Robot 1 to drop down at the correct time so Robot 2 is forced to pick the minimum sum possible (here: 4).

**Example 2:**  
Input: `grid = [[3,3,1],[8,5,2]]`  
Output: `4`  
Explanation.  
Robot 1 moves (0,0)→(0,1)→(0,2)→(1,2).  
Robot 2 tries best path but is forced by zeros. Robot 2 picks up 0 + 3 + 1 = 4.

**Example 3:**  
Input: `grid = [[1,3,1,15],[1,3,3,1]]`  
Output: `7`  
Explanation.  
Robot 1 chooses a path to limit Robot 2. For example, drop down at (0,2):  
(0,0)→(0,1)→(0,2)→(1,2)→(1,3).  
Robot 2: (1,0)→(1,1)→(1,2)→(1,3), total = 1 + 3 + 0 + 1 = 5.  
But with optimal drop, Robot 2 collects as little as possible, here 7.

### Thought Process (as if you’re the interviewee)  
- **Naive/brute force:**  
  Try all possible paths for Robot 1, simulate Robot 2's best path for each and take the minimum. Too slow: total number of paths grows exponentially, not feasible for n up to 10⁵.

- **Key Insight:**  
  Robot 1's decision is only about which column to *drop down* from row 0 to row 1. There are only n choices, since Robot 1 must move right for a while and then down, then right to the end.  
  - For each column k, Robot 1 moves right to (0,k), goes down, then right along row 1.  
  - This "splits" the grid:  
    - Cells in (0, k+1..n-1) are inaccessible to Robot 2  
    - Cells in (1, 0..k-1) are inaccessible to Robot 2  
    - Robot 2 must take the *max* sum of remaining cells left or right.

  For each k, calculate:
  - **Top sum:** sum of row 0 from k+1 to n-1  
  - **Bottom sum:** sum of row 1 from 0 to k-1  
  What remains for Robot 2 is the *max* of those two.

  Robot 1 picks the k which *minimizes* that max.

- **Efficient implementation:**  
  Precompute prefix sums for both rows so you can get these intervals in O(1) for each split k.

### Corner cases to consider  
- n = 1 (1 column only): robots have almost no choices  
- All grid values are zero  
- Large n  
- All values are equal  
- Large values (test for integer overflow or precision)

### Solution

```python
def gridGame(grid):
    n = len(grid[0])

    # prefix sums for both rows
    pre0 = [0] * (n + 1)
    pre1 = [0] * (n + 1)
    for i in range(n):
        pre0[i + 1] = pre0[i] + grid[0][i]
        pre1[i + 1] = pre1[i] + grid[1][i]

    res = float('inf')
    for k in range(n):
        # Robot 1 drops down after column k
        top = pre0[n] - pre0[k + 1]         # sum of row 0, columns (k+1..n-1)
        bottom = pre1[k]                    # sum of row 1, columns (0..k-1)
        # Robot 2 gets the max of these two groups
        robot2 = max(top, bottom)
        res = min(res, robot2)

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We do two prefix sums (each O(n)), and scan n split points.

- **Space Complexity:** O(n)  
  Two prefix sum arrays of length n+1.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid has more than 2 rows?
  *Hint: Would your approach of "splitting" still work, or do you need DP or other structure?*

- What if robots can move left as well as right?
  *Hint: Does the unique path invariant still apply? Try to model the grid as a graph and reconsider.*

- Can you output the actual path the robots take?
  *Hint: Store or reconstruct split points while scanning for minimum.*

### Summary
This problem is a classic "minimax with prefix sums" grid variant. The insight is that, due to movement constraints, Robot 1's only real choice is where to drop down. By precomputing prefix sums, we convert a potentially exponential simulation into a linear-time sweep. The prefix sum trick for interval queries is a key reusable pattern for 1D grid problems and path-planning with exclusive access.