### Leetcode 3657 (Medium): Find Loyal Customers [Practice](https://leetcode.com/problems/find-loyal-customers)

### Description  
Given a database of customer transactions, identify the **loyal customers**.  
A customer is defined as **loyal** only if they satisfy all of the following:
- Made at least **3 purchase transactions**.
- Have **not returned any item**.
- Made purchases with a total spending of **at least $1000**.

Return the customer id(s) of all loyal customers.

### Examples  

**Example 1:**  
Input:  
A `Purchases` table:
```
| customer_id | amount | transaction_type |
|-------------|--------|-----------------|
|      1      |  500   |     'purchase'  |
|      1      |  300   |     'purchase'  |
|      1      |  400   |     'purchase'  |
|      2      |  150   |     'purchase'  |
|      2      |  100   |     'return'    |
|      3      |  500   |     'purchase'  |
|      3      |  800   |     'purchase'  |
|      3      |  100   |     'purchase'  |
```
Output:  
`[1, 3]`  
Explanation:  
Customer 1: 3 purchases, total = 1200, no returns → loyal.  
Customer 2: return transaction → not loyal.  
Customer 3: 3 purchases, total = 1400, no returns → loyal.

**Example 2:**  
Input:  
```
| customer_id | amount | transaction_type |
|-------------|--------|-----------------|
|      7      |  200   |   'purchase'    |
|      7      |  400   |   'purchase'    |
|      7      |  300   |   'purchase'    |
|      8      |  400   |   'purchase'    |
|      8      |  600   |   'purchase'    |
|      8      |  100   |   'return'      |
```
Output:  
``  
Explanation:  
Customer 7: 3 purchases, total = 900, but does not reach $1000 → not loyal.  
Customer 8: has a return transaction → not loyal.

**Example 3:**  
Input:  
```
| customer_id | amount | transaction_type |
|-------------|--------|-----------------|
|      5      | 1000   |  'purchase'     |
|      5      | 200    |  'return'       |
|      6      | 400    |  'purchase'     |
|      6      | 500    |  'purchase'     |
|      6      | 200    |  'purchase'     |
```
Output:  
`[]`  
Explanation:  
Customer 5: has a return transaction → not loyal.  
Customer 6: 3 purchases, total = 1100, no returns → loyal.

### Thought Process (as if you’re the interviewee)  

First, I need to identify all customers who have at least 3 'purchase' transactions.  
Second, I want to exclude customers who have any transaction with `transaction_type='return'`.  
Third, I need to sum the amounts for 'purchase' transactions and check total ≥ 1000.

A brute-force idea is to loop through each customer, count their purchase records, check for returns, and sum amounts, but that's not efficient for a database.  
Instead, I should aggregate data using SQL's `GROUP BY`, count purchases, filter out anyone with returns, and sum the purchase amounts.  
The trickiest condition is excluding customers with returns, which can be achieved using a HAVING clause or NOT EXISTS subquery.

### Corner cases to consider  
- Customer with exactly 3 purchases totaling exactly 1000 (inclusion).
- Customer with both purchases and at least one return (exclusion).
- Customers with fewer than 3 purchases.
- Zero customers in the table.
- Purchase amounts that sum far above or just below 1000 threshold.
- Customer with return but more than 3 purchases and high sum (must be excluded).

### Solution

```python
# Assume transactions is a list of dicts, each with 'customer_id', 'amount', 'transaction_type'
def find_loyal_customers(transactions):
    # Step 1: Prepare customer-wise aggregates
    from collections import defaultdict
    
    purchase_count = defaultdict(int)      # customer_id -> count of purchases
    purchase_sum = defaultdict(int)        # customer_id -> sum of purchases
    has_return = set()                     # customer_ids which had any return
    
    for trx in transactions:
        cid = trx['customer_id']
        if trx['transaction_type'] == 'purchase':
            purchase_count[cid] += 1
            purchase_sum[cid] += trx['amount']
        elif trx['transaction_type'] == 'return':
            has_return.add(cid)
    
    # Step 2: Filter for loyal customers
    result = []
    for cid in purchase_count:
        if (purchase_count[cid] >= 3
            and purchase_sum[cid] >= 1000
            and cid not in has_return):
            result.append(cid)
            
    result.sort()
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N = number of transactions.  
  Each transaction is processed once to build aggregates.  
  Final filtering is O(C), C = number of unique customers (C ≤ N).
- **Space Complexity:** O(C) for the dictionaries and set, where C = number of unique customers.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle millions of records stored in a database?
  *Hint: Think about SQL aggregates and indexes; try implementing in SQL.*

- What if each purchase and return had a timestamp and you want loyalty in a particular time period?
  *Hint: Add filtering logic based on date ranges.*

- If a customer makes a return, but after the 3rd purchase, are they still loyal?
  *Hint: Sequence of transactions now matters — sliding window logic may be needed.*

### Summary
This is a classic **group by and aggregate** pattern, useful for filtering based on grouped statistics, and seen in many analytics problems.  
Common pattern for customer segmentation and filtering in SQL and analytics.  
Variants may require date filtering, window functions, or exclusion logic.

### Tags

### Similar Problems
