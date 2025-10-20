### Leetcode 2500 (Easy): Delete Greatest Value in Each Row [Practice](https://leetcode.com/problems/delete-greatest-value-in-each-row)

### Description  
Given a m × n matrix of positive integers, repeatedly remove the greatest element from each row, and after each such operation, record the maximum of those deleted values. Continue this process until the matrix is empty (all columns are deleted). The result is the total of all maximums recorded.  
In every round, the matrix loses 1 column, and for each row, we always remove its largest remaining value.  
Return the sum of all recorded maximums.

### Examples  

**Example 1:**  
Input: `grid = [[1,2,4],[3,3,1]]`  
Output: `8`  
*Explanation:  
- 1st round: delete 4 from [1,2,4], 3 from [3,3,1] → values deleted: [4,3]. Max = 4.  
- 2nd round: delete 2 from [1,2], 3 from [3,1] → values deleted: [2,3]. Max = 3.  
- 3rd round: delete 1 from [1], 1 from [1] → values deleted: [1,1]. Max = 1.  
-> Total: 4 + 3 + 1 = 8.*

**Example 2:**  
Input: `grid = []`  
Output: `10`  
*Explanation: Only one element, deleted once: . Max = 10.*

**Example 3:**  
Input: `grid = [[5,5,5],[5,5,5]]`  
Output: `15`  
*Explanation:  
- Each round: both rows delete 5.  
- Three rounds: max is always 5. Total: 5 + 5 + 5 = 15.*

### Thought Process (as if you’re the interviewee)  
- **Naive approach:** For each column, repeatedly scan each row for its max, delete it, then scan the deleted candidates to get the round max. This would be O(m×n²), which is too slow.
- **Observation:** Since we delete the largest remaining element from each row per round, if we sort each row once in ascending order, the last element is always the one to delete in each round.
- **Optimized plan:**  
  - First, sort every row.
  - Then for each column (from rightmost to leftmost), collect the values at that column index in all rows (i.e., all largest, 2nd largest, etc.).
  - For each column index, the maximum among these is what to add to the answer.
- **Trade-offs:**  
  - Sorting each row costs O(n log n). But after that, each round just needs to read from each row (O(m)), and we've reduced the need to delete or scan manually.
  - Resulting overall time: O(m n log n) due to sorting rows.

### Corner cases to consider  
- Only one row or one column.
- Duplicate values in rows (should still pick the largest).
- All values are equal.
- Empty grid (not specified in problem, but should return 0).
- Very large numbers, check for overflow (but within int limits).

### Solution

```python
def deleteGreatestValue(grid):
    # Sort each row ascending: largest is always at the end of the row 
    for row in grid:
        row.sort()
    answer = 0
    n_cols = len(grid[0])
    # For each column (from last to first, i.e., largest to smallest in sorted rows)
    for j in range(n_cols-1, -1, -1):
        max_val = 0
        # Find the largest value among all rows at this column
        for i in range(len(grid)):
            val = grid[i][j]
            if val > max_val:
                max_val = val
        answer += max_val
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n log n)  
  Each of m rows is sorted (O(n log n)), and then for each column (n total), we find the max entry in that column across m rows (O(mn)), but sorting dominates.
- **Space Complexity:** O(1) extra (if sorting in place; O(n) if not), except for input storage.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if rows can differ in length?  
  *Hint: You may need to pad rows or handle missing elements at each round.*

- How to do this in-place and with minimal extra memory?  
  *Hint: Use in-place sorting, avoid extra structures.*

- If you had to return the list of maximums at each round instead of their sum, how would you modify your code?  
  *Hint: Keep an array of answers, append max at each round.*

### Summary
The problem uses the **matrix sorting and column-wise maximum extraction** pattern. By sorting each row, the largest to delete appears at the end of the row for each round, turning the iterative process into efficient column max checks. This is similar to problems where repeated max/min extraction by round is needed, often seen in simulation or greedy array game problems.


### Flashcard
Sort each row, then sum the max of each column (transposed view) – after sorting, column i contains the iᵗʰ largest from each row.

### Tags
Array(#array), Sorting(#sorting), Heap (Priority Queue)(#heap-priority-queue), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Equal Row and Column Pairs(equal-row-and-column-pairs) (Medium)