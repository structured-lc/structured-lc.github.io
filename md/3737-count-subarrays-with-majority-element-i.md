### Leetcode 3737 (Medium): Count Subarrays With Majority Element I [Practice](https://leetcode.com/problems/count-subarrays-with-majority-element-i)

### Description

Given an integer array `nums` and an integer `target`, count how many subarrays have `target` as their majority element. An element is the majority element of a subarray if it appears **strictly more than half** the time in that subarray. For example, in a subarray of length 3, an element must appear at least 2 times to be the majority.

### Examples

**Example 1:**  
Input: `nums = [1,2,2,1,2], target = 2`  
Output: `3`  
*Explanation: The subarrays with majority element 2 are: [2], [2,1,2], and [2,2]*

**Example 2:**  
Input: `nums = [1,1], target = 1`  
Output: `2`  
*Explanation: The subarrays with majority element 1 are: [1] and [1,1]*

**Example 3:**  
Input: `nums = [1,2,3,3], target = 3`  
Output: `1`  
*Explanation: The subarray [3] is the only one with majority element 3*

### Thought Process (as if you're the interviewee)

The brute force approach is straightforward: check every possible subarray (there are O(n²) of them) and count how many times the target appears. If `target_count × 2 > subarray_length`, then target is the majority.

However, we can optimize by using a two-pointer sliding window. For each starting position `left`, we expand `right` and maintain a count of the target element. Whenever the condition is satisfied, we increment our answer. This is still O(n²) in the worst case, but with early termination and better constants, it performs well for the given constraints (n ≤ 1000).

The key insight: instead of recounting from scratch for each subarray, we maintain a running count as we expand the window, making each iteration constant time.

### Corner cases to consider

- Single element array: If the array has one element and it equals the target, return 1
- No target matches: If target never appears in nums, return 0
- All elements are target: Every subarray should be counted
- Target appears once in a long array: Only subarrays where target appears in the first half should count
- Multiple identical elements: Ensure counting logic correctly identifies majority

### Solution

```python
def countSubarrays(nums, target):
    n = len(nums)
    count = 0
    
    # Iterate through all possible starting positions
    for left in range(n):
        target_count = 0
        
        # Iterate through all possible ending positions from left
        for right in range(left, n):
            # If current element is target, increment count
            if nums[right] == target:
                target_count += 1
            
            # Calculate subarray length
            subarray_length = right - left + 1
            
            # Check if target is majority element
            # target_count must be strictly greater than half the subarray length
            if target_count * 2 > subarray_length:
                count += 1
    
    return count
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n²) where n is the length of `nums`. We have two nested loops iterating through all possible subarrays. Each inner operation is constant time (incrementing counter and checking condition).

- **Space Complexity:** O(1). We only use a few variables (`count`, `target_count`, `subarray_length`) regardless of input size. No additional data structures are required.

### Potential follow-up questions (as if you're the interviewer)

- (Can you optimize this to O(n log n) using prefix sums and a binary indexed tree?)  
  *Hint: Convert the array into +1 for target and -1 for non-target elements. A subarray has target as majority if the sum of transformed values is positive. Use a data structure to count inversions efficiently.*

- (What if the array is very large (10⁶ elements)? How would you handle it?)  
  *Hint: The O(n log n) solution becomes necessary. Consider coordinate compression and balanced BSTs or segment trees to count how many previous prefix sums are smaller than the current one.*

- (Can you solve this without modifying or transforming the array?)  
  *Hint: Yes, the two-pointer approach shown works directly on the original array. The trade-off is O(n²) time but truly O(1) extra space.*

### Summary

This problem uses the **two-pointer sliding window** pattern combined with a **brute-force enumeration** of all subarrays. The core technique is maintaining a running count as we expand the window, avoiding redundant recalculations. While the O(n²) time complexity appears high, it's acceptable for n ≤ 1000 and is straightforward to implement in an interview setting. For larger inputs, the problem scales to an O(n log n) solution using prefix sums and a binary indexed tree—a more advanced pattern that trades implementation complexity for better asymptotic performance.


### Flashcard
For each starting position, expand right and maintain target count; increment answer whenever target is majority in current subarray.

### Tags
Array(#array), Hash Table(#hash-table), Divide and Conquer(#divide-and-conquer), Segment Tree(#segment-tree), Merge Sort(#merge-sort), Counting(#counting), Prefix Sum(#prefix-sum)

### Similar Problems
