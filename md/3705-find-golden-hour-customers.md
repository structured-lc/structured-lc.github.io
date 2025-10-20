### Leetcode 3705 (Medium): Find Golden Hour Customers [Practice](https://leetcode.com/problems/find-golden-hour-customers)

### Description  
You are given a table `restaurant_orders` tracking food orders at a restaurant. Each row contains: order_id, customer_id, order_timestamp, order_amount, payment_method, and order_rating.  
A **golden hour customer** is someone who:
- Has made **at least 3 orders**.
- **At least 60%** of their orders are during **peak hours** (11:00–14:00 and 18:00–21:00).
- Their **average rating for rated orders** is **≥ 4.0** (rounded to two decimals).
- **At least 50%** of their orders have a rating (i.e., order_rating is not null).  
Return each golden hour customer's customer_id, their total order count, peak hour percentage (rounded to zero decimals), average rating (rounded to two decimals), and percentage of rated orders (rounded to zero decimals).  
Order by average rating descending, then customer_id descending.

### Examples  

**Example 1:**  
Input:  
```
restaurant_orders = [
  [101, '2023-06-21 11:15:00', 22.5, 'card', 5],
  [101, '2023-06-21 18:05:00', 18.0, 'cash', 4],
  [101, '2023-06-22 09:30:00', 13.8, 'app', 4],
  [101, '2023-06-22 13:00:00', 8.3, 'card', None]
]
```
Output:  
```
[
  [101, 4, 75, 4.33, 75]
]
```
*Explanation:  
Customer 101 made 4 orders, all with timestamps; 3 of those fall in peak hours (11–14 or 18–21 ⇒ 75%).  
Ratings: 4, 4, 5 ⇒ avg = (4+4+5)/3 = 4.33.  
3 out of 4 are rated ⇒ 75%.  
All criteria satisfied, so returned.*

**Example 2:**  
Input:  
```
restaurant_orders = [
  [202, '2023-06-21 06:15:00', 9.0, 'card', None],
  [202, '2023-06-21 15:45:00', 11.0, 'card', 5],
  [202, '2023-06-21 18:30:00', 20.0, 'app', 3]
]
```
Output:  
```
[]
```
*Explanation:  
Customer 202 made 3 orders.  
Peak hour orders: 1 (18:30), so 1/3 = 33% < 60%.  
½ rated (15:45 and 18:30), so 2/3 = 66%.  
Avg rating = (5+3)/2 = 4.00. But peak hour percent fails, so not included.*

**Example 3:**  
Input:  
```
restaurant_orders = [
  [303, '2023-06-21 11:30:00', 14.5, 'cash', 4],
  [303, '2023-06-22 12:45:00', 15.0, 'card', 5],
  [303, '2023-06-23 18:20:00', 18.0, 'app', None]
]
```
Output:  
```
[]
```
*Explanation:  
Customer 303 made 3 orders.  
Peak hour orders: 3/3 = 100%.  
Ratings: 4 and 5 ⇒ avg = 4.50.  
Only 2/3 rated = 66%, so that’s okay.  
All conditions met except if avg rating was below 4.0, would not return. In this case, returns if avg ≥ 4.0.*

### Thought Process (as if you’re the interviewee)  
Start with brute force: For each customer, scan all their orders, then for each customer:
- Count total orders.
- For each order, check if order time is peak hour; if so, increment peak count.
- For each order, if rating exists, track total rated and sum for average.
- After scanning, verify:
  - total orders ≥ 3
  - peak orders / total orders ≥ 60%
  - rated orders / total orders ≥ 50%
  - avg rating for rated orders ≥ 4.0

Optimize:  
- Use dictionaries (hashmap) to group orders per customer.
- For time extraction: parse hour from timestamp, then check if within [11,14) or [18,21).
- Avoid repeated calculations: keep running totals as you aggregate by customer.
- At the end, post-process and output only qualifying customers, properly rounded.

Chosen approach:  
Single pass over data, grouping by customer_id, updating counters for:
- total_orders
- peak_hour_orders
- rated_orders, rated_sum  
At the end, process each customer group, check conditions, and output required metrics.  
Trade-offs:  
- Space: O(n) per customer.
- Time: O(n) single-pass.

### Corner cases to consider  
- Orders at boundaries (e.g., exactly at 11:00, 14:00, 18:00, 21:00).
- Orders with None rating.
- Only peak hour orders / only non-peak hour orders.
- Customer has < 3 orders.
- Customer's orders all unrated.
- Ratings are exactly at boundary (e.g., average is 3.99 should not satisfy).

### Solution

```python
from collections import defaultdict

def findGoldenHourCustomers(orders):
    # orders: List of [customer_id, order_timestamp, order_amount, payment_method, order_rating]

    import math

    customer_data = defaultdict(list)

    # Group orders by customer_id
    for order in orders:
        customer_id = order[0]
        customer_data[customer_id].append(order)

    result = []

    for customer_id, records in customer_data.items():
        total_orders = len(records)
        peak_orders = 0
        rated_orders = 0
        ratings_sum = 0

        for record in records:
            ts = record[1]
            # Extract hour as int
            hour = int(ts[11:13])
            # Check if peak hour
            is_peak = (11 <= hour < 14) or (18 <= hour < 21)
            if is_peak:
                peak_orders += 1
            # Process rating
            rating = record[4]
            if rating is not None:
                rated_orders += 1
                ratings_sum += rating

        # Conditions
        if total_orders < 3:
            continue

        peak_percent = round(peak_orders * 100 / total_orders)
        rated_percent = round(rated_orders * 100 / total_orders)
        avg_rating = round(ratings_sum / rated_orders, 2) if rated_orders > 0 else 0.0

        if peak_percent >= 60 and avg_rating >= 4.0 and rated_percent >= 50:
            result.append([
                customer_id,
                total_orders,
                peak_percent,
                avg_rating,
                rated_percent
            ])

    # Sort by avg_rating descending, then customer_id descending
    result.sort(key=lambda x: (-x[3], -x[0]))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of orders. Each order is processed once, grouping and aggregating data.
- **Space Complexity:** O(c + n), where c is the number of distinct customers (hashmap size), plus storage for intermediate counters and input.

### Potential follow-up questions (as if you’re the interviewer)  

- If peak hours change dynamically per day, how would you adapt?
  *Hint: Store peak windows and check each timestamp against all; maybe parse from input.*

- How would you handle SQL implementation for massive tables?
  *Hint: Use GROUP BY to aggregate, CASE / WHEN for peak hour logic, HAVING for qualifying filter. Index on customer_id and order_timestamp improves performance.*

- Can you make this streaming or online?
  *Hint: Use running aggregation structures, process order as it comes in, and update qualifying flags lazily.*

### Summary
This problem is a classic **group by / aggregate per key** type, similar to database-style analytics and pandas/SQL groupings.  
Patterns used: grouping, aggregate calculations, filtering by multiple percentage criteria.  
It's often seen in scenarios where you classify “top” entities based on time/rating/percentage splits (anomaly detection, customer segmentation, churn analysis, etc.).

### Tags

### Similar Problems
