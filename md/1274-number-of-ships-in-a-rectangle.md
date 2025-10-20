### Leetcode 1274 (Hard): Number of Ships in a Rectangle [Practice](https://leetcode.com/problems/number-of-ships-in-a-rectangle)

### Description  
You are given an API `Sea.hasShips(topRight, bottomLeft)` to check if at least one ship is located in the rectangle defined by corner coordinates (topRight, bottomLeft). Each ship occupies one unit cell, and ships are placed axis-aligned. You don't get direct access to ship locations; only through the API.

Write a function that, given the API and coordinates for a rectangle, returns the total number of ships in that region. Your function must minimize API calls (the API is expensive). Ships are not adjacent but might be close.

### Examples  
**Example 1:**  
Input: `topRight = [3, 3], bottomLeft = [0, 0]`  
Output: `1`  
*Explanation: One ship in region [(0,0),(3,3)], detected by recursive API calls.*

**Example 2:**  
Input: `topRight = [3, 3], bottomLeft = [2, 2]`  
Output: `0`  
*Explanation: Region does not contain any ship => zero output.*

**Example 3:**
Input: `topRight = [5, 5], bottomLeft = [0, 0]`  
Output: `2`  
*Explanation: Two ships detected in separate quadrants.*

### Thought Process (as if you’re the interviewee)  

I can’t check each unit individually—API calls must be minimized.
Idea: Use a divide-and-conquer strategy. For a rectangle, first check if any ships are in the region.
- If API returns False: return 0.
- If rectangle is a single cell and API is True: return 1.
- Otherwise, split rectangle into (up to) four parts and recurse on each quadrant.

This is a classic quad-tree partition. Each recursive call only continues if the current space contains a ship. This reduces API calls because large ship-free areas are pruned with one query.

### Corner cases to consider  
- topRight == bottomLeft (single cell)
- Non-square rectangles
- No ships in region
- All ships clustered tightly
- Rectangle outside grid bounds (if allowed)

### Solution

```python
def countShips(sea, topRight, bottomLeft):
    # If there are no ships: short circuit
    if not sea.hasShips(topRight, bottomLeft):
        return 0
    x1, y1 = bottomLeft
    x2, y2 = topRight
    # Single cell: must be a ship
    if x1 == x2 and y1 == y2:
        # Since hasShips is True
        return 1
    # Divide rectangle
    mid_x = (x1 + x2) // 2
    mid_y = (y1 + y2) // 2
    count = 0
    # Divide possibly into up to 4 rectangles (careful with overlap)
    # Bottom Left
    if x1 <= mid_x and y1 <= mid_y:
        count += countShips(sea, [mid_x, mid_y], [x1, y1])
    # Bottom Right
    if mid_x + 1 <= x2 and y1 <= mid_y:
        count += countShips(sea, [x2, mid_y], [mid_x + 1, y1])
    # Top Left
    if x1 <= mid_x and mid_y + 1 <= y2:
        count += countShips(sea, [mid_x, y2], [x1, mid_y + 1])
    # Top Right
    if mid_x + 1 <= x2 and mid_y + 1 <= y2:
        count += countShips(sea, [x2, y2], [mid_x + 1, mid_y + 1])
    return count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(S log(Area)), where S is the number of ships (since search prunes empty quadrants). In worst case (all quadrants have a ship), O(log(area)).
- **Space Complexity:** O(log(area)), for recursion stack.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you further reduce API calls if given extra constraints (e.g., ships never adjacent)?  
  *Hint: Optimize split and avoid redundant calls.*

- What if ships can be adjacent or overlap?  
  *Hint: Adjust API or revisit splitting logic.*

- What’s the worst-case input causing maximal API calls?  
  *Hint: Each quadrant always contains at least one ship (no pruning).* 

### Summary
This is a quad-tree divide-and-conquer search pattern, minimizing lookups in expensive or sparse search spaces. The approach is widely used in efficient range queries and spatial partitioning.


### Flashcard
Use divide-and-conquer (quad-tree): recursively split rectangle, only query API for regions that may contain ships, minimizing calls.

### Tags
Array(#array), Divide and Conquer(#divide-and-conquer), Interactive(#interactive)

### Similar Problems
