### Leetcode 1550 (Easy): Three Consecutive Odds [Practice](https://leetcode.com/problems/three-consecutive-odds)

### Description  
Given an integer array `arr`, return `True` if there are **three consecutive odd numbers** anywhere in the array. Return `False` otherwise.

### Examples  

**Example 1:**  
Input: `arr = [2,6,4,1]`  
Output: `False`  
*Explanation: No three consecutive odds anywhere in the array.*

**Example 2:**  
Input: `arr = [1,2,34,3,4,5,7,23,12]`  
Output: `True`  
*Explanation: Subarray [5,7,23] are all odd and consecutive.*

**Example 3:**  
Input: `arr = [1,3,5,7,9]`  
Output: `True`  
*Explanation: [1,3,5] is odd, as is [3,5,7], etc.*

### Thought Process (as if you’re the interviewee)  
- Iterate over the array with a sliding window of size 3.
- For each window, check if all three numbers are odd (use `num % 2 == 1`).
- If so, return True as soon as such a window is found.
- If no such window found by the end, return False.

### Corner cases to consider  
- Array shorter than 3 elements (return False)
- All elements even
- Multiple consecutive odd-numbered windows
- Odd and even numbers alternate
- Very large arrays

### Solution

```python
def threeConsecutiveOdds(arr):
    for i in range(len(arr) - 2):
        if arr[i] % 2 == 1 and arr[i+1] % 2 == 1 and arr[i+2] % 2 == 1:
            return True
    return False
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), single pass over the array.
- **Space Complexity:** O(1), no extra space used.

### Potential follow-up questions (as if you’re the interviewer)  
- What if you want to return the number of such windows, not just True/False?  
  *Hint: Increment a counter instead of returning early.*

- What if you want the indices of all such windows?  
  *Hint: Collect starting indices in a result list instead of stopping early.*

- What if you wanted to generalize to k consecutive odds?  
  *Hint: Use a sliding window of size k with a rolling count of odds.*

### Summary
A quick application of the **sliding window** pattern. Can generalize this to k consecutive properties, number of windows, or outputting indices.

### Tags
Array(#array)

### Similar Problems
