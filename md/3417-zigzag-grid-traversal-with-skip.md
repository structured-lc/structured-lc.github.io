### Leetcode 3417 (Easy): Zigzag Grid Traversal With Skip [Practice](https://leetcode.com/problems/zigzag-grid-traversal-with-skip)

### Description  
You are given an m × n grid of positive integers. Starting from the top-left cell (0, 0), traverse the grid in a zigzag pattern: move right across the first row, then down to the next row and move left, then down again and move right, and so on, alternating directions with each row.

While traversing, you **must skip every alternate cell**—meaning, you pick the first cell, skip the next, then pick the next, and so forth along the traversal order.

Return a list of the values collected during this zigzag traversal with skips.

### Examples  

**Example 1:**  
Input=`[[1,2],[3,4]]`  
Output=`[1,4]`  
*Explanation:*  
Row 0 (left to right): visit 1 (skip 2)  
Row 1 (right to left): visit 4 (skip 3)  
Result = [1, 4]

**Example 2:**  
Input=`[[2,1],[2,1],[2,1]]`  
Output=`[2,1,2]`  
*Explanation:*  
Row 0: visit 2 (skip 1)  
Row 1: visit 1 (skip 2, but since zigzag reverse, first cell at right end)  
Row 2: visit 2 (skip 1)  
Result = [2, 1, 2]

**Example 3:**  
Input=`[[1,2,3],[4,5,6],[7,8,9]]`  
Output=`[1,3,5,7,9]`  
*Explanation:*  
Row 0 (left to right): visit 1, skip 2, visit 3  
Row 1 (right to left): reversed as [6,5,4], visit 5 (skipped 6), skip 4  
Row 2 (left to right): visit 7, skip 8, visit 9  
Result = [1, 3, 5, 7, 9]

### Thought Process (as if you’re the interviewee)  
First, I understand that the traversal is row by row, alternating directions: left-to-right on even rows, right-to-left on odd rows.

Since we need to skip every alternate cell, I can use a boolean flag that toggles with every cell visited to decide whether to pick or skip.

Brute force:

- Iterate each row.
- For odd rows, reverse traversal order.
- Toggle a skip flag per cell, appending values when flag indicates to visit.
- Append to a result list when we visit.

This approach is simple and efficient.

Optimization:

Since the grid size is small (max 50 × 50), simulating the traversal is optimal with O(m*n) time.

Tradeoff:

No extra complex data structures are needed. The boolean toggle helps track skip efficiently.

### Corner cases to consider  
- Grid with only 2 rows, 2 columns (minimum size).
- Rows with an odd vs even number of columns (skipping pattern should still hold).
- All cells have the same value.
- Verifying correct traversal direction flips on each row.
- Ensure skipping starts from the first cell (visit first cell, skip second, etc.).

### Solution

```python
def zigzagGridTraversal(grid):
    result = []
    skip = True  # True means pick cell, False means skip cell
    for i, row in enumerate(grid):
        # Reverse row if odd-indexed row (for right-to-left traversal)
        current_row = row if i % 2 == 0 else row[::-1]
        for val in current_row:
            if skip:
                result.append(val)  # visit this cell
            skip = not skip  # toggle skip flag for alternate skipping
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m * n), where m is number of rows and n is number of columns. We visit each cell exactly once during traversal.
- **Space Complexity:** O(m * n) for storing the result in the worst case (approximately half the cells due to skipping). No additional significant storage used.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the solution if the skipping pattern starts with skipping the first cell instead of visiting it?  
  *Hint: Change initial skip boolean value.*

- What if the traversal is column-wise zigzag instead of row-wise?  
  *Hint: Simulate similarly but iterate columns, toggling row direction on each column.*

- Can you implement the traversal without reversing rows (i.e., using index arithmetic based on direction)?  
  *Hint: Use pointers and direction flags to calculate indices on the fly.*

### Summary
This problem uses a **zigzag traversal** pattern with alternating visit/skip implemented through a boolean toggle. The core coding pattern is simulating traversal direction changes with row reversal and selective cell inclusion. Similar patterns appear in matrix traversal problems where direction toggles, or skipping logic is involved.


### Flashcard
Traverse row-by-row with alternating direction (left-to-right on even rows, right-to-left on odd); toggle a skip flag per cell to select every other element.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Binary Tree Zigzag Level Order Traversal(binary-tree-zigzag-level-order-traversal) (Medium)
- Longest ZigZag Path in a Binary Tree(longest-zigzag-path-in-a-binary-tree) (Medium)