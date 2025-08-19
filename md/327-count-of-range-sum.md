### Leetcode 327 (Hard): Count of Range Sum [Practice](https://leetcode.com/problems/count-of-range-sum)

### Description  
Given an integer array **nums** and two integers **lower** and **upper**, count the number of (i, j) pairs (with 0 ≤ i ≤ j < n) such that the sum of the subarray nums[i..j] is in the range \[lower, upper\], inclusive. The subarray sum is the sum of elements from the iᵗʰ to the jᵗʰ index of nums.

### Examples  

**Example 1:**  
Input: `nums = [-2, 5, -1]`, `lower = -2`, `upper = 2`  
Output: `3`  
*Explanation: The range sums that lie in \[-2, 2\] are:*
- *nums = -2*
- *nums[2] = -1*
- *nums[0..2] = 2*

**Example 2:**  
Input: `nums = [1, 2, -1]`, `lower = 1`, `upper = 2`  
Output: `3`  
*Explanation: The valid subarrays are:*
- *nums = 1*
- *nums[1] = 2*
- *nums[0,1,2] = 2*  
(because 1, 2, and (1 + 2 - 1) = 2 are each in the range 1..2)

**Example 3:**  
Input: `nums = `, `lower = 0`, `upper = 0`  
Output: `1`  
*Explanation: Only one subarray (nums=0) falls in the range.*

### Thought Process (as if you’re the interviewee)  
The brute-force idea is to check all possible subarrays and count those with sum in the given range. This involves looking at all (i, j) pairs with 0 ≤ i ≤ j < n, and for each, summing nums[i..j]. This is O(n²) time and won't work for large inputs.

To optimize, the key is to realize that the subarray sum from i to j can be expressed using prefix sums:
- sum(nums[i..j]) = prefixSum[j+1] - prefixSum[i]

We want for all pairs (i < j), prefixSum[j + 1] - prefixSum[i] ∈ [lower, upper],
which rearranges to:
- prefixSum[j + 1] - upper ≤ prefixSum[i] ≤ prefixSum[j + 1] - lower

This fits the classic "count number of previous prefix sums within a range" problem. Efficient approaches:
- **Merge Sort on prefix sums:** For each prefix sum (as we split and merge), count, in log(n) time per query, how many prefix sums are within a range.
- **Binary Indexed Tree/Ordered Set:** Insert prefix sums as we go, and for each new sum, count prefix sums in a particular interval (by lower_bound and upper_bound queries).

This brings time complexity to O(n log n).
The merge sort variant is widely used since it’s more interview-friendly and doesn’t require building a binary tree from scratch.

### Corner cases to consider  
- Empty array: Should return 0.
- Array with all zeroes, and zero-range.
- Lower > upper: Should return 0.
- Single element array, both inside and outside the range.
- Large negative/positive numbers.
- No valid range sums.

### Solution

```python
def countRangeSum(nums, lower, upper):
    # Compute prefix sums
    prefix = [0]
    for num in nums:
        prefix.append(prefix[-1] + num)
    
    def sort(lo, hi):
        # Return count of valid pairs, and sorted prefix[lo:hi]
        if hi - lo <= 1:
            return 0
        mid = (lo + hi) // 2
        count = sort(lo, mid) + sort(mid, hi)
        j = k = mid
        temp = []
        for left in prefix[lo:mid]:
            # Find window of right values where:
            # lower ≤ right - left ≤ upper  ⟺  left + lower ≤ right ≤ left + upper
            while k < hi and prefix[k] - left < lower:
                k += 1
            while j < hi and prefix[j] - left <= upper:
                j += 1
            count += j - k
        # Merge step (to keep prefix sorted)
        l, r = lo, mid
        merged = []
        while l < mid and r < hi:
            if prefix[l] <= prefix[r]:
                merged.append(prefix[l])
                l += 1
            else:
                merged.append(prefix[r])
                r += 1
        merged.extend(prefix[l:mid])
        merged.extend(prefix[r:hi])
        # Copy merged back to prefix
        prefix[lo:hi] = merged
        return count
    
    return sort(0, len(prefix))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), since each divide and merge step (over prefix sums) is O(n), and there are O(log n) levels due to recursion (same recurrence as merge sort).
- **Space Complexity:** O(n), for the prefix array and for the temporary arrays created during merging and recursion.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the data does not fit in memory?
  *Hint: Can you process counts in streaming/fenwick-tree with discretization, or by blocks?*

- Can you handle updates efficiently?
  *Hint: Is there a data structure that supports prefix sums and dynamic inserts efficiently?*

- What if you want to return the subarrays themselves?
  *Hint: Track indices as you sort/merge, or do extra bookkeeping to reconstruct ranges.*

### Summary
This problem uses the prefix sum plus "count of range in prefix" coding pattern, with the solution exploiting the merge sort divide-and-conquer to keep track of how many prefix sum pairs fall within the required interval. This is a fundamental approach for "count the number of subarrays with sum in [a, b]" and appears often in subarray, log-time counting problems. The pattern can be used in problems involving intersecting ranges, 2-sum/3-sum filtered by bounds, and is closely related to using Fenwick/Segment Trees for frequency queries.

### Tags
Array(#array), Binary Search(#binary-search), Divide and Conquer(#divide-and-conquer), Binary Indexed Tree(#binary-indexed-tree), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Ordered Set(#ordered-set)

### Similar Problems
- Count of Smaller Numbers After Self(count-of-smaller-numbers-after-self) (Hard)
- Reverse Pairs(reverse-pairs) (Hard)
- Count the Number of Fair Pairs(count-the-number-of-fair-pairs) (Medium)
- Find the Number of Copy Arrays(find-the-number-of-copy-arrays) (Medium)