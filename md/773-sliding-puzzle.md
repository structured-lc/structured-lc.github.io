### Leetcode 773 (Hard): Sliding Puzzle [Practice](https://leetcode.com/problems/sliding-puzzle)

### Description  
Given a **2×3 sliding puzzle board** containing the numbers 1–5 and a single empty square (represented as 0), you can only move 0 by swapping it with an *adjacent* tile (up, down, left, or right). Your task is to find the **minimum number of moves** required to reach the solved state:

```
[[1, 2, 3],
 [4, 5, 0]]
```

If this is not possible from the given configuration, return -1.

### Examples  

**Example 1:**  
Input: `[[1,2,3],[4,0,5]]`  
Output: `1`  
*Explanation: Swap 0 and 5 to get [[1,2,3],[4,5,0]].*

**Example 2:**  
Input: `[[1,2,3],[5,4,0]]`  
Output: `-1`  
*Explanation: There’s no way to swap tiles to reach the solved state.*

**Example 3:**  
Input: `[[4,1,2],[5,0,3]]`  
Output: `5`  
*Explanation:  
1. [[4,1,2],[5,0,3]] → swap 0,3 → [[4,1,2],[5,3,0]]  
2. swap 0,2 → [[4,1,0],[5,3,2]]  
3. swap 0,1 → [[4,0,1],[5,3,2]]  
4. swap 0,4 → [[0,4,1],[5,3,2]]  
5. swap 0,5 → [[5,4,1],[0,3,2]]  
Continue like this until the target is reached.*

### Thought Process (as if you’re the interviewee)  

- Start by thinking of the board as a **state**. Since it is always 2×3, we can serialize the board into a string (e.g. "123450") to make state comparisons easy.

- This problem asks for the **minimum number of moves**—so **Breadth-First Search (BFS)** is the natural brute-force choice.  
    - Each move changes the state to another; BFS will explore states level by level, guaranteeing the minimum sequence.
    - For optimization, store visited states to avoid cycles.

- Since the state space is small (2×3! = 720 possible tile permutations), both BFS and an informed search (like A\*) are tractable.

- **A*** can further optimize by prioritizing boards closer to the goal—use the **Manhattan distance** as a heuristic.

- **Early pruning:**  
  Check if a state is unsolvable based on inversions in the sequence, which can be counted before exploring.

Trade-offs:  
- BFS is simple and always finds shortest paths, but can be slower than A\* if the solution is deep.
- A\* can speed up search, but the heuristic for 2×3 is basic; both approaches are viable due to small state space.

### Corner cases to consider  
- Initial state = final state (should return 0)
- State is unsolvable (odd number of inversions): return -1
- All possible valid permutations
- Swapping must be only with VALID adjacents (avoid invalid indices)

### Solution

```python
def slidingPuzzle(board):
    from collections import deque

    # Transition indices for each position of 0 in flattened list
    neighbors = {
        0: [1, 3],
        1: [0, 2, 4],
        2: [1, 5],
        3: [0, 4],
        4: [1, 3, 5],
        5: [2, 4]
    }
    # Serialize the board into a string
    start = ''.join(str(num) for row in board for num in row)
    target = '123450'
    # Early out if already solved
    if start == target:
        return 0

    # Count inversions to check solvability
    def is_solvable(s):
        arr = [int(x) for x in s if x != '0']
        inv = 0
        for i in range(len(arr)):
            for j in range(i+1, len(arr)):
                if arr[i] > arr[j]:
                    inv += 1
        # For 2x3 board, puzzle is solvable if inversions are even
        return inv % 2 == 0

    if not is_solvable(start):
        return -1

    queue = deque()
    queue.append((start, 0))
    visited = {start}

    while queue:
        curr, steps = queue.popleft()
        zero_pos = curr.index('0')
        for nei in neighbors[zero_pos]:
            lst = list(curr)
            lst[zero_pos], lst[nei] = lst[nei], lst[zero_pos]
            new_state = ''.join(lst)
            if new_state not in visited:
                if new_state == target:
                    return steps + 1
                visited.add(new_state)
                queue.append((new_state, steps + 1))
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For 2×3 board, there are at most 6! = 720 permutations. Each state generates ≤4 new states.  
  - Thus, O(1) in practice (constant upper bound).

- **Space Complexity:**  
  - The queue and visited set hold up to 720 states.  
  - O(1) (since the state space is constant and small).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this solution for a 3×3 or n×m sliding puzzle?  
  *Hint: Consider the effect on state size; classic BFS may not be tractable; discuss IDA\* or A\*.*

- Could you use a more optimal heuristic for larger puzzles?  
  *Hint: Discuss Manhattan distance, linear conflict, or pattern database heuristics.*

- How would you detect unsolvability for arbitrary-size sliding puzzles?  
  *Hint: Research parity, inversions, and blank row rules for different puzzle dimensions.*

### Summary

This problem is a classic **BFS on state space/search space** for finding a shortest path, with optional optimizations using A\* and heuristics. This pattern—serializing state, avoiding duplicates, exploring neighbors—appears in puzzles, word ladder, and transformation/graph traversal interview questions. For small state spaces, BFS is efficient and easy to reason about. For larger boards or puzzles, informed search and smarter heuristics become crucial.