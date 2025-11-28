### Leetcode 3276 (Hard): Select Cells in Grid With Maximum Score [Practice](https://leetcode.com/problems/select-cells-in-grid-with-maximum-score)

### Description  
Given a 2D grid of positive integers, pick **one or more cells** such that:
- No two chosen cells are from the same row.
- All selected cell values are **unique**.
Return the **maximum possible sum** of chosen cells.

It's like picking at most one cell from each row, with no repeated number, to maximize the sum.

### Examples  

**Example 1:**  
Input: `grid = [[1,2,3],[4,3,2],[1,1,1]]`  
Output: `8`  
*Explanation: Pick 1 (from row 0, col 0), 4 (row 1, col 0), and 3 (row 0, col 2). All in different rows, all unique. 1 + 4 + 3 = 8.*

**Example 2:**  
Input: `grid = [[8,7,6],[8,3,2]]`  
Output: `15`  
*Explanation: Pick 8 (row 0, col 0) and 7 (row 0, col 1). Can't pick another 8 from row 1. 8 + 7 = 15.*

**Example 3:**  
Input: `grid = [[1]]`  
Output: `1`  
*Explanation: Pick the only cell. 1 is unique and from a single row.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all subsets, ensuring every chosen cell is from a different row and all values are unique. With up to 10 rows/columns, there are O((m\*n)!) ways—unfeasible.

- **Observations:**  
  - Can’t have two cells from the same row.
  - Can’t pick the same value twice (even from different rows).

- **Optimized Approach:**  
  - Since grid values are bounded (≤100), **group cells by value**.
  - For each unique value, generate the set of possible rows this value appears in.
  - The problem becomes: For each subset of values, can you select cells at unique rows?  
  - **State compression DP:** Use a bitmask to represent the set of chosen rows.  
    Let dp[mask] = maximum sum possible by assigning cells to chosen rows (mask bits set), ensuring no value repeats.
  - For each value, try assigning it to an unused row, updating new masks.

- **Complexity is manageable:**  
  For max 10 rows, max bitmask is 2¹⁰ = 1024.  
  For each value (max 100), try all possible row combinations.

### Corner cases to consider  
- Only one cell in the grid.
- All grid values are the same.
- All values unique across grid.
- Grid is 1xN or Nx1.
- Some grid cells have duplicate values across different rows.

### Solution

```python
def maxScore(grid):
    # Number of rows
    m = len(grid)
    # Collect: value → list of row indices where it appears (store all positions)
    from collections import defaultdict
    value_to_rows = defaultdict(list)
    for r in range(m):
        for v in grid[r]:
            value_to_rows[v].append(r)
    
    # All unique values, sorted in decreasing order (large values first)
    values = sorted(value_to_rows.keys(), reverse=True)
    
    # dp[mask]: max score can reach with rows in mask selected
    # mask: bit i=1 means row i is used
    n = m
    dp = [float('-inf')] * (1 << n)
    dp[0] = 0  # Nothing picked yet, sum 0
    
    for val in values:
        positions = value_to_rows[val]
        # Build all subsets of rows for current value
        # Go backward to avoid double count in the same step
        for mask in range((1 << n) - 1, -1, -1):
            # For each position, try placing val in an unused row
            for row in set(positions):  # Only distinct rows
                if not (mask & (1 << row)):
                    new_mask = mask | (1 << row)
                    if dp[mask] + val > dp[new_mask]:
                        dp[new_mask] = dp[mask] + val
    
    # Return max score among all masks where at least one bit is set
    return max(dp[mask] for mask in range(1, 1 << n))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(U × m × 2ᵐ)  
  U = number of **unique values** (≤100), m = number of rows (≤10).  
  For each value, for every bitmask (2ᵐ), try assigning to all possible rows.

- **Space Complexity:** O(2ᵐ)  
  Only need one dp array, size 2ᵐ.

### Potential follow-up questions (as if you’re the interviewer)  

- How would the solution change if "values must be unique" constraint were dropped?  
  *Hint: Try greedy row-by-row selecting the row maxes.*

- What if selecting cells cannot be from the same **column** either?  
  *Hint: Now treat as assignment problem (Hungarian Algorithm).*

- How do you output the actual cell coordinates for the optimal solution?  
  *Hint: Maintain a traceback array as you update dp; reconstruct path from mask.*

### Summary
This problem uses a **bitmask dynamic programming** pattern, where each bitmask encodes which rows have already had a cell assigned. The key optimization is that the number of rows is small, letting us enumerate all possible combinations of chosen rows efficiently. This bitmask DP trick is common in grid, matching, and combinatorial selection problems, especially with "unique set" and "no two from the same row" constraints.


### Flashcard
Group cells by value, then use DP or backtracking—for each unique value, track which rows are available and select the maximum-scoring subset.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Bit Manipulation(#bit-manipulation), Matrix(#matrix), Bitmask(#bitmask)

### Similar Problems
