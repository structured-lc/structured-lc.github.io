### Leetcode 3202 (Medium): Find the Maximum Length of Valid Subsequence II [Practice](https://leetcode.com/problems/find-the-maximum-length-of-valid-subsequence-ii)

### Description  
Given an integer array **nums** and a positive integer **k**, find the length of the longest subsequence where, for every pair of consecutive elements in the subsequence, the sum of the two always gives the same remainder when divided by **k** (i.e., `(a₁ + a₂) % k = (a₂ + a₃) % k = ...`). In other words, choose some indices in increasing order to form a subsequence, such that the remainder of the sum of each pair stays constant throughout the subsequence.

### Examples  

**Example 1:**  
Input: `nums = [1,2,3,4,5]`, `k = 2`  
Output: `5`  
*Explanation: All consecutive pairs: (1,2), (2,3), (3,4), (4,5). Each sum is odd (3,5,7,9), so remainder modulo 2 is always 1.*

**Example 2:**  
Input: `nums = [1,4,2,3,1,4]`, `k = 3`  
Output: `4`  
*Explanation: One valid subsequence is [1,2,3,4]. (1+2)%3=0, (2+3)%3=2, (3+4)%3=1 → but remainder does not stay constant. Instead, [4,2,3,4]: (4+2)%3=0, (2+3)%3=2, (3+4)%3=1. The best length achievable is 4 through various pairs.*

**Example 3:**  
Input: `nums = [5,7,10,13,3]`, `k = 4`  
Output: `3`  
*Explanation: [5,7,10]: (5+7)%4=0, (7+10)%4=1. Not the same. But [7, 10, 13]: (7+10)%4=1, (10+13)%4=3. Again not same throughout. The maximal possible length with constant sum-remainder is 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:** Generate all subsequences and check, for each, if the pairwise sum-remainders stay constant. This is too slow (O(2ⁿ))—not feasible.
- **Optimization Insight:**  
  - For any subsequence, if the remainder of each consecutive sum is *r*, then for two adjacent elements a and b: (a + b) % k = r.
  - We can use dynamic programming (DP): for each possible last element and each possible sum-remainder, record the longest valid subsequence ending there.
  - For every pair (i, j), where i < j, if (nums[i] + nums[j]) % k equals a desired remainder, try to extend best subsequences ending at i with nums[j].
- **Optimized DP Approach:**  
  - Use a DP dictionary where `dp[j][rem]` is the length of the longest valid subsequence ending at index j with previous sum-remainder rem.
  - Update by iterating i < j and updating states.
  - Alternative: Precompute for each possible residue mod k, then use an array of size k (or k²) to track all possibilities.
- **Final Choice:**  
  - 2D DP: For all values, indices, and remainders.
  - O(n \* k) or O(n \* k²), which is efficient for reasonable values of n and k.

### Corner cases to consider  
- Empty array (nums = []) ⇒ output 0.
- One element (no pairs) ⇒ output 1 (since a subsequence of length 1 is vacuously valid).
- All elements are the same.
- All possible sums give the same remainder.
- k = 1 (all sums % k = 0).
- Negative numbers (if allowed by constraints).

### Solution

```python
def maximumLength(nums, k):
    # dp will hold the length of the longest subsequence ending at each nums[i]
    # dp[i][rem] = max length of subsequence ending at nums[i] where sum of every adjacent pair mod k is rem
    n = len(nums)
    if n == 0:
        return 0

    # At each position, map: rem → max length of subsequence ending at i with that rem
    dp = [{} for _ in range(n)]

    max_len = 1

    # Each element can start a length-1 subsequence (no adjacent pair yet)
    for i in range(n):
        dp[i] = {}
        for j in range(i):
            # Compute remainder for the pair (nums[j], nums[i])
            rem = (nums[j] + nums[i]) % k
            # See if there's a subsequence ending at j with 'rem'
            prev_len = dp[j].get(rem, 1)  # at least length 2 (pair)
            curr_len = prev_len + 1
            if rem in dp[i]:
                dp[i][rem] = max(dp[i][rem], curr_len)
            else:
                dp[i][rem] = curr_len
            max_len = max(max_len, dp[i][rem])
        # Also initialize: starting new sequence (length 1, no adjacents yet)
        # Not strictly needed unless 1-element subs are counted.

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²), since for each index i we look back at all previous j < i and calculate remainders.
- **Space Complexity:** O(n \* k), where n = len(nums) and k is the possible number of remainders, as we track all possible sum-remainders for each position.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to return an actual subsequence, not just the length?  
  *Hint: Maintain back pointers in your DP to reconstruct the path.*

- How would you solve it if k is very large?  
  *Hint: Try to limit DP table size, or preprocess to determine which remainders are even possible.*

- Can you solve this in O(n) time for some restricted version?
  *Hint: Are there any constraints or patterns that allow greedy or simpler methods?*

### Summary
This problem is a variant of the **Longest Subsequence with Pairwise Constraints**, solved with a 2D DP tracking ended sum remainders for subsequences. The approach is dynamic programming—similar patterns occur in problems like Longest Arithmetic Subsequence, where state space encodes position and difference/remainder. Suitable wherever pairwise relationships must be consistent across subsequences.


### Flashcard
Use DP where state is (last element, sum remainder mod k); for each new element, extend all valid subsequences with matching remainder and track the longest.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)
- Length of the Longest Subsequence That Sums to Target(length-of-the-longest-subsequence-that-sums-to-target) (Medium)