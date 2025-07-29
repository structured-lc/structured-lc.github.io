### Leetcode 1875 (Medium): Group Employees of the Same Salary [Practice](https://leetcode.com/problems/group-employees-of-the-same-salary)

### Description  
Given a company's employee table, you need to **group employees into teams** such that:
- Each group (team) has **at least two employees**.
- All members of a team **have the same salary**.
- **Every employee with the same salary must be in the same team**.
- Employees whose salary is **unique** (no duplicate) should **not be assigned to any team**.
- Assign a **team\_id** starting from 1 based on salary ranking (lowest salary gets team\_id 1, next lowest gets 2, etc).

Return the table with these columns: employee\_id, name, salary, and team\_id, **only for those employees who are assigned to a team**.

### Examples  

**Example 1:**  
Input:
```
Employees table:
+-------------+---------+--------+
| employee_id | name    | salary |
+-------------+---------+--------+
|     2       | Meir    | 3000   |
|     3       | Michael | 3000   |
|     7       | Addilyn | 7400   |
|     8       | Juan    | 6100   |
|     9       | Kannon  | 7400   |
+-------------+---------+--------+
```
Output:
```
+-------------+---------+--------+---------+
| employee_id | name    | salary | team_id |
+-------------+---------+--------+---------+
|     2       | Meir    | 3000   |    1    |
|     3       | Michael | 3000   |    1    |
|     7       | Addilyn | 7400   |    2    |
|     9       | Kannon  | 7400   |    2    |
+-------------+---------+--------+---------+
```
Explanation:
- Meir and Michael share salary 3000 → assigned to team\_id=1.
- Addilyn and Kannon share salary 7400 → assigned to team\_id=2.
- Juan's salary (6100) is unique → not included.

**Example 2:**  
Input:
```
Employees table:
+-------------+---------+--------+
| employee_id | name    | salary |
+-------------+---------+--------+
|   1         | Alice   | 4000   |
|   2         | Bob     | 4000   |
|   3         | Carol   | 5000   |
|   4         | Dave    | 6000   |
|   5         | Eve     | 4000   |
+-------------+---------+--------+
```
Output:
```
+-------------+-------+--------+---------+
| employee_id | name  | salary | team_id |
+-------------+-------+--------+---------+
|     1       | Alice | 4000   |    1    |
|     2       | Bob   | 4000   |    1    |
|     5       | Eve   | 4000   |    1    |
+-------------+-------+--------+---------+
```
Explanation:
- Alice, Bob, and Eve share salary 4000 → assigned to team\_id=1.
- Carol (5000), Dave (6000): salaries are unique, not included.

**Example 3:**  
Input:
```
Employees table:
(empty)
```
Output:
```
(empty)
```
Explanation:
- No employees, so output is empty.

### Thought Process (as if you’re the interviewee)  

First, I’d check for duplicated salaries since each team requires at least two employees with the same salary. That means I want to *group* by salary, count group sizes, and only keep salaries with count ≥ 2.

Once I know which salaries qualify, I’ll assign a team\_id to each salary, ranked from lowest to highest salary (lowest gets team\_id=1).

Next, I want to output every employee whose salary is one of those with a team, joining employee info with the team\_id.

My brute-force would be to:
- For each salary, count employees.
- For salaries with count ≥ 2, assign team\_id.
- For each employee, see if their salary is in that set, then output their details and team\_id.

Optimally, I’d want to compute the salary groups and their team\_id in a pre-pass, then just filter and join.

**Trade-offs:**  
- Straightforward group-by works well — data is small enough for simple grouping and joining.
- Time complexity is driven by sorting salaries for team\_id assignment.  
- If there are millions of employees, the join could be optimized or indexed, but that’s not a primary concern here.

### Corner cases to consider  
- Empty employee table (should return empty).
- All salaries are unique (no teams formed, output empty).
- All employees have same salary (one large team, team\_id=1).
- Salaries descending order (still assign team\_id=1 to lowest salary).
- Some salaries appear more than twice.
- Employees not sorted by id or name.

### Solution

```python
def group_employees_of_same_salary(employees):
    # employees: list of dicts with keys 'employee_id', 'name', 'salary'
    if not employees:
        return []

    # 1. Count how many employees for each salary
    salary_count = {}
    for emp in employees:
        salary = emp["salary"]
        salary_count[salary] = salary_count.get(salary, 0) + 1

    # 2. Only keep salaries that occur at least twice
    dup_salaries = [salary for salary, count in salary_count.items() if count >= 2]

    if not dup_salaries:
        return []

    # 3. Assign team_id: rank salaries ascending, starting from 1
    dup_salaries_sorted = sorted(dup_salaries)
    salary_to_team_id = {salary: idx+1 for idx, salary in enumerate(dup_salaries_sorted)}

    # 4. Gather output rows: only those with salary in dup_salaries
    result = []
    for emp in employees:
        salary = emp["salary"]
        if salary in salary_to_team_id:
            result.append({
                "employee_id": emp["employee_id"],
                "name": emp["name"],
                "salary": salary,
                "team_id": salary_to_team_id[salary],
            })

    # 5. Sort output as required: by team_id, then employee_id
    result.sort(key=lambda x: (x["team_id"], x["employee_id"]))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m log m), where n = number of employees, m = number of duplicated salaries.  
  - Counting is O(n).
  - Sorting the duplicated salaries is O(m log m), with m ≤ n.
  - Creating the output is O(n).
  - Sorting the output (if needed) is O(n log n), so overall, the dominant part is O(n log n).

- **Space Complexity:** O(n), mainly for the salary count dictionary, potentially the output list and mapping.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose there are millions of employees; can you make this scale for big data or distributed queries?  
  *Hint: Think about distributed map-reduce, parallel group-bys, and sorting.*

- How would you handle ties if more than one salary group had the same value (e.g., salaries in a multi-currency scenario)?  
  *Hint: Would need to group by both salary and currency, or clarify that the ranking is global or per currency.*

- What if team\_id must be stable, i.e., don't reassign teams if new data is added?  
  *Hint: You'd need a persistent mapping table for salary → team\_id, possibly with additional logic for new salaries.*

### Summary
This problem demonstrates the **group-by** and **counting pattern** to identify duplicate groups, then assigns a sequential id based on sorted order. The approach—count, filter, assign id, join/filter—is typical in SQL-like group aggregation. It's a common pattern for data deduplication, group-based labeling, or bulk feature assignment, and can be applied in customer segmentation, fraud detection by group, or team formation tasks. The code emphasizes clear grouping logic, filtering, and ordering, which are all key for real-world database and analytics tasks.