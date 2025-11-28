### Leetcode 3077 (Hard): Maximum Strength of K Disjoint Subarrays [Practice](https://leetcode.com/problems/maximum-strength-of-k-disjoint-subarrays)

### Description  
Given an integer array **nums** of length *n* and a **positive odd integer** k, select exactly **k disjoint subarrays** (*sub₁, sub₂, ..., subₖ*) such that for every 1 ≤ i < k, all elements in *subᵢ* precede those in *subᵢ₊₁*.  
You must maximize the *strength*:
- **strength = k × sum(sub₁) − (k−1) × sum(sub₂) + (k−2) × sum(sub₃) − ... ± sum(subₖ)**  
That is, starting with ‘+’, alternate the signs, and each sum is weighted by a descending integer from k to 1.

Return the maximum strength achievable.

### Examples  

**Example 1:**  
Input: `nums = [1, -2, 3, 4, -5, 6]`, `k = 3`  
Output: `23`  
*Explanation:  
Choose subarrays: [1, -2, 3], [4],   
Strength calculation:  
3 × (1−2+3) − 2 × (4) + 1 × (6) = 3 × 2 − 8 + 6 = 6 − 8 + 6 = 4  
But with choice [1], [−2,3,4], [−5,6],  
Strength = 3×1 − 2×(−2+3+4) + 1×(−5+6) = 3×1 − 2×5 + 1 = 3 − 10 + 1 = −6  
The optimal is [3,4], [−5],  ⇒ 3×7 − 2×(−5) + 1×6 = 21 + 10 + 6 = 37 (thus maximum is 37)*

**Example 2:**  
Input: `nums = [4, -1, 2, 1, -5, 4]`, `k = 3`  
Output: `19`  
*Explanation:  
Choose [4,-1,2,1], [−5], [4]  
3×6−2×(−5)+1×4 = 18+10+4=32*

**Example 3:**  
Input: `nums = [5]`, `k = 1`  
Output: `5`  
*Explanation:  
Only one subarray [5]. Strength = 1×5 = 5*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all possible ways to partition nums into exactly k disjoint subarrays. For each, compute the alternating sum formula. This is exponential and infeasible for n up to 50.

- **Dynamic Programming Approach:**  
  We define f[i][k][fresh], where:
  - i = current index in nums
  - k = number of subarrays left to pick
  - fresh = whether to start a new subarray at nums[i]
  
  At each position, we can:
  1. Skip nums[i] (if we’re at a fresh start)
  2. Include nums[i] in the current subarray
      - Continue the current subarray 
      - Or close the current and start the next subarray (if any remaining)

  The key insight:  
  - For the current chosen subarray (the jᵗʰ subarray, 1-based), its coefficient is **(k−j+1)**, and its sign alternates by subarray.
  - To capture sign alternation: (use k as a countdown, if k%2==1, sign is positive, else negative).

  **DP memoization:**  
  - Transition by picking or not picking the current element and starting or ending subarrays.
  - Base cases:  
    - If k==0 ⇒ 0  
    - If i==n and k>0 ⇒ invalid (−∞)
    - If remaining elements < k ⇒ impossible

  **Why is this approach efficient?**  
  Because state space is O(n × k × 2) and transition at each step is constant.

### Corner cases to consider  
- nums contains all negative numbers  
- k = 1 (only one subarray, maybe not whole array)  
- k = n (every element is an individual subarray)  
- nums contains zeros  
- Large values, positive and negative  
- Minimum possible input sizes  
- Subarrays may be of length 1

### Solution

```python
def maximumStrength(nums, k):
    n = len(nums)
    memo = {}
    kMin = -10**18

    # f(i, k, fresh) is the max strength using nums[i:], needing k subarrays, fresh==1 means start new subarray
    def dp(i, left, fresh):
        if n - i < left:
            return kMin
        if left == 0:
            return 0
        if i == n:
            return kMin

        key = (i, left, fresh)
        if key in memo:
            return memo[key]

        # Coefficient for this group: Alternates sign, starts as +, then -
        coeff = left if left % 2 == 1 else -left

        # Option 1: If fresh, can skip nums[i]
        res = kMin
        if fresh:
            res = dp(i + 1, left, True)

        # Option 2: Include nums[i]
        # (1) Continue current subarray (fresh=False)
        cont = dp(i + 1, left, False) + coeff * nums[i]
        res = max(res, cont)

        # (2) If not fresh, we can "close" current subarray here and start next
        if not fresh:
            # After closing, start a fresh subarray for left-1 subarrays
            next_start = dp(i + 1, left - 1, True) + coeff * nums[i]
            res = max(res, next_start)

        memo[key] = res
        return res

    return dp(0, k, True)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k × 2), since for each index (n), subarrays left (k), and fresh (2), we calculate at most once.
- **Space Complexity:** O(n × k × 2) for memoization, which is manageable for n, k ≤ 50.

### Potential follow-up questions (as if you’re the interviewer)  

- If k is not restricted to odd, does the approach still work?  
  *Hint: Try the formula for both even and odd values.*

- Can you retrieve the actual subarrays used in the optimal solution?  
  *Hint: Track choices during DP and reconstruct via backtracking.*

- How to optimize further if n is much larger?  
  *Hint: Can you prune states more aggressively or use iterative DP?*

### Summary
This problem uses a **dynamic programming** (interval DP) approach for partitioning arrays with alternating signed/coefficient sums, which is common in "pick k non-overlapping intervals to maximize weighted sum" problems. The key is capturing states: position, subarrays left, and whether starting new, and handling sign alternation and variable coefficients. This template generalizes to maximizing sum across disjoint subsegments with more complex weighting or sign alternating rules.


### Flashcard
Use DP with state f[i][k][fresh] (index, subarrays left, start new subarray); at each position, skip or include in current/new subarray.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
- Partition Array into Disjoint Intervals(partition-array-into-disjoint-intervals) (Medium)
- Maximum Strength of a Group(maximum-strength-of-a-group) (Medium)