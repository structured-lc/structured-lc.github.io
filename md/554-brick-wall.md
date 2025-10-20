### Leetcode 554 (Medium): Brick Wall [Practice](https://leetcode.com/problems/brick-wall)

### Description  
Given a **wall** represented by a list of rows of bricks (each row is a list of brick widths), find the least number of bricks that a vertical line drawn from top to bottom would cross.  
- A brick is *crossed* if the line cuts anywhere except at the edge.
- The line **must not be** drawn at the two vertical edges of the wall (i.e., not along the very leftmost or rightmost boundaries).
- For each row, the width sum equals the total wall width.

### Examples  

**Example 1:**  
Input: `[[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]`  
Output: `2`  
*Explanation: The best place to draw the line is where two brick edges align for four rows (position=4). Since there are 6 rows, the line will cross a brick in only 2 rows (6 - 4 = 2).*

**Example 2:**  
Input: `[[1],[1],[1]]`  
Output: `3`  
*Explanation: All rows are a single brick wide. Any vertical line except at the edges will necessarily cross all rows.*

**Example 3:**  
Input: `[,[5,1],[4,2],[3,3],[2,1,3]]`  
Output: `1`  
*Explanation: The best line coincides with a seam in four out of five rows. Thus the minimum number of bricks crossed is 5 - 4 = 1.*

### Thought Process (as if you’re the interviewee)  
The naive approach would be to try every possible vertical position along the wall and count how many bricks are crossed at each. This would require iterating for each possible position, in every row—very inefficient with large input.

#### Optimized Approach:
Instead, the key observation is:  
- **Any vertical line passing through a brick edge (not at the wall boundary) doesn't cross a brick in that row.**
- **So, find the vertical position (other than the wall edges) where the most brick edges are aligned.**
- The minimum number of brick crossings is: **total rows − max number of aligned edges at a position**

**Plan:**
- For each row, find prefix sums of widths but *exclude* the full row (excluding the rightmost edge).
- Use a hash map (dictionary) to count how often each edge position occurs.
- The answer is total number of rows minus the highest occurrence count in the map.

This **reduces the problem to a counting/frequency problem** and avoids brute force.

### Corner cases to consider  
- Wall with all rows containing just one brick (line will always cut through all).
- Wall with perfectly aligned seams in every row (line crosses 0 bricks).
- Large brick widths, possible overflows (if not using Python).
- Wall with only one row.
- Empty wall or rows (invalid per problem).
- Multiple positions with the same max edge alignment.

### Solution

```python
def leastBricks(wall):
    from collections import defaultdict

    edge_counts = defaultdict(int)
    for row in wall:
        pos = 0
        # Exclude last brick to not consider the rightmost edge!
        for brick in row[:-1]:
            pos += brick
            edge_counts[pos] += 1

    if not edge_counts:
        # All rows are single brick, cannot avoid crossing all rows
        return len(wall)
    # Subtract maximum aligned edge from total rows
    return len(wall) - max(edge_counts.values())
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
  n = number of rows, m = average number of bricks per row. Each brick in every row except the last is processed once.
- **Space Complexity:** O(m)  
  Only the unique seam positions are recorded (at most sum of (bricks per row - 1)).

### Potential follow-up questions (as if you’re the interviewer)  

- "What if the wall is extremely wide (huge numbers)?"
  *Hint: Consider integer overflow. In Python, arbitrary int; in other languages, look at 64-bit.*

- "If the wall is very tall (many rows), how does your solution scale?"
  *Hint: Each row only adds a constant number of entries, so tracking by position remains efficient.*

- "How would you find and return all positions where the minimal number of bricks are crossed?"
  *Hint: Collect all seam positions tied for max frequency in your hash map.*

### Summary
This problem leverages the **hashing and prefix-sum pattern**: instead of simulating every line, we count prefix positions of bricks and find the optimal vertical alignment. It’s a classic frequency-counting approach that is efficient and broadly applicable to tasks involving event alignment or aggregation by position—such as histogram problems or interval overlap counting.


### Flashcard
Use a hash map to count brick edge positions (excluding the wall's right edge); the answer is total rows minus the max edge count.

### Tags
Array(#array), Hash Table(#hash-table)

### Similar Problems
- Number of Ways to Build Sturdy Brick Wall(number-of-ways-to-build-sturdy-brick-wall) (Medium)