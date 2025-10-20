### Leetcode 1563 (Hard): Stone Game V [Practice](https://leetcode.com/problems/stone-game-v)

### Description  
Given an array `stones`, where stones[i] is the value of the iᵗʰ stone. Two players play a game where in each round, the current row of stones is split into two (at index k), and the player keeping the smaller sum receives points equal to the sum kept. The chosen piece remains for the next round, and the process repeats recursively. Both players play optimally. Return the maximum number of points Alice can get.

### Examples  

**Example 1:**  
Input: `stoneValue = [6,2,3,4,5,5]`  
Output: `18`  
*Explanation: Recursively split: choose left=[6,2,3] and right=[4,5,5]. Choose left (sum 11), and so on. Final max points is 18.*

**Example 2:**  
Input: `stoneValue = [7,7,7,7,7,7,7]`  
Output: `28`  
*Explanation: Several ways to split, points are maximized by always picking half.*

**Example 3:**  
Input: `stoneValue = [4]`  
Output: `0`  
*Explanation: Cannot split single element. Max score is 0.*


### Thought Process (as if you’re the interviewee)  
It's a DP on intervals problem: for each (i, j), we want to compute the max points. Try splitting at each k, and consider sum(left), sum(right). At each split, we keep the smaller sum and repeat. To quickly sum intervals, use prefix sums. For overlapping subproblems, use memoization. Try all partitions recursively, track max, and use lru_cache or explicit DP table.


### Corner cases to consider  
- Single element array (no splits possible)
- All elements equal
- Increasing/decreasing order of stones
- Large input (test for efficiency)


### Solution

```python
from functools import lru_cache

def stoneGameV(stoneValue):
    n = len(stoneValue)
    prefix = [0]*(n+1)
    for i in range(n):
        prefix[i+1] = prefix[i] + stoneValue[i]

    @lru_cache(maxsize=None)
    def dp(i, j):
        if i == j:
            return 0
        res = 0
        for k in range(i, j):
            left = prefix[k+1]-prefix[i]
            right = prefix[j+1]-prefix[k+1]
            if left < right:
                res = max(res, left + dp(i,k))
            elif left > right:
                res = max(res, right + dp(k+1,j))
            else:
                res = max(
                    res,
                    left + dp(i,k),
                    right + dp(k+1,j),
                )
        return res

    return dp(0, n-1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³) in worst-case, as for each interval, we consider all possible split points. Can be improved by memoization.
- **Space Complexity:** O(n²) for memoization table (caching all (i,j) intervals)


### Potential follow-up questions (as if you’re the interviewer)  

- Can you lower time from O(n³) to O(n²)?
  *Hint: Try advanced partition search or monotonicity properties.*

- What if the game scores are assigned differently?
  *Hint: Generalize the DP transfer equation.*

- How would you output the split sequence, not just the score?
  *Hint: Keep backtracking records apart from DP.*

### Summary
This is a classic DP on intervals, which is common in splitting, painting, or combining array subproblems. Using memoization and prefix sums for fast interval queries is a common and transferable technique.


### Flashcard
Interval DP with memoization; for each [i,j], try all split points k, keep smaller sum and recurse; use prefix sums for O(1) range queries.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Game Theory(#game-theory)

### Similar Problems
- Stone Game(stone-game) (Medium)
- Stone Game II(stone-game-ii) (Medium)
- Stone Game III(stone-game-iii) (Hard)
- Stone Game IV(stone-game-iv) (Hard)
- Stone Game VI(stone-game-vi) (Medium)
- Stone Game VII(stone-game-vii) (Medium)
- Stone Game VIII(stone-game-viii) (Hard)
- Stone Game IX(stone-game-ix) (Medium)