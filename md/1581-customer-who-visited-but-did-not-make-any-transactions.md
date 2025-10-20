### Leetcode 1581 (Easy): Customer Who Visited but Did Not Make Any Transactions [Practice](https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions)

### Description  
You are given two tables: `Visits` records each visit a customer made to the bank (with `customer_id`), and `Transactions` which records transactions (by `visit_id`). Find the IDs of customers who visited the bank but did not make any transactions. Return a result with customer_id as column name, without duplicates, sorted ascending.

### Examples  
**Example 1:**  
Input:  
Visits = `[[1, 101], [2, 102], [3, 103], [4, 104]]` (customer_id, visit_id)  
Transactions = `[[3, 103], [4, 104]]` (visit_id, transaction_id)  
Output: `[1, 2]`  
*Explanation: Customers 1 and 2 visited (visit_ids 101, 102) but do not have a matching transaction.*

### Thought Process (as if you’re the interviewee)  
- The problem asks for customers whose `visit_id` does not appear in the `Transactions` table.
- The brute-force way would be to check, for each visit, whether there is a transaction; if not, keep the customer.
- This is a classical anti-join problem: select from Visits where visit_id not in Transactions.
- Using SQL, solve via LEFT JOIN or NOT EXISTS or NOT IN.
- Remove duplicates customer_ids and sort.

### Corner cases to consider  
- All visits have transactions: should return empty.
- No transactions: return all customer_ids from Visits.
- Multiple visits by a customer with or without a transaction: should not repeat customer in output.

### Solution

```python
# pandas implementation (since no python SQL here)
def find_customers_without_transaction(visits, transactions):
    # visits: List[List[int: customer_id, visit_id]]
    # transactions: List[List[int: visit_id, transaction_id]]
    visit_map = {}
    for customer_id, visit_id in visits:
        visit_map[visit_id] = customer_id
    trans_visit_ids = set([visit_id for visit_id, _ in transactions])
    result = set()
    for customer_id, visit_id in visits:
        if visit_id not in trans_visit_ids:
            result.add(customer_id)
    return sorted(result)
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(V + T), linear in number of visits and transactions, due to set/datamap usage.
- **Space Complexity:** O(V), to store mapping and result set.

### Potential follow-up questions (as if you’re the interviewer)  
- How would you implement this for very large data?  
  *Hint: Consider database-side solutions (SQL joins, indexing), not just in-memory processing.*

- How do you minimize duplicate results if customers have multiple visits?  
  *Hint: Use a set or SQL DISTINCT.*

### Summary
This problem uses anti-join logic and is a classic example of data filtering with exclusion (LEFT JOIN/NOT IN). Mastering such queries is essential for data analytics, SQL interviews, and backend coding patterns.


### Flashcard
Find customers with visits not in Transactions using anti-join (LEFT JOIN, NOT IN, or NOT EXISTS); deduplicate and sort results.

### Tags
Database(#database)

### Similar Problems
- Sellers With No Sales(sellers-with-no-sales) (Easy)