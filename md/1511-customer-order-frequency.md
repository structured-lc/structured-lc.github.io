### Leetcode 1511 (Easy): Customer Order Frequency [Practice](https://leetcode.com/problems/customer-order-frequency)

### Description  
Given a table "Orders" with columns `customer_id` and `order_date`, output a table showing each customer's most recent order date. If a customer has placed only one order, that's their most recent.

### Examples  
**Example 1:**  
Input: `Orders` = [ [1, '2020-01-01'], [2, '2020-01-03'], [1, '2020-03-01'] ]  
Output: `[ [1, '2020-03-01'], [2, '2020-01-03'] ]`  
*Explanation: For customer 1, latest is 2020-03-01; for 2, only one order.*

**Example 2:**  
Input: `Orders` = [ [3, '2022-08-11'] ]  
Output: `[ [3, '2022-08-11'] ]`  
*Explanation: Single customer, single order.*

**Example 3:**  
Input: `Orders` = [ ]  
Output: `[ ]`  
*Explanation: No orders at all results in an empty output.*

### Thought Process (as if you’re the interviewee)  
The key is grouping by customer. For each customer, we want the maximum (latest) order_date. This is a trivial SQL "group by" problem: select customer_id, max(order_date) from Orders group by customer_id. For interview, also point out: order_date values are comparable strings if YYYY-MM-DD. You might want to sort or do aggregation, but max is more efficient.

### Corner cases to consider  
- No rows (empty table)
- Only one customer with multiple orders
- Multiple customers, some with only one order

### Solution

```sql
SELECT customer_id, MAX(order_date) AS last_order_date
FROM Orders
GROUP BY customer_id;
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n = number of rows in Orders, as we scan all rows at least once.
- **Space Complexity:** O(k), where k = number of unique customers (for group aggregation).

### Potential follow-up questions (as if you’re the interviewer)  
- How to extend if customers can have multiple orders on the same date?
  *Hint: You could include order_id to get unique orders.*

- Can you get customers who have multiple orders in their latest date?
  *Hint: Use HAVING COUNT(*) > 1 after GROUP BY customer_id, order_date.*

- Could you show each order along with a flag for whether it is the latest?  
  *Hint: Use window functions like ROW_NUMBER or RANK.*

### Summary
This is a classic SQL aggregation pattern: group by a key, compute max/min/sum for each group. This pattern extends to many reporting/database analytics interview problems.
