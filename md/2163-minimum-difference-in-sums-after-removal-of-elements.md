### Leetcode 2163 (Hard): Minimum Difference in Sums After Removal of Elements [Practice](https://leetcode.com/problems/minimum-difference-in-sums-after-removal-of-elements)

### Description  
Given an integer array **nums** of length 3n, you can remove any subsequence of exactly n elements. The remaining 2n elements are split into two equal contiguous parts: the first n form `sum_first`, the next n form `sum_second`. Return the minimum possible value of `sum_first - sum_second` after removal.  
The challenge is to choose which n elements to remove so that when the remaining elements are split, the two n-sized partitions are as close as possible in sum, minimizing `sum_first - sum_second` (can be negative).

### Examples  

**Example 1:**  
Input: `nums = [3,1,2]`  
Output: `-1`  
Explanation: n = 1.  
- Remove nums=3  → [1,2], difference: 1-2 = -1.  
- Remove nums[1]=1  → [3,2], difference: 3-2 = 1.  
- Remove nums[2]=2  → [3,1], difference: 3-1 = 2.  
- Minimal difference is -1.

**Example 2:**  
Input: `nums = [7,9,5,8,1,3]`  
Output: `4`  
Explanation: n = 2.  
- There are multiple options, but removing the right elements (here, 9 and 1) results in arrays: [7,5,8,3].  
- `sum_first = 7 + 5 = 12`, `sum_second = 8 + 3 = 11`, difference: 12-11 = 1.  
(If another optimal removal is possible, adjust per sample solution.)

**Example 3:**  
Input: `nums = [1,3,5,2,6,4,8,7,9]`  
Output: `-1`  
Explanation: n = 3.  
- For multiple removal combinations, minimal difference is -1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Try all possible ways to remove n elements from the array, then for each resulting array, split into two n-sized parts and track the minimum difference. However, this approach is \( O(\binom{3n}{n}) \), which is computationally infeasible for n > 2.
- **Optimal approach:**  
  - Observe that after removing n elements, the two n-sized slices must be *contiguous*—the *first n* and *next n* elements of the remaining array.
  - The problem can be transformed:  
    - For the first 2n elements, find the *minimum* total sum possible by keeping n elements (use a max-heap to keep n smallest prefix sum).
    - For the last 2n elements (suffix), find the *maximum* sum possible by keeping n elements (use a min-heap for suffix sums).
    - This is done by sliding a window and maintaining the n smallest/largest.
    - For each split position, calculate difference between prefix and suffix minimums.
  - This reduces the problem to O(n log n) using priority queues (heaps).
- **Trade-offs:** This solution is optimal for large n, avoids redundancy, and leverages heap data structures.

### Corner cases to consider  
- All elements are equal (difference is always zero).
- Array sorted ascending or descending.
- Repeated numbers, or all negative numbers.
- n = 1 (minimal base case).
- Removal causes prefix or suffix sums to reach extreme values.

### Solution

```python
def minimumDifference(nums):
    n = len(nums) // 3

    # Precompute prefix min sum (keep n smallest from left part)
    import heapq

    left_heap = []
    left_sum = 0
    prefix_min_sum = [0] * (2 * n + 1)
    for i in range(2 * n):
        # Use negative to create a max-heap (Python heapq is min-heap)
        heapq.heappush(left_heap, -nums[i])
        left_sum += nums[i]
        # If more than n, pop largest to keep n smallest
        if len(left_heap) > n:
            left_sum += heapq.heappop(left_heap)
        prefix_min_sum[i + 1] = left_sum

    # Precompute suffix max sum (keep n largest from right part)
    right_heap = []
    right_sum = 0
    suffix_max_sum = [0] * (2 * n + 1)
    for i in range(3 * n - 1, n - 1, -1):
        heapq.heappush(right_heap, nums[i])
        right_sum += nums[i]
        # If more than n, pop smallest to keep n largest
        if len(right_heap) > n:
            right_sum -= heapq.heappop(right_heap)
        suffix_max_sum[i - n] = right_sum

    # For each split, calculate prefix_min_sum - suffix_max_sum
    min_diff = float('inf')
    for i in range(n, 2 * n + 1):
        diff = prefix_min_sum[i] - suffix_max_sum[i - n]
        if diff < min_diff:
            min_diff = diff
    return min_diff
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), since we maintain two heaps of size up to n, and do O(n) insert/removes for each heap.
- **Space Complexity:** O(n), heaps and prefix/suffix arrays are each O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to split the parts into k segments instead of 2?  
  *Hint: How to generalize the heap logic to multiple partitions?*

- Can you achieve the same with less auxiliary space?  
  *Hint: Is it possible to reuse memory or avoid explicit arrays?*

- How would you modify the logic if you had to minimize the *absolute* difference instead?  
  *Hint: Do you need to track sign or adjust calculation windows?*

### Summary
This problem uses the "prefix-suffix with heaps" pattern, efficiently keeping track of optimal substructure sums by sliding windows and priority queues. It is a classic application of min/max heap and prefix/suffix partitioning, and this pattern appears in challenging split/partition subarray problems where a greedy or single pass approach may not suffice.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
- Product of Array Except Self(product-of-array-except-self) (Medium)
- Find Subsequence of Length K With the Largest Sum(find-subsequence-of-length-k-with-the-largest-sum) (Easy)
- Find Minimum Cost to Remove Array Elements(find-minimum-cost-to-remove-array-elements) (Medium)