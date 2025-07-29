### Leetcode 3122 (Medium): Minimum Number of Operations to Satisfy Conditions [Practice](https://leetcode.com/problems/minimum-number-of-operations-to-satisfy-conditions)

### Description  
Given an m × n grid of integers (each integer in 0..9), you may perform operations where you change any cell’s value to any non-negative number. Your goal is to transform the grid so that:
- Every cell is **equal to the cell below it** (if there is one), and
- Every cell is **different from the cell to its right** (if there is one).

Return the minimum number of operations required to achieve this.

### Examples  

**Example 1:**  
Input: `[[1,0,2],[1,0,2]]`  
Output: `0`  
Explanation:  
All adjacent vertical cells are equal and every horizontal pair is unequal, so no operations needed.

**Example 2:**  
Input: `[[1,1,1],[0,0,0]]`  
Output: `3`  
Explanation:  
We can make the matrix `[[1,0,1],[1,0,1]]` with these 3 operations:  
- Change grid[1] to 1  
- Change grid[1] to 0  
- Change grid[1][2] to 1

**Example 3:**  
Input: `[[1],[2],[3]]`  
Output: `2`  
Explanation:  
There is only one column; all cells in a column must be equal. Make both grid[1] and grid[2] become 1
(operations: grid[1]=1, grid[2]=1).

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  Try all possible combinations of values for each cell to satisfy the conditions, but since the grid can be 1000 × 1000, this approach is infeasible.

- **Observation:**  
  The first condition forces every **column** to have all **equal values** (because, for every row, it must match the cell below if it exists).  
  The second condition says every **adjacent column** must have **different values** in every row.

- **Optimization:**  
  Since allowed values are 0..9 (only 10 possibilities), we can define the problem as assigning to each column a single digit (since all cells in a column must have the same value), with the constraint that adjacent columns differ.

- **Dynamic Programming Approach:**  
  - Let dp[j][d]: minimum operations to assign value d to column j, with the constraints.
  - For each column:
    - For each possible digit assignment d (0..9):
      - For each previous column's digit assignment d', where d ≠ d':
        - dp[j][d] = min over d' ≠ d of (dp[j-1][d'] + cost_to_make_col_j_all_d)
  - Base case: for first column, just the cost to make all of col 0 be d.
  - The answer is min over digits d of dp[n-1][d].

- **Trade-off:**  
  This leverages the small range of cell values, using O(n \* 10) state and O(m\*n) work per state—very efficient.

### Corner cases to consider  
- Only one row or only one column (makes one of the conditions vacuous)
- All elements already satisfy the conditions (output should be 0)
- All elements are the same (need to alternate to get adjacent columns different)
- Maximum grid sizes to check efficiency
- Grid values not in [0,9] (input guarantees this—no need)

### Solution

```python
def minimumOperations(grid):
    m = len(grid)
    n = len(grid[0])

    # Precompute, for each column and each possible value v,
    # the cost to make the entire column have value v.
    cost = [[0]*10 for _ in range(n)]
    for j in range(n):
        for v in range(10):
            # For column j, cost to paint all cells to value v
            res = 0
            for i in range(m):
                if grid[i][j] != v:
                    res += 1
            cost[j][v] = res

    # dp[j][v]: min operations to make the first j+1 columns,
    # ending with column j all being value v (and previous col has a different value)
    dp = [ [float('inf')]*10 for _ in range(n) ]
    # Initialize for col 0 (no left neighbor constraint)
    for v in range(10):
        dp[0][v] = cost[0][v]

    for j in range(1, n):
        for v in range(10):
            for v_prev in range(10):
                if v != v_prev:
                    dp[j][v] = min(dp[j][v], dp[j-1][v_prev] + cost[j][v])

    return min(dp[n-1])
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m × n × 10):  
  - For precomputing costs: O(m × n × 10)
  - For DP: Each of n columns, for each of 10 possible digits, look at previous 9 digits (v_prev ≠ v): O(n × 10 × 10)
  - As m, n ≤ 1000 and 10 is fixed, this is efficient.

- **Space Complexity:**  
  O(n × 10):  
  - Need to store DP table (n columns × 10 possible values per column).
  - Cost table is also O(n × 10).

### Potential follow-up questions (as if you’re the interviewer)  

- How would this change if the allowed set of values was not bounded (e.g., up to 10⁹)?
  *Hint: Think about viability of the DP’s state-space size.*

- What if you had to minimize the number of *distinct* values used across the whole grid?
  *Hint: Consider coloring/graph approaches or greedy assignment.*

- Suppose you could only increase (or only decrease) cell values — not set arbitrarily. How would you adapt the algorithm?
  *Hint: The cost function for a column would need to respect the monotonicity constraint.*

### Summary
The problem reduces to **column-wise coloring with an adjacency constraint**, using a small fixed palette. This is a classic **dynamic programming with state compression** pattern, where states represent per-column value choices. Variations of this approach appear in painting, scheduling, and grid tiling problems where adjacent elements face a constraint. Efficiently leveraging a small state domain is key.