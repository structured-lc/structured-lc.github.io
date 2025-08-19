### Leetcode 3394 (Medium): Check if Grid can be Cut into Sections [Practice](https://leetcode.com/problems/check-if-grid-can-be-cut-into-sections)

### Description  
Given an n × n grid and a list of **non-overlapping rectangles** (with each rectangle represented by its bottom-left and top-right coordinates), determine if you can make **either two vertical** or **two horizontal cuts** (thus forming 3 sections either row-wise or column-wise).  
**Requirement:**  
- Each of the three sections must contain **at least one rectangle**.  
- Every rectangle must be **fully contained within exactly one section** (not split between sections or crossing a cut).

Think of this as: Is there a way to split the entire grid into three horizontal or three vertical bands so that each band contains at least one rectangle, and each rectangle is not split by a cut?

### Examples  

**Example 1:**  
Input: `n = 5, rectangles = [[1,0,5,2],[0,2,2,4],[3,2,5,3],[0,4,4,5]]`  
Output: `true`  
*Explanation:  
A pair of horizontal cuts at y = 2 and y = 4 divide the grid into bands [0,2), [2,4), [4,5). Each band contains at least one rectangle, and all rectangles are fully within a section.*

**Example 2:**  
Input: `n = 4, rectangles = [[0,0,2,2],[2,0,4,2],[0,2,2,4],[2,2,4,4]]`  
Output: `true`  
*Explanation:  
A pair of vertical cuts at x = 2 divides the grid into three sections [0,2), [2,2), [2,4). While it looks tight, it can be done since each band hosts a rectangle, with each rectangle in its own section.*

**Example 3:**  
Input: `n = 3, rectangles = [[0,0,3,1],[0,1,3,2],[0,2,3,3]]`  
Output: `false`  
*Explanation:  
All rectangles span the entire width horizontally, so any vertical cut will split some rectangle, and all rectangles overlapped vertically so any horizontal cut will not separate them into three sections.*

### Thought Process (as if you’re the interviewee)  
- **Brute-Force idea:** Try every possible pair of vertical cuts and every possible pair of horizontal cuts. For each, check if all rectangles are contained entirely in one section and every section gets at least one rectangle.
    - For each way to cut, assign each rectangle to a section if it fits, otherwise mark as invalid.  
    - This is O(N³) for all cut pairs, which is inefficient.

- **Optimized idea:**  
    - Since rectangles are non-overlapping, we can focus on their **bounding intervals** along x and y axes.
    - Group the rectangles based on which axis we cut:
        - For vertical cuts: Sort by their x-intervals.
        - For horizontal cuts: Sort by their y-intervals.
    - **Merge intervals**: For either x or y (say y for horizontal cuts), merge the y-intervals from all rectangles, then count how many merged intervals there are:
        - Each merged interval corresponds to a "block" that could occupy a section.
        - If after merging, we get **at least 3 non-overlapping intervals** (i.e., bands), we can make two cuts between them to separate into 3 sections.  
        - If not, repeat with the other axis (vertical).
    - Return true if either direction works.
    - Sorting and merging is O(N log N).

- **Why this works:**  
    - Rectangles can't overlap, so their projections (intervals) on an axis can be swept and merged.
    - Each "cluster" of merged intervals remains together after the correct cut.

### Corner cases to consider  
- Only 1 or 2 rectangles (cannot form 3 bands).
- Very large rectangles spanning almost the full range (cannot be isolated into a section).
- Rectangles all stacked in one region (unable to split into 3).
- Edge rectangles (touching the grid border).
- Non-overlapping but "touching" rectangles.
- All rectangles fit in a thin stripe; can't cut the other way.

### Solution

```python
def canBeCut(n, rectangles):
    # Try both horizontal and vertical directions
    def can_cut(axis_start, axis_end):
        # axis_start, axis_end: index in each rectangle for this axis (0=x, 1=y)
        intervals = []
        for rect in rectangles:
            intervals.append([rect[axis_start], rect[axis_end]])
        # Sort intervals by start
        intervals.sort()
        
        # Merge intervals and count how many non-overlapping groups exist
        merged = []
        for start, end in intervals:
            if not merged or start > merged[-1][1]:
                merged.append([start, end])
            else:
                merged[-1][1] = max(merged[-1][1], end)
        # If we have at least 3 merged clusters, we can cut
        return len(merged) >= 3
    
    # Check for vertical cuts (cuts along x), i.e., check x intervals
    can_vertical = can_cut(0, 2)
    # Check for horizontal cuts (cuts along y), i.e., check y intervals
    can_horizontal = can_cut(1, 3)
    
    return can_vertical or can_horizontal
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N), where N = number of rectangles.  
  - For each direction, we sort the intervals (O(N log N)), then merge (O(N)).
  - Max two directions (horizontal, vertical), so total is O(N log N).

- **Space Complexity:** O(N), for the interval list and merged intervals.

### Potential follow-up questions (as if you’re the interviewer)  

- What if rectangles **could overlap**?  
  *Hint: Need a more complex handling, possibly interval trees or sweep-line to check coverage and ensure no split.*

- Can you **return the actual cut positions** instead of just whether a cut is possible?  
  *Hint: Keep track of merged intervals and choose cut points between them.*

- How would you handle **dynamic addition/removal of rectangles** and maintain the answer efficiently?  
  *Hint: Consider segment trees or dynamic interval merging.*

### Summary
This problem uses an **interval merging and line sweep pattern**, highly common in computational geometry and similar to problems like "merge intervals", "calendar booking", and "meeting rooms". By projecting rectangles onto one axis, merging intervals, and counting groups, we can check if disjoint sections can be made. This works efficiently thanks to sorting (O(N log N)), and is a key pattern for interviews involving intervals, segments, and geometric segmentation.

### Tags
Array(#array), Sorting(#sorting)

### Similar Problems
