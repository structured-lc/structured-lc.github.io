### Leetcode 2732 (Hard): Find a Good Subset of the Matrix [Practice](https://leetcode.com/problems/find-a-good-subset-of-the-matrix)

### Description  
Given a 0-indexed m × n binary matrix grid, find a **non-empty subset of rows** (indices in ascending order) such that for every column, the sum of values in that column over the selected rows is ≤ ⌊k/2⌋, where k is the number of selected rows.  
If there are multiple good subsets, return any one. If there is none, return an empty array.

### Examples  

**Example 1:**  
Input: `grid = [[0,1,1,0],[0,0,0,1],[1,1,1,1]]`  
Output: `[0,1]`  
*Explanation: Pick rows 0 and 1:  
- col 0: 0+0 = 0 ≤ 1  
- col 1: 1+0 = 1 ≤ 1  
- col 2: 1+0 = 1 ≤ 1  
- col 3: 0+1 = 1 ≤ 1  
Subset size = 2, ⌊2/2⌋ = 1.*

**Example 2:**  
Input: `grid = [[1,1,0],[0,1,0],[0,0,0]]`  
Output: `[1,2]`  
*Explanation: Rows 1 and 2:  
- col 0: 0+0 = 0 ≤ 1  
- col 1: 1+0 = 1 ≤ 1  
- col 2: 0+0 = 0 ≤ 1  
Subset size = 2.*

**Example 3:**  
Input: `grid = [[1,1,1],[1,1,1],[1,1,1]]`  
Output: `[]`  
*Explanation: Any non-empty subset will have a column sum > ⌊k/2⌋ (since all elements are 1), so no good subset exists.*

### Thought Process (as if you’re the interviewee)  
First, brute-force would be to try all non-empty subsets of rows (up to 2ᵐ - 1 subsets). For each subset, compute the sum for each column and check if all column sums ≤ ⌊k/2⌋.  
However, this is exponential in m (bad for large m, e.g. m=100). We need a faster approach.

Key insight:  
- Each row can be represented as a bitmask of its columns (e.g., [0,1,1] ⇒ 110).
- If any row is all zeros, its own index forms a good subset (because all column sums are zero).
- If there are only 5 columns, then only 32 possible row bitmasks.  
- Try all pairs of different bitmasks (or even up to three rows), since the constraints are tight for n ≤ 5.
- For each candidate subset, test the column sums against ⌊k/2⌋.

So, optimize by:
- Return [i] if a row of all zeros exists.
- For each pair of rows, check if in every column at most one is '1' ⇒ sum for each column ≤ 1 when k=2 (since ⌊2/2⌋=1).
- If no pair found, empty array.

This approach is optimal because constraints limit n to 5, allowing us to enumerate all patterns and all row pairs quickly.

### Corner cases to consider  
- Matrix with only one row  
- All rows are all 1s  
- A row of all zeros  
- Empty grid (if allowed)  
- Multiple rows are exactly the same  
- No valid subsets exist

### Solution

```python
def findGoodSubset(grid):
    m, n = len(grid), len(grid[0])

    # Map row bitmask to list of indices with that pattern
    bitmask_to_indices = {}

    for i, row in enumerate(grid):
        bitmask = 0
        for val in row:
            bitmask = (bitmask << 1) | val
        bitmask_to_indices.setdefault(bitmask, []).append(i)

    # Step 1: Check for zero row (all elements 0) -- bitmask 0
    if 0 in bitmask_to_indices:
        # Any single zero row is a valid good subset
        return [bitmask_to_indices[0][0]]

    # Step 2: Check all pairs of row bitmasks
    masks = list(bitmask_to_indices.keys())
    for i in range(len(masks)):
        for j in range(i, len(masks)):
            # In every column, the count of '1's among the two rows should be ≤ 1
            if (masks[i] & masks[j]) == 0:
                # Pick one row from each pattern
                first = bitmask_to_indices[masks[i]][0]
                second = bitmask_to_indices[masks[j]][0]
                if first != second:
                    return sorted([first, second])
                elif len(bitmask_to_indices[masks[i]]) > 1:
                    # If both indices are same, pick two different rows with this pattern
                    return sorted(bitmask_to_indices[masks[i]][:2])

    # No good subset found
    return []
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m \* 2ⁿ), m = number of rows, n = number of columns (≤5). This is due to constructing bitmask to indices and checking all bitmask pairs (up to 32 masks).
- **Space Complexity:** O(m), for mapping each bitmask to row indices (since the number of unique masks is ≤ 32, but the values in each map can total to m).

### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be up to 10⁵?  
  *Hint: Can you still use the bitmask trick?*

- Can you extend to allow at most t ones per column?  
  *Hint: What structural property is critical to your solution?*

- How would you adapt the solution if the input is not binary?  
  *Hint: What fails if elements are >1, and how can you use counting?*

### Summary
This problem uses the **bitmask** and **bitwise operations** pattern, exploiting small n (≤5) to try all two-row combinations efficiently.  
The key is recognizing the constraint on column sums and leveraging binary properties.  
This technique is broadly useful anywhere substructures are small and combinatorially search is warranted, e.g., other coding problems with tight constraints on binary arrays or feature activation.