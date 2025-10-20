### Leetcode 2345 (Medium): Finding the Number of Visible Mountains [Practice](https://leetcode.com/problems/finding-the-number-of-visible-mountains)

### Description  
Given a list of mountains, each defined by its peak coordinates (x, y), treat each mountain as a right-angled isosceles triangle sitting on the x-axis, with its right angle at (x, y). A mountain is **visible** if its peak does *not* lie inside or on the border of any other mountain (i.e., no other mountain completely covers it).  
Return the number of visible mountains.

### Examples  

**Example 1:**  
Input: `peaks = [[2,2],[6,3],[5,4]]`  
Output: `2`  
*Explanation:  
- Mountain 0: peak (2,2) → interval [0,4]  
- Mountain 1: peak (6,3) → interval [3,9]  
- Mountain 2: peak (5,4) → interval [1,9]  
Mountain 1 is covered by Mountain 2. Mountain 0 and Mountain 2 are visible.*

**Example 2:**  
Input: `peaks = [[1,3],[1,3]]`  
Output: `0`  
*Explanation:  
Both mountains have the same position and size, so they perfectly cover each other.  
No visible mountain.*

**Example 3:**  
Input: `peaks = [[0,1],[2,1],[1,2]]`  
Output: `1`  
*Explanation:  
- Mountain 0: interval [-1,1]
- Mountain 1: interval [1,3]
- Mountain 2: interval [-1,3]
Mountains 0 and 1 are covered by Mountain 2. Only Mountain 2 is visible.*

### Thought Process (as if you’re the interviewee)  
Brute force:  
- For each mountain, check if its peak lies inside another mountain’s triangle.  
- That requires for each mountain i, looping through every other mountain j, and for each, checking if xᵢ and yᵢ satisfy the triangle bounds for j.  
- This would be O(n²) and is likely too slow for large n.

Key insight for optimization:  
- Each mountain can be represented by its interval on the x-axis: [x - y, x + y].
- A mountain is covered if its interval is **strictly contained** in any other mountain's interval (or coincident and not unique tallest).
- So, sort all mountains by interval start, and if tie, by decreasing interval end and then by decreasing height.  
- Then, process from left to right, keeping track of the maximum right end seen so far; if a mountain's right end is ≤ max seen, it's covered.

Final approach:  
- Convert each peak to an interval [x - y, x + y], keep original (x, y) to verify uniqueness if intervals coincide.
- Sort by left, then by -right, then by -height to handle duplicates properly.
- Traverse and count only those whose right end is larger than max right seen so far.

Trade-offs:  
- This is O(n log n) due to sorting, efficient for large n.
- Handles duplicates robustly.

### Corner cases to consider  
- Multiple identical peaks (same x and y).
- Some mountains completely covering others.
- Mountains with non-overlapping intervals (all visible).
- Only one mountain (always visible).
- Empty input (should be 0).
- Mountains with the same left and right but differing heights.

### Solution

```python
def visibleMountains(peaks):
    # Convert each peak to its mountain's interval on the x-axis:
    # [x - y, x + y], also keep track of (x, y) for duplicates
    intervals = []
    for x, y in peaks:
        intervals.append((x - y, x + y, x, y))
    
    # Sort by left, then by -right, then by -y (so for tie-breakers the biggest covers)
    intervals.sort(key=lambda t: (t[0], -t[1], -t[3]))
    
    visible = 0
    n = len(intervals)
    max_right = float('-inf')
    last = None  # To handle identical intervals
    
    for left, right, x, y in intervals:
        # If it's strictly larger than max_right seen before, it's visible
        if right > max_right:
            # If previous mountain has identical interval and peak, skip counting it again
            if last is not None and left == last[0] and right == last[1] and x == last[2] and y == last[3]:
                continue
            visible += 1
            max_right = right
            last = (left, right, x, y)
        else:
            # Covered by a previous mountain
            continue
            
    return visible
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), for sorting the n intervals.  
- **Space Complexity:** O(n), to store the intervals and auxiliary variables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if mountains were not all isosceles or had variable slopes?  
  *Hint: How would you generalize the interval calculation for non-uniform slopes?*

- How would you return the indices of visible mountains instead of just the count?  
  *Hint: Track indices during sorting, and collect their indices when counting visibility.*

- If mountains could overlap partially but not completely, could you still determine which are visible?  
  *Hint: What adjustment to interval logic or geometric containment test is necessary?*

### Summary
This problem uses a classic **interval covering** pattern by transforming each mountain into a 1D interval and sorting/merging to efficiently detect containment. The approach is efficient and similar to various problems involving interval nesting, coverage, or "skyline" algorithms. It is commonly applicable to overlapping rectangles, meeting intervals, and sweep-line algorithms.


### Flashcard
Represent each mountain as [x-y, x+y]; sort by left, then right descending; count mountains whose interval is not strictly contained by any previous.

### Tags
Array(#array), Stack(#stack), Sorting(#sorting), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Buildings With an Ocean View(buildings-with-an-ocean-view) (Medium)