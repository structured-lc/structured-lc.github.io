### Leetcode 2021 (Medium): Brightest Position on Street [Practice](https://leetcode.com/problems/brightest-position-on-street)

### Description  
You are given a list of street lamps on a perfectly straight number line. Each lamp is described by two integers: its *position* and its *range*. Each lamp lights up all positions from (position - range) to (position + range), inclusive. The **brightness** of a position is the count of lamps that illuminate it.  
Your task: **Find the position with the highest brightness**. If multiple positions are equally bright, return the smallest position.

### Examples  

**Example 1:**  
Input: `lights = [[-3,2],[1,2],[3,3]]`  
Output: `-1`  
*Explanation:*
- Lamp 1 at -3 with range 2 lights positions [-5, -1]
- Lamp 2 at 1 with range 2 lights positions [-1, 3]
- Lamp 3 at 3 with range 3 lights positions [0, 6]
- Positions with brightness 2: -1 (from lamps 1 and 2), and 0,1,2,3 (from lamps 2 and 3).
- The smallest such position is -1.

**Example 2:**  
Input: `lights = [[1,0],[0,1]]`  
Output: `0`  
*Explanation:*
- Lamp 1 at 1, range 0 → [1,1]
- Lamp 2 at 0, range 1 → [-1,1]
- Positions lit: -1 (1 lamp), 0 (1 lamp), 1 (2 lamps)
- Position 1 has brightness 2, but so does 0 (covered by lamp 2 and ends at 1). The smallest position is 0.

**Example 3:**  
Input: `lights = [[5,4]]`  
Output: `1`  
*Explanation:*
- Lamp at 5, range 4 → [1,9]
- Only one lamp, so all positions in [1,9] have brightness 1.
- The smallest (and only) such position is 1.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:** For each lamp, “paint” all positions it illuminates and count the brightness for every possible position. This is infeasible if ranges are large or positions can be in the billions, since we can't iterate over all possible locations due to performance and memory limits.

- **Efficient Idea: Sweep Line / Prefix Sum Approach:**  
  - For each lamp, treat (position - range) as the “brightness increases by 1” event, and (position + range + 1) as the “brightness decreases by 1” event (because ranges are inclusive).
  - Store these events in a map.
  - Walk through the sorted event points, keep a running total of current brightness, and whenever we see a new maximum brightness, record both the brightness and the corresponding position. If we see the same maximum, record the smaller position if encountered earlier.
  - This avoids examining every integer between the lamp ends, only processes the *event points* where brightness changes.

- The **trade-off:** O(n log n) because of sorting. Much better than O(nR), where R is the largest range.

### Corner cases to consider  
- Lamps with range 0 (illuminate only their exact position)
- Overlapping lamps and fully separate lamps
- All lamps with overlapping intervals
- Only one lamp
- Negative positions or ranges
- Multiple positions with the same maximum brightness; must return the smallest such position

### Solution

```python
def brightestPosition(lights):
    # map: position → brightness_change (+1 at start, -1 at end+1)
    pos_changes = {}
    for pos, r in lights:
        start = pos - r
        end = pos + r + 1  # end+1 because it's inclusive
        pos_changes[start] = pos_changes.get(start, 0) + 1
        pos_changes[end] = pos_changes.get(end, 0) - 1

    # Sweep through event positions in sorted order
    max_brightness = 0
    cur_brightness = 0
    result_pos = None
    for position in sorted(pos_changes):
        cur_brightness += pos_changes[position]
        if cur_brightness > max_brightness:
            max_brightness = cur_brightness
            result_pos = position
        # If same brightness, pick smaller pos
        elif cur_brightness == max_brightness and position < result_pos:
            result_pos = position
    return result_pos
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), where n = number of lamps.  
  - Sorting the event positions dominates. Iterating over positions is at most 2n (each lamp makes 2 events), so the loop is O(n).
- **Space Complexity:** O(n), since the number of events/search points is at most 2n (start and end for each lamp). No extra structures proportional to street length.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle real-valued positions/ranges (not just integers)?  
  *Hint: Discretize the input or use data structures that support real intervals and events.*

- What if you needed to report *all* the brightest positions, not just the smallest?  
  *Hint: Collect all positions where max_brightness is matched.*

- Can you support efficient updates if lamps are added/removed in real-time?  
  *Hint: Consider interval trees or segment trees for dynamic scenarios.*

### Summary
This problem is a classic example of the **Event Sweep Line** pattern, where we track changes (deltas) at interval boundaries to efficiently count overlapping intervals. It's great for scenarios like interval overlap, meeting rooms, traffic, or booking systems.  
The approach avoids brute-force iteration by only acting at event points, turning what could be an intractable O(n⋅R) into an elegant and scalable O(n log n) solution.

### Tags
Array(#array), Sorting(#sorting), Prefix Sum(#prefix-sum), Ordered Set(#ordered-set)

### Similar Problems
- Minimum Number of Food Buckets to Feed the Hamsters(minimum-number-of-food-buckets-to-feed-the-hamsters) (Medium)
- Count Positions on Street With Required Brightness(count-positions-on-street-with-required-brightness) (Medium)