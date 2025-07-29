### Leetcode 1076 (Easy): Project Employees II [Practice](https://leetcode.com/problems/project-employees-ii)

### Description  
Given two tables: **Project** (`project_id`, `employee_id`) and **Employee** (`employee_id`, `name`, `experience_years`), write a solution to find all **project_id** values of projects that have the **highest number of employees**. Return all such project_ids in any order.  
Focus on finding which project(s) have the maximum headcount based on the **Project** table, regardless of employee details from the **Employee** table.

### Examples  

**Example 1:**  
Input:  
Project table:  
```
+------------+-------------+
| project_id | employee_id |
+------------+-------------+
|     1      |      1      |
|     1      |      2      |
|     1      |      3      |
|     2      |      1      |
|     2      |      4      |
+------------+-------------+
```
Employee table:  
```
+-------------+--------+------------------+
| employee_id | name   | experience_years |
+-------------+--------+------------------+
|      1      | Khaled |        3         |
|      2      |  Ali   |        2         |
|      3      |  John  |        1         |
|      4      |  Doe   |        2         |
+-------------+--------+------------------+
```
Output: `1`  
Explanation:  
- Project 1 has employees 1,2,3 (3 employees).  
- Project 2 has employees 1,4 (2 employees).  
- Since Project 1 has the most employees, output is `1`.


**Example 2:**  
Input:  
Project table:  
```
+------------+-------------+
| project_id | employee_id |
+------------+-------------+
|     1      |      1      |
|     2      |      2      |
|     3      |      3      |
+------------+-------------+
```
Output: `1`, `2`, `3`  
Explanation: Each project has exactly 1 employee, so all have the most. Output is all project IDs.


**Example 3:**  
Input:  
Project table:  
```
+------------+-------------+
| project_id | employee_id |
+------------+-------------+
+------------+-------------+
```
Output: _(empty)_  
Explanation: No project rows at all; so the answer is empty.

### Thought Process (as if you’re the interviewee)  
First, I need to find for each project_id how many employees are assigned (i.e., count employee_id for each project_id). Then, I must identify which project_id(s) have the **maximum** count.

A brute-force way is to:
- Count the employees in each project using GROUP BY.
- Find the maximum of those counts.
- Select project_id(s) with that count.

Optimized approach uses a single query with GROUP BY and HAVING, or with window functions if allowed:
- Approach 1: Use GROUP BY project_id, COUNT(*), and in HAVING compare to the maximum value found with a sub-query.
- Approach 2: Use window function RANK() OVER (ORDER BY count DESC), and return those with rank = 1.

Trade-offs: GROUP BY + HAVING solution is simpler and works on all SQL engines. The window function is more elegant if window functions are supported (modern SQL).

### Corner cases to consider  
- No projects at all (empty table).
- All projects have the same number of employees.
- Only one project exists.
- A project has duplicate employee_id entries (shouldn’t happen as (project_id, employee_id) is the PK, but worth noting).
- Large number of projects—performance should remain scalable.

### Solution

```sql
-- Approach 1: GROUP BY + HAVING (basic SQL, most compatible)
SELECT project_id
FROM Project
GROUP BY project_id
HAVING COUNT(employee_id) >= ALL (
    SELECT COUNT(employee_id)
    FROM Project
    GROUP BY project_id
);

-- Approach 2 (if window functions allowed - cleaner for complex requirements)
WITH count_per_project AS (
    SELECT project_id, COUNT(employee_id) AS cnt
    FROM Project
    GROUP BY project_id
),
ranked AS (
    SELECT project_id, RANK() OVER (ORDER BY cnt DESC) AS rk
    FROM count_per_project
)
SELECT project_id
FROM ranked
WHERE rk = 1;
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - For GROUP BY + subquery: O(n), where n is number of rows in Project table (grouping projects and finding max). Subquery also scans all projects: overall still O(n) for practical use.
  - For window function: Similar O(n) for counting and ranking per group.

- **Space Complexity:**  
  - O(p), where p is number of unique projects—this is for the grouped counts or temp window outputs. No extra storage beyond query-engine internals.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return not just the project_id, but also the number of employees for each such project?
  *Hint: Add COUNT(employee_id) to SELECT clause.*

- What if you needed to tie this to the Employee table and only count employees with experience > 2 years?
  *Hint: Use JOIN Project and Employee, and filter in WHERE clause before GROUP BY.*

- How do you handle ties where multiple projects have the same max count?
  *Hint: Both approaches here naturally handle this: outputting all project_ids tied for maximum.*

### Summary
This problem is a classic **SQL aggregation** pattern—GROUP BY and aggregate (COUNT), then filtering using HAVING or a window function for max.  
This technique is broadly applicable for finding “most popular, highest count, most frequent” rows per group in data analysis, dashboards, and reporting tasks.