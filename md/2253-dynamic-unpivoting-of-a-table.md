### Leetcode 2253 (Hard): Dynamic Unpivoting of a Table [Practice](https://leetcode.com/problems/dynamic-unpivoting-of-a-table)

### Description  
You are given a SQL table called **Products**.  
Each row represents the price list of a product across multiple stores, for a given `product_id`.  
The columns are:  
- `product_id` (INTEGER, primary key)
- one or more columns named as store names (each a store’s price for the product, or NULL if not available).

The number and names of store columns can change between testcases, and are not fixed in advance.  
You are to write a SQL query (or, if in Python, mimic the output) that **unpivots** these columns—transforming the table so each row contains:
- product_id
- store (name as in the column header)
- price  
Include only entries where the price is NOT NULL.

### Examples  

**Example 1:**  
Input:  
```
Products table:
+------------+--------+--------+
| product_id | StoreA | StoreB |
+------------+--------+--------+
|    100     |  5     |  6     |
|    200     |  7     | NULL   |
+------------+--------+--------+
```
Output:  
```
+------------+--------+-------+
| product_id | store  | price |
+------------+--------+-------+
|    100     | StoreA |   5   |
|    100     | StoreB |   6   |
|    200     | StoreA |   7   |
+------------+--------+-------+
```
*Explanation: The product 100 is sold in both stores; 200 is only available in StoreA. Products with NULL price in a store are excluded.*

**Example 2:**  
Input:  
```
Products table:
+------------+--------+--------+--------+
| product_id | S1     | S2     | S3     |
+------------+--------+--------+--------+
|    123     | NULL   | 10     |  5     |
|    456     |  6     | NULL   |  7     |
+------------+--------+--------+--------+
```
Output:  
```
+------------+--------+-------+
| product_id | store  | price |
+------------+--------+-------+
|    123     | S2     |  10   |
|    123     | S3     |   5   |
|    456     | S1     |   6   |
|    456     | S3     |   7   |
+------------+--------+-------+
```
*Explanation: All non-NULL (i.e., available) prices are shown, each as a separate row with its store name.*

**Example 3:**  
Input:  
```
Products table:
+------------+----------+
| product_id | MarketX  |
+------------+----------+
|    88      | NULL     |
|    99      |  4       |
+------------+----------+
```
Output:  
```
+------------+--------+-------+
| product_id | store  | price |
+------------+--------+-------+
|    99      | MarketX|   4   |
+------------+--------+-------+
```
*Explanation: Only product 99 has a price in MarketX. Product 88 is not available in MarketX, so skipped.*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  If the store columns were fixed (e.g. always StoreA, StoreB, ...), we could write a UNION query for each store column.
  But here, the columns are dynamic: their names and counts change between testcases.
  We need to "unpivot" any number of columns, mapping each price into its own row, together with its column name.

- **Optimized idea:**  
  In SQL, this is usually done using the `UNPIVOT` operator, but often requires hardcoding the column list. Since columns are dynamic, in real SQL, we would have to dynamically generate the column list (using e.g. INFORMATION_SCHEMA or scripting).

  For Python:
  - For each row:  
    - Iterate over each column (except `product_id`).
    - For non-NULL value, emit a tuple of (product_id, column_name, value).
  - This is a classic "melt" or unpivot problem found in data cleaning.

- **Trade-offs:**  
  - If the table is huge or number of columns is large (up to 30), a per-row-and-col scan is reasonable.
  - Memory usage is proportional to the number of non-NULL entries.

### Corner cases to consider  
- All prices are NULL for a given product (that row produces no output).
- Only one store (minimal columns).
- Only one product.
- Some columns are always NULL for all rows (not emitted at all).
- Some columns have duplicate names (invalid input; column names should be unique).
- No products at all (empty table).
- All prices are non-NULL (fully dense).
- store column names with spaces, numbers, or weird characters.

### Solution

```python
# Function that mimics SQL unpivot: products is a list of dicts
# Each dict: keys - product_id and store columns; NULL as None

def unpivot_products(products):
    result = []
    for row in products:
        product_id = row['product_id']
        for col, val in row.items():
            if col == 'product_id':
                continue
            if val is not None:
                result.append({'product_id': product_id, 'store': col, 'price': val})
    return result

# Example usage:
# products = [
#   {'product_id': 100, 'StoreA': 5, 'StoreB': 6},
#   {'product_id': 200, 'StoreA': 7, 'StoreB': None},
# ]
# Output would be:
# [
#   {'product_id': 100, 'store': 'StoreA', 'price': 5},
#   {'product_id': 100, 'store': 'StoreB', 'price': 6},
#   {'product_id': 200, 'store': 'StoreA', 'price': 7}
# ]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m)  
  n = number of products (rows), m = number of store columns.  
  In worst case, each store for each product must be checked.
- **Space Complexity:** O(k)  
  k = number of non-NULL price entries (output size).  
  Additional usage is negligible compared to input/output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you efficiently handle very wide tables (e.g., thousands of store columns)?
  *Hint: Consider columnar storage or chunked processing.*

- How would you output the data in sorted order by product_id then store?
  *Hint: Sort the result by both keys after unpivoting.*

- If the schema could change at runtime (stores can be added/removed), can your approach adapt?
  *Hint: Your code should never rely on a fixed set of column names.*

### Summary

This problem demonstrates the **dynamic unpivot** (also known as “melt” or “stack”) data transformation—taking columnar data and converting columns into rows.  
It's a very common pattern in ETL, data warehousing, and analytic workflows, especially when schema changes frequently.  
The same approach can be used wherever table columns must be normalized into row records for downstream processing.  
Key themes: iteration over dynamic columns, runtime schema handling, and output tuple construction.

### Tags
Database(#database)

### Similar Problems
- Rearrange Products Table(rearrange-products-table) (Easy)