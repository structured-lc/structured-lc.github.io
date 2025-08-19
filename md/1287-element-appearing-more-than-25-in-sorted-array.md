### Leetcode 1287 (Easy): Element Appearing More Than 25% In Sorted Array [Practice](https://leetcode.com/problems/element-appearing-more-than-25-in-sorted-array)

### Description  
Given a **sorted array** of integers, find the element that appears **more than 25% of the time**. It is guaranteed that such an element exists.
- Input: A sorted, possibly repeated, array `arr` of integers
- Output: The integer that appears more than 25% of total times

### Examples  

**Example 1:**  
Input: `[1,2,2,6,6,6,6,7,10]`  
Output: `6`  
*Explanation: 6 appears 4 times out of 9 (4/9 > 0.25)*

**Example 2:**  
Input: `[1,1]`  
Output: `1`  
*Explanation: 1 appears twice (2/2 = 1.0) so above 25%.*

**Example 3:**  
Input: `[2,2,2,3,3]`  
Output: `2`  
*Explanation: 2 appears 3 times out of 5 (3/5 > 0.25)*

### Thought Process (as if you’re the interviewee)  
Since the array is sorted, all duplicates are next to each other. To find an element that appears more than 25%, one could count occurrences of each element linearly.

But with the guarantee, and the fact that an element appearing >25% means it must occur in at least one of the positions at n//4, n//2, or 3n//4, we can check those specific spots and see if the candidate at each position appears enough using binary search or a simple window.

Simplest is linear scan and counting. Also, early exits are possible since only one such element exists by problem statement.

### Corner cases to consider  
- Length small (1, 2, 3)
- All elements same
- Appearance is exactly at edge

### Solution

```python
def findSpecialInteger(arr):
    n = len(arr)
    if n == 1:
        return arr[0]
    # Check candidates at n//4, n//2, and 3*n//4
    targets = [arr[n // 4], arr[n // 2], arr[3 * n // 4]]
    for x in set(targets):
        # Use binary search to find left and right boundary of x
        l = left = 0
        r = right = n - 1
        # Find left boundary
        while l < r:
            m = (l + r) // 2
            if arr[m] < x:
                l = m + 1
            else:
                r = m
        left = l
        # Find right boundary
        l, r = 0, n - 1
        while l < r:
            m = (l + r + 1) // 2
            if arr[m] > x:
                r = m - 1
            else:
                l = m
        right = r
        if right - left + 1 > n // 4:
            return x
    return -1  # Should not happen per problem guarantee
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), since we only check at most three values and use binary search for each.
- **Space Complexity:** O(1) extra, since only variables are stored.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you generalize to find all elements that appear more than `1/k` times?  
  *Hint: Consider checking positions at intervals of n//k and counting frequencies*

- Could you solve this if the array was **not** sorted?  
  *Hint: Think about using a hash map or deterministic algorithms for majority counts*

- If two elements each appear exactly 25%, would your solution handle this?  
  *Hint: Consider implications of multiple valid candidates*

### Summary
This problem uses a **sorted array counting/window** approach—by checking at likely candidates' key positions, we can locate the element in O(log n) rather than O(n). This pattern applies to sorted array majority/minority queries frequently seen in interviews.

### Tags
Array(#array)

### Similar Problems
