### Leetcode 3555 (Medium): Smallest Subarray to Sort in Every Sliding Window [Practice](https://leetcode.com/problems/smallest-subarray-to-sort-in-every-sliding-window)  

### Description  
Given an integer array and an integer k, for every sliding window (subarray) of length k, determine the length of the *smallest continuous subarray* within the window that you need to sort (ascending order) so that the entire window becomes sorted.  
For each window, return the minimal length of such a subarray. If the window is already sorted, return 0.

### Examples  

**Example 1:**  
Input: `nums = [1,3,2,4,5], k = 3`  
Output: `[2,2,0]`  
*Explanation:  
- Window 1: [1,3,2]: Sorting [3,2] yields [1,2,3], length=2  
- Window 2: [3,2,4]: Sorting [3,2] yields [2,3,4], length=2  
- Window 3: [2,4,5]: Already sorted, length=0  
*

**Example 2:**  
Input: `nums = [5,4,3,2,1], k = 4`  
Output: `[4,4]`  
*Explanation:  
- Window 1: [5,4,3,2]: Sorting entire window needed (all out-of-order), length=4  
- Window 2: [4,3,2,1]: Sorting entire window needed, length=4  
*

**Example 3:**  
Input: `nums = [1,2,3,4], k = 2`  
Output: `[0,0,0]`  
*Explanation:  
- All windows are already sorted, so minimal length is 0 for each window  
*

### Thought Process (as if you’re the interviewee)  
To solve this, the brute-force approach is:
- For each window of size k, find the minimal continuous segment you can sort so the window becomes entirely sorted.
- For a single window:  
    - Identify the smallest left index l and largest right index r such that sorting nums[l:r+1] (within the window) makes the window sorted.
    - If already sorted, return 0.

Naively, for each window, compare its current state to its sorted version and find the leftmost index where they differ and the rightmost as well; that's the segment you need to sort.

**Optimization:**  
- Since k is much smaller than n, and number of windows is n-k+1, the naive approach (checking O(k) for each window) gives O(n×k), which is acceptable for moderate k.
- To optimize within each window, we can:
    - Record the max to the left and the min to the right for each window.
    - Track where disorder appears as you scan from left and right.
- This avoids any extra log(k) sorting per window.

**Why this approach?**  
This ensures correctness (it is provably minimal), and is relatively efficient for the input constraints (O(n×k) overall).

### Corner cases to consider  
- Empty `nums` array.
- k = 1: Every window is sorted by definition, so output should be all 0s.
- All elements in a window are equal.
- Entire array already sorted.
- The needed subarray to sort must be at the beginning or the end of the window.
- The entire window must be sorted (reverse order).

### Solution

```python
from typing import List

def smallestSubarrayToSort(nums: List[int], k: int) -> List[int]:
    n = len(nums)
    res = []
    
    for start in range(n - k + 1):
        window = nums[start:start+k]
        
        # Find the leftmost and rightmost indices where window differs from sorted
        window_sorted = sorted(window)
        l, r = -1, -1
        
        for i in range(k):
            if window[i] != window_sorted[i]:
                if l == -1:
                    l = i
                r = i
        
        # If already sorted, l == -1
        if l == -1:
            res.append(0)
        else:
            res.append(r - l + 1)
    
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k)  
  For each window (n-k+1), we copy and sort a window of length k, costing O(k log k) per window. 
  For much smaller k, this is ok.  
  But with further optimization (two pointer scan), the O(n×k) version (not sorting, but scanning) can be used if needed.
- **Space Complexity:** O(k) per window for the copy and O(n) for the result array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `k` is very large—close to n?  
  *Hint: Can we identify which elements are out of order once for the whole array and reuse work across windows?*

- Can you avoid sorting for every window to make your solution faster?  
  *Hint: Use running min/max or direct comparisons, not repeated sorts. Consider the disorder positions only.*

- How would you handle repeated numbers or all-equal subarrays?  
  *Hint: The "already sorted" check works since repeated numbers are considered sorted if order is preserved.*

### Summary
This problem uses the **window scanning and sort/difference** approach, a hybrid of sliding window and partial sorting patterns.  
The key technique is identifying which minimal continuous segment can make a window sorted, by comparing original and sorted windows.  
This pattern appears in "minimum subarray sorting", "check if almost sorted", and related array reordering interview questions.


### Flashcard
For each sliding window, find the leftmost and rightmost indices where the window differs from its sorted version; return the subarray length between them (or 0 if sorted).

### Tags
Array(#array), Two Pointers(#two-pointers), Stack(#stack), Greedy(#greedy), Sorting(#sorting), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Shortest Unsorted Continuous Subarray(shortest-unsorted-continuous-subarray) (Medium)