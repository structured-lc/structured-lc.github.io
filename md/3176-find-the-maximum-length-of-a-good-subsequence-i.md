### Leetcode 3176 (Medium): Find the Maximum Length of a Good Subsequence I [Practice](https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-i)

### Description  
Given an array of integers `nums` and an integer `k`, you are asked to find the **maximum length of a good subsequence**.  
A **good subsequence** is defined as a subsequence where you can change the value of at most `k` elements so that _all elements of the subsequence become equal_.  
You need to find the length of the longest such possible subsequence.

### Examples  

**Example 1:**  
Input: `nums = [1,2,1,2,1], k = 2`  
Output: `5`  
*Explanation: You can keep all elements. With 2 changes, you can make all elements equal (e.g., change both 2's to 1's).*

**Example 2:**  
Input: `nums = [1,2,3,4,5], k = 2`  
Output: `3`  
*Explanation: Pick any 3 numbers (e.g., [1,2,3]) and change two elements to match the third: all become [1,1,1].*

**Example 3:**  
Input: `nums = [5,5,5,5], k = 0`  
Output: `4`  
*Explanation: No need to change any elements as all are equal. Maximum length is 4.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each possible subsequence, count how many changes are needed to make all its elements equal. For each length, loop to check if ≤ k changes suffice. This is too slow since there are 2ⁿ subsequences.

- **Optimization:**  
  Notice that for any fixed value x, the largest subsequence that can be changed into all x's by at most k changes is:  
  Just find the longest subsequence with at most k elements not equal to x.

- **Dynamic Programming:**  
  - Let dp[i][c] denote the length of longest good subsequence ending at position i, using at most c changes.
  - For each element, try to extend all previous subsequences with 0..k allowed changes.
  - If nums[i] == nums[j], you don't need a change; otherwise, one change is consumed when attaching nums[i] to a previous subsequence.

- **Implementation choice:**  
  The optimized DP approach: For each i, and for each allowed number of changes c (0 ≤ c ≤ k), check all j < i and consider:  
    - If nums[i] == nums[j], extend dp[j][c]  
    - If nums[i] ≠ nums[j] and c > 0, extend dp[j][c-1]

  This is O(n²×k), acceptable for small n.

- **Why not use hashing?**  
  Because element positions matter (subsequence, not subset), we need to consider order and possible picks, not just value counts.

### Corner cases to consider  
- Array has only one element.
- k = 0 (no changes allowed).
- All elements are already equal.
- All elements are distinct.
- k ≥ n (can change all values, answer is n).
- Large k but small array.
- Empty array (though by constraints, usually not allowed).

### Solution

```python
def maximumLength(nums, k):
    n = len(nums)
    # dp[i][c] = length of longest good subsequence ending at i with c changes so far
    dp = [[1] * (k + 1) for _ in range(n)]
    maxlen = 1
    
    for i in range(n):
        for j in range(i):
            for c in range(k + 1):
                if nums[i] == nums[j]:
                    # No change needed to extend subsequence
                    if dp[j][c] + 1 > dp[i][c]:
                        dp[i][c] = dp[j][c] + 1
                elif c > 0:
                    # Need one change to match
                    if dp[j][c - 1] + 1 > dp[i][c]:
                        dp[i][c] = dp[j][c - 1] + 1
        # Update answer
        maxlen = max(maxlen, max(dp[i]))
    
    return maxlen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × k)  
  We process every pair (i, j) and for every possible change count c, which results in n²k steps.

- **Space Complexity:** O(n × k)  
  The DP table stores n rows and k+1 columns.  

### Potential follow-up questions (as if you’re the interviewer)  

- What if k can be very large, near n?  
  *Hint: Can you use an optimized approach if you can change most values?*

- How would you solve it if you need to also return the actual subsequence or its indices?  
  *Hint: Track choices/parent pointers in DP.*

- Could you optimize the solution to O(n × k) for large n?  
  *Hint: Think about grouping by numbers, and sliding window in some variations (not possible here as order matters).*

### Summary
This problem uses a classic **dynamic programming** approach, similar to the Longest Increasing Subsequence (LIS) but with an extension for up to k substitutions.  
It's a variant of DP on sequences with a 'number of allowed mistakes/changes' state, which is a common coding pattern for sequence transformation problems.  
Other applications include error-tolerant substring/subsequence matching, string transformations with allowed edits, or similar DP problems with bounded changes.


### Flashcard
For each possible target value x, use DP to find the longest subsequence with at most k elements differing from x; dp[i][j] = max length ending at i with j changes.

### Tags
Array(#array), Hash Table(#hash-table), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)
- Maximum Length of Repeated Subarray(maximum-length-of-repeated-subarray) (Medium)