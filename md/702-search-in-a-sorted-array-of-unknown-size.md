### Leetcode 702 (Medium): Search in a Sorted Array of Unknown Size [Practice](https://leetcode.com/problems/search-in-a-sorted-array-of-unknown-size)

### Description  
You're given a sorted array of integers, but you don't know its length in advance—access is only allowed via an ArrayReader interface, where `reader.get(k)` returns the element at index k (or a large sentinel value if k is out-of-bounds).  
Your task: Find the index of a target value in this array if it exists. Otherwise, return -1.  
The array is sorted in ascending order, and you aren't allowed to determine its size before searching.

### Examples  

**Example 1:**  
Input: `reader = [-1,0,3,5,9,12], target = 9`  
Output: `4`  
*Explanation: The value at index 4 is 9, which matches target. The algorithm returns 4.*

**Example 2:**  
Input: `reader = [-1,0,3,5,9,12], target = 2`  
Output: `-1`  
*Explanation: 2 is not present in the array, so we return -1.*

**Example 3:**  
Input: `reader = [5,6,7,8,20], target = 8`  
Output: `3`  
*Explanation: The value at index 3 is 8, matching target. Return 3.*

### Thought Process (as if you’re the interviewee)  

First, a brute-force solution is to query `reader.get(i)` incrementally (i = 0, 1, ...) and compare to the target.  
However, this is very slow if the array is large and the target is at the end or not present at all.

Given the array is sorted, *binary search* is optimal. But since we don't know the upper bound (length), we can't immediately set left and right pointers for binary search.

Therefore:
- **Step 1:** Exponentially expand the search bounds:  
  Start with `end = 1`, double `end` each time until `reader.get(end)` is greater than or equal to the target (or hits a sentinel value).
- **Step 2:** Run standard binary search between the found bounds (`start` and `end`), narrowing the interval until the target is found or it's clear it's absent.

This hybrid approach lets us efficiently pinpoint the segment where the target might lie (O(log K), where K is the index interval containing the target), then efficiently search within that segment (another O(log K)), for an overall O(log K) approach.  
This leverages sorted order, makes minimal queries, and gracefully handles the unknown size restriction.

### Corner cases to consider  
- Empty array (all get() return sentinels).
- Target less than the smallest element (should return -1).
- Target greater than all elements (searches until out-of-bounds).
- All elements identical.
- Array of one element.
- Target is at index 0.
- Very large arrays (should not TLE).

### Solution

```python
class Solution:
    def search(self, reader, target):
        # First check the 0th position directly
        if reader.get(0) == target:
            return 0
        
        # Find boundaries: start=0, end moves exponentially
        left, right = 0, 1
        # Keep expanding 'right' until it passes or matches the target
        while reader.get(right) < target:
            left = right
            right *= 2  # Double the search window
        
        # Standard binary search between left and right
        while left <= right:
            mid = left + (right - left) // 2
            val = reader.get(mid)
            if val == target:
                return mid
            elif val < target:
                left = mid + 1
            else:
                right = mid - 1
        
        # If not found
        return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log k), where k is the index of the target (or where target would be).  
  - Exponential expansion step: O(log k)
  - Binary search: O(log k)
- **Space Complexity:** O(1), no extra storage besides pointers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle arrays containing duplicates?
  *Hint: What if you want the leftmost or rightmost occurrence?*

- What if the reader interface is expensive? How would you minimize calls to `reader.get()`?
  *Hint: Can you batch or memoize lookups? Consider trade-offs between lookups and memory.*

- What if the possible integer values in the array are unbounded, or not guaranteed within a range?
  *Hint: How does that affect your search window estimation or bounds?*

### Summary
This problem is a variant of **binary search with unknown array length**, relying on *exponential backoff* to find a viable search window before applying binary search.  
The pattern is common in scenarios with limited-access data (linked lists, streaming data, APIs with unbounded data, file readers).  
The approach illustrates a key technique: *doubling search* to locate target boundaries efficiently, useful in many other blind-search contexts.

### Tags
Array(#array), Binary Search(#binary-search), Interactive(#interactive)

### Similar Problems
- Binary Search(binary-search) (Easy)
- Find the Index of the Large Integer(find-the-index-of-the-large-integer) (Medium)