### Leetcode 3617 (Hard): Find Students with Study Spiral Pattern [Practice](https://leetcode.com/problems/find-students-with-study-spiral-pattern)

### Description  
Given records of students' study schedules in 2D grid or list format, identify all students whose study patterns form a **spiral**. The definition of a spiral could mean the sequence of their study sessions follows an inwards outward (or concentric) spiral in the grid, or the chronological order of study times traces a spiral on the grid. Return the list of such students.

### Examples  

**Example 1:**  
Input: `logs = [[1,1,2],[1,2,2],[1,3,2],[2,3,2],[2,2,2],[2,1,2]]`  
Output: `[2]`  
*Explanation: Student 2's study schedule traces a spiral on the grid.*

**Example 2:**  
Input: `logs = [[1,1,1],[1,2,1],[2,2,1],[2,1,1]]`  
Output: `[1]`  
*Explanation: Student 1’s pattern: (1,1)→(1,2)→(2,2)→(2,1) is a spiral in 2x2 grid.*

**Example 3:**  
Input: `logs = [[1,1,1],[1,1,2],[1,1,3]]`  
Output: `[]`  
*Explanation: No student shows a spiral in this log.*

### Thought Process (as if you’re the interviewee)  
First, define what constitutes a spiral pattern. For a 2D grid, a spiral typically means starting at one corner and successively visiting the perimeter inwards in a clockwise or counterclockwise fashion without revisiting any cell.

To solve:
- For each student, collect their study cells (positions) in the order of study.
- Generate the canonical spiral order for the minimal bounding rectangle covering their visited cells (e.g., for a 2×2 or 3×3 grid).
- Check if their actual visitation order matches the spiral order exactly (or, depending on problem, possibly ignoring missing cells).
- This requires simulating spiral order (layer by layer, changing directions appropriately) and comparing to actual logs for each student.

Trade-offs: Brute force is feasible if logs are not too huge; otherwise, mapping locations and comparing orderings must be efficient.

### Corner cases to consider  
- Student visits only one cell repeatedly (not spiral)
- Missing or repeated locations (should not count as spiral)
- Spiral but in reverse direction (problem-specific, accept or not)
- Sparse grids or irregular boundaries
- Multiple students with overlapping study areas

### Solution

```python
# logs: List of [row, col, student_id]
def find_students_with_spiral(logs):
    from collections import defaultdict
    
    # Group visits by student, maintaining chronological order
    student_logs = defaultdict(list)
    for r, c, student_id in logs:
        student_logs[student_id].append( (r, c) )
    result = []
    
    # Helper: generate spiral order for bounding box
    def spiral_order(cells):
        # Build minimal bounding box
        rows = sorted({r for r, _ in cells})
        cols = sorted({c for _, c in cells})
        rmin, rmax = rows[0], rows[-1]
        cmin, cmax = cols[0], cols[-1]
        grid = set(cells)
        order = []
        visited = set()
        r1, r2, c1, c2 = rmin, rmax, cmin, cmax
        while r1 <= r2 and c1 <= c2:
            # top row
            for c in range(c1, c2+1):
                p = (r1, c)
                if p in grid and p not in visited:
                    order.append(p)
                    visited.add(p)
            # right col
            for r in range(r1+1, r2+1):
                p = (r, c2)
                if p in grid and p not in visited:
                    order.append(p)
                    visited.add(p)
            # bottom row (reverse)
            if r1 < r2:
                for c in range(c2-1, c1-1, -1):
                    p = (r2, c)
                    if p in grid and p not in visited:
                        order.append(p)
                        visited.add(p)
            # left col (reverse)
            if c1 < c2:
                for r in range(r2-1, r1, -1):
                    p = (r, c1)
                    if p in grid and p not in visited:
                        order.append(p)
                        visited.add(p)
            r1 += 1; r2 -= 1; c1 += 1; c2 -= 1
        return order
    
    for student, path in student_logs.items():
        if len(set(path)) != len(path):
            continue  # repeats: not a valid spiral
        spiral = spiral_order(path)
        if path == spiral:
            result.append(student)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k²), where n is the number of students and k is the number of cells covered per student (since spiral ordering of k×k area is O(k²)).
- **Space Complexity:** O(n × k), for storing visit logs per student and spiral orderings.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you allow for missing or extra cells in the spiral?  
  *Hint: Flexible matching with gaps, possibly using subsequence checks.*

- Can you detect spirals in grids with obstacles or irregular shapes?  
  *Hint: BFS/DFS for boundary traversal, or dynamic spiral logic per shape.*

- If logs are not in chronological order, how would you handle?  
  *Hint: Require timestamps or explicit ordering in input.*

### Summary
This solution uses **grouping**, **order simulation** (spiral order generation), and strict list comparison patterns. It relates to matrix traversal and canonical pattern-matching problems, widely useful in **simulation** and **geometry** interview questions.

### Tags

### Similar Problems
