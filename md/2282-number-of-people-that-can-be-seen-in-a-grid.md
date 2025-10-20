### Leetcode 2282 (Medium): Number of People That Can Be Seen in a Grid [Practice](https://leetcode.com/problems/number-of-people-that-can-be-seen-in-a-grid)

### Description  
Given an m × n grid of positive integers `heights`, each cell `(i, j)` represents the height of a person standing at that position. For each person, count the number of people they can directly see to their **right** in the same row, or **down** their column, according to these visibility rules:

- The other person must be directly to the right (same row, higher column) or directly below (same column, higher row).
- Every person in between must be strictly shorter than both the observer and the observed person.
- Return an m × n grid `answer` where `answer[i][j]` records how many people the person at `(i, j)` can see horizontally (right) and vertically (down).

### Examples  

**Example 1:**  
Input: `[[3,1,4,2,5]]`  
Output: `[[2,1,2,1,0]]`  
*Explanation:*
- (0,0) sees (0,1) and (0,2). He cannot see (0,4), because (0,2) is taller than (0,0) and blocks the view.
- (0,1) sees (0,2).
- (0,2) sees (0,3) and (0,4).
- (0,3) sees (0,4).
- (0,4) sees nobody.

**Example 2:**  
Input: `[[2],[3],[2]]`  
Output: `[[1],,]`  
*Explanation:*
- (0,0) sees (1,0).
- (1,0) can't see anyone below (blocked by same or greater height).
- (2,0) can't see anyone below.

**Example 3:**  
Input: `[[5,1,3],[2,6,4],[2,2,2]]`  
Output: `[[2,2,1],[2,0,0],[0,0,0]]`  
*Explanation:*
- For (0,0): to right, sees (0,1) and (0,2); down, sees (1,0) and blocked by (2,0).
- For (0,1): to right, sees (0,2); down, sees (1,1) (because 6 > 1); (2,1) not seen because blocked by 6.
- For (0,2): down, sees (1,2).
- For (1,0): to right, sees (1,1); down, sees (2,0).
- Rest can’t see anyone.

### Thought Process (as if you’re the interviewee)  
First, for each person, I need to count how many people they can see to their right and below. My brute-force idea is:
- For each cell, scan rightwards and count every person I can see, but stop if I hit a taller or equal height (as this would block the view).
- Repeat for downwards.

But this is O(m\*n\*(m+n)), which is inefficient for a large grid.

To optimize, I'd consider a *monotonic stack* approach, similar to solving the “next greater element” in 1D arrays.  
- Apply the stack left-to-right in each row for the rightwards direction, and top-to-bottom in each column for downwards.  
- For each row: process from rightmost column to left, maintaining a stack of positions (indices) with decreasing height, and counting visible people as I pop (everyone shorter is visible until the first one taller or equal, which is also visible and then break).  
- Similarly for each column, process upwards.

This approach lets us solve each row and column in O(n) and O(m) time, for a total of O(m\*n).

### Corner cases to consider  
- Single-row or single-column grids.
- All elements equal: nobody can see anyone else.
- Strictly increasing or decreasing sequences.
- Grid of size 1x1.
- Tall person surrounded by shorter people.
- Descending/ascending staircases.

### Solution

```python
def canSeePersonsCount(heights):
    m, n = len(heights), len(heights[0])
    answer = [[0] * n for _ in range(m)]

    # For each row: look right
    for i in range(m):
        stack = []
        # Go from right to left for right-visibility
        for j in range(n-1, -1, -1):
            count = 0
            while stack and heights[i][j] > stack[-1][0]:
                count += 1
                stack.pop()
            if stack:
                count += 1  # can see the first taller/equal on stack
            answer[i][j] += count
            stack.append((heights[i][j], j))

    # For each column: look down
    for j in range(n):
        stack = []
        for i in range(m-1, -1, -1):
            count = 0
            while stack and heights[i][j] > stack[-1][0]:
                count += 1
                stack.pop()
            if stack:
                count += 1
            answer[i][j] += count
            stack.append((heights[i][j], i))
    return answer
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m × n).  
    - Each row and column is processed independently in linear time.
- **Space Complexity:** O(m × n).  
    - `answer` grid uses O(m × n) for result storage.
    - Stacks use at most O(n) for rows and O(m) for columns, i.e., negligible compared to answer grid.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the constraints were larger and the grid was too big to fit in memory?  
  *Hint: Could the solution be adapted row/column-wise or with streaming?*

- How would your approach change if you needed to count visible people in all **four** directions?  
  *Hint: Could you extend the stack process to left and up as well, and combine results?*

- Could you solve the problem if the rules changed and included **diagonal** visibility?  
  *Hint: Diagonal traversal with monotonic stack adaptation or DP may help.*

### Summary
This problem leverages the *monotonic stack* pattern, commonly seen in "Next Greater Element" problems for arrays, and applies it efficiently to both rows and columns of a grid. Such stack methods are a standard approach in visible-element counting, histogram problems, and sliding window maximums, and are widely useful in interview grids, stock span, and histogram-related variants.


### Flashcard
For each cell, use monotonic stacks to count visible people to the right and below, stopping at taller or equal blockers.

### Tags
Array(#array), Stack(#stack), Matrix(#matrix), Monotonic Stack(#monotonic-stack)

### Similar Problems
- Number of Visible People in a Queue(number-of-visible-people-in-a-queue) (Hard)