### Leetcode 1637 (Easy): Widest Vertical Area Between Two Points Containing No Points [Practice](https://leetcode.com/problems/widest-vertical-area-between-two-points-containing-no-points)

### Description  
Given `points`, a list of points in the 2D plane (`points[i] = [xᵢ, yᵢ]`), find the **widest vertical area** between two points where **no other points are present** inside the area. A vertical area is a region between two parallel lines `x = a` and `x = b` (a < b), with no points whose x-coordinate is strictly between a and b. Output the width of the widest such area.

### Examples  
**Example 1:**  
Input: `points = [[8,7],[9,9],[7,4],[9,7]]`  
Output: `1`  
*Explanation: Sorted x-coordinates: 7, 8, 9. Largest gap: max(8-7, 9-8) = 1.*

**Example 2:**  
Input: `points = [[3,1],[9,0],[1,0],[1,4],[5,3],[8,8]]`  
Output: `3`  
*Explanation: Sorted x-coordinates: 1, 3, 5, 8, 9. Gaps: 3-1=2, 5-3=2, 8-5=3, 9-8=1. Widest gap is 3 (between 5 and 8).*  

### Thought Process (as if you’re the interviewee)  
We only care about the x-coordinates because vertical area depends only on x (ignoring y). Extract all x-values, sort, and compute the difference between consecutive values pairwise. The maximum difference is the answer.

Brute-force would try all pairs but is unnecessary and inefficient. Sorting reduces it to O(n log n) complexity.

### Corner cases to consider  
- Only two points
- All x-values are the same (gap = 0)
- Points already sorted
- Negative x-values
- All y-values are the same

### Solution

```python
def maxWidthOfVerticalArea(points):
    # Extract x-coordinates
    xs = [p[0] for p in points]
    xs.sort()
    # max gap between consecutive x-coords
    return max(xs[i+1] - xs[i] for i in range(len(xs)-1))
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n log n) for sorting n x-coordinates.
- **Space Complexity:** O(n) for storing x-coordinates array.

### Potential follow-up questions (as if you’re the interviewer)  
- Can you solve it in O(n) time?
  *Hint: Consider if counting sort is possible with a limited range of x.*

- What if the points are arriving in a stream?
  *Hint: Maintain heap of min/max, and perhaps buckets for running max gap.*

- Can you generalize to widest horizontal area?
  *Hint: Same logic applies using y-coordinates instead.*

### Summary
This is a classic application of sort-and-check-differences pattern, often seen in array gap or merge interval problems. Recognizing the problem boils down to one dimension, not two, is key here.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
- Maximum Gap(maximum-gap) (Medium)
- Maximum Consecutive Floors Without Special Floors(maximum-consecutive-floors-without-special-floors) (Medium)