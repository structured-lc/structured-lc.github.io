### Leetcode 1445 (Medium): Apples & Oranges [Practice](https://leetcode.com/problems/apples-oranges)

### Description  
You are given a `Sales` table with 3 columns: `sale_date` (string), `fruit` (can be 'apples' or 'oranges'), and `sold_num` (integer) representing how many of that fruit were sold on a given date. For each sale_date, compute the difference between the number of apples and oranges sold: apples - oranges.

### Examples  

**Example 1:**  
Input:  
```
| sale_date  | fruit   | sold_num |
|------------|---------|----------|
| 2020-05-01 | apples  | 10       |
| 2020-05-01 | oranges | 8        |
| 2020-05-02 | apples  | 15       |
| 2020-05-02 | oranges | 15       |
| 2020-05-03 | apples  | 20       |
| 2020-05-03 | oranges | 0        |
| 2020-05-04 | apples  | 15       |
| 2020-05-04 | oranges | 16       |
```
Output:
```
| sale_date  | diff |
|------------|------|
| 2020-05-01 | 2    |
| 2020-05-02 | 0    |
| 2020-05-03 | 20   |
| 2020-05-04 | -1   |
```
*Explanation: For each day, "diff = apples - oranges". E.g., on 2020-05-03, 20 - 0 = 20.*

### Thought Process (as if you’re the interviewee)  
First, for each sale_date, we want to compute apples - oranges. A simple way is to
- Pivot the Sales table so we have one row per date, with apples and oranges as columns, then subtract.
- Or, use a single query to sum up: For apples, add sold_num; for oranges, subtract sold_num. Summing across all fruit types per day gives apples - oranges.
Both approaches are valid, but the SUM/conditional aggregation is cleaner and shorter in SQL.

### Corner cases to consider  
- Data where either apples or oranges are missing for a given date.
- Multiple entries for the same fruit and date (would need to sum all of each fruit per date).
- Zero values for sold_num.

### Solution

```sql
-- For standard SQL (e.g. MySQL)
SELECT
  sale_date,
  SUM(CASE WHEN fruit = 'apples' THEN sold_num ELSE -sold_num END) AS diff
FROM Sales
GROUP BY sale_date;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n = number of rows in the Sales table (single scan, aggregation by date).
- **Space Complexity:** O(m), where m = number of unique sale dates (output size).

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are other fruit types in the data?
  *Hint: Filter only relevant fruits in the CASE/WHERE clause.*

- What if a date is missing either apples or oranges?
  *Hint: Be sure your aggregation returns correct result (use COALESCE or similar if pivoting).*  

- How would you show both apples and oranges sales as columns, not just the difference?
  *Hint: Use CASE SUM for separate columns or a pivot operation.*

### Summary
We use the conditional SUM aggregation pattern to efficiently compute apples - oranges per date with concise SQL logic. This pattern applies widely in difference and pivot-style reporting problems in SQL.