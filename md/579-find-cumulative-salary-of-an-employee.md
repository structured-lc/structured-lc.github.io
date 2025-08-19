### Leetcode 579 (Hard): Find Cumulative Salary of an Employee [Practice](https://leetcode.com/problems/find-cumulative-salary-of-an-employee)

### Description  
Given a table `Employee` with columns (`id`, `month`, `salary`), calculate the **3-month cumulative salary** for each employee for every month they worked *except* the latest month they worked.  
- The **3-month cumulative salary** is the sum of the salary for that month and the previous two months for the same employee.  
- If the employee did not work in one or more of these months, treat missing months' salary as 0.
- Do **not** include a row for the most recent month each employee worked.

You are to return a table with columns: (`id`, `month`, `salary`), sorted by `id` ascending and then by `month` descending.

### Examples  

**Example 1:**  
Input:  
Employee table:  
| id | month | salary |
|----|-------|--------|
| 1  | 1     | 20     |
| 1  | 2     | 30     |
| 1  | 3     | 40     |
| 1  | 4     | 60     |
| 1  | 7     | 30     |
| 1  | 8     | 70     |
| 2  | 1     | 15     |
| 2  | 2     | 25     |
| 2  | 4     | 30     |
| 2  | 5     | 55     |
| 2  | 6     | 60     |

Output:  
| id | month | salary |
|----|-------|--------|
| 1  | 7     | 30     |
| 1  | 4     | 130    |
| 1  | 3     | 90     |
| 1  | 2     | 50     |
| 1  | 1     | 20     |
| 2  | 5     | 110    |
| 2  | 4     | 85     |
| 2  | 2     | 40     |
| 2  | 1     | 15     |

*Explanation:*  
- For id=1, month 1: salary=20 (no previous);
- For month 2: 30+20=50;
- Month 3: 40+30+20=90;
- Month 4: 60+40+30=130;
- Month 7: 30 (didn’t work months 5,6, so 0+0+30=30);
- (month 8 output omitted: it’s the latest for id=1)
- Similarly for id=2.

**Example 2:**  
Input:  
| id | month | salary |
|----|-------|--------|
| 3  | 2     | 70     |
| 3  | 3     | 60     |
| 3  | 4     | 50     |

Output:  
| id | month | salary |
|----|-------|--------|
| 3  | 3     | 130    |
| 3  | 2     | 70     |

*Explanation:*  
- month 2: 70;
- month 3: 60+70=130;
- (do not output month 4, the latest for id=3)

**Example 3:**  
Input:  
(employee only worked their latest month, e.g. month=5 for id=9)  
Output:  
(no rows, as we exclude the most recent month)

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each row, find the prior two months for the same employee, sum salaries, treat missing months as 0. This needs self-joining for each row or windowed sum.
- **Better:** Use self-join: For each employee & month, join with the prior 2 months using:  
   `E1.month - E2.month BETWEEN 0 AND 2 AND E1.id = E2.id`  
  - Restrict results to only those rows not corresponding to the latest month for that employee (get max-month per employee).
  - This can be expressed cleanly with a self-join in SQL, which is how this is usually solved in practice.
- **Exclude the most recent month**: For each employee, must first calculate their maximum working month. Only include rows where month ≠ latest month.
- **Edge cases:** Employees skipping months, employees with less than 3 months, missing months—handled automatically by the join + sum approach.

### Corner cases to consider  
- Employee has only one work month (should not produce output, as it’s their most recent).
- Employee didn’t work consecutive months (handle missing with salary=0).
- Employee has less than 3 months of work but more than 1 (result is sum for available months).
- Empty table (output is empty).
- Large gaps between months.

### Solution

```python
# We assume we receive the data in the form of a list of dictionaries
# Each dict: {'id':..., 'month':..., 'salary':...}
# Let's build the solution step-by-step.

def find_cumulative_salary(employees):
    # Step 1: Group employees by id
    from collections import defaultdict
    
    emp_data = defaultdict(dict)  # emp_data[id][month] = salary
    max_month = {}
    for e in employees:
        eid, month, sal = e['id'], e['month'], e['salary']
        emp_data[eid][month] = sal
        if eid not in max_month or month > max_month[eid]:
            max_month[eid] = month
            
    result = []
    for eid in emp_data:
        months = sorted(emp_data[eid])  # ascending
        for m in months:
            if m == max_month[eid]:
                continue  # skip latest month
            s = 0
            # Sum salary for this month and previous two months
            for offset in range(0, 3):
                prev = m - offset
                if prev in emp_data[eid]:
                    s += emp_data[eid][prev]
            result.append({'id': eid, 'month': m, 'salary': s})
    
    # Sort as required: by id asc, month desc
    result.sort(key=lambda x: (x['id'], -x['month']))
    return result

# Example usage:
data = [
    {'id': 1, 'month': 1, 'salary': 20},
    {'id': 1, 'month': 2, 'salary': 30},
    {'id': 1, 'month': 3, 'salary': 40},
    {'id': 1, 'month': 4, 'salary': 60},
    {'id': 1, 'month': 7, 'salary': 30},
    {'id': 1, 'month': 8, 'salary': 70},
    {'id': 2, 'month': 1, 'salary': 15},
    {'id': 2, 'month': 2, 'salary': 25},
    {'id': 2, 'month': 4, 'salary': 30},
    {'id': 2, 'month': 5, 'salary': 55},
    {'id': 2, 'month': 6, 'salary': 60}
]
print(find_cumulative_salary(data))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N × m), where N=# of employees, m=max months per employee. For each employee and each month (except one), we check up to 3 months.
- **Space Complexity:** O(N × m), to store the mapping of all employees/months (dict of dict) and the result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the window size changes from 3 to k months?
  *Hint: Make the offset range variable, or generalize the solution loop.*
- How to handle very large data? Could you do this in SQL efficiently?
  *Hint: Use window functions or self-join with range and aggregate.*
- If the data structure changed—say, months are represented as dates, not integers—how would you compensate for skips?
  *Hint: Map actual date arithmetic, but logic is similar—just compare “date - timedelta”.*

### Summary
This problem illustrates the use of **windowing/rolling sum** (common in analytics/finance/SQL). The pattern—“for each row, sum up values from the last k periods, treating missing as 0”—is applicable in rolling statistics, time series, and sliding window problems. The code uses grouping, aggregation, and careful sorting, matching classic approaches in both Python and SQL.

### Tags
Database(#database)

### Similar Problems
