### Leetcode 1070 (Medium): Product Sales Analysis III [Practice](https://leetcode.com/problems/product-sales-analysis-iii)

### Description  
Given two tables, `Sales` and `Product`:
- The `Sales` table records sales with columns: sale\_id, product\_id, year, quantity, price.
- The `Product` table maps product\_id to product\_name.

Your task: **For every product, return the sales (product\_id, year, quantity, price) for the first year that product was ever sold.**  
If a product appears in multiple years, only return the sale(s) for the minimum year.

### Examples  

**Example 1:**  
Input:  
Sales table:  
| sale_id | product_id | year | quantity | price |
|---------|------------|------|----------|-------|
| 1       | 100        | 2008 | 10       | 5000  |
| 2       | 100        | 2009 | 12       | 5000  |
| 7       | 200        | 2011 | 15       | 9000  |

Product table:  
| product_id | product_name |
|------------|--------------|
| 100        | Nokia        |
| 200        | Apple        |
| 300        | Samsung      |

Output:  
| product_id | first_year | quantity | price |
|------------|------------|----------|-------|
| 100        | 2008       | 10       | 5000  |
| 200        | 2011       | 15       | 9000  |

*Explanation:*
- For product 100, its first sale is in 2008, so output 2008 record.
- For product 200, first sale is in 2011, so output 2011 record.
- Product 300 has not been sold, so is omitted.

**Example 2:**  
Input:  
Sales:  
| sale_id | product_id | year | quantity | price |
|---------|------------|------|----------|-------|
| 1       | 101        | 2015 | 5        | 100   |
| 2       | 101        | 2017 | 3        | 120   |
| 3       | 102        | 2016 | 8        | 115   |

Output:  
| product_id | first_year | quantity | price |
|------------|------------|----------|-------|
| 101        | 2015       | 5        | 100   |
| 102        | 2016       | 8        | 115   |

*Explanation:*
- Product 101: Minimum year is 2015, so pick the 2015 row.
- Product 102: Only one record, so pick it.

**Example 3:**  
Input:  
Sales:  
| sale_id | product_id | year | quantity | price |
|---------|------------|------|----------|-------|
| 1       | 501        | 2020 | 2        | 800   |

Output:  
| product_id | first_year | quantity | price |
|------------|------------|----------|-------|
| 501        | 2020       | 2        | 800   |

*Explanation:*  
Only one product and one sale, so output as is.

### Thought Process (as if you’re the interviewee)  

- **Brute force idea:**  
  For every product, find all their sales, determine the minimum year, then filter sales to only those with that product and that minimum year. Naive approach: for each product, scan all sales.

- **Optimized approach:**  
  Since we're always looking for the minimum year, group by `product_id` to find the minimum (first) year sold.  
  - In SQL, this is a simple subquery or CTE: find the min(year) for each product.
  - In pandas, groupby product\_id, calculate min(year), then filter matching records.

- **Trade-offs:**  
  - Using GROUP BY or groupby provides efficient row reduction before filtering the full dataset.
  - Relational DBs and pandas both do this efficiently because of optimized grouping/indexing.

### Corner cases to consider  
- Sales table is empty ⇒ Output is empty.
- Products that were never sold ⇒ Omit from output.
- Multiple sales for the same product in its first year (e.g., multiple sale\_ids for same product, same year).
- Prices or quantities duplicated or different for multiple sales in the same first year.
- Data types: make sure year, product\_id, quantity, price are not null.

### Solution

```python
import pandas as pd

def product_sales_analysis_iii(sales: pd.DataFrame, product: pd.DataFrame) -> pd.DataFrame:
    # Compute the first (minimum) year for each product
    first_year_df = sales.groupby('product_id')['year'].min().reset_index()
    first_year_df = first_year_df.rename(columns={'year': 'first_year'})

    # Merge back to sales to get all sales in that first year for each product
    merged = pd.merge(sales, first_year_df, on=['product_id'])

    # Filter for sales only in the first year for each product
    result = merged[merged['year'] == merged['first_year']][['product_id', 'first_year', 'quantity', 'price']]

    # Return result (can be in any order)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Groupby: O(n), where n = number of sales.
  - Merge: O(n).
  - Filter: O(n).
  Overall: O(n), since each step processes each sale row once.

- **Space Complexity:**  
  - O(n) for the dataframe copies, merges, and result.

### Potential follow-up questions (as if you’re the interviewer)  

- What if there are multiple sales in the first year for one product?
  *Hint: Should the output include all? (Yes, all first-year sales per product.)*

- What if the sales table is huge and doesn't fit in memory?
  *Hint: Could use SQL, streaming aggregation, or process in chunks.*

- What if you want the product_name along with product_id in output?
  *Hint: Join with the product table similarly at the end.*

### Summary
This is a classic **group by minimum value for each group** problem (group by product\_id, take min year, then filter/merge).  
It's a very common pattern for "first/last event per group" in data analysis, and translates directly between SQL and pandas.  
The approach is efficient and scales well, and appears in many sales analysis, churn, and time-series questions.

### Tags
Database(#database)

### Similar Problems
- Product Sales Analysis II(product-sales-analysis-ii) (Easy)
- Product Sales Analysis IV(product-sales-analysis-iv) (Medium)
- Product Sales Analysis V(product-sales-analysis-v) (Easy)