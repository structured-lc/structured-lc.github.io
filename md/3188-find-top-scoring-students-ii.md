### Leetcode 3188 (Hard): Find Top Scoring Students II [Practice](https://leetcode.com/problems/find-top-scoring-students-ii)

### Description  
Given three tables:  
- **students**: with student_id, name, and major fields  
- **courses**: with course_id, subject, credit, major, and a boolean indicating whether it’s a mandatory course for that major  
- **enrollments**: with student_id, course_id, semester, and grade received  

Find the **student_id** values of students meeting *all* the following:
- They have completed **all mandatory courses** for their major, and **at least 2 elective courses** in their major.
- For **each mandatory course**, their grade is **A**; for each **elective course**, grade is at least **B**.
- Their **average GPA** (across all courses taken, even outside their major) is **at least 2.5**.
Return the resulting student IDs sorted ascending.

### Examples  

**Example 1:**  
Input:  
students = `[ [1, 'Alice', 'CS'], [2, 'Bob', 'CS'], [3, 'Carol', 'Math'] ]`  
courses = `[ [101, 'Algo', 3, 'CS', True], [102, 'ML', 3, 'CS', False], [103, 'DS', 3, 'CS', False], [201, 'Calculus', 3, 'Math', True], [202, 'Linear', 3, 'Math', False] ]`  
enrollments = `[ [1,101,'F23','A'], [1,102,'F23','B'], [1,103,'S24','B'], [2,101,'F23','B'], [2,102,'F23','A'], [3,201,'F23','A'], [3,202,'F23','B'] ]`  
Output: `[1,3]`  
*Explanation:  
- Student 1 (Alice, CS): Took all CS mandatory (101), elective (102,103, both ≥ B), GPA ≥ 2.5.
- Student 3 (Carol, Math): All Math mandatory (201) with A, ≥2 electives (only Math has 1 elective, so need at least 2; but further course entries could adjust this).
- Student 2 (Bob, CS): Did not get A in mandatory course (101), so excluded.*

**Example 2:**  
Input:  
students = `[ [10, 'X', 'CS'] ]`  
courses = `[ [1, 'OS', 3, 'CS', True], [2, 'Networks', 3, 'CS', False] ]`  
enrollments = `[ [10,1,'F23','A'], [10,2,'F23','B'] ]`  
Output: ``  
*Explanation:  
- Student 10 took all mandatory and at least 2 electives (assuming a data error if only 1 elective exists), got an A in mandatory and B in elective, GPA ≥ 2.5.*

**Example 3:**  
Input:  
students = `[ [5, 'Jake', 'EE'] ]`  
courses = `[ [11, 'Circuits', 2, 'EE', True], [12, 'Signals',2,'EE',False], [13,'Math',2,'Math',True] ]`  
enrollments = `[ [5,11,'F22','A'], [5,12,'F22','C'], [5,13,'F23','A'] ]`  
Output: `[]`  
*Explanation:  
- Took all mandatory courses in major (EE, 11), but elective (12) is C (below B). No other EE electives so not ≥2 electives. Fails elective + grade constraint.*

### Thought Process (as if you’re the interviewee)  
First, I need to verify constraints for each student:  
- For a student, fetch their major.
- Get all **mandatory** courses in that major, ensure they’ve taken all of those and got **A**.
- For **electives** in that major, count how many taken, all with grade at least **B**; need at least 2 electives.
- Compute **average GPA** over all their courses; confirm it’s ≥2.5.
- Only if all true, include their ID.

Brute-force: For each student, simulate their course record checks step-by-step.  
We can optimize:  
- Precompute sets of mandatory and elective courses by major.
- For each student, walk through their enrollments, bucket grades by course type, and update GPA.
- Use hashmaps for quick lookups.

Trade-offs:  
- Brute-force checks every enrollment each time, inefficient.
- Optimized: Use grouping, filtering, and early exit if student fails any requirement.

### Corner cases to consider  
- Student has not taken all mandatory courses (either missing or low grade).
- Student has not taken enough electives in major.
- Student has only electives, no mandatory courses.
- Major has <2 electives available.
- Student has courses from outside their major.
- GPA exactly 2.5, or just below.
- Multiple students tie on requirements, order sorting must be checked.
- Grade out of scale.

### Solution

```python
def find_top_scoring_students(students, courses, enrollments):
    # Map letter grade to GPA value
    grade_to_gpa = {'A': 4.0, 'B': 3.0, 'C': 2.0, 'D': 1.0, 'F': 0.0}

    # Build major -> set of mandatory/elective course_ids
    from collections import defaultdict

    mandatory_courses = defaultdict(set)
    elective_courses = defaultdict(set)
    for course_id, _, _, major, mandatory in courses:
        if mandatory:
            mandatory_courses[major].add(course_id)
        else:
            elective_courses[major].add(course_id)
    
    # Group enrollments by student
    student_enrolls = defaultdict(list)
    for student_id, course_id, _, grade in enrollments:
        student_enrolls[student_id].append((course_id, grade))

    # Build student_id -> (name, major)
    student_info = {sid: (name, major) for sid, name, major in students}
    
    res = []
    for sid in student_info:
        _, major = student_info[sid]
        taken_courses = student_enrolls[sid]
        # Quick skip if no enrollments
        if not taken_courses:
            continue
        
        # Track (course_id -> grade) for this student
        course_grade = dict()
        for course_id, grade in taken_courses:
            course_grade[course_id] = grade

        # 1. Check mandatory courses all taken with grade 'A'
        all_mandatory = mandatory_courses[major]
        if not all_mandatory.issubset(course_grade):
            continue
        if not all( course_grade[mid] == 'A' for mid in all_mandatory ):
            continue

        # 2. Check at least 2 elective courses taken, all grade ≥ 'B'
        eligible_electives = elective_courses[major]
        # Only consider electives defined for the major
        electives_taken = [cid for cid in eligible_electives if cid in course_grade and grade_to_gpa[course_grade[cid]] >= 3.0]
        if len(electives_taken) < 2:
            continue
        
        # 3. Compute overall GPA (all courses for student)
        gpa_sum = 0.0
        gpa_cnt = 0
        for _, grade in taken_courses:
            if grade not in grade_to_gpa:
                continue  # skip invalid grade
            gpa_sum += grade_to_gpa[grade]
            gpa_cnt += 1
        if gpa_cnt == 0 or (gpa_sum / gpa_cnt) < 2.5:
            continue

        res.append(sid)

    return sorted(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(S × C), where S = #students, C = #courses per student (due to enrollment grouping and per-student checking). Preprocessing of course tables is linear.
- **Space Complexity:** O(S + C), for grouping students, courses, and mapping lookups.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you scale this if the tables are too big to fit in memory?  
  *Hint: Could use external sorting, streaming, or SQL with proper joins and indexed filtering.*

- What changes if grades are on a 0-100 numeric scale rather than letters?  
  *Hint: Need to adjust grade comparison logic to numeric thresholds instead of letter mapping.*

- How to update logic if minimum number of electives changes per-student or per-major?  
  *Hint: Pass in a dict of required elective counts keyed by major, check accordingly per student.*

### Summary
This is a classic example of set membership, grouping, and filtering—commonly solvable by grouping in SQL or dictionary lookups in code.  
Key coding pattern: **group-by (dict), set operations, map/filter on constraints**.  
Paradigm applies to similar problems in course audit, employee eligibility checks, or any database-style entity filtering with multiple compound rules.

### Tags
Database(#database)

### Similar Problems
