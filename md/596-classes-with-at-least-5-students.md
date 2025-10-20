### Leetcode 596 (Easy): Classes With at Least 5 Students [Practice](https://leetcode.com/problems/classes-with-at-least-5-students)

### Description  
Given a **Courses** table with columns `student` and `class`, return the names of all **class**es that have **at least 5 unique students**.  
You only need to return the **class** column; the order does not matter.  
Each row in the table represents enrollment of a single student in a class.  
If a student is enrolled multiple times in a class, count them only once per class.

### Examples  

**Example 1:**  
Input:  
Courses table:  
```
| student | class     |
|---------|-----------|
| A       | Math      |
| B       | English   |
| C       | Math      |
| D       | Biology   |
| E       | Math      |
| F       | Computer  |
| G       | Math      |
| H       | Math      |
| I       | Math      |
```
Output:  
```
| class  |
|--------|
| Math   |
```
*Explanation: "Math" has 6 students enrolled (A, C, E, G, H, I), which is at least 5. All others have less than 5 students.*

**Example 2:**  
Input:  
Courses table:  
```
| student | class   |
|---------|---------|
| X       | Chem    |
| Y       | Chem    |
| Z       | Bio     |
| W       | Chem    |
| V       | Physics |
```
Output:  
```
| class |
```
*Explanation: No class has at least 5 students, so the result is empty.*

**Example 3:**  
Input:  
Courses table:  
```
| student | class |
|---------|-------|
| A       | Art   |
| B       | Art   |
| C       | Art   |
| D       | Art   |
| E       | Art   |
| F       | Art   |
```
Output:  
```
| class |
|-------|
| Art   |
```
*Explanation: "Art" has 6 students, so include it.*

### Thought Process (as if you’re the interviewee)  
- First, need to **find out how many unique students are enrolled in each class**.
- That means **group by class**, and for each group, **count distinct students**.
- Only include those groups where the distinct student count is at least 5.
- Brute-force: For each class, count its students (could use hash set for uniqueness, or SQL's COUNT(DISTINCT...)).
- This grouping and counting is **efficient in SQL** or with dictionaries in Python.
- SQL solution: `GROUP BY class HAVING COUNT(DISTINCT student) >= 5`.
- In Python: Traverse the records, for each class use a set to hold unique students, then count the set’s length.
- This grouping, then filtering (HAVING), is a classic data aggregation workflow.

### Corner cases to consider  
- No class meets the minimum of 5 students.
- Duplicates: the same student appears more than once in the same class.
- Classes exactly at the boundary (e.g., 5 students: should be included).
- Table is empty.
- Multiple classes can have at least 5 students.
- Class names or student names with odd characters, or case-sensitivity.
- Classes with extremely many enrollments.

### Solution

```python
# Let's assume input is a list of [student, class] pairs as would be in a DB table.
# We'll output a list of class names with at least 5 unique students.

def classes_with_at_least_5_students(courses):
    # Dictionary mapping class name to a set of unique students
    class_to_students = {}

    for student, class_name in courses:
        if class_name not in class_to_students:
            class_to_students[class_name] = set()
        class_to_students[class_name].add(student)

    result = []
    # Now, filter classes where number of unique students ≥ 5
    for class_name, students in class_to_students.items():
        if len(students) >= 5:
            result.append(class_name)

    return result
```
*Example usage:*
```python
courses = [
    ["A", "Math"], ["B", "English"], ["C", "Math"], ["D", "Biology"],
    ["E", "Math"], ["F", "Computer"], ["G", "Math"], ["H", "Math"], ["I", "Math"]
]
print(classes_with_at_least_5_students(courses))  # Output: ['Math']
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of course enrollments.  
  - Each enrollment is processed once and adds to a set (O(1) per operation).
  - Final filtering over the distinct classes is O(k), k = number of classes, which is much smaller than n.
- **Space Complexity:** O(n) in the worst case (if every enrollment is a unique student in a unique class).
  - Additional storage: dictionary for classes, sets for unique students.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the requirement changes to "at least X students" and X is passed in as a parameter?  
  *Hint: Add a function argument for cutoff; generalize the filter condition.*

- How would you handle this at scale if the data cannot fit into memory?  
  *Hint: Think about streaming, MapReduce/Hadoop, or database approaches with indices.*

- If students can be in multiple classes at once, and we wanted to return only classes with completely unique students (no overlaps between classes), how would you do it?  
  *Hint: Need to compare memberships across classes; may require two-level aggregation or join logic.*

### Summary
The approach uses **hash map grouping** with **sets for deduplication**—classic for SQL-style GROUP BY with aggregation problems.  
This pattern is common in tasks like distinct counts, group-based filtering, or histogram-style summary.  
It’s efficient in both Python and SQL, and directly aligns with database operations like `GROUP BY` + `HAVING`.  
You can extend this logic to more complex group filters, or adapt for scale with streaming or distributed processing.


### Flashcard
Group by class, count distinct students per class, and select classes with count ≥ 5.

### Tags
Database(#database)

### Similar Problems
