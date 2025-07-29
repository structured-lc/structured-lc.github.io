### Leetcode 910 (Medium): Smallest Range II [Practice](https://leetcode.com/problems/smallest-range-ii)

### Description  
You are given an integer array `nums` and an integer `k`. For each element in `nums`, you can either add `k` or subtract `k` from it (you must choose exactly one operation per element). After performing exactly one operation on each element, the *score* of the array is defined as the difference between its maximum and minimum value. Your task is to return the smallest possible score you can achieve after all such transformations.

### Examples  

**Example 1:**  
Input: `nums = [1], k = 0`  
Output: `0`  
*Explanation: The array contains only one element. After adding or subtracting 0, the score is 1 - 1 = 0.*

**Example 2:**  
Input: `nums = [0, 10], k = 2`  
Output: `6`  
*Explanation: You can transform nums into [2, 8] (add 2 to 0, subtract 2 from 10); the difference is 8 - 2 = 6.*

**Example 3:**  
Input: `nums = [1, 3, 6], k = 3`  
Output: `3`  
*Explanation: Sort then transform:*
- *Add k to lower part and subtract k from higher part. Try all partitions:*
    - *All add: [4, 6, 9]  → 9 - 4 = 5*
    - *All sub: [-2, 0, 3] → 3 - (-2) = 5*
    - *Split at i=1: [4, 6, 3]; min = 3, max = 6 → 6 - 3 = 3 (optimal)*
    - *Split at each index and analyze min/max. The smallest achievable gap is 3.*

### Thought Process (as if you’re the interviewee)  
First, a *brute-force* approach would be to try every combination of adding or subtracting `k` to each element — there are 2ⁿ possibilities for n elements, which is not feasible.

We need to optimize.  
- Let's **sort the array**. If all elements are increased by k, the new max is nums[-1]+k and min is nums+k; if all decreased, max is nums[-1]-k, min is nums-k.
- But the best value could be achieved by increasing the "lower" values (the first part of the sorted array) and decreasing the "higher" values (the second part).
- For every split at index i (1 ≤ i < n), we can:
    - Add k to nums[0 ... i-1] and subtract k from nums[i ... n-1].
    - The new min = min(nums+k, nums[i]-k)
    - The new max = max(nums[i-1]+k, nums[-1]-k)
    - Track the minimum difference found.

Final approach:
- Sort nums.
- For each possible split, calculate min/max as above and update the minimum difference.

This is efficient because we only check n possibilities, not 2ⁿ.

### Corner cases to consider  
- Single-element array (always 0)
- All elements equal (should return 0)
- Large k relative to the spread of numbers
- k = 0 (no change)
- Array already smallest possible range

### Solution

```python
def smallestRangeII(nums, k):
    # Sort to evaluate split points
    nums.sort()
    n = len(nums)
    ans = nums[-1] - nums[0]  # initial: no change

    for i in range(1, n):
        # Compute min and max after splitting at i
        high = max(nums[i-1] + k, nums[-1] - k)
        low = min(nums[0] + k, nums[i] - k)
        ans = min(ans, high - low)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  *Sorting* the array takes n log n. The for loop runs O(n).
- **Space Complexity:** O(1) extra space (in-place operations aside from input sort).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could only add k or only subtract k, not both?  
  *Hint: Try all elements with just one direction, then take min/max as needed.*

- What if instead of adding/subtracting k, you could multiply/divide by k?  
  *Hint: Multiplicative intervals behave very differently—think about normalization.*

- How would you do this if negative numbers were not allowed after the transformation?  
  *Hint: Add a conditional—don't subtract from elements smaller than k.*

### Summary
This solution uses the *greedy partition & sweep* pattern, commonly found in range minimization or maximizing gap after modification problems. Sorting then considering all possible split points is a powerful linear pass technique. This pattern also appears in minimizing maximum difference after changing array values, or in partitioning arrays for optimal buckets.