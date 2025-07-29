### Leetcode 1549 (Medium): The Most Recent Orders for Each Product [Practice](https://leetcode.com/problems/the-most-recent-orders-for-each-product)

### Description  
Given an orders table with columns (order_id, product_id, order_date), write an SQL query to find the 3 most recent orders for every product. Output should have product_id, order_id, order_date for each returned order.

### Examples  

**Example 1:**  
Input: Table:
```
order_id | product_id | order_date
--------------------------------
1        | 100        | 2021-01-08
2        | 100        | 2021-01-10
3        | 200        | 2021-01-05
4        | 100        | 2021-01-12
5        | 200        | 2021-01-06
6        | 200        | 2021-01-07
```
Output:
```
product_id | order_id | order_date
----------------------------------
100        | 4        | 2021-01-12
100        | 2        | 2021-01-10
100        | 1        | 2021-01-08
200        | 6        | 2021-01-07
200        | 5        | 2021-01-06
200        | 3        | 2021-01-05
```
*Explanation: Top-3 most recent for each product, ordered by order_date descending.*

### Thought Process (as if you’re the interviewee)  
- Need to get, for each product, the latest 3 orders by date.
- Use SQL window function `ROW_NUMBER()` or `RANK()` partitioned by product and ordered by date DESC; then filter to only rows where row_number ≤ 3.

### Corner cases to consider  
- Products with less than 3 orders (return all available)
- Multiple orders on exact same date
- Large number of products
- Orders with missing dates (nulls)

### Solution

```sql
SELECT product_id, order_id, order_date
FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY order_date DESC, order_id DESC) AS rn
  FROM Orders
) t
WHERE rn ≤ 3
ORDER BY product_id, order_date DESC, order_id DESC;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N log N), because of the window function and sort by order_date per product.
- **Space Complexity:** O(N), from the result set. No extra structure beyond query engine temp usage.

### Potential follow-up questions (as if you’re the interviewer)  

- What if order_date is not unique (multiple orders on same day)?  
  *Hint: Add another column—order_id—as tiebreaker.*

- How to get top K instead of top 3?  
  *Hint: Use parameter instead of hardcoded value.*

- Could you write this using correlated subquery instead of window functions?  
  *Hint: Yes, but less efficient and more complex for large data.*

### Summary
Classic SQL use case for **ROW_NUMBER() over PARTITION BY** pattern—extracts top-N per group efficiently, applicable to all top-N grouped extraction scenarios.