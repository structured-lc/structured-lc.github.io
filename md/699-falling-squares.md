### Leetcode 699 (Hard): Falling Squares [Practice](https://leetcode.com/problems/falling-squares)

### Description  
You are given a series of squares, each defined by a left position and size, that are dropped sequentially onto the X-axis of a 2D plane. Each square falls straight down and stops when it reaches the ground or lands atop another square (if it overlaps horizontally). For every square you drop, you must return the running maximum height of all stacks after that drop. The challenge lies in handling overlapping intervals efficiently and maintaining the max height as the state changes.  

### Examples  

**Example 1:**  
Input: `[[1, 2], [2, 3], [6, 1]]`  
Output: `[2, 5, 5]`  
Explanation:  
- Drop [1,2]: falls to ground; stack at [1,3) is height 2 ⇒ max 2.  
- Drop [2,3]: overlaps previous (between 2 and 3), so lands at height 2 on top of that, final top is height 5 (2 + 3) ⇒ max becomes 5.  
- Drop [6,1]: does not overlap others; falls to ground, so height 1, but max remains 5.

**Example 2:**  
Input: `[[0, 1], [1, 1], [2, 1], [3, 1]]`  
Output: `[1, 2, 3, 4]`  
Explanation:  
- First square at [0,1): height 1.  
- Second at [1,2): doesn't overlap, new height 1, max stays 1 (after cumulative drops, stacks can overlap at boundaries so all add up one over the other). Actually, if contiguous, each new lands on top.  
- Each subsequent square lands directly on top, increasing max height by 1 each time.

**Example 3:**  
Input: `[[100,100],[200,100]]`  
Output: `[100,100]`  
Explanation:  
- Both squares are far apart; neither overlaps. Both stacks reach height 100 independently.

### Thought Process (as if you’re the interviewee)  

First, the brute-force approach is to track all the ranges of placed squares and, for every new square, check all previously dropped squares for overlap. We find the max height among overlapping intervals, then stack the new square atop it, update the interval, and update the running max.

However, this naive approach is O(n²); for each new square, you may need to scan all previously placed squares.

To optimize:
- Since we care about interval overlaps and max heights in certain ranges, a data structure supporting interval insert/update and range maximum queries is helpful.
- Two common solutions:
  - Use a segment tree (good for static or limited size inputs after compressing coordinates, since input ranges can be very large).
  - Use a map (dict) and manually manage all active intervals, merging or updating as needed.
  
The segment tree with coordinate compression is the most scalable and efficient. We compress all positions that are endpoints of any interval, map them to compact indices, and build/update/query the segment tree as squares are dropped. This gives log(n) time per drop.

### Corner cases to consider  
- Large coordinate ranges requiring compression (positions can be up to 10⁸ or higher)
- Multiple squares dropped at the same place with same/different size
- Completely non-overlapping squares
- All squares fall within one position interval (fully overlapping)
- Only one square dropped (minimum input)
- Input array empty (should return empty output)

### Solution

```python
def fallingSquares(positions):
    # Step 1: Collect all unique coordinates (both left and right ends)
    coords = set()
    for pos, size in positions:
        coords.add(pos)
        coords.add(pos + size)
    # Coordinate compression
    sorted_coords = sorted(coords)
    coord_map = {x: i for i, x in enumerate(sorted_coords)}  # from real x to compressed index

    N = len(sorted_coords)
    heights = [0] * (N + 2)  # heights for compressed intervals

    res = []
    curr_max = 0

    for left, size in positions:
        l = coord_map[left]
        r = coord_map[left + size]
        # Find max height in covered range
        h = max(heights[l:r])
        # Place new square on top
        new_h = h + size
        for i in range(l, r):
            heights[i] = new_h  # Update all covered indices
        curr_max = max(curr_max, new_h)
        res.append(curr_max)
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in worst case for this simplified solution, as for each square, the updates are O(w), where w is the width of the compressed interval. But since compression makes the coordinate set much smaller than raw positions, it's often very fast in practice. With a segment tree, per operation can become O(log n), yielding O(n log n) overall.
- **Space Complexity:** O(n) where n is the number of unique interval endpoints (as that's the size of the compressed coordinate map and the heights array).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support dynamic queries, allowing heights to be queried in the middle of the process, or with real-time insertions and removals?  
  *Hint: Requires a tree or map-based data structure supporting both updates and queries efficiently, like segment tree or balanced BST.*

- What happens if very large squares are dropped (ranges up to 10⁹)?  
  *Hint: Discuss the need for coordinate compression so your storage and computation are feasible.*

- How would you return not just the max stack after each drop, but the entire height profile (histogram) along the x-axis?  
  *Hint: Consider maintaining a sweep-line with active intervals or using more detailed segment tree data structure.*

### Summary
This problem leverages the sweep line and interval management pattern. The optimal solution applies coordinate compression and interval (segment tree) methods to efficiently track and update heights. This pattern is widely used in range update and query problems, seen in histogram, skyline, and range scheduling challenges.

### Tags
Array(#array), Segment Tree(#segment-tree), Ordered Set(#ordered-set)

### Similar Problems
- The Skyline Problem(the-skyline-problem) (Hard)