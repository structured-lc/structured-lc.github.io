### Leetcode 2292 (Medium): Products With Three or More Orders in Two Consecutive Years [Practice](https://leetcode.com/problems/products-with-three-or-more-orders-in-two-consecutive-years)

### Description  
Given a table with product orders, where each order contains a product ID, a purchase date, and other irrelevant data, find all products which had at least 3 orders in two consecutive years (e.g., 2020 and 2021, or 2021 and 2022).  
Think of this as: for each product, list the years with 3 or more orders, then check if there exists any pair of years for that product which are consecutive.

### Examples  

**Example 1:**  
Input:  
```
Orders table:
+------------+------------+--------------+
| order_id   | product_id | purchase_date|
+------------+------------+--------------+
| 1          | 1          | 2020-02-15   |
| 2          | 1          | 2020-05-02   |
| 3          | 1          | 2020-06-20   |
| 4          | 1          | 2021-01-25   |
| 5          | 1          | 2021-04-08   |
| 6          | 1          | 2021-12-30   |
| 7          | 2          | 2022-07-05   |
+------------+------------+--------------+
```
Output:  
```
+------------+
| product_id |
+------------+
| 1          |
+------------+
```
*Explanation: Product 1 has at least 3 orders both in 2020 and 2021 (consecutive years). Product 2 never qualifies, as it has only one order in 2022.*

**Example 2:**  
Input:  
```
Orders table:
+------------+------------+--------------+
| order_id   | product_id | purchase_date|
+------------+------------+--------------+
| 10         | 5          | 2021-12-10   |
| 11         | 5          | 2021-12-11   |
| 12         | 5          | 2021-12-12   |
| 13         | 5          | 2023-07-01   |
| 14         | 5          | 2023-08-01   |
| 15         | 5          | 2023-08-15   |
+------------+------------+--------------+
```
Output:  
```
+------------+
| product_id |
+------------+
|            |
+------------+
```
*Explanation: Product 5 has 3+ orders in both 2021 and 2023, but those are not consecutive years.*

**Example 3:**  
Input:  
```
Orders table:
+------------+------------+--------------+
| order_id   | product_id | purchase_date|
+------------+------------+--------------+
| 21         | 9          | 2018-11-20   |
| 22         | 9          | 2019-11-12   |
| 23         | 9          | 2019-12-22   |
| 24         | 9          | 2019-12-23   |
| 25         | 9          | 2019-12-25   |
| 26         | 9          | 2020-01-09   |
| 27         | 9          | 2020-02-10   |
| 28         | 9          | 2020-02-15   |
+------------+------------+--------------+
```
Output:  
```
+------------+
| product_id |
+------------+
| 9          |
+------------+
```
*Explanation: Product 9 has 4 orders in 2019 and 3 orders in 2020, so consecutive years are qualified.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force approach:**  
  - For each product and each year, count total orders.  
  - For each product, check pairs of years to see if both have at least 3 orders and are consecutive.  
  - In practice: Build a “product → years with 3+ orders” mapping, then check if any two of these years are consecutive.

- **Optimized approach:**  
  - Group data by product and year, count orders for each group.  
  - Filter to only product-years with at least 3 orders.
  - For each product, sort the filtered years.  
  - Scan the list of years; if any consecutive pair in this list has difference 1, add the product.

- **Why this is good:**  
  - No need to look at all years for every product, just those that pass the 3-or-more filter.
  - Main complexity comes only from grouping and a single scan of years per product.

### Corner cases to consider  
- No products have 3+ orders in any year → Output is empty.
- A product has 3+ orders in several years, but none consecutive.
- Years for a product are not sorted chronologically; need to sort before checking.
- Multiple products qualify; all must be returned.
- Purchase dates are out of order.
- Only one year of data for a product.
- Orders exactly at year boundaries (e.g., Dec 31 & Jan 1).
- Some products with orders more than 3 in non-consecutive years.

### Solution

```python
def productsWithThreeOrMoreOrdersInTwoConsecutiveYears(orders):
    # orders: List of [order_id, product_id, purchase_date]
    from collections import defaultdict

    # Step 1: Count orders per product per year
    product_year_count = defaultdict(lambda: defaultdict(int))
    for order_id, product_id, purchase_date in orders:
        year = int(purchase_date[:4])
        product_year_count[product_id][year] += 1

    result = set()

    # Step 2: For each product, get a sorted list of years with ≥ 3 orders
    for product_id, year_counts in product_year_count.items():
        years_with_3plus = [year for year, cnt in year_counts.items() if cnt >= 3]
        years_with_3plus.sort()
        # Step 3: Check for any consecutive years in this list
        for i in range(1, len(years_with_3plus)):
            if years_with_3plus[i] - years_with_3plus[i-1] == 1:
                result.add(product_id)
                break  # Only need to add once

    # Return as sorted list for deterministic output
    return sorted(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(n), where n is the total number of orders (for the grouping/counting pass)
  - For each distinct product, sorting its list of years (in practice, limited since years are ≤100).
  - If p is the number of distinct products, total work is O(n + p × y log y), with y being max years per product (often small).
- **Space Complexity:**  
  - O(p × y), for the per-product, per-year counts mapping.
  - O(p) for output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle millions of products and billions of orders?  
  *Hint: Think about batching, parallelization, or using databases for grouping.*

- What if you wanted to find products with at least 5 orders in any 2 consecutive years?  
  *Hint: Just change the ‘3’ threshold, parameterize!*

- Suppose you want to return the year pairs for which the product qualifies, not just product IDs?  
  *Hint: Store qualifying year-pairs when you find them and return as part of output.*

### Summary
This problem uses the very common “group by key, filter by count, and window over time” pattern. It relies on grouping and then sequential scan for adjacency (consecutive years). This coding approach is applicable anywhere you need to check for thresholds per group in time-series or sequence data, such as user activity, sensor logs, or sales periods. Pattern also generalizes to “find windows of length k” or “find repeated events over periods.”

### Tags
Database(#database)

### Similar Problems
