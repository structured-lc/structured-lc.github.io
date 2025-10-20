### Leetcode 1064 (Easy): Fixed Point [Practice](https://leetcode.com/problems/fixed-point)

### Description  
Given a sorted array of distinct integers, find the smallest index i such that arr[i] == i. If there is no such index, return -1.  
The array is strictly increasing, and because it’s sorted, the values may be negative, zero, or positive. The goal is to efficiently find if any index matches its own value, and if so, which is the smallest such index.

### Examples  

**Example 1:**  
Input: `arr = [-10, -5, 0, 3, 7]`  
Output: `3`  
*Explanation: arr[3] = 3 — index and value match.*

**Example 2:**  
Input: `arr = [0, 2, 5, 8, 17]`  
Output: `0`  
*Explanation: arr = 0. There is a match at index 0.*

**Example 3:**  
Input: `arr = [-10, -5, 3, 4, 7, 9]`  
Output: `-1`  
*Explanation: No index i such that arr[i] = i. Return -1.*

### Thought Process (as if you’re the interviewee)  

**Brute-force approach:**  
- Loop through the array.
- For each index i, check if arr[i] == i.
- Return the smallest such i, or -1 if none found.
- Time: O(n)

**Optimized approach (Binary Search):**  
- Because the array is sorted and contains distinct elements, we can use binary search.
- At each step, compare arr[mid] with mid:
  - If arr[mid] < mid: All previous values are even further away (since both index and value grow), so move search to mid+1.
  - If arr[mid] > mid: Fixed point must be at mid or left, so move search to left (hi = mid-1).
  - If arr[mid] == mid: Potential answer found, but need to check if there’s a smaller i on the left, so continue searching left.
- Track the smallest index where arr[i] == i.
- Time: O(log n)

**Why binary search is better:**  
It leverages the sorted and strictly increasing property of the array, cutting the search space in half each time, ensuring O(log n) time.

### Corner cases to consider  
- Empty array: Should return -1.
- Array starts with matching index: e.g., arr = [0,2,3] → index 0 matches.
- All negative numbers.
- Large positive numbers that never match their index.
- No elements match their index.
- Single-element array, either arr == 0 or not.

### Solution

```python
def fixedPoint(arr):
    # Binary search to find the smallest index i where arr[i] == i
    lo, hi = 0, len(arr) - 1
    res = -1

    while lo <= hi:
        mid = (lo + hi) // 2

        if arr[mid] == mid:
            # Found a fixed point, but keep searching left for smaller index
            res = mid
            hi = mid - 1
        elif arr[mid] < mid:
            # Fixed point must be to the right
            lo = mid + 1
        else:
            # arr[mid] > mid, search left
            hi = mid - 1

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log n), because we're always reducing the search range by half in each iteration using binary search.
- **Space Complexity:** O(1), since only a fixed amount of variables are used regardless of the array size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if the array is not sorted?
  *Hint: Brute-force might be required; no binary search.*

- What if the array can have duplicate values?
  *Hint: Binary search with careful handling; look for the smallest fixed point.*

- Could you generalize this to finding all fixed points in the array, instead of just the smallest?
  *Hint: Traverse entire array, collect all i where arr[i] == i.*

### Summary
This problem uses the classic **binary search** approach, exploiting the sorted and unique property of the input array to efficiently find the smallest fixed point (where arr[i] == i). The pattern is commonly used in interview problems that involve searching in sorted arrays, like finding a target value, first/last occurrences, or custom index/value relationships.


### Flashcard
Use binary search to find the smallest index where arr[i] == i in a sorted array of distinct integers.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
