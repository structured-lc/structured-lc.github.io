### Leetcode 1398 (Medium): Customers Who Bought Products A and B but Not C [Practice](https://leetcode.com/problems/customers-who-bought-products-a-and-b-but-not-c)

### Description  
Given a table **"Orders"** with columns customer_id and product_name, write an SQL query to find customer ids who bought both product 'A' and product 'B', but did **not** buy product 'C'. Return the result sorted in ascending order.

### Examples  

**Example 1:**  
Input:   
Orders table:
```
+-------------+--------------+
| customer_id | product_name |
+-------------+--------------+
| 1           | A            |
| 1           | B            |
| 1           | D            |
| 2           | B            |
| 2           | C            |
| 3           | A            |
| 3           | B            |
| 3           | C            |
| 4           | A            |
| 4           | B            |
| 4           | D            |
+-------------+--------------+
```
Output: `1,4`
*Explanation: Customer 1 and 4 both have 'A' and 'B' but no 'C'.*

### Thought Process (as if you’re the interviewee)  
- Need to group by customer_id and count which products they've purchased
- Customers must have both 'A' and 'B', and must NOT have 'C'
- The easiest is to count distinct products per user, or aggregate using CASE WHEN for each item
- Return those ids whose bought_A = 1 AND bought_B = 1 AND bought_C = 0

### Corner cases to consider  
- Customer with only A or only B
- Customer with duplicates (multiple purchases of A or B)
- Customers who bought C plus A/B
- Customer who bought no products or only C

### Solution

```sql
SELECT customer_id
FROM Orders
GROUP BY customer_id
HAVING SUM(product_name = 'A') > 0
   AND SUM(product_name = 'B') > 0
   AND SUM(product_name = 'C') = 0
ORDER BY customer_id ASC;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is rows in Orders table (scan & group).
- **Space Complexity:** O(U), where U is distinct customers (hash table/group storage).

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want customers who bought at least two out of three products?  
  *Hint: Use COUNT(DISTINCT product_name) per customer, or SUM(CASE...).* 

- How would you generalize for arbitrary products, not just three?  
  *Hint: Subquery for each required flag.*

- Can you handle large datasets efficiently if table is huge?  
  *Hint: Add indexes on (customer_id, product_name); or pre-aggregate by batch.*

### Summary
This problem is a typical SQL aggregation "group by with filter per group" pattern. The CASE in SUM is a classic way to do boolean matching per product per user. Applicable wherever group-wise presence/absence queries are needed.


### Flashcard
Select customers who bought both A and B but not C using GROUP BY and HAVING with conditional sums.

### Tags
Database(#database)

### Similar Problems
