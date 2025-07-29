### Leetcode 2274 (Medium): Maximum Consecutive Floors Without Special Floors [Practice](https://leetcode.com/problems/maximum-consecutive-floors-without-special-floors)

### Description  
Given two integers, **bottom** and **top**, representing the lowest and highest floor numbers Alice has rented in a building (both inclusive), and an integer array **special** listing the floor numbers marked for relaxation (these can't be used as regular workspace). Find the maximum number of **consecutive** (adjacent) floors within this range **not** interrupted by a special floor; in other words, what's the longest continuous span of non-special floors between bottom and top?

### Examples  

**Example 1:**  
Input: `bottom = 2, top = 9, special = [4, 6]`  
Output: `3`  
*Explanation: The consecutive ranges without a special floor are:*
- *(2,3): 2 floors*
- *(5,5): 1 floor*
- *(7,9): 3 floors*

*The largest is 3 floors: from 7 to 9 (inclusive).*

**Example 2:**  
Input: `bottom = 6, top = 8, special = [7,6,8]`  
Output: `0`  
*Explanation: Every floor in the rented range is a special floor, so no regular floor is available.*

**Example 3:**  
Input: `bottom = 1, top = 10, special = [2,4,7]`  
Output: `3`  
*Explanation: Consecutive non-special segments:*
- *(1,1): 1 floor*
- *(3,3): 1 floor*
- *(5,6): 2 floors*
- *(8,10): 3 floors (longest)*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  I could check, for each non-special floor, how many consecutive non-special floors it starts, but that would be inefficient if the range is large.

- **Optimized:**  
  It's clear that the special floors *split* the main range into segments. So:
  - If I **sort** the special floors, I can find the gaps between them and from the ends (bottom or top) to the nearest special floor.
  - For each gap, the count of consecutive floors is (curr_special - prev_special - 1).
  - Don't forget the *beginning* ((first_special - bottom)) and the *end* ((top - last_special)) which might be the largest segment.
  - At the end, return the max gap.

- **Trade-offs:**  
  The sorting dominates the time complexity (O(n log n), n = length of special). One pass for the gaps is O(n). Space is O(1) extra if sort in-place.

### Corner cases to consider  
- All floors are special: return 0.
- No special floors: the answer is (top - bottom + 1).
- Special floors outside the [bottom, top] range (should not happen according to constraints).
- Special floors may not be sorted, may have duplicates.
- bottom == top, only one floor.

### Solution

```python
def maxConsecutive(bottom, top, special):
    # Remove duplicates and sort the special list
    special = sorted(set(special))
    n = len(special)
    max_gap = 0

    # Check the gap before the first special floor
    max_gap = max(max_gap, special[0] - bottom)  # floors: bottom .. (special[0]-1)
    
    # Check gaps between consecutive special floors
    for i in range(1, n):
        gap = special[i] - special[i-1] - 1
        if gap > max_gap:
            max_gap = gap

    # Check the gap after the last special floor
    max_gap = max(max_gap, top - special[-1])  # floors: (special[-1]+1) .. top

    return max_gap
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n is the number of special floors, due to sorting. The subsequent single pass is O(n).
- **Space Complexity:** O(1) extra space (if sorting in-place), or O(n) if a new sorted array is created.

### Potential follow-up questions (as if you’re the interviewer)  

- If the range [bottom, top] is extremely large (say 10⁹), but special is small, how can you keep the algorithm efficient?  
  *Hint: You only need to process the special array and endpoints, not enumerate all floors.*

- Can you handle multiple queries efficiently, where only special changes?  
  *Hint: Preprocessing the original array can help, maybe with a segment tree or efficient hash sets.*

- What if floors can be added/removed dynamically from special during operations?  
  *Hint: Think about dynamic sorted data structures, like Balanced BSTs or TreeSets.*

### Summary
This problem fits the "finding maximum gap between sorted elements + start/end" pattern. The solution relies on sorting and then O(1) gap computation per interval, which is common when working with excluded or 'barrier' points segmenting a range. This technique is useful for maximum subarray problems, calendar booking, intervals between events, and seat allocation.