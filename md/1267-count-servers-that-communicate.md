### Leetcode 1267 (Medium): Count Servers that Communicate [Practice](https://leetcode.com/problems/count-servers-that-communicate)

### Description  
You are given a **m × n** grid. Each cell is either empty (0) or contains a server (1). A server can **communicate** with another server if they are in **the same row or same column**. Count the total number of servers that can communicate with at least one other server.

### Examples  
**Example 1:**  
Input: `grid = [[1,0],[0,1]]`  
Output: `0`
*Explanation: Each server is alone in its row and column, so none can communicate.*

**Example 2:**  
Input: `grid = [[1,0],[1,1]]`  
Output: `3`
*Explanation: 3 servers out of 3 can communicate; the server at (1,1) can communicate with both in its row and column.*

**Example 3:**  
Input: `grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0]]`  
Output: `4`
*Explanation: Servers at (0,0),(0,1)—row; (1,2),(2,2)—column. All can communicate.*

### Thought Process (as if you’re the interviewee)  
First, count the number of servers in each row and each column. Then, any server located in a row or column **with more than one server** can communicate. Iterate the grid, and for every server, if the server's row count or column count is greater than one, count it as communicating.

### Corner cases to consider  
- Only one server in the grid
- Multiple servers in non-overlapping rows/columns
- All servers on a single row or single column
- Large, mostly empty grids

### Solution

```python
def countServers(grid):
    m, n = len(grid), len(grid[0])
    row_count = [0] * m
    col_count = [0] * n

    # Count servers in each row and column
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                row_count[i] += 1
                col_count[j] += 1

    total = 0
    # Count servers that can communicate
    for i in range(m):
        for j in range(n):
            if grid[i][j] == 1:
                if row_count[i] > 1 or col_count[j] > 1:
                    total += 1
    return total
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m × n) — Must scan every cell twice
- **Space Complexity:** O(m + n) — For storing row and column counts

### Potential follow-up questions (as if you’re the interviewer)  
- What if you wanted to find all clusters of communicating servers?  
  *Hint: Use DFS/BFS to find connected groups.*

- How would the answer change if communication could go diagonally?  
  *Hint: Count diagonals with similar logic.*

- Is it possible to optimize for very sparse grids?  
  *Hint: Use hashmap to store only rows/columns with servers.*

### Summary
This problem demonstrates the **row/column aggregation** pattern, counting and then filtering based on those aggregates. Similar logic appears in problems about friends of friends, 2D grouping, or matrix-wide connectivity.

### Tags
Array(#array), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search), Union Find(#union-find), Matrix(#matrix), Counting(#counting)

### Similar Problems
