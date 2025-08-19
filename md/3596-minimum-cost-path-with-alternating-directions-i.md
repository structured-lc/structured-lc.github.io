### Leetcode 3596 (Medium): Minimum Cost Path with Alternating Directions I [Practice](https://leetcode.com/problems/minimum-cost-path-with-alternating-directions-i)

### Description  
Given a grid (`cost`) of size m × n where each cell (i, j) has an associated cost, you start at the top-left cell (0, 0) and need to reach the bottom-right cell (m-1, n-1).  
You can move **either right or down** at each step, but with the following twist:

- On **odd-numbered moves**, you may only move **right** (→).
- On **even-numbered moves**, you may only move **down** (↓).

That is, your first move can only be right, the second can only be down, third right, fourth down, etc.  
You must pay the cost of every cell you enter, including the starting and ending cells.  
Return the minimum total cost needed to reach the bottom-right cell using these alternating moves.

### Examples  

**Example 1:**  
Input: `cost = [[1,2,3],[4,5,6],[7,8,9]]`  
Output: `21`  
*Explanation: You must alternate right and down, starting with right. Path is (0,0)→(0,1)→(1,1)→(1,2)→(2,2); sum is 1+2+5+6+9=23. However, with strict alternation, the only way is (0,0)→(0,1)→(1,1)→(1,2)→(2,2). There's actually only one valid path, sum is 1+2+5+6+9=23.*

**Example 2:**  
Input: `cost = [[2,3],[1,4]]`  
Output: `9`  
*Explanation: Valid path is (0,0)→(0,1)→(1,1), cost = 2+3+4=9.*

**Example 3:**  
Input: `cost = [[5]]`  
Output: `5`  
*Explanation: Only one cell, so the minimum cost is the cell itself.*

### Thought Process (as if you’re the interviewee)  
Start by noticing the restriction:  
- First move is always right.
- Then always down, then right, then down, alternating.

That means the **path is fixed based on the size of the grid**. For a m × n grid, we can only take at most min(m, n) - 1 steps, and the moves always alternate.

Brute force would try all possible paths, but under these move constraints, there’s often only **a single valid alternating path** (or none, if the grid size doesn’t match the number of required right/down steps).

Thus, the problem boils down to:  
- **Walk right, down, right, down,...** until reaching (m-1, n-1), starting at (0,0).
- At each step, if the next move (right/down) goes out of bounds, it’s not possible.

So, simulate the movement and sum the cost, returning -1 if at any point we can't move (out of bounds).

### Corner cases to consider  
- Grid with only one cell.
- Grid with a row only (m=1), can only move right.
- Grid with a column only (n=1), can only move down.
- If grid size does not allow alternating moves to reach (m-1, n-1).
- Large grids for performance.

### Solution

```python
def minCostPathWithAlternatingDirections(cost):
    m = len(cost)
    n = len(cost[0])
    i, j = 0, 0
    total = cost[0][0]
    move_right = True  # first move is right
    while (i, j) != (m - 1, n - 1):
        if move_right:
            if j + 1 < n:
                j += 1
            else:
                return -1  # cannot move right, failed to reach end
        else:
            if i + 1 < m:
                i += 1
            else:
                return -1  # cannot move down, failed to reach end
        total += cost[i][j]
        move_right = not move_right  # alternate move
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(steps), where steps ≤ m + n (worst case must go along boundary).  
  We only make as many moves as required to reach the bottom-right, with at most O(m + n) steps.
- **Space Complexity:** O(1), as we use only constant extra space (indices and counter).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could start either moving right or down?
  *Hint: Try both starting directions, return minimal valid path cost.*

- What if you could skip one cell (e.g., make two moves of the same direction in a row) once?
  *Hint: Try using DP with an extra state to indicate if the bonus move was used.*

- What if the move-alternation pattern was arbitrary, e.g., right, right, down, right...?
  *Hint: Use a pattern/sequence to guide movement, generalize simulation.*

### Summary
This problem is a restricted version of grid pathfinding where the allowed moves alternate strictly by direction, making the path deterministic (or impossible). It is a good example of **simulation** under tight constraints, and sometimes can be optimized to a simple loop if no DP is needed. Recognizing when paths are deterministic or where constraints reduce combinatorial explosion is a valuable coding pattern for both interviews and real-world code.

### Tags
Math(#math), Brainteaser(#brainteaser)

### Similar Problems
