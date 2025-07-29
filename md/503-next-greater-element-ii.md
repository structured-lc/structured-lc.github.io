### Leetcode 503 (Medium): Next Greater Element II [Practice](https://leetcode.com/problems/next-greater-element-ii)

### Description  
Given a circular array of integers, for each element **find the first greater number to its right**, wrapping around to the beginning if necessary. If no greater number exists, return -1 for that position.

### Examples  

**Example 1:**  
Input: `[1,2,1]`  
Output: `[2,-1,2]`  
*Explanation: For the first 1, the next greater is 2. For 2, there is none (so -1). For the last 1, after wrapping, next greater is 2.*

**Example 2:**  
Input: `[1,2,3,4,3]`  
Output: `[2,3,4,-1,4]`  
*Explanation: 1→2, 2→3, 3→4, 4 has none, last 3 wraps to 4.*

**Example 3:**  
Input: `[5,4,3,2,1]`  
Output: `[-1,5,5,5,5]`  
*Explanation: 5 has no greater. All others wrap and find 5 first.*

**Example 4:**  
Input: `[3,8,4,1,2]`  
Output: `[8,-1,-1,3,3]`  
*Explanation: 3→8, 8 has none, 4 has none, 1 wraps to 3, 2 wraps to 3.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  - For every element, scan next elements (wrapping around after the end) until you find a greater element or wrap back to the starting point.
  - This is O(n²), because for each of n elements, you may scan up to n-1 others.
- **Optimized approach:**  
  - Use a **monotonic stack** to keep indices for which we haven’t found a next greater element.
  - Since the array is circular, simulate it by traversing the array twice (0 to 2n-1) but, for computation, use index i % n.
  - For each i, while stack isn’t empty and nums[i % n] > nums[stack[-1]], set the result for stack.pop() to nums[i % n].
  - Only push indices for the “first round” (i < n), and skip pushing on the “second”.
  - This is a classic **Next Greater Element** pattern, but because of circularity, we scan twice.
  - **Time complexity:** O(n).

### Corner cases to consider  
- Empty array (not allowed per constraints, but should be safe).
- One element: [a] → Output: [-1]
- All elements same: [3,3,3] → Output: [-1,-1,-1]
- Strictly decreasing: [5,4,3] → Output: [-1,5,5]
- Strictly increasing: [1,2,3] → Output: [2,3,-1]
- Large input size (n = 10000).

### Solution

```python
def nextGreaterElements(nums):
    n = len(nums)
    res = [-1] * n  # Initialize result with -1
    stack = []  # Indices stack
    
    # Simulate traversing the circular array twice
    for i in range(2 * n):
        idx = i % n
        # Check if current element is "next greater" for any index on the stack
        while stack and nums[idx] > nums[stack[-1]]:
            res[stack.pop()] = nums[idx]
        if i < n:
            # Only add indices for the first pass
            stack.append(idx)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because each index is processed at most twice (once pushed, once popped).
- **Space Complexity:** O(n), for the stack and result array.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this if the array was not circular?  
  *Hint: Only scan once, not twice.*

- What if you needed to find the next smaller element instead?  
  *Hint: Change stack condition to look for a lower value.*

- Can you output the indices of the next greater elements instead of their values?  
  *Hint: Store and return indices instead of values.*

### Summary

This problem is a classic use of the **monotonic stack** pattern to optimize “next greater element” queries, made slightly trickier by the circular wrap-around constraint (handled by traversing the array twice). This approach generalizes to next smaller (or other monotonic) queries and is common in array, stack, and scheduling contexts.