### Leetcode 2329 (Easy): Product Sales Analysis V [Practice](https://leetcode.com/problems/product-sales-analysis-v)

### Description  
Given two tables, **Sales** and **Product**:
- The **Sales** table records each sale with columns: `sale_id`, `product_id`, `user_id`, `quantity`.
- The **Product** table lists each product’s `product_id` and its `price`.

For each user, calculate their total **spending** (sum of each product's price \* quantity bought by that user).
Return a list of (`user_id`, `spending`) sorted by descending `spending`. If there’s a tie, order by `user_id` ascending.

### Examples  

**Example 1:**  
Input:  
Sales =  
| sale_id | product_id | user_id | quantity |
|---------|------------|---------|----------|
|   1     |     1      |   101   |   10     |
|   2     |     2      |   101   |    1     |
|   3     |     3      |   102   |    3     |
|   4     |     3      |   102   |    2     |
|   5     |     2      |   103   |    3     |

Product =  
| product_id | price |
|------------|-------|
|     1      |  10   |
|     2      |  25   |
|     3      |  15   |

Output:  
| user_id | spending |
|---------|----------|
|  101    |   125    |
|  102    |    75    |
|  103    |    75    |

*Explanation:  
- User 101: (10 × 10) + (1 × 25) = 100 + 25 = 125  
- User 102: (3 × 15) + (2 × 15) = 45 + 30 = 75  
- User 103: (3 × 25) = 75  
- 102 and 103 spent the same, so 102 comes before 103 (by user_id ascending).*

**Example 2:**  
Input:  
Sales =  
| sale_id | product_id | user_id | quantity |
|---------|------------|---------|----------|
|   1     |     2      |   100   |    2     |

Product =  
| product_id | price |
|------------|-------|
|     2      |  30   |

Output:  
| user_id | spending |
|---------|----------|
|  100    |    60    |

*Explanation:  
Only one user and purchase: 2 × 30 = 60.*

**Example 3:**  
Input:  
Sales = *empty*  
Product =  
| product_id | price |
|------------|-------|
|     1      |  20   |

Output:  
*empty*

*Explanation:  
No sales.*

### Thought Process (as if you’re the interviewee)  
- **Brute force idea:**  
  - For each user, examine all their orders.  
  - For each order, lookup product price, multiply by quantity, sum, then construct the result.

- **SQL approach:**  
  - Join Sales and Product tables using product_id.  
  - For each sale, compute spending = quantity × price.  
  - Group by user_id, sum spending.  
  - Sort by spending desc, user_id asc.

- **Why this approach:**  
  - Using SQL JOIN and GROUP BY directly expresses the intention.  
  - No need for extra subqueries or complex logic.  
  - Handles scalability for millions of records due to index usage on joins.

- **Trade-offs:**  
  - If there's no matching product row (data integrity), the user will not be counted.  
  - If large volume, ensure `product_id` field is indexed.

### Corner cases to consider  
- No sales data at all (empty Sales)  
- Users with 0 or negative quantity (should not happen if data is clean, but check)  
- Products in Sales missing from Product (data error scenario)  
- Multiple users with the same spending (sorting test)  
- Large numbers (overflow unlikely in most DBs, but relational safety)

### Solution

```sql
-- Join Sales and Product on product_id,
-- Compute quantity × price per sale,
-- Group by user, sum up total spending,
-- Order by spending DESC, user_id ASC

SELECT
    user_id,
    SUM(quantity * price) AS spending
FROM
    Sales
    JOIN Product USING (product_id)
GROUP BY
    user_id
ORDER BY
    spending DESC,
    user_id ASC;
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n) where n = number of rows in Sales (plus cost of JOIN, but product_id should be indexed).
  - Sorting adds O(u log u), where u = unique users.

- **Space Complexity:**  
  - O(u) for storing user_id and total spending in memory (output/result set only).

### Potential follow-up questions (as if you’re the interviewer)  

- What if a product in Sales no longer exists in Product?  
  *Hint: Should you use INNER JOIN or LEFT JOIN? How do NULLs affect spending calculation?*

- How to report users who have not made any purchases, with 0 as their spending?  
  *Hint: Involve a Users table and use LEFT JOIN against Sales.*

- How would you get the top k spenders efficiently?  
  *Hint: Using LIMIT clause, discuss index implications on ORDER BY.*

### Summary
This problem is a classic **aggregation and JOIN** pattern in SQL, leveraging GROUP BY with computed columns and a custom sort.  
It is widely applicable in business analytics, order tracking, spending reports, etc.  
Patterns: JOIN, GROUP BY, ORDER BY, computed aggregate columns.  
Common in reporting, analytics, and data-driven product questions.

### Tags
Database(#database)

### Similar Problems
- Product Sales Analysis I(product-sales-analysis-i) (Easy)
- Product Sales Analysis II(product-sales-analysis-ii) (Easy)
- Product Sales Analysis III(product-sales-analysis-iii) (Medium)