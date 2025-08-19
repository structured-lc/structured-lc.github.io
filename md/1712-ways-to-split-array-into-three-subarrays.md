### Leetcode 1712 (Medium): Ways to Split Array Into Three Subarrays [Practice](https://leetcode.com/problems/ways-to-split-array-into-three-subarrays)

### Description  
Given an array of non-negative integers, find the number of ways to split the array into three non-empty contiguous subarrays: **left**, **mid**, and **right**, such that  
- sum(left) ≤ sum(mid) ≤ sum(right)  
Return the count of such ways modulo 1,000,000,007. The subarrays must be contiguous and non-empty. "Splitting" means picking two split points i and j (with 0 < i < j < n) such that these sum conditions are satisfied.

### Examples  

**Example 1:**  
Input: `nums = [1,2,2,2,5,0]`  
Output: `3`  
*Explanation:  
Possible splits are:  
- [1] | [2,2] | [2,5,0]  
  left=1, mid=4, right=7; 1 ≤ 4 ≤ 7  
- [1] | [2,2,2] | [5,0]  
  left=1, mid=6, right=5; 1 ≤ 6 ≤ 5 (mid > right, not valid)  
- [1,2] | [2] | [2,5,0]  
  left=3, mid=2, right=7; 3 ≤ 2 (left > mid, not valid)  
- [1,2] | [2,2] | [5,0]  
  left=3, mid=4, right=5; 3 ≤ 4 ≤ 5 (valid)  
- [1,2,2] | [2] | [5,0]  
  left=5, mid=2, right=5; 5 ≤ 2 (left > mid, not valid)  
- [1,2,2] | [2,2] | [5,0]  
  left=5, mid=4, right=5; 5 ≤ 4 (left > mid, not valid)  
- [1,2,2,2] | [5] |   
  left=7, mid=5, right=0; ...  
So, after checking all splittings, there are `3` valid ways.*

**Example 2:**  
Input: `nums = [1,1,1]`  
Output: `1`  
*Explanation:  
Only split: [1] | [1] | [1]; left=1, mid=1, right=1; satisfies 1 ≤ 1 ≤ 1.*

**Example 3:**  
Input: `nums = [2,3,5,1,1,2,2,2]`  
Output: `10`  
*Explanation:  
There are 10 different ways to split that meet the condition (see the solution for step-by-step splits).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try every possible i (end of left) and j (end of mid). For each pair (i, j), compute prefix sums for left, mid, right to check sum conditions.  
  This leads to ⌊n/2⌋² possibilities:  
  - Too slow (O(n²)). Not scalable for large arrays.

- **Optimization:**  
  Can we efficiently test the valid splits for a fixed left end (i)?  
  - Precompute prefix sums for fast sum lookup.  
  - For each i (end of left), use binary search to:  
    - Find the smallest j where sum(left) ≤ sum(mid)
    - Find the largest j where sum(mid) ≤ sum(right)
  - For each i, the number of valid js is (rightmost - leftmost + 1).  
  - This brings it to O(n log n).

- **Trade-offs:**  
  The chosen approach uses prefix sums + two binary searches per split point i.  
  - O(n log n) time is optimal under constraints.
  - Prefix sum is O(n) space.
  - No need for extra fancy data structures—just calculation and searching.

### Corner cases to consider  
- All elements are zero: e.g., [0,0,0,0]; every split is valid; should not over/under-count  
- Input of length < 3: no way to make three non-empty subarrays  
- Very large elements, may cause sum overflow if not careful  
- Non-strict vs. strict inequalities ("≤", not "<", so equal sums are allowed)  
- Edge splits: left, mid, right are all single elements, or as unbalanced as possible  
- Only increasing or decreasing sequences

### Solution

```python
def waysToSplit(nums):
    MOD = 10 ** 9 + 7
    n = len(nums)
    prefix = [0] * (n + 1)
    # Compute prefix sum for quick range sum queries
    for i in range(n):
        prefix[i + 1] = prefix[i] + nums[i]

    res = 0
    # Each i is end of 'left' (must leave at least one for mid and right)
    for i in range(1, n - 1):
        left_sum = prefix[i]
        # First binary search: min j where sum(mid) ≥ left_sum
        # left is nums[0:i], mid is nums[i:j], right is nums[j:n]
        lo, hi = i + 1, n - 1
        l = -1
        while lo <= hi:
            mid = (lo + hi) // 2
            mid_sum = prefix[mid] - prefix[i]
            if mid_sum >= left_sum:
                l = mid
                hi = mid - 1
            else:
                lo = mid + 1
        if l == -1:
            continue  # No valid mid for this i

        # Second binary search: max j where sum(mid) ≤ sum(right)
        lo, hi = l, n - 1
        r = -1
        while lo <= hi:
            mid = (lo + hi) // 2
            mid_sum = prefix[mid] - prefix[i]
            right_sum = prefix[n] - prefix[mid]
            if mid_sum <= right_sum:
                r = mid
                lo = mid + 1
            else:
                hi = mid - 1
        if r == -1:
            continue

        res = (res + (r - l + 1)) % MOD

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n). For each split point (n choices), perform up to 2 binary searches (log n each).
- **Space Complexity:** O(n). For storing prefix sum array of size n+1.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are negative numbers in the array?  
  *Hint: Problem constraints specifically say non-negative; with negatives, prefix sum properties break.*

- Can you achieve O(n) time complexity?  
  *Hint: For monotonic sum distributions, maybe two-pointer approach can work, but equality constraints make it tricky.*

- How would you generalize to k splits (k contiguous subarrays with k-1 splits, each sum fulfilling similar criteria)?  
  *Hint: It’s possible but would likely require recursion or DP, potentially with prefix sums and advanced search logic.*

### Summary
This problem uses the **prefix sum + binary search** pattern to efficiently determine valid split points under multiple sum constraints. The approach is generally applicable to subarray partitioning problems with cumulative constraints and is a classic technique in subarray sum interval counting. Recognizing how to use prefix sums for quick range queries and binary search for locating valid intervals is key and repeatedly useful in interview problems.

### Tags
Array(#array), Two Pointers(#two-pointers), Binary Search(#binary-search), Prefix Sum(#prefix-sum)

### Similar Problems
- Number of Ways to Divide a Long Corridor(number-of-ways-to-divide-a-long-corridor) (Hard)
- Number of Ways to Split Array(number-of-ways-to-split-array) (Medium)