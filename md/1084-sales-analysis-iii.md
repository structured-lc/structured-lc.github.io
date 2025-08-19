### Leetcode 1084 (Easy): Sales Analysis III [Practice](https://leetcode.com/problems/sales-analysis-iii)

### Description  
Given two tables—**Product** (product details) and **Sales** (each sale event)—find all products that were **only sold in Q1 of 2019 (2019-01-01 to 2019-03-31 inclusive)**.  
A product should be returned **only if all its sales happened during this Q1 window**; if it has any sales outside that range, don't include it.

### Examples  

**Example 1:**  
Input:  
Product:  
| product_id | product_name | unit_price |
|------------|--------------|------------|
| 1          | S8           | 1000       |
| 2          | G4           | 800        |
| 3          | iPhone       | 1400       |

Sales:  
| seller_id | product_id | buyer_id | sale_date  | quantity | price |
|-----------|------------|----------|------------|----------|-------|
| 1         | 1          | 1        | 2019-01-21 | 2        | 2000  |
| 1         | 2          | 2        | 2019-02-17 | 1        | 800   |
| 2         | 2          | 3        | 2019-06-02 | 1        | 800   |
| 3         | 3          | 4        | 2019-05-13 | 2        | 2800  |

Output:  
| product_id | product_name |
|------------|--------------|
| 1          | S8           |

*Explanation:  
- Product 1 (S8) only sold on 2019-01-21 (in Q1 2019) ⇒ included.
- Product 2 (G4) sold on 2019-02-17 (Q1) **and** 2019-06-02 (Q2) ⇒ excluded.
- Product 3 (iPhone) sold only in 2019-05-13 (Q2) ⇒ excluded.*


**Example 2:**  
Input:  
Product:  
| product_id | product_name | unit_price |
|------------|--------------|------------|
| 4          | Pixel        | 900        |

Sales:  
| seller_id | product_id | buyer_id | sale_date  | quantity | price |
|-----------|------------|----------|------------|----------|-------|
| 4         | 4          | 5        | 2019-02-28 | 1        | 900   |

Output:  
| product_id | product_name |
|------------|--------------|
| 4          | Pixel        |

*Explanation:  
- Pixel sold only once on 2019-02-28 (Q1), so it is included.*


**Example 3:**  
Input:  
Product:  
| product_id | product_name | unit_price |
|------------|--------------|------------|
| 5          | OnePlus      | 700        |

Sales:  
| seller_id | product_id | buyer_id | sale_date  | quantity | price |
|-----------|------------|----------|------------|----------|-------|
| 1         | 5          | 6        | 2018-12-31 | 2        | 1400  |
| 2         | 5          | 8        | 2019-03-15 | 1        | 700   |

Output:  
_None_

*Explanation:  
- OnePlus was sold outside the Q1 2019 window (2018-12-31) as well as inside. Must be excluded.*


### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each product, check all its corresponding sales records.  
  Check if all sale dates for a product are between 2019-01-01 and 2019-03-31 (inclusive).  
  If **all** sales fit, include the product; else, exclude.

- **Optimized approach:**  
  - Use a filter: get all sale records for each product.
  - Find the *minimum* and *maximum* sale date for each product.
  - If both the min and max sale date are within Q1 2019, and there are no sales outside, include the product.
  - In SQL: group Sales by product_id, get MIN(sale_date) and MAX(sale_date), ensure both ≥ 2019-01-01 and ≤ 2019-03-31.

- **Why this works:**  
  - If there is a single sale outside Q1, the `MIN` or `MAX` will be outside Q1, excluding that product.

- **Trade-offs:**  
  - Efficient, as it scans each product’s sales only once.
  - No need for extra data structures or multiple passes.

### Corner cases to consider  
- Products *never* sold (i.e., missing in Sales table) — should be excluded.
- Products with sales only in Q1 2019 — included.
- Products with **any** sale outside Q1 — excluded.
- Multiple sales within Q1 — included.
- Products with duplicate sales entries (same date).
- Empty tables (no products or no sales).

### Solution

```python
# Assume: You are given lists of products and sales as input
# We'll process sales to gather for each product:
# - the earliest and latest sale date.
# - check if both fall within Q1 2019.

from collections import defaultdict

def sales_analysis_iii(products, sales):
    # Map of product_id -> (min_date, max_date)
    date_ranges = defaultdict(lambda: [None, None])
    for sale in sales:
        prod_id = sale['product_id']
        date = sale['sale_date']
        if date_ranges[prod_id][0] is None or date < date_ranges[prod_id][0]:
            date_ranges[prod_id][0] = date
        if date_ranges[prod_id][1] is None or date > date_ranges[prod_id][1]:
            date_ranges[prod_id][1] = date

    # Q1 2019 date range
    start_q1 = "2019-01-01"
    end_q1 = "2019-03-31"
    
    result = []
    for prod in products:
        prod_id = prod['product_id']
        # Must have at least one sale
        if prod_id in date_ranges:
            min_date, max_date = date_ranges[prod_id]
            # Both min and max must be inside Q1
            if start_q1 <= min_date <= end_q1 and start_q1 <= max_date <= end_q1:
                result.append({
                    'product_id': prod_id,
                    'product_name': prod['product_name']
                })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N + M)  
  Where N = number of sales, M = number of products.  
  - O(N) for processing all sales, O(M) for checking eligible products.

- **Space Complexity:** O(P)  
  (P = number of distinct products in sales)  
  - Storing at most two dates per product in dictionary.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle if there are millions of sales per product?  
  *Hint: Can you process in a streaming manner? Do you need to store all sales dates?*

- How to generalize for an arbitrary date range or more complex quarter definitions?  
  *Hint: Make start/end date configurable; add support for fiscal quarters.*

- What if you also had to return the total sales count per eligible product?  
  *Hint: Add a counter during processing, return as extra field.*

### Summary
This solution uses the classic **group-by/product-aggregation** pattern—find properties (here, min/max dates) per group, then filter based on range.  
This pattern is often used for problems involving grouping transaction records to determine eligibility or thresholds (e.g., people with all transactions in a certain window, users only active in a given quarter).

### Tags
Database(#database)

### Similar Problems
- Sales Analysis II(sales-analysis-ii) (Easy)