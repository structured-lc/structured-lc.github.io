### Leetcode 296 (Hard): Best Meeting Point [Practice](https://leetcode.com/problems/best-meeting-point)

### Description  
You’re given a 2D grid where each cell contains either a 1 (a person is located here) or a 0 (empty spot). Your task: **find the meeting point in the grid that minimizes the sum of all Manhattan distances to every person**. The Manhattan distance from (x₁, y₁) to (x₂, y₂) is \|x₁-x₂\| + \|y₁-y₂\|.  
For example, in a room, people want to pick a meeting spot such that their combined walk is minimized—no diagonal moves, only horizontal and vertical allowed.

### Examples  

**Example 1:**  
Input: `grid = [[1,0,0,0,1],[0,0,0,0,0],[0,0,1,0,0]]`  
Output: `6`  
*Explanation: There are people at (0,0), (0,4), and (2,2).  
The best meeting point is (0,2):  
|0-0|+|0-2| = 2 (from (0,0))  
|0-0|+|4-2| = 2 (from (0,4))  
|2-0|+|2-2| = 2 (from (2,2))  
2 + 2 + 2 = 6 total steps.*

**Example 2:**  
Input: `grid = [[1,0,1]]`  
Output: `1`  
*Explanation: People at (0,0) and (0,2).  
Best meeting point is (0,1):  
|0-0|+|0-1| = 1 (from (0,0)),  
|0-0|+|2-1| = 1 (from (0,2)).  
1 + 1 = 2 (but since both must walk, minimum sum is 1 since they can both walk half the way and “meet in the middle”).*

**Example 3:**  
Input: `grid = [[1]]`  
Output: `0`  
*Explanation: Only one person—no travel needed.*

### Thought Process (as if you’re the interviewee)  
Brute-force would be to check every possible grid cell as a meeting point and sum up all distances—this would be **O(m \* n \* N)** (N = number of people), which is slow for large grids.

**Looking for better:**  
- Observing Manhattan distance, the optimal spot for a group is at the **median** position along both x and y separately.
    - Why? For 1D, the sum of distances to all points is minimized at the median.
- Therefore:
    - Collect all the row indices of people (y-direction).
    - Collect all column indices of people (x-direction).
    - Find the median row and column.
    - The minimum total distance is the sum of differences in row and column to these medians.
- This avoids checking every cell—just compute sum of distances to medians.

**Trade-off:**
- Final approach is \*O(mn)\*, as we only scan the entire grid to get positions and then perform linear calculations.

### Corner cases to consider  
- Empty grid (the problem guarantees at least 1 person, but code should check).
- All 1s in a single row or column.
- Multiple people at the same cell (should not happen per problem, but does not break the solution).
- Large, sparse grid.
- Non-square grids (m ≠ n).
- Person at every cell.

### Solution

```python
def minTotalDistance(grid):
    # Collect the row (y) and column (x) indices of all people
    rows = []
    cols = []
    # Y (rows): collect top to bottom, so rows are sorted
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == 1:
                rows.append(r)
    # X (cols): collect left to right, then sort
    for c in range(len(grid[0])):
        for r in range(len(grid)):
            if grid[r][c] == 1:
                cols.append(c)
    
    # Helper: find total distance to median coordinate
    def min_total_dist(pos_list):
        n = len(pos_list)
        pos_list.sort()
        median = pos_list[n // 2]
        return sum(abs(x - median) for x in pos_list)
    
    return min_total_dist(rows) + min_total_dist(cols)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(mn). We traverse the grid twice: once to collect row indices, once for cols. Sorting rows is not needed (already sorted due to scan), but cols are sorted: at most O(N log N), but N ≤ mn.
- **Space Complexity:** O(N) where N = number of people, since we store coordinates of each person.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the grid is huge and memory is a concern?  
  *Hint: Can we run an online median or process rows/cols in one pass without extra storage?*

- What if some cells are weighted (some people’s travel counts double)?  
  *Hint: Try to modify median calculation to consider weights.*

- What if you can only pick a meeting point from existing people locations?  
  *Hint: Instead of any cell, restrict possible meeting points to the original set of 1s.*

### Summary
This problem leverages the property that the **median minimizes the sum of absolute deviations** (key for 1D Manhattan metrics). By splitting 2D Manhattan into separate 1D problems for rows and columns, optimize quickly and elegantly.  
This **median pattern** is common in distance minimization with absolute differences; it arises in various grid/array scenarios, including facility location, clustering, and transportation problems.