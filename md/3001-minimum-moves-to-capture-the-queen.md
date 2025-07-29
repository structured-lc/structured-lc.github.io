### Leetcode 3001 (Medium): Minimum Moves to Capture The Queen [Practice](https://leetcode.com/problems/minimum-moves-to-capture-the-queen)

### Description  
You are given an 8×8 chessboard with the positions of a **white rook**, a **white bishop**, and a **black queen**, given by their coordinates (1-indexed):  
- (a, b): rook  
- (c, d): bishop  
- (e, f): queen

The **queen does not move**.  
Your task: **Return the minimum number of moves required by either the rook or the bishop to capture the queen.**  
- The rook moves any number of squares horizontally or vertically, but cannot move through other pieces.
- The bishop moves any number of squares diagonally, but also cannot move through other pieces.

### Examples  

**Example 1:**  
Input: `a=1, b=8, c=8, d=8, e=8, f=1`  
Output: `1`  
*Explanation: The rook and the queen are in the same column. The bishop is not blocking (rook is at (1,8), bishop at (8,8), queen at (8,1)). The rook can move to (8,1) in one move.*

**Example 2:**  
Input: `a=1, b=1, c=2, d=2, e=3, f=3`  
Output: `2`  
*Explanation: Bishop and queen are on the same diagonal, but the rook (at (1,1)) blocks the path diagonally (on the a1–h8 diagonal, between bishop and queen). Bishop needs to move around the rook, hence requires 2 moves.*

**Example 3:**  
Input: `a=1, b=1, c=2, d=3, e=3, f=5`  
Output: `2`  
*Explanation: Neither the rook nor the bishop can directly reach the queen in one move—neither shares the same row/column/diagonal with the queen. Either piece needs two moves: one to realign, the next to capture.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Simulate all possible moves for both the rook and the bishop until the queen is reached, but this is not necessary—it can be solved by chess geometry.
- **Observation:**  
  - The **rook** can capture in 1 move if it's on same row or column as the queen, *and there's no blocking bishop* in between.
  - The **bishop** can capture in 1 move if on the same diagonal as the queen, *and no blocking rook* in between.
  - If blocked (by the other piece being between attacker and queen), that piece needs at least 2 moves: one to maneuver, then to attack.
  - Otherwise, in 2 moves any piece can always maneuver and then capture.
- **Approach:**  
  - Check for a direct one-move capture first for **rook** and **bishop**; ensure the route is not blocked by the other piece.
  - If neither can do one-move capture, answer is 2.

### Corner cases to consider  
- Rook, bishop, and queen all on the same line (row/column/diagonal), but piece between attacker and queen blocks the capture.
- All three pieces on unrelated lines: answer is always 2.
- Attacker is immediately adjacent or on the same cell as queen (should never be per problem, but catch for zero-move case).
- All coordinates provided are distinct by problem constraints.

### Solution

```python
def minMovesToCaptureTheQueen(a, b, c, d, e, f):
    # Rook attacks: same row or column with queen
    # Make sure no bishop blocks the path
    # Case 1: Same row
    if a == e:
        # Bishop blocks if it's also on this row and between rook and queen
        if c == a and (b < d < f or b > d > f):
            return 2
        return 1
    # Case 2: Same column
    if b == f:
        if d == f and (a < c < e or a > c > e):
            return 2
        return 1
    # Bishop attacks: same diagonal
    if c + d == e + f:
        # Rook blocks if also on this "↘↗" diagonal and between bishop and queen
        if a + b == c + d and (c < a < e or c > a > e):
            return 2
        return 1
    if c - d == e - f:
        # Rook blocks on this "↙↖" diagonal
        if a - b == c - d and (c < a < e or c > a > e):
            return 2
        return 1
    # Otherwise: minimum 2 moves (re-align + capture)
    return 2
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1).  
  Only a constant number of checks/comparisons—no loops or recursion.
- **Space Complexity:** O(1).  
  No extra data structures, only variables for computation.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your answer change if the queen could also move?
  *Hint: Consider turn-based search—possibly BFS for minimum steps as queen can escape.*
- What if there are obstacles (other pieces) on the board?
  *Hint: Extend path-blocking checks for each attacker’s route.*
- Suppose you had to return not just the number of moves, but the actual move sequence?
  *Hint: Track and reconstruct paths, not just counts.*

### Summary
This is a straightforward chess-geometry problem: check if either attacker can capture immediately, accounting for the other piece as a blocker. If not, the minimum is always 2 moves, as either can realign and then attack. The coding pattern is constant-time simulation by direct calculation, often useful in problems involving piece movements and board constraints. This approach appears in many chess and board game LeetCode problems.