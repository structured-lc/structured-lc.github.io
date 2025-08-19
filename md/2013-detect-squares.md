### Leetcode 2013 (Medium): Detect Squares [Practice](https://leetcode.com/problems/detect-squares)

### Description  
You are given a stream of points on the X-Y Cartesian plane. Implement a data structure that allows you to:
- Add a new point at given coordinates, possibly the same as a previous point (duplicates are allowed and each is counted).
- Given a query point, count how many axis-aligned squares can be formed using that point as one of the corners, and all other points from previously added points. Only squares with sides parallel to the axes count. For squares, repeated points are allowed as separate corners if they have been added multiple times.

### Examples  

**Example 1:**  
Input:  
`["DetectSquares","add","add","add","count","count","add","count"], [[],[3,10],[11,2],[3,2],[11,10],[14,8],[11,2],[11,10]]`  
Output:  
`[null,null,null,null,1,0,null,2]`  
Explanation:  
- After adding [3,10], [11,2], [3,2]:
- count([11,10]) outputs 1 (square: [11,10], [3,10], [11,2], [3,2])
- count([14,8]) outputs 0 (no square possible)
- add([11,2]) again, so now two points at [11,2]
- count([11,10]) outputs 2 (square can be formed 2 times because of duplicate [11,2])

**Example 2:**  
Input:  
`["DetectSquares","add","add","count"], [[],[0,0],[1,1],[0,1]]`  
Output:  
`[null,null,null,0]`  
Explanation:  
No possible axis-aligned square can be formed with corners at these locations.

**Example 3:**  
Input:  
`["DetectSquares","add","add","add","add","count"], [[],[1,1],[1,2],[2,1],[2,2],[1,1]]`  
Output:  
`[null,null,null,null,null,2]`  
Explanation:  
Adding [1,1], [1,2], [2,1], [2,2]:
- count([1,1]): two squares possible by using duplicate [1,1] as different square corners.

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each count query, iterate over all triplets checking if they can form a square with the query point. This would be O(N³) per query and extremely inefficient as N grows.
- **Optimized approach:**  
  - **Key observation:** For a potential square with one vertex (the query point), the other three must have matching x/y distances, and sides must be parallel to X/Y axes.
  - For a given query [x, y], iterate over all previously added points [x2, y2]. If |x - x2| == |y - y2| and both x ≠ x2 and y ≠ y2, [x2, y] and [x, y2] may form valid square corners.
  - For each such [x2, y2], check how many times [x2, y] and [x, y2] have appeared; multiply their counts to get square contributions.
  - Store points and their occurrence counts for O(1) access.
  - For each count, loop over all distinct x or y coordinates per query, making it O(K) per query, where K ≤ number of unique points.

  This approach significantly reduces work while ensuring duplicates contribute correct multiplicities.

### Corner cases to consider  
- Points added multiple times at the same location (allow and count all, as each occurrence acts independently)
- Points only in a line or column (can't form squares)
- Query for a point not present among added points (should still work)
- Large coordinate values (check for performance)
- No points added yet (count returns 0)
- Points not axis-aligned (ignore, only axis-aligned squares)

### Solution

```python
class DetectSquares:
    def __init__(self):
        # stores counts of each point: (x, y) -> count
        self.pointCount = {}
        # stores mapping from y-coordinate to all x's at that y, for faster lookup
        self.yMap = {}

    def add(self, point):
        x, y = point
        # Increment count at (x, y)
        self.pointCount[(x, y)] = self.pointCount.get((x, y), 0) + 1
        if y not in self.yMap:
            self.yMap[y] = set()
        self.yMap[y].add(x)

    def count(self, point):
        x, y = point
        total = 0
        # Only consider y's sharing this y coordinate
        if y in self.yMap:
            # For every possible square side (dx), check to left and right
            for nx in self.yMap[y]:
                if nx == x:
                    continue  # can't use the same location; needs area
                # length of square side
                d = abs(nx - x)
                # Check two possible squares: one "above", one "below"
                for ny in [y + d, y - d]:
                    count1 = self.pointCount.get((nx, y), 0)
                    count2 = self.pointCount.get((x, ny), 0)
                    count3 = self.pointCount.get((nx, ny), 0)
                    # Multiply the number of times each of these points has appeared
                    total += count1 * count2 * count3
        return total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `add`: O(1) per call.  
  - `count`: O(M) per call, where M is the number of distinct x values for the given y (typically much less than total points), since we only scan possible nx for the query y. Each check is constant, so this is efficient.
- **Space Complexity:**  
  - O(N), where N is the number of added points (including duplicates), since we store every point and its count.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you only ever had count queries and never add, or vice versa?  
  *Hint: Preprocessing or different data structures may optimize one operation.*

- How would your structure change if you also needed to detect rectangles, not just squares?  
  *Hint: Rectangle conditions are less strict; what’s the generalized version?*

- Can you support delete(point) efficiently if allowed?  
  *Hint: Think about decrementing counts and cleaning up, and whether your dictionary-based approach needs adjustment.*

### Summary
This problem uses a **data-stream + hashmap counting pattern**. The core is efficiently tracking how many times each coordinate appears and recognizing patterns (squares) based on geometric relationships. This is a fundamental "design a data structure" question, often useful for spatial and geometric query problems. The approach generalizes to similar problems like detecting rectangles or other axis-aligned shapes, and counting with duplicated points is a common pitfall seen in interviews that this pattern solves cleanly.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design), Counting(#counting)

### Similar Problems
