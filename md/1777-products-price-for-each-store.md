### Leetcode 1777 (Easy): Product's Price for Each Store [Practice](https://leetcode.com/problems/products-price-for-each-store)

### Description  
Given a table `Products` with columns:  
- `product_id` (int): identifies the product  
- `store` (enum: 'store1', 'store2', 'store3'): store where product is sold  
- `price` (int): price of the product in that store  

Each combination of (`product_id`, `store`) is unique.  
For each product, return a table showing its price in each store, with columns `store1`, `store2`, `store3`. If a product is not sold in a store, its entry should be `null`.

### Examples  

**Example 1:**  
Input:  
Products =  
| product_id | store  | price |
|------------|--------|-------|
| 0          | store1 | 95    |
| 0          | store3 | 105   |
| 0          | store2 | 100   |
| 1          | store1 | 70    |
| 1          | store3 | 80    |

Output:  
| product_id | store1 | store2 | store3 |
|------------|--------|--------|--------|
| 0          | 95     | 100    | 105    |
| 1          | 70     | null   | 80     |

*Explanation:*
- Product 0 is available in all 3 stores.
- Product 1 is in store1 and store3, so store2 column is `null`.

**Example 2:**  
Input:  
Products =  
| product_id | store  | price |
|------------|--------|-------|
| 5          | store2 | 135   |

Output:  
| product_id | store1 | store2 | store3 |
|------------|--------|--------|--------|
| 5          | null   | 135    | null   |

*Explanation:*  
- Single product listed in only store2.  

**Example 3:**  
Input:  
Products =  
| product_id | store  | price |
|------------|--------|-------|
| 9          | store3 | 20    |
| 9          | store2 | 15    |

Output:  
| product_id | store1 | store2 | store3 |
|------------|--------|--------|--------|
| 9          | null   | 15     | 20     |

*Explanation:*
- Product 9 is in store2 and store3, not in store1.

### Thought Process (as if you’re the interviewee)  
- The task is a classic SQL pivot where we want each row to show all store prices for one product.  
- **Brute-force:**  
  - We could scan and join for each product and store, but that's inefficient.
- **Optimized Approach:**  
  - Use aggregate functions with CASE.  
  - For each `product_id`, select `MAX(CASE WHEN store=... THEN price)` for each store as a separate column.  
  - This set of conditional aggregations pivots the data, efficiently building the required output.

- *Why is this approach good?*  
  - Single pass over the data.
  - STANDARD for such "pivot" queries in SQL.
  - Output matches exactly what's required: one row per product, each store as column.

### Corner cases to consider  
- Products only in some (not all) stores  
- Products missing from all stores (should not happen per constraints)  
- Only one product in input  
- Only one store exists for a product  
- Repeating prices (doesn't matter; (product_id, store) is unique)

### Solution

```sql
SELECT
    product_id,
    MAX(CASE WHEN store = 'store1' THEN price END) AS store1,
    MAX(CASE WHEN store = 'store2' THEN price END) AS store2,
    MAX(CASE WHEN store = 'store3' THEN price END) AS store3
FROM
    Products
GROUP BY
    product_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of rows in Products. Each row is processed once; aggregate/group-by incurs linear time for reasonable input sizes.
- **Space Complexity:** O(m), where m = number of unique product_ids; only storing results of pivot for output, no extra per-row space.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if there could be more than three stores (dynamic list)?
  *Hint: Consider dynamic SQL or application-side pivoting.*

- What if there are multiple prices for the same (product_id, store) due to data error?
  *Hint: Use aggregate (MIN, MAX) to select one, or list all as comma-separated.*

- Could this be done without using CASE statement?
  *Hint: Use self-joins or other aggregate/pivot methods, but CASE is standard.*

### Summary
This SQL pivot pattern (aggregate + CASE in SELECT) is a very common approach for transforming “long” data (rows per entity/attribute) into a “wide” table (row per entity, attribute as columns). It’s widely applicable for reporting, stats, and migration problems, especially useful for grouped, conditional summaries.