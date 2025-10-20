### Leetcode 2080 (Medium): Range Frequency Queries [Practice](https://leetcode.com/problems/range-frequency-queries)

### Description  
Design a data structure to efficiently answer queries about how many times a value appears in a subarray. Given an integer array, preprocess it so that, for any query (left, right, value), you can quickly return how many times value appears between indices left and right (inclusive). The array is not modified after construction.

### Examples  

**Example 1:**  
Input:  
arr = `[12, 3, 3, 12, 5, 3, 3, 5]`  
queries:  
```
query(2, 5, 3) ➔ 2
query(0, 7, 12) ➔ 2
query(4, 4, 5) ➔ 1
```
Explanation:  
- query(2, 5, 3): indices 2–5 is [3, 12, 5, 3], 3 appears 2 times.
- query(0, 7, 12): 12 appears at indices 0 and 3 (2 times).
- query(4, 4, 5): only arr[4]=5, value appears once.

**Example 2:**  
Input:  
arr = `[1, 2, 3, 4, 5]`  
queries:  
```
query(1, 3, 2) ➔ 1
query(0, 4, 6) ➔ 0
```
Explanation:  
- query(1, 3, 2): arr[1..3]=[2,3,4], 2 appears once.
- query(0, 4, 6): 6 does not appear anywhere.

**Example 3:**  
Input:  
arr = `[100, 100, 100]`  
queries:  
```
query(0, 2, 100) ➔ 3
query(1, 1, 100) ➔ 1
```
Explanation:  
- query(0, 2, 100): all elements are 100.
- query(1, 1, 100): only index 1, is 100.

### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  For each query, scan the subarray arr[left..right] and count how many equal value.  
  This is O(right-left+1) per query, slow if the array and number of queries are large.

- **Optimization:**  
  Since the array doesn’t change, preprocess for faster queries:
  - For each unique value, store a sorted list of indices where it appears.
  - For queries, use binary search to find how many indices of value are in [left, right].
  - For value x, get indices: locations = map[x].
    - Use lower_bound to find the first index ≥ left.
    - Use upper_bound to find the first index > right.
    - The answer is (count = upper index - lower index).

- **Trade-offs:**  
  - Preprocessing takes O(n), but each query only needs O(log k) where k is the number of occurrences of value, so O(log n) worst-case.

### Corner cases to consider  
- Array has only one element.
- All elements are the same.
- Value does not exist in array.
- left == right (single element range).
- left > right (invalid query? Not specified, assume left ≤ right).
- Query value occurs outside the [left, right] range only.
- Empty array (not specified, but should handle if possible).

### Solution

```python
from collections import defaultdict
import bisect

class RangeFreqQuery:
    def __init__(self, arr):
        # Map from each value to a sorted list of its indices
        self.idx_map = defaultdict(list)
        for i, num in enumerate(arr):
            self.idx_map[num].append(i)

    def query(self, left, right, value):
        # If value not in arr, return 0
        if value not in self.idx_map:
            return 0
        idxs = self.idx_map[value]
        # Find first position idxs[i] >= left
        l = bisect.bisect_left(idxs, left)
        # Find first position idxs[j] > right
        r = bisect.bisect_right(idxs, right)
        return r - l
```

### Time and Space complexity Analysis  

- **Time Complexity:**
  - Constructor: O(n), making the map of value → indices.
  - Query: O(log k), where k = occurrences of value (binary search); O(log n) worst-case.

- **Space Complexity:**
  - O(n) for storing the mapping of each element’s positions.
  - No extra large structures; just the mapping and arrays of indices.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array allows updates (mutations)?
  *Hint: Preprocessing with a segment tree or BIT might be needed, since map of indices will be invalid if data changes.*

- How would you handle range mode queries (most frequent element in subarray)?
  *Hint: Mode queries are harder; can't be solved with same method efficiently, may need advanced structures like Wavelet Trees or Mo’s algorithm.*

- If queries far outnumber array size, can you further optimize space?
  *Hint: Consider compressing indices, offline processing, or storing counts at blocks if value set is small.*

### Summary
This approach uses a classic binary search over preprocessed value→indices mapping to efficiently count frequencies in subarrays—a “coordinate mapping + search” pattern, common in static range query problems when updates are not allowed. It’s especially useful for immutable arrays and can appear in problems involving range counting, Kth order statistics, and frequency queries on static data.


### Flashcard
For each value, store sorted indices; answer queries by binary searching this list to count occurrences in [left, right].

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Design(#design), Segment Tree(#segment-tree)

### Similar Problems
