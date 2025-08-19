### Leetcode 2853 (Easy): Highest Salaries Difference [Practice](https://leetcode.com/problems/highest-salaries-difference)

### Description  
Given a table `Salaries` with columns `emp_name`, `department`, and `salary`, find the **absolute difference** between the highest salary in the 'Engineering' department and the highest salary in the 'Marketing' department.  
You can assume there is at least one entry for each of these departments.  
Return a single value: the absolute value of the highest salary difference.

### Examples  

**Example 1:**  
Input:  
Salaries =  
```
| emp_name | department   | salary |
|----------|-------------|--------|
| Alice    | Engineering | 12000  |
| Bob      | Marketing   | 53000  |
| Eve      | Marketing   | 40000  |
| John     | Engineering | 7100   |
```
Output: `41000`  
*Explanation: Highest salary in Engineering = 12000, in Marketing = 53000; |12000 - 53000| = 41000.*

**Example 2:**  
Input:  
Salaries =  
```
| emp_name | department   | salary |
|----------|-------------|--------|
| Sam      | Engineering | 30000  |
| Bill     | Engineering | 25500  |
| Lisa     | Marketing   | 29700  |
| Jenn     | Marketing   | 29400  |
```
Output: `300`  
*Explanation: Highest Engineering = 30000, highest Marketing = 29700; |30000 - 29700| = 300.*

**Example 3:**  
Input:  
Salaries =  
```
| emp_name | department   | salary |
|----------|-------------|--------|
| Tim      | Engineering | 50000  |
| Kim      | Marketing   | 50000  |
```
Output: `0`  
*Explanation: Both Engineering and Marketing have 50000 as the max, so |50000 - 50000| = 0.*

### Thought Process (as if you’re the interviewee)  
- **Brute Force**:  
  Retrieve all salaries for both departments, find the max in each, then calculate the absolute difference.  
- **Optimized Approach**:  
  Only need the maximum value **per department**. If input is in-memory (Python), scan once, keep two variables: `max_eng`, `max_marketing`. For SQL, use aggregation with `MAX()` and filter by department.  
- **Why?**  
  Both brute-force and optimized are O(n), but there's no need to store more than two maxes at a time. Space optimal, single pass.
- **Trade-off:**  
  Minimal: can't do better than O(n), as we must inspect every row to find max per department.

### Corner cases to consider  
- Both max values are equal, so absolute difference is zero.
- All employees belong to only the two departments (no other noise).
- Only one employee per department.
- Negative salaries (unusual, but no reason to assume otherwise).
- Duplicate max salaries for a department.

### Solution

```python
def highest_salaries_difference(salaries):
    """
    salaries: List of dicts, each with 'emp_name', 'department', 'salary'
    Returns: int, absolute difference between highest in 'Engineering' and 'Marketing'
    """
    max_engineering = float('-inf')
    max_marketing = float('-inf')

    # Iterate through each salary record once
    for record in salaries:
        if record['department'] == 'Engineering':
            if record['salary'] > max_engineering:
                max_engineering = record['salary']
        elif record['department'] == 'Marketing':
            if record['salary'] > max_marketing:
                max_marketing = record['salary']
    
    # Compute and return absolute difference
    return abs(max_engineering - max_marketing)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of records. Each salary is visited exactly once to update the max trackers.
- **Space Complexity:** O(1) extra, not counting the input. Only two integer variables are used (for the two maxes).

### Potential follow-up questions (as if you’re the interviewer)  

- What if more than two departments are present and you want the two departments which have the largest difference between their maximum salaries?  
  *Hint: Use a map to store max salary by department, then compare all department pairs.*

- What if the department names are not known in advance?  
  *Hint: Generalize by scanning maxes for all departments with a dictionary.*

- What if the company wants to know not just max difference but also which departments produce it, and who?  
  *Hint: Track departments, max salary holders, and use comparisons.*

### Summary
This problem uses the **"find max/min across groups"** pattern, a classic in SQL (GROUP BY + aggregate function) and in code (track max per group using dict or variables).  
It's a common pattern in many ranking, leaderboard, and analytics-style interview questions.  
Efficient because it iterates once, with constant space for fixed keys. The approach generalizes to handling any department count or group criterion.

### Tags
Database(#database)

### Similar Problems
