### Leetcode 3182 (Medium): Find Top Scoring Students [Practice](https://leetcode.com/problems/find-top-scoring-students)

### Description  
You are given three relational tables: **students** (student\_id, name, major), **courses** (course\_id, name, credits, major), and **enrollments** (student\_id, course\_id, grade).  
Find all students who have enrolled in **every course offered for their major** and earned an 'A' grade in each. Return their student\_id in ascending order.

### Examples  

**Example 1:**  
Input:  
students =  
```
+------------+-------+-------------------+
| student_id | name  | major             |
+------------+-------+-------------------+
|     1      | Alice | Computer Science  |
|     2      | Bob   | Computer Science  |
|     3      | Charlie | Mathematics     |
|     4      | David | Mathematics       |
+------------+-------+-------------------+
```
courses =  
```
+-----------+------------------+---------+-------------------+
| course_id | name             | credits | major             |
+-----------+------------------+---------+-------------------+
|    101    | Algorithms       |    3    | Computer Science  |
|    102    | Data Structures  |    3    | Computer Science  |
|    103    | Calculus         |    4    | Mathematics       |
|    104    | Linear Algebra   |    4    | Mathematics       |
+-----------+------------------+---------+-------------------+
```
enrollments =  
```
+------------+-----------+-------+
| student_id | course_id | grade |
+------------+-----------+-------+
|     1      |   101     |  A    |
|     1      |   102     |  A    |
|     2      |   101     |  A    |
|     2      |   102     |  B    |
|     3      |   103     |  A    |
|     3      |   104     |  A    |
|     4      |   103     |  A    |
|     4      |   104     |  B    |
+------------+-----------+-------+
```
Output: `[1, 3]`  
*Explanation:*
- Alice (1): Took all Computer Science (major) courses (101, 102) and got 'A' in both.
- Bob (2): Took all major courses but grade 'B' in course 102 → not included.
- Charlie (3): Took all Mathematics (major) courses (103, 104) and got 'A' in both.
- David (4): 'B' in 104 → not included.

**Example 2:**  
Input:  
students = `[]`  
courses = `[]`  
enrollments = `[]`  
Output: `[]`  
*Explanation:*
No students, so return empty list.

**Example 3:**  
Input:  
One student, one course, grade is 'A'.  
students =  
```
+------------+-------+---------+
| student_id | name  | major   |
+------------+-------+---------+
|     1      | Amy   | Physics |
+------------+-------+---------+
```
courses =  
```
+-----------+----------+---------+---------+
| course_id | name     | credits | major   |
+-----------+----------+---------+---------+
|    201    | Optics   |    3    | Physics |
+-----------+----------+---------+---------+
```
enrollments =  
```
+------------+-----------+-------+
| student_id | course_id | grade |
+------------+-----------+-------+
|     1      |    201    |  A    |
+------------+-----------+-------+
```
Output: `[1]`  
*Explanation:*
- Amy took the only Physics course, got 'A', meets the criteria.

### Thought Process (as if you’re the interviewee)  
Let's break down the requirements:
- For each student, compare the set of courses required for their major to the set of courses they've taken and received an 'A' in.
- If both sets are equal, the student qualifies.
  - Brute-force: For every student, list their major, get courses for it, check enrollments for the student, check grades.
  - Store all major-courses in a set; for each student, collect the set of their 'A' enrollments in their major; compare.
- Optimize by:
  - Precomputing required courses per major.
  - For each student, use hashing and set comparison.
  - Avoid wasteful loops by using maps/dictionaries efficiently.

**Trade-offs:**  
- Storing course mappings: more space, but speeds up lookups.
- Doing string comparisons for grades versus mapping grades to numbers: works, since there are only a few distinct grades.

### Corner cases to consider  
- No students, no courses, or no enrollments — return empty list.
- Student hasn’t taken all required courses — do not include.
- Student took all, but not all grades are 'A' — do not include.
- Student's major has no courses — typically handled as not qualifying.
- Duplicate enrollments (shouldn't happen, but be cautious).
- Multiple students may have same name but are distinguished by student\_id.

### Solution

```python
def find_top_scoring_students(students, courses, enrollments):
    # Map: major -> set of course_ids
    major_courses = {}
    for course in courses:
        major = course['major']
        course_id = course['course_id']
        if major not in major_courses:
            major_courses[major] = set()
        major_courses[major].add(course_id)
    
    # Map: student_id -> {'major': ..., 'courses': set()}
    student_to_major = {}
    for student in students:
        student_id = student['student_id']
        student_to_major[student_id] = student['major']
    
    # Map: student_id -> set of course_id where grade=='A'
    student_a_courses = {}
    for enroll in enrollments:
        if enroll['grade'] == 'A':
            sid = enroll['student_id']
            cid = enroll['course_id']
            if sid not in student_a_courses:
                student_a_courses[sid] = set()
            student_a_courses[sid].add(cid)
    
    result = []
    for student_id in student_to_major:
        major = student_to_major[student_id]
        required_courses = major_courses.get(major, set())
        # Student must have exactly all major courses as 'A'
        if (student_id in student_a_courses and
            required_courses and
            student_a_courses[student_id] == required_courses):
            result.append(student_id)
    
    result.sort()
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m + p + s), where n = #students, m = #courses, p = #enrollments, s = #students iterated at the end. Each operation over all records is a single scan.
- **Space Complexity:** O(u + v + w) where u = number of majors × courses per major (for major\_courses), v = number of students (for student\_to\_major), w = up to p (for student\_a\_courses).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties if asked for "top k students" or students with the highest number of A's (even if not perfect)?
  *Hint: Use a max-heap or sorting by count of 'A' grades.*

- Suppose course requirements for a major change over time, how would you design the schema and logic?
  *Hint: Add effective\_date/range columns, query by relevant period.*

- How to support partial credit (e.g., 'A' or 'B'), or flexible grade criteria?
  *Hint: Modify grade-check condition, map grades to numeric values, parametrize threshold.*

### Summary
This problem is a classic example of **set comparison and mapping** using hashmaps and sets for efficient lookups — a core pattern for "look up and match relationships" scenarios.  
It appears in problems like course scheduling, permission checks, or any "all requirements must be satisfied" logic.  
The essential coding skills: building and querying dictionaries, set operations, and understanding multi-table (or multi-list) joins — useful for both interview and production code.