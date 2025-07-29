### Leetcode 1082 (Easy): Sales Analysis I [Practice](https://leetcode.com/problems/sales-analysis-i)

### Description  
Given two tables: **Product** and **Sales**:
- **Product**: product_id, product_name, unit_price
- **Sales**: seller_id, product_id, buyer_id, sale_date, quantity, price

Write a query to **find the `seller_id`(s) with the highest total price of sales**. If multiple sellers tie for the most, report all their ids. The result should have one column: seller_id.

### Examples  

**Example 1:**  
Input:  
Product:  
```
+------------+--------------+------------+
| product_id | product_name | unit_price |
+------------+--------------+------------+
| 1          | S8           | 1000       |
| 2          | G4           | 800        |
| 3          | iPhone       | 1400       |
+------------+--------------+------------+
```
Sales:  
```
+-----------+------------+----------+------------+----------+-------+
| seller_id | product_id | buyer_id | sale_date  | quantity | price |
+-----------+------------+----------+------------+----------+-------+
| 1         | 1          | 1        | 2019-01-21 | 2        | 2000  |
| 1         | 2          | 2        | 2019-02-17 | 1        | 800   |
| 2         | 2          | 3        | 2019-06-02 | 1        | 800   |
| 3         | 3          | 4        | 2019-05-13 | 2        | 2800  |
+-----------+------------+----------+------------+----------+-------+
```
Output:  
```
+-----------+
| seller_id |
+-----------+
| 1         |
| 3         |
+-----------+
```
*Explanation: Seller 1 sold twice (2000 + 800 = 2800). Seller 3 made a single sale for 2800. Both have the highest total, so both appear in the result.*  

**Example 2:**  
Input:  
Sales:  
```
+-----------+----------+
| seller_id | price    |
+-----------+----------+
| 2         | 400      |
| 3         | 200      |
| 2         | 250      |
| 2         | 350      |
| 4         | 1000     |
+-----------+----------+
```
Output:  
```
+-----------+
| seller_id |
+-----------+
| 2         |
+-----------+
```
*Explanation: Seller 2 sold for total 400 + 250 + 350 = 1000, seller 4 sold for 1000. Both tie for highest; so both could be in result, depending on expected behavior.*  

**Example 3:**  
Input:  
Sales:  
```
+-----------+----------+
| seller_id | price    |
+-----------+----------+
| 1         | 100      |
| 2         | 200      |
+-----------+----------+
```
Output:  
```
+-----------+
| seller_id |
+-----------+
| 2         |
+-----------+
```
*Explanation: Seller 2 has highest total sales price (200).*  


### Thought Process (as if you’re the interviewee)  

First, I'll need to find out how much each seller has sold in total. The `Sales` table gives me the `seller_id` and the `price` (for that transaction).  
- I'll group by `seller_id` and sum the `price` for each seller.
- Once I have this summary, I need to extract just the seller(s) with the maximum total.

Brute-force approach (inefficient):  
- For each seller, scan every sale to compute their total, then compare all these totals.

Optimized SQL approach:  
- Use a GROUP BY on seller_id to get totals.
- Find the maximum of these totals.
- Select the seller(s) whose total equals this maximum.

Trade-off:  
- Simple GROUP + filter, efficient, one pass over data.

### Corner cases to consider  
- Sales table is empty (should return nothing)
- Multiple sellers tie for max total
- All sellers have total 0
- Seller with only one sale
- Negative or zero prices (possibly, if allowed)
- Only one seller in the Sales table

### Solution

```python
# As this is mainly an SQL question, a Python simulation is provided for learning
# Simulate Sales as a list of dicts

def top_sellers(sales):
    # Step 1: Calculate total sales per seller_id
    totals = {}
    for sale in sales:
        seller = sale['seller_id']
        price = sale['price']
        # Sum up each seller's total price
        totals[seller] = totals.get(seller, 0) + price

    # Step 2: Find the maximum total sales value
    if not totals:
        return []
    max_total = max(totals.values())

    # Step 3: Select all seller_ids that have this max total
    return [seller for seller, total in totals.items() if total == max_total]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of sales records. We process each row once, sum totals, and scan seller totals for the max.
- **Space Complexity:** O(m), where m is the number of unique sellers—tracking each seller's total sales.

### Potential follow-up questions (as if you’re the interviewer)  

- If unit price and price differ, how would you calculate total revenue?  
  *Hint: Multiply quantity by unit price if price is per unit, or clarify what "price" column means.*

- How would you handle ties for the highest total sales?  
  *Hint: Return all sellers with the maximum total (as in the current solution).*

- What if you needed top k sellers instead of just the highest?  
  *Hint: Sort sellers by total sales and select k largest.*

### Summary
This problem uses the **grouping + aggregation (sum) + filtering by maximum** coding pattern. It's common in SQL and can be simulated in code by grouping data, applying a reduction operation, and filtering for the best. This pattern applies to rankings, leaderboards, and any "find top performer(s)" scenario.