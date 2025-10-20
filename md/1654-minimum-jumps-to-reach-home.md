### Leetcode 1654 (Medium): Minimum Jumps to Reach Home [Practice](https://leetcode.com/problems/minimum-jumps-to-reach-home)

### Description  
You start at position 0 on the number line and want to reach position x using minimum jumps. At each move:
- You may jump forward by a units or backward by b units (but can't jump backward twice in a row).
- Some positions are forbidden; you cannot land on these.
Return the minimum number of jumps needed to reach x, or -1 if not possible.

### Examples  

**Example 1:**  
Input: `forbidden = [14,4,18,1,15]`, `a = 3`, `b = 15`, `x = 9`  
Output: `3`  
*Explanation: Forward to 3, forward to 6, forward to 9.*

**Example 2:**  
Input: `forbidden = [8,3,16,6,12,20]`, `a = 15`, `b = 13`, `x = 11`  
Output: `-1`  
*Explanation: Cannot reach 11 due to forbidden positions and step sizes.*

**Example 3:**  
Input: `forbidden = [1,6,2,14,5,17,4]`, `a = 16`, `b = 9`, `x = 7`  
Output: `2`  
*Explanation: Forward to 16, backward to 7 (can't go directly due to forbidden positions).* 


### Thought Process (as if you’re the interviewee)  
- Since jumps can alternate forward/backward with constraints, the state depends on position and whether the last jump was backward.
- Use BFS to find the shortest (minimum) jump count, tracking position and direction state.
- Mark visited states (position, backward-used/true-false) to avoid cycles.
- Set a reasonably high upper bound to the farthest position to avoid infinite BFS (e.g., max(forbidden) + a + b + x).


### Corner cases to consider  
- x is very large or small
- Forbidden blocks 0 or x
- a or b > x
- b > a (cannot reach x with only backward steps)
- Multiple forbidden positions


### Solution

```python
from collections import deque
from typing import List

def minimumJumps(forbidden: List[int], a: int, b: int, x: int) -> int:
    forbidden_set = set(forbidden)
    visited = set()
    queue = deque()
    upper = max(2000, x + a + b)  # Safe upper bound
    queue.append((0, False, 0))  # pos, used_backward, steps
    visited.add((0, False))
    while queue:
        pos, used_back, steps = queue.popleft()
        if pos == x:
            return steps
        # forward
        next_pos = pos + a
        if 0 <= next_pos <= upper and next_pos not in forbidden_set and (next_pos, False) not in visited:
            queue.append((next_pos, False, steps + 1))
            visited.add((next_pos, False))
        # backward
        if not used_back:
            next_pos = pos - b
            if 0 <= next_pos and next_pos not in forbidden_set and (next_pos, True) not in visited:
                queue.append((next_pos, True, steps + 1))
                visited.add((next_pos, True))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(U), where U is the upper limit (positions considered up to 2000 + a + b + x). Each state is only visited once.
- **Space Complexity:** O(U), for visited states and BFS queue.


### Potential follow-up questions (as if you’re the interviewer)  

- If jumps can have variable costs instead of always 1, how would you adapt?  
  *Hint: Use Dijkstra's algorithm instead of BFS for weighted shortest path.*

- What if you could jump backward multiple times in a row?  
  *Hint: Simplifies the state-space; no need to record last direction.*

- If forbidden changes during runtime, how would you handle updates efficiently?  
  *Hint: Allow dynamic update to forbidden_set and consider DFS to prune paths.*

### Summary
This problem demonstrates **BFS with state tracking** for minimum steps with constraints, a pattern frequently used for shortest path problems with additional rules.


### Flashcard
Use BFS with state (position, last jump direction) to find the minimum jumps to reach home, avoiding forbidden positions and cycles.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Breadth-First Search(#breadth-first-search)

### Similar Problems
- Reachable Nodes With Restrictions(reachable-nodes-with-restrictions) (Medium)
- Maximum Number of Jumps to Reach the Last Index(maximum-number-of-jumps-to-reach-the-last-index) (Medium)