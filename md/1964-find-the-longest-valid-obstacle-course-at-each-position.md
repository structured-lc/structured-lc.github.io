### Leetcode 1964 (Hard): Find the Longest Valid Obstacle Course at Each Position [Practice](https://leetcode.com/problems/find-the-longest-valid-obstacle-course-at-each-position)

### Description  
Given an array of integers `obstacles` representing the heights of obstacles lined up in an obstacle course, for each position \( i \), you need to find the **length of the longest non-decreasing subsequence** (obstacle course) **ending at index \( i \)**, where:
- This subsequence must include the \( i^{th} \) obstacle.
- For the subsequence, each obstacle can only be as tall or taller than the previous one (i.e., *non-decreasing order*).
Return an array where each element is the maximum length of a valid course ending at that index.

### Examples  

**Example 1:**  
Input: `[1,2,3,2]`  
Output: `[1,2,3,3]`  
*Explanation:*
- At index 0: [1] → length 1  
- At index 1: [1,2] → length 2  
- At index 2: [1,2,3] → length 3  
- At index 3: [1,2,2] or [1,2,3,2] (non-decreasing: 1,2,2) → length 3

**Example 2:**  
Input: `[2,2,1]`  
Output: `[1,2,1]`  
*Explanation:*
- At index 0: [2] → length 1  
- At index 1: [2,2] → length 2 (1st and 2nd elements)  
- At index 2: [1] → length 1 (since there are no elements ≤ 1 before)

**Example 3:**  
Input: `[3,1,5,6,4,2]`  
Output: `[1,1,2,3,2,2]`  
*Explanation:*  
- idx 0: [3] → 1  
- idx 1: [1] → 1  
- idx 2: [1,5] or [3,5] → 2  
- idx 3: [1,5,6] or [3,5,6] → 3  
- idx 4: [1,4] or [3,4], length 2  
- idx 5: [1,2], length 2

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  For each index \( i \), scan all previous obstacles and pick every possible valid subsequence ending at \( i \):  
  This is similar to checking for the Longest Non-Decreasing Subsequence (LNDS) at every index, but recomputed each time.  
  Time: O(n²). Too slow for large n.

- **Optimization using DP + Binary Search:**  
  - The key realization: We’re asked for the LNDS ending at every position (not just the whole sequence).
  - Maintain a list `mono` where `mono[j]` holds the minimum ending value for a subsequence of length \( j+1 \) found so far.
  - For each obstacles[i], find the rightmost position to insert obstacles[i] in `mono` (using bisect_right / binary search). This keeps the sequence non-decreasing, allowing duplicates.
  - For each index, the LNDS ending at that index is position + 1.
  - Update the `mono` list accordingly.

- **Why this approach:**  
  Classic DP for LNDS is O(n²). Using a modified Patience Sorting variant with binary search, this is O(n log n).  
  The trick is to use upper_bound (bisect_right) instead of lower_bound (bisect_left) to allow non-decreasing subsequences (allowing equality).


### Corner cases to consider  
- Empty array (should return empty result).
- All elements equal (should increment up to that index, e.g., [5,5,5] -> [1,2,3]).
- Strictly increasing or decreasing arrays.
- Duplicates and single elements.
- Large values (test performance).

### Solution

```python
def longestObstacleCourseAtEachPosition(obstacles):
    # Holds smallest possible last values for increasing (non-decreasing) subsequence of each length
    mono = []
    ans = []

    for h in obstacles:
        # Find rightmost position to insert 'h'
        left, right = 0, len(mono)
        while left < right:
            mid = (left + right) // 2
            if mono[mid] <= h:
                left = mid + 1
            else:
                right = mid
        # left is the correct position: length is left+1
        ans.append(left + 1)
        if left == len(mono):
            mono.append(h)
        else:
            mono[left] = h
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  For each position, a binary search and possible insert/replace in the `mono` list.
- **Space Complexity:** O(n)  
  For the `mono` and `ans` lists. `mono` never grows larger than n.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you wanted to return the actual subsequence, not just the lengths?
  *Hint: Track predecessors and reconstruct the subsequence.*

- What if you want strictly increasing subsequences only?
  *Hint: Use bisect_left (lower_bound) so that equal values are not included in the same subsequence.*

- Can this be done online as new values arrive in a stream?
  *Hint: This method can be applied online since it uses only previous information.*

### Summary
This problem employs a **modified patience sorting/binary search** approach to efficiently compute the length of the longest non-decreasing subsequence ending at each index. It's a classic example of the **Longest Increasing/Non-Decreasing Subsequence** pattern optimized with binary search, and the pattern is widely applicable in scheduling, DP, and sequence analysis problems.

### Tags
Array(#array), Binary Search(#binary-search), Binary Indexed Tree(#binary-indexed-tree)

### Similar Problems
- Longest Increasing Subsequence(longest-increasing-subsequence) (Medium)