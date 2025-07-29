### Leetcode 2346 (Medium): Compute the Rank as a Percentage [Practice](https://leetcode.com/problems/compute-the-rank-as-a-percentage)

### Description  
Given a table of students with `student_id`, `department_id`, and `mark`, compute the rank of each student within their department as a percentage. The rank is based on marks (higher marks = better rank). If students have the same mark, they share the same rank (no skipping). The percentage for each student is:

  **percentage = (rank_in_department - 1) × 100 / (number_of_students_in_department - 1)**

Return the percentage rounded to 2 decimal places. If a department has only one student, percentage should be 0.  

### Examples  

**Example 1:**  
Input:  
```
Students table:
student_id | department_id | mark
-----------|--------------|-----
1          | 1            | 90
2          | 1            | 80
3          | 1            | 70
```
Output:  
```
student_id | department_id | percentage
-----------|--------------|-----------
1          | 1            | 0.00
2          | 1            | 50.00
3          | 1            | 100.00
```
*Explanation: There are 3 students in department 1. Ranks are: 1 (90), 2 (80), 3 (70). For each:  
- student 1: (1 − 1)\*100/(3−1) = 0  
- student 2: (2 − 1)\*100/(3−1) = 50  
- student 3: (3 − 1)\*100/(3−1) = 100  
All rounded to 2 decimals.*

**Example 2:**  
Input:  
```
Students table:
student_id | department_id | mark
-----------|--------------|-----
1          | 1            | 98
2          | 2            | 100
3          | 2            | 95
```
Output:  
```
student_id | department_id | percentage
-----------|--------------|-----------
1          | 1            | 0.00
2          | 2            | 0.00
3          | 2            | 100.00
```
*Explanation:  
Department 1 has 1 student, output is 0.00.  
Department 2: 100 (rank 1, 0), 95 (rank 2, 100).*

**Example 3:**  
Input:  
```
Students table:
student_id | department_id | mark
-----------|--------------|-----
1          | 5            | 80
```
Output:  
```
student_id | department_id | percentage
-----------|--------------|-----------
1          | 5            | 0.00
```
*Explanation: Only one student in department, so output is 0.00.*

### Thought Process (as if you’re the interviewee)  
Let's clarify requirements:
- We need to group students by department.
- For each group, we find the order by mark (descending); rank is shared if marks are tied.
- The formula is straightforward—but we need to be careful to avoid division by zero (for one-student departments).
- All outputs must be rounded to 2 decimals and output 0.00 if only one student is in the department.

**Brute-force:** For each department, sort students by mark, assign ranks considering ties, and calculate the percentage. For each student, count how many students have higher marks, and use the formula for percentage.

**Optimized:**  
- Use a sort-by-mark for each department.
- Use a rank assignment that handles ties (following RANK not DENSE_RANK).
- For each department, count total students in advance.
- For single-student departments, output 0.
- Output should have rounded percentages.

This is a classic **window function** SQL problem, but can be implemented in Python with sorting and careful counting.

### Corner cases to consider  
- Department has only one student (avoid divide-by-zero, output 0.00).
- All students in a department have the same mark (all should share rank 1, percentage 0.00).
- Tied marks (assign same rank, do not skip).
- Students in different departments with same marks (grouping must be by department only).
- Empty table (should output nothing).
- Very large or small marks (should not affect ranking).
- Need to ensure proper rounding to two decimals (including .00 cases).

### Solution

```python
from typing import List, Dict, Any

def compute_rank_as_percentage(students: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    # Group students by department_id
    from collections import defaultdict
    dept_to_students = defaultdict(list)
    for student in students:
        dept_to_students[student['department_id']].append(student)
    
    result = []
    for dept_id, student_list in dept_to_students.items():
        # Sort this department's students by mark DESC, and student_id ASC for tie breaking if needed
        student_list.sort(key=lambda x: (-x['mark'], x['student_id']))
        n = len(student_list)
        
        # Corner case: only one student in the department
        if n == 1:
            result.append({
                'student_id': student_list[0]['student_id'],
                'department_id': dept_id,
                'percentage': 0.00
            })
            continue
        
        # Assign RANK (with gaps for ties), not dense rank
        prev_mark = None
        curr_rank = 1  # 1-based rank
        for i, student in enumerate(student_list):
            if i == 0:
                student['rank'] = 1
            else:
                if student['mark'] == student_list[i-1]['mark']:
                    student['rank'] = student_list[i-1]['rank']
                else:
                    student['rank'] = i + 1   # jumps forward for ties (not dense rank)
        
        # Calculate percentage for each student
        for student in student_list:
            # numerator = (rank - 1) × 100
            numerator = (student['rank'] - 1) * 100
            denominator = n - 1
            if denominator == 0:
                perc = 0.00
            else:
                perc = round(numerator / denominator, 2)
            result.append({
                'student_id': student['student_id'],
                'department_id': dept_id,
                'percentage': perc
            })
            
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N log N)  
  Sorting students within each department dominates, where N is the total number of students (worst case: all in one department).  
  Assigning ranks, iterating, and building results is O(N).

- **Space Complexity:** O(N)  
  Storing groups and output; O(N) extra storage for department partitioning and rank lists.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle real-time updates (inserts/deletes) to the Students table?
  *Hint: Think of incremental maintenance of the grouping, or database triggers.*

- If you have millions of students, can you scale to process efficiently in Python?
  *Hint: Consider memory usage, streaming, and possibly database-powered computation.*

- How does your approach change if the ranking logic is "dense rank" instead of "rank"?
  *Hint: Dense rank does not skip numbers for ties; what changes in the rank assignment?*

### Summary
The solution uses classic "order by + grouping + ranking" logic, with careful tie-handling (standard rank, not dense rank). This type of ranking is common in leaderboards, grading, and reporting systems. The window function (rank/count over partition by group) pattern generalizes well to analytic queries and data processing, especially with SQL. The code is adaptable for other percentile or "relative rank" types of group rankings.