### Leetcode 2356 (Easy): Number of Unique Subjects Taught by Each Teacher [Practice](https://leetcode.com/problems/number-of-unique-subjects-taught-by-each-teacher)

### Description  
Given a database/table **Teacher** with columns `teacher_id`, `subject_id`, and `dept_id`, determine for every teacher the number of unique subjects they teach.  
Return a result with each teacher’s ID and their count of unique subjects. The result can be in any order.  
You are to emulate writing a SQL query, but explain in your own words:  
Imagine a list of records for teachers — some may repeat with different (or the same) subjects. For each teacher, count how many different subjects they teach, regardless of department.

### Examples  

**Example 1:**  
Input:  
Table rows =  
```
teacher_id | subject_id | dept_id
    1      |     2      |   3
    1      |     2      |   4
    1      |     3      |   3
    2      |     2      |   4
    2      |     4      |   3
```
Output:  
```
teacher_id | cnt
    1      | 2
    2      | 2
```
*Explanation:  
- Teacher 1 teaches subjects 2 and 3 (subject 2 appears twice, but only counted once), so cnt = 2.  
- Teacher 2 teaches subjects 2 and 4, so cnt = 2.*

**Example 2:**  
Input:  
Table rows =  
```
teacher_id | subject_id | dept_id
    5      |     1      |   1
    5      |     1      |   2
    5      |     2      |   3
    6      |     2      |   1
    6      |     4      |   2
    6      |     4      |   5
```
Output:  
```
teacher_id | cnt
    5      | 2
    6      | 2
```
*Explanation:  
- Teacher 5 teaches subject 1 and 2 (subject 1 appears in two depts, only counted once), so cnt = 2.  
- Teacher 6 teaches subject 2 and 4 (subject 4 appears twice), cnt = 2.*

**Example 3:**  
Input:  
Table rows =  
```
teacher_id | subject_id | dept_id
    1      |     1      |   1
    2      |     2      |   2
    3      |     3      |   1
```
Output:  
```
teacher_id | cnt
    1      | 1
    2      | 1
    3      | 1
```
*Explanation:  
- Every teacher teaches exactly one subject.*

### Thought Process (as if you’re the interviewee)  
- First, I’d clarify that **teacher_id** can repeat, and each row is a (teacher, subject, dept) triple.
- The **brute-force** way: For each teacher, create a set of unique subject_ids found in their rows, then output (teacher, count of subjects in that set).
- To optimize, we avoid any nested iteration and just process each row once.
- **Efficient approach:**  
  - Use a data structure (like a dict of sets) — for each teacher_id, add subject_id to their set.
  - At the end, for each teacher_id, output the size of their subject set.
- In SQL, we’d group by teacher_id and count distinct subject_ids — this is an aggregation optimized by the DB engine.
- The final approach I’d choose is the single-pass grouping by teacher and set logic (or SQL’s `COUNT(DISTINCT subject_id)` per teacher_id).
- Trade-offs: This is O(n), with O(n) extra space in worst-case (if all subjects are unique per teacher), but that’s unavoidable for counting distinct subjects.

### Corner cases to consider  
- Empty table — should return empty result.
- Teachers who teach only one subject (even if repeated over different departments).
- Teachers with no records (not present in the input).
- Multiple rows for the same (teacher, subject) pair — only count as one subject.
- Subject IDs might not be consecutive or sorted.

### Solution

```python
# Emulate database scan logic in Python without using built-ins like setdefault or defaultdict

def count_unique_subjects(teacher_rows):
    # teacher_rows is a list of tuples: (teacher_id, subject_id, dept_id)
    teacher_subjects = {}
    
    for row in teacher_rows:
        teacher_id, subject_id, dept_id = row
        # Initialize a set for each teacher if not present
        if teacher_id not in teacher_subjects:
            teacher_subjects[teacher_id] = set()
        # Add this subject_id to the set
        teacher_subjects[teacher_id].add(subject_id)
        
    # Build the output (teacher_id, count)
    result = []
    for teacher_id in teacher_subjects:
        cnt = len(teacher_subjects[teacher_id])
        result.append((teacher_id, cnt))
    # Any order acceptable
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows. We scan every row once and set insertion/check is O(1) average.
- **Space Complexity:** O(n) worst-case, for storing all unique (teacher, subject) pairs.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your approach change if you had memory constraints and the data does not fit in RAM?  
  *Hint: Consider external/grouping algorithms or doing the aggregation in sorted order on disk.*

- What if you wanted to also count the number of unique departments per teacher?  
  *Hint: You’d need a set of dept_ids as well, similar to tracking unique subject_ids.*

- How would you output the list of subjects per teacher, not just the count?  
  *Hint: Instead of len(set), return the list or string of subject_ids for each teacher.*

### Summary
This problem uses the **group-by** and **unique counting** pattern, a classic in SQL and data aggregation tasks.  
It closely relates to **hashing/grouping by key and set membership** algorithms, seen in database engines and large-scale log processing.  
The solution pattern generalizes to counting the number of distinct items per group, and is relevant in user analytics, logging, and category aggregation.


### Flashcard
Use a dictionary mapping each teacher_id to a set of subject_ids; iterate once through all rows and count set sizes at the end.

### Tags
Database(#database)

### Similar Problems
