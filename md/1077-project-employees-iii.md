### Leetcode 1077 (Medium): Project Employees III [Practice](https://leetcode.com/problems/project-employees-iii)

### Description  
Given two database tables:

- **Project** (`project_id`, `employee_id`):  
  Represents which employee is working on which project.

- **Employee** (`employee_id`, `name`, `experience_years`):  
  Gives information about each employee and their experience.

Find all employees who have the **maximum years of experience** among all colleagues on the **same project**. If more than one employee has the maximum, report each of them. Output should include `project_id` and `employee_id` for each such employee.


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
| employee_id | name   | experience_years |
|-------------|--------|------------------|
| 1           | Khaled | 3                |
| 2           | Ali    | 2                |
| 3           | John   | 3                |
| 4           | Doe    | 2                |

Output:  
| project_id | employee_id |
|------------|-------------|
| 1          | 1           |
| 1          | 3           |
| 2          | 1           |

*Explanation:*  
- For `project_id` 1, employees 1 (3 years), 2 (2 years), and 3 (3 years) participate. The max is 3, so include both 1 and 3.
- For `project_id` 2, employees 1 (3 years) and 4 (2 years) participate. The max is 3, so include 1.

**Example 2:**  
Input:  
Project =  
| 10 | 5 |
|----|---|
| 10 | 6 |
| 10 | 8 |

Employee =  
| 5 | Amy  | 4  |
| 6 | Rick | 5  |
| 8 | Roy  | 5  |

Output:  
| 10 | 6 |
| 10 | 8 |

*Explanation:*  
For `project_id` 10:  
- Employee 6 (5 years), employee 8 (5 years), employee 5 (4 years).  
- Both 6 and 8 tie for max: output both.

**Example 3:**  
Input:  
Project =  
| 20 | 7 |
|----|---|
| 20 | 9 |

Employee =  
| 7 | Mat | 6  |
| 9 | Ora | 9  |

Output:  
| 20 | 9 |

*Explanation:*  
Only employee 9 has the most experience (9 years).


### Thought Process (as if you’re the interviewee)  

- My initial idea is to, for each project, determine the maximum experience years among its employees, and then select all employees who match that maximum.
- **Brute-force:** Join the `Project` and `Employee` tables, then for each project, check all employees and pick out those with the max experience per project. This can be done with nested queries, but is inefficient for large tables.
- **Optimized:** Use SQL window functions (like `RANK()` or `DENSE_RANK()`) partitioned by `project_id`, ordered by `experience_years` descending. Employees ranked 1 will have the maximum experience per project. Return only those rows.
- This approach is efficient, readable, and scales well.


### Corner cases to consider  
- Multiple employees with the *exact* same maximum experience on one project (ties).
- Employees with only one member in a project.
- Projects where all employees have the *same* experience.
- Employees present in multiple projects.
- Empty tables (no employees or no projects).


### Solution

```python
# This solution assumes you select most experienced employees per project.
# Since this is typically a SQL problem, a similar approach is possible in Python using data structures.

def project_employees_iii(project, employee):
    # Build a mapping from employee_id to experience_years
    emp_exp = {e['employee_id']: e['experience_years'] for e in employee}

    # Build a map from project_id to a list of (employee_id, experience_years)
    from collections import defaultdict
    proj_map = defaultdict(list)
    for rec in project:
        proj_map[rec['project_id']].append(
            (rec['employee_id'], emp_exp[rec['employee_id']])
        )

    result = []
    for proj_id, emp_list in proj_map.items():
        # Find max experience in this project
        max_exp = max(exp for eid, exp in emp_list)
        # Output all employees with max_exp
        for eid, exp in emp_list:
            if exp == max_exp:
                result.append({'project_id': proj_id, 'employee_id': eid})

    # Optional: sort for consistent output
    result.sort(key=lambda x: (x['project_id'], x['employee_id']))
    return result

# Example usage:
# project = [{'project_id':1, 'employee_id':1}, ...]
# employee = [{'employee_id':1, 'name':'Khaled', 'experience_years':3}, ...]
# project_employees_iii(project, employee)
```


### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(P + E) to process all project and employee rows (P = #Project, E = #Employee).
  - The main loop over projects and employees is O(total # of project-employees).
- **Space Complexity:**  
  - O(E) for the employee experience map, O(P) for the project-to-employee map.
  - Output space is O(total # of maximally experienced employees).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle updating experience if employees gain years while the project is ongoing?  
  *Hint: Consider dynamic data; need triggers or recomputation strategies.*

- Can you output the names as well as employee IDs?  
  *Hint: Use a join/map on employee_id to get names.*

- How would you do this if Employee table can be huge and you can’t fit everything in memory?  
  *Hint: Streamed/grouped processing, or batch queries per project segment.*


### Summary

This problem uses the **group-by and aggregation** pattern: for each group (project), compute a stat (max experience) and filter the group for matches. It's a classic SQL window function use case but easily implementable in Python via dictionaries and grouping, showcasing the general reduce/filter by max pattern seen in leaderboard, ranking, and “top-N per group” style problems.


### Flashcard
Use window functions (RANK/DENSE_RANK) partitioned by project_id and ordered by experience_years DESC to find employees with max experience per project.

### Tags
Database(#database)

### Similar Problems
- Project Employees II(project-employees-ii) (Easy)