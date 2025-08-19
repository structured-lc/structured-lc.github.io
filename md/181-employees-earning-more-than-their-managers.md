### Leetcode 181 (Easy): Employees Earning More Than Their Managers [Practice](https://leetcode.com/problems/employees-earning-more-than-their-managers)

### Description  
Given a table `Employee` with four columns: `Id` (unique identifier for each employee), `Name`, `Salary`, and `ManagerId` (the Id of that employee's manager, or NULL if they have no manager), write a query to find all employees who earn **more than their managers**.  
The query should return the list of employee names who satisfy this condition. The order does not matter.  
This helps identify cases where direct reports have a higher salary than their supervisors—useful for auditing compensation equity or anomaly detection in organizations.

### Examples  

**Example 1:**  
Input:  
```
Employee table:  
+----+-------+--------+-----------+
| Id | Name  | Salary | ManagerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | NULL      |
| 4  | Max   | 90000  | NULL      |
+----+-------+--------+-----------+
```
Output:  
```
+----------+
| Employee |
+----------+
| Joe      |
+----------+
```
*Explanation: Joe's manager is Sam (Id=3) who makes 60,000. Joe earns 70,000 which is more than Sam. Henry reports to Max (Id=4) who makes 90,000, so Henry is not included.*

**Example 2:**  
Input:  
```
+----+-------+--------+-----------+
| Id | Name  | Salary | ManagerId |
+----+-------+--------+-----------+
| 1  | Bob   | 90000  | 2         |
| 2  | Alice | 95000  | NULL      |
| 3  | Jane  | 75000  | 2         |
+----+-------+--------+-----------+
```
Output:  
```
+----------+
| Employee |
+----------+
+----------+
```
*Explanation: Both Bob and Jane report to Alice, but neither earns more than Alice (95,000). Output is empty.*

**Example 3:**  
Input:  
```
+----+--------+--------+-----------+
| Id | Name   | Salary | ManagerId |
+----+--------+--------+-----------+
| 1  | Carol  | 200000 | NULL      |
| 2  | Ethan  | 180000 | 1         |
| 3  | Alice  | 210000 | 1         |
| 4  | Derek  | 220000 | 3         |
+----+--------+--------+-----------+
```
Output:  
```
+----------+
| Employee |
+----------+
| Alice    |
| Derek    |
+----------+
```
*Explanation: Alice reports to Carol (earns 210,000 > 200,000), Derek reports to Alice (220,000 > 210,000). Ethan doesn’t qualify since 180,000 < 200,000.*

### Thought Process (as if you’re the interviewee)  
Start with matching each employee to their manager by their `ManagerId`. We need both salaries, so join the table to itself, pairing each employee with their manager’s row.  
For each pair, if employee.salary > manager.salary, the employee qualifies.  
Brute-force: For each employee, look up the salary of their manager (loop or nested iteration).  
Optimized: Do a self-join using SQL or via hash map in programming.  
Trade-offs: Self-join is efficient in SQL (O(n)), since indices can be used; in Python, dictionary mapping makes lookups fast.

### Corner cases to consider  
- Employees whose manager is NULL (CEO/founder) – should be excluded, as they have no manager to compare.
- Multiple employees having the same manager.
- Employees earning exactly the same as their manager (should not be included).
- Empty Employee table.
- Cycles are not possible: managerId is always another id or NULL.

### Solution

```python
# The solution assumes the `Employee` table is given as a list of dicts.
# We'll create a mapping of id to employee record for quick access.

def employees_earning_more_than_managers(employee_list):
    # Build a dict mapping id -> employee record for quick lookup
    id_to_employee = {e['Id']: e for e in employee_list}
    
    result = []
    for emp in employee_list:
        manager_id = emp['ManagerId']
        # Only proceed if manager exists
        if manager_id is not None and manager_id in id_to_employee:
            manager = id_to_employee[manager_id]
            # Check if employee earns more than their manager
            if emp['Salary'] > manager['Salary']:
                result.append(emp['Name'])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of employees. We traverse the list once and each manager lookup is O(1) using the dictionary.
- **Space Complexity:** O(n), due to storing the id-to-employee mapping and output list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if employees can have multiple managers?  
  *Hint: You’d need to change schema; maybe a ManagerEmployee mapping table.*

- How to return not just the names, but their salaries and their manager’s names and salaries?  
  *Hint: Expand what you select/join and output columns accordingly.*

- How would you handle a deep hierarchy—finding all employees who earn more than anyone above them, not just their direct manager?  
  *Hint: You'll need recursion or repeated joins/iteration.*

### Summary
This problem uses the **self-join pattern** both in SQL and in-memory table join (using a dictionary for fast id-to-employee lookup). It's a classic "match row to parent" scenario—common in organizational charts, family trees, directory structures, etc. The solution is efficient, clear, and immediately extendable for related relationship-lookup problems.

### Tags
Database(#database)

### Similar Problems
