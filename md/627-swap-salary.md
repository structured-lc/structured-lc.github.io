### Leetcode 627 (Easy): Swap Salary [Practice](https://leetcode.com/problems/swap-salary)

### Description  
You are given a table named `salary` with columns `id` (INT), `name` (VARCHAR), `sex` (ENUM: 'm' or 'f'), and `salary` (INT). The `sex` column contains either `'m'` for male or `'f'` for female. The task is to **swap all 'f' and 'm' values in the sex column** using a single SQL `UPDATE` statement and **without using any intermediate or temporary table, or a SELECT statement**.  
After the swap, every 'm' should become 'f' and every 'f' should become 'm'. All other columns must remain unchanged.

### Examples  

**Example 1:**  
Input:  
| id | name | sex | salary |
|----|------|-----|--------|
| 1  | A    | m   | 2500   |
| 2  | B    | f   | 1500   |
| 3  | C    | m   | 5500   |
| 4  | D    | f   | 500    |  
Output:  
| id | name | sex | salary |
|----|------|-----|--------|
| 1  | A    | f   | 2500   |
| 2  | B    | m   | 1500   |
| 3  | C    | f   | 5500   |
| 4  | D    | m   | 500    |  
*Explanation: All 'm' values are switched to 'f' and vice versa, row by row.*

**Example 2:**  
Input:  
| id | name | sex | salary |
|----|------|-----|--------|
| 5  | E    | m   | 1200   |  
Output:  
| id | name | sex | salary |
|----|------|-----|--------|
| 5  | E    | f   | 1200   |  
*Explanation: The only row swaps 'm' to 'f'.*

**Example 3:**  
Input:  
| id | name | sex | salary |
|----|------|-----|--------|
| 6  | F    | f   | 2700   |  
Output:  
| id | name | sex | salary |
|----|------|-----|--------|
| 6  | F    | m   | 2700   |  
*Explanation: The only row swaps 'f' to 'm'.*

### Thought Process (as if you’re the interviewee)  
- The problem asks for a **single update statement** with no SELECT or temp tables.  
- Our goal is to “swap” each `'m'` with an `'f'` and vice versa for the `sex` column.
- In SQL, for such replacement, commonly we can use a `CASE` or `IF` statement inside the `SET` clause.
- The main trick is to ensure the update happens in-place, and each row changes `'m'` to `'f'` and `'f'` to `'m'`.
- Since there are only two values, a CASE or IF is straightforward:  
  - IF `sex` = 'm' THEN 'f', ELSE 'm'.
  - Many SQL dialects support both CASE and IF.
- No extra storage or scan is needed since this is just a single pass field update.

### Corner cases to consider  
- Table has no rows (should not error, simply do nothing).
- Table has only 'm' or only 'f' (all should just flip).
- Table contains both 'm' and 'f' in arbitrary order.
- Table with duplicate rows (all swaps occur independently).
- If somehow `sex` field has a value other than 'm' or 'f' (though not per description), the statement should ideally handle or ignore it, but the problem assumes only these values.

### Solution

```sql
-- MySQL/SQL solution

UPDATE salary
SET sex = CASE
    WHEN sex = 'm' THEN 'f'
    ELSE 'm'
END;
```

**Explanation:**  
- The `UPDATE salary` part targets the table.  
- The `SET sex = CASE ...` expression checks:  
     - If `sex` = 'm', then new value becomes 'f'.
     - All other cases (since only 'f' possible), set to 'm'.
- This works even if the table is empty or contains only one type.

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the salary table. Each row is updated exactly once.
- **Space Complexity:** O(1) extra space; in-place update, no auxiliary storage used regardless of table size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend your query to handle more than two possible values in the `sex` column?
  *Hint: Consider using a full CASE statement for all possible ENUM values.*

- What if the `sex` field is NULL in some rows?
  *Hint: Update your CASE statement to explicitly handle NULLs (use IS NULL).*

- Could you write a solution that is compatible across different SQL engines (MySQL, PostgreSQL, SQL Server)?
  *Hint: CASE is the most portable option; avoid nonstandard IF constructs.*

### Summary
The approach is a classic in-place update using SQL’s `CASE` expression. This is a common pattern for categorical value swaps or flips in a column with only two possible values. It’s widely applicable for “toggle” operations and demonstrates understanding of conditional logic with `UPDATE` in SQL.


### Flashcard
Use SQL CASE or IF to update sex: set 'm' to 'f' and 'f' to 'm' in a single UPDATE statement.

### Tags
Database(#database)

### Similar Problems
