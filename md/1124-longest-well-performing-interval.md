### Leetcode 1124 (Medium): Longest Well-Performing Interval [Practice](https://leetcode.com/problems/longest-well-performing-interval)

### Description  
Given an array `hours` representing the number of hours an employee worked each day, a *tiring day* is a day where hours > 8.  
A *well-performing interval* is a contiguous subarray where the number of tiring days is **strictly greater** than the number of non-tiring days.  
Your task: Return the length of the longest such interval.

### Examples  

**Example 1:**  
Input: `hours = [9,9,6,0,6,6,9]`  
Output: `3`  
*Explanation: The subarray [9,9,6] has two tiring days (9,9) and one non-tiring day (6), so it's a well-performing interval of length 3. No longer interval meets the requirement.*

**Example 2:**  
Input: `hours = [6,6,6]`  
Output: `0`  
*Explanation: There are no tiring days, so there is no well-performing interval.*

**Example 3:**  
Input: `hours = [7,9,9,6,6,9]`  
Output: `3`  
*Explanation: [9,9,6] is a well-performing interval. Other intervals don't have more tiring than non-tiring days.*

### Thought Process (as if you’re the interviewee)  
Starting with brute force:  
- For every interval (start, end), count tiring and non-tiring days and see if tiring > non-tiring.  
- This is O(n²), which is too slow for n up to 10⁴.

Optimizing:  
- Convert the problem to prefix sums. Replace each day:  
  - tiring day (>8 hours): +1  
  - non-tiring day (≤8 hours): −1  
- So the problem becomes finding the longest subarray whose sum is strictly positive.
- When the current prefix sum is positive, the subarray from the beginning to the current index is valid.
- If not positive, we want to find an earlier prefix sum that is **less by 1**, so that the interval in between has sum > 0.
- To do this efficiently, track the first index where each prefix sum occurs in a hashmap.

This sliding window with prefix/hashing reduces time complexity to O(n).

Tradeoffs:
- Hashmap is used for O(1) lookups.
- No extra optimization for space, but supports large input easily.

### Corner cases to consider  
- All days are non-tiring (all hours ≤ 8): output 0
- All days are tiring (all hours > 8): output = len(hours)
- Only one day: test for both tiring and non-tiring
- Alternating tiring/non-tiring days: ensure you select only intervals where tiring > non-tiring (not just ≥)
- Empty input (though constraints guarantee at least one day)

### Solution

```python
def longestWPI(hours):
    # Transform to +1 for tiring (>8), -1 for not tiring
    s = 0
    result = 0
    first_occurrence = {}
    
    for i, hour in enumerate(hours):
        # Update running score
        s += 1 if hour > 8 else -1
        
        # Case 1: from 0 to i, if s > 0, full interval is well-performing
        if s > 0:
            result = i + 1
        else:
            # Check if we've seen s-1 before
            if (s - 1) in first_occurrence:
                result = max(result, i - first_occurrence[s - 1])
            # Save only the first occurrence of a sum (for maximal interval)
            if s not in first_occurrence:
                first_occurrence[s] = i
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(hours).  
  Each index in hours is visited once, and all hashmap operations are O(1).
- **Space Complexity:** O(n), for the hashmap storing first occurrence of each cumulative sum (in worst case, all prefixes are unique).

### Potential follow-up questions (as if you’re the interviewer)  

- Can you return the actual interval (start, end indices), not just the length?  
  *Hint: Track indices where each prefix sum is first seen and adjust your answer.*

- How would you solve if there are multiple employees (multiple arrays) at once?  
  *Hint: Can you generalize your mapping logic per employee and merge results?*

- What if the "tiring" threshold is variable per day or per employee?  
  *Hint: Preprocess an array with this logic, then apply the same prefix/hashing approach.*

### Summary
The problem is a *prefix sum + hashmap* (monotonic mapping) variant, similar to finding the longest subarray with a sum > 0.  
This pattern appears often in problems related to subarrays with certain sum properties, and is highly useful for large input constraints due to its linear time.  
It's a canonical example for "transform to +1/−1, apply prefix sum, and optimize with hashmap."

### Tags
Array(#array), Hash Table(#hash-table), Stack(#stack), Monotonic Stack(#monotonic-stack), Prefix Sum(#prefix-sum)

### Similar Problems
