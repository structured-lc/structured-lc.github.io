### Leetcode 2529 (Easy): Maximum Count of Positive Integer and Negative Integer [Practice](https://leetcode.com/problems/maximum-count-of-positive-integer-and-negative-integer)

### Description  
Given a sorted array `nums` (non-decreasing order), return the greater count between positive integers and negative integers in the array.  
Note: **0** is considered neither positive nor negative.  
So, if there are `pos` positive numbers and `neg` negative numbers, return `max(pos, neg)`.

### Examples  

**Example 1:**  
Input: `nums = [-2, -1, -1, 1, 2, 3]`  
Output: `3`  
*Explanation: There are 3 negative numbers (-2, -1, -1) and 3 positive numbers (1, 2, 3). The maximum is 3.*

**Example 2:**  
Input: `nums = [-3, -2, -1, 0, 0, 1, 2]`  
Output: `3`  
*Explanation: 3 negative numbers (-3, -2, -1), 2 positive numbers (1, 2), and two zeroes. The maximum is 3.*

**Example 3:**  
Input: `nums = [5, 20, 66, 1314]`  
Output: `4`  
*Explanation: All 4 numbers are positive, so max is 4 and negative count is 0.*

### Thought Process (as if you’re the interviewee)  
First, clarify that the array is **sorted** in non-decreasing order, which means all negatives (if any) are at the front, followed by zeroes (if present), then positives.  
The brute-force solution is to iterate through the array and maintain two counters—for negatives and positives.

But, since the array is sorted, we can optimize using **binary search** to find the split points efficiently:
- The first index where the value is **≥ 1** gives us the start of positives (`n - first_positive_index`).
- The first index where the value is **≥ 0** gives the start of non-negatives; thus, all indices before this are negatives (`first_zero_index`).
- Return `max(negative_count, positive_count)`.

This approach is **O(log n)** due to binary search, which is much faster for large inputs compared to O(n) iteration.

### Corner cases to consider  
- Array contains only zeroes, e.g., `[0, 0, 0]` → output should be `0`.
- Array contains only negatives, e.g., `[-3, -1, -1]` → output should be `3`.
- Array contains only positives, e.g., `[2, 3, 4]` → output should be `3`.
- Single-element array: `` (output 0), `[-2]` (output 1), `[3]` (output 1).
- Mix of negatives, zeroes, and positives.
- No negatives or no positives.

### Solution

```python
def maximumCount(nums):
    # Helper for binary search: find leftmost index where nums[idx] >= target
    def lower_bound(nums, target):
        left, right = 0, len(nums)
        while left < right:
            mid = left + (right - left) // 2
            if nums[mid] < target:
                left = mid + 1
            else:
                right = mid
        return left

    # Number of negatives: first index where nums[idx] >= 0
    negative_count = lower_bound(nums, 0)

    # Number of positives: first index where nums[idx] >= 1
    positive_start = lower_bound(nums, 1)
    positive_count = len(nums) - positive_start

    return max(negative_count, positive_count)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n)  
  Efficient because binary search is used twice (for negative and positive split points).
- **Space Complexity:** O(1)  
  No extra storage unrelated to input size is used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input array is **not sorted**?
  *Hint: Can you count positives & negatives efficiently if order is arbitrary?*

- How would your method change if zeros should be counted as either positive or negative?
  *Hint: Modify the binary search conditions.*

- Can you implement this with only one binary search?
  *Hint: Is it possible to deduce one count from the other and array length?*

### Summary
This problem uses the **Binary Search** pattern on sorted arrays to efficiently find the split points between negatives, zeroes, and positives.  
It's a classic example of leveraging array properties to improve both clarity and computational efficiency, a common pattern in interview problems involving sorted data. This pattern is widely applicable in partition-type or boundary-searching problems.

### Tags
Array(#array), Binary Search(#binary-search), Counting(#counting)

### Similar Problems
- Binary Search(binary-search) (Easy)
- Count Negative Numbers in a Sorted Matrix(count-negative-numbers-in-a-sorted-matrix) (Easy)