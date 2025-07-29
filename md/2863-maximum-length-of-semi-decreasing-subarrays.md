### Leetcode 2863 (Medium): Maximum Length of Semi-Decreasing Subarrays [Practice](https://leetcode.com/problems/maximum-length-of-semi-decreasing-subarrays)

### Description  
Given an integer array **nums**, find the length of the **longest contiguous subarray** (must be at least length 2) where the **first element is strictly greater than the last element**.  
If no such subarray exists, return 0.  
A "semi-decreasing" subarray is defined as any contiguous sequence where `nums[l] > nums[r]` for some l < r, with l and r as endpoints.  
You need to find only the length of the longest such subarray.

### Examples  

**Example 1:**  
Input: `nums = [7,6,5,4,3,2,1,6,10,11]`  
Output: `8`  
Explanation: The subarray `[7,6,5,4,3,2,1,6]` (indices 0 to 7) has first element 7 and last element 6, and 7 > 6. No other contiguous subarray is longer with this property.

**Example 2:**  
Input: `nums = [57,55,50,60,61,58,63,59,64,60,63]`  
Output: `6`  
Explanation: The subarray `[61,58,63,59,64,60]` (indices 4 to 9) starts at 61 and ends at 60 (61 > 60). This is the longest such subarray.

**Example 3:**  
Input: `nums = [1,2,3,4]`  
Output: `0`  
Explanation: There are no subarrays where the first element is greater than the last element, so output is 0.


### Thought Process (as if you’re the interviewee)  
First, notice that **any subarray** with the first value strictly greater than the last value qualifies.  
- Brute-force: Try all subarrays of length ≥ 2 and check if first > last, keeping track of max length. This is O(n²), too slow for big n.
- Can we optimize?  
  - For each starting index, scan to the right and keep updating `maxlen` whenever nums[l] > nums[r].
  - But this repeats work. Can we do better?
- **Observation:** For a fixed end index r, the longest semi-decreasing subarray ending at r has as its start l the leftmost position with nums[l] > nums[r].  
- Use a stack to efficiently track indices with decreasing nums values. For each index r from left to right, maintain a stack of possible left boundaries (where nums[stack[-1]] > nums[r]).
- For each r, if stack is not empty and nums[stack[-1]] > nums[r], the length of that subarray is (r - stack[-1] + 1). We keep track of max such subarray seen.

**Optimized Approach:**  
- Use a monotonic decreasing stack to keep track of possible left boundaries l.
- For each r, if `nums[l] > nums[r]` for any l in the stack, update answer.

### Corner cases to consider  
- nums is empty ➔ return 0  
- nums has 1 element ➔ return 0  
- All elements are equal ➔ return 0  
- nums is strictly increasing ➔ return 0  
- Answer could be whole array if first > last  
- Multiple subarrays of same length  
- Negative numbers

### Solution

```python
def maxSubarrayLength(nums):
    # Monotonic decreasing stack. Stack stores indices where nums[idx] is decreasing.
    stack = []
    maxlen = 0

    for r, val in enumerate(nums):
        # Pop stack top until stack is empty or nums[stack[-1]] <= nums[r]
        while stack and nums[stack[-1]] <= val:
            stack.pop()
        # For every index in stack, nums[stack[-1]] > nums[r],
        # So, stack[0] is the left-most such start for current r
        if stack:
            l = stack[0]
            maxlen = max(maxlen, r - l + 1)
        # Always push current index: it's a possible left-bound
        stack.append(r)

    return maxlen
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since each element is pushed and popped from the stack at most once.
- **Space Complexity:** O(n) in the worst case (when nums is strictly decreasing, all indices are in the stack).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the actual subarray (not just the length)?
  *Hint: Keep track of l and r whenever you update maxlen.*

- What if you want strict decreasing (not just first > last)?
  *Hint: Need to check all pairs (l, r) with l < r, but more advanced tools like sliding window may be needed.*

- Can you support dynamic updates (inserts/deletes) to the array and report the answer?
  *Hint: Consider advanced data structures like segment trees for such operations.*

### Summary
We used the **monotonic stack** pattern to maintain possible starting indices for semi-decreasing subarrays.  
This reduces the brute-force O(n²) approach to O(n) by efficiently skipping subarrays where the condition cannot be met.  
The pattern is common in problems where you want to maintain a history of candidates in a certain order (such as Next Greater Element, Largest Rectangle in Histogram), and can be applied to various range-interval or "first/last" element queries over arrays.