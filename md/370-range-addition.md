### Leetcode 370 (Medium): Range Addition [Practice](https://leetcode.com/problems/range-addition)

### Description  
Given an integer `length`, representing the size of an array initially filled with zeros, and a list of `updates`, where each `update = [startIdx, endIdx, inc]`, add `inc` to each element in the inclusive range `[startIdx, endIdx]`.  
After applying all updates, return the resulting array.

Example: If `length = 5` and updates = `[[1,3,2]]`, starting from `[0,0,0,0,0]`, the update results in `[0,2,2,2,0]` because 2 is added to elements at indices 1, 2, and 3.

### Examples  

**Example 1:**  
Input: `length = 5, updates = [[1,3,2],[2,4,3],[0,2,-2]]`  
Output: `[-2,0,3,5,3]`  
*Explanation:*
- Start: `[0,0,0,0,0]`
- After `[1,3,2]`: `[0,2,2,2,0]`
- After `[2,4,3]`: `[0,2,5,5,3]`
- After `[0,2,-2]`: `[-2,0,3,5,3]`

**Example 2:**  
Input: `length = 10, updates = [[2,4,6],[5,6,8],[1,9,-4]]`  
Output: `[0,-4,2,2,2,4,4,-4,-4,-4]`  
*Explanation:*
- Start: `[0,0,0,0,0,0,0,0,0,0]`
- After `[2,4,6]`: `[0,0,6,6,6,0,0,0,0,0]`
- After `[5,6,8]`: `[0,0,6,6,6,8,8,0,0,0]`
- After `[1,9,-4]`: `[0,-4,2,2,2,4,4,-4,-4,-4]`

**Example 3:**  
Input: `length = 3, updates = [[0,2,5]]`  
Output: `[5,5,5]`  
*Explanation:*  
Add 5 to indices 0, 1, 2 --> `[5,5,5]`


### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each update `[startIdx, endIdx, inc]`, loop from `startIdx` to `endIdx` (inclusive) and increment each element. Repeat this for each update.  
  *Problem:* If `updates` is large or ranges cover much of the array, this is slow: O(U × R) where U is number of updates and R is average range length.

- **Optimization:**  
  Recognize that this is a classic case for a *difference array* (or prefix sum trick).  
  - Instead of updating every element in the range,  
    - Add `inc` to `res[startIdx]`,  
    - Subtract `inc` from `res[endIdx+1]` (if inside bounds).
  - After applying these, take the prefix sum of the whole array.  
  - Each prefix sum step "accumulates" the increments for every position, efficiently applying all updates.
  - This brings time complexity down to O(U + N).

- **Trade-offs:**  
  - Brute-force = simple but slow for big inputs  
  - Difference array = a bit trickier to grasp, but much faster and optimal for this problem


### Corner cases to consider  
- No updates (`updates = []`): array remains all zeros.
- Each update covers only one element.
- Multiple updates overlap.
- Updates where `startIdx` or `endIdx` is at the bounds (0 or length-1).
- Negative increments.
- Only one element (`length = 1`).
- Updates that set increment to zero.


### Solution

```python
def getModifiedArray(length, updates):
    # Start with a zero array
    res = [0] * length

    # Apply each update to the difference array
    for start, end, inc in updates:
        res[start] += inc
        if end + 1 < length:
            res[end + 1] -= inc

    # Compute prefix sum to apply the increments
    curr = 0
    for i in range(length):
        curr += res[i]
        res[i] = curr

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(U + N), where U = number of updates, N = length of output array.  
  Each update takes O(1), overall prefix sum is O(N).

- **Space Complexity:** O(N) for storing the resulting array of length N.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify this if the input array wasn't all zeros to start?  
  *Hint: Apply the same difference approach, but add final prefix sum to initial values.*

- Can you optimize if there are lots of read queries in between updates?  
  *Hint: Use a segment tree or Binary Indexed Tree for range updates and point/range queries.*

- How would this work if updates are to be reverted efficiently?  
  *Hint: Store small diffs so you can rollback, or keep update history for bi-directional traversals.*


### Summary
This problem is a textbook example of the *difference array* and *prefix sum* approach, simplifying range update problems to O(1) per operation. The same pattern is widely used in scenarios requiring efficient batch/range updates, such as range add/range sum queries in arrays, time series, and interval problem optimizations. Recognizing it enables transforming brute-force O(N²) solutions into O(N) or O(log N) via tree-based structures.

### Tags
Array(#array), Prefix Sum(#prefix-sum)

### Similar Problems
- Range Addition II(range-addition-ii) (Easy)
- Count Positions on Street With Required Brightness(count-positions-on-street-with-required-brightness) (Medium)
- Shifting Letters II(shifting-letters-ii) (Medium)