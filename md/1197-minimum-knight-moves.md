### Leetcode 1197 (Medium): Minimum Knight Moves [Practice](https://leetcode.com/problems/minimum-knight-moves)

### Description  
Given an infinite chessboard, a knight starts at the origin (0, 0). The knight moves in the standard “L” shape (two squares in one direction and one in the other). Given coordinates (x, y), return the minimum number of moves needed for the knight to reach (x, y) from the origin. All positions on the board are allowed, and the answer is guaranteed to exist. The knight has 8 possible moves from any given position.

### Examples  

**Example 1:**  
Input: `x = 2, y = 1`  
Output: `1`  
Explanation: The knight can move from (0, 0) → (2, 1) in one move.

**Example 2:**  
Input: `x = 5, y = 5`  
Output: `4`  
Explanation: One possible sequence:  
(0, 0) → (2, 1) → (4, 2) → (3, 4) → (5, 5)  
Total moves: 4.

**Example 3:**  
Input: `x = 0, y = 0`  
Output: `0`  
Explanation: The knight is already at the target, so 0 moves are needed.

### Thought Process (as if you’re the interviewee)  

The brute-force approach would be to try all possible knight moves recursively (DFS) to reach (x, y), but this is very inefficient because there are infinitely many possible positions and paths. Since we are asked for the **minimum** number of moves, this is clearly a shortest-path problem, which is best suited to **Breadth-First Search (BFS)** on an implicit graph where nodes are board positions.

Because the chessboard is infinite but the minimum move count is symmetrical in all directions, we can minimize the search space using symmetry and only consider the first quadrant (positive x, y), using absolute values.

Alternatively, to optimize further, we can use **BFS with pruning** (avoid revisiting visited states) or **memoized recursion** (DP) starting from the target back to the origin. Since the cost at every edge is 1, BFS is guaranteed to find the minimal path.

For implementation, I prefer BFS for clarity and to handle all positions fairly. I’ll use a queue, keep track of visited positions, and expand all positions by the eight possible knight moves at each step—stop when the target is reached.

### Corner cases to consider  
- Target is at origin: (0,0)
- Target is along one axis: e.g. (0,2) or (2,0)
- Target has negative coordinates (symmetry; should handle all quadrants)
- Target has large coordinates (performance and search space)
- Small target such as (1,1) (edge case for minimal moves other than direct move)

### Solution

```python
# Problem: Minimum Knight Moves
# Approach: BFS, using symmetry and only positive quadrant

from collections import deque

def minKnightMoves(x, y):
    # Use symmetry: only positive coordinates
    x, y = abs(x), abs(y)
    
    # Eight possible knight moves
    directions = [
        (2, 1), (1, 2),
        (-1, 2), (-2, 1),
        (-2, -1), (-1, -2),
        (1, -2), (2, -1)
    ]
    
    # Visited states to avoid cycles
    visited = set()
    queue = deque()
    queue.append((0, 0, 0))  # (cur_x, cur_y, steps)
    visited.add((0, 0))
    
    while queue:
        cur_x, cur_y, steps = queue.popleft()
        if (cur_x, cur_y) == (x, y):
            return steps
        # Prune search: restrict close to (x, y) and the axes
        for dx, dy in directions:
            nx, ny = cur_x + dx, cur_y + dy
            # Limit search to reasonable region (reduces run time greatly)
            if -2 <= nx <= x+2 and -2 <= ny <= y+2 and (nx, ny) not in visited:
                visited.add((nx, ny))
                queue.append((nx, ny, steps + 1))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N²), where N = |x| + |y|.  
  Each layer of BFS visits up to 8 neighbors per node, but we only visit each position once within a small bounding box (proportional to the target distance), so practical performance is much better due to symmetry and pruning.
- **Space Complexity:** O(N²), for the visited set and BFS queue, proportional to the area of the region searched (again, at worst, |x| × |y| positions in the bounding box).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the board was finite with obstacles?  
  *Hint: Need to handle blocked cells, may need to store the board or coordinates of obstacles in a set for O(1) lookup.*
- How would you return the actual shortest path instead of just number of moves?  
  *Hint: Use BFS while saving parent pointers, reconstruct path at the end.*  
- Can this be formulated and solved using A\* search?  
  *Hint: Use a good heuristic (like Manhattan distance/3) to guide search faster.*

### Summary
This problem is a classic **shortest path on a grid** using **BFS** due to equal edge weights. Using symmetry (absolute value of x and y) and bounding box pruning improves efficiency. The BFS pattern for shortest steps is widely applicable, e.g. word ladder, sliding puzzles, and any chess moves on a board.


### Flashcard
Use BFS on infinite chessboard to find minimum knight moves—exploit symmetry for efficiency.

### Tags
Breadth-First Search(#breadth-first-search)

### Similar Problems
- Check Knight Tour Configuration(check-knight-tour-configuration) (Medium)