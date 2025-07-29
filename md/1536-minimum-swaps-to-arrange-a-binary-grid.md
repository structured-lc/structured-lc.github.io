### Leetcode 1536 (Medium): Minimum Swaps to Arrange a Binary Grid [Practice](https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid)

### Description  
Given an n × n binary grid (with only 0s and 1s), you can swap any two **adjacent rows** as many times as needed. A grid is **valid** if for every iᵗʰ row (0-based), all cells above the main diagonal are 0 — that is, for each row i, all columns j with j > i must be 0.  
Return the **minimum number of adjacent row swaps** required to make the grid valid, or -1 if it is impossible.  
Think of it as sorting rows so that, for every row i, the trailing zeros from the rightmost cell to index i must cover all 1s (no 1s allowed in positions j > i in row i).

### Examples  

**Example 1:**  
Input: `grid = [[0,0,1],[1,1,0],[1,0,0]]`  
Output: `3`  
*Explanation:  
We need each row i to have 0s in columns j > i.  
- Row 0 needs positions 1,2 to be 0; it's not, so we need a row with at least two trailing zeros to be on top.  
- After appropriate swaps:
  ```
  Initial grid:      After swap 1:     After swap 2:      After swap 3:
  [0,0,1]           [1,1,0]           [1,0,0]           [1,0,0]
  [1,1,0]   ->      [0,0,1]   ->      [1,1,0]   ->      [0,0,1]
  [1,0,0]           [1,0,0]           [0,0,1]           [1,1,0]
  ```
  After 3 adjacent swaps the grid is valid.
*

**Example 2:**  
Input: `grid = [[0,1,1,0],[0,1,1,0],[0,1,1,0],[0,1,1,0]]`  
Output: `-1`  
*Explanation:  
Every row has 1s for j > i (i.e., right of the diagonal), so it's impossible to move rows to make all required upper-triangle positions zero by any number of swaps or arrangements.*

**Example 3:**  
Input: `grid = [[1,0,0],[1,1,0],[1,1,1]]`  
Output: `0`  
*Explanation:  
Already valid:  
- Row 0: cols 1,2 are zero  
- Row 1: col 2 is zero  
- Row 2: (no constraint needed)  
No swaps needed.*

### Thought Process (as if you’re the interviewee)  
- Brute force: Try all row permutations and count swaps — but too slow for n up to 200 (n!).
- Optimization: Note only **trailing zeros** from the right in each row matter: row i requires at least (n−1−i) trailing zeros (for 0-based i).
- For each position i, find, among rows i or later, a row with at least (n−1−i) trailing zeros; move it up using adjacent swaps, tracking moves.
- If, for any i, no such row exists, the answer is -1.
- This resembles an insertion sort on a virtual "trailing zero count" array.

### Corner cases to consider  
- n == 1: Single row, already valid, swaps = 0.
- All rows have too few trailing zeros (no valid ordering possible).
- Already valid grid (swaps = 0).
- Multiple valid grids: choose row that minimizes swaps at each step.
- Rows may need to move over several rows, test counting adjacent swaps correctly.

### Solution

```python
def minSwaps(grid):
    n = len(grid)
    # Calculate trailing zeros for each row
    trailing_zeros = []
    for row in grid:
        cnt = 0
        for val in reversed(row):
            if val == 0:
                cnt += 1
            else:
                break
        trailing_zeros.append(cnt)
    
    swaps = 0
    for i in range(n):
        # We need row i to have at least (n - 1 - i) trailing zeros
        needed_zeros = n - 1 - i
        found = -1
        for j in range(i, n):
            if trailing_zeros[j] >= needed_zeros:
                found = j
                break
        if found == -1:
            return -1  # Impossible
        # Swap found up to current position i (adjacent swaps)
        while found > i:
            trailing_zeros[found], trailing_zeros[found - 1] = trailing_zeros[found - 1], trailing_zeros[found]
            found -= 1
            swaps += 1
    return swaps
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  For each row i, we may scan from i to n-1 (O(n)), and in the worst case, swap it up (≤ n swaps per row), so total O(n²).
- **Space Complexity:** O(n)  
  We use an auxiliary array of trailing zeros per row.

### Potential follow-up questions (as if you’re the interviewer)  

- What if only non-adjacent row swaps are allowed?
  *Hint: What changes if you can swap any row with any other, not just adjacent?*
- How to optimize further if grid is sparse (mostly zeros)?
  *Hint: Can you preprocess or shortcut scanning trailing zeros?*
- How would you adapt this for rectangular grids (n ≠ m)?
  *Hint: Figure out what “valid” means and main diagonal positions for non-square grids.*

### Summary
This problem uses a **greedy and simulation pattern**. By tracking trailing zeros in each row and selecting the minimal valid row for each position (and counting swaps needed to bubble it up), we resemble an **insertion sort** of sorts. The idea of transforming the problem into another sequence (trailing zeros) and then sorting it is a common approach in greedy grid or permutation problems. This technique also appears in scheduling (minimizing movements), and in simulation of process orderings.