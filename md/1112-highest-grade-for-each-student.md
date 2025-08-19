### Leetcode 1112 (Medium): Highest Grade For Each Student [Practice](https://leetcode.com/problems/highest-grade-for-each-student)

### Description  
Given a table called `Enrollments` with the following columns:

- `student_id` (int)
- `course_id` (int)
- `grade` (int)

Each row records a student's grade in a course. The primary key is (`student_id`, `course_id`).  
For each student, return the highest grade *with its corresponding course*.  
- If there are ties in `grade`, select the smallest `course_id`.  
- Results must be sorted by increasing `student_id`.

### Examples  

**Example 1:**  
Input:  
Enrollments =  
| student_id | course_id | grade |
|------------|-----------|-------|
|     2      |     2     |  95   |
|     2      |     3     |  95   |
|     1      |     1     |  90   |
|     1      |     2     |  99   |
|     3      |     1     |  80   |
|     3      |     3     |  82   |

Output:  
| student_id | course_id | grade |
|------------|-----------|-------|
|     1      |     2     |  99   |
|     2      |     2     |  95   |
|     3      |     3     |  82   |

*Explanation:  
- Student 1: Highest grade is 99, in course 2  
- Student 2: Two courses with grade 95 (course 2, 3). Pick smallest course_id (2)  
- Student 3: Highest grade is 82, in course 3.*

**Example 2:**  
Input:  
Enrollments =  
| student_id | course_id | grade |
|------------|-----------|-------|
|     1      |     1     |  88   |

Output:  
| student_id | course_id | grade |
|------------|-----------|-------|
|     1      |     1     |  88   |

*Explanation: Only one student and one course, so that's returned.*

**Example 3:**  
Input:  
Enrollments =  
| student_id | course_id | grade |
|------------|-----------|-------|
|     5      |     4     |  70   |
|     5      |     2     |  75   |
|     5      |     1     |  75   |

Output:  
| student_id | course_id | grade |
|------------|-----------|-------|
|     5      |     1     |  75   |

*Explanation:  
- Student 5: Two grades 75 (courses 2 and 1). Select lowest course_id (1).*

### Thought Process (as if you’re the interviewee)  
- *Brute force:* For each student, find all of their grades, track the maximum, and if tied, track all course_ids, then select the minimum one.
- In SQL, this means grouping by student, finding max(grade), then filtering for ties.
- Can use two approaches:
    - Use an aggregate to find the max grade per student, then join it back to get which courses have that grade, and pick min course_id.
    - Or use window functions (like RANK or ROW_NUMBER) partitioned by student_id, ordered by grade descending, then course_id ascending; for each student, pick the first row.
- For coding in Python, group records by student, then for each group:
    - Find the max grade.
    - Filter for matching rows (course_ids with grade = max).
    - Select the row with the minimum course_id.

*Optimized Approach*:  
- One scan to build a dict: key=student_id, value=list of (course_id, grade).
- For each student:
    - Scan their list to find the max grade.
    - Find all course_ids with that grade, pick the smallest.
- Efficiency comes from minimizing overall work and avoiding redundant scans.

### Corner cases to consider  
- No enrollments (output is empty).
- Only one student, one course.
- All students have same grades in multiple courses.
- Multiple students, all with ties for max grade.
- Very large input (focus on O(n) complexity).

### Solution

```python
def highest_grade_for_each_student(enrollments):
    # Map student_id to a list of (course_id, grade)
    student_courses = {}
    for student_id, course_id, grade in enrollments:
        if student_id not in student_courses:
            student_courses[student_id] = []
        student_courses[student_id].append( (course_id, grade) )

    # Prepare result: list of (student_id, course_id, grade)
    result = []
    for student_id in sorted(student_courses):
        courses = student_courses[student_id]
        # Find max grade for this student
        max_grade = max(grade for course_id, grade in courses)
        # Filter courses with max grade, pick min course_id
        min_course_id = min(course_id for course_id, grade in courses if grade == max_grade)
        result.append( (student_id, min_course_id, max_grade) )
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of enrollments; each record is processed a constant number of times (grouping and aggregating).
- **Space Complexity:** O(s + n), s = number of students (dict), n = original list size (stored per student), extra for result output.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the table is very large and can't fit in memory?  
  *Hint: Consider streaming/iterator approaches or using external memory grouping.*

- What if you need the *top k* grades (not just highest)?  
  *Hint: Use heap or priority queue per student group.*

- What if multiple students can be enrolled in the same course and you want per course highest as well?  
  *Hint: Grouping and aggregation by (course_id, student_id) pair, or just by course_id.*

### Summary
This approach uses a common grouping and aggregation pattern—"Group By then Aggregate/Filter"—which is widely used in database queries and in coding for problems involving classification and finding maximum/minimum per group. It's efficient (O(n)) and easily adapts to related group-aggregate problems.

### Tags
Database(#database)

### Similar Problems
- Department Highest Salary(department-highest-salary) (Medium)