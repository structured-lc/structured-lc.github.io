### Leetcode 2026 (Easy): Low-Quality Problems [Practice](https://leetcode.com/problems/low-quality-problems)

### Description  
Given a table of LeetCode problems, each with three columns:
- problem_id (integer, unique key),
- likes (integer), and
- dislikes (integer),

Find the IDs of problems where the "like percentage" is strictly less than 60%. The like percentage is calculated as:
likes / (likes + dislikes)

Return the list of such problem IDs, sorted in ascending order.

### Examples  

**Example 1:**  
Input:  
Problems table contains:  
| problem_id | likes | dislikes |  
|------------|-------|----------|  
| 1          | 20    | 40       |  
| 2          | 30    | 10       |  
| 3          | 5     | 20       |

Output:  
`[1, 3]`  
*Explanation:*
- Problem 1: 20 / (20 + 40) = 0.333 < 0.6 → include.
- Problem 2: 30 / (30 + 10) = 0.75 ≥ 0.6 → exclude.
- Problem 3: 5 / (5 + 20) = 0.2 < 0.6 → include.

**Example 2:**  
Input:  
Problems table contains:  
| problem_id | likes | dislikes |  
|------------|-------|----------|  
| 4          | 4     | 0        |  
| 5          | 2     | 3        |

Output:  
`[5]`  
*Explanation:*
- Problem 4: 4 / (4 + 0) = 1 ≥ 0.6 → exclude.
- Problem 5: 2 / (2 + 3) = 0.4 < 0.6 → include.

**Example 3:**  
Input:  
Problems table contains:  
| problem_id | likes | dislikes |  
|------------|-------|----------|  
| 7          | 60    | 0        |  
| 8          | 15    | 10       |  
| 9          | 9     | 21       |

Output:  
``  
*Explanation:*
- Problem 7: 60 / (60 + 0) = 1 ≥ 0.6 → exclude.
- Problem 8: 15 / (15 + 10) = 0.6 = 0.6 → exclude (must be strictly less).
- Problem 9: 9 / (9 + 21) = 0.3 < 0.6 → include.

### Thought Process (as if you’re the interviewee)  
First, I interpret the problem as: filter for problems where the like ratio (likes / (likes + dislikes)) is strictly less than 0.6.

Brute-force approach:  
- For each row, compute likes / (likes + dislikes).
- Check if the result is less than 0.6.
- Keep the problem_id if yes.
- Sort and return this list.

Since we are told it's a SQL problem, the filter translates into a WHERE condition. The division must be handled carefully—ensure that likes + dislikes is never zero to avoid division by zero. However, in the given samples, “dislikes” can be zero but not both zero at once.

To optimize:  
- Use the formula directly in SQL.
- Select problem_ids where likes / (likes + dislikes) < 0.6.
  
No further optimization is needed; calculation is O(n) for n rows.

### Corner cases to consider  
- likes and dislikes both zero (division by zero; possible? should be ignored).
- dislikes zero but likes positive (ratio = 1).
- likes zero but dislikes positive (ratio = 0).
- likes and dislikes very large (potential overflow; division should be safe for SQL INT).
- Multiple problems with same like ratio, but only those strictly less than 0.6 should be included.
- Problems with like ratio exactly 0.6 must be excluded.

### Solution

```sql
-- SQL Query
SELECT problem_id
FROM Problems
WHERE likes / (likes + dislikes) < 0.6
ORDER BY problem_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of rows in Problems. Each row is checked once, and fraction computed per row.
- **Space Complexity:** O(1), ignoring output storage, since computation is performed in-place per row; no additional structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle problems where likes + dislikes is 0?
  *Hint: Consider using a WHERE clause to avoid division by zero.*

- Can you adjust the threshold from 60% to any given percentage efficiently?
  *Hint: Use a query parameter for the threshold.*

- What if you wanted to also return the like percentage as an additional column?
  *Hint: Compute and include the ratio in SELECT output.*

### Summary
This is a **filtering and ratio calculation problem** on tabular data, testing conditional logic and SQL expressions. The pattern is common: filtering rows based on a calculated column. Similar approaches are found in analytics, reporting, and dashboards wherever ratios or percentages define inclusion/exclusion criteria.