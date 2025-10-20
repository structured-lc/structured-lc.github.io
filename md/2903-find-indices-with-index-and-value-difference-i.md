### Leetcode 2903 (Easy): Find Indices With Index and Value Difference I [Practice](https://leetcode.com/problems/find-indices-with-index-and-value-difference-i)

### Description  
Given an integer array **nums** of length n, plus two integers: **indexDifference** and **valueDifference**.  
Find two indices **i** and **j** (both in range 0 to n-1) such that:
- |i - j| ≥ indexDifference
- |nums[i] - nums[j]| ≥ valueDifference  
If multiple such pairs exist, return any one as `[i, j]`. If none, return `[-1, -1]`.  
Indices **i** and **j** can be the same (i.e., indexDifference could be 0).  
The focus is to find any single valid pair—not all pairs.

### Examples  

**Example 1:**  
Input: `nums = [5,1,4,1], indexDifference = 2, valueDifference = 4`  
Output: `[0,2]`  
*Explanation: |0-2| = 2 ≥ 2, |5-4| = 1 < 4, so let's check others. 0 and 3: |0-3| = 3 ≥ 2, |5-1| = 4 ≥ 4. So, output could be [0,3].*

**Example 2:**  
Input: `nums = [2,1], indexDifference = 0, valueDifference = 1`  
Output: `[0,1]`  
*Explanation: |0-1| = 1 ≥ 0, |2-1| = 1 ≥ 1. So output [0,1] is valid.*

**Example 3:**  
Input: `nums = [1,2,3], indexDifference = 3, valueDifference = 2`  
Output: `[-1,-1]`  
*Explanation: The maximum |i-j| is 2 < 3, so no such pair exists. Output -1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  Try all pairs (i, j), check both index and value conditions. O(n²) time, as we need to check all 0 ≤ i, j < n.
- **Optimized approach:**  
  Since only the minimum or maximum in a sliding window matters for `valueDifference`, as we scan, keep track of the min and max value for earlier indices at least `indexDifference` apart.
  For each i starting from indexDifference, track lowest and highest nums in [0, i - indexDifference].  
  If nums[i] - min_so_far ≥ valueDifference or max_so_far - nums[i] ≥ valueDifference, return that pair.  
  This yields O(n) time and O(1) extra space.

### Corner cases to consider  
- Array of length 1 (no valid pair except when indexDifference = 0).
- indexDifference = 0 (i and j can be the same).
- valueDifference = 0 (any pair with the same value is valid).
- All nums are the same.
- Multiple pairs satisfy the condition.
- No valid pairs (should return [-1, -1]).

### Solution

```python
def findIndices(nums, indexDifference, valueDifference):
    # Initialize min and max indices for the sliding window
    min_idx = 0
    max_idx = 0
    n = len(nums)
    for i in range(indexDifference, n):
        j = i - indexDifference
        if nums[j] < nums[min_idx]:
            min_idx = j
        if nums[j] > nums[max_idx]:
            max_idx = j
        # Check if current nums[i] and min so far differ by valueDifference
        if abs(nums[i] - nums[min_idx]) >= valueDifference:
            return [min_idx, i]
        if abs(nums[i] - nums[max_idx]) >= valueDifference:
            return [max_idx, i]
    return [-1, -1]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)
    - We loop through the array once, updating min/max indices and checking the conditions per element.
- **Space Complexity:** O(1)
    - Only a few variables for indices and values are used; no extra memory grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to return **all** valid pairs instead of just one?  
  *Hint: Consider collecting results rather than returning early, and be efficient for large n.*

- How would the solution change if the input array is sorted?  
  *Hint: Sorted data may allow using two pointers or binary search for efficiency.*

- Can this approach work if asked for subarrays rather than pairs of indices?  
  *Hint: Think about sliding window and prefix/suffix extrema.*

### Summary
This is an instance of the **sliding window with tracking optimum (min/max)** pattern.  
The main insight is that—within the subarrays determined by indexDifference—we only need to check min and max values for the difference condition.  
This pattern is widely used in problems like "Best time to buy and sell stock", "Max/Min of all sliding windows", etc.  
The code efficiently reduces the brute-force O(n²) solution to a linear O(n) one using a greedy scan and constant tracking.


### Flashcard
For each index i ≥ indexDifference, check if nums[i] differs by at least valueDifference from min/max in nums[0…i-indexDifference]; scan with sliding window for O(n) time.

### Tags
Array(#array), Two Pointers(#two-pointers)

### Similar Problems
- Minimum Absolute Difference Between Elements With Constraint(minimum-absolute-difference-between-elements-with-constraint) (Medium)
- Find Indices With Index and Value Difference II(find-indices-with-index-and-value-difference-ii) (Medium)