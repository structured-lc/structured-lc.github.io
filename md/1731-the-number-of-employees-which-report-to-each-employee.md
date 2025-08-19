### Leetcode 1731 (Easy): The Number of Employees Which Report to Each Employee [Practice](https://leetcode.com/problems/the-number-of-employees-which-report-to-each-employee)

### Description  
Given a table `Employees` with columns:

- employee_id (unique int)
- name (string)
- reports_to (int, the employee_id of their manager, or null)
- age (int)

You are asked to return a list of all **managers** (employees with at least one direct report) along with:
- their `employee_id` and `name`
- the **number of employees** who report **directly** to them
- the **average age** of those direct reports (rounded to the nearest integer)

The result must be ordered by `employee_id`.

### Examples  

**Example 1:**  
Input:  
Employees table:  
| employee_id | name | reports_to | age |
|-------------|------|------------|-----|
| 1           | Alice| null       | 35  |
| 2           | Bob  | 1          | 30  |
| 3           | Carol| 1          | 27  |
| 4           | David| 2          | 22  |

Output:  
| employee_id | name  | reports_count | average_age |
|-------------|-------|--------------|-------------|
| 1           | Alice | 2            | 29          |
| 2           | Bob   | 1            | 22          |

*Explanation:*
- Alice (id=1) is a manager (Bob & Carol report to her); 2 reports, avg. age = (30+27)/2 = 28.5 → 29 (rounded)
- Bob (id=2) is a manager (David reports to him); 1 report, avg. age = 22
- Carol and David are not managers (no reports)

**Example 2:**  
Input:  
Employees table:  
| employee_id | name   | reports_to | age |
|-------------|--------|------------|-----|
| 5           | Eve    | null       | 45  |
| 6           | Frank  | 5          | 33  |
| 7           | Grace  | 5          | 39  |
| 8           | Heidi  | 6          | 25  |

Output:  
| employee_id | name  | reports_count | average_age |
|-------------|-------|--------------|-------------|
| 5           | Eve   | 2            | 36          |
| 6           | Frank | 1            | 25          |

*Explanation:*
- Eve's reports: Frank (33), Grace (39) → (33+39)/2 = 36
- Frank's report: Heidi (25)

**Example 3:**  
Input:  
Employees table (no one reports to anyone):  
| employee_id | name   | reports_to | age |
|-------------|--------|------------|-----|
| 9           | Ian    | null       | 50  |
| 10          | Jane   | null       | 40  |

Output: (empty)

*Explanation:*  
No managers (no direct reports), so output is empty.

### Thought Process (as if you’re the interviewee)  

- First, I need to find all employees that are **managers**, meaning at least one other employee lists their `employee_id` as `reports_to`.
- For each manager, I need the **count** of direct reports and the **average age** of those reports (rounded).
- I'll use a **self-join**: join `Employees` as `Manager` and `Employee` where `Employee.reports_to = Manager.employee_id`.
- Group by `Manager.employee_id` to aggregate counts and average ages.
- Use `COUNT()` for the number of reports, and `ROUND(AVG(age))` for the average age rounded to nearest integer.
- Select manager fields, count, and rounded average, then order by `employee_id`.
- No need to show employees who are not managers (no one reports to them).

Trade-offs:
- The self-join can scan the table twice for large tables, but is standard and efficient for this type of hierarchy queries.

### Corner cases to consider  
- No employees report to anyone (output is empty).
- Some employees have null `reports_to` (top of hierarchy).
- Rounding edge cases: (average age ends in .5).
- Multiple managers with same number of reports or same average age.
- Some employees report to a manager not in the table (shouldn’t happen if `reports_to` is always a valid `employee_id`).
- Employees reporting to themselves (unlikely, but possible bad data).

### Solution

```python
# Since this is an SQL/database problem, here's a way you might simulate/test in Python for interviews.
# But usually, for such problems, the answer is best expressed as SQL:

# Self-join Employees table:
# SELECT
#   Manager.employee_id,
#   Manager.name,
#   COUNT(Employee.employee_id) AS reports_count,
#   ROUND(AVG(Employee.age)) AS average_age
# FROM Employees AS Manager
# JOIN Employees AS Employee
#   ON Employee.reports_to = Manager.employee_id
# GROUP BY Manager.employee_id, Manager.name
# ORDER BY Manager.employee_id

# For completeness, here's a procedural skeleton that mimics this logic:

def get_managers_with_reports(employees):
    """
    employees: list of dicts. Each dict:
      { 'employee_id': int, 'name': str, 'reports_to': int or None, 'age': int }
    Returns: list of dicts as output rows
    """
    # Map from manager_id ⇒ [list of ages of direct reports]
    reports = {}
    names = {}

    for emp in employees:
        names[emp['employee_id']] = emp['name']
        if emp['reports_to'] is not None:
            reports.setdefault(emp['reports_to'], []).append(emp['age'])

    result = []
    for manager_id, ages in reports.items():
        count = len(ages)
        avg = int(round(sum(ages) / count))
        result.append({
            'employee_id': manager_id,
            'name': names[manager_id],
            'reports_count': count,
            'average_age': avg
        })
    # Sort by employee_id
    return sorted(result, key=lambda x: x['employee_id'])

# Example usage:
# get_managers_with_reports([
#     {'employee_id':1,'name':'Alice','reports_to':None,'age':35},
#     {'employee_id':2,'name':'Bob','reports_to':1,'age':30},
#     {'employee_id':3,'name':'Carol','reports_to':1,'age':27},
#     {'employee_id':4,'name':'David','reports_to':2,'age':22},
# ])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of employees — since each employee is visited once to build the reports and names mappings, and once more to assemble the final result.
- **Space Complexity:** O(n) — extra space for the mappings and the output, proportional to number of employees.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted to include **indirect** (not just direct) reports?
  *Hint: Try tree traversal/BFS or recursion using manager hierarchy.*

- Could you return managers with an **average tenure** instead of age, if an extra column existed?
  *Hint: The pattern is the same, just average a different column.*

- How would you handle an extremely **large number of employees**—would a self-join scale?
  *Hint: Consider indexing on reports_to, partitioning, or processing via map-reduce/batch pipeline.*

### Summary
This problem demonstrates the classic **self-join and group-by aggregation** pattern for hierarchical data. It’s commonly used for organizational, reporting, or tree-structured tables. The same pattern generalizes to other aggregation queries like computing total salaries, minimums/maximums, or multi-level reporting statistics.

### Tags
Database(#database)

### Similar Problems
