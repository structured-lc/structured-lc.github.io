### Leetcode 1253 (Medium): Reconstruct a 2-Row Binary Matrix [Practice](https://leetcode.com/problems/reconstruct-a-2-row-binary-matrix)

### Description  
Given three integers: `upper`, `lower`, and an array `colsum`, reconstruct a 2-row binary matrix (each entry is 0 or 1) where:
- The sum of the first row is `upper`.
- The sum of the second row is `lower`.
- For each column i, the sum of both rows at that column is exactly `colsum[i]`.

If there are multiple solutions, return any. If no solution exists, return an empty list.

Return as a list of two lists (rows).

### Examples  
**Example 1:**  
Input: `upper = 2, lower = 1, colsum = [1,1,1]`
Output: `[[1,1,0], [0,0,1]]`
*Explanation: Top row sums to 2, bottom to 1; each column sums to 1 without violating rules.*

**Example 2:**  
Input: `upper = 2, lower = 3, colsum = [2,2,1,1]`
Output: `[]`
*Explanation: Not possible as the required sums exceed the available row totals.*

**Example 3:**  
Input: `upper = 2, lower = 1, colsum = [2,1,1,0]`
Output: `[[1,1,0,0],[1,0,1,0]]`
*Explanation: Both rows sum correctly and match column constraints.*


### Thought Process (as if you’re the interviewee)  
We need to fill a 2×n binary matrix such that 1st row sums to upper, 2nd to lower, and the addition of each column equals colsum[i].
- If `colsum[i]` is 2, both positions in column i must be 1. Subtract one from both upper and lower.
- If `colsum[i]` is 1, put 1 in the row with the larger remaining quota (greedy); assign to top if upper > 0, else to bottom.
- If `colsum[i]` is 0, both entries must be 0.

Validate at the end that both upper and lower are zero. If not, return [].

### Corner cases to consider  
- upper and/or lower is zero
- Sum of colsum does not match upper + lower
- colsum contains invalid values (other than 0,1,2)
- Impossible assignment (not enough quota in rows)

### Solution

```python
def reconstructMatrix(upper, lower, colsum):
    n = len(colsum)
    res = [[0] * n for _ in range(2)]
    for i in range(n):
        if colsum[i] == 2:
            res[0][i] = 1
            res[1][i] = 1
            upper -= 1
            lower -= 1
        elif colsum[i] == 1:
            # Assign to upper if possible, else lower
            if upper > lower:
                res[0][i] = 1
                upper -= 1
            else:
                res[1][i] = 1
                lower -= 1
        # else: both remain 0
        if upper < 0 or lower < 0:
            return []
    if upper == 0 and lower == 0:
        return res
    return []
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), as we process each column exactly once.
- **Space Complexity:** O(n), for the result matrix layout.

### Potential follow-up questions (as if you’re the interviewer)  
- What if more than two rows are required?
  *Hint: Generalize the approach per row, using quotas.*

- How would you enumerate all possible valid matrices?
  *Hint: Use backtracking, filling cells and checking quotas recursively.*

- What if you must return the lex smallest matrix?
  *Hint: Fill top row greedily left to right whenever possible.*

### Summary
This is a greedy construction problem based on column-wise assignment and matching row sums. It's a unique but instructive example of constraint satisfaction seen in matrix or grid setting.

### Tags
Array(#array), Greedy(#greedy), Matrix(#matrix)

### Similar Problems
- Find Valid Matrix Given Row and Column Sums(find-valid-matrix-given-row-and-column-sums) (Medium)