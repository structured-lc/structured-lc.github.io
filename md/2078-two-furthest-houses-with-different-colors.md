### Leetcode 2078 (Easy): Two Furthest Houses With Different Colors [Practice](https://leetcode.com/problems/two-furthest-houses-with-different-colors)

### Description  
Given a row of houses, each painted with a color (colors may repeat), return the largest possible distance between two houses with different colors. The distance is the absolute difference between their indices.  
In other words:  
- You're given an array `colors` where `colors[i]` is the color of the iᵗʰ house.
- Two indices i and j (0 ≤ i < j < n) are valid if `colors[i] ≠ colors[j]`.
- Find the maximal value of |i - j| for such a pair.

### Examples  

**Example 1:**  
Input: `colors = [1,1,1,6,1,1,1]`,  
Output: `3`  
*Explanation: The house at index 0 (color 1) and house at index 3 (color 6) are furthest apart among houses with different colors. Distance = 3.*

**Example 2:**  
Input: `colors = [1,8,3,8,3]`,  
Output: `4`  
*Explanation: The house at index 0 (color 1) and house at index 4 (color 3) are furthest apart with different colors. Distance = 4. Any valid i=0, j=4 pair works.*

**Example 3:**  
Input: `colors = [0,1]`,  
Output: `1`  
*Explanation: House 0 has color 0, house 1 has color 1; both different, distance = 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For every pair (i, j) with i < j, check if colors[i] ≠ colors[j], and track the maximal |i - j|. This is O(n²), which is slow for large n.
- **Optimization:** Since the largest distance is between houses at the two ends, focus on:  
  - The first house and the furthest house from it with a different color.
  - The last house and the furthest house from it with a different color.
- **Why?** Because the ends are farthest apart. If either end has a different-color house elsewhere, that's our max distance.
- **Approach:**  
  - Scan from the beginning to find the farthest right house with a color different from the first house.
  - Scan from the end to find the farthest left house with a color different from the last house.
  - Take the maximum of these two distances.
- **Trade-Off:** This approach is O(n), much faster than brute-force.

### Corner cases to consider  
- All elements are the same: e.g., [2,2,2,2] → No distance possible, expect 0 (but per description, at least one pair exists).
- Different colors only at the ends: e.g., [1,1,1,1,2]
- colors of length 2: e.g., [1,2]
- Multiple maximum pairs: e.g., [1,2,1,2,1]
- Large inputs with only two different colors, one at an end.

### Solution

```python
def maxDistance(colors):
    n = len(colors)
    # Compute distance to first different color from the left edge
    dist_from_start = 0
    for i in range(n-1, -1, -1):
        if colors[i] != colors[0]:
            dist_from_start = i  # index difference from 0
            break

    # Compute distance to first different color from the right edge
    dist_from_end = 0
    for i in range(n):
        if colors[i] != colors[-1]:
            dist_from_end = n - 1 - i  # index difference from n-1
            break

    return max(dist_from_start, dist_from_end)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n).  
  We iterate through the array at most twice (once from each end), for a total of ~2n operations.
- **Space Complexity:** O(1).  
  Only constant extra storage is used for variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you needed the exact indices, not just the distance?  
  *Hint: Save i and j when you encounter maximum distance.*

- Suppose colors can be modified (e.g., you can repaint a house); how would you keep track dynamically?  
  *Hint: Need data structure supporting fast updates and queries—maybe segment tree.*

- How would you change the solution to find the two closest houses with different colors?  
  *Hint: Search for the first occurrence of colors[i] ≠ colors[i+1].*

### Summary
This problem is a classic **two-pointer/edge scan** technique, optimized to O(n) by leveraging the property that maximal distances in a linear array always involve the ends. Recognizing this pattern allows avoiding brute-force O(n²) checks and is commonly used in interview problems involving ranges or subsequence boundaries. This strategy applies in problems like "find max/min subarrays with constraints," or "largest gap under a property" in a 1D array.


### Flashcard
The answer is max(|i-j|) where colors[i] ≠ colors[j]; check both ends for the furthest house with a different color.

### Tags
Array(#array), Greedy(#greedy)

### Similar Problems
- Replace Elements with Greatest Element on Right Side(replace-elements-with-greatest-element-on-right-side) (Easy)
- Maximum Distance Between a Pair of Values(maximum-distance-between-a-pair-of-values) (Medium)
- Maximum Difference Between Increasing Elements(maximum-difference-between-increasing-elements) (Easy)