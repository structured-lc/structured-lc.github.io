### Leetcode 1384 (Hard): Total Sales Amount by Year [Practice](https://leetcode.com/problems/total-sales-amount-by-year)

### Description  
Given a sales table (or similar database table), output the total sales amount grouped by year. For each year, compute the sum of the "amount" column. You may be required to output results in ascending year order depending on the problem variant.

### Examples  

**Example 1:**  
Input: `Sales table with columns: id, year, amount`  
Output: (Year, Total) rows, e.g.  
`2019, 5000`  
`2020, 7000`  
*Explanation: Sum 'amount' values for each unique 'year'.*

**Example 2:**  
Input: (Sales rows with various years, possibly unordered)  
Output: (Ordered result)  
`2018, 2000`  
`2020, 10000`  
*Explanation: Output should be sorted by year ascending.*

**Example 3:**  
Input: Table with missing years
Output: Only years present should show in output.
*Explanation: Grouping includes only years appearing in data.*

### Thought Process (as if you’re the interviewee)  
This is a group-by aggregate problem. In SQL, you'd use GROUP BY and SUM; if in code, use a dictionary to aggregate amounts per year:
- Traverse all records, for each record add the amount to a map keyed by year.
- Output sorted by year if needed.

### Corner cases to consider  
- Years with no sales (shouldn't appear)
- Multiple records for the same year
- Amount field may be zero or negative (if allowed)
- Table is empty

### Solution

```sql
SELECT year, SUM(amount) AS total_sales
FROM Sales
GROUP BY year
ORDER BY year ASC;
```

# If code (Python example):
```python
def yearly_sales(sales):
    # sales: list of (id, year, amount)
    from collections import defaultdict
    totals = defaultdict(int)
    for _, year, amount in sales:
        totals[year] += amount
    # Output list of (year, total) sorted by year asc
    return sorted([(year, totals[year]) for year in totals])
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log n), due to final sorting on year (with n records). O(n) if table is already sorted or sorting is not needed.
- **Space Complexity:** O(y), where y = number of unique years.


### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle NULL amounts?  
  *Hint: Use COALESCE in SQL, or handle None in code.*

- What if you also need average sales per year?  
  *Hint: Add COUNT(*) and AVG(amount) in the SQL or code logic.*

- How do you handle records with invalid years or negative amounts?  
  *Hint: Add WHERE filtering as appropriate.*

### Summary
This is a group-by aggregation problem, extremely common in database/data engineering interviews. Patterns: SQL GROUP BY + aggregate, or hash map/dictionary reduce. Similar logic applies to grouping/summarizing by any categorical field.


### Flashcard
Aggregate sales by year using a dictionary or SQL GROUP BY, then output totals sorted by year.

### Tags
Database(#database)

### Similar Problems
