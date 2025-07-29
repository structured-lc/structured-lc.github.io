### Leetcode 1468 (Medium): Calculate Salaries [Practice](https://leetcode.com/problems/calculate-salaries)

### Description  
Given a company table storing employee relationships and their salary, write a SQL query to output the total salary paid to each employee and all their subordinates (this is, the sum of their own salary and the salaries for anyone under them in any level), for every employee.

### Examples  
**Example 1:**  
Input: 
```
Employee table = [
  [1, 'John',   100, null],
  [2, 'Dan',    90,   1],
  [3, 'James',  80,   2],
  [4, 'Alice',  70,   3]
]
```
Output: 
```
[
  [1, 340],
  [2, 240],
  [3, 150],
  [4, 70]
]
```
*Explanation: For Employee 1 (John), total = 100 + 90 + 80 + 70. For Employee 2 (Dan), total = 90 + 80 + 70, etc.*

**Example 2:**  
Input: 
```
Employee table = [
  [1, 'Anna', 100, null],
  [2, 'Bob',  80,    1],
  [3, 'May',  50,    1]
]
```
Output: 
```
[
  [1, 230],
  [2, 80],
  [3, 50]
]
```
*Explanation: Anna = 100 + 80 + 50. Bob and May only have their own salary.*

### Thought Process (as if you’re the interviewee)  
First, we need to find all employees in the "subtree" of each manager in the employee hierarchy. The brute-force approach would be, for each employee, recursively traverse all subordinates and sum their salaries, but this isn't scalable for large datasets.

A recursive CTE in SQL is suitable as it avoids procedural code and leverages SQL for hierarchy traversal. We'll use a recursive CTE to find all descendants (subordinates) for each employee, then sum their salaries grouped by the root employee.

### Corner cases to consider  
- Employees with no subordinates (leaf nodes)
- An employee who is their own boss (shouldn't happen, but good to test for cycles)
- Single employee in the table (root only)

### Solution

```sql
-- id | name | salary | managerId
WITH RECURSIVE subordinates AS (
    SELECT id AS manager_id, id AS employee_id, salary
    FROM Employee
    UNION ALL
    SELECT s.manager_id, e.id, e.salary
    FROM subordinates s
    JOIN Employee e
      ON e.managerId = s.employee_id
)
SELECT manager_id AS id, SUM(salary) AS totalSalary
FROM subordinates
GROUP BY manager_id
ORDER BY manager_id
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N^2) in the worst-case for deep trees (every employee is a subordinate at some level in the chain)
- **Space Complexity:** O(N^2) for the recursive CTE result set in worst-case

### Potential follow-up questions (as if you’re the interviewer)  

- (What if employees can have multiple managers?)  
  *Hint: Consider storing relationships in a separate table and using joins*

- (How would you handle cycles in the organizational chart?)  
  *Hint: Use cycle-detection logic or limit recursion depth*

- (Can this be implemented without recursion?)  
  *Hint: Consider iterative approaches, but SQL recursion is the standard way*

### Summary
This problem uses the recursive CTE (Common Table Expression) pattern for hierarchical queries, a common approach for organizational, category, or any tree-like data structures in SQL. Understanding this technique is valuable for any production system that stores hierarchies in relational databases.