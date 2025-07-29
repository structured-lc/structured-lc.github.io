### Leetcode 1574 (Medium): Shortest Subarray to be Removed to Make Array Sorted [Practice](https://leetcode.com/problems/shortest-subarray-to-be-removed-to-make-array-sorted)

### Description  
Given an integer array `arr`, remove a (possibly empty) subarray (contiguous) so that the remaining elements are in non-decreasing order. Find the length of the shortest such subarray to remove.

### Examples  
**Example 1:**  
Input: `arr = [1,2,3,10,4,2,3,5]`  
Output: `3`  
*Explanation: Remove subarray [10,4,2] (indices 3–5); result is [1,2,3,3,5], which is sorted.*

**Example 2:**  
Input: `arr = [5,4,3,2,1]`  
Output: `4`  
*Explanation: Remove [5,4,3,2] (indices 0–3) or [4,3,2,1].* 

**Example 3:**  
Input: `arr = [1,2,3]`  
Output: `0`  
*Explanation: Already non-decreasing; remove nothing.*

### Thought Process (as if you’re the interviewee)  
The brute-force solution is to try all possible subarrays, remove them, and check if the rest is sorted—inefficient for large inputs (O(n²)). Better: find the longest prefix and suffix that is already sorted and see where they can be joined (using two pointers, binary search for minimal removal). Try all possibilities of joining prefix's end with suffix's start for minimal length remove. This gives an O(n) approach.

### Corner cases to consider  
- Array already sorted (remove none)
- Array sorted only at prefix or suffix
- Multiple subarrays qualify with same minimal length
- All elements equal
- Array of length 1

### Solution

```python
def findLengthOfShortestSubarray(arr):
    n = len(arr)
    left = 0
    # find longest non-decreasing prefix
    while left + 1 < n and arr[left] <= arr[left+1]:
        left += 1
    if left == n - 1:
        return 0  # already sorted
    right = n - 1
    # find longest non-decreasing suffix
    while right > 0 and arr[right-1] <= arr[right]:
        right -= 1
    # minimal remove is either start...right-1 or left+1...end
    res = min(n - left -1, right)
    # try to merge two parts
    i = 0
    j = right
    while i <= left and j < n:
        if arr[i] <= arr[j]:
            res = min(res, j - i - 1)
            i += 1
        else:
            j += 1
    return res
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n): single pass for prefix/suffix, and linear two-pointer merge.
- **Space Complexity:** O(1): no extra storage, only pointers/counters.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you modify this algorithm for non-contiguous subarrays?
  *Hint: Consider dynamic programming for minimal out-of-order removals.*

- What if the array is very large and cannot fit in memory?
  *Hint: Streaming, sliding window with min/max stacks.*

- How does your algorithm behave on arrays with many equal elements?
  *Hint: Carefully handle ≤ instead of < in comparisons.*

### Summary
This is a classic application of the **two-pointer** and **prefix/suffix** non-decreasing subarray concepts. The techniques are widely useful in interval problems, sorted merging, and minimum operation substructures.