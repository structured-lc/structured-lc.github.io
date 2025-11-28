### Leetcode 3189 (Medium): Minimum Moves to Get a Peaceful Board [Practice](https://leetcode.com/problems/minimum-moves-to-get-a-peaceful-board)

### Description  
You are given an n × n chess board with n rooks placed on it, where each rook is at coordinates `[xi, yi]` and no two rooks share the same cell. In one move, you can move a rook one step up/down/left/right (to an adjacent cell). The board is considered **peaceful** if exactly one rook is present in each row and each column (i.e., no two share a row or column). Your goal is to find the **minimum number of moves** needed to reach a peaceful board, ensuring no rook lands on another during the process.

### Examples  

**Example 1:**  
Input: `rooks = [[0,0],[1,2],[2,1]]`  
Output: `2`  
*Explanation:  
Assign rooks to (0,0), (1,1), (2,2):  
- Move rook at (1,2) to (1,1) (cost 1)  
- Move rook at (2,1) to (2,2) (cost 1)  
Total cost = 2. There are other valid assignments, but all require at least 2 moves.*

**Example 2:**  
Input: `rooks = [[0,1],[1,2],[2,0]]`  
Output: `3`  
*Explanation:  
After sorting, assign to (0,0), (1,1), (2,2):  
- Rook at (0,1) → (0,0), cost 1  
- Rook at (2,0) → (2,2), cost 2  
Total cost = 1 + 0 + 2 = 3.*

**Example 3:**  
Input: `rooks = [[2,2],[1,1],[0,0]]`  
Output: `0`  
*Explanation:  
Every rook is already in its peaceful position, no moves needed.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every permutation of rook assignments to rows/columns, calculate total moves for each arrangement, and choose the minimum. But with n rooks, this requires n! possibilities, which is infeasible for n up to 500.

- **Observations and optimization:**  
  The minimum total number of moves is the sum over all rooks of their distances to the target unique row and column positions. The cost to move rook i to (rowᵢ, colᵢ) is `|xi - rowᵢ| + |yi - colᵢ|`. The best assignment minimizes the sum of these costs over all rook-target assignments.

- **Efficient solution:**  
  - Sort the x coordinates and assign the sorted rooks to rows 0 to n-1. The minimal total move in 1D assignment (for Manhattan distance) is achieved by this method because it matches the optimal assignment for minimizing sum of absolute differences.
  - Repeat for y coordinates and columns.
  - Add up the moves in both directions for the total.

- **Why is this optimal?**  
  For the sum of absolute differences, the optimal matching is to pair the smallest xi to smallest row, the next smallest to next row, etc.—i.e., after sorting. By handling both x and y independently, we respect the requirement for exactly one per row/column and achieve the minimal move count.

### Corner cases to consider  
- All rooks already aligned (minimal moves: 0)
- Rooks all in one row or one column (maximum spread required)
- Duplicate x or y values in initial input (though input guarantees unique positions)
- n = 1 (single rook, already "peaceful")
- Large n (test for performance, e.g. n = 500)

### Solution

```python
def minMovesToPeacefulBoard(rooks):
    # Number of rooks (and the side of the board)
    n = len(rooks)
    
    # Extract x and y coordinates separately
    xs = [pos[0] for pos in rooks]
    ys = [pos[1] for pos in rooks]
    
    # Sort coordinates: minimal total move is to assign in sorted order
    xs.sort()
    ys.sort()
    
    # The minimal moves: move each rook to row=i and col=i (i from 0...n-1)
    move_x = 0
    move_y = 0
    for i in range(n):
        move_x += abs(xs[i] - i)
        move_y += abs(ys[i] - i)
    return move_x + move_y
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n log n). Sorting xs and ys each takes O(n log n), and the for-loops are O(n). This is optimal given the constraints.

- **Space Complexity:**  
  O(n) for storing the xs and ys arrays. No extra space beyond input and this storage.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose the moves must be made sequentially, one at a time.  
  *Hint: How would move conflicts be handled?*

- What if some cells are blocked and cannot be moved into?  
  *Hint: Can you still guarantee a peaceful arrangement?*

- If cost to move between cells depends on some weight matrix (not always Manhattan), how would you solve for minimal total cost?  
  *Hint: Think about assignment problems and min-cost matching algorithms.*

### Summary
This problem uses a classic **greedy assignment pattern** for minimizing total move distances on a bipartite grid, matching each rook to a unique row and column by sorting their coordinates. The core idea leverages the property that for minimizing sum of absolute differences, sorted order assignment is optimal. This approach appears in various assignment, Hungarian-algorithm-related, and minimum-distances problems on grids.


### Flashcard
This is a bipartite matching problem; use the Hungarian algorithm or min-cost flow to assign rooks to unique rows and columns with minimum total distance.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting), Counting Sort(#counting-sort)

### Similar Problems
- Transform to Chessboard(transform-to-chessboard) (Hard)
- Most Stones Removed with Same Row or Column(most-stones-removed-with-same-row-or-column) (Medium)