### Leetcode 3256 (Hard): Maximum Value Sum by Placing Three Rooks I [Practice](https://leetcode.com/problems/maximum-value-sum-by-placing-three-rooks-i)

### Description  
Given an m × n chessboard board, where board[i][j] is the integer value of cell (i, j), place **three rooks** such that **no two rooks are in the same row or column** (otherwise they attack each other). Return the **maximum total value** you can obtain by placing three such non-attacking rooks.

### Examples  

**Example 1:**  
Input: `board = [[5,3,1],[4,2,8],[7,6,9]]`  
Output: `22`  
*Explanation: Place rooks at (0,0), (1,2), and (2,1) → values 5 + 8 + 9 = 22 (or other maximal placement).*

**Example 2:**  
Input: `board = [[-2,1],[10,-3],[5,2]]`  
Output: `17`  
*Explanation: Place at (1,0), (2,1), and (0,1): 10 + 2 + 1 = 13, but 10 + 5 + 2 = 17. Pick (1,0), (2,0), (0,1).*

**Example 3:**  
Input: `board = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]]`  
Output: `33`  
*Explanation: One way: (3,2):12 + (2,1):8 + (1,0):4 = 24; but optimal is (3,2):12 + (2,0):7 + (1,1):5 + (0,0):1, but only 3 allowed, so best is 12+11+10=33 (using bottom row only).*

### Thought Process (as if you’re the interviewee)  
- First, observe constraints: we need to choose 3 cells — each in a different row and different column.
- Brute-force: Try all possible sets of 3 different rows and all possible sets of 3 different columns, and for each, try all permutations (i.e., mappings between rows and columns), then sum board[r₁][c₁] + board[r₂][c₂] + board[r₃][c₃].
- For each of the ⌊m⌋ rows and ⌊n⌋ columns, number of ways is C(m,3) × C(n,3) × 3! (for assignments), and this is feasible for small boards (since the problem statement hints brute-force is acceptable for first version).
- So: enumerate all triplets of rows and all triplets of columns, compute the sum for all 3! = 6 possible assignments, and keep the maximum total.
- There are no “clever” interferences—since rook constraints are strictly 1 per row and column, this is a classic assignment problem for k=3.
- Code will loop over all combinations of rows and columns, and for each, all permutations of assignments. Store maximum sum.

### Corner cases to consider  
- Board contains negative numbers: optimal may skip highest-absolute value cell if it's negative.
- m < 3 or n < 3: cannot place 3 non-attacking rooks, should return 0 or handle as invalid input.
- Multiple positions with same value in a given row/column.
- Large range of cell values (e.g., very negative and very positive).
- Board is not square (rectangular boards).

### Solution

```python
from itertools import combinations, permutations

def maximumValueSum(board):
    m, n = len(board), len(board[0])
    if m < 3 or n < 3:
        return 0

    max_total = float('-inf')
    # All combinations of 3 different row indices
    for row_indices in combinations(range(m), 3):
        # All combinations of 3 different column indices
        for col_indices in combinations(range(n), 3):
            # Try all mappings from chosen rows to columns (3! permutations)
            for perm in permutations(col_indices):
                total = 0
                for ri, ci in zip(row_indices, perm):
                    total += board[ri][ci]
                if total > max_total:
                    max_total = total
    return max_total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m³ × n³). For every C(m,3) triplet of rows and C(n,3) triplet of columns, try 3! = 6 assignments. For m, n ≤ 50 (reasonable for hard brute-force), this is ~5 million iterations.
- **Space Complexity:** O(1) extra (ignoring input), as we only keep the current maximum sum.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to **maximize the sum by placing k rooks, not just 3**?
  *Hint: Try to generalize your approach. Can you use dynamic programming or combinatorial optimization?*

- How would you solve this if the board was particularly **sparse or very large**, making O(m³n³) infeasible?
  *Hint: Can you prune branches, use greedy, or model as a max-weight matching problem?*

- Instead of maximizing, **count the number of distinct ways** to place 3 non-attacking rooks with maximum total sum.
  *Hint: Carefully track all optimal assignments, not just the sum.*

### Summary
This is a classic combinatorial optimization problem — an application of the “assignment” pattern, simplified to small k=3. The brute-force tries all valid row and column selections and assignments (bijections), which is feasible for small inputs. This approach can be generalized: for k rooks it's fundamentally the max-sum assignment problem (can be solved by Hungarian algorithm for larger k). This brute-force + permutations trick is common in interview questions with very small k — look for problems saying “pick k non-conflicting elements” and ask if you can try all C(n,k) × k! possibilities when k is small!

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Matrix(#matrix), Enumeration(#enumeration)

### Similar Problems
- Available Captures for Rook(available-captures-for-rook) (Easy)