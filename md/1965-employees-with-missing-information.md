### Leetcode 1965 (Easy): Employees With Missing Information [Practice](https://leetcode.com/problems/employees-with-missing-information)

### Description  
Given two tables, **Employees** (`employee_id`, `name`) and **Salaries** (`employee_id`, `salary`), return the IDs of employees with **missing information**. An employee has missing information if their `employee_id` exists in one table but is either missing or `NULL` for `name` or `salary` in the other table. The result should be ordered by `employee_id` in ascending order.

### Examples  

**Example 1:**  
Input:  
Employees =  
| employee_id | name  |
| ----------- | ----- |
| 2           | Crew  |
| 4           | Haven |

Salaries =  
| employee_id | salary |
| ----------- | ------ |
| 1           | 22517  |
| 2           | 12475  |

Output:  
`[1, 4]`  
Explanation.  
- Employee 1 is in Salaries but missing from Employees, so their `name` is missing.
- Employee 4 is in Employees but missing from Salaries, so their `salary` is missing.

**Example 2:**  
Input:  
Employees =  
| employee_id | name  |
| ----------- | ----- |
| 1           | NULL  |
| 2           | John  |

Salaries =  
| employee_id | salary |
| ----------- | ------ |
| 1           | 1000   |
| 2           | NULL   |

Output:  
`[1, 2]`  
Explanation.  
- Employee 1 has a missing name (NULL).
- Employee 2 has a missing salary (NULL).

**Example 3:**  
Input:  
Employees =  
| employee_id | name   |
| ----------- | ------ |
| 1           | Alice  |

Salaries =  
| employee_id | salary |
| ----------- | ------ |
| 1           | 3000   |

Output:  
`[]`  
Explanation.  
- All employee information is complete. No missing data.

### Thought Process (as if you’re the interviewee)  
First, clarify that we’re asked to find all employee_ids where either the name or salary is missing. This can happen if:
- The id exists in only one of the tables.
- Or, the id is present in both tables but the entry for name or salary is NULL.

The brute-force solution is to:
- Iterate through all employee_ids in both tables.
- For each id, check if both name and salary are present and not NULL.

Optimally, since SQL joins are efficient, use **LEFT JOIN** to check for missing salary (when present in Employees but not Salaries), and **RIGHT JOIN** or symmetric **UNION** to check for missing name (present in Salaries but not Employees). In Python, use sets for ids and dictionaries for values.

For each id in the union of both tables:
- If it's missing from one table, or the value in either table for that id is NULL, include it.

This approach is efficient and clear. No complex optimizations are needed due to the simplicity and expected small size of tables.

### Corner cases to consider  
- Employee id exists in only one table.
- Name or salary specifically set to NULL.
- Empty Employees or Salaries tables.
- Both name and salary present and non-NULL—should *not* be included.
- Duplicate ids (should not happen, but code defensively).

### Solution

```python
def find_missing_information(employees, salaries):
    """
    employees: List[Dict] with "employee_id" and "name"
    salaries: List[Dict] with "employee_id" and "salary"
    Returns List of IDs with missing info (sorted).
    """
    emps = {}
    for e in employees:
        emps[e['employee_id']] = e.get('name')

    sals = {}
    for s in salaries:
        sals[s['employee_id']] = s.get('salary')

    # All unique employee ids
    ids = set(emps) | set(sals)
    result = []

    for eid in sorted(ids):
        name = emps.get(eid)
        salary = sals.get(eid)
        # Missing if: not present in one table, or value is None
        if name is None or salary is None:
            result.append(eid)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M + K log K), where N = len(employees), M = len(salaries), K = unique ids (usually ≤ N+M). Each table is processed once, dictionaries lookups are O(1), and final sort takes O(K log K).
- **Space Complexity:** O(N + M), for dictionaries holding names and salaries by id.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if the tables were very large and did not fit into memory?
  *Hint: How could you perform this as a streaming or database JOIN operation?*

- What if employees can have duplicate IDs in the tables?
  *Hint: How would you aggregate or handle duplicates?*

- How would you return the actual rows with missing info (not just IDs)?
  *Hint: Instead of just IDs, return [{id, name, salary}] for missing fields.*

### Summary
This problem uses a common **set union** and **dictionary lookup** pattern to find entities with incomplete linked data. The idea generalizes to any problem requiring *missing join keys* or partial record detection across multiple data sources—a pattern frequently used in data validation and database merging tasks.