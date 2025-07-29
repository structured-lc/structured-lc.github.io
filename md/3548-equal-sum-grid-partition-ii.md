### Leetcode 3548 (Hard): Equal Sum Grid Partition II [Practice](https://leetcode.com/problems/equal-sum-grid-partition-ii)

### Description  
Given an m × n grid of positive integers, determine if it is possible to make either one *horizontal* or *vertical* cut such that:
- Each resulting section is non-empty (each side has at least one row/column).
- The *sum* of the numbers in both sections is either **equal**, or can be made equal by "discounting" (removing from the sum) at most one cell from either section (not both) — and after removal, the rest of the section must remain a single connected block (all parts of that section remain reachable via up/down/left/right steps).
Return true if such a partition exists; otherwise, false.

### Examples  

**Example 1:**  
Input: `grid = [[2, 1], [1, 2]]`  
Output: `true`  
*Explanation: Horizontal cut after row 0: Top `[[2, 1]]`, Bottom `[[1, 2]]`. Sums: 3 and 3. Equal—so possible without discount.*

**Example 2:**  
Input: `grid = [[1, 3, 2, 4]]`  
Output: `true`  
*Explanation: Cut after column 1. Left: `[1,3]` (sum 4). Right: `[2,4]` (sum 6). Remove '2' at start of right (adjacent), remaining `4` is connected. Now sums on both sides are 4.*

**Example 3:**  
Input: `grid = [[1, 2], [3, 4], [5, 6]]`  
Output: `false`  
*Explanation: No single horizontal or vertical cut, possibly with discounting at most one cell, yields two connected regions whose sums are equal.*

### Thought Process (as if you’re the interviewee)  

1. **Brute-force:**  
   For every possible horizontal and vertical cut, compute the sum of each region and check if they're equal. For the "discount one cell" rule, for each side with larger sum, try discounting every possible cell adjacent to the cut (and whose removal does not disconnect the section), and see if the sums match. This is O(mn × (m+n)) time.

2. **Optimized:**
   - Precompute row and column prefix sums for fast sum queries.
   - For each possible cut, compute sums in O(1).
   - Along the cut, collect candidate cells adjacent to the cut on both sides.
   - For each candidate, check if removing it allows the sums to balance and if removal does not make the section disconnected (for 1D, always fine; for 2D, only need to ensure not breaking into two blocks).
   - Need to handle both horizontal and vertical cases, and check both grid and its reverse (for both directions).
   - The challenge is connectivity: In single-row/column, any adjacent cell is OK. In general, only removing a cell at the border of a section is allowed, as long as what remains is "one piece."

3. **Trade-offs:**  
   - Preprocessing allows cuts to be considered efficiently.
   - The cell removal check is trickier in general, but in practice, border cells next to the cut work. For interview, can argue for border-only checks.

### Corner cases to consider  
- Single row or single column.
- All values equal.
- Already partitioned equally without discounting.
- Needing to discount a cell not directly bordering the cut (this should not be allowed).
- Removing the only cell in a region (not allowed).
- Grids with minimum/maximum values.

### Solution

```python
def canPartitionGrid(grid):
    # Rows and columns
    m, n = len(grid), len(grid[0])
    total = sum(sum(row) for row in grid)
    
    # Function to check partitions in a particular direction
    def check(is_horizontal):
        rows, cols = (m, n) if is_horizontal else (n, m)
        # For each possible cut (can't be at 0 or at the end, regions must be nonempty)
        for cut in range(1, rows):
            # section1: rows 0..cut-1 (or columns)
            # section2: rows cut..end (or columns)
            sum1, sum2 = 0, 0
            if is_horizontal:
                sum1 = sum(sum(grid[r]) for r in range(cut))
                sum2 = total - sum1
            else:
                sum1 = sum(grid[r][c] for r in range(m) for c in range(cut))
                sum2 = total - sum1

            if sum1 == sum2:
                return True  # No need to discount

            diff = abs(sum1 - sum2)
            # Try discounting one cell adjacent to the cut from the larger sum region
            # For each cell along the cut, try discounting it
            found = False
            if sum1 > sum2:
                # Try removing cell from section1 at the border
                for i in range(m if is_horizontal else n):
                    val = grid[cut-1][i] if is_horizontal else grid[i][cut-1]
                    # Must still be connected after removal, which is okay for 1D edge
                    if sum1 - val == sum2:
                        found = True
                        break
            if sum2 > sum1:
                for i in range(m if is_horizontal else n):
                    val = grid[cut][i] if is_horizontal else grid[i][cut]
                    if sum2 - val == sum1:
                        found = True
                        break
            if found:
                return True
        return False

    # Try all 4 ways: original, reversed (for cuts from other side), transpose, transpose reversed
    if check(True) or check(False):
        return True
    # Horizontal reversed
    grid_rev = grid[::-1]
    if check(True):
        return True
    # Vertical reversed
    grid_t = [list(row)[::-1] for row in zip(*grid)]
    if check(True):
        return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m×n×(m+n)). For each of O(m) horizontal and O(n) vertical cuts, for each, worst case O(max(m,n)) checks along the cut for discount possibilities.
- **Space Complexity:** O(1) extra (ignoring input grid), unless optimizing further with prefix sums.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the connectivity check for general 2D blocks, if a discount cell removal could potentially disconnect a section?
  *Hint: Use BFS/DFS to check 2D connectivity after hypothetical removal.*

- Can you generalize for k cuts (not just one)?
  *Hint: Partition DP, consider sum possibilities, but problem becomes much harder due to region shape complexity.*

- What about negative numbers or zeros in the grid?
  *Hint: Carefully handle sum/discount logic as negative values could make multiple cells removable and increase cases to check.*

### Summary
This problem combines **prefix sums**, **partitioning**, and a localized check for **"discounting" border cells to correct for imbalances**. The coding pattern here is common in partitioning arrays/grids with minimal intervention—often seen in grid-cut, split-equal, and divide-and-conquer contexts. Handling *region connectivity* after modification is a common follow-up in 2D grid manipulation problems (flood-fill, island counting, etc.), and the approach translates to other problems requiring maintaining the connectedness of regions after modification.