### Leetcode 1893 (Easy): Check if All the Integers in a Range Are Covered [Practice](https://leetcode.com/problems/check-if-all-the-integers-in-a-range-are-covered)

### Description  
You are given a list of integer intervals and two numbers, left and right. Each interval represents a range covering every integer from start to end, inclusive. Determine if **every integer** between left and right (inclusive) is covered by _at least one_ of the given intervals.  
For example, if left = 2, right = 5, and the intervals are [[1,2],[3,4],[4,5]], we must check that all of 2, 3, 4, and 5 are contained in at least one given interval.

### Examples  

**Example 1:**  
Input: `ranges = [[1,2],[3,4],[5,6]], left = 2, right = 5`  
Output: `false`  
*Explanation: 2 is covered by [1,2], 3 and 4 by [3,4], but 5 is covered by [5,6].  However, every integer in [2,5] is covered, so output is true.*

**Example 2:**  
Input: `ranges = [[1,10],[10,20]], left = 21, right = 21`  
Output: `false`  
*Explanation: 21 is not covered by any interval.*

**Example 3:**  
Input: `ranges = [[1,10],[10,20]], left = 10, right = 15`  
Output: `true`  
*Explanation: All integers 10 to 15 are covered by [10,20].*

### Thought Process (as if you’re the interviewee)  
A brute-force approach would be to check each integer in the range [left, right], and for each, iterate through all intervals, checking if the number is within any interval. This would take O(n×k) time where n is the number of intervals and k is right - left + 1.

To optimize, considering the domain is small (numbers range from 1 to 50), we can use a fixed-size array (like a difference array or boolean covered array of size 52) to mark which numbers are covered by at least one interval. Then, a single pass to check that every integer from left to right is covered.

The **difference array** (line sweep) trick is especially useful:
- For each interval [l, r], increment at l and decrement at r+1.
- After processing, the prefix sum for each i tells whether i is covered.
- This makes checking for coverage from left to right more efficient, taking O(n + k) time.

Optimized solution is preferred due to efficiency and clean code, especially since constraints allow fixed-length arrays.

### Corner cases to consider  
- Ranges outside [left, right], e.g., all intervals too low/high.
- Intervals overlapping each other.
- left == right (single number to check).
- Empty ranges array.
- Intervals cover only part of [left, right].
- Ranges that cover more numbers than needed (should still return true if left..right is fully covered).
- Multiple intervals covering the same number.

### Solution

```python
def isCovered(ranges, left, right):
    # A. Create an array to track coverage for numbers 1 to 50 (inclusive)
    diff = [0] * 52  # 51 to handle ranges to 50 (problem constraint)

    # B. Mark each interval with a difference array
    for start, end in ranges:
        diff[start] += 1
        diff[end + 1] -= 1

    # C. Prefix sum to calculate actual coverage at each point
    coverage = 0
    for i in range(1, 51):  # Only numbers in 1..50 need to be checked
        coverage += diff[i]
        # D. If i is within [left, right], check that it is covered
        if left <= i <= right:
            if coverage <= 0:
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + k), where n = number of intervals, k = right - left + 1.
  - O(n) for processing all ranges and O(k) for checking coverage in [left, right].
  - The domain is fixed (≤ 50), so this is extremely efficient.
- **Space Complexity:** O(1) (constant), since we only ever use an array of size 52 regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the allowed integer range (1 to 50) grows very large (say up to 10⁹)?
  *Hint: How would you handle such large domains? Could you use event points and process intervals more efficiently?*

- Can you optimize further if the number of ranges is very large but left..right is small?
  *Hint: Could you sort ranges? How does overlap impact efficiency?*

- How would you modify the code to return the first uncovered integer, if any?
  *Hint: Instead of returning just True/False, scan and return i if coverage fails.*

### Summary
This problem demonstrates the "range coverage" pattern and is a classic application of the line sweep/difference array technique when the domain of possible numbers is small. The pattern is commonly used for range addition and prefix sum problems. Variations appear in calendar booking, event scheduling, or array modification with multiple overlapping ranges.