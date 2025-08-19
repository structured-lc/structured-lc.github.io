### Leetcode 1159 (Hard): Market Analysis II [Practice](https://leetcode.com/problems/market-analysis-ii)

### Description  
You are given three tables: **Users** (`user_id`, `join_date`, `favorite_brand`), **Orders** (`order_id`, `order_date`, `item_id`, `buyer_id`, `seller_id`), and **Items** (`item_id`, `item_brand`).  
For each user, determine whether the **brand of the second item they sold by date** is their favorite brand.  
Return a result for each user with columns: `seller_id` and `2nd_item_fav_brand` with values "yes" or "no".  
If a user has sold fewer than two items, return "no" for them.

### Examples  

**Example 1:**  
Input:  
Users:  
| user_id | join_date  | favorite_brand |
|---------|------------|----------------|
| 1       | 2019-01-01 | Lenovo         |
| 2       | 2019-02-09 | Samsung        |
| 3       | 2019-01-19 | LG             |
| 4       | 2019-05-21 | HP             |

Items:  
| item_id | item_brand |
|---------|------------|
| 1       | Samsung    |
| 2       | Lenovo     |
| 3       | LG         |
| 4       | HP         |

Orders:  
| order_id | order_date | item_id | buyer_id | seller_id |
|----------|------------|---------|----------|-----------|
| 1        | 2019-08-01 | 4       | 1        | 2         |
| 2        | 2019-08-02 | 2       | 1        | 3         |
| 3        | 2019-08-03 | 3       | 2        | 3         |
| 4        | 2019-08-04 | 1       | 4        | 2         |
| 5        | 2019-08-05 | 2       | 3        | 4         |

Output:  
| seller_id | 2nd_item_fav_brand |
|-----------|--------------------|
| 1         | no                 |
| 2         | yes                |
| 3         | yes                |
| 4         | no                 |

Explanation.  
- Seller 1: Never sold anything, so "no".
- Seller 2: Sold items on 2019-08-01 (HP) and 2019-08-04 (Samsung). Second item is (Samsung), which matches their favorite, so "yes".
- Seller 3: Sold items on 2019-08-02 (Lenovo) and 2019-08-03 (LG). Second item is (LG), favorite is LG, so "yes".
- Seller 4: Only one item sold, so "no".

**Example 2:**  
Input:  
Users:  
| user_id | join_date  | favorite_brand |
|---------|------------|----------------|
| 5       | 2020-03-01 | Apple          |

Orders:  
(no orders for seller 5)  

Items:  
| item_id | item_brand |
|---------|------------|
| 10      | Apple      |

Output:  
| seller_id | 2nd_item_fav_brand |
|-----------|--------------------|
| 5         | no                 |

Explanation.  
- Seller 5 has no sales at all, so "no".

**Example 3:**  
Input:  
A user with multiple sales, second sold item does *not* match favorite brand.

Output:  
| seller_id | 2nd_item_fav_brand |
|-----------|--------------------|
| ...       | no                 |

Explanation.  
- The brand of the second sale (by date) doesn't match the user's favorite.

### Thought Process (as if you’re the interviewee)  
- Brute-force approach:  
  For each user, collect all their sales ordered by date, select the second, join to the items table for the brand, and compare with their favorite_brand.  
  This can be done by:
    - For each seller, select all orders where the user is the seller.
    - Order these by order_date, pick the second (i.e. rank them).
    - Join back on the user for favorite_brand and on the item for item_brand.
    - If less than two sales, answer is "no".
- Optimization:  
  Using SQL window functions, assign a row_number to each sale per seller based on order_date. Filter for row_number = 2, and use LEFT JOIN with users table to keep sellers with <2 sales.
- This pattern leverages window functions and left joins for completeness and works efficiently.

### Corner cases to consider  
- Users who have not made any sales.
- Users who are not in the orders table at all.
- Users who have made only one sale.
- Multiple sales on the same date (ensure consistent ordering).
- Second sale's brand is NULL or missing in items table.
- Users with favorite_brand that is NULL.

### Solution

```python
# This is a logic explanation, not actual code to run in Python but shows the steps.
# In real interviews for SQL questions, you talk through the logic even if writing Python.

# For each user:
#   1. Get all sales (orders where user is seller), order by order_date.
#   2. If at least 2, take the second.
#   3. Get the brand of the item they sold (join item_id with items).
#   4. Compare with user's favorite_brand (from users table and match with item_brand).
#   5. If less than 2 sales, return "no".

# Example pseudo-SQL logic in Pythonic steps
def market_analysis_ii(users, orders, items):
    # Preprocess: Map for item brands
    item_id_to_brand = {item['item_id']: item['item_brand'] for item in items}
    user_id_to_favorite = {user['user_id']: user['favorite_brand'] for user in users}
    
    # Organize sales per user
    sales = {}
    for order in orders:
        seller = order['seller_id']
        sales.setdefault(seller, []).append((order['order_date'], order['item_id']))
    
    result = []
    for user in users:
        uid = user['user_id']
        u_fav = user['favorite_brand']
        user_sales = sorted(sales.get(uid, []), key=lambda x: x[0])  # sort by order_date
        if len(user_sales) >= 2:
            # Take the second sale
            second_item_id = user_sales[1][1]
            second_item_brand = item_id_to_brand.get(second_item_id, None)
            if second_item_brand == u_fav:
                result.append({'seller_id': uid, '2nd_item_fav_brand': "yes"})
            else:
                result.append({'seller_id': uid, '2nd_item_fav_brand': "no"})
        else:
            result.append({'seller_id': uid, '2nd_item_fav_brand': "no"})
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(U + O log O) where U = number of users, O = number of orders.  
  We process each user's sales (group, sort which could be O(log O) per group) and do lookups in constant time.
- **Space Complexity:** O(U + I + O), where U = users, I = items, O = orders, for the maps/lists we create.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle cases where a user can have multiple favorite brands?  
  *Hint: Use a set or list for favorite brands and check for membership rather than equality.*

- Could there be a tie for second item by order_date and how would you break the tie?  
  *Hint: Use order_id as a secondary sorter or specify logic.*

- What if sales data is very large—can we do this without loading all into memory?  
  *Hint: Use SQL with window functions and streaming, or process user by user.*

### Summary
This problem is a **window function and left join pattern**, common in SQL data analysis.  
It can be generalized to "Nth event" problems and preference matching, which often come up in market analytics and business logic interviews.  
Understanding ranking, partitioning, and joining user attributes is essential here.

### Tags
Database(#database)

### Similar Problems
