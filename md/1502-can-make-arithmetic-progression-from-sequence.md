### Leetcode 1502 (Easy): Can Make Arithmetic Progression From Sequence [Practice](https://leetcode.com/problems/can-make-arithmetic-progression-from-sequence)

### Description  
Given an array of numbers, determine if the array can be rearranged to form an **arithmetic progression** (a sequence where the difference between any two consecutive elements is constant).
Return True if it can, False otherwise.

### Examples  
**Example 1:**  
Input: `[3,5,1]`  
Output: `True`  
*Explanation: Sorted: [1,3,5], differences: 2,2. Constant, so yes.*

**Example 2:**  
Input: `[1,2,4]`  
Output: `False`  
*Explanation: Sorted: [1,2,4], differences: 1,2. Not constant.*

**Example 3:**  
Input: `[7,7,7,7]`  
Output: `True`  
*Explanation: All values same, so difference is 0 (still constant).

### Thought Process (as if you’re the interviewee)  
If the array can be reordered to an arithmetic progression, then after sorting, the difference between each consecutive element must be equal.
- Sort the array, then check if every diff is same.
- No clever tricks are needed here: sort then check pairwise differences.
- Special case: all values same: also valid progression.

### Corner cases to consider  
- Single element (always true).
- All elements the same (true).
- Empty array (ambiguous, but assume always true or as per problem statement).
- Already in progression vs. shuffled input.

### Solution

```python
def canMakeArithmeticProgression(arr):
    if len(arr) <= 2:
        return True
    arr.sort()
    diff = arr[1] - arr[0]
    for i in range(2, len(arr)):
        if arr[i] - arr[i-1] != diff:
            return False
    return True
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) for sorting, plus O(n) scan.
- **Space Complexity:** O(1) extra (ignoring sort space), or O(n) if in-place sort not allowed.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you solve this in O(n) time and O(1) space?  
  *Hint: Use min and max to estimate step, mark seen values.*
- How would you handle floating point numbers?  
  *Hint: Beware of precision error, compare using tolerances.*
- How to check if a subarray (not full array) is AP?  
  *Hint: Sliding window, similar difference check.*

### Summary
A simple array manipulation problem. Classic use of sorting then pairwise check for pattern. Similar checks used in finding geometric/sequences, collinearity, or regularity in datasets.