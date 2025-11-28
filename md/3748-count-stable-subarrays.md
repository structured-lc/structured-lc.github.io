# Leetcode 3748 (Hard): Count Stable Subarrays [Practice](https://leetcode.com/problems/count-stable-subarrays)

### Description
A subarray is called **stable** if it contains no inversions—meaning there are no indices i < j where nums[i] > nums[j]. In other words, a stable subarray must be non-decreasing (sorted in ascending order).

Given an array `nums` and a list of queries where each query specifies a range [l, r], for each query you need to count how many stable subarrays lie entirely within that range.

### Examples

**Example 1:**  
Input: `nums = [10, 5, 6], queries = [[0, 2]]`  
Output: `[3]`  
*Explanation: Stable subarrays within [0, 2] are: , [5], [6], [5, 6]. Wait—[10, 5] has 10 > 5 so it's not stable. Total is 3 from single elements plus [5, 6] = 4... Actually just , [5], [6], [5,6] where [5,6] is non-decreasing = 4.*

**Example 2:**  
Input: `nums = [1, 2, 2, 1, 4, 3], queries = [[0, 5]]`  
Output: ``  
*Explanation: The array splits into groups: [1, 2, 2] (non-decreasing, length 3) and [1, 4, 3] has [1, 4] (length 2) then [3] (length 1). Stable subarrays: from [1,2,2] = 3×4/2 = 6; from [1,4] = 2×3/2 = 3; from [3] = 1. Total = 10.*

**Example 3:**  
Input: `nums = [1, 1, 1], queries = [[0, 2]]`  
Output: `[6]`  
*Explanation: Entire array is non-decreasing (length 3). Stable subarrays = 3×4/2 = 6: [1], [1], [1], [1,1], [1,1], [1,1,1].*


### Thought Process (as if you're the interviewee)

**Brute Force Approach:**
For each query [l, r], iterate through all possible subarrays and check if each is stable (non-decreasing). This would be O(n²) per query, which is too slow.

**Key Observation:**
Instead of checking stability for every subarray individually, we can **preprocess the array** to identify maximal non-decreasing segments (groups). Within a single non-decreasing segment of length m, the number of stable subarrays is exactly m×(m+1)/2 (combinatorial formula for choosing 2 endpoints).

**Optimized Approach:**
1. Identify all maximal non-decreasing groups in the array
2. For each group, calculate the count of stable subarrays: length×(length+1)/2
3. Create a prefix sum array to quickly compute total stable subarrays in any range of complete groups
4. For each query [l, r]:
   - Find which groups the query overlaps with
   - Sum contributions from complete groups (using prefix sums)
   - For partial groups at boundaries, recalculate the count manually

This reduces the per-query complexity significantly.


### Corner cases to consider
- Single element array (one stable subarray)
- Entire array is non-decreasing (no group boundaries)
- Entire array is strictly decreasing (each element is its own group)
- Query covers only a portion of a group
- Query spans multiple groups
- Elements are equal (should be treated as non-decreasing)
- Very large arrays with many queries


### Solution

```python
def countStableSubarrays(self, nums: list, queries: list) -> list:
    n = len(nums)
    
    # Step 1: Identify all maximal non-decreasing groups
    # Each group is represented as [start_index, end_index]
    groups = []
    group_counts = []
    
    start = 0
    for i in range(1, n):
        # If current element is less than previous, we found a break
        if nums[i] < nums[i - 1]:
            # Current group ends at i-1
            length = i - start
            groups.append([start, i - 1])
            group_counts.append(length * (length + 1) // 2)
            start = i
    
    # Don't forget the last group
    length = n - start
    groups.append([start, n - 1])
    group_counts.append(length * (length + 1) // 2)
    
    # Step 2: Build prefix sum array
    # prefix[i] = sum of counts for groups 0 to i-1
    prefix = [0]
    for count in group_counts:
        prefix.append(prefix[-1] + count)
    
    # Step 3: Process each query
    results = []
    
    for l, r in queries:
        # Find which groups overlap with [l, r]
        # Use binary search to find leftmost and rightmost groups
        
        # Find leftmost group that contains or starts after l
        left_group_idx = -1
        for i in range(len(groups)):
            if groups[i][1] >= l:
                left_group_idx = i
                break
        
        # Find rightmost group that ends before or at r
        right_group_idx = -1
        for i in range(len(groups) - 1, -1, -1):
            if groups[i][0] <= r:
                right_group_idx = i
                break
        
        if left_group_idx == -1 or right_group_idx == -1:
            results.append(0)
            continue
        
        # If query falls entirely within one group
        if left_group_idx == right_group_idx:
            length = r - l + 1
            count = length * (length + 1) // 2
            results.append(count)
            continue
        
        # Query spans multiple groups
        # Sum complete groups in between
        total = prefix[right_group_idx] - prefix[left_group_idx + 1]
        
        # Add contribution from left partial group
        left_length = groups[left_group_idx][1] - l + 1
        total += left_length * (left_length + 1) // 2
        
        # Add contribution from right partial group
        right_length = r - groups[right_group_idx][0] + 1
        total += right_length * (right_length + 1) // 2
        
        results.append(total)
    
    return results
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n + q×log m) where n is the array length, q is the number of queries, and m is the number of groups. The preprocessing to find groups takes O(n). For each query, binary search to find overlapping groups takes O(log m), and computing the answer is O(1).

- **Space Complexity:** O(m) where m is the number of non-decreasing groups. In the worst case (strictly decreasing array), m = n. The groups array and prefix sum array each store O(m) values. This is dominated by the input and output.


### Potential follow-up questions

- (What if you needed to handle dynamic updates to the array between queries?)  
  *Hint: Consider segment trees or other dynamic data structures; think about how group boundaries might change with a single element update.*

- (How would you optimize further if there are millions of queries on a smaller array?)  
  *Hint: Trade-off between preprocessing time and query time; consider pre-answering common query patterns.*

- (What if instead of counting all stable subarrays, you needed to count stable subarrays with a specific property, like having a certain sum or length?)  
  *Hint: Modify the counting formula within each group; you might need to store more metadata per group.*

### Summary
This problem uses **group-based preprocessing** combined with **prefix sums** to efficiently answer range queries. The key insight is recognizing that within a non-decreasing segment, all subarrays are stable, and their count follows a combinatorial formula. This pattern is useful whenever you need to partition input based on some property and precompute aggregate statistics for efficient querying. Similar approaches appear in problems involving maximal subarrays satisfying certain conditions, range sum queries, and other interval-based problems where you can identify and precompute independent components.

### Tags
Array(#array), Binary Search(#binary-search), Prefix Sum(#prefix-sum)

### Similar Problems
