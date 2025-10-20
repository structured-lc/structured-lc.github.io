### Leetcode 183 (Easy): Customers Who Never Order [Practice](https://leetcode.com/problems/customers-who-never-order)

### Description  
You’re given two tables: **Customers** (with columns Id, Name) and **Orders** (with columns Id, CustomerId). Write a query to find the names of all customers who have *never placed an order*. That is, return customers who have no corresponding CustomerId in the Orders table.

### Examples  

**Example 1:**  
Input:  
Customers =  
```
+----+-------+  
| Id | Name  |  
+----+-------+  
| 1  | Joe   |  
| 2  | Henry |  
| 3  | Sam   |  
| 4  | Max   |  
+----+-------+
```
Orders =  
```
+----+------------+  
| Id | CustomerId |  
+----+------------+  
| 1  | 3          |  
| 2  | 1          |  
+----+------------+
```
Output:  
```
+-----------+  
| Customers |  
+-----------+  
| Henry     |  
| Max       |  
+-----------+
```
*Explanation:  Henry (Id 2) and Max (Id 4) do not appear as CustomerId in Orders.*

**Example 2:**  
Input:  
Customers =  
```
+----+-------+  
| Id | Name  |  
+----+-------+  
| 1  | Alice |  
+----+-------+
```
Orders =  
```
+----+------------+  
| Id | CustomerId |  
+----+------------+  
-- (empty)  
+----+------------+
```
Output:  
```
+-----------+  
| Customers |  
+-----------+  
| Alice     |  
+-----------+
```
*Explanation: Alice is the only customer and has never ordered.*

**Example 3:**  
Input:  
Customers =  
```
+----+------+
| Id | Name |
+----+------+
| 1  | Bob  |
| 2  | Rick |
+----+------+
```
Orders =  
```
+----+------------+
| Id | CustomerId |
+----+------------+
| 1  | 1          |
| 2  | 2          |
+----+------------+
```
Output:  
```
+-----------+
| Customers |
+-----------+
+-----------+
```
*Explanation: Both customers have orders; result is empty.*

### Thought Process (as if you’re the interviewee)  

- **Naive Approach:**  
  For each customer, check if their Id is *not present* as a CustomerId in Orders. This mimics a search for “anti-join”—finding items in one table that are not in another.

- **Better Approach:**  
  Use a SQL `LEFT JOIN` from Customers to Orders on Id = CustomerId, then pick rows where Orders.Id is NULL (meaning that join didn’t find a match).  
  Alternatively, use a `WHERE NOT IN` subquery: return Names from Customers where Id NOT IN (select CustomerId from Orders).

- **Why these approaches?**  
  - `LEFT JOIN ... WHERE ... IS NULL` is usually preferred for “A but not B” questions, and works even with NULLs in Orders.CustomerId.
  - `NOT IN` is simpler but may have edge cases if Orders.CustomerId can be NULL.

- **Trade-offs:**  
  - Both approaches are readable and efficient for small data.  
  - `LEFT JOIN` tends to be more robust if there are NULLs.

### Corner cases to consider  
- No customers at all (empty Customers table).
- No orders at all (empty Orders table) — all customers returned.
- All customers have at least one order — output is empty.
- Some customers (but not all) have orders.
- Orders table with CustomerId values not matching any Id in Customers (should not affect output).
- Orders table with NULLs in CustomerId column.

### Solution

```python
# We will use python lists to simulate SQL tables.
# Each customer is a dict with 'Id' and 'Name'
# Each order is a dict with 'Id' and 'CustomerId'

def customers_who_never_order(customers, orders):
    # collect all customer ids who have orders
    ordered_ids = set()
    for order in orders:
        if order['CustomerId'] is not None:
            ordered_ids.add(order['CustomerId'])
    
    # collect customer names where their Id is not in ordered_ids
    result = []
    for customer in customers:
        if customer['Id'] not in ordered_ids:
            result.append(customer['Name'])
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m)  
  - n = number of customers, m = number of orders.
  - We scan orders once to build a set, then scan customers once to filter.
- **Space Complexity:** O(m)  
  - For storing CustomerId set (worst case: all orders by unique customers).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the tables are extremely large (big data scale)?  
  *Hint: How would you write this as a distributed MapReduce job or optimize for indexes?*

- What if you need to find customers who placed at least one order, not those who never ordered?  
  *Hint: Flip the logic—either join directly or use IN.*

- What if you want both lists: who never ordered and who ordered at least once, together?  
  *Hint: Output both lists, perhaps as a count or with a flag (0/1), or using GROUP BY.*

### Summary

The core pattern here is *anti-join*: returning items from one table that do not have a match in another. This is extremely common in SQL and database problems, and is best handled with `LEFT JOIN ... WHERE ... IS NULL` or `WHERE NOT IN` subquery logic. The solution uses sets for fast membership testing, a coding pattern frequently reused in interview-style table difference or existence questions.


### Flashcard
LEFT JOIN Customers to Orders and select customers where Orders.Id is null to find those who never ordered.

### Tags
Database(#database)

### Similar Problems
