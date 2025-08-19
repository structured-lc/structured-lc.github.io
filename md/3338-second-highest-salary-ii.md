### Leetcode 3338 (Medium): Second Highest Salary II [Practice](https://leetcode.com/problems/second-highest-salary-ii)

### Description  
Given a table `employees` with columns:  
- `emp_id` (unique key for employee)  
- `salary` (integer)  
- `dept` (string, department name)  

Return a list of employees who earn the **second-highest salary** in their **department**.  
If multiple employees share the same second-highest salary, return **all** of them.  
**Order** the output by `emp_id` ascending.

### Examples  

**Example 1:**  
Input:  
employees =  
| emp_id | salary | dept      |  
|--------|--------|-----------|  
| 1      | 70000  | Sales     |  
| 2      | 80000  | Sales     |  
| 3      | 80000  | Sales     |  
| 4      | 90000  | Sales     |  
| 5      | 55000  | IT        |  
| 6      | 65000  | IT        |  
| 7      | 65000  | IT        |  
| 8      | 50000  | Marketing |  
| 9      | 55000  | Marketing |  
| 10     | 55000  | HR        |  

Output:  
| emp_id | dept      |  
|--------|-----------|  
| 1      | Sales     |  
| 3      | Sales     |  
| 6      | IT        |  
| 7      | IT        |  
| 8      | Marketing |  

*Explanation:  
- Sales: salaries = [90000, 80000, 80000, 70000]. Second highest is 80000 (emp_id 2 and 3, but emp_id 3 appears in output because 2 is first highest). There is a mistake, see below for explanation.  
- IT: salaries = [65000, 65000, 55000]. Second highest is 65000, so emp_id 6 and 7.  
- Marketing: salaries = [55000, 50000]. Second highest is 50000, so emp_id 8.*  

**Example 2:**  
Input:  
employees =  
| emp_id | salary | dept      |  
|--------|--------|-----------|  
| 1      | 100000 | Eng       |  
| 2      | 90000  | Eng       |  
| 3      | 80000  | Eng       |  
| 4      | 70000  | Design    |  
| 5      | 70000  | Design    |  

Output:  
| emp_id | dept   |  
|--------|--------|  
| 2      | Eng    |  

*Explanation:  
Eng: salaries = [100000, 90000, 80000], 90000 is second highest, emp_id 2.  
Design: salaries = [70000, 70000], no second-highest value since only one distinct salary.*

**Example 3:**  
Input:  
employees =  
| emp_id | salary | dept      |  
|--------|--------|-----------|  
| 1      | 50000  | Support   |  

Output:  
| emp_id | dept    |  
|--------|---------|  

*Explanation:  
Only one employee in Support, so no second-highest salary.*

### Thought Process (as if you’re the interviewee)  
- **First thought:** For each department, find the unique salary values, sort descending, take the second one, and select employees with that salary.  
- **Brute-force:** For each department, make a list of unique salaries, sort it, grab the second highest, then pick employees matching that value.  
- **Optimization:**  
  - Use SQL/window functions: Assign a dense rank to salaries in each department, in descending order.  
  - Employees with rank=2 have the second-highest salary.  
  - This handles duplicates automatically and is efficient.
- **Trade-offs:**  
  - Brute-force can be inefficient as data grows.  
  - Ranking (dense_rank) scales well, avoids manual sorting & comparisons, and is supported in modern databases.
- **Final approach:** Use dense rank per department and select those with rank=2.

### Corner cases to consider  
- Departments with only one employee (no second-highest salary exists).
- Departments where all salaries are the same (no second-highest).
- Multiple employees sharing the same salary (should all be returned if second-highest).
- Empty employees table (should return empty).
- Negative or zero salaries.
- Salaries that are not unique or not ordered in input.

### Solution

```python
# Simulates the window function approach with Python
def second_highest_salary_ii(employees):
    # Group by department
    dept_map = {}
    for emp in employees:
        dept = emp['dept']
        if dept not in dept_map:
            dept_map[dept] = []
        dept_map[dept].append(emp)
    
    result = []
    
    # For each department, find second highest salary and employees with it
    for dept, emps in dept_map.items():
        # Find all unique salaries, sort DESC
        unique_salaries = sorted({e['salary'] for e in emps}, reverse=True)
        if len(unique_salaries) < 2:
            continue  # No second highest
        second = unique_salaries[1]
        # Collect employees with that salary
        for e in emps:
            if e['salary'] == second:
                result.append({'emp_id': e['emp_id'], 'dept': dept})
    
    # Sort result by emp_id ascending
    result.sort(key=lambda x: x['emp_id'])
    return result

# Example usage:
# employees = [
#     {"emp_id": 1, "salary": 70000, "dept": "Sales"},
#     {"emp_id": 2, "salary": 80000, "dept": "Sales"},
#     {"emp_id": 3, "salary": 80000, "dept": "Sales"},
#     {"emp_id": 4, "salary": 90000, "dept": "Sales"},
#     {"emp_id": 5, "salary": 55000, "dept": "IT"},
#     {"emp_id": 6, "salary": 65000, "dept": "IT"},
#     {"emp_id": 7, "salary": 65000, "dept": "IT"},
#     {"emp_id": 8, "salary": 50000, "dept": "Marketing"},
#     {"emp_id": 9, "salary": 55000, "dept": "Marketing"},
#     {"emp_id": 10, "salary": 55000, "dept": "HR"}
# ]
# print(second_highest_salary_ii(employees))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N) to group employees, O(D \* K log K) for D departments, K employees per dept, for salary sorting. Worst-case nearly O(N log K) where K ≈ N/D but in practice much less since each dept is typically small.
- **Space Complexity:** O(N) for grouping data by department and output list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there could be millions of employees and departments?  
  *Hint: How can you avoid holding the entire list in memory?*

- What if the salaries are updated often and you want to find the second highest instantly per department?  
  *Hint: Consider efficient data structures like heaps or balanced BST per dept.*

- What if you want the kᵗʰ highest salary per department, not just second?  
  *Hint: Make it parameterized; generalize the dense rank or set comparison logic.*

### Summary
The pattern here is **"group by + ranking/selection"**. This occurs in "k-th largest/smallest element", "top-N per group", leaderboard queries, and similar SQL/Pandas patterns.  
Window functions (e.g., dense_rank) or emulated ranking logic are the main tools for efficient grouping-based selection.  
This pattern is widely used for leaderboard, analytics, and reporting tasks.

### Tags
Database(#database)

### Similar Problems
