### Leetcode 1378 (Easy): Replace Employee ID With The Unique Identifier [Practice](https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier)

### Description  
Given an Employee table and a EmployeeUNI table mapping employee ids to unique ids, write a query to display each employee's name and their unique id. If an employee does not have a unique id mapping, display NULL for their unique id.

### Examples  

**Example 1:**  
Input: `Employee = [[1, "Alice"], [7, "Bob"], [11, "Meir"], [90, "Winston"], [3, "Jonathan"]], EmployeeUNI = [[3, 1], [11, 2], [90, 3]]`  
Output: `[["Alice", NULL], ["Bob", NULL], ["Meir", 2], ["Winston", 3], ["Jonathan", 1]]`  
*Explanation: Join on id and show the unique ID where it exists, otherwise NULL.*

### Thought Process (as if you’re the interviewee)  
- The task is to join the Employee and EmployeeUNI tables.
- Use a **LEFT JOIN**, so we keep all employees, even if they don't have a unique id mapping.
- If no mapping exists, the unique_id should be NULL.
- Output should be employee name and unique id (or NULL).

### Corner cases to consider  
- Employee with no mapping in EmployeeUNI.
- Multiple employees with no mapping.
- All employees have a mapping.
- No employees.

### Solution

```sql
SELECT e.name, eu.unique_id
FROM Employee e
LEFT JOIN EmployeeUNI eu
ON e.id = eu.id;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(m+n) where m is Employee table rows and n is EmployeeUNI mapped. Join is efficient if indexed.
- **Space Complexity:** O(result size).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle duplicate name values?
  *Hint: The join is done on id, not name, so duplicates in names are fine.*

- What if you want to include employees only with a mapping?
  *Hint: Use INNER JOIN instead of LEFT JOIN.*

- How to order results by unique id descending?
  *Hint: Add ORDER BY unique_id DESC to the query.*

### Summary
This is a standard SQL **join** query (LEFT JOIN). This pattern is common when combining core and reference data tables.

### Tags
Database(#database)

### Similar Problems
