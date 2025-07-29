### Leetcode 2655 (Medium): Find Maximal Uncovered Ranges [Practice](https://leetcode.com/problems/find-maximal-uncovered-ranges)

### Description  
You are given an integer `n` (length of a 0-indexed array, imagine it as `nums=[0, 1, 2, ..., n-1]`) and a list `ranges`, where each range is `[start, end]` (inclusive). These given ranges may overlap and together cover some cells of the array. Your task: **Find all the unconvered sub-ranges of maximal length**—subarrays not covered by any `ranges`, grouped together.  
- Each uncovered cell should be in exactly one output sub-range.  
- No two uncovered sub-ranges should be adjacent (there should never be `[a, b]`, `[b+1, c]` as separate outputs; those ought to be merged).

### Examples  

**Example 1:**  
Input: `n = 10, ranges = [[3,5],[7,8]]`  
Output: `[[0,2],[6,6],[9,9]]`  
*Explanation: After covering 3–5 and 7–8, the uncovered cells are 0–2, 6, and 9. These are output as maximal consecutive intervals.*

**Example 2:**  
Input: `n = 5, ranges = [[0,1],[2,4]]`  
Output: `[]`  
*Explanation: All positions from 0 through 4 are covered (0–1 and 2–4), so no uncovered ranges exist.*

**Example 3:**  
Input: `n = 8, ranges = [[2,2],[4,6]]`  
Output: `[[0,1],[3,3],[7,7]]`  
*Explanation: Covered positions are 2,4,5,6; positions 0–1, 3, and 7 are each maximal uncovered ranges.*

### Thought Process (as if you’re the interviewee)  
First, the brute-force way could be:
- Mark for each cell in `0,1,...,n-1` whether it's covered by any range (use a list of booleans).
- Then, scan to find maximal stretches of false (uncovered) cells and report their intervals.

But this can be improved:
- Since `ranges` can overlap and aren't sorted, first **merge the given intervals** to get only the union of all covered regions as non-overlapping intervals.
- Then, walk from 0 to n-1 and for every gap between the merged covered intervals, add the range between them as an uncovered interval.
- This will be optimal and time-efficient, because finding gaps in sorted intervals is a classic pattern.

Key trade-offs:  
- The optimized approach (merging intervals) gives O(K log K) time for K input ranges (sort + scan), avoiding the O(nK) brute-force method.
- It also makes it trivial to output only maximal uncovered gaps, by simply looking at the merged intervals' endpoints.

### Corner cases to consider  
- `n = 0` (empty array): Output is `[]`.
- `ranges` is empty: The answer is a single maximal range `[0, n-1]` (if n>0).
- Ranges overlap or fully cover array: Must merge and deduplicate coverage.
- Ranges with boundaries outside `[0, n-1]`: All input will be within the array limits, but it's good to validate.
- One cell uncovered at beginning, end, or in between.
- All cells covered except the very first or last.

### Solution

```python
def findMaximalUncoveredRanges(n, ranges):
    # Step 1: Merge overlapping covered intervals
    ranges.sort()  # sort by start
    
    merged = []
    for start, end in ranges:
        if merged and merged[-1][1] >= start - 1:
            # Overlap or adjacent -> merge with previous
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    
    # Step 2: Find gaps between merged intervals as uncovered
    ans = []
    prev_end = -1
    for curr_start, curr_end in merged:
        if prev_end + 1 < curr_start:
            # There is an uncovered interval between prev_end+1 and curr_start-1
            ans.append([prev_end + 1, curr_start - 1])
        prev_end = curr_end

    # Step 3: Check for uncovered tail at the end
    if prev_end < n - 1:
        ans.append([prev_end + 1, n - 1])
    
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(K log K + K + U), where K = len(ranges), for sorting and merging input intervals, and U is the number of gaps (uncovered intervals).
- **Space Complexity:** O(K) for the merged list and output; O(1) extra beyond output and sorting.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input `ranges` can be extremely large (streamed, not all available in memory)?
  *Hint: Can you process intervals in chunks or use external sorting?*

- How would you count the number of uncovered cells instead of reporting full ranges?
  *Hint: Instead of storing intervals, just sum up (gap_length+1) for each gap.*

- If updates to `ranges` (add/remove) are frequent and queries are interleaved, how would you optimize lookups?
  *Hint: Use a segment tree or interval tree to allow dynamic range insertions.*

### Summary
This problem is a standard **interval merging and gap-finding** question. The optimal solution sorts and merges overlapping intervals, and then sweeps through to find maximal uncovered gaps. This pattern is common in calendar booking, range coverage, and interval-related coding interviews. Recognizing the value of first merging intervals avoids unnecessary per-cell operations, and ensures correctness and performance.