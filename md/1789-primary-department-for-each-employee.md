### Leetcode 1789 (Easy): Primary Department for Each Employee [Practice](https://leetcode.com/problems/primary-department-for-each-employee)

### Description  
Given an `Employee` table, each record represents that an employee belongs to a department, with a column indicating if that department is the employee’s "primary" department.  
Return the primary department_id for each employee (employee_id).  
If an employee belongs to only one department (but the primary_flag is not set to 'Y'), that sole department should be returned as their primary department.  
If an employee belongs to multiple departments, return the one marked with primary_flag = 'Y'.

**Table: Employee**  
- employee_id: int  
- department_id: int  
- primary_flag: varchar ('Y' or 'N')  

### Examples  

**Example 1:**  
Input:  
```
Employee table:
+-------------+---------------+--------------+
| employee_id | department_id | primary_flag |
+-------------+---------------+--------------+
|      1      |      10       |      N       |
|      2      |      20       |      Y       |
|      2      |      30       |      N       |
|      3      |      40       |      N       |
+-------------+---------------+--------------+
```
Output:  
```
+-------------+---------------+
| employee_id | department_id |
+-------------+---------------+
|      1      |      10       |
|      2      |      20       |
|      3      |      40       |
+-------------+---------------+
```
*Explanation:*
- Employee 1 has only one department (primary_flag is 'N'), so return department 10.
- Employee 2 has two departments; only department 20 has primary_flag 'Y', so return 20.
- Employee 3 has just one department (flag 'N'), so return department 40.

**Example 2:**  
Input:  
```
Employee table:
+-------------+---------------+--------------+
| employee_id | department_id | primary_flag |
+-------------+---------------+--------------+
|      4      |      50       |     N        |
|      4      |      60       |     Y        |
+-------------+---------------+--------------+
```
Output:  
```
+-------------+---------------+
| employee_id | department_id |
+-------------+---------------+
|      4      |      60       |
+-------------+---------------+
```
*Explanation:*
- Employee 4 belongs to departments 50 and 60, but only 60 is primary ('Y'); return 60.

**Example 3:**  
Input:  
```
Employee table:
+-------------+---------------+--------------+
| employee_id | department_id | primary_flag |
+-------------+---------------+--------------+
|     5       |     70        |     N        |
+-------------+---------------+--------------+
```
Output:  
```
+-------------+---------------+
| employee_id | department_id |
+-------------+---------------+
|     5       |     70        |
+-------------+---------------+
```
*Explanation:*
- Employee 5 belongs to only one department, so that's their primary by default.

### Thought Process (as if you’re the interviewee)  
- The problem is essentially: For each employee, select the department where primary_flag = 'Y' if it exists. Otherwise, if the employee is assigned to only one department (even with primary_flag = 'N'), that department is considered their primary.
- **Brute-force:** Scan each employee's departments; if there’s a 'Y', use it. If not and only one exists, use that. This can be done by grouping by employee_id and applying logic.
- In SQL, we need to handle:
  - Employees with only one department (regardless of 'N'/'Y')
  - Employees with multiple departments: pick where primary_flag = 'Y'
- Efficient approach: Use a union of:
  - Rows where primary_flag = 'Y'
  - Rows for employees who have only one department
- Avoid duplicates by using UNION or ensuring uniqueness.
- This set-based solution scales and cleanly separates the two rules.

### Corner cases to consider  
- Employee has only one department (primary_flag can be either 'Y' or 'N')
- Employee has multiple departments but no primary (invalid per constraints? If occurs, would not select any row)
- Multiple employees, overlapping department IDs (distinct by employee, not by department)
- No employees in table (empty result)
- Multiple employees with only one department

### Solution

```python
# Since this is a SQL problem, we'll demonstrate the SQL logic.
# For clarity, I'll express the logic in Pythonic pseudo-SQL for logic understanding.

# Get all 'primary' departments
# Also get departments for employees with only one department (regardless of flag)
# Union the two sets

SELECT employee_id, department_id
FROM Employee
WHERE primary_flag = 'Y'

UNION

SELECT employee_id, department_id
FROM Employee
GROUP BY employee_id
HAVING COUNT(*) = 1

# If expressed as a Python function for completeness:
def primary_department(employee_list):
    # employee_list: list of dicts with 'employee_id', 'department_id', 'primary_flag'
    from collections import defaultdict

    # Map from employee_id to list of (department_id, primary_flag)
    emp_to_departments = defaultdict(list)
    for entry in employee_list:
        emp_to_departments[entry['employee_id']].append((entry['department_id'], entry['primary_flag']))

    result = []
    for emp_id, depts in emp_to_departments.items():
        # If only one department
        if len(depts) == 1:
            result.append({'employee_id': emp_id, 'department_id': depts[0][0]})
        else:
            # Find the department with 'Y'
            for dept_id, primary in depts:
                if primary == 'Y':
                    result.append({'employee_id': emp_id, 'department_id': dept_id})
                    break
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows (assignments) in the Employee table. Each row is scanned once per grouping.
- **Space Complexity:** O(n), for grouping by employee_id, as we may store all relationships in memory if implemented in a procedural language.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where an employee has multiple departments, but none is marked as primary?
  *Hint: Should you return nothing, or favor a minimum/maximum department_id for tie-breaking?*

- What if there are conflicting multiple 'Y' flags for the same employee?
  *Hint: Enforce uniqueness in data, or decide priorities in logic.*

- Could you extend this query to return all employees even if they have no departments?
  *Hint: Use a LEFT JOIN with another table holding all employees.*

### Summary
This approach uses a **set-union logic pattern** in SQL, efficiently combining two scenarios without subqueries: assignment by primary_flag, and assignment by unique membership.  
The pattern is common for problems requiring conditional grouping and record selection in SQL, and generalizes to cases where "fallback logic" is applied on groupings.  
Such logic appears in other "pick primary/secondary roles, fallback to defaults" scenarios in database queries.


### Flashcard
Group by employee_id and apply logic to determine the primary department for each employee.

### Tags
Database(#database)

### Similar Problems
