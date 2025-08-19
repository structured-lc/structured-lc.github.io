### Leetcode 2686 (Medium): Immediate Food Delivery III [Practice](https://leetcode.com/problems/immediate-food-delivery-iii)

### Description  
Given a table Delivery with columns:  
- delivery_id (int, primary key)  
- customer_id (int)  
- order_date (date)  
- customer_pref_delivery_date (date)  

Each row records a food delivery request. The delivery is **immediate** if the preferred delivery date is the same as the order date; otherwise, it's **scheduled**.  
Return, for each unique order_date, the **percentage** of immediate orders (rounded to 2 decimal places), ordered by order_date ascending.

### Examples  

**Example 1:**  
Input:  
Delivery table:  
```
| delivery_id | customer_id | order_date  | customer_pref_delivery_date |
|-------------|-------------|-------------|----------------------------|
|      1      |     1       | 2022-01-01  |    2022-01-01              |
|      2      |     2       | 2022-01-01  |    2022-01-02              |
|      3      |     3       | 2022-01-01  |    2022-01-01              |
|      4      |     4       | 2022-01-02  |    2022-01-02              |
|      5      |     5       | 2022-01-02  |    2022-01-02              |
```
Output:  
```
| order_date  | immediate_percentage |
|-------------|---------------------|
| 2022-01-01  |        66.67        |
| 2022-01-02  |       100.00        |
```
*Explanation: For 2022-01-01, 2 of 3 orders are immediate ⇒ 2/3 × 100 = 66.67. For 2022-01-02, both are immediate ⇒ 2/2 × 100 = 100.00.*

**Example 2:**  
Input:  
Delivery table:  
```
| delivery_id | customer_id | order_date  | customer_pref_delivery_date |
|-------------|-------------|-------------|----------------------------|
|      1      |     1       | 2022-02-15  |    2022-03-01              |
```
Output:  
```
| order_date  | immediate_percentage |
|-------------|---------------------|
| 2022-02-15  |        0.00         |
```
*Explanation: No immediate order on 2022-02-15 (0/1 = 0).*

**Example 3:**  
Input:  
Delivery table:  
```
| delivery_id | customer_id | order_date  | customer_pref_delivery_date |
|-------------|-------------|-------------|----------------------------|
|      1      |     1       | 2022-01-05  |    2022-01-05              |
|      2      |     2       | 2022-01-05  |    2022-01-06              |
```
Output:  
```
| order_date  | immediate_percentage |
|-------------|---------------------|
| 2022-01-05  |        50.00        |
```
*Explanation: 1 immediate out of 2 (1/2 × 100 = 50.00).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each order_date, count how many orders are immediate and divide by the total number of orders for that date.  
  "Immediate" means customer_pref_delivery_date equals order_date; this can be checked per row.

- **SQL Approach:**  
  - For each order_date, group all orders.
  - Use SUM(IF(customer_pref_delivery_date = order_date, 1, 0)) to count immediate orders.
  - COUNT(*) to get total orders per date.
  - Divide for immediate percentage and round to two decimals.
  - Present result as required: order_date, immediate_percentage, ascending order by order_date.

- **Efficiency:**  
  All requirements can be achieved in a single GROUP BY query; no subqueries or joins are necessary.  
  All operations (comparison, sum, division, rounding) are O(n) over the table.

- **Why this approach:**  
  Grouping and aggregating in SQL is the most efficient and clear for reporting per-date statistics, and requires no temporary tables or window functions.

### Corner cases to consider  
- Only one order for a given day: percentage is 100.00 if immediate, 0.00 otherwise.
- No immediate orders for a date: percentage is 0.00.
- All orders immediate for a date: 100.00.
- Orders with the same date, but different customer IDs.
- Table has only one or zero rows.
- Rounding cases: check output for cases like 1/3 or 2/3 (should be rounded to 2 decimals as per spec).
- Unusual dates (e.g. leap year, end of year) — should be handled as normal unless data is mis-entered.

### Solution

```python
# Since the real LeetCode solution is SQL, here is the equivalent MySQL query with step-by-step comments:

# SELECT
#     order_date,
#     ROUND(
#         100 * SUM(IF(customer_pref_delivery_date = order_date, 1, 0)) / COUNT(*),
#         2
#     ) AS immediate_percentage
# FROM Delivery
# GROUP BY order_date
# ORDER BY order_date;

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Delivery table.
  - Each row is scanned once for grouping, conditional sum, and count.
- **Space Complexity:** O(k), where k is the number of unique order_date values (for storing result rows per date).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle rows where order_date or customer_pref_delivery_date are NULL?  
  *Hint: Consider SQL’s behavior with NULL and equality, and how to prevent issues in aggregates.*

- What if you were asked for the percentage of scheduled orders instead?  
  *Hint: Change the condition in your SUM function or subtract immediate from 100.*

- Can you extend this to report by week or month rather than by day?  
  *Hint: Use SQL date functions (YEARWEEK, MONTH, etc.) and group accordingly.*

### Summary
This is a classic SQL grouping and aggregation problem: compute statistics (ratios or percentages) over groups, with basic conditional counting.  
This pattern (conditional aggregation per group) is used frequently in reporting, dashboards, and KPI calculations. Examples include attendance rates, daily conversion percentages, or per-day event success/failure rates.

### Tags
Database(#database)

### Similar Problems
