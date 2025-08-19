### Leetcode 163 (Easy): Missing Ranges [Practice](https://leetcode.com/problems/missing-ranges)

### Description  
Given a sorted array of unique integers (**nums**) and a range defined by integers **lower** and **upper**, find all numbers between lower and upper (inclusive) that are missing from **nums**. Instead of listing every missing number individually, return them as the smallest list of consecutive ranges.  
If a single number is missing, report as `"x"`; if a range from x to y is missing, report as `"x->y"`.

### Examples  

**Example 1:**  
Input: `nums = [0, 1, 3, 50, 75], lower = 0, upper = 99`  
Output: `["2", "4->49", "51->74", "76->99"]`  
*Explanation:*  
- 0 and 1 are present.  
- 2 is missing: `"2"`  
- 3 is present.  
- 4 to 49 are missing: `"4->49"`  
- 50 is present  
- 51 to 74 are missing: `"51->74"`  
- 75 is present  
- 76 to 99 are missing: `"76->99"`  

**Example 2:**  
Input: `nums = [], lower = 1, upper = 1`  
Output: `["1"]`  
*Explanation:*  
- The whole range 1 to 1 is missing: `"1"`  

**Example 3:**  
Input: `nums = [-1], lower = -1, upper = -1`  
Output: `[]`  
*Explanation:*  
- -1 is present, so nothing is missing.

### Thought Process (as if you’re the interviewee)  
To solve this, think of walking from `lower` to `upper` and comparing each step with the current value in **nums**:  
- Start at **lower**.  
- For each number in **nums**, if it’s greater than **lower**, then the numbers between **lower** and (num-1) are missing.  
- Move **lower** to (num + 1) each time you match or skip forward.  
- After the loop, check if there’s a gap between the last **lower** and **upper**, and add any missing range.  

**Why this approach?**  
- It’s efficient (single pass), no recursion or extra space beyond the result.  
- Handles all positions for missing numbers: before, between, and after the numbers in **nums**.

### Corner cases to consider  
- Empty array (all in range are missing).  
- Full array (nothing missing).  
- Range is a single number.  
- Numbers in **nums** at the very bounds.  
- Negative numbers.  
- Array with gaps at the start, middle, and/or end.

### Solution

```python
def findMissingRanges(nums, lower, upper):
    # Helper to format the missing range as required
    def formatRange(start, end):
        if start == end:
            return str(start)
        else:
            return f"{start}->{end}"
    
    res = []
    prev = lower - 1  # Start before the lower bound
    n = len(nums)
    
    # Iterate through all indexes (including after the last number)
    for i in range(n + 1):
        # For the "next" value, use nums[i] if in-bounds, else upper+1
        curr = nums[i] if i < n else upper + 1
        # If there's a gap, add the range to result
        if curr - prev > 1:
            res.append(formatRange(prev + 1, curr - 1))
        prev = curr  # Move forward
    
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because we make one pass through nums.
- **Space Complexity:** O(1) extra (excluding the output list); no extra structures used, just a result list for the output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if **nums** is not sorted?
  *Hint: What could you do before running the current logic?*

- What if we allow duplicates in **nums**?
  *Hint: How can you skip duplicates efficiently?*

- Can you return the ranges as a list of [start, end] pairs instead of string formatting?
  *Hint: Change the `formatRange` implementation.*

### Summary
The main pattern here is **two-pointer sliding intervals** through a sorted sequence. This is a classic "missing elements in sorted array" variant and can be adapted for ranges, merging intervals, or even for summary ranges of present values.  
Knowing how to walk and compare against both ends of an array/range is useful for edge handling. This is frequently used in range summary or merging problems.

### Tags
Array(#array)

### Similar Problems
- Summary Ranges(summary-ranges) (Easy)
- Find Maximal Uncovered Ranges(find-maximal-uncovered-ranges) (Medium)