### Leetcode 915 (Medium): Partition Array into Disjoint Intervals [Practice](https://leetcode.com/problems/partition-array-into-disjoint-intervals)

### Description  
Given an integer array **nums**, partition it into two contiguous subarrays **left** and **right** such that:
- Every element in **left** is ≤ every element in **right**.
- Both **left** and **right** are non-empty.
- **left** is as small as possible (i.e., minimal length).

Return the length of **left** after partitioning.
A valid partition *always* exists.

### Examples  

**Example 1:**  
Input: `nums = [5,0,3,8,6]`  
Output: `3`  
Explanation: left = [5,0,3], right = [8,6].  
All elements in left (5,0,3) are ≤ all elements in right (8,6), and left is as small as possible.

**Example 2:**  
Input: `nums = [1,1,1,0,6,12]`  
Output: `4`  
Explanation: left = [1,1,1,0], right = [6,12].  
All elements in left are ≤ all elements in right; smallest possible left.

**Example 3:**  
Input: `nums = [1,2]`  
Output: `1`  
Explanation: left = [1], right = [2].  
Both sides are non-empty, left is minimal.

### Thought Process (as if you’re the interviewee)  
First, the brute-force way would be to try every possible partition index *i* (from 1 to n-1) and check if max(nums[0:i]) ≤ min(nums[i:]). For each index, this takes O(n) time, giving O(n²) overall.

To optimize, I can preprocess:
- Maintain an array **max_left**, where max_left[i] is the maximum of nums[0:i].
- Maintain an array **min_right**, where min_right[i] is the minimum of nums[i:].

Then, for each possible split point *i*, check if max_left[i] ≤ min_right[i]. This reduces checking to O(1), but preprocess arrays in O(n) each. So overall time is O(n), space is O(n).

Can this be further optimized for space?  
Yes. Instead of storing arrays, maintain variables:
- Traverse the array, keep two values:
  - **left_max**: max of nums[0:partition_index]
  - **current_max**: max so far (while scanning)

If I find nums[i] < left_max, I must include this in the "left" part to ensure the rule holds. Update left_max to current_max and set partition_index = i+1.

### Corner cases to consider  
- Array of size 2: `[x, y]`
- All elements equal: `[2,2,2,2]`
- Strictly increasing or strictly decreasing arrays
- Large numbers, single peak/valley inside
- Left/right being only one element

### Solution

```python
def partitionDisjoint(nums):
    # at least one element must go in "left"
    left_max = nums[0]        # max so far in "left"
    current_max = nums[0]     # overall max so far
    partition_idx = 1

    for i in range(1, len(nums)):
        current_max = max(current_max, nums[i])
        if nums[i] < left_max:
            # expansion needed: include nums[i] in "left"
            left_max = current_max
            partition_idx = i + 1   # include current in "left"

    return partition_idx
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we do a single scan through the array.
- **Space Complexity:** O(1), only a few variables are used regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed to output the actual **left** and **right** subarrays, not just the left length?  
  *Hint: Track the split index as above; return nums[:partition_idx], nums[partition_idx:]*

- Can you make the solution work in-place if returning subarrays?  
  *Hint: Slicing returns a view; try to avoid extra allocations if required.*

- If the array can be modified, can you do it with **0 extra space** and output length + subarrays?  
  *Hint: Track index and manipulate only output pointers.*  

### Summary
This approach uses the **prefix/suffix maxima/minima** (array scan with dynamic updating) coding pattern, commonly found in subarray partitioning and range problems. Tightening boundaries dynamically is a good trick when one side must be as small (or large) as possible while maintaining a global property. Can be applied to any "partition with max/min" problem variants.

### Tags
Array(#array)

### Similar Problems
- Sum of Beauty in the Array(sum-of-beauty-in-the-array) (Medium)
- Optimal Partition of String(optimal-partition-of-string) (Medium)
- Minimum Index of a Valid Split(minimum-index-of-a-valid-split) (Medium)
- Maximum Strength of K Disjoint Subarrays(maximum-strength-of-k-disjoint-subarrays) (Hard)