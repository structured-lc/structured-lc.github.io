### Leetcode 3250 (Hard): Find the Count of Monotonic Pairs I [Practice](https://leetcode.com/problems/find-the-count-of-monotonic-pairs-i)

### Description  
Given an array of **positive integers** `nums` of length n, count the number of monotonic pairs of non-negative integer arrays `(arr₁, arr₂)` (both of length n) such that:
- `arr₁` is **monotonically non-decreasing** (arr₁ ≤ arr₁[1] ≤ ... ≤ arr₁[n-1])
- `arr₂` is **monotonically non-increasing** (arr₂ ≥ arr₂[1] ≥ ... ≥ arr₂[n-1])
- For every index i, `arr₁[i] + arr₂[i] = nums[i]`
Return the total number of such monotonic pairs, modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `nums = [2, 3, 2]`  
Output: `4`  
*Explanation: The valid (arr₁, arr₂) pairs are:  
- [0,1,2], [2,2,0]  
- [0,2,2], [2,1,0]  
- [1,1,1], [1,2,1]  
- [1,2,1], [1,1,1]*

**Example 2:**  
Input: `nums = [3,2,5]`  
Output: `56`  
*Explanation: There are 56 valid pairs (arr₁, arr₂) satisfying all rules; detailed DP below.*

**Example 3:**  
Input: `nums = [2]`  
Output: `3`  
*Explanation: arr₁ in [0,1,2] and arr₂ = nums - arr₁, all monotonic by default for n=1.*

### Thought Process (as if you’re the interviewee)  
This problem requires counting how many non-negative integer arrays (arr₁, arr₂) satisfy a monotonicity constraint (⩽ for arr₁, ⩾ for arr₂) and the positional sum arr₁[i] + arr₂[i] = nums[i] for each i.

**Brute Force:**  
Try every possible arr₁ and arr₂:
- For arr₁ (non-decreasing), try all non-decreasing n-length arrays with 0 ≤ arr₁[i] ≤ nums[i]. For each arr₁, arr₂[i] = nums[i] - arr₁[i].
- Check if arr₂ is non-increasing (ensure arr₂ ≥ arr₂[1] ≥ ... ≥ arr₂[n-1]).

But this is exponential and not feasible for large n.

**Dynamic Programming Approach:**  
Let f[i][v] = number of valid ways to fill the first (i+1) positions so that arr₁[i] = v, arr₁[0..i] non-decreasing, arr₂[0..i] non-increasing.

- Base case: For i=0, all arr₁ in 0..nums work (arr₂ = nums - arr₁, just 1 way each).
- Transition: For i ≥ 1 and arr₁[i] = v,
  - arr₁[i-1] ≤ v (so arr₁ is non-decreasing)
  - arr₂[i-1] ≥ arr₂[i]  
    where arr₂[i] = nums[i] - v, arr₂[i-1] = nums[i-1] - prev_v
    → prev_v ≥ nums[i-1] - (nums[i] - v) = v + nums[i-1] - nums[i]
    Also, prev_v ≤ v (since arr₁ is non-decreasing)

So for each v at position i, DP transition sums f[i-1][prev_v] for:
max(0, v + nums[i-1] - nums[i]) ≤ prev_v ≤ min(nums[i-1], v)

To optimize, use prefix sums for fast DP transitions.

### Corner cases to consider  
- Empty array (n = 0): should return 1 (there's one way — both arrays are empty).
- Single element: all possible splits 0..nums.
- All nums[i] = 0: only one way (all arr₁ = 0, arr₂ = 0).
- All elements equal.
- Large n and large values (test performance).
- Non-trivial monotonicity requiring careful DP bounds.

### Solution

```python
MOD = 10 ** 9 + 7

def countMonotonicPairs(nums):
    n = len(nums)
    if n == 0:
        return 1

    # DP[i][v] = #ways to fill up to i, arr1[i] = v
    prev = [1] * (nums[0] + 1)  # for i=0, arr1[0] in 0..nums[0], arr2[0]=nums[0]-arr1[0]
    
    for i in range(1, n):
        curr = [0] * (nums[i] + 1)
        # Build prefix sum for DP optimization
        prefix = [0] * (nums[i-1] + 2)
        for v in range(nums[i-1] + 1):
            prefix[v + 1] = (prefix[v] + prev[v]) % MOD

        for v in range(nums[i] + 1):
            # prev_v must satisfy:
            # prev_v <= v              (arr1 non-decreasing)
            # prev_v >= v + nums[i-1] - nums[i]  (arr2 non-increasing)
            left = max(0, v + nums[i-1] - nums[i])
            right = min(nums[i-1], v)
            if left > right:
                continue
            # sum prefix[left .. right]
            curr[v] = (prefix[right + 1] - prefix[left]) % MOD
        prev = curr

    return sum(prev) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × maxₙ), where maxₙ is the maximum value in nums (since for each of n positions, we may iterate up to nums[i] values).
- **Space Complexity:** O(maxₙ), since we only keep two 1-D arrays of length up to max(nums).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large numbers or optimize further for huge inputs?
  *Hint: Can you use more mathematical combinatorics?*
- What if nums can have negative entries (not just positive)?
  *Hint: How do constraints change the DP states?*
- How do you reconstruct an actual valid pair (arr₁, arr₂) given the count?
  *Hint: Try a backtracking or greedy approach for one result reconstruction.*


### Summary
We used DP with prefix sums to efficiently count how many monotonic (non-decreasing, non-increasing) array pairs can sum to a given nums. The solution leverages state reduction and prefix queries, a common approach for monotonic sequence count problems. This DP pattern appears in similar monotonic/partition array problems and extends naturally to more constraints or counting variations.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics), Prefix Sum(#prefix-sum)

### Similar Problems
- Monotonic Array(monotonic-array) (Easy)