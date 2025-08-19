### Leetcode 1285 (Medium): Find the Start and End Number of Continuous Ranges [Practice](https://leetcode.com/problems/find-the-start-and-end-number-of-continuous-ranges)

### Description  
You are given a sorted list of unique integers. Find all ranges of consecutive numbers and return their start and end points as intervals. Each range should be represented as [start, end], where start and end are inclusive.

### Examples  
**Example 1:**  
Input: `nums = [0,1,2,4,5,7]`
Output: `[[0,2],[4,5],[7,7]]`
*Explanation: The ranges are [0-2], [4-5], .*

**Example 2:**  
Input: `nums = [1,3,5,7]`
Output: `[[1,1],[3,3],[5,5],[7,7]]`
*Explanation: All ranges have single elements.*

**Example 3:**  
Input: `nums = [-5,-4,-3,1,2,3,10]`
Output: `[[-5,-3],[1,3],[10,10]]`
*Explanation: [-5,-3] and [1,3] are consecutive ranges; 10 is alone.*


### Thought Process (as if you’re the interviewee)  
Iterate through the sorted array, keep track of the start of a potential range. As long as the next number equals current+1, extend the range. When the next number breaks the sequence, record the current interval and start a new one. Single numbers form [x,x] ranges.

Only one pass is needed for linear time.


### Corner cases to consider  
- Empty array → output is [].
- Array with only one element.
- All elements are consecutive (one range).
- No consecutive numbers at all.


### Solution

```python
def find_continuous_ranges(nums):
    if not nums:
        return []
    res = []
    start = nums[0]
    for i in range(1, len(nums)):
        if nums[i] != nums[i-1] + 1:
            res.append([start, nums[i-1]])
            start = nums[i]
    res.append([start, nums[-1]])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), one pass through the array.
- **Space Complexity:** O(1) extra space (excluding output).


### Potential follow-up questions (as if you’re the interviewer)  

- How do you output as 'start->end' string format instead?
  *Hint: Change representation in output: use f"{start}->{end}" if start != end, else f"{start}".*
- What changes if input can have duplicates?
  *Hint: Skip duplicates as you iterate; don't start new ranges for repeated numbers.*
- Can you do this in-place using only output pointers?
  *Hint: Use two pointers and overwrite input if allowed.*

### Summary
This is the typical two-pointer scanning pattern for interval/segment problems. It's efficient and applicable for summary-ranges-type queries in time series, logs, or numerical datasets.

### Tags
Database(#database)

### Similar Problems
- Report Contiguous Dates(report-contiguous-dates) (Hard)
- Find the Missing IDs(find-the-missing-ids) (Medium)
- Customers With Strictly Increasing Purchases(customers-with-strictly-increasing-purchases) (Hard)