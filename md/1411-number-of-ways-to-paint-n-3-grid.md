### Leetcode 1411 (Hard): Number of Ways to Paint N × 3 Grid [Practice](https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid)

### Description  
You have a grid with n rows and 3 columns. Each cell is painted using one of 3 colors. No two adjacent cells (horizontally or vertically) can have the same color. Return the number of possible ways to paint the grid, modulo 10⁹+7.

### Examples  
**Example 1:**  
Input: `n = 1`  
Output: `12`  
*Explanation: Row 1 (3 cells), each adjacent pair must differ, so possible colorings: 6 for ABC and 6 for ABA type, total 12.*

**Example 2:**  
Input: `n = 2`  
Output: `54`  
*Explanation: Drawing all arrangements for 2 rows and 3 columns that satisfy adjacency rules gives 54 combinations.*

**Example 3:**  
Input: `n = 5000`
Output: `30228214`  
*Explanation: Large n, answer returned mod 10⁹+7.*

### Thought Process (as if you’re the interviewee)  
This is a classic dynamic programming/grid coloring problem. First, analyze possible color patterns for a single row of 3 columns with no adjacent same colors. There are 6 colorings where all 3 colors are different (Type1: ABC), and 6 where two colors alternate (Type2: ABA). For row i, the coloring must be compatible with previous row (no vertical color matches). Use state compression: keep count of current row's arrangements by pattern type, and for each new row, compute new counts from previous counts and number of transitions allowed. Precompute the transitions between pattern types. Recurrence: track [Type1, Type2] for each row.

### Corner cases to consider  
- n = 1 (base case manual count)
- Very large n (must use DP, and take modulo at each step)
- Edge case: minimum n, all constraints still enforced

### Solution

```python
def numOfWays(n):
    MOD = 10**9 + 7
    # For a single row, two arrangements:
    #    - Type1: 3 adjacent colors different (ABC) → 6 ways
    #    - Type2: 2 adjacent same, 1 different (ABA) → 6 ways
    type1 = 6
    type2 = 6
    for _ in range(n - 1):
        # Next type1: can be formed from (type1 * 2 + type2 * 2)
        # Next type2:    (type1 * 2 + type2 * 3)
        new_type1 = (type1 * 2 + type2 * 2) % MOD
        new_type2 = (type1 * 2 + type2 * 3) % MOD
        type1, type2 = new_type1, new_type2
    return (type1 + type2) % MOD
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), as for each row we perform a constant number of calculations.
- **Space Complexity:** O(1), only a constant number of variables needed (state compression).

### Potential follow-up questions (as if you’re the interviewer)  
- What if k colors (instead of 3) are allowed?  
  *Hint: Extend state to allow more coloring patterns, transition matrix grows with k.*

- How would you code this for a general m-column grid?  
  *Hint: Use state DP, each possible row coloring is a state, cached and transitioned using bitmask or array DP.*

- Can you print all possible grids for a small n, e.g., n = 2?  
  *Hint: Backtracking/generate and filter by adjacency.*

### Summary
This problem is a typical 2D grid coloring DP with adjacent constraints, compressed to small state variables by observing the structure. The approach generalizes to more colors or columns, using state DP and pattern transitions, a key dynamic programming pattern in grid/graph problems.


### Flashcard
Use dynamic programming to track possible color patterns for each row, ensuring no vertical color matches with the previous row.

### Tags
Dynamic Programming(#dynamic-programming)

### Similar Problems
- Painting a Grid With Three Different Colors(painting-a-grid-with-three-different-colors) (Hard)