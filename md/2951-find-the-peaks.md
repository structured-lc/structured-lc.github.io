### Leetcode 2951 (Easy): Find the Peaks [Practice](https://leetcode.com/problems/find-the-peaks)

### Description  
Given a 0-indexed integer array `mountain`, identify all indices of elements that are *peaks*. A **peak** is defined as an element that is **strictly greater** than its immediate neighbors to the left and right. The first and last elements of the array can never be peaks, regardless of value. Return the list of all peak indices (in any order).

### Examples  

**Example 1:**  
Input: `mountain = [2,4,4]`,  
Output: `[]`  
*Explanation: The only possible ‘peak’ position is index 1, but mountain[1] (4) is not strictly greater than mountain[2] (4). Index 0 and 2 can never be peaks since they're endpoints.*

**Example 2:**  
Input: `mountain = [1,4,3,8,5]`,  
Output: `[1,3]`  
*Explanation:  
- Index 1: mountain[1]=4, neighbors are 1 and 3. 4 > 1, 4 > 3 ⇒ peak.  
- Index 3: mountain[3]=8, neighbors are 3 and 5. 8 > 3, 8 > 5 ⇒ peak.  
- Indices 0 and 4 are endpoints—never peaks.  
- Index 2: mountain[2]=3 is not greater than both neighbors (4, 8).*

**Example 3:**  
Input: `mountain = [5,10,5]`,  
Output: `[1]`  
*Explanation: Only index 1 is checked: 10 > 5 and 10 > 5 ⇒ it is a peak.*

### Thought Process (as if you’re the interviewee)  
First, clarify the constraints:  
- Only check elements with both a left and right neighbor (so only indices 1 through n-2, inclusive).  
- Element at i is a peak if mountain[i] > mountain[i-1] and mountain[i] > mountain[i+1].  
This suggests simply iterating from i=1 to i=len(mountain)-2, checking both neighbors at each step.

Brute force is already O(n) since you only need to check each eligible i once.  
No need for sorting or pre-processing—the check is constant-time for each index.

Trade-offs:  
- Very straightforward, no real reason to optimize further given n ≤ 100.
- No extra space besides the answer list.

### Corner cases to consider  
- mountain has only 3 elements (smallest allowed), e.g., [1,2,1]  
- No peaks exist (array is strictly increasing or decreasing, or plateau)
- Peaks on plateaus: [2,2,2,2] (should be [])
- Multiple peaks possible  
- Duplicates, but with valid peaks between
- Peaks at adjacent positions (not possible due to definition; try cases like [1,5,1,5,1])
- All numbers same (e.g. [10,10,10])

### Solution

```python
def findPeaks(mountain):
    # List to store indices of peaks
    peaks = []
    # Traverse from index 1 to len(mountain) - 2 (exclude endpoints)
    for i in range(1, len(mountain) - 1):
        # Check peak condition
        if mountain[i] > mountain[i - 1] and mountain[i] > mountain[i + 1]:
            peaks.append(i)
    return peaks
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), since we traverse the array once, checking each valid index.
- **Space Complexity:** O(k), where k is the number of peaks (output list); no extra data structures used.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we also needed the peak *values* instead of indices?  
  *Hint: Store mountain[i] instead of i in the results list.*

- How would your solution change if the array could be very large or streamed?  
  *Hint: Maintain a sliding window of three elements at a time.*

- What if endpoints could also be considered peaks (depending on the problem variant)?  
  *Hint: Check conditions for index 0 and len(mountain)-1 accordingly.*

### Summary
This is a classic single-pass traversal pattern—using two pointers (current, neighbor)—to find local maxima efficiently. This method is commonly applied for peak-finding or local search problems, especially in arrays, and demonstrates how analyzing neighbor relationships leads to O(n) solutions.

### Tags
Array(#array), Enumeration(#enumeration)

### Similar Problems
- Find Peak Element(find-peak-element) (Medium)
- Find a Peak Element II(find-a-peak-element-ii) (Medium)