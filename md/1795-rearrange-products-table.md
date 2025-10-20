### Leetcode 1795 (Easy): Rearrange Products Table [Practice](https://leetcode.com/problems/rearrange-products-table)

### Description  
Given a table Products with columns: product_id, store1, store2, and store3, each indicating the price of a product in a specific store (or NULL if not sold).  
You need to transform this table so that each row represents (product_id, store, price), but only for stores where a price exists (i.e., not NULL).  
The output should only contain rows for products and stores where the product was actually sold.

### Examples  

**Example 1:**  
Input:  
```
Products
+------------+--------+--------+--------+
| product_id | store1 | store2 | store3 |
+------------+--------+--------+--------+
| 0          | 95     | 100    | 105    |
| 1          | 70     | null   | 80     |
+------------+--------+--------+--------+
```
Output:  
```
+------------+--------+-------+
| product_id | store  | price |
+------------+--------+-------+
| 0          | store1 | 95    |
| 0          | store2 | 100   |
| 0          | store3 | 105   |
| 1          | store1 | 70    |
| 1          | store3 | 80    |
+------------+--------+-------+
```
*Explanation: For product_id=0, all store prices are present. For product_id=1, only store1 and store3 have prices. Each row now represents (product_id, store, price), omitting nulls.*

**Example 2:**  
Input:  
```
Products
+------------+--------+--------+--------+
| product_id | store1 | store2 | store3 |
+------------+--------+--------+--------+
| 5          | null   | 60     | 70     |
+------------+--------+--------+--------+
```
Output:  
```
+------------+--------+-------+
| product_id | store  | price |
+------------+--------+-------+
| 5          | store2 | 60    |
| 5          | store3 | 70    |
+------------+--------+-------+
```
*Explanation: For product_id=5, store1 is missing. Only store2 and store3 available. Each non-null price is a new row.*

**Example 3:**  
Input:  
```
Products
+------------+--------+--------+--------+
| product_id | store1 | store2 | store3 |
+------------+--------+--------+--------+
| 2          | null   | null   | null   |
+------------+--------+--------+--------+
```
Output:  
```
(empty result)
```
*Explanation: All prices are null; so no rows needed in the output.*

### Thought Process (as if you’re the interviewee)  
The problem asks us to *pivot* the data from columns into rows—also known as "unpivot" in SQL terms.  
Initial naive solution: Loop through each cell for each product and insert a new row for each store with a non-NULL value. In SQL, we mimic this by running SELECT statements for each store column, filtering out NULL prices, and UNION-ing them together.  
- For store1: SELECT product_id, 'store1', store1 AS price FROM Products WHERE store1 IS NOT NULL  
- Repeat for store2 and store3.  
- Combine them with UNION ALL to stack the rows.  
This is optimal for a small, fixed set of store columns, and eliminates the need for complicated joins or loops. It is not scalable if the number of store columns changes dynamically, but in this static schema, it is simple and efficient.

### Corner cases to consider  
- All store columns are NULL for a product → No output row generated.
- Only one store has a price for a product → Only that (product_id, store, price) appears.
- Duplicate prices (same price in multiple stores) → Each treated as a separate row.
- Very large Products table → Query time increases linearly.
- Schema changes (more/fewer store columns) → SQL must be updated to reflect those changes.

### Solution

```python
# As the problem is SQL only, we can show a logical "python-like pseudocode" as well
# for illustration; in a real interview, we'd give SQL, but let's follow the request.

def rearrange_products_table(products):
    result = []
    # for each product in the products input (list of dicts)
    for product in products:
        product_id = product["product_id"]

        # check each store column explicitly
        if product["store1"] is not None:
            result.append({
                "product_id": product_id,
                "store": "store1",
                "price": product["store1"]
            })

        if product["store2"] is not None:
            result.append({
                "product_id": product_id,
                "store": "store2",
                "price": product["store2"]
            })

        if product["store3"] is not None:
            result.append({
                "product_id": product_id,
                "store": "store3",
                "price": product["store3"]
            })
    return result

# Example usage:
products_input = [
    {"product_id": 0, "store1": 95, "store2": 100, "store3": 105},
    {"product_id": 1, "store1": 70, "store2": None, "store3": 80},
]
print(rearrange_products_table(products_input))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of (product rows) × 3 store columns. We check each store column for each product—so 3 × number of products.
- **Space Complexity:** O(m), where m is the number of (product, store) pairs with a non-NULL price. Output list grows linearly with non-null entries.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are 100 store columns?  
  *Hint: The solution logic works, but handwritten SQL or hard-coded loops would be tedious. Consider dynamic SQL or EAV (Entity-Attribute-Value) schema.*

- Can you do this with variable number of stores, not fixed to store1-store3?  
  *Hint: Not easily with standard SQL; might require UNPIVOT/UNION generation via metadata queries or scripts.*

- How would you handle if the schema changes to use a separate table for stores?  
  *Hint: Now you simply join on product_id between Products and Prices-in-Stores table; don’t need unpivoting.*

### Summary
This problem is a classic example of the **UNPIVOT** or "melt"-style transformation—turning fixed columns into variable rows, maintaining only meaningful data.  
It’s a pattern common in data warehousing/reporting tasks.  
The coding pattern is simple value checking and transformation per row.  
The same pattern can be seen in CSV reshaping, data frame manipulations (e.g., Pandas melt), reporting pipelines, and wherever denormalization or flattening of database tables is needed.


### Flashcard
Unpivot the Products table to rearrange data into rows for each store.

### Tags
Database(#database)

### Similar Problems
- Product's Price for Each Store(products-price-for-each-store) (Easy)
- Dynamic Unpivoting of a Table(dynamic-unpivoting-of-a-table) (Hard)