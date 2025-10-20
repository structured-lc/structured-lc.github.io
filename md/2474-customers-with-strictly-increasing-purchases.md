### Leetcode 2474 (Hard): Customers With Strictly Increasing Purchases [Practice](https://leetcode.com/problems/customers-with-strictly-increasing-purchases)

### Description  
You are given a table of orders with columns: order_id, customer_id, order_date, and price. Each order has a unique order_id, is placed by a customer on a certain date, and has a price.  
**Your task:** Report the IDs of customers whose total purchases (sum of price) are **strictly increasing** every year (ignoring years with zero purchases as zero-total). If a customer does not purchase in a year, their total for that year is zero, and this should be considered for the strictly increasing check.  
Return the list of such customer_ids.

### Examples  

**Example 1:**  
Input:  
Orders =
| order_id | customer_id | order_date  | price |
|----------|-------------|-------------|-------|
| 1        | 1           | 2020-10-15  | 100   |
| 2        | 1           | 2021-05-21  | 120   |
| 3        | 1           | 2022-11-01  | 200   |
| 4        | 2           | 2020-01-01  | 90    |
| 5        | 2           | 2022-01-01  | 90    |

Output:  
`[1]`  
*Explanation:*
- For customer 1:  
  2020: 100  
  2021: 120  
  2022: 200  
  (100 < 120 < 200, so strictly increasing)

- For customer 2:  
  2020: 90  
  2021: 0  
  2022: 90  
  (90 < 0 is false, only strictly increasing if ALL previous years’ sums < subsequent ones and every year in range is considered including zeros)

**Example 2:**  
Input:  
Orders =
| order_id | customer_id | order_date  | price |
|----------|-------------|-------------|-------|
| 1        | 3           | 2021-07-15  | 150   |
| 2        | 3           | 2022-09-21  | 160   |
| 3        | 3           | 2023-11-01  | 160   |

Output:  
`[]`  
*Explanation:* For customer 3, years:  
2021: 150  
2022: 160  
2023: 160  
(160 is not strictly greater than 160, so NOT strictly increasing)

**Example 3:**  
Input:  
Orders =
| order_id | customer_id | order_date  | price |
|----------|-------------|-------------|-------|
| 1        | 4           | 2018-05-20  | 50    |
| 2        | 4           | 2020-06-10  | 100   |
| 3        | 4           | 2021-07-25  | 150   |

Output:  
`[]`  
*Explanation:*  
Customer 4:  
2018: 50  
2019: 0  
2020: 100  
2021: 150  
(50 < 0 is false -- strictly increasing requires 2018 < 2019 < 2020 < 2021)

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each customer, compute the total purchases per year for every year between their earliest and latest purchase (fill in zeros for missing years). Loop through these yearly totals for each customer, and check if the sequence is strictly increasing.

- **Optimized approach:**  
  1. For each customer, find the range of years they possibly have purchases.
  2. For each year in that range, calculate total purchases (fill in with zero for years with no purchases).
  3. Check for each customer if their yearly totals form a strictly increasing sequence.
  4. Return the IDs of those customers.

  The main trade-off is between code readability and efficiency. We could use a hashmap (dictionary) to store sums by (customer_id, year), then process each customer in turn.

### Corner cases to consider  
- Customers with purchases in only one year: can't be considered strictly increasing (no sequence to check).
- Years "skipped": fill with zero, check strictly increasing including zeros.
- Customer makes purchases equal in two subsequent years: not strictly increasing.
- Large date range but many sparse years: ensure to process all years in range.
- No customers with increasing sequences: should return empty list.

### Solution

```python
from collections import defaultdict

def customers_with_strictly_increasing_purchases(orders):
    # Map: customer_id → {year: total_purchase}
    customer_year_sum = defaultdict(lambda: defaultdict(int))
    min_year = {}
    max_year = {}
    
    # Step 1: Fill mapping for each customer per year, and track year range for each customer
    for order in orders:
        customer_id = order['customer_id']
        year = int(order['order_date'][:4])
        price = order['price']
        
        customer_year_sum[customer_id][year] += price
        
        if customer_id not in min_year or year < min_year[customer_id]:
            min_year[customer_id] = year
        if customer_id not in max_year or year > max_year[customer_id]:
            max_year[customer_id] = year

    res = []
    # Step 2: For each customer, check if totals per year are strictly increasing
    for cid in customer_year_sum:
        earliest = min_year[cid]
        latest = max_year[cid]
        prev = None
        strictly_increasing = True
        # For each year in full range, fill in zero if no purchases
        for year in range(earliest, latest + 1):
            total = customer_year_sum[cid].get(year, 0)
            if prev is not None:
                if total <= prev:
                    strictly_increasing = False
                    break
            prev = total
        # Need at least 2 years to be strictly increasing
        if strictly_increasing and latest > earliest:
            res.append(cid)
    return res

# Example usage:
# orders = [
#     {"order_id":1,"customer_id":1,"order_date":"2020-10-15","price":100},
#     {"order_id":2,"customer_id":1,"order_date":"2021-05-21","price":120},
#     ...
# ]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N = number of orders. Building the sum table is O(N), scanning yearly totals per customer is O(CK) where C = customers and K = avg years per customer, at most O(N) overall.
- **Space Complexity:** O(CK), needing a dict for every customer's year totals (at most O(N)), and a few variables per customer.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the order table contains many years and most customers have sparse data?
  *Hint: Efficiently fill the missing years with zeros, perhaps lazily or using default dicts.*

- Can you do this in SQL with window functions or only in application code?
  *Hint: Yes, use LAG/LEAD to compare yearly totals for each customer, or group by customer-year.*

- What about if each customer can have multiple orders per year, or what if years are non-consecutive?
  *Hint: The approach should still work; just be careful to cover the full year range per customer, filling zeros between.*

### Summary
This problem uses the **group-by aggregation** pattern, combined with filling missing data for a full range (data imputation for absent years). The scan for strictly increasing values is a standard sequence check. This is broadly useful in time-series validation (e.g., monotonic trend enforcement), reporting, or preprocessing for ML models. The combination of dictionary aggregations and sequence validation is a common interview pattern for analytics or data engineering problems.


### Flashcard
For each customer, fill in yearly purchase totals (including zeros), then check if the sequence is strictly increasing.

### Tags
Database(#database)

### Similar Problems
- Report Contiguous Dates(report-contiguous-dates) (Hard)
- Find the Start and End Number of Continuous Ranges(find-the-start-and-end-number-of-continuous-ranges) (Medium)