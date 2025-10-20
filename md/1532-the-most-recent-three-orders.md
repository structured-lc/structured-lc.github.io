### Leetcode 1532 (Medium): The Most Recent Three Orders [Practice](https://leetcode.com/problems/the-most-recent-three-orders)

### Description  
Given two database tables, **Customers** (customer_id, name) and **Orders** (order_id, order_date, customer_id, ...), return each customer's three most recent orders.  
For each customer, include their name, customer_id, order_id, and order_date.  
If a customer has fewer than three orders, return all their orders.  
Sort the result by customer_name (ASC), customer_id (ASC), and order_date (DESC).  

### Examples  

**Example 1:**  
Input:  
Customers  
| customer_id | name    |  
|-------------|---------|  
| 1           | Alice   |  
| 2           | Bob     |  

Orders  
| order_id | order_date | customer_id |  
|----------|------------|-------------|  
| 11       | 2021-01-01 | 1           |  
| 12       | 2021-01-02 | 1           |  
| 13       | 2021-02-01 | 1           |  
| 14       | 2021-02-02 | 1           |  
| 15       | 2021-01-05 | 2           |  

Output:  
| customer_name | customer_id | order_id | order_date |  
|---------------|-------------|----------|------------|  
| Alice         | 1           | 14       | 2021-02-02 |  
| Alice         | 1           | 13       | 2021-02-01 |  
| Alice         | 1           | 12       | 2021-01-02 |  
| Bob           | 2           | 15       | 2021-01-05 |  

*Explanation:  Alice has 4 orders, but only the top 3 most recent by order_date are shown. Bob only has 1 order, so it is shown.*

**Example 2:**  
Input:  
Customers  
| customer_id | name    |  
|-------------|---------|  
| 1           | Alice   |  
| 2           | Bob     |  

Orders  
| order_id | order_date | customer_id |  
|----------|------------|-------------|  
| 10       | 2022-01-01 | 1           |  
| 11       | 2022-02-01 | 1           |  

Output:  
| customer_name | customer_id | order_id | order_date |  
|---------------|-------------|----------|------------|  
| Alice         | 1           | 11       | 2022-02-01 |  
| Alice         | 1           | 10       | 2022-01-01 |  

*Explanation: Alice only has 2 orders, so both are included. Bob has none, so doesn’t appear.*

**Example 3:**  
Input:  
Customers  
| customer_id | name    |  
|-------------|---------|  
| 3           | John    |  

Orders  
| order_id | order_date | customer_id |  
|----------|------------|-------------|  
| 101      | 2021-12-01 | 3           |  
| 102      | 2021-12-02 | 3           |  
| 103      | 2021-12-03 | 3           |  

Output:  
| customer_name | customer_id | order_id | order_date |  
|---------------|-------------|----------|------------|  
| John          | 3           | 103      | 2021-12-03 |  
| John          | 3           | 102      | 2021-12-02 |  
| John          | 3           | 101      | 2021-12-01 |  

*Explanation: John has exactly 3 orders, all are included in descending order.*

### Thought Process (as if you’re the interviewee)  
- Brute-force: For each customer, extract all their orders; sort the orders for each customer by order_date descending and select the top 3.  
  This is inefficient when working with SQL since it queries many times or fetches a large volume of data.
- Optimization (Window function): Use SQL window functions like ROW_NUMBER or DENSE_RANK partitioned by customer_id, ordered by order_date descending, to assign an order/rank to each order within per-customer group.  
  Then filter where rank ≤ 3.
- Output: Join Customers on Orders to get names and required info, sort the output as specified.
- Trade-offs: Window functions are fast and scalable for this ranking-per-group problem, and express intent clearly.

### Corner cases to consider  
- Customers with < 3 orders (should show all for them)
- Customers with exactly 3 orders
- Customers with no orders (should NOT appear in the result)
- Orders on same date (tie-breaking is ok, as per order_id or as is)
- Multiple customers with same name
- Empty Orders table

### Solution

```python
# Since this is a SQL problem, here is the approach in Python code style for interview explanation

def get_most_recent_three_orders(customers, orders):
    # customers: list of dicts with {customer_id, name}
    # orders: list of dicts with {order_id, order_date, customer_id}
    
    # Step 1: Map customer_id → customer_name
    id_to_name = {c['customer_id']: c['name'] for c in customers}
    
    # Step 2: Group orders by customer_id
    from collections import defaultdict
    cust_orders = defaultdict(list)
    for order in orders:
        cust_orders[order['customer_id']].append(order)
    
    # Step 3: For each customer, sort orders by order_date descending, keep up to 3
    result = []
    for cust_id, olist in cust_orders.items():
        # Sort by order_date descending, if tie by order_id descending (optional)
        olist_sorted = sorted(olist, key=lambda x: (x['order_date'], x['order_id']), reverse=True)
        for o in olist_sorted[:3]:
            result.append({
                'customer_name': id_to_name[cust_id],
                'customer_id': cust_id,
                'order_id': o['order_id'],
                'order_date': o['order_date']
            })
    
    # Step 4: Sort result as required: customer_name asc, customer_id asc, order_date desc
    result.sort(key=lambda x: (x['customer_name'], x['customer_id'], x['order_date']), reverse=False)
    # To respect order_date desc in tertiary key:
    result.sort(key=lambda x: (x['customer_name'], x['customer_id'], -int(x['order_date'].replace('-',''))))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(m log m) total, where m = number of orders.  
  - Grouping: O(m) over all orders.  
  - Per-customer sort: each customer's orders are sorted, in worst case all orders belong to one customer, so O(m log m).
  - Final sort: O(m log m).
- **Space Complexity:**  
  O(m + n), where m is the number of orders and n is the number of customers (for mapping and grouping).

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose we want the most recent n orders (not always 3)—how do you generalize your solution?  
  *Hint: Make n a parameter in the window function (SQL: WHERE row_num ≤ n)*

- How would you handle orders with identical timestamps cleanly?  
  *Hint: Add order_id as secondary sort field in ORDER BY for stability.*

- How would you write this in pure SQL with good performance?  
  *Hint: Use ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) then filter WHERE row_num ≤ 3*

### Summary
This problem uses the **"top k elements in group"** pattern, often solved using window functions in SQL (ROW_NUMBER, RANK, DENSE_RANK) or sorting/grouping in code. These techniques are common when filtering the "latest N per group", such as logs, user events, payments, reviews, etc.  
Understanding result ordering and partitioning logic is widely applicable for data reporting and analytics scenarios.


### Flashcard
Use SQL window functions like ROW_NUMBER() to efficiently rank orders per customer and select the top three.

### Tags
Database(#database)

### Similar Problems
- The Most Recent Orders for Each Product(the-most-recent-orders-for-each-product) (Medium)