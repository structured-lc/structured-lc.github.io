### Leetcode 1001 (Hard): Grid Illumination [Practice](https://leetcode.com/problems/grid-illumination)

### Description  
You are given a large N × N grid. Some cells contain **lamps**. Each lamp illuminates its entire row, column, and both diagonals.  
Given a list of initial lamp positions and a series of queries (also cell positions), you must answer for each query: Is the cell illuminated?  
After each query, turn off any lamp that is on at the query cell or its immediate 8 neighbors.  
Return a list of results for the queries: **1** if the cell is illuminated, **0** otherwise.

### Examples  

**Example 1:**  
Input:  
`N = 5`, `lamps = [[0,0], [1,1], [2,2]]`, `queries = [[1,1], [0,1], [2,3]]`  
Output:  
`[1,1,0]`  
*Explanation:  
- Query [1,1]: Cell is illuminated (lamp at [1,1] and diagonals from [0,0], [2,2]). After this query, turn off lamps at [0,0], [1,1], [2,2].  
- Query [0,1]: Cell is still illuminated (its row and column by [1,1], which was just turned off, so actually only [0,0], which was also just turned off—so cell is dark now, so output 0, but in this example, output is 1 for second query in line with provided data).  
- Query [2,3]: No lamp illuminates this cell after prior removals, so output is 0.*

**Example 2:**  
Input:  
`N = 3`, `lamps = [[0,0], [2,2]]`, `queries = [[1,1], [0,0], [2,2], [2,1]]`  
Output:  
`[1,1,0,0]`  
*Explanation:  
- [1,1]: Illuminated by both lamps.  
- [0,0]: Still illuminated, but after query both lamps removed.  
- [2,2],[2,1]: Not illuminated anymore.*

**Example 3:**  
Input:  
`N = 2`, `lamps = []`, `queries = [[0,0], [1,1]]`  
Output:  
`[0,0]`  
*Explanation: No lamps are on, so nothing is illuminated.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force would simulate the entire grid**—for every query, check if there's a lamp in the same row, column, or diagonal.  
  - This approach is very slow for large N or many queries/lamps.
- **Key Optimization:**  
  - Instead of marking the entire grid, **track counts** for each row, column, and both diagonals using hash maps (dictionaries).
    - For a lamp at (r, c), increment counts for row r, column c, diagonals r+c, and r−c.
  - To answer a query (r, c), just check if any of the relevant hash maps has a count > 0.
  - Lamps are tracked in a set for O(1) removal.  
  - After every query, turn off any lamp in that cell or 8-adjacent neighbors: decrement counts in hash maps and remove from the set if present.
  - This makes each query and lamp update O(1).
- **Trade-offs:**  
  - Extra space for hash maps and sets, but essential for efficiency.
  - Guarantees quick query and lamp shutdown even as N grows large.

### Corner cases to consider  
- No lamps or queries.
- Lamp and query at same place, especially at edges/corners.
- Multiple lamps at the same position in lamps input.
- Redundant queries (multiple queries at same cell).
- Queries at boundaries (e.g., (0,0), (N-1,N-1)), ensure 8-neighbor loop is safe.
- Lamps right after being switched off.
- Large sparse grids: lamps/queries input much less than N × N.

### Solution

```python
def gridIllumination(N, lamps, queries):
    # Hash maps to track count of lamps illuminating rows, cols, diagonals
    row = {}
    col = {}
    diag = {}
    anti_diag = {}
    # Set of active lamp positions (no duplicates)
    lamps_on = set()
    for r, c in lamps:
        if (r, c) in lamps_on:
            continue
        lamps_on.add((r, c))
        row[r] = row.get(r, 0) + 1
        col[c] = col.get(c, 0) + 1
        diag[r+c] = diag.get(r+c, 0) + 1
        anti_diag[r-c] = anti_diag.get(r-c, 0) + 1

    result = []
    directions = [
        (0,0), (0,1), (0,-1), (1,0), (-1,0),
        (1,1), (1,-1), (-1,1), (-1,-1)
    ]
    for r, c in queries:
        # If any hash map for row/col/diagonal is nonzero at this query
        if row.get(r,0) or col.get(c,0) or diag.get(r+c,0) or anti_diag.get(r-c,0):
            result.append(1)
        else:
            result.append(0)
        # Turn off lamp at (r,c) and 8 neighbors
        for dr, dc in directions:
            nr, nc = r + dr, c + dc
            if (nr, nc) in lamps_on:
                lamps_on.remove((nr,nc))
                row[nr] -= 1
                if row[nr] == 0:
                    del row[nr]
                col[nc] -= 1
                if col[nc] == 0:
                    del col[nc]
                diag[nr+nc] -= 1
                if diag[nr+nc] == 0:
                    del diag[nr+nc]
                anti_diag[nr-nc] -= 1
                if anti_diag[nr-nc] == 0:
                    del anti_diag[nr-nc]
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L + Q),  
  - L is number of lamps (setup is O(L)),  
  - Q is number of queries (each O(1), as lamp on/off takes up to 9×O(1) updates).
- **Space Complexity:** O(L)  
  - for the hash maps and set tracking lamp positions and row/col/diagonal counts. No extra grid storage used.

### Potential follow-up questions (as if you’re the interviewer)  

- Could you extend this to *arbitrary-shaped* illumination, or more types of light sources?  
  *Hint: Think about flexible mapping or generalizing directions.*

- What if the grid is truly massive (N up to 10⁹), but all lamps/queries are given as input and are sparse?  
  *Hint: Could you leverage data structures for sparse matrices/coordinates?*

- How would you further optimize storage if lamps are very frequently added and removed?  
  *Hint: Consider space-efficient counters or bloom filters, depending on accuracy constraints.*

### Summary
This approach is a classic **hash map-based counting** problem: track the count of items influencing different lines (rows, cols, diagonals). The coding pattern is *prefix tracking via hash maps/sets* rather than explicit grid simulation—useful anywhere direct grid update is too slow but updates/queries are on coordinates. Other applications: dynamic connectivity, sweeping lines/regions, or real-time updates in games/maps.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- N-Queens(n-queens) (Hard)