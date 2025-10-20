### Leetcode 1764 (Medium): Form Array by Concatenating Subarrays of Another Array [Practice](https://leetcode.com/problems/form-array-by-concatenating-subarrays-of-another-array)

### Description  
Given a list of integer subarrays `groups` and a target integer array `nums`, determine if you can sequentially find each group as a **disjoint** contiguous subarray in `nums`. The order of the subarrays in `groups` must be preserved, and their matching in `nums` cannot overlap.  
You must find each `groups[i]` as a block in `nums`, moving from left to right without reusing any elements, and all `groups` must be found in this way for the answer to be true.

### Examples  

**Example 1:**  
Input: `groups = [[1,2,3], [3,4]], nums = [7,1,2,3,4,7,3,4]`  
Output: `True`  
Explanation:  
- First group `[1,2,3]` found at positions 1~3 of `nums`
- Next group `[3,4]` found starting at position 6~7 (no overlap).  
So, answer is `True`.

**Example 2:**  
Input: `groups = [[1,2,3], [3,4]], nums = [1,2,3,4,3,4]`  
Output: `True`  
Explanation:  
- `[1,2,3]` found at positions 0~2.
- `[3,4]` found at positions 4~5 (disjoint).  
So, answer is `True`.

**Example 3:**  
Input: `groups = [[1,2],[3,4]], nums = [1,3,4,1,2,3,4]`  
Output: `False`  
Explanation:  
- `[1,2]` only appears at positions 3~4, but after that there is only `[3,4]` at 5~6, which overlaps with `[1,2]` if taken at positions 3~4.
- No way to match them in order **without overlap**, so answer is `False`.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each group, try all possible positions in `nums` for a match, making sure matches don't overlap. That means for each group, after a match, resume searching for the next one starting right after the end of previous match. Nested loops for search, O(m \* n) time (m = sum of group lengths, n = len(nums)).
- **Optimized:**  
  Since groups must appear in a specific order and be disjoint, use two pointers:
  - Pointer `i` for `groups`, `j` for `nums`.
  - For each group, slide a window over `nums` (starting from `j`), looking for a match.
  - If match found, move both pointers forward: `i += 1`, `j += len(groups[i])`
  - If no match at this start, increment `j` by 1 and try again.
  - If run out of room in `nums` (i.e., not enough elements left for next group), return `False`.
  This approach is efficient, simple, and matches the problem's constraints on order and non-overlap.

### Corner cases to consider  
- `groups` or `nums` empty
- group subarrays longer than `nums`
- multiple possible matches for the same group in `nums`
- groups with single element, groups with repeated elements
- overlapping potential matches but only non-overlapping allowed
- `nums` much longer than total of all `groups`
- identical consecutive groups in `groups` (e.g. `[[2], [2]]`)
- negative numbers

### Solution

```python
def canChoose(groups, nums):
    i = 0  # index for groups
    j = 0  # index for nums

    while i < len(groups) and j <= len(nums) - len(groups[i]):
        # Try to match group i starting at position j in nums
        match = True
        for k in range(len(groups[i])):
            if nums[j + k] != groups[i][k]:
                match = False
                break
                
        if match:
            # If match found, move to next group, move j past the matched subarray
            j += len(groups[i])
            i += 1
        else:
            # If not match, shift window by one position in nums
            j += 1

    # Return True if all groups matched
    return i == len(groups)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N \* L), where N = len(nums), L = max group length.  
  For each group, we may scan through nums, and for each comparison may need to compare up to L elements.

- **Space Complexity:**  
  O(1) extra space (just a few pointers and loop vars), not counting input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if elements in `groups` are not contiguous in `nums` (need to allow gaps)?
  *Hint: Try modifying the window logic to allow skipping elements in `nums`.*
- What if groups can overlap in `nums` and you're allowed to match even if they're not disjoint?
  *Hint: Use recursion/backtracking to explore all matches (may be exponential).*
- What if you want to return the indices of where groups matched in `nums`?
  *Hint: Store start indices each time a group is found; return if all succeed.*

### Summary
This problem is a classic example of the **two-pointer**/windowing pattern, similar to substring matching.  
It tests sequential, non-overlapping block matching in arrays.  
The main coding pattern here—searching for subarrays in a larger array with order and non-overlap constraints—appears in problems like "string segmentation," "find sequence," and "windowed matching."  
It's a good template for array scanning and pointer management interview problems.


### Flashcard
Use two pointers to match groups in order within nums, ensuring groups are disjoint and in sequence.

### Tags
Array(#array), Two Pointers(#two-pointers), Greedy(#greedy), String Matching(#string-matching)

### Similar Problems
