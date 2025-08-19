### Leetcode 756 (Medium): Pyramid Transition Matrix [Practice](https://leetcode.com/problems/pyramid-transition-matrix)

### Description  
Given a base row of blocks, each represented by a single uppercase letter, you must determine if you can stack blocks to form a complete pyramid.  
- For each position i on the current row, to place a block on top between blocks bottom[i] and bottom[i+1], you are only allowed to use a block C if the triple bottom[i] + bottom[i+1] + C appears in the allowed list.
- You keep stacking layers until one block remains at the top.
- Return true if it's possible to build to the very top, false otherwise.

### Examples  

**Example 1:**  
Input: `bottom = "BCD", allowed = ["BCG", "CDE", "GEA", "FFF"]`  
Output: `true`  
Explanation:  
- B + C → G (from BCG)  
- C + D → E (from CDE)  
- G + E → A (from GEA)  
The pyramid:  
```
    A
   G E
  B C D
```

**Example 2:**  
Input: `bottom = "AABA", allowed = ["AAA","AAB","ABA","ABB","BAC"]`  
Output: `false`  
Explanation:  
- No way exists to keep stacking blocks and reach the top following the allowed triples.

**Example 3:**  
Input: `bottom = "AAA", allowed = ["AAB","AAC","ABA","ABB","ACA","ACB"]`  
Output: `true`  
Explanation:  
Multiple valid pyramids are possible, e.g.  
```
   B
  A A
 A A A
```
or  
```
   B
  A C
 A A A
```

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try every possible combination for each layer, recursively. For each adjacent pair in the current row, look up all allowable top blocks; try all combinations for the new row above. If any path leads to the pyramid's peak (a single block), return true.  
- **Optimization:**  
  Reduce redundant computation by using memoization to cache (row, position) pairs that already failed, or by pruning impossible branches early. Preprocess allowed triples into a map: for every (A,B), store all possible C.
- Use **DFS** recursively to explore all configurations, backtracking whenever an invalid situation is detected.
- This is effectively a classic *backtracking with memoization* problem where the "state" is the current row.

### Corner cases to consider  
- Only one block at the base (`bottom` already has length 1).
- No allowed triples.
- Duplicate triples in allowed.
- No allowable block for an adjacent pair.
- Allowed list does not cover all possible pairs in bottom.

### Solution

```python
def pyramidTransition(bottom, allowed):
    # Build mapping: allowed_pairs[(A, B)] = set of possible tops C
    from collections import defaultdict

    allowed_pairs = defaultdict(set)
    for triple in allowed:
        a, b, c = triple[0], triple[1], triple[2]
        allowed_pairs[(a, b)].add(c)

    # DFS with memoization
    memo = {}

    def dfs(row):
        # If we've reached the very top (row length 1), success!
        if len(row) == 1:
            return True
        if row in memo:
            return memo[row]

        # Try building all possible next rows above
        def build_next_rows(i, path):
            if i == len(row) - 1:
                yield "".join(path)
                return
            a, b = row[i], row[i + 1]
            for c in allowed_pairs.get((a, b), []):
                path.append(c)
                yield from build_next_rows(i + 1, path)
                path.pop()

        for next_row in build_next_rows(0, []):
            if dfs(next_row):
                memo[row] = True
                return True

        memo[row] = False
        return False

    return dfs(bottom)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  In the worst-case, every position has up to k possible blocks above, leading to O(kⁿ) possibilities for n positions.  
  With memoization, the number of unique "states" is much less: total number of possible rows of all lengths is O(sⁿ) where s ≤ 7 (since colors A-G).  
  So roughly exponential: O(kⁿ), but usually pruned early in practice.
- **Space Complexity:**  
  O(sⁿ) for the memoization cache and recursion stack, where s = number of colors, n = length of bottom.

### Potential follow-up questions (as if you’re the interviewer)  

- How could you speed up the solution if the allowed list or bottom string were much larger?  
  *Hint: Consider topological sorting or BFS for lower recursion overhead on wide bases.*

- Could you modify the algorithm to return all possible pyramids, not just whether one exists?  
  *Hint: Adjust DFS to collect all successful pyramids into a list rather than stopping at the first success.*

- Is there a faster approach when the allowed patterns form a deterministic mapping (i.e., at most one allowed block per pair)?  
  *Hint: Check whether path can be constructed greedily in O(n) time.*

### Summary
This problem is a textbook example of applying **DFS backtracking with memoization** to efficiently explore all ways to build a structure by recursively stacking blocks according to local constraints. The technique is widely used in puzzles, constraint-satisfaction problems (CSP), and can apply to problems like word ladders, sudoku, or any scenario where you build upward/forward from small pieces under local rules. It highlights the importance of early pruning, state caching, and transforming input data into a fast-access structure for efficient lookups.

### Tags
Bit Manipulation(#bit-manipulation), Depth-First Search(#depth-first-search), Breadth-First Search(#breadth-first-search)

### Similar Problems
