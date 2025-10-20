### Leetcode 1262 (Medium): Greatest Sum Divisible by Three [Practice](https://leetcode.com/problems/greatest-sum-divisible-by-three)

### Description  
Given an array of integers, return the maximum sum you can form by selecting any subset of its elements such that the sum is divisible by 3. You can choose any subset (including the empty one), but the goal is for that subset’s sum to be the largest possible multiple of 3.

### Examples  

**Example 1:**  
Input: `[3,6,5,1,8]`  
Output: `18`  
*Explanation: Pick 3, 6, 1 and 8. Their sum is 18, which is the largest possible sum divisible by 3.*

**Example 2:**  
Input: `[4]`  
Output: `0`  
*Explanation: The only element (4) is not divisible by 3, so the empty subset is optimal.*

**Example 3:**  
Input: `[1,2,3,4,4]`  
Output: `12`  
*Explanation: Pick 1, 3, 4, and 4. Their sum is 12, which is divisible by 3. No larger subset sum meets the requirement.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible subsets, compute their sums, and track the largest one divisible by 3.  
  - This is infeasible for large n (time: O(2ⁿ)), so we need to optimize.
- **Observation:** Since we're working with modulo 3, for each prefix or combination, we only care about the *maximum sum* that gives remainder 0, 1, or 2 when divided by 3.
- **DP Approach:** For each number, maintain the largest sum achievable with mod 0, mod 1, and mod 2 so far:
  - For each num in nums, for each current (mod class), update:  
    - new_sum = dp[mod] + num  
    - update dp[new_sum % 3] if new_sum is larger than current value  
  - Initialize dp with [0, -inf, -inf] (meaning: the max sum we can get with sum≡0 (mod 3) is 0, etc.)
- **Why does this work?** We always keep only the max for each mod class, and every sum can be built from previous sums by either skipping or adding current number.
- Trade-off: O(n) time, O(1) space. This is optimal.

### Corner cases to consider  
- All numbers are not divisible by 3 and no subset can make the sum divisible by 3.
- Single element arrays.
- All elements divisible by 3.
- Large n (e.g., 4 × 10⁴).
- Arrays with many 1s and 2s, but not enough to form sum divisible by 3.

### Solution

```python
def maxSumDivThree(nums):
    # dp[i]: max sum with remainder i when divided by 3
    dp = [0, float('-inf'), float('-inf')]
    
    for num in nums:
        # Take a snapshot before updating for this num
        prev = dp[:]
        for rem in range(3):
            # candidate sum: add num to current sum with remainder rem
            new_sum = prev[rem] + num
            new_rem = new_sum % 3
            dp[new_rem] = max(dp[new_rem], new_sum)
    
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each number is processed a constant number of times (3 buckets), so it’s linear in the size of nums.
- **Space Complexity:** O(1) — Only three variables (for the three mod classes) are stored no matter input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to maximize the sum divisible by \( k \) (not just 3)?  
  *Hint: How can you generalize the DP buckets to handle mod k instead of just mod 3?*

- What if elements could be negative? Does your approach still work?  
  *Hint: How does taking negatives affect the initialization and update logic for the DP?*

- Can you recover the subset (not just the sum) that achieves this maximum?  
  *Hint: What extra tracking would you add to the DP to reconstruct the path?*

### Summary
This is a standard **dynamic programming with modulus buckets** problem, common for “maximum sum with modular restriction” situations. The pattern—tracking the maximum result for each mod class and updating in-place as you iterate—can be applied to similar problems for different moduli and other subset-sum variants. It’s efficient, clean, and robust for large input sizes.


### Flashcard
Use DP to track max sum for each mod 3 (0,1,2); for each num, update possible sums for all mods.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
