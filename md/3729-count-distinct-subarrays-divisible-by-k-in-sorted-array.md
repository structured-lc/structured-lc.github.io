# Leetcode 3729 (Hard): Count Distinct Subarrays Divisible by K in Sorted Array [Practice](https://leetcode.com/problems/count-distinct-subarrays-divisible-by-k-in-sorted-array)

### Description

Given a sorted array of positive integers and a value k, count the number of **distinct** subarrays whose sum is divisible by k. Since the array is sorted, many subarrays can be identical (e.g., [2, 2, 2] appears multiple times if there are many 2's). We must count each unique subarray composition only once, regardless of how many positions it occupies in the array.

This is a follow-up to problem 974 (Subarray Sums Divisible by K) but with the added constraint that the array is sorted and we need to remove duplicate subarrays.

### Examples

**Example 1:**  
Input: `nums = [1, 2, 3], k = 3`  
Output: `3`  
*Explanation: The good subarrays are [1, 2], [3], and [1, 2, 3]. All three have sums divisible by 3.*

**Example 2:**  
Input: `nums = [2, 2, 2, 2, 2, 2], k = 6`  
Output: `2`  
*Explanation: The distinct good subarrays are [2, 2, 2] (sum = 6) and [2, 2, 2, 2, 2, 2] (sum = 12). Even though [2, 2, 2] appears at multiple positions, it counts as one distinct subarray.*

**Example 3:**  
Input: `nums = [1, 1, 1], k = 2`  
Output: `1`  
*Explanation: The only distinct good subarray is [1, 1] (sum = 2). [1, 1] appears twice but counts once.*

### Thought Process (as if you're the interviewee)

**Brute Force Approach:**
At first, I'd think: iterate through all starting positions and all ending positions, check if the sum is divisible by k, and count them. However, this naively counts duplicates (e.g., [2, 2] at position 0 and [2, 2] at position 1 are the same subarray).

**Optimized Approach (Prefix Sum + Dictionary + Deduplication):**

The key insight is that since the array is sorted, all duplicate elements are grouped together. Here's my strategy:

1. **First Pass (Prefix Sum + Modulo):** Use a prefix sum approach with a dictionary to count all subarrays with sum ≡ 0 (mod k). This works similar to problem 974.

2. **Deduplication Step:** For each group of identical elements, determine which subarray lengths are "over-counted." A subarray of length L composed entirely of the same element x is over-counted if it appears in multiple positions. If we have F occurrences of element x:
   - There are (F − L + 1) distinct positions where a subarray of length L can start
   - We counted all (F − L + 1) of them, but they're all the same, so we should count only 1
   - Over-count = (F − L + 1) − 1 = F − L

3. **Subtract Over-counts:** For each group of identical elements and each valid length where the sum is divisible by k, subtract the over-counts.

### Corner cases to consider

- **Single element:** If k divides the single element, it counts as 1 distinct subarray.
- **All elements are identical:** We must count only distinct lengths where the sum is divisible by k.
- **k = 1:** Every subarray has a sum divisible by 1, but we count only distinct subarray compositions.
- **No valid subarray:** Return 0 if no subarray sum is divisible by k.
- **Empty array:** Return 0.
- **Large frequency of one element:** Must correctly compute over-counts for all relevant lengths.

### Solution

```python
def countDistinct(nums, k):
    n = len(nums)
    result = 0
    prefix_sum = 0
    mod_count = {0: 1}  # Initialize with 0 to handle subarrays starting from index 0
    
    # Step 1: Count all subarrays with sum divisible by k (including duplicates)
    for i in range(n):
        prefix_sum += nums[i]
        mod = prefix_sum % k
        
        # If this modulo was seen before, we found subarrays divisible by k
        if mod in mod_count:
            result += mod_count[mod]
        
        # Add current modulo to dictionary
        if mod not in mod_count:
            mod_count[mod] = 0
        mod_count[mod] += 1
    
    # Step 2: Remove duplicates for groups of identical elements
    i = 0
    while i < n:
        # Find the range of identical elements
        j = i
        while j < n and nums[j] == nums[i]:
            j += 1
        
        frequency = j - i
        element = nums[i]
        
        # Check all possible lengths of subarrays made of this element
        for length in range(1, frequency):
            # Check if a subarray of this length has sum divisible by k
            subarray_sum = element * length
            if subarray_sum % k == 0:
                # We over-counted by (frequency - length) times
                # because the same subarray appears at different positions
                over_count = frequency - length
                result -= over_count
        
        i = j
    
    return result
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n + m × f_max) where n is the array length, m is the number of distinct elements, and f_max is the maximum frequency of any element. In the worst case (all elements identical), this is O(n²). The prefix sum loop is O(n), and the deduplication loop iterates through each group and checks lengths up to its frequency.

- **Space Complexity:** O(k) for the prefix sum modulo dictionary, since there are at most k possible remainders (0 to k−1). The dictionary stores at most k entries.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1)  
  *What if the array is not sorted? How would you approach the deduplication?*  
  *Hint: Consider grouping identical elements first or using a set to track unique subarray compositions explicitly.*

- (Follow-up question 2)  
  *Can you optimize further if k is very large compared to n?*  
  *Hint: Think about whether all remainders 0 to k−1 can actually occur, or if we can bound the dictionary size differently.*

- (Follow-up question 3)  
  *How would you modify the solution if we needed to return the actual distinct subarrays instead of just their count?*  
  *Hint: Store subarray compositions (e.g., as tuples or normalized representations) in a set alongside the count logic.*

### Summary

This problem combines two key patterns: **(1) Prefix Sum + Modulo Arithmetic** to efficiently find subarrays with a target divisibility property, and **(2) Deduplication via Element Grouping** to handle the constraint that identical subarrays should count only once. Since the input is sorted, identical elements cluster together, allowing us to compute over-counts mathematically rather than tracking each subarray explicitly. This approach is common in problems involving sorted arrays with duplicates and divisibility constraints, such as partitioning problems and subset sum variants.

### Tags
Array(#array), Hash Table(#hash-table), Prefix Sum(#prefix-sum)

### Similar Problems
