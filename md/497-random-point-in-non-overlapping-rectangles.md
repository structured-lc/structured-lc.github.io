### Leetcode 497 (Medium): Random Point in Non-overlapping Rectangles [Practice](https://leetcode.com/problems/random-point-in-non-overlapping-rectangles)

### Description  
Given a list of non-overlapping axis-aligned rectangles, each defined by `[x₁, y₁, x₂, y₂]`, design an algorithm to randomly and uniformly pick an integer lattice point from the union of all rectangles. Each integer point within or on the border of any rectangle must have equal probability of being chosen.  
Implement a `Solution` class with:
- `Solution(rects: List[List[int]])` — initializes with rectangles
- `pick()` — returns a random `[x, y]` point inside one of the rectangles

### Examples  

**Example 1:**  
Input: `rects = [[1,1,5,5]]`, call `pick()`  
Output: `[2,3]`  
*Explanation: The only rectangle covers integer points with x ∈ [1,5], y ∈ [1,5]. Any point in this area is picked uniformly at random.*

**Example 2:**  
Input: `rects = [[1,1,5,5], [6,6,8,8]]`, call `pick()`  
Output: `[7,7]` or `[3,4]`  
*Explanation: The first rectangle covers 25 points, the second covers 9 points. Points are picked such that each of the 34 total points has the same probability.*

**Example 3:**  
Input: `rects = [[0,0,0,0]]`, call `pick()`  
Output: `[0,0]`  
*Explanation: One rectangle, one point, always returns [0,0].*


### Thought Process (as if you’re the interviewee)  
Start with brute-force: If rectangles are small, generate all contained integer points, store in an array, and pick randomly per call. But with large rectangles, this uses too much space (could be millions of points).

Instead, we observe:
- Each rectangle’s area (number of integer points inside) = (x₂ - x₁ + 1) × (y₂ - y₁ + 1).
- To ensure uniform distribution, the probability of picking each rectangle should be proportional to its area.

Optimized steps:
1. Precompute the “area prefix sum” for each rectangle (i.e., cumulative number of points).
2. For each pick:
   - Pick a random integer k in [1, total points].
   - Use binary search on the prefix sums to find the rectangle that should contain the kᵗʰ point.
   - Within that rectangle, map k locally to the correct (x, y) pair.

This approach is efficient:
- Space is O(number of rectangles).
- Each pick is O(log n) for binary search, plus O(1) point calculation.

### Corner cases to consider  
- Rectangle with only one point: [a, b, a, b]
- Rectangles touching at edges/corners but not overlapping.
- Large rectangles that maximize the number of points.
- Multiple rectangles of different sizes.
- Only one rectangle in input.
- All rectangles are far apart.
- Points lying exactly on the borders.
- Querying pick() many times (performance).

### Solution

```python
import random

class Solution:
    def __init__(self, rects):
        # Precompute prefix sum of areas (number of points per rectangle)
        self.rects = rects
        self.areas = []
        area_sum = 0
        for rect in rects:
            x1, y1, x2, y2 = rect
            count = (x2 - x1 + 1) * (y2 - y1 + 1)
            area_sum += count
            self.areas.append(area_sum)  # cumulative sum

    def pick(self):
        # Pick a random integer: 1 ≤ k ≤ total number of points
        k = random.randint(1, self.areas[-1])
        # Binary search to find which rectangle k falls in
        low, high = 0, len(self.areas) - 1
        while low < high:
            mid = (low + high) // 2
            if self.areas[mid] < k:
                low = mid + 1
            else:
                high = mid
        rect = self.rects[low]
        x1, y1, x2, y2 = rect
        # Number of integer points in this rectangle
        width = x2 - x1 + 1
        # Find position in the rectangle: offset from previous area
        prev_area = self.areas[low - 1] if low > 0 else 0
        offset = k - prev_area - 1
        dx = offset % width
        dy = offset // width
        return [x1 + dx, y1 + dy]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) for constructor (precomputing areas), O(log n) per pick (binary search), O(1) for coordinate calculation.
  - n = number of rectangles
- **Space Complexity:** O(n), storing the rectangles and prefix sums.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle rectangles that *do* overlap?
  *Hint: Overlaps mean some points are in multiple rectangles — you’d need to deduplicate or preprocess the full point set.*

- How would you extend this to higher dimensions (cuboids)?
  *Hint: Use same area calculation logic but for volume; map k to multi-dimensional indices.*

- What if the rectangles can be added or removed dynamically?
  *Hint: Data structure for efficient insert/remove and dynamic prefix sum updates (e.g., segment tree, Fenwick Tree).*

### Summary
This solution uses the common technique of *prefix sums + binary search* to perform efficient weighted random selection. This pattern is widely useful, such as for: random sampling from discrete weighted distributions, random interval selection, and allocating probabilities proportionally to group sizes.


### Flashcard
Precompute area of each rectangle, build prefix sum; pick random integer in total area, binary search to find rectangle, then random point inside.

### Tags
Array(#array), Math(#math), Binary Search(#binary-search), Reservoir Sampling(#reservoir-sampling), Prefix Sum(#prefix-sum), Ordered Set(#ordered-set), Randomized(#randomized)

### Similar Problems
- Random Pick with Weight(random-pick-with-weight) (Medium)
- Generate Random Point in a Circle(generate-random-point-in-a-circle) (Medium)