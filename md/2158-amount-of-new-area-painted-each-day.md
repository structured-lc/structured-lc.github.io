### Leetcode 2158 (Hard): Amount of New Area Painted Each Day [Practice](https://leetcode.com/problems/amount-of-new-area-painted-each-day)

### Description  
Given a 0-indexed 2D integer array `paint` of length n, where `paint[i] = [startᵢ, endᵢ]`, each day i you paint the area along a number line from `startᵢ` (inclusive) to `endᵢ` (exclusive). If an area has already been painted on a previous day, painting it again does not increase the total new area. Return an array `worklog` where `worklog[i]` is the amount of **new** area painted by the iᵗʰ day's operation.

### Examples  

**Example 1:**  
Input: `paint = [[1,4],[4,7],[5,8]]`  
Output: `[3,3,1]`  
*Explanation:  
Day 0: Paints [1,4) → all fresh → 4-1=3  
Day 1: Paints [4,7) → all fresh → 7-4=3  
Day 2: Paints [5,8), but [5,7) is already painted → only [7,8) is painted → 8-7=1*  

**Example 2:**  
Input: `paint = [[1,4],[5,8],[4,7]]`  
Output: `[3,3,1]`  
*Explanation:  
Day 0: Paints [1,4) → 3  
Day 1: Paints [5,8) → 3  
Day 2: Paints [4,7); [5,7) is painted, only [4,5) is fresh → 1*  

**Example 3:**  
Input: `paint = [[1,5],[2,4]]`  
Output: `[4,0]`  
*Explanation:  
Day 0: Paints [1,5) → all fresh → 4  
Day 1: Paints [2,4), but [2,4) is already painted → 0*

### Thought Process (as if you’re the interviewee)  

Start by noting that brute force—marking each point in the full possible number line for every segment—would be slow if the total painted range is large (up to 5×10⁴).  
**Brute force:** For each day, for each point from start to end-1, check if it has been painted; if not, mark as painted and increment count.  
- This is O(n × L), where L is the sum of all segment lengths, which can be huge.

**Observation:** Since segments may overlap, we need a fast way to check if a subrange is already painted and update ranges efficiently.  
- **Efficient Approach:** Use a map, array, or disjoint-set (union-find) to jump over already painted intervals.  
- For each starting position, if it's painted, skip to the end of the already painted subrange.  
- If not, paint and set mapping so the next search skips over the fresh painted segment next time.

**Why this works:**  
- By keeping track of the farthest painted point for each position (e.g., via array or dict jump pointers), we can "skip" painted segments, scanning each painted spot only once per day, which is much more efficient than a full mark-and-check for every day.

### Corner cases to consider  
- Empty paint list (should return empty).
- Complete overlap on all days.
- Nested intervals where one segment is contained by earlier.
- Segments with no overlap at all.
- startᵢ = endᵢ (interval is empty, should count as 0).
- Intervals at the very boundaries of allowed values (e.g., [0,0] or [max, max]).

### Solution

```python
def amountPainted(paint):
    # Dictionary to store the next unpainted position for any location
    jump = {}
    n = len(paint)
    result = [0] * n

    for day, (start, end) in enumerate(paint):
        i = start
        while i < end:
            # If i already painted, jump to next unpainted position
            nxt = jump.get(i, i)
            # If nxt >= end, all the rest is already painted
            if nxt >= end:
                break
            # Paint at nxt, mark as painted, move to next
            result[day] += 1
            jump[nxt] = end  # mark that from nxt, next unpainted is at least end
            i = nxt + 1        # move to next position

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(total painted length across all days). Each position on the line is painted at most once, so total work done is proportional to sum of all new painted units, which is much less than naively O(n × (max(end) - min(start))). Dictionary lookups and updates are amortized O(1).
- **Space Complexity:** O(total painted size), since we store jump pointers only for painted positions (worst case every coordinate of long segment).

### Potential follow-up questions (as if you’re the interviewer)  

- What if painting must be tracked for very large numbers or unbounded ranges?
  *Hint: Think about using interval trees or segment trees.*

- How would you return the total painted area after all days?
  *Hint: Use a set or keep cumulative sum as you go.*

- How would you adapt this for 2D rectangles (instead of intervals on line)?
  *Hint: Techniques like line sweep with events, or advanced interval/segment structures.*

### Summary  
This problem uses the **interval skipping/jump pointer** approach, which avoids re-checking already painted areas. It’s a classic trick for “skipping” ranges in number line problems. The structure is similar to union-find (path compression) or dynamic interval trees. Patterns like this appear in problems involving merging intervals, range updates, or avoiding redundant work in overlapping segments.


### Flashcard
For each day, track painted intervals efficiently (e.g., with a sorted list or tree) to avoid recounting overlaps and sum newly painted points in O(n log n).

### Tags
Array(#array), Segment Tree(#segment-tree), Ordered Set(#ordered-set)

### Similar Problems
- Merge Intervals(merge-intervals) (Medium)
- Describe the Painting(describe-the-painting) (Medium)
- Average Height of Buildings in Each Segment(average-height-of-buildings-in-each-segment) (Medium)