### Leetcode 1336 (Hard): Number of Transactions per Visit [Practice](https://leetcode.com/problems/number-of-transactions-per-visit)

### Description  
Given two tables: `Visits (visit_id, customer_id)` and `Transactions (transaction_id, visit_id, amount)`, return, for each visit (by customer_id), the number of transactions and the total amount spent per visit, including visits where there were no transactions (should count as number_of_transactions = 0 and amount = 0).

### Examples  

**Example 1:**  
Input: Visits = [[1, 23], [2, 9], [3, 5], [4, 30], [5, 54], [6, 96], [7, 54]], Transactions = [[2, 5, 310], [3, 5, 300], [9, 5, 200], [10, 6, 234]]  
Output: 
  
| customer_id | visit_id | transactions_count | amount |  
| ----------- | -------- | ----------------- | ------ |  
|        23   |     1    |        0          |    0   |  
|         9   |     2    |        0          |    0   |  
|         5   |     3    |        0          |    0   |  
|        30   |     4    |        0          |    0   |  
|        54   |     5    |        2          | 610    |  
|        96   |     6    |        1          | 234    |  
|        54   |     7    |        0          |    0   |  

*Explanation: Each visit from the Visits table is listed, joined with Transactions. Counts/amount from Transactions; if no Transaction, count/amount = 0.*

**Example 2:**  
Input: Visits = [], Transactions = []  
Output:  
*(Empty output, as there are no visits.)*

### Thought Process (as if you’re the interviewee)  
- We need, for each visit, to count how many transactions occurred, and what was the total transaction amount. All visits must be included, even those without transactions.
- SQL: Use a LEFT JOIN from Visits to Transactions on visit_id, GROUP BY visit_id and customer_id, then COUNT transaction_id and SUM amount (placing coalesce/ifnull for amount/count to default to 0 if there are no transactions).

### Corner cases to consider  
- Visits with zero transactions
- Transactions with visit ids not in Visits
- Duplicates in Visits or Transactions
- Completely empty tables
- Multiple transactions per visit
- Large amounts

### Solution

```python
# Since the problem is SQL-like, pseudocode for SQL solution:

SELECT
  v.customer_id,
  v.visit_id,
  COUNT(t.transaction_id) AS transactions_count,
  COALESCE(SUM(t.amount), 0) AS amount
FROM Visits v
LEFT JOIN Transactions t ON v.visit_id = t.visit_id
GROUP BY v.customer_id, v.visit_id
ORDER BY v.customer_id, v.visit_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M), where N = number of visits, M = number of transactions (join and group-by dominate)
- **Space Complexity:** O(N), proportional to output

### Potential follow-up questions (as if you’re the interviewer)  

- How to handle visits without transactions efficiently?  
  *Hint: Left join ensures all visits appear.*
- What if the number of visits is huge (millions)?  
  *Hint: Indexed joins, consider sharding by customer.*
- Can you include only visits with transactions?  
  *Hint: INNER JOIN instead of LEFT JOIN.*

### Summary
This is a common SQL aggregation and join problem. The pattern—using LEFT JOIN and coalesce for missing data—arises in most reporting/BI tasks where you need all of one table and zero/more from a related fact table.