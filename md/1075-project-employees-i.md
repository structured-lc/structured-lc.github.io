### Leetcode 1075 (Easy): Project Employees I [Practice](https://leetcode.com/problems/project-employees-i)

### Description  
Given two tables, **Project** (`project_id`, `employee_id`) and **Employee** (`employee_id`, `name`, `experience_years`), find, for each project, the **average years of experience** of all employees involved, rounded to two decimal places. Each row in the `Project` table means an employee is assigned to that project. Return a result with each project’s ID and the computed average experience of its employees.

### Examples  

**Example 1:**  
Input:  
Project =  
| project_id | employee_id |
|------------|-------------|
| 1          | 1           |
| 1          | 2           |
| 1          | 3           |
| 2          | 1           |
| 2          | 4           |

Employee =  
| employee_id | name | experience_years |
|-------------|------|------------------|
| 1           | Ali  | 3                |
| 2           | Bob  | 2                |
| 3           | Tom  | 1                |
| 4           | Jerry| 2                |

Output:  
| project_id | average_years |
|------------|--------------|
| 1          | 2.00         |
| 2          | 2.50         |

*Explanation:*  
- Project 1: Employees 1, 2, 3 — experiences: 3, 2, 1 — average: (3+2+1)÷3 = 2.00  
- Project 2: Employees 1, 4 — experiences: 3, 2 — average: (3+2)÷2 = 2.50

**Example 2:**  
Input:  
Project =  
| project_id | employee_id |
|------------|-------------|
| 5          | 4           |
| 5          | 5           |

Employee =  
| employee_id | name | experience_years |
|-------------|------|------------------|
| 4           | Alice| 2                |
| 5           | Eve  | 7                |

Output:  
| project_id | average_years |
|------------|--------------|
| 5          | 4.50         |

*Explanation:*  
Project 5: Employees 4, 5 — experiences: 2, 7 — average: (2+7)÷2 = 4.50

**Example 3:**  
Input:  
Project =  
| project_id | employee_id |
|------------|-------------|
| 6          | 9           |

Employee =  
| employee_id | name | experience_years |
|-------------|------|------------------|
| 9           | Max  | 10               |

Output:  
| project_id | average_years |
|------------|--------------|
| 6          | 10.00        |

*Explanation:*  
Project 6: Only employee 9 — experience: 10 — average: 10.00

### Thought Process (as if you’re the interviewee)  

- The core task is to **join the Project table with Employee** to get each project’s assigned employees’ experience years.
- For each project, **group by project_id**, and then compute the **average experience_years** for its employees.
- Finally, **round the average to 2 decimal places** for neat output.
- Brute-force: For each project, look up each employee’s experience and compute the average. In SQL, this is a simple join + group + aggregate.
- Optimal approach: Use an **INNER JOIN** on `employee_id` between Project and Employee, then **GROUP BY project_id** and compute the required average. There are no duplicated relationships or project-employee mappings, so join is safe and performant.

### Corner cases to consider  
- Project with only **one employee**.
- Employee with **zero experience (0 years)**.
- Multiple projects sharing employees (ensure not to double-count).
- No project rows (empty input).
- All employees in a project have the **same experience**.
- **Experience_years** fields are guaranteed not null.

### Solution

```python
# This is a SQL-style problem, but let's draft what the logic would look like in Python
from collections import defaultdict

def compute_average_experience(project, employee):
    # Map employee_id to experience for quick lookup
    emp_exp = {e['employee_id']: e['experience_years'] for e in employee}
    
    # Aggregate experience lists for each project
    proj_to_exps = defaultdict(list)
    for p in project:
        proj_to_exps[p['project_id']].append(emp_exp[p['employee_id']])
    
    # Compute average, rounded to 2 decimals for each project
    result = []
    for proj_id, exps in proj_to_exps.items():
        avg = round(sum(exps) / len(exps), 2)
        result.append({"project_id": proj_id, "average_years": avg})
    return result

# Example usage:
project = [
    {'project_id': 1, 'employee_id': 1},
    {'project_id': 1, 'employee_id': 2},
    {'project_id': 1, 'employee_id': 3},
    {'project_id': 2, 'employee_id': 1},
    {'project_id': 2, 'employee_id': 4},
]
employee = [
    {'employee_id': 1, 'name': 'Ali', 'experience_years': 3},
    {'employee_id': 2, 'name': 'Bob', 'experience_years': 2},
    {'employee_id': 3, 'name': 'Tom', 'experience_years': 1},
    {'employee_id': 4, 'name': 'Jerry', 'experience_years': 2},
]

print(compute_average_experience(project, employee))
# Output: [{'project_id': 1, 'average_years': 2.0}, {'project_id': 2, 'average_years': 2.5}]
```

Equivalent SQL solution:

```sql
SELECT
    p.project_id,
    ROUND(AVG(e.experience_years), 2) AS average_years
FROM
    Project p
    INNER JOIN Employee e ON p.employee_id = e.employee_id
GROUP BY
    p.project_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(P + E), where P is the number of rows in Project, E in Employee. The join walks through Project, and for each, looks up employee's experience (dict lookup is O(1)). Group by just aggregates into per-project buckets.
- **Space Complexity:** O(E) for the employee id → experience mapping, O(P) for the aggregation per project if needed (can also be O(U), where U is unique project count).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you change the query if you also needed to display the total number of employees per project?  
  *Hint: Add COUNT(\*) to the SELECT and GROUP BY project_id.*

- What if you want to show projects with **no employees assigned** as well, with average as `NULL`?  
  *Hint: Use LEFT JOIN from Project to Employee, handle possible NULL averages.*

- How to optimize for very large datasets where employee or project table doesn't fit in memory?  
  *Hint: Stream input data; use database indexes on employee_id for efficient joins.*

### Summary
This is a **classic aggregation-and-join SQL/database problem**. The main pattern is **JOIN + GROUP BY + AGGREGATE**. This coding/data manipulation pattern is widely applicable in reporting, analytics, and survey-type business questions, and is highly common in both database queries and data processing with pandas or plain Python dicts.


### Flashcard
Join Project and Employee tables, GROUP BY project_id, compute AVG(experience_years), and ROUND to 2 decimals.

### Tags
Database(#database)

### Similar Problems
- Project Employees II(project-employees-ii) (Easy)