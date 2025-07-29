### Leetcode 3592 (Medium): Inverse Coin Change [Practice](https://leetcode.com/problems/inverse-coin-change)

### Description  
You are given an array **numWays**, where **numWays[i]** represents the number of ways to make amount **i** using an unlimited supply of some unknown set of positive coin denominations (values ≤ len(numWays)). Your task: **reconstruct** and return the sorted, unique list of denominations that could produce exactly the given numWays array. If no such set exists, return an empty array.

### Examples  

**Example 1:**  
Input: `nums = [0, 1, 1, 2, 2, 3]`  
Output: `[2,3]`  
*Explanation:*
- numWays[1]=0 ⇒ 1 not possible, so '1' is not a denomination.
- numWays[2]=1 ⇒ covers one way (using coin '2').
- numWays[3]=1 ⇒ covers one way (using coin '3').
- numWays[4]=2 ⇒ we can make it as (2+2) or (3+1), but '1' isn't possible, so only (2+2) and (2+2).
- numWays[5]=2 ⇒ (2+3), (3+2).
- numWays=3 ⇒ (2+2+2), (3+3), (2+2+2).

**Example 2:**  
Input: `nums = [0, 0, 1, 0, 1]`  
Output: `[2,4]`  
*Explanation:*
- numWays[2]=1 ⇒ only '2' coin.
- numWays[4]=1 ⇒ only '4' coin.

**Example 3:**  
Input: `nums = [0, 0, 0, 0]`  
Output: `[]`  
*Explanation:*
- No amount can be formed with any coin denomination, so the answer is an empty set.

### Thought Process (as if you’re the interviewee)  

- The **inverse coin change** problem asks us to reverse-engineer the classic coin change DP, i.e., given the ways-to-make array, deduce the denominations.
- **Brute force:** Try all combinations of possible denominations (every subset of [1, 2, ..., n]).
  - For each, run forward DP to see if it produces the same numWays array.
  - This is exponential (2ⁿ subsets), not feasible for n up to 10⁴.
- **Greedy/DP approach:**  
  - Observe that for standard coin change (unbounded knapsack), the number of ways to make amount i:
    - dp[i] = sum(dp[i-d] for each coin d if i-d≥0)
    - If dp[i]>dp[i-1], that usually means a new denomination is possible at i, provided previous dp[k] (k<i) could not have created this increment.
  - Start with dp=1 (or 0 depending on convention), and for each i, check if numWays[i]!=sum(dp[i-d] for d in denominations already found). If so, i is a new denomination.
  - Add it to denominations and update dp forward.
- The core idea is to run the inverse of the classic DP by constructing dp dynamically and inferring when a new denomination is necessary to match the next numWays.
- Always verify at the end that the reconstructed dp exactly equals the input numWays; otherwise, return [].

### Corner cases to consider  
- Empty nums input (should return [])
- nums with all zeros
- nums of length 1, 2, …, n (very small and very large arrays)
- Cases where input is not possible to be constructed (contradictory numWays array)
- Multiple denominations could together form some number, test for uniqueness

### Solution

```python
def inverseCoinChange(nums):
    n = len(nums)
    if n == 0:
        return []
    
    # dp[i] will represent number of ways to make i with found denominations
    dp = [0]*(n)
    dp[0] = 1
    denominations = []
    for i in range(1, n):
        total = 0
        # For each denom, see if we can build amount i
        for d in denominations:
            if i - d >= 0:
                total += dp[i - d]
        # If total doesn't match nums[i], it suggests i is a new denomination
        if total < nums[i]:
            # The difference indicates a new denomination needed at i
            # But it must be exactly +1 difference (since each new denom adds exactly one new way)
            needed = nums[i] - total
            if needed != 1:
                # Contradiction: can't construct this, return []
                return []
            denominations.append(i)
            dp[i] = total + 1
        else:
            dp[i] = total
    # Finally, confirm full match
    for i in range(n):
        if dp[i] != nums[i]:
            return []
    return denominations
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n·k) where n = len(nums), k = number of denominations found so far. At each i, we sum over all denominations so far.
    - In worst case, k = O(n), so O(n²).
- **Space Complexity:** O(n) for the dp array and denominations. No recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if multiple distinct sets of denominations could produce the same numWays?  
  *Hint: Is the greedy forward reconstruction always unique?*

- How would you handle if coins can have repeated denominations (non-unique)?  
  *Hint: Should you track counts, or would handling duplicate denominations be meaningful for coin change?*

- How would this change if each coin was available only once (bounded knapsack)?  
  *Hint: Turn unbounded knapsack logic into bounded, what changes in recurrence?*

### Summary

This problem uses a **DP reconstruction** pattern, essentially simulating the knapsack/coin change process in reverse. The approach is greedy+DP: for each position, we check if the current denominations "explain" the number of ways, and add new denominations as soon as necessary. This reconstruction/greedy+DP idea is common in inverse DP problems and is applicable wherever you need to deduce the input to a DP table from its output—sometimes seen in jobs like process mining or error correction in combinatorial structures.