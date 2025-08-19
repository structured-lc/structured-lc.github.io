### Leetcode 1069 (Easy): Product Sales Analysis II [Practice](https://leetcode.com/problems/product-sales-analysis-ii)

### Description  
Given two tables:
- **Product**: (product_id, product_name)
- **Sales**: (sale_id, product_id, year, quantity, price)

Write a query to return, for every product\_id present in the Sales table, the **total quantity sold** (sum of quantity over all relevant rows). The result should have columns: product\_id, total\_quantity.

You don’t need to account for any product_ids that don’t appear in Sales.

### Examples  

**Example 1:**  
Input:  
Product:  
| product_id | product_name |
|------------|-------------|
| 100        | Nokia       |
| 200        | Apple       |
| 300        | Samsung     |

Sales:  
| sale_id | product_id | year | quantity | price |
|---------|------------|------|----------|-------|
| 1       | 100        | 2008 | 10       | 5000  |
| 2       | 100        | 2009 | 12       | 5000  |
| 7       | 200        | 2011 | 15       | 9000  |

Output:  
| product_id | total_quantity |
|------------|---------------|
| 100        | 22            |
| 200        | 15            |

*Explanation: Product\_id 100 has two sales (10, 12), totaling 22. Product\_id 200 has one sale: 15.*

**Example 2:**  
Input:  
Product:  
| product_id | product_name |
|------------|-------------|
| 400        | Xiaomi      |

Sales:  
| sale_id | product_id | year | quantity | price |
|---------|------------|------|----------|-------|
| (None)  |            |      |          |       |

Output:  
(no rows)

*Explanation: Since no sales exist, nothing is returned.*

**Example 3:**  
Input:  
Product:  
| product_id | product_name |
|------------|-------------|
| 500        | Sony        |

Sales:  
| sale_id | product_id | year | quantity | price |
|---------|------------|------|----------|-------|
| 1       | 500        | 2012 | 0        | 8000  |
| 2       | 500        | 2013 | 5        | 7500  |

Output:  
| product_id | total_quantity |
|------------|---------------|
| 500        | 5             |

*Explanation: The Sony phone had a sales row with 0 quantity and one with 5, totaling 5.*

### Thought Process (as if you’re the interviewee)  
- The ultimate goal is to find, for every unique product_id in the Sales table, **the sum of quantity**.
- The **brute-force** idea in SQL would be to select all unique product_ids and for each, sum the quantity by scanning the whole Sales table. SQL’s `GROUP BY` does exactly this efficiently.
- We only need to group Sales by product\_id and sum quantity for each.
- No need to join to the Product table, since product_name or products without sales are not required.
- This is straightforward aggregation. The final approach is efficient and concise for any reasonable dataset size.

### Corner cases to consider  
- Sales table is empty ⇒ output is empty.
- Multiple sales per product (should correctly sum).
- Product table contains products with no sales (should not appear in output).
- Products with all zero sales (sum should be zero).
- Only one product\_id (trivial group).

### Solution

```python
# This is an SQL-only problem; here's the equivalent of the relevant SQL query:

SELECT
    product_id,
    SUM(quantity) AS total_quantity
FROM
    Sales
GROUP BY
    product_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the Sales table, since each row is scanned once and grouped by product_id.
- **Space Complexity:** O(k), where k is the number of unique product_ids (each storing an aggregate row in memory).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you return product_names and total_quantity, even for products with zero sales?
  *Hint: Consider using a LEFT JOIN from Product to Sales and COALESCE.*

- What if you needed the average quantity per sale for each product?
  *Hint: Use AVG(quantity) instead of SUM.*

- How to show sales per year per product, not just total?
  *Hint: GROUP BY product_id, year.*

### Summary
This problem uses the common **SQL aggregation** pattern, specifically `GROUP BY` and `SUM()`, to calculate grouped totals. It demonstrates a basic and reusable approach for any data summary tasks, like summing orders per customer, or hits per page, found in both SQL and analytics contexts.

### Tags
Database(#database)

### Similar Problems
- Product Sales Analysis I(product-sales-analysis-i) (Easy)
- Product Sales Analysis III(product-sales-analysis-iii) (Medium)
- Product Sales Analysis IV(product-sales-analysis-iv) (Medium)
- Product Sales Analysis V(product-sales-analysis-v) (Easy)