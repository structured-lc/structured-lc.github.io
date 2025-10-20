### Leetcode 913 (Hard): Cat and Mouse [Practice](https://leetcode.com/problems/cat-and-mouse)

### Description  
Given an undirected graph where `graph[a]` lists all nodes reachable from node `a` by a single move, two players (Mouse and Cat) play the following turn-based game:
- The **Mouse starts at node 1**, Cat at node 2; **node 0 is a “hole”**.
- Players take turns (Mouse goes first). On your move, you must move to an adjacent node; the **Cat cannot move to node 0**.
- The **game ends** if:
  - Mouse and Cat occupy the same node (Cat wins).
  - Mouse reaches the hole (Mouse wins).
  - If the same configuration (positions, player turn) repeats (not necessarily consecutively), the game is a draw.

Given a graph, determine who wins assuming both play optimally:
- Return `1` if Mouse wins,
- Return `2` if Cat wins,
- Return `0` if it’s a draw.

### Examples  

**Example 1:**  
Input: `graph = [[2,5],[3],[0,4,5],[1,4,5],[2,3],[0,2,3]]`  
Output: `0`  
*Explanation: With optimal play, both the Cat and Mouse can endlessly avoid losing, so the game is a draw.*

**Example 2:**  
Input: `graph = [[1,3],,[3],[0,2]]`  
Output: `1`  
*Explanation: The Mouse can reach node 0 before the Cat can intercept, so the Mouse wins.*

**Example 3:**  
Input: `graph = [[1],[0,2,4],[1,3],[2],[1,5],[4]]`  
Output: `2`  
*Explanation: The Cat can force the Mouse into a corner and win with optimal play.*

### Thought Process (as if you’re the interviewee)  

- The problem is essentially a **two-player game theory problem** played on a graph, with rules favoring the Mouse and Cat differently.
- **Brute-force idea**: Simulate all possible moves recursively with memoization (DP). For each game state (mouse position, cat position, whose turn), check all possible next moves, and deduce the winner.
- **Draw detection**: A state repeats (including whose move), so we must track seen states to avoid infinite recursion.  
- **State Encoding**: The state is defined by (mouse_pos, cat_pos, turn).  
- At each step:
  - If Mouse reaches 0: Mouse wins.
  - If Cat and Mouse are on same node: Cat wins.
  - If state repeats: Draw.
- **Optimizing**:
  - Use BFS or DFS plus a DP table for every (mouse, cat, turn) triplet (up to n×n×2 states).
  - Use a **reverse BFS** (retrograde analysis) inspired by game theory: track who can force a win from each state by marking “win” or “loss” states and working backwards from terminal (winning) positions.

- **Why this works**:  
  - Finite number of states and turns, and by always propagating “losing” positions backward, we guarantee optimal play and draw detection.

### Corner cases to consider  
- The Cat starts adjacent to the Mouse (cat catches on first move).
- The Mouse starts with only one move: directly into the Cat or the Hole.
- Multiple disjoint cycles (can both avoid each other forever?).
- The Cat being unable to move because all adjacent nodes are the hole.
- Repeated states—causing a draw.
- Small graphs with no available moves for either player.

### Solution

```python
def catMouseGame(graph):
    n = len(graph)
    # 0: draw, 1: mouse wins, 2: cat wins
    DRAW, MOUSE, CAT = 0, 1, 2
    
    # dp[mouse][cat][turn] where turn 0 = Mouse's turn, 1 = Cat's turn
    dp = [[[DRAW] * 2 for _ in range(n)] for _ in range(n)]

    # Color known results first: win positions
    for i in range(n):
        for turn in [0, 1]:
            dp[0][i][turn] = MOUSE   # Mouse at hole wins
            dp[i][i][turn] = CAT     # Cat catches mouse

    from collections import deque
    q = deque()
    # Initialize BFS queue with terminal states
    for i in range(n):
        for turn in [0, 1]:
            # Mouse at hole
            q.append((0, i, turn))
            # Cat and Mouse on same node (Cat wins)
            if i != 0:
                q.append((i, i, turn))
    
    # Count the degree (number of possible moves) for each position
    degree = [[[0, 0] for _ in range(n)] for _ in range(n)]
    for m in range(n):
        for c in range(n):
            degree[m][c][0] = len(graph[m])             # Mouse's turn, choices
            degree[m][c][1] = len([k for k in graph[c] if k != 0])  # Cat's turn, can't go to hole
    
    # Reverse BFS: propagate results to predecessors
    while q:
        mouse, cat, turn = q.popleft()
        color = dp[mouse][cat][turn]
        for prev_mouse, prev_cat, prev_turn in get_parents(mouse, cat, turn, graph):
            if dp[prev_mouse][prev_cat][prev_turn] == DRAW:
                # If the parent can force a win (next move leads to win), then parent can win
                if (color == MOUSE and prev_turn == 0) or (color == CAT and prev_turn == 1):
                    dp[prev_mouse][prev_cat][prev_turn] = color
                    q.append((prev_mouse, prev_cat, prev_turn))
                else:
                    degree[prev_mouse][prev_cat][prev_turn] -= 1
                    if degree[prev_mouse][prev_cat][prev_turn] == 0:
                        # All child moves lead to win for the opponent, so parent loses
                        dp[prev_mouse][prev_cat][prev_turn] = CAT if prev_turn == 0 else MOUSE
                        q.append((prev_mouse, prev_cat, prev_turn))
    
    return dp[1][2][0]   # Start: Mouse at 1, Cat at 2, Mouse's turn

def get_parents(mouse, cat, turn, graph):
    # Who moved previously? If turn = 0, previous was Cat; else Mouse
    if turn == 0:
        # Previous was Cat's turn, so Mouse *hasn't moved yet*
        for prev_cat in graph[cat]:
            if prev_cat == 0: continue
            yield (mouse, prev_cat, 1)  # Mouse pos unchanged, Cat moved last turn
    else:
        # Previous was Mouse's turn
        for prev_mouse in graph[mouse]:
            yield (prev_mouse, cat, 0)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³), since we have n possible positions for mouse, n for cat, and 2 turns (n×n×2). Each state is processed a constant number of times as the queue propagates.
- **Space Complexity:** O(n²), for the DP table plus degree/count tables. Stack/queue size is O(n²). Graph representation is O(n+m).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the Cat was allowed to go to the hole?
  *Hint: Would need to tweak state processing for new terminal positions.*

- How would you handle a weighted/weighted-edge graph (variable move costs)?
  *Hint: State expansion, but transitions depend on distances—may require Dijkstra or similar DP.*

- How to return the actual optimal moves (not just win/draw/loss)?
  *Hint: Store action traces along with winning states during BFS propagation.*

### Summary
This problem is a classic **game theory / DP on graphs** question, using a form of **reverse BFS (retrograde analysis)** to propagate win/loss/draw states backward from the known ends. The state representation and propagation pattern is common in problems about two-player games with full information, such as checkers, chess endgames, or many “perfect information” games. This pattern can be generalized to other board or state games with discrete moves and stateful draws.


### Flashcard
Model the game as a DP on (mouse, cat, turn), recursively determine win/draw/lose, and memoize results to avoid cycles.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming), Graph(#graph), Topological Sort(#topological-sort), Memoization(#memoization), Game Theory(#game-theory)

### Similar Problems
- Cat and Mouse II(cat-and-mouse-ii) (Hard)