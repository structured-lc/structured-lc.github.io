### Leetcode 3488 (Medium): Closest Equal Element Queries [Practice](https://leetcode.com/problems/closest-equal-element-queries)

### Description  
Given a **circular array** `nums` and an array `queries`, for each query index, find the **minimum distance** between the element at index `queries[i]` and any other index ⱼ (ⱼ ≠ queries[i]) in the circular array where `nums[j] == nums[queries[i]]`. If there’s no other such index, return -1 for that query.  
Circular distance means you can go forward or wrap around to the beginning of the array.

### Examples  

**Example 1:**  
Input: `nums = [1,3,1,4,1,3,2]`, `queries = [0,3,5]`  
Output: `[2,-1,3]`  
Explanation:  
- Query 0: `nums=1`, other 1s at indices 2,4 → nearest is 2 (`|0-2|=2`).
- Query 1: `nums[3]=4` (only occurs at index 3) → output is -1.
- Query 2: `nums[5]=3`, other 3 at index 1. Circular distance: 5→6→0→1 (distance 3).

**Example 2:**  
Input: `nums = [2,1,2,1,2]`, `queries = [4,0,1]`  
Output: `[1,1,-1]`  
Explanation:  
- Query 0: `nums[4]=2`, other 2s at 0,2 → nearest is 0 (`min(4-0, 5-4+0)=1`)
- Query 1: `nums=2`, nearest is at 2 or 4 (`min(2-0,5-2+0)`), both are distance 2, but index 4 is only 1 away (circularly).
- Query 2: `nums[1]=1`, other 1 at 3, distance is 2. No closer.

**Example 3:**  
Input: `nums=[5]`, `queries=`  
Output: `[-1]`  
Explanation: Single element, no other occurrence.

### Thought Process (as if you’re the interviewee)  
Brute Force:  
- For each query: check every other index in the array, measure circular distance if value matches.
- Circular distance for i, j in `n`: `min(|i-j|, n - |i-j|)`.
- This is O(n\*m) for m queries—not efficient for large arrays.

Optimization:  
- Preprocess: For each unique value, store a **sorted list of all its indices**.
- For each query: Binary search the closest index to queries[i] in its occurrences.
- Compute both forward and wrap-around candidates using the sorted list (handle circularity).
- This is O(n) to build the index map and O(log k) per query for each value appearing k times.

Trade-Offs:  
- Brute force is simple but slow.
- Preprocessing and binary search makes it efficient and scalable.

### Corner cases to consider  
- Array of length 1 (no second occurrence).
- All elements the same (distance is always ≠0).
- Elements with no duplicate.
- Queries for indices that never repeat.
- Wrap-around being the minimum path (circularity).
- Empty queries.

### Solution

```python
from typing import List
import bisect

def closest_equal_element_queries(nums: List[int], queries: List[int]) -> List[int]:
    n = len(nums)
    # Map from value to sorted list of indices
    value_indices = {}
    for i, num in enumerate(nums):
        value_indices.setdefault(num, []).append(i)
    
    res = []
    for idx in queries:
        num = nums[idx]
        indices = value_indices[num]
        if len(indices) == 1:
            res.append(-1)
            continue

        # Binary search for closest other index
        pos = bisect.bisect_left(indices, idx)
        # Check previous and next occurrence
        candidates = []
        if pos > 0:
            prev_idx = indices[pos - 1]
            # Circular distance
            dist = min(abs(idx - prev_idx), n - abs(idx - prev_idx))
            if prev_idx != idx:
                candidates.append(dist)
        if pos < len(indices) - 1:
            next_idx = indices[pos + 1]
            dist = min(abs(idx - next_idx), n - abs(idx - next_idx))
            if next_idx != idx:
                candidates.append(dist)
        # Wrap-around
        first_idx, last_idx = indices[0], indices[-1]
        if idx != first_idx:
            dist = min(abs(idx - first_idx), n - abs(idx - first_idx))
            candidates.append(dist)
        if idx != last_idx:
            dist = min(abs(idx - last_idx), n - abs(idx - last_idx))
            candidates.append(dist)
        
        res.append(min(candidates) if candidates else -1)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m log k),  
  where n = len(nums), m = len(queries), and k = number of duplicate occurrences for nums[queries[i]].  
  Building the index map is O(n), each query binary search is log(k).
- **Space Complexity:** O(n),  
  For storing index lists for each unique element.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array is very large and too many queries arrive online?  
  *Hint: Could you preprocess in O(n) so each query is O(log k)?*
  
- How would you handle updates to nums, i.e., element changes?  
  *Hint: Index lists need to be kept sorted in real time—use balanced BST or other updatable structures.*
  
- What if the array was not circular?  
  *Hint: Just use abs(i-j), do not consider wrapping.*

### Summary
The efficient approach for this problem is the **index map with binary search**, a standard method for nearest duplicate queries in arrays (often combined with circular array logic). This preprocessing + fast-lookup pattern is reusable for problems requiring fast access to relative positions of repeated values (similar to nearest-repeated-word, range queries, etc).


### Flashcard
Preprocess by storing sorted index lists for each unique value, then binary search to find the closest index in circular distance for each query.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search)

### Similar Problems
