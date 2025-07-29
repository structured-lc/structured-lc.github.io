### Leetcode 752 (Medium): Open the Lock [Practice](https://leetcode.com/problems/open-the-lock)

### Description  
You’re given a lock with **four wheels**, each numbered from 0–9. You start at the combination **"0000"**.  
You can turn one wheel at a time either forward (increment), or backward (decrement), and the wheels *wrap around* (so '9'+1='0', '0'-1='9').  
Some combinations are marked as **deadends** — if the lock shows one of these, it’s stuck forever.  
Given a list of **deadend** combinations and a **target**, return the *minimum number of moves* required to reach the target from "0000", avoiding deadends.  
If it can’t be opened (i.e., every path hits a deadend), return -1.

### Examples  

**Example 1:**  
Input: `deadends = ["0201","0101","0102","1212","2002"], target = "0202"`  
Output: `6`  
Explanation:  
Start from "0000":  
- "0000" → "1000" → "1100" → "1200" → "1201" → "1202" → "0202"  
Six moves, no deadends hit.

**Example 2:**  
Input: `deadends = ["8888"], target = "0009"`  
Output: `1`  
Explanation:  
Turn the last wheel one step up: "0000" → "0009".

**Example 3:**  
Input: `deadends = ["8887","8889","8878","8898","8788","8988","7888","9888"], target = "8888"`  
Output: `-1`  
Explanation:  
Every path to "8888" is blocked by a deadend.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try all combinations, at each step generating all possibilities by turning each wheel up/down. But enumerating all 10,000 states with all possible paths is slow and may run into cycles.

- **Optimized Approach:**  
  This is a classical **shortest path in unweighted graph** problem — where each combination is a node, and changing one wheel is an edge to a neighbor.  
  Use **Breadth-First Search (BFS)**:
  - Model states as strings (e.g., "0211").
  - Keep a **queue** for BFS traversal, and a **visited set** to avoid revisiting states.
  - Use a **deadends set** to instantly invalidate forbidden states.
  - For each current state, generate all 8 possible neighbor states (for 4 wheels, each can +1 or -1).
  - Increment a move count at each BFS layer.

- **Trade-offs:**  
  BFS is efficient in guaranteeing a shortest path for this sort of “all moves cost one” setup.  
  If “target” is far away but reachable, BFS will still check every possible shorter path first.

### Corner cases to consider  
- The initial state **"0000"** itself is a deadend.
- The **target** is **"0000"** (should return 0 moves).
- The **deadends** list is empty.
- The **target** is in the deadends (no way to reach).
- Deadends that completely cover access to the target.
- Multiple equally short paths exist (should return minimum moves).

### Solution

```python
def openLock(deadends, target):
    from collections import deque

    dead = set(deadends)
    if "0000" in dead:
        return -1
    if target == "0000":
        return 0

    queue = deque()
    queue.append(("0000", 0))
    visited = set("0000")

    while queue:
        state, moves = queue.popleft()
        if state == target:
            return moves

        for i in range(4):
            digit = int(state[i])
            # Try rotating wheel up (+1)
            up = state[:i] + str((digit + 1) % 10) + state[i+1:]
            # Try rotating wheel down (-1)
            down = state[:i] + str((digit - 1) % 10) + state[i+1:]

            for next_state in (up, down):
                if next_state not in dead and next_state not in visited:
                    visited.add(next_state)
                    queue.append((next_state, moves + 1))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(10⁴) — There are at most 10,000 possible states for 4 wheels with 10 possibilities each, and each can be visited once.
- **Space Complexity:** O(10⁴) for both the visited set and the BFS queue (in worst case, if all states are expanded and stored).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the lock had **n** wheels instead of 4?  
  *Hint: How does your state representation and neighbor generation scale?*

- How would you optimize further if the list of deadends or the target is very close to the start?  
  *Hint: Consider bidirectional BFS to cut search space in half.*

- What if some moves cost more (e.g., moving the third wheel costs double)?  
  *Hint: Use a priority queue (Dijkstra) for varied cost paths.*

### Summary
The problem uses the **BFS pattern** for shortest-path-in-unweighted-graph problems, modeling each lock state as a node.  
This is a standard approach for puzzles constrained by neighbors and forbidden states and applies to word ladder, sliding puzzles, and similar path search scenarios.