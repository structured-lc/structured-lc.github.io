### Leetcode 2250 (Medium): Count Number of Rectangles Containing Each Point [Practice](https://leetcode.com/problems/count-number-of-rectangles-containing-each-point)

### Description  
Given a list of axis-aligned rectangles represented by `[length, height]` and a list of points `[x, y]`, return an array where the jᵗʰ element is **the number of rectangles that contain the jᵗʰ point**.  
A rectangle contains a point if `x ≤ length` and `y ≤ height`.  
Both rectangle coordinates and point coordinates are integers in `[1, 100]`.

### Examples  

**Example 1:**  
Input: `rectangles = [[1,2],[2,3],[2,5]], points = [[2,1],[1,4]]`  
Output: `[2,1]`  
*Explanation:  
- For point (2,1): Both rectangles [2,3] and [2,5] contain it ((2≤2 and 1≤3),(2≤2 and 1≤5)).  
- For point (1,4): Only [2,5] contains it (1≤2 and 4≤5).*

**Example 2:**  
Input: `rectangles = [[1,1]], points = [[1,1],[0,0]]`  
Output: `[1,0]`  
*Explanation:  
- For (1,1): It lies exactly at bottom left of rectangle.  
- For (0,0): No rectangle contains it (since all rectangles start at (1,1)).*

**Example 3:**  
Input: `rectangles=[[2,3],[3,7],[4,3],[3,7],[4,4]], points=[[1,3],[3,7],[3,4]]`  
Output: `[5,2,3]`  
*Explanation:  
- (1,3): All rectangles have height≥3, and length≥1. So all 5 contain it.  
- (3,7): Only [3,7] and another [3,7] contain (3,7).  
- (3,4): [4,3] is out, rest: [2,3], [4,4], [3,7], [3,7] ⇒ 3 rectangles.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**   
  - For each point, check every rectangle:  
    - If point’s x ≤ rectangle length, and point’s y ≤ rectangle height, count it.
    - Results in O(num_points × num_rectangles) time.
- **Can we optimize?**
  - Since both length and height are small (≤ 100), group rectangles by their height.
  - For each possible height h (1 to 100), collect all rectangle lengths where height=h, and sort these lengths.
  - For a point [x, y], consider only heights ≥ y. For each h ≥ y, count in sorted list how many lengths ≥ x (can use binary search).
  - This speeds up queries by using pre-grouping and binary search, resulting in much faster approach especially when rectangles are many.
- **Why does this work?**  
  - Since there are at most 100 possible heights, iterating over heights for a point is acceptable.
  - Sorting preprocessing improves query time by allowing binary search per height.
- **Trade-offs:**  
  - A bit more space (storing the arrays grouped by height), but gets O(num_points × 100 × log k) query time (k = rectangles of a given height).
  - Brute force is too slow for large inputs.

### Corner cases to consider  
- rectangles or points array is empty
- rectangles with the same coordinates
- points with x or y out of rectangle bounds (e.g., point = [0,0])
- all rectangles share the same height, but points have various heights
- points outside all rectangles
- rectangles have height or width 1
- rectangles/points at the boundaries: 1 or 100

### Solution

```python
def countRectangles(rectangles, points):
    # Step 1: Group rectangles by their heights
    height_dict = [[] for _ in range(101)]  # height in 1..100
    for l, h in rectangles:
        height_dict[h].append(l)
    
    # Step 2: Sort the length lists for each height to enable binary search
    for i in range(1, 101):
        height_dict[i].sort()
    
    ans = []
    for x, y in points:
        cnt = 0
        # For all rectangle heights ≥ y
        for h in range(y, 101):
            arr = height_dict[h]
            # Binary search: find leftmost index where length ≥ x
            left, right = 0, len(arr)
            while left < right:
                mid = (left + right) // 2
                if arr[mid] >= x:
                    right = mid
                else:
                    left = mid + 1
            # All lengths from 'left' to end are ≥ x
            cnt += len(arr) - left
        ans.append(cnt)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing: O(n log n), where n = number of rectangles, for sorting each height group  
  - Each query: For each point, loop over at most 100 possible heights and do a binary search for length → O(100 × log k) per point (k = rectangles for that height)  
  - Total: O(n log n + m × 100 × log n), where m = points.length  
- **Space Complexity:**  
  - O(n) for storing grouped rectangle lengths by height, plus O(m) for answer

### Potential follow-up questions (as if you’re the interviewer)  

- What if rectangle or point coordinates could be up to 109?  
  *Hint: Coordinate compression, or use different data structure like segment tree or a 2D BIT.*

- Can you return the total sum for all points instead of individual answers?  
  *Hint: Just sum up the answer array at the end.*

- Can you do it in less than O(m × 100 × log n) per test case?  
  *Hint: Sort points and rectangles, process offline or use advanced 2D data structure for faster queries.*

### Summary
This problem uses **bucketing/grouping** (by rectangle height) and **binary search** for efficient queries—a pattern useful for range-counting with integer-bounded constraints. Similar approaches apply to geometric counting (e.g., grid search, prefix sums in 2D, sweep-line with ranges). Efficient preprocessing and per-group searching make brute force unnecessary, highlighting **bucket + search** as a key coding pattern.


### Flashcard
Group rectangles by height, sort lengths for each height, and for each point, count rectangles with height ≥ y and length ≥ x using binary search for O(100 × log n) per point.

### Tags
Array(#array), Hash Table(#hash-table), Binary Search(#binary-search), Binary Indexed Tree(#binary-indexed-tree), Sorting(#sorting)

### Similar Problems
- Queries on Number of Points Inside a Circle(queries-on-number-of-points-inside-a-circle) (Medium)