### Leetcode 164 (Medium): Maximum Gap [Practice](https://leetcode.com/problems/maximum-gap)

### Description  
Given an array of integers, you must find the **maximum difference between any two consecutive elements in the array's sorted order**. If the array contains fewer than two elements, return 0. The algorithm must run in linear time and use linear extra space.

### Examples  

**Example 1:**  
Input: `nums = [3,6,9,1]`  
Output: `3`  
*Explanation: Sort to [1,3,6,9]. Differences: 3-1=2, 6-3=3, 9-6=3. The largest gap is 3.*

**Example 2:**  
Input: `nums = `  
Output: `0`  
*Explanation: Only one element. There are no consecutive pairs; return 0.*

**Example 3:**  
Input: `nums = [1,1,1,1]`  
Output: `0`  
*Explanation: All elements are the same. No gap between consecutive elements.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  - Sort the array, then loop through to find the maximum difference between adjacent elements.
  - Time: O(n log n) (for sorting). Space: O(n) (to store sorted copy).
  - Doesn't satisfy the O(n) requirement.
- **Optimized (Bucket Sort):**  
  - In O(n) time, use a form of bucket sort that leverages the pigeonhole principle:
    - If n numbers span a range [min, max], the minimal possible maximum gap is at least ⌈(max-min)/(n-1)⌉.
    - Place numbers into buckets that each represent a small span of possible values.
    - Only the **min** and **max** value in each (non-empty) bucket matter.
    - The maximum gap is **not** inside a bucket, but between the max of one non-empty bucket and the min of the next non-empty bucket.
  - Why this method:
    - Sorting n values to n buckets (at most one value per bucket in extreme cases).
    - Step-by-step: Find min, max, calculate bucket size, scatter to buckets, compute gap.

### Corner cases to consider  
- Empty array (`[]`)
- Array with a single value (`[5]`)
- All elements the same (`[7,7,7,7]`)
- Elements with large spread (`[1,1000000]`)
- Sequence already sorted or reversed
- Large arrays with minimal gap (`[1,2,3,…,10000]`)
- Max-min not evenly divisible by n-1

### Solution

```python
def maximumGap(nums):
    # If there are fewer than 2 elements, no consecutive pairs
    if len(nums) < 2:
        return 0

    minv = min(nums)
    maxv = max(nums)
    if minv == maxv:
        return 0  # All elements are the same

    n = len(nums)
    # Compute bucket size, minimal possible maximum gap (at least 1)
    bucket_size = max(1, (maxv - minv) // (n - 1))
    # Calculate number of buckets needed
    bucket_count = (maxv - minv) // bucket_size + 1

    # Initialize buckets: each stores (min, max) for its interval
    bucket_min = [float('inf')] * bucket_count
    bucket_max = [float('-inf')] * bucket_count
    bucket_used = [False] * bucket_count

    # Place each number in a bucket
    for num in nums:
        idx = (num - minv) // bucket_size
        bucket_min[idx] = min(bucket_min[idx], num)
        bucket_max[idx] = max(bucket_max[idx], num)
        bucket_used[idx] = True

    # Compute the max gap by comparing min of current and max of previous non-empty bucket
    prev_max = minv
    max_gap = 0
    for i in range(bucket_count):
        if not bucket_used[i]:
            continue
        max_gap = max(max_gap, bucket_min[i] - prev_max)
        prev_max = bucket_max[i]
    return max_gap
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - Finding min and max: O(n)
  - Placing into buckets: O(n)
  - Scanning buckets: O(n)
  - No explicit sorting—linear scan only.

- **Space Complexity:** O(n)  
  - O(n) for the bucket arrays (bucket count ≤ n)
  - O(1) for variables

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input numbers allowed negatives?  
  *Hint: The min and max calculation handles negatives the same as positives.*

- How would you adapt this for floating point numbers?  
  *Hint: The bucketing method works, but care is needed when dividing floats to determine bucket and size errors.*

- Can you return the actual pair(s) responsible for the maximum gap, not just its value?  
  *Hint: Track the values (not just min/max) in each bucket and review which buckets were involved.*

### Summary
This problem uses a **pigeonhole/bucket sort** pattern to efficiently achieve O(n) time for "maximum gap between sorted elements." This avoids full sorting but leverages min/max computation for both the global range and per-bucket data, ensuring only critical comparisons are made. The same pattern is seen in problems involving global ordering with tight constraints, such as counting sort, distribution sort, and radix sort-based maximum gap finding.

### Tags
Array(#array), Sorting(#sorting), Bucket Sort(#bucket-sort), Radix Sort(#radix-sort)

### Similar Problems
- Widest Vertical Area Between Two Points Containing No Points(widest-vertical-area-between-two-points-containing-no-points) (Easy)
- Maximum Consecutive Floors Without Special Floors(maximum-consecutive-floors-without-special-floors) (Medium)