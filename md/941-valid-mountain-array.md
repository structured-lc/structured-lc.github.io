### Leetcode 941 (Easy): Valid Mountain Array [Practice](https://leetcode.com/problems/valid-mountain-array)

### Description  
Given an array of integers, determine if it forms a **valid mountain**.  
A valid mountain array is defined as:
- The array contains **at least 3 elements**.
- There exists some peak at position i (0 < i < n-1) such that:
  - The sequence strictly **increases** from the start to i.
  - The sequence strictly **decreases** from i to the end.
  - The peak cannot be at the first or last index.
- *No flat areas*—adjacent elements cannot be equal.

### Examples  

**Example 1:**  
Input: `[2,1]`  
Output: `False`  
*Explanation: Less than 3 elements, so cannot form a mountain.*

**Example 2:**  
Input: `[3,5,5]`  
Output: `False`  
*Explanation: Sequence increases but then has duplicate values at the peak, violating "strict" increase.*

**Example 3:**  
Input: `[0,3,2,1]`  
Output: `True`  
*Explanation: Increases from 0→3 (peak), then strictly decreases from 3→2→1.*

### Thought Process (as if you’re the interviewee)  
To approach this problem:
- **Brute-force**: For each possible peak (excluding first and last), check if all left elements are increasing, and all right elements are decreasing. This is inefficient (O(n²)).
- **Optimized Two-Pointer or Single Scan**:
  - Traverse from the start, increment while strictly increasing.
  - Check if peak is not the start or end.
  - From the peak, increment while strictly decreasing.
  - If final index reaches the last element and all conditions hold, return True. Otherwise, return False.
- **Two-pointer version**: Use one pointer from left to climb up, one from right to climb down, and check if they meet at a valid peak.

The single scan (pointer) solution is clean, readable, and works in linear time with constant space.

### Corner cases to consider  
- Array length < 3
- Peak at start or end
- Flat areas: arr[i] == arr[i+1] anywhere
- Strictly increasing or strictly decreasing (no peak)
- Negative numbers or zeros
- All elements equal

### Solution

```python
def validMountainArray(arr):
    n = len(arr)
    if n < 3:
        return False

    i = 0

    # Climb up (strictly increasing)
    while i + 1 < n and arr[i] < arr[i + 1]:
        i += 1

    # Peak cannot be first or last
    if i == 0 or i == n - 1:
        return False

    # Climb down (strictly decreasing)
    while i + 1 < n and arr[i] > arr[i + 1]:
        i += 1

    # Check if reached end
    return i == n - 1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — Each element is visited at most twice (once in the uphill, once in the downhill).
- **Space Complexity:** O(1) — Only uses a constant number of variables, no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array could be very large and you had to do this in-place with as little memory as possible?  
  *Hint: Can you do it with only pointers, no extra array—what’s your space usage?*

- What if the definition included plateaus—adjacent equal values were allowed at the peak, but not on the slopes?  
  *Hint: Where would you modify your strict comparison checks?*

- How would you return the **peak index**, or all possible mountain peaks, if more than one mountain were allowed?  
  *Hint: How would your scanning and validation change?*

### Summary
This problem uses the **two-pointer/scan pattern**, often seen in array and sequence checking problems. It emphasizes recognizing sequence properties and efficiently detecting structure (mountain, valley, etc.). Variations of this logic are useful in problems like detecting valleys, stock buy/sell patterns, and longest increasing/decreasing subsequence detection.