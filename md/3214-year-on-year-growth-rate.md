### Leetcode 3214 (Hard): Year on Year Growth Rate [Practice](https://leetcode.com/problems/year-on-year-growth-rate)

### Description  
Given transaction records for multiple products (with columns for `product_id`, `transaction_date`, and `spend`), return, for each product and year, the total spend, the previous year's total spend (*if available*), and the **year-over-year (YoY) growth rate**. The YoY growth rate for year y is:  
  ((current_year_spend - previous_year_spend) / previous_year_spend) × 100  
Round to 2 decimal places.  
The result should be ordered by `product_id` and `year`. If there is no previous year, set the YoY rate to `NULL`.

### Examples  

**Example 1:**  
Input:  
```
user_transactions =
| product_id | transaction_date | spend   |
|------------|-----------------|---------|
| 123424     | 2019-12-31      | 1000.60 |
| 123424     | 2020-06-14      | 1000.20 |
| 123424     | 2019-05-13      | 500.00  |
| 123424     | 2021-09-23      | 1246.44 |
| 123424     | 2022-02-11      | 2145.32 |
```
Output:  
```
| year | product_id | curr_year_spend | prev_year_spend | yoy_rate |
|------|------------|-----------------|-----------------|----------|
| 2019 | 123424     | 1500.60         | NULL            | NULL     |
| 2020 | 123424     | 1000.20         | 1500.60         | -33.35   |
| 2021 | 123424     | 1246.44         | 1000.20         | 24.62    |
| 2022 | 123424     | 2145.32         | 1246.44         | 72.12    |
```
*Explanation: Each year's spend is summed, and the growth rate is calculated vs. previous year. 2020's rate: ((1000.20 - 1500.60)/1500.60)\*100 = -33.35%.*

**Example 2:**  
Input:  
```
user_transactions =
| product_id | transaction_date | spend |
|------------|-----------------|-------|
| 1          | 2019-01-01      | 10    |
| 1          | 2020-01-01      | 15    |
| 2          | 2018-01-01      | 50    |
```
Output:  
```
| year | product_id | curr_year_spend | prev_year_spend | yoy_rate |
|------|------------|-----------------|-----------------|----------|
| 2018 | 2          | 50.00           | NULL            | NULL     |
| 2019 | 1          | 10.00           | NULL            | NULL     |
| 2020 | 1          | 15.00           | 10.00           | 50.00    |
```
*Explanation: Product 2 has only 2018 data, so no rate. Product 1 grows from 10 → 15, so rate = 50%.*

**Example 3:**  
Input:  
```
user_transactions =
| product_id | transaction_date | spend |
|------------|-----------------|-------|
| 3          | 2023-01-01      | 300   |
| 3          | 2023-02-01      | 200   |
| 3          | 2024-01-01      | 700   |
```
Output:  
```
| year | product_id | curr_year_spend | prev_year_spend | yoy_rate |
|------|------------|-----------------|-----------------|----------|
| 2023 | 3          | 500.00          | NULL            | NULL     |
| 2024 | 3          | 700.00          | 500.00          | 40.00    |
```
*Explanation: Stats grouped yearly; 2023's spend is 300 + 200 = 500. 2024's rate: ((700-500)/500)\*100 = 40%.*

### Thought Process (as if you’re the interviewee)  

- First, group all transactions by both `product_id` and year, aggregating the `spend` values.
- For each product-year, fetch both the current and previous year's total spend.
- Calculate the YoY growth rate using the two years (if previous year's data is available).
- Repeat for all product-year pairs, returning the proper NULL where data is missing.
- Order the results by `product_id`, then year.
- The brute-force way: aggregate, then for every product-year, scan for “previous year” data. This is O(n²).
- To optimize: pre-compute spend by product/year; use a map to lookup previous year in O(1).
- If this were SQL, use window LAG and grouping. In Python, use a nested dictionary keyed by product and year.

### Corner cases to consider  
- No transactions for a product in previous year (yoY_rate NULL).
- Multiple transactions in a single year for a product (must sum).
- More than one product.
- Non-sequential years.
- Only one transaction in total (must not error).
- Negative spends (if allowed).
- Missing or malformed dates (should not occur per constraints).
- Products with gapped/irregular year sequences.

### Solution

```python
from collections import defaultdict

def year_on_year_growth_rate(user_transactions):
    # user_transactions: List[dict] with keys 'product_id', 'transaction_date', 'spend'
    # Step 1: Aggregate spend by product and year
    spend_by_product_year = defaultdict(lambda: defaultdict(float))
    for rec in user_transactions:
        product = rec['product_id']
        # Extract year from 'YYYY-MM-DD'
        year = int(rec['transaction_date'][:4])
        spend_by_product_year[product][year] += float(rec['spend'])
    
    result = []
    for product in sorted(spend_by_product_year):
        years = sorted(spend_by_product_year[product])
        for idx, year in enumerate(years):
            curr_spend = round(spend_by_product_year[product][year], 2)
            prev_spend = None
            yoy_rate = None
            if idx > 0:
                prev_year = years[idx - 1]
                prev_spend = round(spend_by_product_year[product][prev_year], 2)
                # Only compute if prev_spend is not zero (avoid division by zero)
                if prev_spend != 0:
                    yoy_rate = round(100 * (curr_spend - prev_spend) / prev_spend, 2)
            result.append({
                "year": year,
                "product_id": product,
                "curr_year_spend": curr_spend,
                "prev_year_spend": prev_spend,
                "yoy_rate": yoy_rate
            })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m log m), where n = number of transactions, m = number of (product, year) groups. Initial aggregation is O(n), then for each product, sorting years is O(k log k) (across all products, O(m log m)).
- **Space Complexity:** O(m), where m = number of unique product-year combinations, for storing the spend aggregation and output.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle millions of transactions efficiently in a distributed system?
  *Hint: Consider map-reduce ideas or database grouping operations*

- How would you handle missing/corrupt data or negative values?
  *Hint: Validate inputs before aggregation; define behavior for bad spends*

- What if you want to compute growth quarter-over-quarter or month-over-month instead of yearly?
  *Hint: Adjust grouping to extract quarter/month; code is similar*

### Summary
This solution demonstrates the **grouping and self-join pattern for sequential stats**, often used for time-based analytics (YoY/quarter/period-over-period). The approach is foundational for BI dashboards and can be adapted for SQL (with window functions) or Python (using dicts). This pattern appears frequently in business data processing, revenue analyses, and in LeetCode SQL/analytics problems.