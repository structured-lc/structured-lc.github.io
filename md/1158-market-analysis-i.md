### Leetcode 1158 (Medium): Market Analysis I [Practice](https://leetcode.com/problems/market-analysis-i/)

### Description  
Given three tables — **Users**, **Orders**, and **Items** — for an online marketplace, find for each user:
- Their **join date**
- The **number of orders they made as a buyer in 2019**

Return a row for each user, including users with zero orders in 2019.

### Examples  

**Example 1:**  
Users table:
```
| user_id | join_date   | favorite_brand |
| ------- | ----------- | --------------|
| 1       | 2018-01-01  | Lenovo        |
| 2       | 2018-02-09  | Samsung       |
| 3       | 2018-01-19  | LG            |
| 4       | 2018-05-21  | HP            |
```

Orders table:
```
| order_id | order_date           | item_id | buyer_id | seller_id |
| -------- | -------------------- | ------- | -------- | --------- |
| 1        | 2019-08-01 00:00:00  | 4       | 1        | 2         |
| 2        | 2018-08-02 00:00:00  | 2       | 1        | 3         |
| 3        | 2019-08-03 00:00:00  | 3       | 2        | 3         |
| 4        | 2018-08-04 00:00:00  | 1       | 4        | 2         |
| 5        | 2018-08-04 00:00:00  | 1       | 3        | 4         |
| 6        | 2019-08-05 00:00:00  | 2       | 2        | 4         |
```

Input:  
Users, Orders, Items

Output:  
```
| buyer_id | join_date   | orders_in_2019 |
| -------- | ----------- | -------------- |
| 1        | 2018-01-01  | 1              |
| 2        | 2018-02-09  | 2              |
| 3        | 2018-01-19  | 0              |
| 4        | 2018-05-21  | 0              |
```
*Explanation:  
- User 1: 1 order as buyer in 2019 (order_id: 1)
- User 2: 2 orders as buyer in 2019 (order_id: 3, 6)
- User 3 & 4: 0 orders in 2019*

### Thought Process (as if you’re the interviewee)  
Start with the **brute-force** idea:  
Loop through all users, and for each user, count the number of orders in 2019 where they are the buyer.

In SQL, this would mean:
- For each user, **LEFT JOIN** Orders where Orders.buyer_id = Users.user_id and order_date is in 2019.
- This way, users who did not place orders in 2019 still appear (with a count of 0).

Pitfall to avoid:  
- Filtering by order date directly in the WHERE clause after joining _removes_ users without 2019 orders altogether (breaks requirement).
- Correct is to add the year filter in the ON clause of the LEFT JOIN.

Optimized approach:
- LEFT JOIN Orders in 2019 in the ON clause, then GROUP BY user and count orders.

### Corner cases to consider  
- No orders at all: should return 0 for every user
- All orders in years other than 2019 (all orders_in_2019 = 0)
- Users table has only 1 user, or no users
- Multiple orders per user in 2019
- Multiple users with 0 orders

### Solution

```python
# The Python-equivalent logic for what must be done in SQL, with clear stepwise logic.
# (In practice, this problem is solved by SQL, but here's the step-by-step Python logic.)

from datetime import datetime
from collections import defaultdict

def market_analysis(users, orders):
    """
    users: List of dicts with keys: user_id, join_date, favorite_brand
    orders: List of dicts with keys: order_id, order_date, item_id, buyer_id, seller_id

    Returns list of dicts: buyer_id, join_date, orders_in_2019
    """
    # 1. Prepare a mapping from user_id to join_date (and initialize order count 0)
    user_info = {}
    for user in users:
        user_info[user['user_id']] = {
            'join_date': user['join_date'],
            'orders_in_2019': 0
        }

    # 2. Count the number of orders in 2019 for each buyer_id
    for order in orders:
        order_year = datetime.strptime(order['order_date'][:10], "%Y-%m-%d").year
        if order_year == 2019:
            buyer = order['buyer_id']
            if buyer in user_info:
                user_info[buyer]['orders_in_2019'] += 1

    # 3. Build result list
    result = []
    for uid, info in user_info.items():
        result.append({
            'buyer_id': uid,
            'join_date': info['join_date'],
            'orders_in_2019': info['orders_in_2019']
        })
    # Can sort result by buyer_id if required
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m) where n = number of users, m = number of orders.  
  Building the user map is O(n), scanning orders is O(m).
- **Space Complexity:** O(n) for storing per-user info and result.

### Potential follow-up questions (as if you’re the interviewer)  

- Suppose we must return users who placed at least k orders in 2019 only.  
  *Hint: Filter users based on the computed orders_in_2019*

- What if we must return the brands of items purchased by each user in 2019?  
  *Hint: Extend the mapping to collect brands using a join between Orders and Items*

- How can we handle leap years or orders at exactly 2019-12-31 23:59:59?  
  *Hint: Ensure the date string parsing handles the full timestamp and correct year extraction.*

### Summary
This problem requires a **relational join** pattern: retaining all users (even those who did not match on join) and then aggregating matching data. It's foundational in SQL/ETL, and the thinking generalizes to problems where you must report data for all entities even if no related entries exist—typical in reporting, left joins, and anti-joins.


### Flashcard
Use LEFT JOIN to count 2019 orders per user, ensuring users with zero orders are included by grouping after the join, not filtering before.

### Tags
Database(#database)

### Similar Problems
