### Leetcode 1412 (Hard): Find the Quiet Students in All Exams [Practice](https://leetcode.com/problems/find-the-quiet-students-in-all-exams)

### Description  
You are given two tables: **Student** (student_id, student_name) and **Exam** (exam_id, student_id, score).  
You need to find all students who are “quiet” in **ALL** exams they took.  
A student is “quiet” in an exam if their score is **neither the highest nor the lowest** among all students in that exam.  
Return the list of (student_id, student_name) for students who took at least one exam and were always “quiet,” ordered by student_id ascending.

### Examples  

**Example 1:**  
Input:  
Student =  
| student_id | student_name |
|------------|-------------|
|     1      |    Alice    |
|     2      |    Bob      |
|     3      |    Carol    |

Exam =  
| exam_id | student_id | score |
|---------|------------|-------|
|    1    |     1      |  90   |
|    1    |     2      |  95   |
|    1    |     3      |  85   |
|    2    |     1      |  75   |
|    2    |     2      |  85   |
|    2    |     3      |  70   |

Output: `[[1, "Alice"]]`  
*Explanation: Alice, in both exams, does not have the highest or lowest score. In exam 1: 85 (Carol), 90 (Alice), 95 (Bob). In exam 2: 70 (Carol), 75 (Alice), 85 (Bob). So only Alice is quiet in all exams she took.*

**Example 2:**  
Input:  
Student =  
| student_id | student_name |
|------------|-------------|
|     1      |    Dave     |

Exam =  
| exam_id | student_id | score |
|---------|------------|-------|
|    1    |     1      |  100  |

Output: ``  
*Explanation: Dave participated in only one exam and had both the highest and lowest score, so not quiet.*

**Example 3:**  
Input:  
Student =  
| student_id | student_name |
|------------|-------------|
|     1      |   Eve       |
|     2      |   Flynn     |
|     3      |   Greg      |

Exam =  
| exam_id | student_id | score |
|---------|------------|-------|
|    1    |     1      |  70   |
|    1    |     2      |  80   |
|    1    |     3      |  90   |
|    2    |     2      |  80   |
|    2    |     3      |  90   |

Output: `[[2, "Flynn"]]`  
*Explanation: Only Flynn (student 2) always scored neither highest nor lowest in exams he took. In exam 1: 70 (Eve), 80 (Flynn), 90 (Greg). In exam 2: 80 (Flynn), 90 (Greg).*

### Thought Process (as if you’re the interviewee)  
First, understand that a “quiet” student is one who, **for every exam they take**, does not have **either the highest or the lowest score**.  
A brute-force approach is to, for each student and exam:  
- Find the max and min scores of that exam.
- Check, for each student’s exam record, if their score equals either max or min in that exam.  
- If a student is *never* the max or min in any exam they took, and they took at least one exam, add them to the answer.  

This can be done with nested loops or, in SQL, using window functions to rank students per exam. We can rank by score ASC and DESC and check for rank 1 in either direction.  
To optimize, we must avoid extra passes or full table scans. Using window functions (like RANK() OVER PARTITION BY exam_id ORDER BY score ASC/DESC) efficiently identifies top/bottom scorers.  
Finally, exclude students who were ever top or bottom in any exam, and those who have never taken any exams.

### Corner cases to consider  
- Students who never took any exam should not be included.
- Exams where all students have the same score: all are simultaneously top and bottom, so none are quiet.
- Only 1 student in an exam: can't be quiet.
- Student who is quiet in some, but not all exams: should not be included.
- Multiple students with same highest/lowest score.
- Empty tables.

### Solution

```python
# Assume we are simulating the SQL logic in Python logic for interview prep.
# We are given: students: List[List[int, str]], exams: List[List[int, int, int]]

def findQuietStudents(students, exams):
    from collections import defaultdict

    # Map: exam_id -> list of (student_id, score)
    exam_scores = defaultdict(list)
    for exam_id, student_id, score in exams:
        exam_scores[exam_id].append((student_id, score))

    # Map: student_id -> set of exams they took
    student_exams = defaultdict(list)
    # Map: student_id -> list of (exam_id, score)
    student_score_list = defaultdict(list)
    for exam_id, student_id, score in exams:
        student_exams[student_id].append(exam_id)
        student_score_list[student_id].append((exam_id, score))

    # For each exam, precompute min and max scores (can be duplicated for ties)
    exam_min_max = {}  # exam_id -> (min_score, max_score)
    for exam_id, score_list in exam_scores.items():
        scores = [score for _, score in score_list]
        exam_min_max[exam_id] = (min(scores), max(scores))

    # For each student, check if any of their exam scores are min or max in that exam
    quiet_students = set()
    for student_id in student_exams:
        exams_taken = student_score_list[student_id]
        is_quiet = True
        for exam_id, score in exams_taken:
            min_score, max_score = exam_min_max[exam_id]
            if score == min_score or score == max_score:
                is_quiet = False
                break
        if is_quiet:
            quiet_students.add(student_id)

    # Make student_id to student_name map 
    id_to_name = {sid: sname for sid, sname in students}

    # Compose output: list of [student_id, student_name], sorted by student_id
    result = []
    for student_id in sorted(quiet_students):
        if student_id in id_to_name:
            result.append([student_id, id_to_name[student_id]])
    return result

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(E + S), where E is number of exam records, S is number of students.  
  - One pass over exams to build data structures and precompute min/max per exam.
  - For each student, check all their exams (at most E checks in total).

- **Space Complexity:**  
  O(E + S):  
  - For storage of per-exam and per-student structures.

### Potential follow-up questions (as if you’re the interviewer)  

- What changes if *quiet* is defined as “never top scorer,” but being lowest is okay?  
  *Hint: Only check for max, not min, per exam.*

- How do you handle real-world grading where ties are possible?  
  *Hint: Carefully handle equal scores for min/max across students.*

- Can you do this efficiently if the dataset does not fit in memory?  
  *Hint: Suggest SQL queries and/or batching via MapReduce or grouping by exam_id.*

### Summary
This is a **group by / min, max** coding pattern, where you aggregate data per group and then filter globally per key (student).  
It’s common in leaderboard, ranking, or statistical problems where you want to find entries not at an extreme in subgroups.  
Key ideas: group aggregation, careful handling of ties, and “all” condition per entity.  
Can be solved with SQL window functions, streaming, or in memory depending on data size and format.


### Flashcard
For each student and exam, check if their score is neither the highest nor the lowest. If a student never has the highest or lowest score in any exam, mark them as quiet.

### Tags
Database(#database)

### Similar Problems
