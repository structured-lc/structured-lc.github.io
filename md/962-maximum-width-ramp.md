### Leetcode 962 (Medium): Maximum Width Ramp [Practice](https://leetcode.com/problems/maximum-width-ramp)

### Description  
Given an integer array **nums**, find the *maximum width ramp*.  
A **ramp** is a pair of indices (i, j) such that i < j and nums[i] ≤ nums[j]. The *width* of the ramp is j - i.  
Your task is to return the largest width of all such ramps. If no ramp exists, return 0.  
In other words:  
- Find the largest possible difference j - i, where 0 ≤ i < j < n, and nums[i] ≤ nums[j].


### Examples  

**Example 1:**  
Input: `nums = [6,0,8,2,1,5]`  
Output: `4`  
*Explanation: The ramp (1, 5) gives nums[1]=0 ≤ nums[5]=5, width = 5 - 1 = 4. This is the maximum.*

**Example 2:**  
Input: `nums = [9,8,1,0,1,9,4,0,4,1]`  
Output: `7`  
*Explanation: The ramp (2, 9) gives nums[2]=1 ≤ nums=1, width = 9 - 2 = 7.*

**Example 3:**  
Input: `nums = [7,6,5,4,3,2,1]`  
Output: `0`  
*Explanation: Array is strictly decreasing; no i < j with nums[i] ≤ nums[j].*


### Thought Process (as if you’re the interviewee)  

The brute-force way is to check every pair (i, j) with i < j and nums[i] ≤ nums[j], and keep track of the maximum width.  
- This is O(n²) and will time out for large arrays.

Looking for optimization:
- Notice we want to maximize j - i where nums[i] ≤ nums[j].  
- For a fixed i, find the largest possible j > i with nums[i] ≤ nums[j].  
- But even this scan would be O(n²).

Optimized approach using a stack:
- Build a stack of indices where each is a potential *start* of a ramp.
- Specifically: create a *monotonically decreasing stack* of indices s.t. nums[stack[-1]] > nums[i] as you scan left to right.
- Then, scan from right to left, and for each index j, while the stack is not empty and nums[stack[-1]] ≤ nums[j], pop stack and calculate width j - stack[-1].  
- Keep track of the max width encountered.

Why is the stack decreasing? It allows us to identify indices where *possible* ramps may start (can't start at higher value, since leftmost smallest needed).

There’s also a sorting approach (store (num, idx), sort by num then idx, sweep for max gap), but the stack-based is optimal O(n) and easier to code.

Trade-offs:
- Stack-based runs in O(n), with O(n) extra space.
- Sorting approach runs in O(n log n), O(n) space.


### Corner cases to consider  
- Empty array (`[]`) → return 0.
- All elements equal (e.g., `[2,2,2,2]`) → full width, answer = len(nums) - 1.
- Strictly decreasing array → no ramp exists, answer = 0.
- Ramp only at start or end.
- Array of length 1 → no ramp (j must be > i).
- Negative numbers and zeros.


### Solution

```python
def maxWidthRamp(nums):
    n = len(nums)
    stack = []
    # Build a stack of indices with decreasing nums values
    for i in range(n):
        if not stack or nums[i] < nums[stack[-1]]:
            stack.append(i)
    max_width = 0
    # Scan from right to left to find possible wide ramps
    for j in range(n - 1, -1, -1):
        # While stack not empty and nums at candidate ramp start ≤ nums[j]
        while stack and nums[stack[-1]] <= nums[j]:
            i = stack.pop()
            max_width = max(max_width, j - i)
    return max_width
```


### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  * Each index is pushed and popped at most once from the stack. Right-to-left sweep is also O(n). No nested loops.
- **Space Complexity:** O(n).  
  * In the worst case, the stack could hold all indices, e.g. if array is strictly decreasing.


### Potential follow-up questions (as if you’re the interviewer)  

- If you had to return not just the width, but the index pair (i, j) as well?  
  *Hint: Store ramp starts in the stack. When you find a new max width, also record (i, j).*

- What if you wanted to allow *strictly* increasing ramps only (nums[i] < nums[j])?  
  *Hint: Change the stack or comparison from ≤ to < in appropriate checks.*

- Can you solve this problem in O(n log n) with less extra memory?  
  *Hint: Use a sorted list or binary search (the sorting-based approach).*


### Summary
This problem uses the **monotonic stack** pattern:  
- Build a stack of candidate start indices where nums is decreasing.
- Sweep from the right and find widest valid ramps.
This pattern is common in "nearest greater/smaller element" problems and can be applied where subarray relationships are involved (e.g., Largest Rectangle in Histogram, Stock Span, Next Greater Element).  
Efficient, single-pass, and makes the most of order properties in the input array.