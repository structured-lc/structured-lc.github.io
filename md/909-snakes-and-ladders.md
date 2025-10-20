### Leetcode 909 (Medium): Snakes and Ladders [Practice](https://leetcode.com/problems/snakes-and-ladders)

### Description  
You are given an n × n board representing a game of **Snakes and Ladders**. The squares are numbered in a “snaking” Boustrophedon style starting at the bottom-left: you go left-to-right on the first row (bottom), then right-to-left on the next, and so on, up to the top.  
You start on square 1 and want to reach square n² using as few moves as possible. On each move, you roll a die (1-6) and advance that many squares.  
If you land on a square containing a **snake** or **ladder** (the cell has a value ≥ 1), your position is updated to the value specified in the board (1-based). The start and end squares do not have snakes or ladders. You can only take one snake or ladder per move—if you land on another after a jump, you stop, and must roll again on your next turn.  
Return the minimum number of moves to get from square 1 to square n², or -1 if it's impossible.

### Examples  

**Example 1:**  
Input:  
```
board = [
  [-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,35,-1,-1,13,-1],
  [-1,-1,-1,-1,-1,-1],
  [-1,15,-1,-1,-1,-1]
]
```  
Output: `4`  
*Explanation:  
- Move 1: Start at 1, roll 2, land on 3.  
- Move 2: Roll 6, land on 9.  
- Move 3: Roll 1, land on 10 → ladder to 35.  
- Move 4: Roll 6, land on 36 (done).  
The quickest path needs 4 moves.*

**Example 2:**  
Input:  
```
board = [
  [-1,-1],
  [-1,3]
]
```  
Output: `1`  
*Explanation:  
- Move 1: Start at 1, roll 1, land on 2 (which is a ladder to 3).  
You reach the target in 1 move.*

**Example 3:**  
Input:  
```
board = [
  [-1,-1,-1],
  [-1,9,8],
  [-1,8,9]
]
```  
Output: `1`  
*Explanation:  
- Move 1: Start from 1, roll 2, land on 3, which is a ladder to 9 (the last cell).*

### Thought Process (as if you’re the interviewee)  
First, let's clarify how the board works:
- Given the snaking order, I'll need a way to map square numbers to (row, col), especially as the direction alternates per row.
- From any square, I can roll 1-6 and move forward. If I land on a snake or ladder (board value ≠ -1), I must go instantly to the destination.
- To minimize moves, I'm interested in the shortest path from start (1) to end (n²). This fits perfectly as an unweighted graph traversal problem.
- Brute-force (DFS) would revisit states, possibly get stuck in cycles, and won't guarantee minimal moves first.

**Optimization:**  
- I will use **Breadth-First Search (BFS)** where each queue entry is (position, move-count).
- At each step, explore positions +1 to +6 ahead, apply snake/ladder jump if present, and avoid revisiting squares.
- I need a helper to map square number ⟷ row,col.

**Why BFS?**  
- BFS ensures earliest (minimum moves) arrival at target since all one-move options are considered before two-move options, etc.  
- Space is manageable, as no further states are created after reaching end.

### Corner cases to consider  
- Board with only one square.
- Ladders or snakes that loop/bring back to a visited node.
- Board cells with -1 (no snake/ladder).
- All cells with -1 (no aids/hindrances).
- No way to reach n² (isolated by snakes).
- Redundant ladders/snakes (multiple on one path).
- Board with multiple paths of same minimal length.
- Minimum board size (n=1).

### Solution

```python
from collections import deque

def snakesAndLadders(board):
    n = len(board)
    
    def id_to_rc(square):
        # Map square (1-based) to (row, col) on the board (0-indexed)
        quot, rem = divmod(square - 1, n)
        row = n - 1 - quot
        col = rem if (quot % 2 == 0) else n - 1 - rem
        return row, col
    
    visited = set()
    queue = deque()
    queue.append((1, 0))  # (square, moves)
    
    while queue:
        square, moves = queue.popleft()
        for dice in range(1, 7):
            next_square = square + dice
            if next_square > n * n:
                continue
            row, col = id_to_rc(next_square)
            if board[row][col] != -1:
                dest = board[row][col]
            else:
                dest = next_square
            if dest == n * n:
                return moves + 1
            if dest not in visited:
                visited.add(dest)
                queue.append((dest, moves + 1))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  Every square is visited at most once (since moves only progress forward and states aren’t revisited).
  At each square, we consider 6 possible dice rolls, but overall, we do not process more than O(n²) nodes.
- **Space Complexity:** O(n²)  
  Mainly due to the queue in BFS and visited set, each of size at most n² (for all distinct squares).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where multiple ladders can be chained in one move?  
  *Hint: Think about repeatedly following ladders/snakes until you reach a cell without.*

- What if the board was not always square (rectangular dimensions)?  
  *Hint: Generalize the row/col mapping logic for m × n boards.*

- How can you reconstruct the actual path taken (not just the number of moves)?  
  *Hint: Store parent pointers or paths as part of your queue entries.*

### Summary
The problem is a classic **shortest path in an unweighted graph** application, solved efficiently with **Breadth-First Search**.  
A key challenge is correctly mapping “snaking” board positions and handling ladder/snake jumps.  
This pattern is common for board games, state-space puzzles, and problems involving moves or transitions with uniform cost.  
BFS is ideal here as it finds the minimum moves by exploring all one-step-away positions first.


### Flashcard
Use BFS to model the board as a graph, mapping square numbers to (row, col), and find the shortest path from 1 to n².

### Tags
Array(#array), Breadth-First Search(#breadth-first-search), Matrix(#matrix)

### Similar Problems
- Most Profitable Path in a Tree(most-profitable-path-in-a-tree) (Medium)