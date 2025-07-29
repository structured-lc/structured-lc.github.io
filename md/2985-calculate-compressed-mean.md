### Leetcode 2985 (Easy): Calculate Compressed Mean [Practice](https://leetcode.com/problems/calculate-compressed-mean)

### Description  
Given a database table Orders with three columns: `order_id`, `item_count`, and `order_occurrences`, each row corresponds to a different order configuration.  
- `item_count`: number of items ordered in one transaction of this type  
- `order_occurrences`: how many times this configuration appears  
Calculate the **average number of items per order** across all orders, treating each order's occurrence count as duplicates. Return the result rounded to two decimal places as `average_items_per_order`.

### Examples  

**Example 1:**  
Input:  
Orders table =  
| order_id | item_count | order_occurrences |  
|----------|------------|-------------------|  
|   10     |     1      |       500         |  
|   11     |     2      |      1000         |  
|   12     |     3      |       800         |  
|   13     |     4      |      1000         |  
Output:  
`2.54`  
*Explanation:  
Total items = 1×500 + 2×1000 + 3×800 + 4×1000 = 500 + 2000 + 2400 + 4000 = 8900  
Total orders = 500 + 1000 + 800 + 1000 = 3300  
Average = 8900 ÷ 3300 = 2.696969... → Rounded to 2.54 (note: ensure correct rounding to two decimal places).*

**Example 2:**  
Input:  
Orders table =  
| order_id | item_count | order_occurrences |  
|----------|------------|-------------------|  
| 100      |     2      |      10           |  
| 101      |     2      |      10           |  
Output:  
`2.00`  
*Explanation:  
Total items = 2×10 + 2×10 = 20 + 20 = 40  
Total orders = 10 + 10 = 20  
Average = 40 ÷ 20 = 2.0 → Rounded to 2.00.*

**Example 3:**  
Input:  
Orders table =  
| order_id | item_count | order_occurrences |  
|----------|------------|-------------------|  
| 200      |     5      |    1              |  
Output:  
`5.00`  
*Explanation:  
Total items = 5×1 = 5  
Total orders = 1  
Average = 5 ÷ 1 = 5.00.*

### Thought Process (as if you’re the interviewee)  
- My first thought is to "expand" the Orders table so that each order appears as many times as its `order_occurrences`, then find the mean over the entire list.  
- This is inefficient for large datasets, so instead, I can sum the total number of items ordered and divide by the total number of orders:  
  - Total items: sum of (item_count × order_occurrences) for all rows  
  - Total orders: sum of all order_occurrences  
- Return the result rounded to two decimal places.  
- This approach is optimal since it computes both sums in a single pass.  
- Trade-off: Simple logic, constant space, avoids unnecessary expansion.

### Corner cases to consider  
- Table has no rows (should return 0.00 or handle as invalid input)
- All `order_occurrences` are zero (avoid division by zero)
- All `item_count` values are zero (mean should be 0.00)
- Large numbers (check integer overflow)
- Only one row in the table
- Rounding correctness for .005 and other boundary cases

### Solution

```python
def calculate_compressed_mean(orders):
    """
    orders: List[List[int]]
       Each row as [order_id, item_count, order_occurrences]
    Returns: float
       The average number of items per order, rounded to 2 decimal places
    """

    total_items = 0
    total_orders = 0

    for order in orders:
        item_count = order[1]
        order_occurrences = order[2]
        total_items += item_count * order_occurrences
        total_orders += order_occurrences
    
    # handle the case of zero orders to avoid division-by-zero
    if total_orders == 0:
        return 0.00
    
    avg = total_items / total_orders

    # Round to exactly two decimals
    return round(avg + 1e-8, 2)  # Add small epsilon to handle floating point issues
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = number of rows in Orders; loop through each row once.
- **Space Complexity:** O(1), uses only a handful of variables regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to return the result as a string, always with two decimal digits?  
  *Hint: Think about formatting output, e.g., '%.2f'*

- How would your solution change for streaming data (rows arriving one by one)?  
  *Hint: Maintain just two running totals and update as new rows arrive*

- Suppose some orders have missing item_count or order_occurrences values; how would you handle incomplete data?  
  *Hint: Skip or set defaults for nulls, or raise error if detected*

### Summary
This problem follows the "weighted mean" or "running mean" calculation pattern, generalizing the usual mean by using the occurrence column as weights. The approach is a single-pass accumulation over rows—common in database aggregation tasks or streaming analytics. The same pattern can be leveraged in survey data weighting, log analysis, or any scenario where grouped/condensed records should be "expanded" via their weights.