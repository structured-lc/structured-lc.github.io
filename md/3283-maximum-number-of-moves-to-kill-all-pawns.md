### Leetcode 3283 (Hard): Maximum Number of Moves to Kill All Pawns [Practice](https://leetcode.com/problems/maximum-number-of-moves-to-kill-all-pawns)

### Description  
Given a 50 × 50 chessboard with **one knight** and several pawns (positions given), Alice and Bob take turns. On each turn, the current player chooses any remaining pawn and captures it with the knight, always using the **minimum number of knight moves** needed to reach it from the knight's current position. (The knight is allowed to move over other pawns; it only captures the selected pawn at the end of its minimal path.) Alice wants to **maximize** the total number of moves used to kill all pawns; Bob wants to **minimize** this sum. Compute the **maximum total number of moves** Alice can guarantee if both play optimally.

### Examples  

**Example 1:**  
Input: `kx = 0, ky = 0, positions = [[1,2]]`  
Output: `1`  
*Explanation: Alice is first. She picks the only pawn, needs 1 knight move: (0, 0)→(1, 2).*

**Example 2:**  
Input: `kx = 3, ky = 3, positions = [[1,1],[2,2]]`  
Output: `5`  
*Explanation:  
- Alice moves: (3, 3)→(4, 1)→(2, 2)→(0, 3)→(1, 1) (captures [1, 1] in 4 moves).  
- Bob's move: knight at (1, 1). Shortest path: (1, 1)→(2, 2) in 1 move (captures [2, 2]).  
- Total = 4 + 1 = 5.*

**Example 3:**  
Input: `kx = 0, ky = 0, positions = [[1,2],[2,4]]`  
Output: `3`  
*Explanation:  
- Alice chooses [2, 4]: (0, 0)→(1, 2)→(2, 4) takes 2 moves (knight *passes* through [1, 2] without capturing).  
- Bob now at [2, 4]. Only one pawn ([1, 2]) left. (2, 4)→(1, 2) in 1 move.  
- Total = 2 + 1 = 3.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all orders in which pawns could be captured, tracking the actual knight movement cost each time. This is **O(n!)**, not tractable for n up to 15.

- **Game Theory, State Compression:**  
  Because each state is: (knight position, which pawns remain, whose turn), we **encode the set of remaining pawns as a bitmask** for fast DP memoization.

- **Distance Calculation:**  
  For each pair (from knight start, to all pawn positions), precompute the **minimum moves** using BFS. This makes later DP transitions O(1) lookups for cost.

- **DP Structure:**  
  Define `dp(pos, mask, aliceTurn)` — from knight at position `pos`, which pawns remain by bitmask `mask`, current player.  
  - If Alice's turn, try all remaining pawns, select the one that will **maximize** total moves: cost to reach + dp(nextPos, newMask, not aliceTurn).
  - If Bob's turn, he chooses the pawn that will **minimize** moves.

- **Memoization:**  
  Use a dictionary (or LRU cache) to store dp results, since n ≤ 15 and positions ≤ 16.

- **Overall:**  
  - Precompute all knight distances.
  - DP via minimax, alternates picking pawns (simulates both Alice and Bob playing optimally).
  - Initial state is at knight position, all pawns on, Alice’s turn.

### Corner cases to consider  
- Only one pawn: Alice captures it, answer is just the minimum moves from knight to pawn.
- Two pawns, both distant: who picks first may matter.
- Multiple pawns at same position (invalid in standard, but may test).
- Pawns unreachable: shouldn’t be possible if inputs are valid, but knight can reach any square.
- Board boundaries (all coords fit 0-49).
- Knights passing “over” (not stopping at) other pawns: must be handled correctly.

### Solution

```python
from collections import deque
from functools import lru_cache

# Knight moves: (dx, dy)
KNIGHT_DIRS = [(-2,-1), (-2,1), (-1,-2), (-1,2), (1,-2), (1,2), (2,-1), (2,1)]

def knight_distance(src, dst):
    # Compute min knight moves from src to dst on 50x50 board
    queue = deque()
    visited = set()
    queue.append((src[0], src[1], 0))
    visited.add((src[0], src[1]))
    while queue:
        x, y, d = queue.popleft()
        if (x, y) == dst:
            return d
        for dx, dy in KNIGHT_DIRS:
            nx, ny = x + dx, y + dy
            if 0 <= nx < 50 and 0 <= ny < 50 and (nx, ny) not in visited:
                visited.add((nx, ny))
                queue.append((nx, ny, d+1))
    return float('inf')

def max_moves_to_kill_all_pawns(kx, ky, positions):
    n = len(positions)
    # Node 0: knight init
    all_nodes = [(kx, ky)] + [tuple(p) for p in positions]
    dist = [[0]*(n+1) for _ in range(n+1)]
    # Precompute all knight pairwise distances
    for i in range(n+1):
        for j in range(n+1):
            if i != j:
                dist[i][j] = knight_distance(all_nodes[i], all_nodes[j])
    # mask: n-bit mask representing alive pawns; pos: current node idx (0=knight/start, [1..n]=pawn idx+1)
    @lru_cache(maxsize=None)
    def dp(pos_idx, mask, alice_turn):
        if mask == 0:
            return 0
        res = None
        for i in range(n):
            if (mask >> i) & 1:
                next_mask = mask ^ (1<<i)
                cost = dist[pos_idx][i+1]
                next_val = dp(i+1, next_mask, not alice_turn)
                total = cost + next_val
                if alice_turn:
                    if res is None or total > res:
                        res = total
                else:
                    if res is None or total < res:
                        res = total
        return res
    full_mask = (1<<n) - 1
    return dp(0, full_mask, True)

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Precompute knight distances: O(n² × 2500), since BFS on 50×50 for all positions (upto 16 nodes).
  - DP has O(n × 2ⁿ × 2) unique states (`n` is ≤ 15, so O(500,000)).
  - For each DP state: O(n) transitions.
  - Overall: O(n² × 2500 + n² × 2ⁿ)

- **Space Complexity:**  
  - Pairwise distance matrix: O(n²)
  - DP memo table: O(n × 2ⁿ × 2)
  - Minor extra for BFS queues.

### Potential follow-up questions (as if you’re the interviewer)  

- Change the turn order to both players maximizing total moves?  
  *Hint: Remove the minimax: both branches take max.*

- What if Alice wants the **minimum** total moves (minimize, not maximize)?  
  *Hint: Flip the DP comparison condition.*

- If the knight can't pass through occupied squares (must avoid other pawns)?  
  *Hint: Block in BFS any squares occupied by uncaptured pawns except the target.*

### Summary
This is a **game DP** with **bitmask state compression and precomputed shortest paths**. The key patterns: memoization, alternate-turn minimax, precomputing move costs, and using bitmasking for subset state. This paradigm applies to traveling salesman, optimal coin game, and other "turn-based remnant subset" problems.