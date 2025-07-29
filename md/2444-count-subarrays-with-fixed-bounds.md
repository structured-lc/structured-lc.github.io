### Leetcode 2444 (Hard): Count Subarrays With Fixed Bounds [Practice](https://leetcode.com/problems/count-subarrays-with-fixed-bounds)

### Description  
Given an array of integers `nums` and two integers `minK` and `maxK`, count the number of subarrays (contiguous segments) such that the smallest value in the subarray is exactly `minK` and the largest value is exactly `maxK`.  
These subarrays are called "fixed-bound subarrays":  
- For a subarray to be counted, its minimum must be `minK` and its maximum must be `maxK`, and both `minK` and `maxK` must actually be present (at least once) in the subarray.  
- All numbers in the subarray must be between `minK` and `maxK` (inclusive).

### Examples  

**Example 1:**  
Input: `nums = [1,3,5,2,7,5], minK = 1, maxK = 5`  
Output: `2`  
Explanation:  
Valid subarrays:  
- `[1,3,5]` (from index 0 to 2; min=1, max=5)  
- `[1,3,5,2]` (from index 0 to 3; min=1, max=5—since "2" is within [1,5])

**Example 2:**  
Input: `nums = [1,1,1,1], minK = 1, maxK = 1`  
Output: `10`  
Explanation:  
Every subarray is valid because all values are 1 (min=1, max=1).  
Total subarrays: (4 of length 1) + (3 of length 2) + (2 of length 3) + (1 of length 4) = 10

**Example 3:**  
Input: `nums = [2,3,4,5], minK = 2, maxK = 5`  
Output: `1`  
Explanation:  
Only `[2,3,4,5]` meets criteria (min=2, max=5, both present).


### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  - For every possible subarray, check if its min is `minK` and max is `maxK`, and both are included.  
  - For an n-length array, this is O(n²): check all ⌊n(n+1)/2⌋ subarrays. Way too slow.

- **Optimized approach:**
  - Since we need to count subarrays where all values fall in [minK, maxK], and min=minK, max=maxK, sliding window is suitable.
  - Observation: For each index, track the most recent position of:
    - Last `minK`
    - Last `maxK`
    - Last index where value was *not* in `[minK, maxK]` (invalid value)
  - For index `i`, the number of new subarrays ending at `i` is `max(0, min(last_minK, last_maxK) - last_invalid)`. Add this count to answer.
  - This walks the array once, so O(n) overall time.

- **Why this works:**  
  - The window between `last_invalid + 1` and `i` contains only valid values for [minK, maxK].  
  - The leftmost position that satisfies at least one `minK` and one `maxK` gives valid starting points for new subarrays ending at the current `i`.

- **Trade-offs:**  
  - Simple code, very fast, uses only constant space in addition to input.

### Corner cases to consider  
- Empty array (`nums=[]`)
- All values are equal, e.g., `nums=[5,5,5], minK=5, maxK=5`
- No valid subarrays because `minK` or `maxK` not present
- Some numbers out of `[minK, maxK]` range, interrupting valid windows
- One element array (`nums=[minK]` and `minK==maxK`)
- minK > maxK (should never happen per constraints, but worth clarifying)


### Solution

```python
def countSubarrays(nums, minK, maxK):
    # Track the positions of last out-of-bounds, last minK, and last maxK
    last_invalid = -1
    last_minK = -1
    last_maxK = -1
    res = 0

    for i, num in enumerate(nums):
        # If num is out of bounds, update last_invalid 
        if num < minK or num > maxK:
            last_invalid = i

        # Update last positions of minK and maxK
        if num == minK:
            last_minK = i
        if num == maxK:
            last_maxK = i

        # The leftmost of last_minK and last_maxK is the earliest we can start
        # Add valid window count if both minK and maxK have been seen since last_invalid
        min_last = min(last_minK, last_maxK)
        if min_last > last_invalid:
            res += min_last - last_invalid

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is length of nums.  
  - Each index is visited once; all work inside the loop is constant time.
- **Space Complexity:** O(1) extra.  
  - Only a few integer variables, no extra arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `minK` and `maxK` can change for each query on the same array?
  *Hint: Consider segment trees or RMQ structure if you support many such queries efficiently.*

- How to extend this to count subarrays where the range (max - min) is ≤ k, or between arbitrary values?
  *Hint: Would require two-pointer or sliding window technique, adjusting window condition.*

- Can you output the subarrays themselves, not just the count?
  *Hint: Store indices or generate subarrays on the fly for each window; time and space may be much higher.*

### Summary
This is a classic **sliding window with index tracking** pattern.  
By maintaining the position of the last occurrence of `minK`, `maxK`, and the last invalid element, we can efficiently count all valid subarrays in one pass, O(n), with O(1) space.  
A similar logic is often used for "count occurrences of a target with constraints" problems, and knowing how to derive sliding window endpoints using index math is valuable in subarray counting problems.