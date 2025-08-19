### Leetcode 1943 (Medium): Describe the Painting [Practice](https://leetcode.com/problems/describe-the-painting)

### Description  
You are given several colored segments on a number line, where each segment is represented by `[start, end, color]`. Each segment paints the half-closed interval `[start, end)`. If segments overlap, the *colors mix* in the overlapping region as a sum of their color values (not as a set or blend).  
Return the minimal set of **non-overlapping half-closed intervals** `[left, right, sum]` such that for each interval, `sum` is the total color value present in that region.  
Only include intervals where the canvas was actually painted (ignore unpainted regions).

### Examples  

**Example 1:**  
Input: `segments = [[1,4,5],[4,7,7],[1,7,9]]`  
Output: `[[1,4,14],[4,7,16]]`  
*Explanation:*
- [1,4): colored by both segments 1 and 3 ⇒ 5+9=14  
- [4,7): colored by segments 2 and 3 ⇒ 7+9=16

**Example 2:**  
Input: `segments = [[1,6,9],[6,7,15],[7,8,15],[8,10,7]]`  
Output: `[[1,6,9],[6,7,24],[7,8,15],[8,10,7]]`  
*Explanation:*
- [1,6): only segment 1 ⇒ 9  
- [6,7): segments 1 + 2 ⇒ 9+15=24  
- [7,8): only segment 3 ⇒ 15  
- [8,10): only segment 4 ⇒ 7

**Example 3:**  
Input: `segments = [[1,4,5],[1,4,7],[4,7,1],[4,7,11]]`  
Output: `[[1,4,12],[4,7,12]]`  
*Explanation:*
- [1,4): segments 1 and 2 ⇒ 5+7=12  
- [4,7): segments 3 and 4 ⇒ 1+11=12

### Thought Process (as if you’re the interviewee)  
- Brute force would be to process each segment and for each coordinate, keep track of the sum of colors painted there. Since the number line can be large (up to 10⁵), this isn’t feasible.
- This is a classic **sweep line/difference array problem**: track where color sums change.
- For each segment:
  - At `start`, add its color to the total.
  - At `end`, subtract its color.
- Sort all unique positions where any change happens.
- Loop through these sorted points, and for each interval between consecutive points, if the current sum > 0, append `[current, next, curr_sum]` to the answer.
- This pattern reduces both time and space.

### Corner cases to consider  
- Segments that fully overlap (identical intervals).
- Segments that touch only at the endpoints (e.g., one ends where another starts).
- Very large or very small input sizes.
- No segments at all (should return empty).
- Segments where color sums become zero at some points (should not include those in the result).

### Solution

```python
def splitPainting(segments):
    # Step 1: For all changes, build a map of position to color sum change
    from collections import defaultdict

    # Use a dict to record all color sums that start/end at each point
    changes = defaultdict(int)
    for start, end, color in segments:
        changes[start] += color
        changes[end] -= color  # Remember: [start, end)
    
    # Step 2: Sweep over sorted unique points where change occurs
    ans = []
    curr_sum = 0
    prev = None

    for pos in sorted(changes):
        if prev is not None and curr_sum > 0:
            ans.append([prev, pos, curr_sum])
        curr_sum += changes[pos]
        prev = pos

    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  - Sorting the unique positions (up to 2·n).
  - Each segment processed in O(1) and output is O(n).
- **Space Complexity:** O(n)  
  - For the change map, and for the answer (which can have at most 2·n intervals).

### Potential follow-up questions (as if you’re the interviewer)  

- What if segments overlap in more complex patterns (e.g., three or more overlapping at different places)?
  *Hint: Draw out sample overlaps and observe how running sum works with more than two segments.*

- How would you optimize if the number line had higher constraints (e.g., 10⁹)?
  *Hint: The sweeping only requires tracking change points—so this same approach works as long as segment endpoints fit in memory.*

- What if each color can be repeated (color values aren’t unique)?
  *Hint: The difference array approach still works since the mixing operation only cares about sum at position.*

### Summary
This problem uses a classic **sweep line and prefix sum/difference array** technique to efficiently track value changes and intervals. This approach is commonly applicable in range addition, interval painting, and event scheduling problems, especially when the number line can be sparse but with large bounds. The key is only processing at change-points, not every possible coordinate.

### Tags
Array(#array), Hash Table(#hash-table), Sorting(#sorting), Prefix Sum(#prefix-sum)

### Similar Problems
- Average Height of Buildings in Each Segment(average-height-of-buildings-in-each-segment) (Medium)
- Amount of New Area Painted Each Day(amount-of-new-area-painted-each-day) (Hard)
- Shifting Letters II(shifting-letters-ii) (Medium)