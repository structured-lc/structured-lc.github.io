### Leetcode 2209 (Hard): Minimum White Tiles After Covering With Carpets [Practice](https://leetcode.com/problems/minimum-white-tiles-after-covering-with-carpets)

### Description  
Given a binary string `floor` of length n, where:
- `floor[i] = '1'` means the iᵗʰ tile is white,
- `floor[i] = '0'` means the iᵗʰ tile is black,

you are given `numCarpets` black carpets of equal length `carpetLen`. Each carpet can be placed anywhere (overlapping allowed) to cover exactly `carpetLen` consecutive tiles. A carpet changes covered tiles—white or black—to black (so white tiles become hidden). 

Your task is to **cover tiles using carpets so that the visible white tiles left is minimized**. Return that minimum.

### Examples  

**Example 1:**  
Input: `floor = "10110101", numCarpets = 2, carpetLen = 2`  
Output: `2`  
*Explanation: Place carpets at indices (0-1) and (4-5), hiding as many whites as possible. Two white tiles at indices 2 and 7 remain visible. Any other arrangement leaves ≥2 whites uncovered.*

**Example 2:**  
Input: `floor = "11111", numCarpets = 2, carpetLen = 3`  
Output: `0`  
*Explanation: Place one carpet over indices 0-2 and another covering either 1-3 or 2-4, overlapping as needed. All tiles get covered, so zero whites are visible.*

**Example 3:**  
Input: `floor = "0000", numCarpets = 1, carpetLen = 2`  
Output: `0`  
*Explanation: All tiles are already black; no whites remain, regardless of carpet placement.*

### Thought Process (as if you’re the interviewee)  
First, consider a brute-force approach: for each way to place each carpet (including overlap), keep track of which whites are covered and find the min uncovered. But for n, numCarpets up to 1000, that explodes in O(2ⁿ) time.

A better idea: use **dynamic programming**.

Let’s define dp[i][k] = min visible whites on the first i tiles, having up to k carpets left.

At each position i, for k carpets left:
- If the tile is white and we don’t cover it: add 1 to the answer. Proceed to i-1 and k.
- Optionally, place a carpet covering the last `carpetLen` tiles ending at i. Proceed to i-carpetLen and k-1.

Recursively, 
- dp[i][k] = min(
    (floor[i] == '1') + dp[i-1][k],                   // Don’t cover
    dp[i-carpetLen][k-1]                              // Lay a carpet ending at i
)

Base cases: 
- dp[-1][*] = 0  (no tiles left, nothing to cover)
- dp[*]       (no carpets left): sum of whites up to i.

Optimize with memoization or use bottom-up DP with an n × numCarpets table.

Why not greedy? Whites may not be optimally bunched, so greedy doesn't always minimize visible whites.

### Corner cases to consider  
- All tiles black (`floor` has only '0': should return 0).
- All tiles white and total carpets length ≥ n: can cover everything, return 0.
- carpetLen > n (carpet is longer than floor).
- numCarpets = 0 (can't cover any white).
- Overlapping carpets (don't double count white tiles).
- Whites only at start/end.
- Isolated white tiles.

### Solution

```python
def minimumWhiteTiles(floor: str, numCarpets: int, carpetLen: int) -> int:
    n = len(floor)
    # dp[i][k]: min whites in first i tiles, with k carpets left
    dp = [[0] * (numCarpets + 1) for _ in range(n + 1)]

    for i in range(n + 1):
        for k in range(numCarpets + 1):
            if i == 0:
                dp[i][k] = 0  # nothing to cover
            elif k == 0:
                # No carpets left; count total whites till i
                dp[i][k] = dp[i-1][k] + (floor[i-1] == '1')
            else:
                # Not using carpet at position i-1
                dont_cover = dp[i-1][k] + (floor[i-1] == '1')
                # Place a carpet ending at i, covering carpetLen tiles
                start = max(0, i - carpetLen)
                cover = dp[start][k-1]
                dp[i][k] = min(dont_cover, cover)
    return dp[n][numCarpets]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × numCarpets) — Two nested loops over n (length of floor, up to 1000) and numCarpets (up to 1000).
- **Space Complexity:** O(n × numCarpets) — A 2D DP table of size (n+1) × (numCarpets+1).

### Potential follow-up questions (as if you’re the interviewer)  

- What if carpets had different lengths?  
  *Hint: Need DP with another dimension or state tracking for each carpet length.*

- Can you reconstruct which tiles each carpet covers for an optimal arrangement?  
  *Hint: Backtrack using DP choices to get exact tile intervals for each carpet.*

- How would you optimize for space if n and numCarpets are large, but only need minimal whites?  
  *Hint: Only recent rows/columns are required at a time (rolling array).*

### Summary
This problem is a classic example of **dynamic programming** with overlapping subproblems and optimal substructure, using a 2D DP table. The same pattern applies to problems where you are allowed to take “blocks” or “chunks” of elements (e.g., covering intervals, partitioning, substring covering). Understanding how to express the decision (“cover” or “not cover” at each position) is essential, and similar DP strategies often appear in tiling, scheduling, and substring segmentation optimizations.