### Leetcode 1174 (Medium): Immediate Food Delivery II [Practice](https://leetcode.com/problems/immediate-food-delivery-ii)

### Description  
You are given a `delivery` table with information about customer food deliveries including `customer_id`, `order_date`, and `customer_pref_delivery_date`. For each customer, **only their first order** (the earliest order_date) matters in this problem. You need to determine the **percentage of first orders that were immediate**, meaning the `order_date` is exactly the same as the `customer_pref_delivery_date`.

The result should be rounded to **2 decimal places** and given as a percentage.

### Examples  

**Example 1:**  
Input:  
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
|-------------|-------------|------------|-----------------------------|
| 1           | 101         | 2020-01-15 | 2020-01-15                  |
| 2           | 101         | 2020-02-01 | 2020-02-01                  |
| 3           | 102         | 2020-01-15 | 2020-01-16                  |  
Output: `50.00`  
*Explanation: For customer 101, first order is on 2020-01-15 and immediate. For customer 102, first order is on 2020-01-15 but scheduled. So 1 immediate / 2 customers = 50.00%.*  

**Example 2:**  
Input:  
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
|-------------|-------------|------------|-----------------------------|
| 1           | 201         | 2021-03-10 | 2021-03-10                  |  
Output: `100.00`  
*Explanation: Only one customer with an immediate first order, so percentage is 100%.*  

**Example 3:**  
Input:  
| delivery_id | customer_id | order_date | customer_pref_delivery_date |
|-------------|-------------|------------|-----------------------------|
| 1           | 301         | 2021-05-20 | 2021-05-21                  |
| 2           | 302         | 2021-05-22 | 2021-05-23                  |  
Output: `0.00`  
*Explanation: Both customers' first orders are scheduled, so 0% immediate.*


### Thought Process (as if you’re the interviewee)  
To solve this problem, I first need to identify each customer's **first order**. The earliest `order_date` per `customer_id` determines the first order. A straightforward method might be to group by `customer_id` and find their minimum `order_date`. However, since SQL window functions like `RANK()` or `ROW_NUMBER()` over `customer_id` partition ordered by `order_date` exist, I prefer using `RANK()` or `ROW_NUMBER()` to assign rank 1 for the first order.

Next, I want to know if the first order is immediate; that is, `order_date = customer_pref_delivery_date`.

Finally, I calculate the percentage of these immediate first orders among all customers, then round to two decimals.

This approach is efficient:  
- Ranking orders by customer is O(n) in scanning.  
- Filtering for rank = 1 keeps one row per customer.  
- Aggregation to compute average immediate ratio is straightforward.

### Corner cases to consider  
- Customers with only one order (trivial first order).  
- Multiple orders on the same earliest date for one customer (rank or row_number handles ties or picks one).  
- No deliveries (empty table).  
- All first orders immediate or none immediate.  
- Dates could be equal or different, ensure string/date comparison works reliably.

### Solution

```python
# This is a SQL logic problem, but if converted to Python-like pseudocode:

def immediate_food_delivery_percentage(delivery_records):
    # delivery_records: list of dicts with keys customer_id, order_date, customer_pref_delivery_date
    
    # Step 1: Find first order per customer by order_date
    first_orders = {}
    for record in delivery_records:
        cust = record['customer_id']
        order_date = record['order_date']
        if cust not in first_orders or order_date < first_orders[cust]['order_date']:
            first_orders[cust] = record
    
    # Step 2: Count how many first orders are immediate
    total_customers = len(first_orders)
    immediate_count = sum(1 for r in first_orders.values() if r['order_date'] == r['customer_pref_delivery_date'])
    
    # Step 3: Calculate percentage and round
    if total_customers == 0:
        return 0.00
    
    percentage = (immediate_count / total_customers) * 100
    return round(percentage, 2)
```

A canonical SQL solution is:

```sql
WITH RankedOrders AS (
    SELECT *,
           RANK() OVER (PARTITION BY customer_id ORDER BY order_date) AS rank
    FROM delivery
)
SELECT ROUND(
    AVG(CASE WHEN order_date = customer_pref_delivery_date THEN 1.0 ELSE 0 END) * 100,
    2
) AS immediate_percentage
FROM RankedOrders
WHERE rank = 1;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of delivery records. Ranking and aggregation take linear time in practice.
- **Space Complexity:** O(m), where m is the number of unique customers, since we store first order per customer or do partitioning in SQL.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties in order_date if multiple orders have the same earliest date for a customer?  
  *Hint: Use ROW_NUMBER() to pick exactly one or consider all tied as first orders.*  

- What if you want immediate order percentage for all orders, not just first orders?  
  *Hint: Modify filtering and aggregation accordingly, no ranking needed.*  

- How would you extend this problem to measure immediate order percentages over time windows (e.g., monthly)?  
  *Hint: Use additional window functions and grouping by date intervals.*

### Summary  
This problem uses the **window function pattern** (RANK/ROW_NUMBER partitioned by customer) combined with conditional aggregation to calculate a percentage metric. It is a classic example of using SQL window functions to find first or earliest records per group and then performing calculations on that subset—common in reporting, analytics, and data validation contexts.

### Tags
Database(#database)

### Similar Problems
