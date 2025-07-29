### Leetcode 177 (Medium): Nth Highest Salary [Practice](https://leetcode.com/problems/nth-highest-salary)

### Description  
Given an `Employee` table with at least a `salary` column, write a SQL query to report the nth highest salary from this table. *If there is no nth highest salary, the result should be null.*  
This problem measures your ability to query rankings, handle duplicates (ties), and robustly address missing data, such as requesting the 5ᵗʰ highest salary when only 3 unique salaries exist.

### Examples  

**Example 1:**  
Input:  
Table=`[{"id":1,"salary":100},{"id":2,"salary":200},{"id":3,"salary":300}]`, n=`2`  
Output:  
`200`  
*Explanation: The unique salaries are [300,200,100]. The 2ⁿᵈ highest is 200.*

**Example 2:**  
Input:  
Table=`[{"id":1,"salary":100}]`, n=`1`  
Output:  
`100`  
*Explanation: Only one salary exists. The 1ˢᵗ highest is 100.*

**Example 3:**  
Input:  
Table=`[{"id":1,"salary":100},{"id":2,"salary":100}]`, n=`2`  
Output:  
`null`  
*Explanation: After removing duplicates, only  remains. There is no 2ⁿᵈ highest, so return null.*

### Thought Process (as if you’re the interviewee)  
First, I'd think about how to rank salaries in SQL, especially considering duplicates.  
A brute-force approach is to select distinct salaries in descending order and pick the nth record.  
However, standard SQL doesn't have a direct way to select the nth row, so we need ranking functions (like `DENSE_RANK()`), subqueries using `LIMIT` and `OFFSET`, or aggregation (`MAX()` excluding higher salaries).

- **DENSE_RANK() approach:**  
  Rank distinct salaries in descending order. Then select the salary with rank = n.  
  - This is robust to duplicates and easy to adapt for missing nth value (returns null if not enough salaries).  
- Alternatively, a subquery can find all unique salaries, order them, and limit/offset to get the nᵗʰ.

Typically, using `DENSE_RANK()` or a subquery with `LIMIT`/`OFFSET` is concise and efficient for this use case.

### Corner cases to consider  
- Table is empty → return null  
- All salaries are the same → only one unique salary  
- n is greater than the number of unique salaries → return null  
- Negative or zero n (problem constraints may exclude these)  
- Salary field is null or contains nulls (should generally be excluded)  
- Large table with many duplicate salaries

### Solution

```sql
-- Using DENSE_RANK window function
SELECT 
  (SELECT DISTINCT salary
   FROM Employee
   ORDER BY salary DESC
   LIMIT 1 OFFSET n-1) AS nth_highest_salary;

-- OR, using DENSE_RANK (most robust for duplicates)
SELECT 
  MAX(salary) AS nth_highest_salary
FROM (
  SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rk
  FROM Employee
) ranked
WHERE rk = n;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N) to scan through all salaries, plus the cost of `ORDER BY` (O(N log N)) for sorting unique salaries.  
- **Space Complexity:** O(U), where U is the number of unique salaries (as ranking and deduplication depend on that subset).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle a tie for nth highest salary?  
  *Hint: DENSE_RANK assigns the same rank for duplicates—demonstrate with an example.*

- Can you generalize this method to handle other ranking criteria, like nth highest commission?  
  *Hint: Swap out the column in your solution, preserving ranking logic.*

- What if the salary table has millions of rows—how would your approach impact performance?  
  *Hint: Consider indexing and the efficiency of window functions.*

### Summary
This problem uses the **rank/ordering** SQL pattern, leveraging either window functions like `DENSE_RANK()` or subqueries with `ORDER BY` and `LIMIT/OFFSET`.  
Handling duplicates is critical, and these approaches ensure correct behavior even when n exceeds the number of unique values.  
This is a common interview and analytics pattern, directly applicable to leaderboard rankings, percentile calculations, and more.