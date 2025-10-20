### Leetcode 185 (Hard): Department Top Three Salaries [Practice](https://leetcode.com/problems/department-top-three-salaries)

### Description  
Given two tables: **Employee** and **Department**, return the names and salaries of all employees who earn one of the top three **distinct** salaries in their department.  
- If a department has less than three distinct salaries, include all employees in that department.
- Output should include the department name, employee name, and salary.
- Order the output by department ascending, then salary descending.

**Employee Table:**
- id (int), name (varchar), salary (int), departmentId (int)

**Department Table:**
- id (int), name (varchar)

### Examples  

**Example 1:**  
Input:  
Employee =  
| id | name  | salary | departmentId |
|----|-------|--------|--------------|
| 1  | Joe   | 70000  | 1            |
| 2  | Jim   | 90000  | 1            |
| 3  | Henry | 80000  | 2            |
| 4  | Sam   | 60000  | 2            |
| 5  | Max   | 90000  | 1            |

Department =  
| id | name    |
|----|---------|
| 1  | IT      |
| 2  | Sales   |

Output:  
| Department | Employee | Salary |
|------------|----------|--------|
| IT         | Jim      | 90000  |
| IT         | Max      | 90000  |
| IT         | Joe      | 70000  |
| Sales      | Henry    | 80000  |
| Sales      | Sam      | 60000  |

*Explanation: "IT" has distinct salaries [90000, 70000]. Jim and Max both have the top salary; Joe is the next unique. "Sales" has only two employees with distinct salaries, both are included.*

**Example 2:**  
Input:  
Employee =  
| id | name   | salary | departmentId |
|----|--------|--------|--------------|
| 1  | Alice  | 100000 | 1            |
| 2  | Bob    | 86000  | 1            |
| 3  | Carol  | 86000  | 1            |

Department =  
| id | name  |
|----|-------|
| 1  | Tech  |

Output:  
| Department | Employee | Salary  |
|------------|----------|---------|
| Tech       | Alice    | 100000  |
| Tech       | Bob      | 86000   |
| Tech       | Carol    | 86000   |

*Explanation: Tech has two distinct salaries; all employees are included as the department doesn’t have 3 unique salary levels.*

**Example 3:**  
Input:  
Employee =  
| id | name  | salary | departmentId |
|----|-------|--------|--------------|
| 1  | Dave  | 50000  | 1            |

Department =  
| id | name   |
|----|--------|
| 1  | HR     |

Output:  
| Department | Employee | Salary |
|------------|----------|--------|
| HR         | Dave     | 50000  |

*Explanation: Only one employee in the department; he’s included.*

### Thought Process (as if you’re the interviewee)  
- First, I need to group employees by department.
- For each department, I need to consider **distinct** salaries.
- I want the top 3 distinct salaries for each department.
- For each employee, check if their salary is among those top three unique salaries in their department.
- Joining Employee to Department will help get department names.
- There can be multiple employees with the same salary.
- In SQL, using a window function DENSE_RANK(), partitioned by department and ordered by salary descending, lets us assign a rank to each distinct salary per department.
- In Python/Pandas, I’d do similar: groupby department, get top 3 unique salaries, filter employees whose salary is in that set.
- The final output should list the required fields in the requested order.
- The primary trade-off is a solution that scales well even if departments are large and have repeated salaries.

### Corner cases to consider  
- Only one department.
- Department with fewer than three employees.
- Department with all employees having the same salary.
- Multiple employees with the same salary.
- Empty Employee table.
- Employees in department(s) with exactly three or fewer unique salaries.

### Solution

```python
# Assume Employee and Department are lists of dictionaries.
# Each Employee: { "id": int, "name": str, "salary": int, "departmentId": int }
# Each Department: { "id": int, "name": str }

def department_top_three_salaries(Employee, Department):
    # Map department id to department name
    dept_id_to_name = {d["id"]: d["name"] for d in Department}

    # Group employees by department
    from collections import defaultdict

    dept_employees = defaultdict(list)
    for emp in Employee:
        dept_employees[emp["departmentId"]].append(emp)

    result = []
    for dept_id, emps in dept_employees.items():
        # Get unique salaries in descending order
        unique_salaries = sorted(
            {e["salary"] for e in emps}, reverse=True
        )
        # Top 3 unique salaries
        top_three = set(unique_salaries[:3])
        # Include employees whose salary is in top 3 unique
        for e in emps:
            if e["salary"] in top_three:
                result.append({
                    "Department": dept_id_to_name[dept_id],
                    "Employee": e["name"],
                    "Salary": e["salary"],
                })

    # Sort: department name ascending, salary descending, then employee name
    result.sort(
        key=lambda x: (x["Department"], -x["Salary"], x["Employee"])
    )
    return result

# Example usage:
Employee = [
    {"id": 1, "name": "Joe", "salary": 70000, "departmentId": 1},
    {"id": 2, "name": "Jim", "salary": 90000, "departmentId": 1},
    {"id": 3, "name": "Henry", "salary": 80000, "departmentId": 2},
    {"id": 4, "name": "Sam", "salary": 60000, "departmentId": 2},
    {"id": 5, "name": "Max", "salary": 90000, "departmentId": 1},
]
Department = [
    {"id": 1, "name": "IT"},
    {"id": 2, "name": "Sales"},
]

output = department_top_three_salaries(Employee, Department)
for row in output:
    print(row)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log n)  
  - Grouping employees is O(n).
  - For each department, sorting unique salaries is O(m log m); m ≤ number of employees in department.
  - Overall at most O(n log n) if all employees in one department.
- **Space Complexity:** O(n)  
  - Need space for the grouping and for the result (linear in the number of employees).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties in salary within the top three?
  *Hint: Should all employees with the same (e.g., 3rd place) salary be included?*

- What if departments are so big they don’t fit in memory?
  *Hint: Consider streaming or using a database aggregation/windowing.*

- What if you needed the top N salaries, where N is a parameter?
  *Hint: Generalize your rank logic to N.*

### Summary
This approach uses the classic "group by and rank within group" calculation pattern, commonly solved using window functions in SQL (DENSE_RANK), or grouping and set operations in Python/Pandas. It’s useful in scenarios with department/group leaderboards, top-K per group summaries, or any “top per category” aggregation pattern. This coding pattern applies to ranking, filtering, and summarizing per-group statistics efficiently.


### Flashcard
Use DENSE_RANK() partitioned by department to assign salary ranks, then select employees with rank ≤ 3.

### Tags
Database(#database)

### Similar Problems
