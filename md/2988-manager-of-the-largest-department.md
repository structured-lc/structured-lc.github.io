### Leetcode 2988 (Medium): Manager of the Largest Department [Practice](https://leetcode.com/problems/manager-of-the-largest-department)

### Description  
Given a table named **Employees** with columns:  
- employee_id (unique for each person)  
- emp_name (the employee's name)  
- dep_id (the department the employee belongs to)  
- position (role of the employee, e.g., 'Manager', 'Staff', etc.)

Find the manager(s) of the largest department(s) by number of employees.  
- If multiple departments are tied for largest, return the managers of all such departments.
- Output should show the manager's name and dep_id, sorted by dep_id ascending.

### Examples  

**Example 1:**  
Input: Employees =  
```
| employee_id | emp_name | dep_id | position  |
|-------------|----------|--------|-----------|
| 1           | Joseph   | 100    | Manager   |
| 2           | Lee      | 100    | Staff     |
| 3           | Eva      | 100    | Staff     |
| 4           | John     | 100    | Staff     |
| 5           | Isabella | 101    | Manager   |
| 6           | Alice    | 101    | Staff     |
| 7           | Bob      | 101    | Staff     |
| 8           | Carol    | 101    | Staff     |
| 9           | Sam      | 107    | Manager   |
| 10          | David    | 107    | Staff     |
| 11          | Hazel    | 107    | Staff     |
```
Output:  
```
| manager_name | dep_id |
|--------------|--------|
| Joseph       | 100    |
| Isabella     | 101    |
```
Explanation: Departments 100 and 101 both have 4 employees, which is the maximum. Their managers are Joseph and Isabella.

**Example 2:**  
Input: Employees =  
```
| employee_id | emp_name | dep_id | position  |
|-------------|----------|--------|-----------|
| 1           | Adam     | 1      | Manager   |
| 2           | Eve      | 1      | Staff     |
```
Output:  
```
| manager_name | dep_id |
|--------------|--------|
| Adam         | 1      |
```
Explanation: Only one department exists, with Adam as the manager.

**Example 3:**  
Input: Employees =  
```
| employee_id | emp_name | dep_id | position  |
|-------------|----------|--------|-----------|
| 1           | Annie    | 2      | Manager   |
| 2           | Ben      | 2      | Staff     |
| 3           | Clara    | 3      | Manager   |
| 4           | Dean     | 3      | Staff     |
| 5           | Ella     | 3      | Staff     |
```
Output:  
```
| manager_name | dep_id |
|--------------|--------|
| Clara        | 3      |
```
Explanation: Department 3 has 3 employees, which is more than department 2 (2 employees). Manager of department 3 is Clara.

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - For each department, count its employees.
  - Track the department(s) with the maximum count.
  - For each such department, find its manager.

- **Optimized (single pass):**  
  - Use a dictionary to count employees per department while iterating.
  - Track manager for each department (assuming exactly one manager per department).
  - After the pass, find the max department size.
  - Collect manager names for departments where size equals the maximum.

- **Trade-offs:**  
  - If data is large, consider a single iteration/aggregation.
  - If multiple managers per department are possible, decide on correct business rule (problem seems to assume one manager per department).

### Corner cases to consider  
- No employees at all (output should be empty).
- Departments with no manager (skip? Depends on requirements).
- Multiple departments tied for largest.
- Only one department.
- Managers with duplicate names but different departments.

### Solution

```python
def manager_of_largest_department(employees):
    # employees: List of dicts with keys 'employee_id', 'emp_name', 'dep_id', 'position'
    
    # Count members in each department
    dep_count = {}
    dep_manager = {}

    for emp in employees:
        dep_id = emp['dep_id']
        # Count all employees in dep_count
        dep_count[dep_id] = dep_count.get(dep_id, 0) + 1
        
        # Record manager's name for each department
        if emp['position'] == 'Manager':
            dep_manager[dep_id] = emp['emp_name']

    # Find the largest department size
    if not dep_count:
        return []
    max_size = max(dep_count.values())
    
    result = []
    for dep_id in sorted(dep_count.keys()):  # sort dep_ids ascending
        if dep_count[dep_id] == max_size and dep_id in dep_manager:
            result.append({
                'manager_name': dep_manager[dep_id],
                'dep_id': dep_id
            })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of employees. One pass to fill dictionaries, and a pass through keys (≤n departments).
- **Space Complexity:** O(d), where d = number of departments, for dictionaries tracking department counts and managers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a department has more than one manager?
  *Hint: How to represent or output multiple managers for the same department?*

- What if some departments have zero employees?
  *Hint: Are empty departments represented in data? How should results behave?*

- Suppose employee roles and department structure can change over time—how would you adapt this logic if the data was streaming?
  *Hint: Consider incremental computation and aggregation for real-time systems.*

### Summary
This problem is a classic example of **group by aggregation + filtering on max value**, commonly used in database queries and analytics. The same pattern applies to "Find employee(s) with max salary," "Top-selling products," or "Most popular courses." Counting, mapping, and extracting maximums per group is a frequent pattern.