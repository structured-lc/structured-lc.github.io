### Leetcode 1867 (Medium): Orders With Maximum Quantity Above Average [Practice](https://leetcode.com/problems/orders-with-maximum-quantity-above-average)

### Description  
Given an `OrdersDetails` table:

```
+-----------+------------+----------+
| order_id  | product_id | quantity |
+-----------+------------+----------+
```
Each order can have multiple products, each with its own quantity.  
Find all order\_id such that the **maximum quantity** of any product in the order is **strictly greater** than the **average quantity** of any order (including itself).  
- The average quantity of an order = (sum of all products' quantities in that order) / (number of products in the order).
- The maximum quantity of an order = highest quantity among all its products.

For each order, if its max quantity is > the *highest* average quantity among all orders, return that order's `order_id`.

### Examples  

**Example 1:**  
Input:  
OrdersDetails =  
| order_id | product_id | quantity |
|----------|------------|----------|
|    1     |     1      |    3     |
|    1     |     2      |    6     |
|    2     |     1      |    5     |
|    2     |     2      |    1     |
|    3     |     1      |    9     |
Output=`[3]`  
*Explanation:  
- Order 1: avg = (3+6)/2 = 4.5, max = 6  
- Order 2: avg = (5+1)/2 = 3.0, max = 5  
- Order 3: avg = 9/1 = 9.0, max = 9  
- Highest average among all orders = 9.0. Only order 3 has max quantity (9) > 9.0 is false.  
Strictly greater required, so no output.  
But if another order had max_quantity > 9.0, add its id to output.*

**Example 2:**  
Input:  
OrdersDetails =  
| order_id | product_id | quantity |
|----------|------------|----------|
|    1     |     1      |    4     |
|    1     |     2      |    8     |
|    2     |     1      |    7     |

Output=`[1]`  
*Explanation:  
- Order 1: avg = (4+8)/2=6.0, max=8  
- Order 2: avg = 7/1=7.0, max=7  
- Highest avg = 7.0  
- Order 1: max=8 > 7.0, so output [1].*  

**Example 3:**  
Input:  
OrdersDetails =  
| order_id | product_id | quantity |
|----------|------------|----------|
|    1     |     1      |    5     |

Output=`[]`  
*Explanation:  
- Only one order, avg=5, max=5, max is not strictly greater than avg, so empty output.*

### Thought Process (as if you’re the interviewee)  
First, I want to clarify the requirements:  
- For each order, I need its max quantity, and the **maximum** average quantity across all orders.  
- If the order's max quantity > that global max avg, include its id.
- Step 1: For each order, compute avg and max quantity.
- Step 2: Determine the global maximum avg.
- Step 3: Check which orders' max > global max avg, output their order_id.
  
A brute-force approach is to scan all orders, compute avg/max for each, then scan again for the max of avgs, then select those with max > that value.

A SQL-friendly way is to make a temporary table (CTE or subquery) aggregating by order_id to get each order's avg and max, then compare max_quantity vs max(avg_quantity) using a second scan or window function.

Trade-offs:
- All steps can be done efficiently with a single table scan plus a subquery or window aggregation.
- Approach is optimal for this size of data.
- Simpler and more readable than complicated joins.

### Corner cases to consider  
- Only one order in the table (should return empty, as max ≯ avg).
- Orders with all products having the same quantity.
- Orders with only one product (avg = max).
- Orders with negative or zero quantities (input says quantities, so likely only positives, but check).
- Multiple orders tie for both max quantity and max avg.

### Solution

```python
# We'll take the input as a list of [order_id, product_id, quantity]
# Returns a list of order_ids that satisfy the 'imbalanced' order condition.

def orders_with_max_quantity_above_average(orders_details):
    # Step 1: Build a dictionary: key=order_id, value=list of quantities for that order.
    from collections import defaultdict

    order_quantities = defaultdict(list)
    for order_id, product_id, quantity in orders_details:
        order_quantities[order_id].append(quantity)

    # Step 2: For each order, compute avg and max quantity
    order_stats = dict() # order_id: (max_quantity, avg_quantity)
    max_avg_quantity = float('-inf')
    for order_id, qtys in order_quantities.items():
        maxq = max(qtys)
        avgq = sum(qtys) / len(qtys)
        order_stats[order_id] = (maxq, avgq)
        if avgq > max_avg_quantity:
            max_avg_quantity = avgq

    # Step 3: Find orders where maxq > max_avg_quantity
    result = []
    for order_id, (maxq, avgq) in order_stats.items():
        if maxq > max_avg_quantity:
            result.append(order_id)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of records in OrdersDetails. Each row is scanned exactly once in building the mapping, and final checks/aggregation are over up to O(n) unique order_ids.
- **Space Complexity:** O(n), for storing per-order grouping of quantities and per-order statistics.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the table is extremely large and does not fit in memory?  
  *Hint: Can you do this aggregation in a streaming or distributed fashion?*

- How would you adapt if OrdersDetails could have negative or zero quantities?  
  *Hint: Consider if the average can be negative, and if output semantics still make sense.*

- What if you need the order_id and the product_id that produced the max quantity as well?  
  *Hint: Track both product_id and quantity for each order during aggregation.*

### Summary
This problem is a classic **aggregation** and **filtering** pattern, common in SQL interviews and backend interviews.  
- Key patterns: grouping, calculating aggregates per group, comparing to a global aggregate.
- The solution uses grouping and aggregation; can be seen in sales analytics, fraud detection, and user leaderboard problems.  
- Know how to efficiently compute group-wise statistics, and then select on a global condition.


### Flashcard
Compute the maximum average quantity across orders and compare it with each order's max quantity.

### Tags
Database(#database)

### Similar Problems
