### Leetcode 1179 (Easy): Reformat Department Table [Practice](https://leetcode.com/problems/reformat-department-table)

### Description  
Given a Department table with columns **id**, **revenue**, and **month** (where the (id, month) pair is unique), transform the table so each row represents a department (by id) and the columns show the revenue for each month (January through December). If there was no revenue recorded for a department in a given month, the value should be null. The months should appear in order from Jan to Dec.

### Examples  

**Example 1:**  
Input:  
```
| id | revenue | month |
|----|---------|-------|
| 1  | 8000    | Jan   |
| 2  | 9000    | Jan   |
| 3  | 10000   | Feb   |
| 1  | 7000    | Feb   |
| 1  | 6000    | Mar   |
```
Output:  
```
| id | Jan_Revenue | Feb_Revenue | Mar_Revenue | Apr_Revenue | ... | Dec_Revenue |
|----|-------------|-------------|-------------|-------------|-----|-------------|
| 1  | 8000        | 7000        | 6000        | null        | ... | null        |
| 2  | 9000        | null        | null        | null        | ... | null        |
| 3  | null        | 10000       | null        | null        | ... | null        |
```
*Explanation: Each department (id) becomes a row. Each month's revenue becomes a column. If no revenue exists for a month, that column is null for that department.*

**Example 2:**  
Input:  
```
| id | revenue | month |
|----|---------|-------|
| 2  | 5000    | Apr   |
```
Output:  
```
| id | Jan_Revenue | Feb_Revenue | Mar_Revenue | Apr_Revenue | ... | Dec_Revenue |
|----|-------------|-------------|-------------|-------------|-----|-------------|
| 2  | null        | null        | null        | 5000        | ... | null        |
```
*Explanation: Department 2 only has revenue reported in April. Other months will be null.*

**Example 3:**  
Input: *empty table*  
Output: *empty result table*  
*Explanation: If no departments or revenues are present, the result is naturally empty.*

### Thought Process (as if you’re the interviewee)  
- The problem requires **pivoting** a skinny table: each (department, month) revenue record should be placed as the value in a wide table with columns for each month.
- **Brute-force approach:** For each id, scan all months, and for each, look up the revenue, filling null if absent.
- In SQL, this is best done by **conditionally aggregating** the revenue for each month. That is, for each month, use a SUM with IF or CASE to select the revenue when the month matches, else null.
- Since each (id, month) is unique, SUM simplifies to selecting the only value or null.
- Group by id, and project 12 columns, one per month (Jan, Feb, ..., Dec).
- This closely matches classic SQL pivot by manual aggregation.
- This approach is both straightforward and efficient for the input size in the problem.

### Corner cases to consider  
- No rows (empty input table).
- A department missing revenue for some or all months.
- All departments missing some months.
- Only one department, or only one month present.
- Departments with non-consecutive month values.

### Solution

```python
# Since this is a SQL-oriented problem, here is how you would write equivalent logic
# with conditional aggregation in Python for interview demonstration.

from collections import defaultdict

def reformat_department_table(department_table):
    # department_table: list of dicts with keys 'id', 'revenue', 'month'
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    result = defaultdict(lambda: {f"{m}_Revenue": None for m in months})

    for row in department_table:
        dept_id = row['id']
        revenue = row['revenue']
        month = row['month']
        result[dept_id][f"{month}_Revenue"] = revenue

    # Build rows: one per department
    output = []
    for dept_id in sorted(result.keys()):
        record = {'id': dept_id}
        record.update(result[dept_id])
        output.append(record)
    return output

# Example usage:
department_table = [
    {'id': 1, 'revenue': 8000, 'month': 'Jan'},
    {'id': 2, 'revenue': 9000, 'month': 'Jan'},
    {'id': 3, 'revenue': 10000, 'month': 'Feb'},
    {'id': 1, 'revenue': 7000, 'month': 'Feb'},
    {'id': 1, 'revenue': 6000, 'month': 'Mar'},
]
print(reformat_department_table(department_table))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of input rows. Each row is processed once and mapped to the result.
- **Space Complexity:** O(D × 12), where D is the number of distinct departments, since we store up to 12 columns per department. The output also has up to D rows.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you adapt the solution if the months used an integer format instead of 3-letter strings?  
  *Hint: Map integer month numbers to column names programmatically.*

- What would you do if there were multiple revenue values per (department, month) (i.e., non-unique)?  
  *Hint: Choose to sum, average, or pick the latest as needed.*

- How do you handle output column order if months are not standard or there are missing/extra month values?  
  *Hint: Sort columns or handle dynamically; possibly meta-program the SQL/aggregation.*

### Summary
This problem is a classic **pivot table** transformation, often used for reporting and business intelligence. The solution uses *conditional aggregation* to map individual row values into columns, a common approach for SQL pivot operations. Understanding this pattern is useful for a wide array of data transformation interview problems, both in SQL and in programming languages when simulating group and pivot operations.

### Tags
Database(#database)

### Similar Problems
