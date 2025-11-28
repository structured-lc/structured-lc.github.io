# [Practice](https://leetcode.com/problems/swap-sex-of-employees)

### Description
You are given a `Salary` table with employee information including an id, name, sex (ENUM type with values 'm' or 'f'), and salary. Your task is to write a single SQL UPDATE statement that swaps all 'm' values to 'f' and all 'f' values to 'm' in the sex column. The constraint is that you must use a single UPDATE statement without creating any intermediate temporary tables or using SELECT statements.

### Examples

**Example 1:**
Input: 
```
| id | name | sex | salary |
|----|------|-----|--------|
| 1  | A    | m   | 2500   |
| 2  | B    | f   | 1500   |
| 3  | C    | m   | 5500   |
| 4  | D    | f   | 500    |
```
Output:
```
| id | name | sex | salary |
|----|------|-----|--------|
| 1  | A    | f   | 2500   |
| 2  | B    | m   | 1500   |
| 3  | C    | f   | 5500   |
| 4  | D    | m   | 500    |
```
*Explanation: Employees with id 1 and 3 had sex changed from 'm' to 'f'. Employees with id 2 and 4 had sex changed from 'f' to 'm'.*

**Example 2:**
Input:
```
| id | name | sex | salary |
|----|------|-----|--------|
| 5  | E    | f   | 3000   |
```
Output:
```
| id | name | sex | salary |
|----|------|-----|--------|
| 5  | E    | m   | 3000   |
```
*Explanation: The single female employee has sex swapped to 'm'.*

**Example 3:**
Input:
```
| id | name | sex | salary |
|----|------|-----|--------|
| 10 | F    | m   | 4500   |
| 11 | G    | m   | 6000   |
```
Output:
```
| id | name | sex | salary |
|----|------|-----|--------|
| 10 | F    | f   | 4500   |
| 11 | G    | f   | 6000   |
```
*Explanation: Both male employees have their sex swapped to 'f'.*

### Thought Process (as if you're the interviewee)

When approaching this problem, the key insight is that we need to modify data in place using SQL's UPDATE statement. The brute-force approach would be to use two separate UPDATE statements—one to change 'm' to a temporary value, then another to change 'f' to 'm', and finally the temporary value to 'f'. However, the constraint requires a single UPDATE statement.

The optimal approach is to use a CASE statement (or IF statement in MySQL) within the UPDATE clause. This allows us to conditionally evaluate the current sex value and set it to the opposite value in a single pass. The CASE statement checks if sex equals 'm', and if so, sets it to 'f'; otherwise, it sets it to 'm'. Since the problem guarantees only two possible values ('m' and 'f'), we can safely assume that anything that isn't 'm' must be 'f'.

This approach is efficient because it scans the table once, evaluates the condition for each row, and updates the value atomically without requiring temporary storage or multiple passes.

### Corner cases to consider

- All rows have sex = 'm' (entire table should swap to 'f')
- All rows have sex = 'f' (entire table should swap to 'm')
- Empty table (no rows to update)
- Single row in table (should still swap correctly)
- Mixed 'm' and 'f' values (should all swap correctly)

### Solution

```sql
UPDATE Salary
SET sex = CASE
    WHEN sex = 'm' THEN 'f'
    ELSE 'm'
END;
```

**Explanation:**

The UPDATE statement targets the Salary table. The SET clause uses a CASE expression to conditionally set the sex column. For each row, if the current sex value is 'm', it becomes 'f'. For all other cases (which in this problem means sex = 'f'), it becomes 'm'. The CASE...END structure ensures this happens in a single pass without requiring additional statements or temporary tables.

Alternative syntax using IF (MySQL-specific):

```sql
UPDATE Salary
SET sex = IF(sex = 'm', 'f', 'm');
```

### Time and Space complexity Analysis

- **Time Complexity:** O(n), where n is the number of rows in the Salary table. The UPDATE statement must scan and update each row once, making a linear pass through the entire table necessary.

- **Space Complexity:** O(1). The UPDATE operation modifies data in place without requiring additional storage proportional to the input size. SQL typically stores only the necessary query execution overhead, not a copy of the data.

### Potential follow-up questions (as if you're the interviewer)

- (Follow-up question 1) What if we had three gender values ('m', 'f', 'o' for other) and needed to implement a rotation (m→f, f→o, o→m) in a single UPDATE statement?
  *Hint: Extend the CASE statement with additional WHEN clauses for each gender value.*

- (Follow-up question 2) How would you handle swapping two columns' values (e.g., swap salary with a bonus column) in a single UPDATE statement?
  *Hint: Use a temporary variable or multi-column assignment syntax (if supported) to avoid overwriting data mid-operation.*

- (Follow-up question 3) What if the table was very large with millions of rows and you needed to optimize further? Are there any indexing or batch processing strategies?
  *Hint: Consider whether indexes on the sex column would help; discuss batch UPDATE approaches or partitioning strategies for massive tables.*

### Summary

This problem demonstrates the use of SQL's CASE statement within UPDATE operations to conditionally transform data in a single pass. The key pattern is using conditional logic (CASE or IF) to avoid multiple sequential UPDATE statements. This approach is widely applicable whenever you need to perform conditional transformations on table data—such as data normalization, value mapping, or state transitions. The pattern reinforces that SQL can handle complex conditional logic efficiently within a single query execution.

### Tags
Database(#database)

### Similar Problems
