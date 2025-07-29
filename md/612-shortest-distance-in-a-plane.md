### Leetcode 612 (Medium): Shortest Distance in a Plane [Practice](https://leetcode.com/problems/shortest-distance-in-a-plane)

### Description  
Given a set of unique points with x and y coordinates on a 2D plane, you are asked to determine the shortest straight-line (Euclidean) distance between any two different points. The output should be the minimum distance, rounded to two decimal places.  
Think of having a table (point_2d) where each row represents a point (x, y); the task is to efficiently find and report the distance between the pair of points that are closest together.

### Examples  

**Example 1:**  
Input:  
```
| x  | y  |
|----|----|
| -1 | -1 |
|  0 |  0 |
| -1 | -2 |
```
Output:  
```
| shortest |
|----------|
|   1.00   |
```
*Explanation: The distance between (-1, -1) and (-1, -2) is 1. The other distances are greater.*

**Example 2:**  
Input:  
```
| x  | y  |
|----|----|
|  1 |  1 |
|  4 |  5 |
|  2 |  2 |
|  3 |  3 |
```
Output:  
```
| shortest |
|----------|
|  1.41    |
```
*Explanation: The closest points are (2,2) and (3,3). Distance = sqrt((3-2)² + (3-2)²) = sqrt(2) ≈ 1.41.*

**Example 3:**  
Input:  
```
| x | y |
|---|---|
| 0 | 0 |
| 1 | 1 |
| 0 | 3 |
| 7 | 7 |
```
Output:  
```
| shortest |
|----------|
|   1.41   |
```
*Explanation: The closest points are (0,0) and (1,1). Distance = sqrt((1-0)² + (1-0)²) = sqrt(2) ≈ 1.41.*

### Thought Process (as if you’re the interviewee)  
My first idea would be to take every possible pair of points and compute their Euclidean distance, then keep track of the minimum among all of them.

- For each point, compare it with every other point, to compute the distance:  
  distance = sqrt((x₂ - x₁)² + (y₂ - y₁)²).
- Since each pair is checked exactly once, this is a classic brute-force O(n²) comparison.

If I needed to optimize for larger datasets, I might discuss spatial partitioning (like k-d trees or sweep lines), which can solve the problem in O(n log n), but given the context (and SQL flavor), brute force is expected.

I’ll choose the brute force due to its simplicity and the nature of SQL, with a self-join to generate all pairs.

### Corner cases to consider  
- Fewer than 2 points (invalid, since the problem states there are more than two).
- All points are collinear.
- Multiple pairs have the same minimal distance.
- Points with negative coordinates.
- Very large or very small coordinate values needing precision.
- Output must always be rounded to 2 decimal digits.

### Solution

```python
import math

def shortest_distance(points):
    # points: list of tuples [(x1, y1), (x2, y2), ...]
    min_dist = float('inf')
    n = len(points)
    # Iterate all unique pairs
    for i in range(n):
        x1, y1 = points[i]
        for j in range(i + 1, n):
            x2, y2 = points[j]
            # Euclidean distance
            dist = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
            if dist < min_dist:
                min_dist = dist
    # Round to 2 decimals
    return round(min_dist + 1e-8, 2)  # +1e-8 avoids floating error on cases ending in .005
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²).  
  Every point is compared to every other via nested loops (there are ⌊n/2⌋ × n pairs).

- **Space Complexity:** O(1) extra.  
  Only variables for tracking min distance. Input size dominates space usage; no extra DS.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your answer change if the number of points was in the millions?  
  *Hint: Try to use a sweep line or divide & conquer trick; discuss spatial data structures like k-d trees.*

- If points can repeat (are not unique), how does your query or logic change?  
  *Hint: Need to explicitly exclude pairs where both indices are the same.*

- Could you also return which points achieve that shortest distance?  
  *Hint: Store indices or coordinates of a pair when you find/update the min.*

### Summary
This is a classic closest pair of points in 2D plane problem, typically solved with brute-force in O(n²) for small or moderate inputs, using a double loop and simple Euclidean calculation. The same pattern occurs in clustering, geometry, spatial queries, and proximity detection tasks, and is foundational for advanced computational geometry techniques.