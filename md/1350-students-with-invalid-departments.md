### Leetcode 1350 (Easy): Students With Invalid Departments [Practice](https://leetcode.com/problems/students-with-invalid-departments)

### Description  
SQL: Given two tables—`Departments` (with 'id') and `Students` (with 'department_id')—find the students assigned to non-existent (invalid) departments. 
Return the students' id, name, and department_id whose department_id is not found in Departments.

### Examples  

**Example 1:**  
Input: `Departments = [[1, 'CS'], [2,'Math']]`, `Students = [[1, 'Bob', 1], [2, 'Alice', 4]]`  
Output: `[[2, 'Alice', 4]]`  
*Explanation: Alice's department_id 4 is not in Departments.*

**Example 2:**  
Input: `Departments = []`, `Students = [[1,'John',2]]`  
Output: `[[1,'John',2]]`  
*Explanation: John is assigned to a department_id that does not exist.*

**Example 3:**  
Input: `Departments = [[1,'Bio']]`, `Students = [[7,'Jen',1], [9,'Tom',2]]`  
Output: `[[9, 'Tom', 2]]`  
*Explanation: Tom's department_id 2 is not in Departments.*

### Thought Process (as if you’re the interviewee)  
For each student, check whether their department_id is included in the Departments table. If not, include them in the result. In SQL, this is a NOT IN or LEFT JOIN with NULL filtering.

### Corner cases to consider  
- No departments (all students are invalid)
- No students
- All students belong to valid departments
- All students invalid

### Solution

```sql
SELECT s.id, s.name, s.department_id
FROM Students s
LEFT JOIN Departments d
  ON s.department_id = d.id
WHERE d.id IS NULL;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N) where N = number of students. The join is on indexed keys.
- **Space Complexity:** O(1) output is a subset of students table.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you list all departments without any students?    
  *Hint: LEFT JOIN Departments to Students and filter rows with student id IS NULL.*

- How to show department names alongside invalid students (even if NULL)?   
  *Hint: SELECT d.name as department_name in the projection.*

- What if a student can belong to multiple departments?   
  *Hint: Student table might now have duplicate ids or use an assignment table.*

### Summary
This is a standard SQL NON-MATCH/JOIN-with-NUL pattern. It's widely useful for data integrity and anti-join queries.

### Tags
Database(#database)

### Similar Problems
