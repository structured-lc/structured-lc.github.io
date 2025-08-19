### Leetcode 184 (Medium): Department Highest Salary [Practice](https://leetcode.com/problems/department-highest-salary)

### Description  
Given two tables, **Employee** and **Department**, write a query to find all employees who have the highest salary in each department.  
- The **Employee** table contains: id, name, salary, departmentId.  
- The **Department** table contains: id, name.  
For each department, return the department name, employee name, and their salary if the employee has the maximum salary in the department. There may be multiple employees with the same highest salary in one department.

### Examples  

**Example 1:**  
Input:   
Employee  
```
+----+-------+--------+--------------+
| Id | Name  | Salary | DepartmentId |
+----+-------+--------+--------------+
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |
+----+-------+--------+--------------+
```
Department  
```
+----+----------+
| Id | Name     |
+----+----------+
| 1  | IT       |
| 2  | Sales    |
+----+----------+
```
Output:  
```
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| IT         | Jim      | 90000  |
| IT         | Max      | 90000  |
| Sales      | Henry    | 80000  |
+------------+----------+--------+
```
*Explanation: IT department's highest salary is 90000 (Jim, Max). Sales' highest is 80000 (Henry).*

**Example 2:**  
Input:   
Employee  
```
+----+--------+--------+--------------+
| Id | Name   | Salary | DepartmentId |
+----+--------+--------+--------------+
| 1  | Alice  | 100000 | 10           |
| 2  | Bob    | 80000  | 20           |
| 3  | Carol  | 90000  | 10           |
| 4  | David  | 80000  | 20           |
+----+--------+--------+--------------+
```
Department  
```
+----+--------+
| Id | Name   |
+----+--------+
| 10 | Eng    |
| 20 | HR     |
+----+--------+
```
Output:  
```
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| Eng        | Alice    | 100000 |
| HR         | Bob      | 80000  |
| HR         | David    | 80000  |
+------------+----------+--------+
```
*Explanation: Alice has the max salary in Eng, Bob and David share the highest in HR.*

**Example 3:**  
Input:  
Employee  
```
+----+-------+--------+--------------+
| Id | Name  | Salary | DepartmentId |
+----+-------+--------+--------------+
| 1  | John  | 60000  | 1            |
| 2  | Casey | 60000  | 2            |
+----+-------+--------+--------------+
```
Department  
```
+----+---------+
| Id | Name    |
+----+---------+
| 1  | Finance |
| 2  | Legal   |
+----+---------+
```
Output:  
```
+------------+----------+--------+
| Department | Employee | Salary |
+------------+----------+--------+
| Finance    | John     | 60000  |
| Legal      | Casey    | 60000  |
+------------+----------+--------+
```
*Explanation: Each department has one employee, both are the highest by default.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** For each department, find the max salary, then select all employees in that department whose salary matches this max.  
    - Step 1: Join Employee and Department on departmentId.
    - Step 2: For each department, find the max salary.
    - Step 3: Output all employees in that department with salary == max salary.
- **Optimization:**  
    - Using window functions (like `MAX(salary) OVER (PARTITION BY departmentId)`) allows assigning the max salary to each employee row, then filter those rows.
    - Alternatively, use GROUP BY to compute max salary per department, then join back to the Employee-Department rows.
- I’d choose the window function approach for cleaner logic and more efficient filtering, and because in practical SQL (and pandas), it's often more idiomatic.

### Corner cases to consider  
- Departments where multiple employees share the highest salary.
- Employees with negative or zero salary.
- Departments with only one employee.
- Departments with no employees (ensure they are not included in the output).
- Cases where employee or department names are not unique (handled by id joins).
- Very large tables—how the approach scales.

### Solution

```python
# Suppose we are given lists: employees and departments.
# Each employee is {'Id': ..., 'Name': ..., 'Salary': ..., 'DepartmentId': ...}
# Each department is {'Id': ..., 'Name': ...}

def department_highest_salary(employees, departments):
    # Build a mapping from departmentId to department name
    dept_id_name = {d['Id']: d['Name'] for d in departments}
    
    # Group employees by departmentId
    from collections import defaultdict
    dept_to_emps = defaultdict(list)
    for e in employees:
        dept_to_emps[e['DepartmentId']].append(e)
    
    # Prepare result list
    result = []
    for dept_id, emp_list in dept_to_emps.items():
        # Find highest salary in this department
        max_sal = max(e['Salary'] for e in emp_list)
        # For all employees with this salary, add result row
        for e in emp_list:
            if e['Salary'] == max_sal:
                result.append({
                    'Department': dept_id_name[dept_id],
                    'Employee': e['Name'],
                    'Salary': e['Salary']
                })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N = number of employee records.  
    - Building groupings, max(), and output is all linear in number of employees.
- **Space Complexity:** O(N + D), N = employees, D = departments.  
    - Storing grouped employees, mapping of department ids.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to include departments with *no* employees at all?  
  *Hint: Think about left joins and NULL checks.*

- How would you adapt this if employees could belong to multiple departments (many-to-many)?  
  *Hint: EmployeeDepartment join table, grouping adjustments.*

- What if salaries can be updated frequently; how would you keep this query efficient in a live system?  
  *Hint: Discuss database indexes, pre-computed aggregates.*

### Summary
This problem uses the **grouping and filtering** pattern: group by department, find max salary, then filter and output matching employees. It's a classic case of "top N per group" (in this case, top 1, potentially with ties). Commonly seen in SQL as well as in business data reporting tasks. This approach generalizes to leaderboard designs, grouped rankings, or finding best values within each subgroup.

### Tags
Database(#database)

### Similar Problems
- Highest Grade For Each Student(highest-grade-for-each-student) (Medium)