### Leetcode 1476 (Medium): Subrectangle Queries [Practice](https://leetcode.com/problems/subrectangle-queries)

### Description  
Design a class to efficiently handle multiple operations of: updating all elements in a subrectangle (given by its upper left and lower right coordinates) to some value, and retrieving the value of any matrix coordinate after these updates.

### Examples  
**Example 1:**  
Input: `[[1,2,1],[4,3,4],[3,2,1],[1,1,1]]`, updates: `subrectangleQueries(0,0,3,2,5)`, query: `getValue(0,2)`  
Output: `5`  
*Explanation: The entire column updated to 5; retrieving the coordinate returns 5.*

**Example 2:**  
Input: `[[1,1,1],[2,2,2],[3,3,3]]`, updates: `subrectangleQueries(0,0,2,2,100)`, then `subrectangleQueries(1,1,2,2,20)`, query: `getValue(2,2)`  
Output: `20`  
*Explanation: Last update covers (2,2), so value is 20.*

**Example 3:**  
Input: `[[5]]` updates: `subrectangleQueries(0,0,0,0,99)`, query: `getValue(0,0)`  
Output: `99`  
*Explanation: Single element matrix checks basic case.*

### Thought Process (as if you’re the interviewee)  
We want fast subrectangle updates and random cell lookup. The brute-force idea is: for each update, touch every matrix cell in the subrectangle; this is slow for many updates/large matrices.

To optimize, *log* each update as a tuple `(row1, col1, row2, col2, val)`. For `getValue(i,j)`, walk backward in the updates array to find the first update covering that cell. If none, return matrix[i][j]. This is efficient if the number of updates isn’t too large.

### Corner cases to consider  
- Overlapping updates — ensure the latest override is returned
- getValue outside of any updated area — return original matrix value
- Entire matrix updates
- Multiple getValue calls

### Solution

```python
class SubrectangleQueries:
    def __init__(self, rectangle):
        self.rect = [row[:] for row in rectangle]
        self.updates = []  # store (row1, col1, row2, col2, value)

    def subrectangleUpdate(self, row1, col1, row2, col2, value):
        self.updates.append((row1, col1, row2, col2, value))

    def getValue(self, row, col):
        # Check from last update backwards
        for r1, c1, r2, c2, v in reversed(self.updates):
            if r1 <= row <= r2 and c1 <= col <= c2:
                return v
        return self.rect[row][col]
```

### Time and Space complexity Analysis  
- **Time Complexity:**
  - subrectangleUpdate: O(1) per update
  - getValue: O(U), U = times update called, as search all updates (worst)
- **Space Complexity:** O(U + M \* N), store all updates and copy of matrix

### Potential follow-up questions (as if you’re the interviewer)  
- How to speed up getValue if updates list becomes very large?  
  *Hint: Data structures like segment trees, or only store incremental deltas if possible.*
- Could you support range sum queries?  
  *Hint: Use prefix sums with delta arrays.*
- What if you must support undo (rollback) for updates?  
  *Hint: Remove from updates array, or maintain a stack.*

### Summary
This problem is about balancing update and query efficiency, a hallmark of 2D range query/interview patterns. Logging updates is ideal when updates far outnumber queries; segment trees or 2D difference techniques are used for more frequent/demanding queries.

### Tags
Array(#array), Design(#design), Matrix(#matrix)

### Similar Problems
