### Leetcode 2252 (Hard): Dynamic Pivoting of a Table [Practice](https://leetcode.com/problems/dynamic-pivoting-of-a-table)

### Description  
Given a SQL table `Products` with columns `product_id` (int), `store` (varchar), and `price` (int), where the combination (product_id, store) is the primary key, write a procedure `PivotProducts` that reorganizes the table such that:
- Each **row** represents a unique `product_id`
- Each **column** (besides product_id) represents a different store (name sorted lexicographically)
- The value at each cell is the corresponding product price in that store (or null if not sold there)
- Return the pivoted table in any row order

This is a dynamic pivot: the store names (and thus columns) are not known ahead of time.

### Examples  

**Example 1:**  
Input:  
```
Products table:
| product_id | store  | price |
|------------|--------|-------|
| 1          | 'ap'   | 10    |
| 1          | 'ba'   | 15    |
| 2          | 'ap'   | 5     |
```
Output:  
```
| product_id | ap | ba |
|------------|----|----|
| 1          | 10 | 15 |
| 2          | 5  |null|
```
Explanation:  
Two stores 'ap' and 'ba' (lex order: 'ap', 'ba').  
Product 1 appears in both, product 2 only in 'ap', so ba column is null for product 2.

**Example 2:**  
Input:  
```
Products table:
| product_id | store  | price |
|------------|--------|-------|
| 1          | 'ap'   | 20    |
| 2          | 'ba'   | 30    |
| 3          | 'ba'   | 5     |
| 2          | 'ap'   | 25    |
```
Output:  
```
| product_id | ap | ba |
|------------|----|----|
| 1          | 20 |null|
| 2          | 25 | 30 |
| 3          |null| 5  |
```
Explanation:  
All store columns appear for each product. Missing values become null.

**Example 3:**  
Input:  
```
Products table:
| product_id | store  | price |
|------------|--------|-------|
| 1          | 'storeA' | 10    |
| 1          | 'storeB' | 25    |
| 2          | 'storeA' | 50    |
```
Output:  
```
| product_id | storeA | storeB |
|------------|--------|--------|
| 1          | 10     | 25     |
| 2          | 50     | null   |
```
Explanation:  
Columns are store names sorted lexicographically; fill null if price is missing for a product.

### Thought Process (as if you’re the interviewee)  
- The brute-force approach would be to write a pivot for each known store.  
  But we can't do this because store columns are not fixed—they are dynamic.

- This requires a **dynamic pivot** (not supported in standard SQL).  
  Typically, this is solved by:
  - Listing all unique stores in lex order
  - Generating dynamic SQL using `GROUP_CONCAT` to produce a SELECT with a column for each store, e.g. `MAX(CASE WHEN store='s1' THEN price END) AS s1, ...`
  - Preparing, executing, and returning the result

- We need to build the SELECT clause dynamically and execute.

- Tradeoffs:  
  - Pure SQL can’t do this statically; needs scripting or stored procedure.  
  - Solution is clean but non-portable (relies on vendor's dynamic SQL features)

### Corner cases to consider  
- No products or stores (empty table)
- A product missing in all but one store
- Names of stores require ordering (e.g. 'a', 'aa', 'b')
- Products with price null or zero
- Large number of stores (test scalability—limited to ≤30 as per problem)
- Duplicate (product_id, store) -- but guaranteed unique per constraint.

### Solution

```sql
-- SQL, as this is a DB pivot problem

CREATE PROCEDURE PivotProducts()
BEGIN
    -- 1. Get list of all stores in lexicographic order
    SET SESSION group_concat_max_len = 10000; -- ensure enough length

    -- stores: ap, ba, ca => columns: 
    -- MAX(CASE WHEN store='ap' THEN price END) AS ap, ...
    SELECT
        GROUP_CONCAT(
            DISTINCT
            CONCAT(
                'MAX(CASE WHEN store=\'',
                store,
                '\' THEN price END) AS `',
                store,
                '`'
            )
            ORDER BY store ASC
            SEPARATOR ', '
        )
    INTO @columns
    FROM Products;

    -- 2. Build final dynamic SQL
    SET @sql = CONCAT(
        'SELECT product_id, ',
        @columns,
        ' FROM Products GROUP BY product_id'
    );

    -- 3. Prepare and execute
    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n \* m), where n = number of products, m = number of stores. We scan the Products table once per unique store for the pivot; grouping and aggregation is O(n \* m).
- **Space Complexity:** O(n \* m), as the result table holds up to n \* m cells (one per product-store combination), and dynamic SQL holds the constructed query.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you solve this if store names can contain special characters (quotes, spaces)?
  *Hint: Proper escaping and delimiting of SQL identifiers.*

- What if the price column can be duplicated for (product_id, store) (i.e., not unique)?
  *Hint: You’d need to aggregate (MIN/MAX/AVG) or clarify the requirement.*

- How would you do this in a standard programming language (e.g., Python) if RDBMS does not support dynamic SQL?
  *Hint: Read all records, build nested dict, output CSV; use Pandas pivot.*

### Summary
This problem uses the **dynamic SQL construction** pattern to perform a pivot operation whose output columns aren’t known ahead of time. This is a classic **dynamic pivot** scenario, common in data warehousing and reporting. Similar approaches are widely used in SQL/BI reporting for cross-tab, and can also map to "pivot table" operations in Python pandas (`df.pivot(index, columns, values)`).


### Flashcard
Dynamically generate SQL with CASE statements for each unique store, using GROUP_CONCAT to build the pivot query at runtime.

### Tags
Database(#database)

### Similar Problems
- Product's Price for Each Store(products-price-for-each-store) (Easy)