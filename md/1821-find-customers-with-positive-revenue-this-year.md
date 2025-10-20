### Leetcode 1821 (Easy): Find Customers With Positive Revenue this Year [Practice](https://leetcode.com/problems/find-customers-with-positive-revenue-this-year)

### Description  
Write an SQL query to find all customers who have positive revenue in the year 2021. Return the result table in any order. This is a database problem where you need to filter customers based on their revenue for a specific year.

### Examples  

**Example 1:**  
Input: `Customers table with customer_id, year, revenue columns`  
Output: `customer_id values where revenue > 0 and year = 2021`  
*Explanation: Filter the customers table to only include rows where the year is 2021 and revenue is positive, then return the customer IDs.*

**Example 2:**  
Input: `Multiple customers with revenues in different years`  
Output: `Only customer IDs with positive 2021 revenue`  
*Explanation: Even if a customer had negative revenue in other years, include them if their 2021 revenue is positive.*

### Thought Process (as if you're the interviewee)  
This is a straightforward SQL filtering problem. I need to:

1. **Filter by year**: Only consider records from 2021
2. **Filter by revenue**: Only positive revenue values
3. **Select customer IDs**: Return the relevant customer identifiers

The SQL query structure will be:
- SELECT customer_id 
- FROM Customers 
- WHERE year = 2021 AND revenue > 0

### Corner cases to consider  
- Customers with zero revenue (should be excluded)
- Customers with no 2021 records (should be excluded)
- Customers with negative revenue in 2021 (should be excluded)
- Duplicate customer IDs in same year (depends on schema design)
- NULL revenue values (should be handled appropriately)
- Different year formats (ensure year comparison works correctly)

### Solution

```sql
SELECT customer_id 
FROM Customers 
WHERE year = 2021 AND revenue > 0;
```

Alternative solution with explicit ordering:

```sql
SELECT customer_id 
FROM Customers 
WHERE year = 2021 AND revenue > 0
ORDER BY customer_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the number of records in the Customers table, as we need to scan and filter all records.
- **Space Complexity:** O(k) where k is the number of customers with positive revenue in 2021, for storing the result set.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to find customers with positive revenue in any year?  
  *Hint: Remove the year constraint or group by customer_id and use HAVING with aggregate functions.*

- What if you needed to return customers with total positive revenue across all years?  
  *Hint: GROUP BY customer_id and use SUM(revenue) > 0 in the HAVING clause.*

- How would you handle the case where revenue could be NULL?  
  *Hint: Add explicit NULL checks or use COALESCE to treat NULL as 0.*

### Summary
This problem demonstrates basic SQL filtering with multiple conditions using AND operator. It's a fundamental pattern for database queries involving time-based filtering and numerical comparisons. This approach is commonly used in business analytics, financial reporting, and data analysis scenarios where you need to segment data by time periods and performance metrics.


### Flashcard
Filter Customers table where year = 2021 AND revenue > 0, return distinct customer_id.

### Tags
Database(#database)

### Similar Problems
