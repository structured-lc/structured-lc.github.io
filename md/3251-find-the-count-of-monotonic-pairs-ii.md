### Leetcode 3251 (Hard): Find the Count of Monotonic Pairs II [Practice](https://leetcode.com/problems/find-the-count-of-monotonic-pairs-ii)

### Description  
Given an array of **positive integers** `nums` of length n, find the number of pairs of non-negative integer arrays `(arr₁, arr₂)`, both of length n, such that:
- `arr₁` is **monotonically non-decreasing** (arr₁ ≤ arr₁[1] ≤ ... ≤ arr₁[n-1])
- `arr₂` is **monotonically non-increasing** (arr₂ ≥ arr₂[1] ≥ ... ≥ arr₂[n-1])
- For every index i, `arr₁[i] + arr₂[i] = nums[i]`  
Return the number of such valid pairs **modulo 10⁹+7**.

### Examples  

**Example 1:**  
Input: `nums = [1,1]`  
Output: `3`  
*Explanation: Possible `(arr₁, arr₂)` pairs are:*
- ( [0,0], [1,1] )
- ( [0,1], [1,0] )
- ( [1,1], [0,0] )

**Example 2:**  
Input: `nums = [2,1,2]`  
Output: `8`  
*Explanation: Stepwise count for each index while maintaining monotonicity for both arrays. See below for counting states at each transition.*

**Example 3:**  
Input: `nums = [2]`  
Output: `3`  
*Explanation: Possible (arr₁, arr₂): (0,2), (1,1), (2,0). Both arrays are length 1: always monotonic.*

### Thought Process (as if you’re the interviewee)  
First, brute-force would involve generating all possible splits of `nums[i]` into arr₁[i], arr₂[i] for each i, then filtering by monotonicity. That's O(Mⁿ) (M=max(nums)), too slow.

Arr₁ and arr₂ are tightly linked: arr₂[i] = nums[i] - arr₁[i].  
Monotonicity for arr₁ is arr₁[i] ≥ arr₁[i-1].  
Monotonicity for arr₂ is arr₂[i] ≤ arr₂[i-1] ⇒ nums[i] - arr₁[i] ≤ nums[i-1] - arr₁[i-1] ⇒ arr₁[i] ≥ arr₁[i-1] + nums[i] - nums[i-1].

Key:  
- At each position i, knowing arr₁[i-1], the choices for arr₁[i] are within certain bounds.  
- **DP approach:** dp[i][num] = number of valid configurations up to i, where arr₁[i]=num.

Recurrence for dp:
- Base: For i=0, 0 ≤ arr₁ ≤ nums, each is one way.
- Step: For i>0, arr₁[i] ≥ arr₁[i-1] (non-decreasing) and arr₁[i] ≥ arr₁[i-1] + nums[i] - nums[i-1] (from non-increasing arr₂).  
So arr₁[i-1] ≤ arr₁[i] ≤ nums[i], arr₁[i-1] ≤ arr₁[i], arr₁[i] ≥ arr₁[i-1] + nums[i] - nums[i-1].  
The effective range:  
arr₁[i-1] ≤ arr₁[i] ≤ nums[i], arr₁[i-1] ≥ arr₁[i] - (nums[i] - nums[i-1])

Final DP is O(nM) for M=max(nums), which is efficient.

### Corner cases to consider  
- Empty `nums` (should return 0 or 1, depending on constraints)
- All numbers identical (maximizes possible monotonic splits)
- Strictly increasing vs. strictly decreasing, which shrinks valid configurations
- nums of length 1 (trivially always valid)
- Maximally large values (to check for modulo overflow)

### Solution

```python
def countOfPairs(nums):
    MOD = 10**9 + 7
    n = len(nums)
    max_num = max(nums)
    
    # dp[i][num]: #ways with arr1[i] == num
    dp = [ [0] * (max_num + 1) for _ in range(n) ]
    
    # Base case: for i==0, arr1[0]=num possible for 0<=num<=nums[0]
    for num in range(nums[0]+1):
        dp[0][num] = 1

    for i in range(1, n):
        prefix = [0] * (max_num + 2)
        # prefix sums for efficient range sum queries on dp[i-1][*]
        for prev in range(max_num+1):
            prefix[prev+1] = (prefix[prev] + dp[i-1][prev]) % MOD
        
        for curr in range(nums[i]+1):
            # arr1[i-1] ≤ curr         (non-decreasing arr1)
            # arr1[i-1] ≥ curr - (nums[i] - nums[i-1]) (from monotonic arr2)
            low = max(0, curr - (nums[i] - nums[i-1]))   # arr1[i-1] >= curr - (nums[i] - nums[i-1])
            high = curr                                   # arr1[i-1] <= curr
            if low <= high:
                dp[i][curr] = (prefix[high+1] - prefix[low]) % MOD

    return sum(dp[n-1][num] for num in range(nums[-1]+1)) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = len(nums), m = max(nums).  
  For each of n positions, we do m work (prefix sum + filling DP for 0..nums[i]).
- **Space Complexity:** O(n × m), storing DP table of size n rows by max(nums) columns.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize space—can you reduce the DP to use O(m) space?
  *Hint: Only rows i and i-1 are needed at each step, so use space-optimized rolling arrays.*

- What if nums can contain zeros or is not guaranteed to be positive?
  *Hint: Review handling for non-positive splits, and ensure 0 ≤ arr₁[i], arr₂[i].*

- How do you recover one or all such valid (arr₁, arr₂) pairs, not just their count?
  *Hint: Use backtracking or reconstruct using DP traceback for small examples.*

### Summary
This problem is a **classic DP on sequences**, with monotonic constraints on two derived arrays tightly connected through element-wise sums. The approach is broadly applicable anywhere you need to count monotonic sequences with value relationships—common in DP, interval, and prefix combinatorics. Key patterns: **DP state design, range-based DP transitions, prefix sums for optimization.**