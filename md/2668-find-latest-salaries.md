### Leetcode 2668 (Easy): Find Latest Salaries [Practice](https://leetcode.com/problems/find-latest-salaries)

### Description  
Given a table called `Salary`, where each row represents an employee’s salary (possibly from past years, i.e., not just the current salary), find for each employee their *latest* salary. Assume that salaries always increase each year, so the highest salary for an employee is their latest. Return each employee’s emp\_id, firstname, lastname, their latest salary, and department\_id. The output should be sorted by emp\_id.

---

### Examples  

**Example 1:**  
Input:  
Salary table:  
| emp_id | firstname | lastname | salary | department_id |  
|--------|-----------|----------|--------|---------------|  
| 1      | Todd      | Wilson   | 110000 | D1006         |  
| 1      | Todd      | Wilson   | 106119 | D1006         |  
| 2      | Justin    | Simon    | 128922 | D1005         |  
| 2      | Justin    | Simon    | 130000 | D1005         |  
| 3      | Kelly     | Rosario  | 42689  | D1002         |

Output:  
| emp_id | firstname | lastname | salary | department_id |  
|--------|-----------|----------|--------|---------------|  
| 1      | Todd      | Wilson   | 110000 | D1006         |  
| 2      | Justin    | Simon    | 130000 | D1005         |  
| 3      | Kelly     | Rosario  | 42689  | D1002         |

*Explanation: For emp_id=1, the maximum salary is 110000; for emp_id=2, the maximum is 130000; emp_id=3 only has one salary.*

**Example 2:**  
Input:  
Salary table:  
| emp_id | firstname | lastname | salary | department_id |  
|--------|-----------|----------|--------|---------------|  
| 4      | Patricia  | Powell   | 162825 | D1004         |  
| 4      | Patricia  | Powell   | 170000 | D1004         |

Output:  
| emp_id | firstname | lastname | salary | department_id |  
|--------|-----------|----------|--------|---------------|  
| 4      | Patricia  | Powell   | 170000 | D1004         |

*Explanation: The latest salary for emp_id=4 is 170000.*

**Example 3:**  
Input:  
Salary table:  
| emp_id | firstname | lastname | salary | department_id |  
|--------|-----------|----------|--------|---------------|  
| 5      | Sherry    | Golden   | 44101  | D1002         |

Output:  
| emp_id | firstname | lastname | salary | department_id |  
|--------|-----------|----------|--------|---------------|  
| 5      | Sherry    | Golden   | 44101  | D1002         |

*Explanation: emp_id=5 has only one record; that’s the latest salary.*

---

### Thought Process (as if you’re the interviewee)  
- **First thoughts:** Since each (emp\_id, salary) is unique, and the salary increases each year for each employee, the latest salary is just the maximum salary for each emp\_id.
- **Brute-force:** For each emp\_id, scan the records and track their maximum salary. This would require grouping records by emp\_id and selecting the maximum salary.
- **SQL Perspective:** We can use the GROUP BY clause in SQL to group salaries by emp\_id and use MAX(salary) to get the latest salary.
- **Trade-offs:** If there are many duplicate names or department\_id for an emp\_id, we need to ensure that we take associated fields correctly, but since names and departments do not change for the same emp\_id, it's safe.
- **Final approach:** Use grouping by emp\_id and select the MAX(salary) as the latest, returning all other relevant details for each emp\_id.

---

### Corner cases to consider  
- No employees in the table ⇒ output is empty.
- Employees with only one salary record.
- Employees with multiple salary records: ensure maximum salary is always returned.
- Multiple employees in the same department.
- Salary increases are not strictly more than previous records (but max logic still holds).

---

### Solution

```python
# Since this is a database problem, here's the Pythonic simulation of the same behavior

def find_latest_salaries(salary_table):
    # salary_table: list of dicts, each with keys: emp_id, firstname, lastname, salary, department_id
    latest = {}
    
    for row in salary_table:
        emp_id = row['emp_id']
        if emp_id not in latest or row['salary'] > latest[emp_id]['salary']:
            latest[emp_id] = row  # Store the record with the highest salary
    
    # Prepare the output as requested, sorted by emp_id
    result = []
    for emp_id in sorted(latest):
        r = latest[emp_id]
        result.append({
            'emp_id': r['emp_id'],
            'firstname': r['firstname'],
            'lastname': r['lastname'],
            'salary': r['salary'],
            'department_id': r['department_id']
        })
    return result

# For SQL, the equivalent is:
# SELECT emp_id, firstname, lastname, MAX(salary) AS salary, department_id
# FROM Salary
# GROUP BY emp_id
# ORDER BY emp_id
```

---

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of records in the Salary table. Each record is visited once.
- **Space Complexity:** O(k), where k is the number of unique emp\_id (employees), to store the latest record for each employee.

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if an employee could have changed their department?
  *Hint: Group by emp\_id and department\_id.*
  
- If salaries could decrease as well (i.e., demotions), how would you determine the latest salary?
  *Hint: Need a timestamp or effective date to determine the most recent salary record.*
  
- What if the table is extremely large and doesn’t fit in memory?
  *Hint: Consider database indices, external sorting, or streaming aggregation.*

---

### Summary
This is a classic *group-by and aggregate* pattern. It’s common for "latest record per group" or "find max/min per key" queries in database and analytics work. The grouping technique can be applied for deduplication, time-series last value per entity, or any "most recent per entity" problems.