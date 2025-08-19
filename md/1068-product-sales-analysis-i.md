### Leetcode 1068 (Easy): Product Sales Analysis I [Practice](https://leetcode.com/problems/product-sales-analysis-i)

### Description  
Given two tables, `Sales` and `Product`, report each product's name, the year, and its price from the `Sales` table.  
- The `Sales` table keeps track of: sale_id, product_id, year, quantity, and price.  
- The `Product` table tracks: product_id and product_name.  
For every row in `Sales`, you should output the corresponding product's name (via `product_id`), along with that row's year and price.  
No requirement for sorting order.

### Examples  

**Example 1:**  
Input:  
`Sales =`  
| sale_id | product_id | year | quantity | price |
|---------|------------|------|----------|-------|
|   1     |    100     | 2008 |   10     | 5000  |
|   2     |    100     | 2009 |   12     | 5000  |
|   7     |    200     | 2011 |   15     | 9000  |

`Product =`  
| product_id | product_name |
|------------|-------------|
|    100     |   Nokia     |
|    200     |   Apple     |
|    300     |   Samsung   |

Output:  
| product_name | year | price |
|--------------|------|-------|
|   Nokia      | 2008 | 5000  |
|   Nokia      | 2009 | 5000  |
|   Apple      | 2011 | 9000  |

*Explanation: For every row in Sales, output the matching product_name (lookup by product_id), along with year and price from Sales table.*

**Example 2:**  
Input:  
`Sales = [ ]`  
`Product = [ { product_id: 10, product_name: "LG" } ]`

Output:  
(empty table)

*Explanation: No sales data, so nothing to join/output.*

**Example 3:**  
Input:  
`Sales = [ { sale_id: 1, product_id: 100, year: 2010, quantity: 9, price: 1500 } ]`  
`Product = [ { product_id: 100, product_name: "Dell" }, { product_id: 200, product_name: "HP" } ]`  

Output:  
| product_name | year | price |
|--------------|------|-------|
|   Dell       | 2010 | 1500  |

*Explanation: Only Dell appears in Sales; only output sales records with matching product_id.*

### Thought Process (as if you’re the interviewee)  

- **Understand requirements:**  
  For every row in `Sales`, display:  
  - product_name (by joining on product_id),  
  - year,  
  - price.

- **Approach:**  
  - The brute-force (and only feasible) way is to join `Sales` and `Product` on product_id and select the required fields.
  - In SQL, you use an `INNER JOIN` or `LEFT JOIN` between Sales and Product tables to look up product names.
  - `INNER JOIN` suffices since Sales only contains product_ids present in Product; if not, these won't appear in the result, which matches expectations.

- **Why not just use Sales?**  
  Sales only has product_id, not product_name.  
  Must join to Product to get product_name.

- **Final approach:**  
  Use a JOIN to merge data from both tables and select only the requested columns: product_name, year, price.

### Corner cases to consider  
- Product table has products not present in Sales (should not output these).
- Sales table contains product_id values not matched in Product (rare, depends on data integrity, but will not appear in INNER JOIN).
- Sales table is empty.
- Product table is empty.
- Multiple sales for same product in different years (should all be output).
- Multiple sales for same product in same year (need to output each sale separately).

### Solution

```python
# Since the problem is SQL, here is a Pythonic pseudocode to simulate:
# (Assume sales and products are lists of dicts)

def product_sales_analysis(sales, products):
    # Create a map from product_id to product_name for quick lookup
    product_lookup = {p["product_id"]: p["product_name"] for p in products}
    
    result = []
    for sale in sales:
        pid = sale["product_id"]
        if pid in product_lookup:
            result.append({
                "product_name": product_lookup[pid],
                "year": sale["year"],
                "price": sale["price"]
            })
    return result
```

**Equivalent SQL:**
```sql
SELECT Product.product_name, Sales.year, Sales.price
FROM Sales
JOIN Product ON Sales.product_id = Product.product_id;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is number of rows in Sales.  
  We look up product_name for each sale, which is O(1) if using a hashmap (dict).
- **Space Complexity:** O(p), where p is number of products for the product lookup dictionary, plus O(n) for the output.

### Potential follow-up questions (as if you’re the interviewer)  

- If a product in Sales has no matching entry in Product, should it appear as NULL?   
  *Hint: Think about LEFT JOIN vs. INNER JOIN.*
- Can there be duplicate sales for the same product and year, and if so, should we aggregate?
  *Hint: How would you get the total revenue per product and year?*
- How would you add product quantities or calculate the total revenue per product per year?
  *Hint: Try using SUM(quantity × price) and GROUP BY.*

### Summary
This problem is a straightforward SQL JOIN pattern—a foundational database operation to enrich a primary data set with reference data.  
The key pattern is lookup/join, which is vital in relational databases and common in both SQL and application-level data manipulations. Similar approaches are used in reporting, analytics tasks, and ETL pipelines when joining facts to dimensions.

### Tags
Database(#database)

### Similar Problems
- Product Sales Analysis II(product-sales-analysis-ii) (Easy)
- Product Sales Analysis IV(product-sales-analysis-iv) (Medium)
- Product Sales Analysis V(product-sales-analysis-v) (Easy)