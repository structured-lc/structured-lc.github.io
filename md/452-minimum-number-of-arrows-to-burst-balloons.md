### Leetcode 452 (Medium): Minimum Number of Arrows to Burst Balloons [Practice](https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons)

### Description  
Given a list of **balloons**, where each balloon is represented by an interval \([x_{start}, x_{end}]\) along the x-axis, you are to **burst all the balloons** using the minimum number of arrows. An arrow can be shot **vertically** at any x-coordinate, and it will burst all balloons whose intervals cover that position. Your task is to find the **minimum number of arrows** required to burst all the balloons.  
Think of the intervals as "ranges" you can cover with arrows, and your job is to cover all intervals while minimizing overlaps in coverage.

### Examples  

**Example 1:**  
Input: `[[10,16],[2,8],[1,6],[7,12]]`  
Output: `2`  
*Explanation: Shoot one arrow at \( x = 6 \) to burst [2,8] and [1,6], and a second arrow at \( x = 11 \) to burst [10,16] and [7,12].*

**Example 2:**  
Input: `[[1,2],[3,4],[5,6],[7,8]]`  
Output: `4`  
*Explanation: All balloons are non-overlapping. Each needs a separate arrow.*

**Example 3:**  
Input: `[[1,2],[2,3],[3,4],[4,5]]`  
Output: `2`  
*Explanation: Shoot one arrow at \( x = 2 \) to burst [1,2] and [2,3], and another at \( x = 4 \) to burst [3,4] and [4,5].*

### Thought Process (as if you’re the interviewee)  
I'll start with a brute-force idea: for each balloon, try all possible arrow shots and recursively solve for the rest, but that is extremely inefficient.

Instead, notice that **overlapping balloons can be burst with a single arrow** if that arrow is shot within the overlap. If I sort balloons by end coordinate, I can always burst as many as possible with one arrow at the earliest end, and then skip all overlapping with that point. The greedy idea is: always shoot arrows at the end of the earliest-ending balloon not yet burst, then repeat for the remaining balloons.  
This way, each arrow is maximally efficient, and the number of arrows is minimized.

### Corner cases to consider  
- Empty input (no balloons): should return 0  
- Only one balloon: should return 1  
- All balloons have the same interval: should return 1  
- Balloons with same start or end  
- Balloons completely overlapping  
- Balloons with only single points \([x, x]\)

### Solution

```python
def findMinArrowShots(points):
    if not points:
        return 0

    # Sort balloons by their end coordinate
    points.sort(key=lambda x: x[1])
    
    arrows = 1  # At least one arrow is needed
    last_shot = points[0][1]  # Arrow position at the end of the first interval
    
    # Iterate over the sorted intervals
    for i in range(1, len(points)):
        # If the balloon starts after the last shot arrow
        if points[i][0] > last_shot:
            arrows += 1
            last_shot = points[i][1]  # Move arrow to the end of current balloon
            
    return arrows
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n)  
  Sorting the list of balloons by end position is O(n log n). The subsequent scan is O(n).

- **Space Complexity:** O(1)  
  No extra data structures proportional to input size; sorting can be done in place.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the balloons are already sorted?  
  *Hint: Can you avoid re-sorting for improved efficiency?*

- Can you solve it if the intervals are extremely large or contain duplicates?  
  *Hint: Can the approach handle overlapping or repeated intervals?*

- What modifications would you need to burst only a subset of required balloons (not all)?  
  *Hint: What if some balloons are optional or come with costs?*

### Summary
This problem uses a **greedy algorithm** to minimize the number of arrows by always targeting the end of the earliest-ending interval not yet burst. The main insight is that **covering overlapping intervals together** is optimal. This is a classic *interval scheduling/covering* pattern, used frequently for tasks such as activity selection, meeting room usage, or video streaming segment optimizations.


### Flashcard
Sort balloons by end coordinate, then greedily shoot arrows at the earliest end to burst all overlapping balloons with one arrow.

### Tags
Array(#array), Greedy(#greedy), Sorting(#sorting)

### Similar Problems
- Meeting Rooms II(meeting-rooms-ii) (Medium)
- Non-overlapping Intervals(non-overlapping-intervals) (Medium)