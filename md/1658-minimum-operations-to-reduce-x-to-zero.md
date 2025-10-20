### Leetcode 1658 (Medium): Minimum Operations to Reduce X to Zero [Practice](https://leetcode.com/problems/minimum-operations-to-reduce-x-to-zero)

### Description  
Given an integer array nums and an integer x, return the **minimum number of operations** to reduce x to exactly zero. In one operation, either **remove the leftmost or the rightmost element** of nums and subtract its value from x. If it's not possible, return -1.

### Examples  

**Example 1:**  
Input: `nums = [1,1,4,2,3], x = 5`  
Output: `2`  
*Explanation: Remove 3 (right) and 2 (right), 5 - 3 = 2, 2 - 2 = 0. Or remove 1 (left) and 4 (left).*

**Example 2:**  
Input: `nums = [5,6,7,8,9], x = 4`  
Output: `-1`  
*Explanation: No way to remove entries to make x exactly zero.*

**Example 3:**  
Input: `nums = [3,2,20,1,1,3], x = 10`  
Output: `5`  
*Explanation: Remove 3+2+3 on left/right and 1+1 on right.*

### Thought Process (as if you’re the interviewee)  
The naive approach is to try all combinations of removing from the left/right, which is exponential. Instead, notice the problem is equivalent to keeping a **contiguous middle subarray whose sum is totalSum - x** (because the removed numbers on left+right sum to x). So, I can use a sliding window to find the longest subarray with sum = totalSum - x. The minimum operations = n - length of this window. If no subarray found, return -1.

### Corner cases to consider  
- All elements required to remove x
- x larger than total sum
- x = 0
- Negative numbers in nums (not specified, but good to ask)
- Removing only one side solves it
- nums is empty

### Solution

```python
def minOperations(nums: list[int], x: int) -> int:
    total = sum(nums)
    target = total - x
    n = len(nums)
    if target == 0:
        return n  # Remove all
    max_len = -1
    left = 0
    curr = 0
    for right in range(n):
        curr += nums[right]
        while left <= right and curr > target:
            curr -= nums[left]
            left += 1
        if curr == target:
            max_len = max(max_len, right - left + 1)
    return n - max_len if max_len != -1 else -1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), as each element seen at most twice (once in, once out of window).
- **Space Complexity:** O(1), only pointers and counters.


### Potential follow-up questions (as if you’re the interviewer)  

- What if negative numbers are allowed in nums?
  *Hint: Sliding window may not be valid, so need to use a hashmap to handle sums.*

- How would you return the actual elements to remove?
  *Hint: Track window boundaries for kept subarray to deduce sides to remove.*

- Can you design for large nums (memory constraints)?
  *Hint: Read input in chunks, or process via file streaming if in/out order is known.*

### Summary
This problem is reduced to finding the longest subarray sum, a two pointers/sliding window pattern, and then computing the minimum removes as n - (max window). This pattern appears in problems that constrain prefix and suffix sums.


### Flashcard
Find the longest subarray with sum = totalSum−x using sliding window; min deletions = n − window length.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Sliding Window(#sliding-window), Prefix Sum(#prefix-sum)

### Similar Problems
- Minimum Size Subarray Sum(minimum-size-subarray-sum) (Medium)
- Subarray Sum Equals K(subarray-sum-equals-k) (Medium)
- Minimum Operations to Convert Number(minimum-operations-to-convert-number) (Medium)
- Removing Minimum Number of Magic Beans(removing-minimum-number-of-magic-beans) (Medium)
- Minimum Operations to Make the Integer Zero(minimum-operations-to-make-the-integer-zero) (Medium)