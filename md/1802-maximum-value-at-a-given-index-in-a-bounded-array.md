### Leetcode 1802 (Medium): Maximum Value at a Given Index in a Bounded Array [Practice](https://leetcode.com/problems/maximum-value-at-a-given-index-in-a-bounded-array)

### Description  
Given the integers **n**, **index**, and **maxSum**, construct an array **nums** of length n such that:
- Each element is a **positive integer**
- The **absolute difference** between any two consecutive elements is at most 1
- The **sum** of all elements is **≤ maxSum**
- Among all such valid arrays, **maximize nums[index]** (the value at index)

Return the **maximum possible value** at nums[index].


### Examples  

**Example 1:**  
Input: `n=4, index=2, maxSum=6`  
Output: `2`  
*Explanation: Arrays such as [1,1,2,1] and [1,2,2,1] are possible. We can't put 3 anywhere because that would require the sum to be at least 1+2+3+2 (for example), which exceeds maxSum. So the maximum at position 2 is 2.*

**Example 2:**  
Input: `n=6, index=1, maxSum=10`  
Output: `3`  
*Explanation: The array [2,3,2,1,1,1] is one valid choice (sum is 10, max at index 1 is 3), and others like [1,3,2,2,1,1] also work. No way to place 4 at index 1 under the given sum.*

**Example 3:**  
Input: `n=1, index=0, maxSum=24`  
Output: `24`  
*Explanation: Only one element, it can be all of the sum.*


### Thought Process (as if you’re the interviewee)  

First, observe the constraints:
- Each number must be positive (≥1)
- Each step away from index can decrease by at most 1 per position (due to |nums[i+1] - nums[i]| ≤ 1)
- To maximize nums[index], minimize the rest of the array

Brute-force: Try every possible array, but that's obviously infeasible for large n. Immediate optimization: for a fixed value k at index, what's the minimal sum the array can have?  
- To the left of index, we can have a "pyramid" decreasing by one each step until reaching 1.
- Same to the right.

So, for a candidate value k, we compute the minimum possible sum for the array, then binary search for the largest k such that this sum ≤ maxSum.

**Why binary search?**  
- If k is too big, sum will overshoot.  
- Search space is monotonic for k, so binary search is perfect.

Trade-offs:  
- O(log(maxSum) × O(1)) if we can compute the minimum sum for a given k in O(1).


### Corner cases to consider  
- n = 1 (single element arrays: just pick maxSum)
- index = 0 or index = n-1 (max value is at first or last position, one-sided pyramid)
- maxSum barely enough for all ones (all must be 1: best you can get is 1)
- Large n but small maxSum (forces smallest possible array)
- maxSum huge (can climb as high as indexing allows)

### Solution

```python
def maxValue(n, index, maxSum):
    # Helper to compute minimal sum required for value v at index
    def required_sum(v):
        # For left side (index elements before index)
        if v > index:
            # Using pyramid: decreasing down to at least 1
            left_sum = (v - 1 + v - index) * index // 2
        else:
            # v might drop to 1 before reaching far left; fill the rest with 1
            left_sum = (v - 1 + 1) * (v - 1) // 2 + (index - (v - 1))
        
        # For right side (elements after index)
        right_cnt = n - index - 1
        if v > right_cnt:
            right_sum = (v - 1 + v - right_cnt) * right_cnt // 2
        else:
            right_sum = (v - 1 + 1) * (v - 1) // 2 + (right_cnt - (v - 1))
        
        return left_sum + right_sum + v

    # The lowest value at index is 1, highest is maxSum
    lo, hi = 1, maxSum
    ans = 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if required_sum(mid) <= maxSum:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log(maxSum)), because we perform binary search over possible values for nums[index], and computation for sum at each step is O(1).
- **Space Complexity:** O(1), as no extra space beyond variables; no recursion, no auxiliary structures.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the array could contain zeros instead of strictly positive numbers?  
  *Hint: Adjust how the "pyramid" falls under 1; the base could be zero, and sum calculation must allow zeros.*

- If you had to return the actual array, not just the value at index?  
  *Hint: Use the same logic, construct left pyramid from index, fill rest with ones, and adjust to total sum.*

- How would you handle updates if maxSum changes multiple times, but n and index remain the same?  
  *Hint: Precompute for index and n, use properties or cache pyramid profiles for quick updates.*


### Summary
This problem showcases the **binary search on answer** pattern, common in maximization/minimization problems with monotonic constraints. Efficient pyramid-sum calculation for both sides of the target index allows us to quickly test each candidate and converge to the answer. This same pattern applies wherever gradual increase/decrease with bounds and total constraints are involved—good for interval-filling, pyramid or "mountain" arrays, and resource allocation with step-restrictions.

### Tags
Math(#math), Binary Search(#binary-search), Greedy(#greedy)

### Similar Problems
