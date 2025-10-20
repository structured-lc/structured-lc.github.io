### Leetcode 1444 (Hard): Number of Ways of Cutting a Pizza [Practice](https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza)

### Description  
Given a rectangular pizza (grid of characters) and an integer k, return the number of ways to cut the pizza into k non-empty pieces so that each piece contains at least one apple ('A').
- You can cut along rows or columns, always making a straight cut, either horizontally or vertically.
- Each cut divides an existing piece; you can only cut existing pieces (can't rearrange).
- Answer should be given mod 10⁹ + 7.

### Examples  

**Example 1:**  
Input:  
`pizza = ["A..","AAA","..."]`, k = 3  
Output: `3`  
*Explanation: 3 ways to cut into 3 valid pieces, each with at least one apple.*

**Example 2:**  
Input:  
`pizza = ["A..","AA.","..."]`, k = 3  
Output: `1`  
*Explanation: Only one possible way to make 3 valid apple-containing pieces.*

**Example 3:**  
Input:  
`pizza = ["A..","A..","..."]`, k = 1  
Output: `1`  
*Explanation: No cuts, original pizza with apple, only one way.*


### Thought Process (as if you’re the interviewee)  

This is about recursive partitioning + DP.

Brute-force: Try all possible first cuts (for each row and column), recursively count number of ways to make remaining k-1 cuts for each side, validate if each piece contains at least one apple.

Optimized: Use DP with memoization.
- For a top-left corner (i, j) and cuts left, dp(i, j, cuts) = total ways to make cuts starting at (i,j) with remaining cuts.
- Use a prefix sum table to count if a region contains any apples in O(1) time.
- For each possible horizontal and vertical cut, recurse. Memoize on (i, j, cuts) to avoid repeated computation.

### Corner cases to consider  
- No apples, impossible to cut.
- Single row or single column pizza.
- k = 1 (no cut, check only if region has apple)
- All apples in one area, rest empty.

### Solution

```python
# DP with memoization. Use a prefix sum for constant-time apple checking.

def ways(pizza, k):
    rows, cols = len(pizza), len(pizza[0])
    MOD = 10**9 + 7
    # Compute prefix sum: apples[i][j] = apples from (i,j) to bottom-right
    apples = [[0] * (cols+1) for _ in range(rows+1)]
    for i in reversed(range(rows)):
        for j in reversed(range(cols)):
            apples[i][j] = (1 if pizza[i][j] == 'A' else 0) + apples[i+1][j] + apples[i][j+1] - apples[i+1][j+1]
    from functools import lru_cache
    @lru_cache(maxsize=None)
    def dp(i, j, cuts):
        if apples[i][j] == 0:
            return 0  # No apple in this region
        if cuts == 1:
            return 1  # Last piece
        res = 0
        # Try horizontal cuts
        for r in range(i+1, rows):
            if apples[i][j] - apples[r][j] > 0:  # Top has an apple
                res = (res + dp(r, j, cuts-1)) % MOD
        # Try vertical cuts
        for c in range(j+1, cols):
            if apples[i][j] - apples[i][c] > 0:
                res = (res + dp(i, c, cuts-1)) % MOD
        return res
    return dp(0, 0, k)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(rows × cols × k × (rows + cols)), since for each state (i, j, cuts), we consider O(rows + cols) possible cuts. Total states are O(rows × cols × k).
- **Space Complexity:** O(rows × cols × k), for the DP memoization cache.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you optimize the precomputation further?  
  *Hint: Reduce space/computation in prefix sum array?*

- What if you want to minimize/maximize the number of apples per piece?
  *Hint: Extend memoization with new state parameter for apples?*

- Can this problem be solved bottom-up instead of with recursion?
  *Hint: Can you reverse recurrence and fill DP iteratively?*

### Summary
This is a classic DP with memoization pattern on subregions, combined with clever region-sum counting (via prefix sum). Such rectangular DP/memoization occurs in other grid partitioning, rectangle DP, and string cut/merge problems.


### Flashcard
Use DP with memoization and prefix sum table; for each cut, recursively count ways to partition pizza ensuring each piece has at least one apple.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Memoization(#memoization), Matrix(#matrix), Prefix Sum(#prefix-sum)

### Similar Problems
- Selling Pieces of Wood(selling-pieces-of-wood) (Hard)