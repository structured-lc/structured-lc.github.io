### Leetcode 2944 (Medium): Minimum Number of Coins for Fruits [Practice](https://leetcode.com/problems/minimum-number-of-coins-for-fruits)

### Description  
You are given an array `prices` where `prices[i]` is the cost of the (i+1)ᵗʰ fruit. If you **buy** the (i+1)ᵗʰ fruit, you can get the next `i` fruits for free (i.e., if you buy the 1ˢᵗ fruit, you get the 2ⁿᵈ for free; if you buy the 2ⁿᵈ, you get the 3ʳᵈ and 4ᵗʰ for free, etc). Your goal is to collect/buy every fruit, using the smallest total number of coins. You may still choose to buy a fruit you could get for free, in order to activate more offers.

### Examples  

**Example 1:**  
Input: `prices = [3,1,2]`  
Output: `4`  
*Explanation: Buy the 1ˢᵗ fruit (cost 3, get 2ⁿᵈ for free); buy the 2ⁿᵈ fruit (cost 1, now get 3ʳᵈ free); take the 3ʳᵈ for free. Total = 3 + 1 = 4 coins.*

**Example 2:**  
Input: `prices = [1,10,1,1]`  
Output: `2`  
*Explanation: Buy the 1ˢᵗ fruit (cost 1, get 2ⁿᵈ for free); take the 2ⁿᵈ for free; buy the 3ʳᵈ fruit (cost 1, get 4ᵗʰ for free); take the 4ᵗʰ for free. Total = 1 + 1 = 2 coins.*

**Example 3:**  
Input: `prices = [2,3,4,2]`  
Output: `4`  
*Explanation: Buy the 1ˢᵗ fruit (cost 2, get 2ⁿᵈ for free); take 2ⁿᵈ for free. Buy the 3ʳᵈ fruit (cost 4, get 4ᵗʰ for free); take 4ᵗʰ for free. Total = 2 + 4 = 6 coins. But buying 1ˢᵗ and 4ᵗʰ directly is cheaper (2+2=4): buy 1ˢᵗ (get 2ⁿᵈ free), take 2ⁿᵈ; then buy 4ᵗʰ (cost 2, as 3ʳᵈ is not free in that path), take 3ʳᵈ for free. Total = 2 + 2 = 4 coins.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force**: Try every combination of "buy" or "take free" for each fruit. This is exponential, as at each fruit you can either buy or take for free (if eligible).
- **Better Approach (DP/Memoization)**:  
  - Use dynamic programming where `dp[i]` is the minimum coins needed to collect all fruits from the iᵗʰ position onwards.
  - At i:  
      - If we **buy** fruit i, pay `prices[i]`, and the next i fruits (i+1 to i+i, if within bounds) are free. So recurse/dp from the next fruit after these free ones, i.e., `dp[i + i + 1]` (since 0-indexed, and buying i gets fruits at i+1 to i+i free, so start after that).
      - If we **don't buy** (take for free), we must have bought a previous fruit whose offer covers this fruit. But finding which fruit's offer covers `i` requires tracking coverage, which makes logic complex.  
  - Key Optimization:  
    - Always consider, at any position, "buy fruit here" and "skip to next position" by paying the minimum possible cost moving forward.
    - Since you may buy a fruit that's available for free, you may want to "waste" a freebie in order to unlock a bigger block of free fruits.

- **Final Approach**:  
  - Use DP from back to front. At position `i`:
    - Option 1: buy the iᵗʰ fruit, and jump to the next position after all the free fruits you'd get after buying this one.
    - Option 2: skip to the next fruit, and solve recursively.
    - But since you must cover all positions, the most correct is:  
      - For each i from n-1 to 0, try buying i and getting i more for free, and dp from there.
      - Since buying oversees how far you can jump, at each i, let `next_idx = min(n, i + i + 1)`. Then,  
        `dp[i] = prices[i] + min(dp[j])` for all `j` in range [i+1, next_idx].
      - For efficiency, pre-calculate mins. This is still O(n²) in the worst case.

- **Why final approach**:  
  - Exponential approach is too slow (many overlapping subproblems).
  - DP/memoization ensures we solve each subproblem only once.

### Corner cases to consider  
- All prices the same.
- Only one fruit.
- Price array length at smallest and largest bounds.
- Situations where skipping an obvious "free" for a bigger win is optimal.
- When last buy lands beyond the array size.
- Having to buy every fruit (no chaining possible).

### Solution

```python
def minimumCoins(prices):
    n = len(prices)
    # dp[i]: min cost to take all fruits from i to end
    dp = [float('inf')] * (n + 1)
    dp[n] = 0  # base: no fruits left to take
    
    for i in range(n - 1, -1, -1):
        max_cover = min(n, i + i + 2)  # when we buy i, we get next i fruits for free. Buy at i (0-indexed), take up to i+i (inclusive), move to i+i+1.
        # After buying at i, next start position is max_cover (exclusive right range).
        dp[i] = prices[i]
        # For all possible starts from i+1 up to max_cover (i.e., next after all freebies), we only need to take minimum among these as each path (buy at i, then minimize over next options)
        dp[i] += min(dp[j] for j in range(i+1, max_cover))
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²). For every position i, we potentially scan up to O(n) future positions due to the offer's range. No additional optimization provided here.
- **Space Complexity:** O(n). Only DP array of length n+1 is used.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you improve the O(n²) solution to O(n log n) or O(n)?
  *Hint: Is there a way to calculate the min over a sliding window efficiently?*
  
- How would you modify the solution if the "get i fruits for free" became "get up to k fruits for free, where k is fixed"?
  *Hint: Change the jump size to a constant rather than variable.*

- What if the offer was "pick any 2 fruits for free when you buy any fruit", regardless of position?
  *Hint: Typical DP would need to explore all subsets, try to reduce with BFS-like state tracking.*


### Summary

This problem is a **variation of dynamic programming with decisions and range jumps**, similar to jump game and minimum cost path patterns. The key insight is that "buying" a fruit may enable non-local "skips" in the DP. Recognizing the overlapping subproblems and using a bottom-up DP helps reduce redundant computations compared to brute force/recursion. The main coding pattern is classic DP with nested loops, with potential for further optimization using sliding window minimums or segment trees if required for larger constraints.


### Flashcard
Use DP where dp[i] = minimum coins to collect all fruits from position i onward. At each i, either buy fruit i (pay price, next i fruits free) or take free (if eligible). Recurse from the next uncovered position.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Queue(#queue), Heap (Priority Queue)(#heap-priority-queue), Monotonic Queue(#monotonic-queue)

### Similar Problems
