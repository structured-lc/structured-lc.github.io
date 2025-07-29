### Leetcode 1173 (Easy): Immediate Food Delivery I [Practice](https://leetcode.com/problems/immediate-food-delivery-i)

### Description  
Given a `Delivery` table that records each food delivery with `order_date` (when the order was made) and `customer_pref_delivery_date` (when the customer wants it delivered), you need to find the **percentage of orders that are "immediate" orders**, meaning orders where the order date and the preferred delivery date are the same. The result should be rounded to 2 decimal places.

### Examples  

**Example 1:**  
Input: `(order_date, customer_pref_delivery_date) = [(2023-01-01, 2023-01-01), (2023-01-01, 2023-01-02)]`  
Output: `50.00`  
*Explanation: The first order is immediate, the second is scheduled. So, 1 out of 2 orders is immediate. Percentage = (1/2) × 100 = 50.00.*

**Example 2:**  
Input: `(order_date, customer_pref_delivery_date) = [(2023-02-01, 2023-02-01), (2023-02-01, 2023-02-01)]`  
Output: `100.00`  
*Explanation: Both orders are immediate. Percentage = (2/2) × 100 = 100.00.*

**Example 3:**  
Input: `(order_date, customer_pref_delivery_date) = [(2023-03-01, 2023-03-02), (2023-03-02, 2023-03-03)]`  
Output: `0.00`  
*Explanation: No immediate orders. Percentage = (0/2) × 100 = 0.00.*


### Thought Process (as if you’re the interviewee)  
- Start by understanding that "immediate" means both dates are equal.
- For every row, check if `order_date == customer_pref_delivery_date`. Count all such rows.
- The required result is the percentage of immediate orders out of all orders, rounded to 2 decimal places.
- Brute-force: Iterate through every row, count immediate orders, then divide by total, multiply by 100.
- SQL offers aggregate functions. The boolean result of the comparison can be cast to 1 (true) or 0 (false) and then the average gives the required fraction.
- Final approach: In SQL, calculate the average of the comparison, multiply by 100, and round to 2 decimals.

### Corner cases to consider  
- No orders in the table (should handle possible division by zero; in most SQL variants, AVG returns NULL).
- All orders immediate.
- No immediate orders.
- Only one row.
- Duplicate orders.

### Solution

```python
# Simulating the SQL workflow in Python for interviews

def immediate_percentage(deliveries):
    # deliveries: list of tuples (order_date, customer_pref_delivery_date)
    if not deliveries:
        return 0.00   # Handle empty input (SQL would return NULL)
    immediate_count = 0
    for order_date, pref_date in deliveries:
        if order_date == pref_date:
            immediate_count += 1
    result = (immediate_count / len(deliveries)) * 100
    # Round to two decimals per problem requirement
    return round(result, 2)
```

#### Equivalent SQL (for reference):

```sql
SELECT ROUND(AVG(order_date = customer_pref_delivery_date) * 100, 2) AS immediate_percentage
FROM Delivery;
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of rows in the table (or length of the input list), as we scan every row once.
- **Space Complexity:** O(1), as we only use a few variables for counts and totals.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you output both immediate and scheduled percentages in the same query?  
  *Hint: Consider conditional aggregation or grouping.*

- How would you handle cases where there are no orders (empty table)?  
  *Hint: What should be the output for empty input? How does your SQL behave?*

- Can you generalize this to other kinds of comparisons?  
  *Hint: How flexible is your solution for different business rules?*

### Summary
This problem is an example of **conditional aggregation** and **percentage calculation** using boolean expressions. It's commonly seen in data analysis interviews and can be solved with simple SQL or Python. The method scales linearly and the pattern (average of boolean comparison) is very useful for similar "percentage of rows matching a condition" computations in SQL and analytics.