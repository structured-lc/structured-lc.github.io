### Leetcode 2848 (Easy): Points That Intersect With Cars [Practice](https://leetcode.com/problems/points-that-intersect-with-cars)

### Description  
Given a list of cars, each represented by a pair of integers \([startᵢ, endᵢ]\), indicating that the iᵗʰ car covers all integer points from startᵢ to endᵢ inclusive on a number line, determine the **number of unique integer points** covered by at least one car.  
It's a typical problem of merging covered ranges and counting the distinct integer points in the union of all cars' coverages.

### Examples  

**Example 1:**  
Input: `nums = [[3,6],[1,5],[4,7]]`  
Output: `7`  
*Explanation: The cars cover the integer points 1,2,3,4,5,6,7.*

**Example 2:**  
Input: `nums = [[1,3],[5,8]]`  
Output: `7`  
*Explanation: The cars cover 1,2,3,5,6,7,8.*

**Example 3:**  
Input: `nums = [[5,5],[5,5]]`  
Output: `1`  
*Explanation: Two identical intervals still cover only the point 5.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  For every car, loop through all integer points from startᵢ to endᵢ, and mark them as covered (using a set or a boolean array of length 101, since 1 ≤ point ≤ 100 by constraints). Finally, count the unique covered points.
- **Optimal with a difference array**:  
  Since the range of points is small (1..100), we can use a difference-array approach:
  - For each interval [a, b]: increment at covered[a], decrement at covered[b+1].
  - Accumulate the array and count where the accumulated value is > 0 (meaning covered by at least one car).
- **Trade-offs**:  
  - Set-based solution: simple, a bit slower as insertion into sets can be more expensive per operation.
  - Boolean array / difference array: constant space and fast, since values are small.

Given the small input range, a boolean (or difference) array is both **simple and optimal** here.

### Corner cases to consider  
- Very small or very large ranges, e.g. car covers only one point or all possible points.
- Overlapping intervals (should not double-count).
- Multiple cars starting and ending at the same points.
- No cars at all (though per constraints, at least 1 car is always present).
- Gaps between car intervals.
- max range (e.g., [1,100]).

### Solution

```python
def numberOfPoints(nums):
    # Initialize a boolean array for points 0..100 (but indices 1..100 are used)
    covered = [False] * 101  # Only points 1 to 100 can be covered
    # Iterate over each car's interval
    for start, end in nums:
        # For each point in the range, mark as covered
        for i in range(start, end + 1):
            covered[i] = True
    # Count how many points are covered (True)
    return sum(covered)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × R),  
  where N = number of cars (≤100), and R = average interval size (≤100).  
  In the worst case, every interval could have size 100—still fast since both are bounded by constraints.
- **Space Complexity:** O(1),  
  The 'covered' array has a fixed size (101), independent of N.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ranges where points can go up to 1e9?  
  *Hint: Cannot use an array of size 1e9—consider interval merging and sweep-line techniques.*

- How to return the list of covered points, not just the count?  
  *Hint: Track indices during marking, return those with covered[i]=True.*

- What if you need to report the number of uncovered points from 1 to 100?  
  *Hint: 100 - number of covered points.*

### Summary  
The approach leverages a **boolean array to mark all covered points**, which is a common and efficient method for union-of-intervals queries when the range is small and bounded.  
This is an example of the interval coverage/counting pattern, also found in line sweep, difference array, and interval union problems. It's a good practice problem for optimizing range processing when domain constraints allow you to use direct array manipulation.