### Leetcode 618 (Hard): Students Report By Geography [Practice](https://leetcode.com/problems/students-report-by-geography)

### Description  
Given a list of students with their names and their respective continents (`Asia`, `Europe`, or `America`), create a *pivot table* that shows the students' names sorted alphabetically and grouped under their continent as columns. Each row should contain the next alphabetically sorted name from each continent, if available. If there are fewer students in a continent, leave the cell empty. It is guaranteed that *America* has at least as many students as either of the other two continents.

### Examples  

**Example 1:**  
Input:  
Student table:
```
| name   | continent |
|--------|-----------|
| Jack   | America   |
| Pascal | Europe    |
| Xi     | Asia      |
| Jane   | America   |
```
Output:
```
| America | Asia | Europe |
|---------|------|--------|
| Jack    | Xi   | Pascal |
| Jane    |      |        |
```
*Explanation:  
Names from America, Asia, and Europe are sorted alphabetically and displayed under their respective columns, in order. Jane, the second American, appears on the next row, while Asia and Europe only had one student each.*

**Example 2:**  
Input:  
Student table:
```
| name   | continent |
|--------|-----------|
| Anna   | America   |
| Ben    | America   |
| Lee    | Asia      |
| Sara   | Europe    |
| Tom    | Europe    |
```
Output:
```
| America | Asia | Europe |
|---------|------|--------|
| Anna    | Lee  | Sara   |
| Ben     |      | Tom    |
```
*Explanation:  
Anna and Ben are listed under America (sorted), Lee under Asia, Sara and Tom under Europe (sorted).*

**Example 3:**  
Input:  
Student table:
```
| name   | continent |
|--------|-----------|
| Alice  | America   |
| Bob    | America   |
| Carol  | Asia      |
| David  | Asia      |
| Eva    | Europe    |
```
Output:
```
| America | Asia  | Europe |
|---------|-------|--------|
| Alice   | Carol | Eva    |
| Bob     | David |        |
```
*Explanation:  
America and Asia both have two students (shown row-wise), Europe has one.*

### Thought Process (as if you’re the interviewee)  
The problem asks us to **pivot** rows into columns—each continent becomes its own column, with corresponding names listed beneath them, sorted alphabetically.

First approach:  
- For each continent, get the sorted list of student names.
- "Zip" these lists together row-wise, padding with empty values if a continent has fewer students.

SQL insight:  
1. Assign each student in a continent a row number by sorting names in ascending order *within* each continent.
2. Combine students with the same row number from all continents into a single row.
3. Output as columns: America, Asia, Europe.

This is a classic **pivot** operation using `ROW_NUMBER() OVER (PARTITION BY continent ORDER BY name)`, and then a `GROUP BY` on this number.  
Finally, for each rank ("row index"), select the name if it exists for that continent.  
We guarantee *America* has enough students for all output rows.

Trade-off:  
- Uses window functions (`ROW_NUMBER()`), which are efficient for this kind of pivoting.
- Generalizes well for the case where the largest continent may not be America (requires a dynamic pivot).

### Corner cases to consider  
- Continents with 0 students (should output empty column for that row).
- Duplicate names within the same continent.
- Only one continent present (other columns empty).
- Only one student.
- All continents have the same number of students.

### Solution

```python
# This is a sketch of what the SQL logic does, in Python.
from collections import defaultdict

def students_report_by_geography(student_list):
    """
    student_list: list of (name, continent)
    Returns: list of [America, Asia, Europe], padded with empty strings when necessary
    """
    # Create a mapping of continent -> list of names
    continents = {"America": [], "Asia": [], "Europe": []}
    for name, continent in student_list:
        continents[continent].append(name)
    
    # Sort names within each continent alphabetically
    for con in continents:
        continents[con].sort()
    
    # The maximum number of students in any continent (America guaranteed no less than others)
    max_len = max(len(continents["America"]), len(continents["Asia"]), len(continents["Europe"]))
    
    # Create the output rows by zipping the three lists together, padding with empty strings
    output = []
    for i in range(max_len):
        row = [
            continents["America"][i] if i < len(continents["America"]) else "",
            continents["Asia"][i]    if i < len(continents["Asia"])    else "",
            continents["Europe"][i]  if i < len(continents["Europe"])  else "",
        ]
        output.append(row)
    return output

# Example usage:
students = [
    ("Jack", "America"),
    ("Pascal", "Europe"),
    ("Xi", "Asia"),
    ("Jane", "America"),
]
print(students_report_by_geography(students))
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(n × log n), where n is the number of students. We sort up to all n students per continent (max three sorts), and iterate through all students to build rows.

- **Space Complexity:**  
  O(n), for storing names per continent and output. No extra space outside these arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you generalize this to an arbitrary number of continents?  
  *Hint: Consider dynamic pivot and a structure that supports k dimensions.*

- What changes if you didn't know which continent had the most students?  
  *Hint: Compute the max length dynamically from all continents.*

- How would you handle millions of students in terms of memory and execution?  
  *Hint: Consider streaming or chunked processing per group, and database-optimized approaches with indexes.*

### Summary
This is a classic **pivot** or **group-by with row-number** pattern, useful for *transforming rows into columns*. It’s especially common in reporting, business intelligence, and data analytics tasks. The pattern generalizes to any grouping and pivoting problem where categorical columns become table headers and elements are selected by rank or order.


### Flashcard
Assign row numbers to students per continent (ordered by name), then pivot so each continent is a column and students are aligned by row number.

### Tags
Database(#database)

### Similar Problems
