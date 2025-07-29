### Leetcode 2397 (Medium): Maximum Rows Covered by Columns [Practice](https://leetcode.com/problems/maximum-rows-covered-by-columns)

### Description  
Given a binary matrix (with only 0 and 1) of dimensions m × n, and an integer numSelect, select exactly numSelect distinct columns from the matrix.  
A row is considered **covered** if every 1 in that row is in one of the selected columns, or if the row consists of all 0s.  
The goal is to choose the set of numSelect columns that will maximize the number of covered rows.

### Examples  

**Example 1:**  
Input:  
`matrix = [[0,1,1,1],[1,0,1,0],[0,0,0,1],[1,1,0,0]], numSelect = 2`  
Output:  
`2`  
Explanation:  
If you pick columns `[1,2]`, covered rows are:  
- Row 1: `[0,1,1,1]` (ones at cols 1,2,3; only 1 and 2 are picked, not all 1s covered)  
- Row 2: `[1,0,1,0]` (ones at cols 0,2; only 2 is picked; col 0 is not)  
- Row 3: `[0,0,0,1]` (one at col 3; col 3 not picked)  
- Row 4: `[1,1,0,0]` (ones at cols 0,1; 1 is picked, 0 is not)  
But if you pick `[2,3]`, row 3 is covered (all 1's at col 3, which is picked), and row 1 remains uncovered.  
The best you can do is cover 2 rows total.

**Example 2:**  
Input:  
`matrix = [[1],], numSelect = 1`  
Output:  
`2`  
Explanation:  
Pick the only available column (0).  
Row 1: `[1]` — covers all ones  
Row 2: `` — all zeros, always covered.

**Example 3:**  
Input:  
`matrix = [[1,0,1],[0,1,0],[1,1,1]], numSelect=2`  
Output:  
`2`  
Explanation:  
Pick columns `[0,2]`.  
- Row 1: `[1,0,1]` (all ones at 0,2; both picked, so covered)
- Row 2: `[0,1,0]` (one at 1, which is not picked, so not covered)
- Row 3: `[1,1,1]` (needs all columns, only 0 and 2 picked, so not covered)
Best we can do is cover rows 1 and (always) any all-zero row.

### Thought Process (as if you’re the interviewee)  

First, let's brute force:  
- Try every combination of numSelect columns (there are C(n, numSelect) possibilities).  
- For each combination, check for every row if all 1's are in the selected columns.  
- Count covered rows and record the maximum.

Optimizing:  
- Since n ≤ 12 (as otherwise enumerating all subsets would be infeasible), it's possible to efficiently try all C(n, numSelect) column sets.
- Convert each row to a bitmask — row_mask, where the 1s indicate which columns must be picked.
- For each combination of numSelect columns (use bitmask col_mask), a row is covered if (row_mask & col_mask) == row_mask.
- Count how many rows are covered for each selected col_mask.

This approach is neat with bit operations and precomputing row_masks.

### Corner cases to consider  
- Empty matrix, or no columns.
- numSelect = n: must select all columns (all rows with only 1/0 are covered).
- numSelect = 0: only all-zero rows can be covered.
- All matrix cells are 0: all rows always covered.
- Some rows require more columns than numSelect (impossible to cover).

### Solution

```python
def maximumRows(matrix, numSelect):
    # Number of columns
    n = len(matrix[0])
    m = len(matrix)
    
    # Convert each row to a bitmask of columns where there is a 1
    row_masks = []
    for row in matrix:
        mask = 0
        for j, cell in enumerate(row):
            if cell:
                mask |= (1 << j)
        row_masks.append(mask)

    max_covered = 0

    # Try every combination of numSelect columns (represented as a bitmask)
    for col_mask in range(1 << n):
        # Only consider masks with numSelect set bits
        if bin(col_mask).count('1') != numSelect:
            continue
        covered = 0
        for row_mask in row_masks:
            # All 1s in row must be selected (col_mask covers every 1)
            if (row_mask & col_mask) == row_mask:
                covered += 1
        if covered > max_covered:
            max_covered = covered
    return max_covered
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × 2ⁿ), where n = number of columns, m = rows. For each of 2ⁿ masks, we count covered rows (m operations each). The bit-count check is O(1) for small n.
- **Space Complexity:** O(m), only storing integer masks for each row.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be up to 1000?  
  *Hint: Brute force bitmasking won't be feasible. Can you use greedy or heuristic strategies or change the modeling?*

- How would you return which rows and columns lead to the optimal covering, not just the count?  
  *Hint: Track or store the actual sets alongside the max count.*

- How does the solution change if you are allowed to select at most numSelect columns, not exactly numSelect?  
  *Hint: Try all combinations with ≤ numSelect and maximize.*

### Summary
This solution uses a **bitmasking + combinations** pattern, exploiting the small number of columns to enumerate all possible sets of chosen columns.  
This combinatorial subsetting via bitmask is a common approach for subset selection and "covering" problems when n is small, and is applicable to set cover, scheduling, and assignment problems where the search space can be efficiently represented as bitmasks.