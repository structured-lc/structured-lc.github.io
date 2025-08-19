### Leetcode 3468 (Medium): Find the Number of Copy Arrays [Practice](https://leetcode.com/problems/find-the-number-of-copy-arrays)

### Description  
Given an integer array `original` of length n and a 2D integer array `bounds` of shape n×2, where `bounds[i]` is the minimum and `bounds[i][1]` is the maximum allowed value for the iᵗʰ element, find how many arrays `copy` of length n exist such that:
- For all 0 ≤ i < n: bounds[i] ≤ copy[i] ≤ bounds[i][1]
- For all 1 ≤ i < n: (copy[i] - copy[i-1]) = (original[i] - original[i-1])  
In other words, for `copy`, its first value can be anything within bounds, and after that, the differences between adjacent elements must match those in `original`. You must count how many arrays `copy` are possible.

### Examples  

**Example 1:**  
Input: `original = [1,2,3]`, `bounds = [[1,2],[2,3],[3,4]]`  
Output: `2`  
*Explanation: The array differences are [1,1]. Possible starting values for copy are 1 or 2.  
If copy=1: copy=[1,2,3] (all in bounds)  
If copy=2: copy=[2,3,4] (all in bounds)  
So, 2 valid arrays.*

**Example 2:**  
Input: `original = [2,2,2]`, `bounds = [[1,2],[2,2],[2,2]]`  
Output: `1`  
*Explanation: Difference is [0,0]. Only possible is [2,2,2].*

**Example 3:**  
Input: `original = [3,1]`, `bounds = [[1,5],[1,2]]`  
Output: `2`  
*Explanation: Difference is [-2]. If copy=3: copy=[3,1] (both in bounds). If copy=4: copy=[4,2] (both in bounds).  
But starting at 5 gives [5,3], where 3 not in 2nd bounds. So only [3,1] and [4,2] are allowed.*

### Thought Process (as if you’re the interviewee)  
First, a brute-force solution would be to try every possible value for copy in its allowed bounds, simulate the copy array using the adjacent differences from `original`, and for each step check if the current value stays within its bound. This brute-force approach has worst-case time O(W × n), where W is the width of possible values for copy, which is too slow for large ranges.

However, we can optimize this. Notice that once copy is chosen, the rest of the array is determined by the original's differences. So we only need to find all integer values x such that for each i,  
bounds[i] ≤ x + d₁ + d₂ + ... + dᵢ ≤ bounds[i][1]  
where dᵢ is the sum of original differences up to i.  
We can maintain a running range [mn, mx] for copy, tightening this range at each step by considering the bounds and difference.  
At the end, total solutions are max(0, mx - mn + 1).

Trade-offs:  
- This sliding bound approach is O(n): very efficient, as we only need to tighten possible starting values without simulating every possibility.

### Corner cases to consider  
- n = 1 (should accept all values in bounds)
- Bounds with zero width (lower == upper)
- Impossible to fit: e.g., bounds too tight for the difference sequence  
- Negative numbers  
- Non-increasing original array  
- Large negative or positive steps

### Solution

```python
def countArrays(original, bounds):
    # Start with all possible values for copy[0]
    mn, mx = bounds[0][0], bounds[0][1]
    # Running total: sum of differences so far
    for i in range(1, len(original)):
        # The iᵗʰ copy value is copy[0] + sum of diffs up to i
        diff = original[i] - original[i-1]
        mn = max(mn + diff, bounds[i][0])
        mx = min(mx + diff, bounds[i][1])
        if mn > mx:
            return 0
    # All legal starting points for copy[0]
    return max(0, mx - mn + 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  The method iterates once through the array to update bounds for copy.  
- **Space Complexity:** O(1).  
  Only a constant number of variables for min/max bounds; no extra storage per input element.

### Potential follow-up questions (as if you’re the interviewer)  

- If bounds allow negative numbers or very large ranges, how does performance change?  
  *Hint: Does algorithm depend on the actual value or on the range width?*

- How would you modify the solution if you needed to count all possible `copy` arrays instead of just the number of possible starting values?  
  *Hint: If differences can be repeated or overlap, is enumeration feasible?*

- If differences do not match those of the original, but only have to be ≤ or ≥ the original's differences, how does the approach change?  
  *Hint: Would need to consider ranges of possible step differences, not just a single sequence.*

### Summary
This problem is a sliding interval/narrowing range pattern: by updating the feasible starting value for copy as we move through differences and bounds, we efficiently squeeze the answer into a tight range. This technique is common in problems related to prefix sums, difference constraints, or adjusting running feasibility over a collection (sweep line, DP with intervals, etc).

### Tags
Array(#array), Math(#math)

### Similar Problems
- Count of Range Sum(count-of-range-sum) (Hard)