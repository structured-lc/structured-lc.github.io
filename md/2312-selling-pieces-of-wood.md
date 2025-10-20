### Leetcode 2312 (Hard): Selling Pieces of Wood [Practice](https://leetcode.com/problems/selling-pieces-of-wood)

### Description  
You are given a rectangular piece of wood of size m × n. Each sub-rectangle of certain specified dimensions (hᵢ, wᵢ) can be sold for a given price. You can cut the wood horizontally or vertically along the grain (no rotation) into two pieces and repeat this recursively. The goal is to find the maximum money you can earn by optimally cutting and selling the wood, using the given sell prices for allowed sub-rectangle sizes.

### Examples  

**Example 1:**  
Input: `m = 3, n = 5, prices = [[3,5,15],[3,1,3],[1,5,6],[1,1,1]]`  
Output: `15`  
*Explanation: The piece 3 × 5 can be sold outright for 15, which is the best approach since all other ways yield less profit.*

**Example 2:**  
Input: `m = 4, n = 6, prices = [[1,2,1],[4,1,5],[2,2,2],[2,3,4],[1,4,3],[4,6,17]]`  
Output: `17`  
*Explanation: Simply sell the whole 4 × 6 piece for 17. Cutting further can't yield more.*

**Example 3:**  
Input: `m = 2, n = 2, prices = [[1,2,3],[2,1,2],[2,2,7]]`  
Output: `7`  
*Explanation: Sell the 2 × 2 piece for 7, which is optimal over any sequence of cuts: e.g., two 1 × 2 and two 2 × 1 pieces yield 3+3+2+2=10, but you can't sell both 1 × 2 and 2 × 1 twice from a single cut due to overlap, so selling the whole gives you the best price.*

### Thought Process (as if you’re the interviewee)  

- **Brute Force:**  
  Try all possible ways to cut the wood recursively and sum up prices for sub-rectangles formed, but this quickly leads to exponential time due to overlapping subproblems.

- **Optimization - DP with Memoization:**  
  Observe that for each sub-rectangle (h, w), the maximum profit is either selling it directly if allowed, or recursively splitting it at every possible horizontal or vertical position, summing best results for each side.  
  We can implement this as DP with memoization, where f(h, w) returns the max profit for a h × w piece.  
  The state space is (m × n), and for each state, we try all possible horizontal (cut at row i: 1 ≤ i < h) and vertical cuts (cut at column j: 1 ≤ j < w).

- **DP Table Approach:**  
  Use a 2D dp array: dp[h][w] = max profit for each sub-rectangle. Initialize using given sell prices. Iterate over increasing dimensions, filling dp based on splitting by cuts.

- **Trade-offs:**  
  The DP reduces exponential overlap, and since m, n ≤ 200, a O(m × n × (m+n)) solution is fast enough.  
  We avoid recursion stack overflow and speed up via bottom-up (tabulation) DP.

### Corner cases to consider  
- No sellable prices for size (m, n): must always check possibility of 0 profit.
- Prices array may have duplicates or prices for nonsensical sizes (>m or >n).
- Can only cut along entire row or column.
- Cannot rotate pieces: (h, w) ≠ (w, h) if not both present.
- Very small m or n (1 or 0).
- Unprofitable cuts (e.g., cutting leads to strictly lower profit than selling whole).

### Solution

```python
def sellingWood(m, n, prices):
    # Initialize DP table.
    dp = [[0 for _ in range(n + 1)] for _ in range(m + 1)]

    # Map given prices to DP table.
    for h, w, price in prices:
        dp[h][w] = max(dp[h][w], price)
    
    # For all rectangles, fill from smallest pieces to largest
    for height in range(1, m + 1):
        for width in range(1, n + 1):
            # Try all horizontal cuts
            for cut in range(1, height // 2 + 1):
                dp[height][width] = max(
                    dp[height][width],
                    dp[cut][width] + dp[height - cut][width]
                )
            # Try all vertical cuts
            for cut in range(1, width // 2 + 1):
                dp[height][width] = max(
                    dp[height][width],
                    dp[height][cut] + dp[height][width - cut]
                )
    return dp[m][n]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n × (m + n))  
    For each (h, w), we scan up to ⌊h/2⌋ horizontal and ⌊w/2⌋ vertical cuts. There are m × n subproblems.
- **Space Complexity:** O(m × n)  
    The DP table is size (m+1) × (n+1). No extra recursion stack required.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rotation of pieces is allowed?
  *Hint: Consider (h, w) and (w, h) equivalent. Adjust DP state accordingly.*

- What if you want to return the actual sequence of cuts leading to maximum profit?
  *Hint: Add backtracking or parent pointers during DP to reconstruct solution path.*

- What if some cut positions are forbidden?
  *Hint: Add constraints when generating potential horizontal/vertical cuts.*

### Summary
This problem exemplifies the "interval DP" technique where subproblems depend on all possible partitions (cuts) of a rectangle. The idea generalizes to questions like "matrix chain multiplication" and "stick cutting". Here, DP exploits overlapping subproblems and optimal substructure, leading to a substantial speedup over naïve recursion. It’s a classic divide-and-conquer DP extended to 2D with price constraints and can be applied to various resource-splitting maximization problems.


### Flashcard
Use DP/memoization to maximize profit by considering all possible horizontal and vertical cuts for each sub-rectangle.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Memoization(#memoization)

### Similar Problems
- Tiling a Rectangle with the Fewest Squares(tiling-a-rectangle-with-the-fewest-squares) (Hard)
- Number of Ways of Cutting a Pizza(number-of-ways-of-cutting-a-pizza) (Hard)