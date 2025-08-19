### Leetcode 1479 (Hard): Sales by Day of the Week [Practice](https://leetcode.com/problems/sales-by-day-of-the-week/)

### Description  
Given sales transaction data, write an SQL query to output the **total quantity sold by each item category for each day of the week** (Monday through Sunday). The output should list item categories and days of the week, along with total units sold, even for days with zero sales.

### Examples  
**Example 1:**  
Input: `sales` table with order_date, item_id, quantity, etc.  
Output:
```
| item_category | day_of_week | total_quantity |
|---------------|-------------|---------------|
| electronics   | Monday      | 7             |
| electronics   | Tuesday     | 0             |
| grocery       | Monday      | 2             |
| grocery       | Tuesday     | 8             |
```
*Explanation: For each category, sum the quantity on each weekday.*

**Example 2:**  
Input: No sales for some days or categories  
Output: A row per item category, per weekday, with 0 if none sold.

**Example 3:**  
Input: Days as date, quantity as int; multiple orders per day  
Output: Aggregate by weekday name, sum quantity per category per weekday.

### Thought Process (as if you’re the interviewee)  
- Need to group sales by both item_category and day_of_week.
- Use JOIN if data is split (e.g., item_category in a different table).
- Use SQL's DAYOFWEEK or DAYNAME to extract the weekday from the date.
- Aggregate with SUM(quantity), and GROUP BY both item_category and day_of_week.
- To account for zero-sales days, CROSS JOIN to a derived table listing all weekdays and all categories.
- ORDER BY item_category, weekday order (Monday, Tuesday, ...).

### Corner cases to consider  
- Days where an item category has no sales (should still output row with 0)
- No data for a certain weekday at all
- Date with no matching item in inventory
- Case where multiple orders exist for same item/category/day

### Solution
```sql
-- Assuming tables: Sales, Items; DAYNAME() for weekday names
SELECT
  i.item_category,
  d.day_of_week,
  COALESCE(SUM(s.quantity), 0) AS total_quantity
FROM
  (SELECT 'Monday' AS day_of_week UNION ALL SELECT 'Tuesday' UNION ALL SELECT 'Wednesday'
   UNION ALL SELECT 'Thursday' UNION ALL SELECT 'Friday' UNION ALL SELECT 'Saturday' UNION ALL SELECT 'Sunday') d
CROSS JOIN Items i
LEFT JOIN Sales s ON i.item_id = s.item_id AND DAYNAME(s.order_date) = d.day_of_week
GROUP BY i.item_category, d.day_of_week
ORDER BY i.item_category, FIELD(d.day_of_week,'Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday');
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n) to scan all sales; CROSS JOIN is limited (7×categories).
- **Space Complexity:** O(km), where k = item categories, m = 7 weekdays (output rows).

### Potential follow-up questions (as if you’re the interviewer)  
- How to display 0 when no sales exist for a day/category?
  *Hint: Use LEFT JOIN and COALESCE for null handling.*
- How do you ensure weekday order stays Monday-Sunday?
  *Hint: Use FIELD() or a CASE for order in ORDER BY.*
- Can this be extended to show other summaries (e.g., revenue)?
  *Hint: Replace SUM(quantity) with SUM(amount).

### Summary
This problem tests multi-dimensional SQL aggregation, use of date functions, and the need for full cross-group reporting even for missing data. The cross join plus left join pattern is a standard for ensuring completeness in reporting grids.

### Tags
Database(#database)

### Similar Problems
