### Leetcode 1907 (Medium): Count Salary Categories [Practice](https://leetcode.com/problems/count-salary-categories)

### Description  
Given a table `Accounts` with columns `account_id` and `income`, each row describes the monthly income for a bank account.  
Write a SQL query to count how many accounts fall into each of these salary categories:
- **Low Salary:** income < 20000  
- **Average Salary:** 20000 ≤ income ≤ 50000  
- **High Salary:** income > 50000

Return the result with columns:  
- `category` (`Low Salary`, `Average Salary`, `High Salary`)
- `accounts_count` (number of accounts in that category)  
One row per salary category.

### Examples  

**Example 1:**  
Input:  
```
Accounts table:
+------------+--------+
| account_id | income |
+------------+--------+
|     3      | 108939 |
|     2      | 12747  |
|     8      | 87709  |
|     6      | 91796  |
+------------+--------+
```
Output:  
```
+----------------+----------------+
| category       | accounts_count |
+----------------+----------------+
| Low Salary     |       1        |
| Average Salary |       0        |
| High Salary    |       3        |
+----------------+----------------+
```
*Explanation: Only `account_id` 2 has income < 20000, others are all > 50000.*

**Example 2:**  
Input:  
```
Accounts table:
+------------+--------+
| account_id | income |
+------------+--------+
|   1        | 5000   |
|   2        | 30000  |
|   3        | 55000  |
|   4        | 99999  |
+------------+--------+
```
Output:  
```
+----------------+----------------+
| category       | accounts_count |
+----------------+----------------+
| Low Salary     |       1        |
| Average Salary |       1        |
| High Salary    |       2        |
+----------------+----------------+
```
*Explanation: 5000 < 20000 is low, 30000 is average, 55000 and 99999 are high.*

**Example 3:**  
Input:  
```
Accounts table:
+------------+--------+
| account_id | income |
+------------+--------+
+------------+--------+
```
Output:  
```
+----------------+----------------+
| category       | accounts_count |
+----------------+----------------+
| Low Salary     |      0         |
| Average Salary |      0         |
| High Salary    |      0         |
+----------------+----------------+
```
*Explanation: Empty input table, so all category counts are zero.*

### Thought Process (as if you’re the interviewee)  
- **Understand the Problem:**  
  We need to group each account into a salary category based on its `income` and count the number of accounts in each category.

- **Brute-force idea:**  
  For each account, check its income, categorize it, and then tally up the number of accounts in each category.

- **In SQL:**  
  Since we can't add a new column to the table, we'll count using conditions:
  - Use `COUNT(*)` with `WHERE` for each category.
  - Stack results using `UNION ALL` to get all three categories in one output.

- **Optimization/Trade-offs:**  
  - Simple conditional counting; logic is direct and efficient for SQL.
  - There’s no normalization or aggregation over large data, so this solution is optimal for the SQL context.

### Corner cases to consider  
- No accounts in table (empty table)
- All accounts fall into only one category
- Edge values: exactly 20000 or 50000 (ensure they are “Average Salary”)
- Negative incomes (if possible, should be included in “Low Salary”)
- Very large incomes (should not break the logic)
- Duplicates in incomes do not affect the result (they should be counted normally)

### Solution

```python
# SQL solution expressed as Python-style pseudo-code for clarity
# (Just for practice; in reality, this is best written directly in SQL)

def count_salary_categories(accounts):
    # Initialize counters
    low_salary = 0
    average_salary = 0
    high_salary = 0

    # Iterate through each account
    for account in accounts:
        income = account['income']
        if income < 20000:
            low_salary += 1
        elif 20000 <= income <= 50000:
            average_salary += 1
        elif income > 50000:
            high_salary += 1

    # Return result in required format
    return [
        {"category": "Low Salary", "accounts_count": low_salary},
        {"category": "Average Salary", "accounts_count": average_salary},
        {"category": "High Salary", "accounts_count": high_salary}
    ]

# SQL Equivalent:
'''
SELECT 'Low Salary' AS category, COUNT(*) AS accounts_count
FROM Accounts
WHERE income < 20000
UNION ALL
SELECT 'Average Salary', COUNT(*) 
FROM Accounts
WHERE income BETWEEN 20000 AND 50000
UNION ALL
SELECT 'High Salary', COUNT(*)
FROM Accounts
WHERE income > 50000;
'''
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of accounts. Each account is checked once.
- **Space Complexity:** O(1) for the counters (not using extra space per account), ignoring input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you include a fourth category, e.g., “Super High Salary” for incomes over 100,000?  
  *Hint: How would you adjust your conditions? Can you generalize the grouping?*

- What if new salary bands are introduced frequently?  
  *Hint: Consider maintaining a reference or lookup table of salary bands.*

- How would you do this if the accounts table was huge and could not fit in memory?  
  *Hint: How does SQL or distributed data processing (e.g., MapReduce) handle such scenarios?*

### Summary
This problem is a classic case of **aggregation with conditional grouping**. The standard SQL technique is to use multiple `SELECT` statements with conditional `WHERE` clauses and combine them via `UNION ALL`. In coding interviews, similar logic appears in problems like histogram bucketing, category counts, and grouping by ranges/pivots. The logic is clean, linear, and easily generalizable for other interval groups.