### Leetcode 1937 (Medium): Maximum Number of Points with Cost [Practice](https://leetcode.com/problems/maximum-number-of-points-with-cost)

### Description  
Given an m × n integer matrix `points`, you must select **one cell per row**.  
When you select a cell at row r, column c:
- Add **points[r][c]** to your total.
- For **each pair of consecutive rows**, if you pick columns c₁ and c₂, **subtract |c₁ - c₂|** from your total (it’s a movement penalty for “jumping” columns).

Your goal: **Pick one cell per row** to **maximize your total points** after all row choices and column movement penalties.

### Examples  

**Example 1:**  
Input: `points = [[1,2,3],[1,5,1],[3,1,1]]`  
Output: `9`  
*Explanation:  
Pick columns:  
- Row 0: col 2 (3 points)  
- Row 1: col 1 (5 points), move from col 2 to col 1, so penalty -1  
- Row 2: col 0 (3 points), move from col 1 to col 0 penalty -1  
Total = 3 + (5-1) + (3-1) = 9*

**Example 2:**  
Input: `points = [[2,4,3],[5,6,4],[7,2,8]]`  
Output: `17`  
*Explanation:  
Pick columns:  
- Row 0: col 1 (4)  
- Row 1: col 1 (6), same column, no penalty  
- Row 2: col 2 (8), move from col 1 to col 2 penalty -1  
Total = 4 + 6 + (8-1) = 17*

**Example 3:**  
Input: `points = [[1]]`  
Output: `1`  
*Explanation: Only one row, only one column. Pick 1. No penalty.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  For each row, try every possible column selection. For every cell, try all possible choices in the next row and subtract their column movement cost. Since there are n choices for each row, total combinations: nᵐ (exponential), not feasible.
  
- **Dynamic Programming:**  
  Let’s define **dp[r][c]** as the max score by picking column `c` in row `r` and making optimal choices from previous rows.  
  - Base case: First row, dp[c] = points[c], since there’s no previous row.
  - Recurrence:  
    For row r > 0 and column c:
      dp[r][c] = points[r][c] + max(dp[r-1][k] - |k - c| for all k)
  - This inner max loop is O(n). Naively, total time O(m × n²).

- **Optimization:**  
  The absolute value term |k-c| means, for a given c, the maximum over all k of dp[r-1][k] - |k-c| can be precomputed efficiently using two passes:
    - **Left to right:** Keep best value as you move right, accounting for -1 cost with every step (dp[r-1][k] - (c - k)).
    - **Right to left:** Similarly for the other direction.
  - Thus, each row can be processed in O(n).
  - **Total time O(m \* n), space O(n)**

- **Tradeoffs:**  
  This space-optimized DP avoids O(m × n) storage: We roll over two 1D arrays (current, previous).  
  The time improvement is necessary for the largest cases.

### Corner cases to consider  
- Only one row or one column.
- All values negative (prefer positions minimizing movement cost).
- All values identical.
- Large input: maximize efficiency.
- Matrix with n ≫ m or vice versa.

### Solution

```python
def maxPoints(points):
    m, n = len(points), len(points[0])
    prev = points[0][:]  # Base case: first row, no movement penalty

    for r in range(1, m):
        left = [0] * n
        right = [0] * n
        cur = [0] * n

        # Left pass: max achievable if approaching from left, accumulating the cost
        left[0] = prev[0]
        for c in range(1, n):
            left[c] = max(left[c-1] - 1, prev[c])

        # Right pass: max achievable if approaching from right, accumulating the cost
        right[-1] = prev[-1]
        for c in range(n-2, -1, -1):
            right[c] = max(right[c+1] - 1, prev[c])

        # For each column, the best is the max of "coming from left" or "coming from right"
        for c in range(n):
            cur[c] = points[r][c] + max(left[c], right[c])
        prev = cur

    return max(prev)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
  Two O(n) passes (left, right) plus O(n) merge per row, for m rows.
- **Space Complexity:** O(n).  
  Only two 1D arrays (`prev` and `cur`), as each row depends only on the previous.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if diagonal movement (across both columns and rows) incurred extra cost?  
  *Hint: Incorporate additional movement costs into transitions.*

- Can the algorithm be adapted for online streaming input, one row at a time?  
  *Hint: Only store and update what's needed for rolling DP.*

- What if, instead of |c₁ - c₂|, the penalty is arbitrary and given by a penalty matrix?  
  *Hint: Now, can't optimize with left/right passes; likely O(n²) per row.*

### Summary
We solved the problem using a **dynamic programming** approach with **row-wise rolling state**, and used the property of the cost function (|c₁ - c₂|) to enable two passes per row (left-to-right and right-to-left), reducing the time complexity to O(m × n) and space to O(n).  
This is a classic pattern for "row-to-row DP with distance penalty," and similar methods appear in matrix games, optimal path with movement penalties, and 1D-to-1D DP with absolute difference costs.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix)

### Similar Problems
- Minimum Path Sum(minimum-path-sum) (Medium)
- Minimize the Difference Between Target and Chosen Elements(minimize-the-difference-between-target-and-chosen-elements) (Medium)