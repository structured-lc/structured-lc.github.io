### Leetcode 1327 (Easy): List the Products Ordered in a Period [Practice](https://leetcode.com/problems/list-the-products-ordered-in-a-period)

### Description  
You’re given tables for Products, Orders, and possibly Customers. Your task is: for a given period (for example, a range of order dates), **list all the unique products** that were ordered within that period. Return the products sorted (usually by name or ID).

### Examples  

**Example 1:**  
Input: `Products`, `Orders`, `Order_Date` range "2020-01-01" to "2020-01-31"  
Output: `Product_ID`, `Product_Name`  
*Explanation: Return all products present in any order during the date range.*

**Example 2:**  
Input: `Products`, `Orders`, `Order_Date` range "2021-03-15" to "2021-03-20"  
Output: Products ordered in that week, each only once in the result.*

### Thought Process (as if you’re the interviewee)  
This is a **SQL** (data retrieval) type problem. My brute-force idea (if I misunderstand) is to look up all orders in the period, map orders to product IDs, then join with Products table. But a standard and optimal way is:

- Join Orders and Products on Product_ID.
- Filter orders to required date range.
- Select distinct products ordered.

Tradeoffs are about limiting result to only what’s needed (unique products) and ensuring dates are handled correctly.

### Corner cases to consider  
- No orders in the period (empty result).
- Multiple orders for same product (should not duplicate in result).
- Missing or null dates (how to handle?)

### Solution

```sql
SELECT DISTINCT p.product_id, p.product_name
FROM Products p
JOIN Orders o ON p.product_id = o.product_id
WHERE o.order_date BETWEEN 'start_date' AND 'end_date'
ORDER BY p.product_id;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(N), where N is the number of orders in the period (assuming reasonable indexing). Relational DBs optimize joins and filtering efficiently.
- **Space Complexity:** O(K), where K is the number of unique products returned.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you compute the total quantity for each product ordered in the period?  
  *Hint: Use GROUP BY and SUM.*

- What if you want products that were ordered in *every* day of the period?  
  *Hint: Compare product appearance counts to number of days in range.*

- How would you adapt for missing/NULL order dates?  
  *Hint: Add IS NOT NULL checks and adjust filtering.*

### Summary
This solution uses a classic **JOIN** and **DISTINCT** pattern in SQL to get unique records matching criteria. Common in reporting problems, product-lookup, and filtering logic.

### Tags
Database(#database)

### Similar Problems
