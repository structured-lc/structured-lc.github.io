### Leetcode 2324 (Medium): Product Sales Analysis IV [Practice](https://leetcode.com/problems/product-sales-analysis-iv)

### Description  
Given two tables, **Sales** and **Product**, for each **user**, find the **product id**(s) on which they spent the most total money.  
- The **Sales** table lists transactions: `(sale_id, product_id, user_id, quantity, year)`
- The **Product** table has: `(product_id, price)`

You must report, for each user, the product(s) where (quantity × price) is largest **summed across all sales** for that user-product combination. If there are ties (the same max spend for different products), show all.

### Examples  

**Example 1:**  
Input:  
- Sales =  
  | sale_id | product_id | user_id | quantity | year |
  |---------|------------|---------|----------|------|
  |   1     |     1      |   1     |    2     | 2019 |
  |   2     |     2      |   1     |    3     | 2019 |
  |   3     |     1      |   2     |    1     | 2020 |
- Product =  
  | product_id | price |
  |------------|-------|
  |     1      |  10   |
  |     2      |  100  |  
Output:  
| user_id | product_id |
|---------|------------|
|   1     |     2      |
|   2     |     1      |
*Explanation:*
- User 1: 
    - product 1: 2×10 = 20
    - product 2: 3×100 = 300 (**max**)
- User 2: 
    - product 1: 1×10 = 10 (**max**)

**Example 2:**  
Input:  
- Sales =  
  | sale_id | product_id | user_id | quantity | year |
  |---------|------------|---------|----------|------|
  |   1     |     1      |   1     |    1     | 2020 |
  |   2     |     2      |   1     |    1     | 2020 |
  |   3     |     2      |   1     |    1     | 2021 |
- Product =  
  | product_id | price |
  |------------|-------|
  |     1      | 100   |
  |     2      | 100   |  
Output:  
| user_id | product_id |
|---------|------------|
|   1     |     1      |
|   1     |     2      |
*Explanation:*  
- User 1: 
    - product 1: 1×100 = 100
    - product 2: 1×100 + 1×100 = 200 (**max**)
    - In this case, if both have the same total (e.g., both sum to 200), include both.

**Example 3:**  
Input:  
- Sales =  
  | sale_id | product_id | user_id | quantity | year |
  |---------|------------|---------|----------|------|
- Product =  
  | product_id | price |
  |------------|-------|
Output:  
(empty)  
*Explanation:*  
- No sales, so no output rows.

### Thought Process (as if you’re the interviewee)  
First, I’d start by calculating how much each user spent on each product. This is done by joining Sales with Product and summing (quantity × price) for each (user_id, product_id) pair.

A brute-force approach is:
- For each user, for each product, sum up the spend, then pick the product(s) with the max per user.

This can be optimized by:
- Grouping in SQL with GROUP BY user_id, product_id.
- Using a window function (like DENSE_RANK) to select the maximum total for each user, and picking those product_ids for rank = 1.

Trade-offs:  
- If not using window functions, we’d have to first calculate the totals, find the max per user, then join again to filter just those rows. 
- Window functions simplify this to a concise, efficient solution.

### Corner cases to consider  
- Users with multiple products at the same max spend (tie).
- Users who only bought a single product.
- No sales at all (empty Sales table).
- Products that are in Sales but missing in Product (shouldn’t happen, but if so, missing price).
- Multiple transactions for same product-user pair across years.

### Solution

```python
# Since this is a SQL problem,
# here's the equivalent logic in well-commented SQL.

# Steps:
# 1. Join Sales and Product on product_id.
# 2. For each (user_id, product_id), sum(quantity × price) as total_spent.
# 3. Use DENSE_RANK window function to rank products for each user by total_spent.
# 4. Return (user_id, product_id) where rank is 1.

SELECT
    user_id,
    product_id
FROM (
    SELECT
        s.user_id,
        s.product_id,
        SUM(s.quantity * p.price) AS total_spent,
        DENSE_RANK() OVER (
            PARTITION BY s.user_id
            ORDER BY SUM(s.quantity * p.price) DESC
        ) AS rk
    FROM Sales s
    JOIN Product p
        ON s.product_id = p.product_id
    GROUP BY s.user_id, s.product_id
) ranked
WHERE rk = 1
ORDER BY user_id, product_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(N), where N = number of Sales rows.  
  GROUP BY and window functions scale linearly with the Sales table size.
- **Space Complexity:**  
  O(U × P), up to number of users × products (in practice, only for user-product pairs seen in Sales).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find not just the product id, but also the name, total spent, or purchase count?  
  *Hint: Add columns to the SELECT; join extra tables if needed.*

- What if some products in Sales can be missing from Product?  
  *Hint: Use LEFT JOIN; handle NULL prices as 0 or filter them.*

- Can this be made to run on very large datasets (scale)?  
  *Hint: Partitioning, index on product_id/user_id, or using BigQuery/Spark SQL.*

### Summary
This problem is a classic case of *grouping, aggregation, and ranking* within SQL (or similar patterns in Pandas).  
The central technique is grouping to compute per-group metrics, then using window or ranking functions to filter to the maximal value(s) per group.  
This "Top-N per group" or "Max-per-group" pattern shows up often in analytics queries, leaderboards, and reporting tasks.


### Flashcard
Group sales by user and product, sum spend, then use window functions to find each user’s top product.

### Tags
Database(#database)

### Similar Problems
- Product Sales Analysis I(product-sales-analysis-i) (Easy)
- Product Sales Analysis II(product-sales-analysis-ii) (Easy)
- Product Sales Analysis III(product-sales-analysis-iii) (Medium)