### Leetcode 1164 (Medium): Product Price at a Given Date [Practice](https://leetcode.com/problems/product-price-at-a-given-date)

### Description  
Given a table `Products` with columns: `product_id`, `new_price`, and `change_date`, you are to find the *price* of every product at a specific given date (in this case, '2019-08-16').  
- *If a product has no price update on or before the given date, its default price is 10.*
- *You must return each product's latest price by the provided date.*

### Examples  

**Example 1:**  
Input:  
```
Products table:
product_id | new_price | change_date
-----------|-----------|------------
1          |    20     | 2019-08-14
2          |    50     | 2019-08-14
1          |    30     | 2019-08-15
1          |    35     | 2019-08-16
2          |    65     | 2019-08-17
3          |    20     | 2019-08-18
```
Output:
```
product_id | price
-----------|------
2          |  50
1          |  35
3          |  10
```
*Explanation:*
- For product 1: latest price ≤ 2019-08-16 is 35
- For product 2: latest price ≤ 2019-08-16 is 50
- For product 3: no change before 2019-08-16, so price is 10

**Example 2:**  
Input:  
```
Products:
product_id | new_price | change_date
4          |  100      | 2019-08-15
4          |  110      | 2019-08-20
5          |   60      | 2019-08-18
```
Output:  
```
product_id | price
-----------|------
4          | 100
5          | 10
```
*Explanation:*
- For product 4: last price before or on '2019-08-16' is 100
- For product 5: no prior change, so price is 10

**Example 3:**  
Input:  
```
Products:
product_id | new_price | change_date
6          |    80     | 2019-08-12
6          |    90     | 2019-08-16
6          |    95     | 2019-08-17
```
Output:  
```
product_id | price
-----------|------
6          | 90
```
*Explanation:* 
- Product 6 had two updates before/on 2019-08-16; take the one with the latest date (90 on 2019-08-16).

### Thought Process (as if you’re the interviewee)  

First, I want to ensure I return *all* products with their correct price as of a given date.
- **Brute force** would mean, for each product, filter for all price changes before or on the target date, find the one with the latest date, otherwise return 10.
- In SQL, this suggests using window functions like `RANK()` or `ROW_NUMBER()` partitioned by `product_id`, ordered by `change_date DESC`, and only considering rows where `change_date ≤ 'given date'`. Select the top-ranked price for each, or default to 10 if none.
- To ensure products with *no* old price at all are included, do a LEFT JOIN between all distinct `product_id`s and the set of latest prices on/ before the date, then use `IFNULL` or similar logic to set missing to 10.

#### Optimization / Final approach:
- Use a CTE to rank price changes for each product before/on the date.
- Select the top-ranked entry per product.
- Left join all products to this to ensure inclusion, using `IFNULL` to default price to 10 where necessary.
- This approach is robust for large tables and avoids correlated subqueries.

### Corner cases to consider  
- Product never had a price change (should return 10).
- Multiple products with/without changes.
- Price changes all after the given date.
- Multiple changes on the same date (guaranteed unique by time? If not, choosing any is acceptable.)
- Very large datasets (window function efficiency).
- Products table empty.

### Solution

```python
# Since this is a SQL question, here's the approach in MySQL.
# For illustrative and interview practice purposes, this can also be staged using Python steps conceptually.

# SQL Approach (interview-friendly explanation):

WITH RankedProducts AS (
    SELECT 
        product_id,
        new_price,
        RANK() OVER (
            PARTITION BY product_id
            ORDER BY change_date DESC
        ) AS rnk
    FROM Products
    WHERE change_date <= '2019-08-16'
)
SELECT
    all_products.product_id,
    IFNULL(rp.new_price, 10) AS price
FROM
    (SELECT DISTINCT product_id FROM Products) as all_products
LEFT JOIN
    (SELECT product_id, new_price FROM RankedProducts WHERE rnk = 1) rp
ON all_products.product_id = rp.product_id;

# Python (conceptual, interviewer expects SQL but to show the windowing logic):

from collections import defaultdict

def prices_at_date(products, target_date):
    # products: List[Dict] with keys 'product_id', 'new_price', 'change_date'
    # target_date: string 'YYYY-MM-DD'
    last_price = {}
    all_ids = set()
    for prod in products:
        all_ids.add(prod['product_id'])
        # Only consider if <= target date
        if prod['change_date'] <= target_date:
            # If not seen or this is more recent
            if (prod['product_id'] not in last_price or 
                prod['change_date'] > last_price[prod['product_id']][1]):
                last_price[prod['product_id']] = (prod['new_price'], prod['change_date'])
    output = []
    for pid in all_ids:
        price = last_price.get(pid, (10,))
        output.append({'product_id': pid, 'price': price[0]})
    return output
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is number of rows in Products. Only a single pass and basic sorts (window function is optimized).
- **Space Complexity:** O(P), where P is the number of unique product_ids (for bookkeeping, not storing the full input).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle multiple price changes at exactly the same date and time?
  *Hint: Add tiebreaker logic (e.g., prefer highest/lowest new_price).*
- Could you generalize this to fetch a price for any arbitrary date?
  *Hint: Use a parameter for the date; code is general with respect to date input.*
- What if price changes are rare and table is huge—how to optimize?
  *Hint: Consider indexing on (product_id, change_date) for speed.*

### Summary
This problem is a classic *window function / latest-in-group* pattern—very commonly used in SQL interviews as well as analytics work, e.g., for snapshotting user or product state at a given time. The approach is efficient and can be generalized for other "latest before cutoff" queries.

### Tags
Database(#database)

### Similar Problems
