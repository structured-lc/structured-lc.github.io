### Leetcode 351 (Medium): Android Unlock Patterns [Practice](https://leetcode.com/problems/android-unlock-patterns)

### Description  
Given a standard **Android 3×3 lock screen**, count how many unlock patterns are possible that use at least **m** keys and at most **n** keys, following these rules:
- Each pattern must connect *at least* m keys and *at most* n keys.
- **All keys must be distinct** (no repeats).
- If a connection between two keys passes through another key, that 'intervening' key must have already been visited. *For example, to go from 1 to 3, you must have already visited 2 if you pass through it. The same applies for 1↔9, 3↔7, etc.*
- The order of keys used **matters**.

Pictorial example of the lock grid:
```
| 1 | 2 | 3 |
| 4 | 5 | 6 |
| 7 | 8 | 9 |
```

### Examples  

**Example 1:**  
Input: `m = 1, n = 1`  
Output: `9`  
*Explanation: Each of the 9 keys can be an individual pattern.*

**Example 2:**  
Input: `m = 1, n = 2`  
Output: `65`  
*Explanation: There are 9 patterns of length 1, and 56 patterns of length 2. (For length-2, you can move from any key to any other key that’s not “jumping” over an unvisited key.)*

**Example 3:**  
Input: `m = 2, n = 2`  
Output: `56`  
*Explanation: All two-key patterns that don’t “jump” an unvisited key. For example, 1→3 is not valid unless 2 is already visited; 1→2 is valid; 2→4 is valid, etc.*


### Thought Process (as if you’re the interviewee)  
1. **Brute-force idea:**  
   - Try every possible sequence of key presses, from length m to n.
   - For each sequence, check if it follows all rules (distinct, no jumping over unvisited key).
   - This is very inefficient (factorial time), as there are up to 9! permutations.
2. **Optimize with backtracking + validation:**  
   - Realize that the only tricky rule is the “cannot jump over a non-visited key”.
   - Represent the keypad as points 1–9, and *precompute* which key needs to be “crossed” for each possible pair.
   - Use a recursive backtracking function:
     - At each step, try moving from the current key to any unused key, as long as any “skipped” key in between has already been visited.
     - Track pattern length. Count the pattern if m ≤ length ≤ n.
   - To avoid redundant computation: note the grid is symmetric. Keys 1, 3, 7, 9 have identical behavior; likewise 2, 4, 6, 8; key 5 is unique. Use this symmetry to multiply results and save work.
   - **Trade-off:** The recursion solves the problem efficiently within constraints, at the cost of O(1) extra memory for a skip-lookup table.

### Corner cases to consider  
- **m = 1, n = 1** (single key patterns)
- **m and n both 9** (must use all keys, i.e. all Hamiltonian paths by these rules)
- **Reverse direction**: 1→3 is different from 3→1
- **No possible moves**: Passing through unvisited keys when not allowed should be correctly rejected
- **Non-square patterns**: Moving diagonally or skipping not via center

### Solution

```python
def numberOfPatterns(m, n):
    # skip[i][j] = the node that must be visited before moving from i to j, or 0 if nothing is skipped
    skip = [[0] * 10 for _ in range(10)]
    skip[1][3] = skip[3][1] = 2
    skip[1][7] = skip[7][1] = 4
    skip[3][9] = skip[9][3] = 6
    skip[7][9] = skip[9][7] = 8
    skip[1][9] = skip[9][1] = 5
    skip[2][8] = skip[8][2] = 5
    skip[3][7] = skip[7][3] = 5
    skip[4][6] = skip[6][4] = 5
    skip[7][3] = skip[3][7] = 5
    skip[9][1] = skip[1][9] = 5
    skip[6][4] = skip[4][6] = 5
    skip[8][2] = skip[2][8] = 5

    def dfs(current, visited, length):
        if length > n:
            return 0
        count = 1 if m <= length <= n else 0
        for next in range(1, 10):
            # if not visited and (either no skip needed, or skip is already visited)
            if not visited[next] and (skip[current][next] == 0 or visited[skip[current][next]]):
                visited[next] = True
                count += dfs(next, visited, length + 1)
                visited[next] = False
        return count

    res = 0
    visited = [False] * 10
    # 1, 3, 7, 9 are corners, 4 perms
    for corner in [1]:
        visited[corner] = True
        res += dfs(corner, visited, 1) * 4
        visited[corner] = False
    # 2, 4, 6, 8 are edges, 4 perms
    for edge in [2]:
        visited[edge] = True
        res += dfs(edge, visited, 1) * 4
        visited[edge] = False
    # 5 is center
    visited[5] = True
    res += dfs(5, visited, 1)
    visited[5] = False
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1)
  - There are only 9 keys, so the number of total distinct unlock patterns is a constant (≈14000). The recursive calls never branch beyond 9! possibilities, but in practice are much fewer because illegal moves get pruned immediately.
- **Space Complexity:** O(1)
  - Only uses fixed-size arrays (`visited`, `skip`) and the recursion stack is at most 9 levels deep.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to an arbitrary m×n grid?
  *Hint: How would you generalize the ‘skip’ logic, and what if cells are not in a regular lattice?*

- Can you output all the patterns, not just count them?
  *Hint: Instead of incrementing a counter, build a path list as you recurse.*

- How would you handle extra constraints, like not allowing 180° turns or no consecutive diagonal moves?
  *Hint: Add pre-checks before each recursive call that enforce the new constraint on direction or moves (“last move” state).*

### Summary
This problem is a classic application of **backtracking with intelligent pruning and precomputed move validation**. Recognizing and exploiting the grid’s rotational and reflectional symmetry enables us to multiply results and greatly reduce code duplication. The backtracking pattern here (with conditional validity rules) is common in chessboard pathfinding, the Knight’s Tour, Hamiltonian path search, and similar combinatorial puzzles.

### Tags
Dynamic Programming(#dynamic-programming), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation), Bitmask(#bitmask)

### Similar Problems
