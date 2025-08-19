### Leetcode 1635 (Hard): Hopper Company Queries I [Practice](https://leetcode.com/problems/hopper-company-queries-i)

### Description  
Given three tables:
- Employees(employee_id, name, department_id)
- Departments(department_id, department_name)
- Salaries(employee_id, amount)

Write a query to find the names and department names of the top three employees who have the highest salary in the company, ordering by salary descending. If ties occur, order by employee_id ascending. Return columns: employee_name, department_name, salary.

### Examples  

**Example 1:**  
Input: (Data shown in three tables)  
Output: Rows showing top three salaries with names and department names.
*Explanation: Pick top three salary holders, join names and department names, sort as specified.*

**Example 2:**  
Input: (More employees with same salary)  
Output: Reverse-order by salary, break ties by employee id.
*Explanation: See output order respects salary and tie-breaking.*

**Example 3:**  
Input: (Less than three employees)  
Output: Only as many rows as there are employees.
*Explanation: If <3, just return what you have.*

### Thought Process (as if you’re the interviewee)  
- We need to JOIN all tables to get employee name, department name, salary.
- Order by salary descending, then by employee_id ascending.
- SELECT first three results (i.e., use SQL LIMIT).
- Remove duplicate or missing employee records if data is inconsistent.

### Corner cases to consider  
- Tied salaries among >3 people: order by employee_id for tie-break.
- Missing department or salary data for some employees.
- Fewer than three employees in total.

### Solution

```python
# Generally solved via a SQL query.
# For Python, assuming data as lists of dicts

def get_top_three_employees(employees, departments, salaries):
    # Build lookup tables
    emp_name = {e['employee_id']: e['name'] for e in employees}
    dep_name = {d['department_id']: d['department_name'] for d in departments}
    emp_dep = {e['employee_id']: e['department_id'] for e in employees}
    data = []
    for s in salaries:
        eid = s['employee_id']
        if eid in emp_name and eid in emp_dep and emp_dep[eid] in dep_name:
            data.append((emp_name[eid], dep_name[emp_dep[eid]], s['amount'], eid))
    # Sort by salary descending, then by employee_id ascending
    data.sort(key=lambda x: (-x[2], x[3]))
    # Return only first three with name, dept, salary
    return [(d[0], d[1], d[2]) for d in data[:3]]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M + K + E log E)
  - N employees, M departments, K salaries, then sort E combined records.
- **Space Complexity:** O(E) 
  - Storing lookups and results for E employees.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties for third place?  
  *Hint: Return all tied for third, not just three rows.*
- How would you display department average salaries instead?  
  *Hint: GROUP BY department, aggregate.*
- If an employee can have multiple salary entries?  
  *Hint: Use max or sum salary per employee.*

### Summary
A classic SQL result ranking pattern—solve via **table joins** and sort/limit operations. In Python, mimicking this with hash maps and sort steps is common in interview settings.

### Tags
Database(#database)

### Similar Problems
- Trips and Users(trips-and-users) (Hard)
- Hopper Company Queries II(hopper-company-queries-ii) (Hard)
- Hopper Company Queries III(hopper-company-queries-iii) (Hard)
- Number of Times a Driver Was a Passenger(number-of-times-a-driver-was-a-passenger) (Medium)