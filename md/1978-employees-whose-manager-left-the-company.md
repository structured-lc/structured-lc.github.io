### Leetcode 1978 (Easy): Employees Whose Manager Left the Company [Practice](https://leetcode.com/problems/employees-whose-manager-left-the-company)

### Description  
We are given a table `Employees` where each employee has an `employee_id`, a `manager_id`, and a `salary`. An employee's `manager_id` points to another `employee_id` in the same table. Sometimes a manager leaves the company, in which case that manager's whole record is deleted from the table, but their subordinates' `manager_id` fields still point to their (now non-existent) manager.  
We are to find the `employee_id` of every employee who:
- Has a salary < 30,000.
- Has a manager (i.e., `manager_id` is not NULL).
- Their manager has left the company (i.e., their `manager_id` does not exist as an `employee_id` in the table).  
Results should be sorted by `employee_id`.

### Examples  

**Example 1:**  
Input:  
Employees =  
| employee_id | name | manager_id | salary |  
| ----------- | ---- | ---------- | ------ |  
| 3           | Bob  | null       | 100000 |  
| 11          | Ann  | 6          | 22000  |  
| 6           | Eve  | null       | 110000 |  

Output: `[]`  
Explanation: No one with salary < 30,000 whose manager has left.

**Example 2:**  
Input:  
Employees =  
| employee_id | name | manager_id | salary |  
| ----------- | ---- | ---------- | ------ |  
| 3           | Bob  | null       | 100000 |  
| 11          | Ann  | 6          | 22000  |  

Output: ``  
Explanation:  
- Ann (employee_id=11) has manager_id = 6, but there is no employee with employee_id = 6.
- Ann's salary is 22,000 < 30,000.
- Output is .

**Example 3:**  
Input:  
Employees =  
| employee_id | name  | manager_id | salary |  
| ----------- | ----- | ---------- | ------ |  
| 3           | Mike  | null       | 100000 |  
| 8           | Sara  | 3          | 25000  |  
| 10          | John  | 4          | 29000  |  
| 4           | Linda | null       | 110000 |  
| 11          | Ann   | 6          | 22000  |  

Output: ``  
Explanation:  
- Ann (employee_id=11) has manager_id=6 (no record for manager 6). Ann's salary < 30,000.
- Sara (manager_id=3) and John (manager_id=4), but both managers exist in table.
- Output is .

### Thought Process (as if you’re the interviewee)  
First, for each employee with salary < 30,000 and manager_id not null, check if their manager_id exists in the table's employee_id column.  
- Brute-force: For every employee with `salary < 30,000` and `manager_id` not null, loop through all employee ids to check if their manager exists.  
- This is slow in practice (\(O(n^2)\)), but doable in SQL with a NOT IN or LEFT JOIN approach for better performance.  
- Since we aren’t allowed to use libraries in interviews (for Python), I would use a set to store all current employee_ids, and then scan through all employees, checking the above conditions in one pass.

### Corner cases to consider  
- No employees with salary < 30,000.
- No employees whose manager has left.
- Employees with `manager_id` null (should not be returned).
- Employees whose manager is still present (should not be returned).
- Duplicate results (should not happen since employee_id is unique).
- Empty table.

### Solution

```python
def employees_with_manager_left(employees):
    """
    employees: List[Dict] containing keys: 'employee_id', 'manager_id', 'salary'
    returns: List of employee_ids who meet the criteria, sorted
    """
    # Step 1: Collect all current employee ids into a set for fast lookup
    employee_id_set = set()
    for emp in employees:
        employee_id_set.add(emp['employee_id'])

    result = []
    # Step 2: For each employee, check conditions
    for emp in employees:
        if emp['salary'] < 30000 and emp['manager_id'] is not None:
            # If manager id doesn't exist in employee ids, manager has left
            if emp['manager_id'] not in employee_id_set:
                result.append(emp['employee_id'])

    # Step 3: Sort results as required
    result.sort()
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  - One pass to collect all employee_ids (O(n)).
  - One pass to check all employees (O(n)).
  - Sorting the result (O(k log k)), k = result set size ≤ n.
  - Total: O(n + k log k)

- **Space Complexity:** O(n)  
  - For storing employee_id_set (~n) and result (~k ≤ n).


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if the employee table is large and can't fit in memory?  
  *Hint: Consider streaming or using an external database join.*

- What if we also wanted to find employees whose manager is present but has salary below some value?  
  *Hint: You'd need to join employee to manager and filter by both sets of conditions.*

- How would the solution change if there could be duplicate employee_ids in the data?  
  *Hint: Consider using Counter or handling duplicates while building your id set.*


### Summary
This is a classic set lookup and filtering pattern, often seen in SQL join and anti-join queries. The "missing parent" or "orphan record" pattern generalizes to tree/graph validation, find-orphan-nodes, and data consistency across linked records.  
The pattern is common in database cleaning, organization hierarchies, and object reference validations.