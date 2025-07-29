### Leetcode 2372 (Medium): Calculate the Influence of Each Salesperson [Practice](https://leetcode.com/problems/calculate-the-influence-of-each-salesperson)

### Description  
Given three tables:

- **Salesperson**(salesperson_id, name): Contains unique salespeople.
- **Customer**(customer_id, salesperson_id): Each customer is assigned to a salesperson.
- **Sales**(sale_id, customer_id, price): Each sale links a customer with the sale amount.

For each salesperson, **calculate the sum of all their assigned customers' purchases (total influence).** If a salesperson has no customers or no sales, they should still appear with total 0.

Return a result table with:  
- salesperson_id  
- name  
- total

### Examples  

**Example 1:**  
Input:  
Salesperson =  
```
| salesperson_id | name  |
|-------|-----|
| 1     | Alice |
| 2     | Bob   |
| 3     | Jerry |
```
Customer =  
```
| customer_id | salesperson_id |
|------|-----|
|   1  |  1  |
|   2  |  1  |
|   3  |  2  |
```
Sales =  
```
| sale_id | customer_id | price |
|----|----|---|
| 1  |  2 | 892 |
| 2  |  1 | 354 |
| 3  |  3 | 988 |
| 4  |  3 | 856 |
```
Output:  
```
| salesperson_id | name  | total |
|-------|-----|-------|
| 1     | Alice | 1246  |
| 2     | Bob   | 1844  |
| 3     | Jerry | 0     |
```
*Explanation:  
- Alice: (customers 1,2) ⇒ 354+892 = 1246  
- Bob: (customer 3) ⇒ 988+856 = 1844  
- Jerry: no customers ⇒ 0*

**Example 2:**  
Input:  
Salesperson =  
```
| salesperson_id | name   |
|-------|------|
| 4     | Simon |
```
Customer =  
```
(empty)
```
Sales =  
```
(empty)
```
Output:  
```
| salesperson_id | name  | total |
|-------|-----|-------|
| 4     | Simon | 0   |
```
*Explanation:  
Simon has no customers and hence their total is 0.*

**Example 3:**  
Input:  
Salesperson =  
```
| salesperson_id | name  |
|-------|------|
| 5     | Zoe  |
```
Customer =  
```
| customer_id | salesperson_id |
|------|------|
| 5    |  5   |
```
Sales =  
```
| sale_id | customer_id | price |
|----|------|---|
| 10 |   5  | 99 |
```
Output:  
```
| salesperson_id | name | total |
|-------|------|-------|
| 5     | Zoe  | 99    |
```
*Explanation:  
Zoe has one customer (5), who made one purchase (99).*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  - For every salesperson, find all their customers by scanning the Customer table.
  - For each customer, sum up all the purchase prices from Sales.
  - Sum this up for each salesperson.

- **Optimized Approach:**  
  - This is fundamentally a join-and-group problem.
  - We can use LEFT JOIN to connect Salesperson with Customer (retaining all salespeople), and then LEFT JOIN to Sales, so every sales record (if any) is associated.  
  - If a salesperson has no customers or no sales, their total should be 0 — so use IFNULL/COALESCE or handle null aggregation.
  - Group by salesperson_id and name.
  - This avoids nested loops and is the idiomatic database approach. Time complexity is driven by the join operations.

- **Edge cases:**  
  - Salesperson with no customers
  - Salesperson’s customers with no sales
  - All tables empty
  - Duplicate customer assignments (shouldn’t happen by schema)
  - Multiple sales for same customer

### Corner cases to consider  
- Salesperson with **no customers**
- Salesperson’s customers with **no sales**
- Some customers not in any sales record
- **Empty tables**: no salespeople, no customers, no sales
- **Multiple purchases** by the same customer (should sum all)
- **Nulls** in data (shouldn’t happen, but handled by LEFT JOIN+IFNULL)

### Solution

```python
# We mimic the SQL logic in Python assuming the input as lists of dicts.
# The solution is usually SQL, but we show a Python logic for interview thinking.

def calculate_influence(salespeople, customers, sales):
    # Map customer_id to salesperson_id
    customer_to_salesperson = {}
    for c in customers:
        customer_to_salesperson[c["customer_id"]] = c["salesperson_id"]
    
    # Map salesperson_id to set of their customer_ids
    salesperson_customers = {}
    for s in salespeople:
        salesperson_customers[s["salesperson_id"]] = set()
    for customer_id, salesperson_id in customer_to_salesperson.items():
        if salesperson_id in salesperson_customers:
            salesperson_customers[salesperson_id].add(customer_id)
    
    # Map customer_id to total of their sales
    customer_sales_total = {}
    for sale in sales:
        cid = sale["customer_id"]
        price = sale["price"]
        customer_sales_total[cid] = customer_sales_total.get(cid, 0) + price
    
    # Build the result for each salesperson
    result = []
    for sp in salespeople:
        sp_id = sp["salesperson_id"]
        name = sp["name"]
        total = 0
        for cid in salesperson_customers[sp_id]:
            total += customer_sales_total.get(cid, 0)
        result.append({"salesperson_id": sp_id, "name": name, "total": total})
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(S + C + N) where S = # sales, C = # customers, N = # salespeople.  
    - Each table scanned once. Lookups and additions are O(1).

- **Space Complexity:**  
  - O(C + N): mappings from customer to salesperson and salesperson to customer set.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we wanted the **average** sale per salesperson, not the sum?  
  *Hint: Track both total and count; at the end divide total by count (if count>0).*

- How to return **only those salespeople whose total exceeds a threshold**?  
  *Hint: After computing totals, add a filter/WHERE clause in SQL, or `if total > threshold` in code.*

- Can you handle if a customer can belong to **multiple salespeople**?  
  *Hint: Modify Customer table to allow many-to-many mapping and adjust joins/logic accordingly.*

### Summary
The approach uses a **multi-table LEFT JOIN and GROUP BY aggregation** pattern. This pattern is very common for statistics/analytics on relational data (databases). It can be applied for “sum per group”, “average/group”, “count/group” and other associative aggregation problems, especially with mandatory-zero handling for missing subgroups.