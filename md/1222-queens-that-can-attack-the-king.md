### Leetcode 1222 (Medium): Queens That Can Attack the King [Practice](https://leetcode.com/problems/queens-that-can-attack-the-king)

### Description  
You are given the positions of multiple black queens and a single white king on an 8×8 chessboard.  
Your task is to find all the queens that can directly attack the king: that is, those that can reach the king by moving along any row, column, or diagonal, **without being blocked by another queen**. Return the coordinates of such queens (in any order).

### Examples  

**Example 1:**  
Input: `queens = [[0,1],[1,0],[4,0],[0,4],[3,3],[2,4]], king = [0,0]`  
Output: `[[0,1],[1,0],[3,3]]`  
*Explanation: [0,1] can attack (same row); [1,0] can attack (same column); [3,3] can attack (diagonal).  
[0,4] is blocked by [0,1] in its row. [4,0] is blocked by [1,0] in its column. [2,4] is not aligned.*[1][4]

**Example 2:**  
Input: `queens = [[0,0],[1,1],[2,2],[3,4],[3,5],[4,4],[4,5]], king = [3,3]`  
Output: `[[2,2],[3,4],[4,4]]`  
*Explanation: [2,2] (top-left diagonal), [3,4] (right), [4,4] (bottom-right diagonal) can reach the king without being blocked. All are first-in-direction.*

**Example 3:**  
Input: `queens = [[5,6],[7,7],[2,1],[0,7],[1,6],[5,1],[3,7],[0,3],[4,0],[1,2],[6,3],[5,0],[0,4],[2,2],[1,1],[6,4],[5,4],[0,0],[2,6],[4,6],[4,2],[1,4],[6,7],[5,2],[4,5],[0,1],[2,0],[7,5],[5,3],[0,5],[3,6],[6,6],[4,1],[0,6],[4,3],[1,0],[3,4],[7,6],[6,1],[0,2],[7,1],[6,0],[4,7],[3,3],[1,7]], king = [3,4]`  
Output: `[[2,3],[1,4],[1,6],[3,3],[4,3],[5,4],[4,5],[3,5]]`  
*Explanation: Only the nearest queens in each of the 8 possible directions are included.*


### Thought Process (as if you’re the interviewee)  
First, for a queen to attack the king, it must be in one of the same rows, columns, or diagonals as the king.  
A brute-force approach would check every queen and see if:
- In same row (`queen == king`)
- In same column (`queen[1] == king[1]`)
- In same diagonal (`abs(queen-king) == abs(queen[1]-king[1])`)

However, the catch is **blocking**: a queen can't attack the king if another queen appears first in that direction.

A better approach is to explore in all 8 directions from the king:
- For each direction (e.g., up, down, left, right, diagonals), move step by step until you hit the board’s edge or a queen.
- If you see a queen first in that direction, add it to the result and do not continue further in that direction.

To make this efficient:
- Use a set for quick queen lookup.
- Check 8 directions using offset pairs: (-1,-1), (-1,0), (-1,+1), (0,-1), (0,+1), (+1,-1), (+1,0), (+1,+1).
- For each direction, move incrementally and check the set; stop when found or out of bounds.

This avoids unnecessary checks and ensures only first-attacker queens are listed.


### Corner cases to consider  
- No queens: should return []
- All queens far from the king or not in line: should return []
- Queens in the same line but blocked: only closest queen is reported
- Only one queen, which is in such a direction: should return that queen
- King at edge or corner
- Queens at the same position (should never occur per the problem)


### Solution

```python
def queensAttacktheKing(queens, king):
    # Create a set for O(1) lookup of queen positions
    queen_set = set(tuple(q) for q in queens)
    
    directions = [
        (-1, -1), (-1, 0), (-1, 1),
        (0, -1),          (0, 1),
        (1, -1),  (1, 0), (1, 1)
    ]
    
    result = []
    for dr, dc in directions:
        r, c = king
        # Move step by step in the direction
        while True:
            r += dr
            c += dc
            if not (0 <= r < 8 and 0 <= c < 8):
                break
            if (r, c) in queen_set:
                result.append([r, c])
                break  # stop searching this direction after first queen
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)  
  The board is always 8×8. For each of 8 directions, in the worst case, you take at most 7 steps, so a fixed number of steps (≤56). Creating the set is O(1) since at most 64 queens.
- **Space Complexity:** O(Q)  
  Where Q is the number of queens (≤64). Used for storing the queen locations in a set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the chessboard were not 8×8, but arbitrarily large?  
  *Hint: Your solution should still work if board size is passed as a parameter; complexity analysis changes.*

- How would you handle if there were multiple kings?  
  *Hint: Repeat the process for each king (outer loop over all kings).*

- Could you optimize further if given that queens/king can only move in a subset of directions?  
  *Hint: Only check necessary directions, reducing unnecessary steps.*

### Summary
This problem is an example of **directional search on a fixed grid** using efficient set lookup. The approach is a combination of simulation and set-based search, a pattern common in chess or board grid puzzles. This versatile pattern appears in problems like searching for threats in chess, checking paths, and exploring neighbors in 2D grids efficiently.


### Flashcard
For each of 8 directions from the king, find the first queen (if any) that can attack, skipping blocked paths.

### Tags
Array(#array), Matrix(#matrix), Simulation(#simulation)

### Similar Problems
- Minimum Moves to Capture The Queen(minimum-moves-to-capture-the-queen) (Medium)