### Leetcode 1251 (Easy): Average Selling Price [Practice](https://leetcode.com/problems/average-selling-price)

### Description  
Given tables with sales transactions for products, compute the *average selling price* per product for those products that had at least one sale.

You are expected to join three tables:
- `Product`, which lists product id and name.
- `Sales`, which gives product id, year, and price sold.
- `SalesPrice`, which may have multiple price records for a product and year, but only one of them is marked as the current price.

Return product id and their corresponding *average selling price* rounded to 2 decimals. Only include products that had at least one sale.

### Examples  
**Example 1:**  
Input:
Product table:
| product_id | product_name |
|------------|--------------|
| 100        | Apple        |
| 200        | Orange       |

Sales table:
| sale_id | product_id | year | price |
|---------|------------|------|-------|
| 1       | 100        | 2019 | 50    |
| 2       | 100        | 2019 | 60    |
| 3       | 200        | 2019 | 20    |

Output:
| product_id | average_price |
|------------|---------------|
| 100        | 55.00         |
| 200        | 20.00         |
*Explanation: Apple sold twice in 2019 for 50 and 60, so avg = (50+60)/2 = 55. Orange sold once for 20.*

**Example 2:**  
Input:
Product table:
| product_id | product_name |
|------------|--------------|
| 30         | Banana       |

Sales table is empty

Output is empty

*Explanation: There was no sale for Banana, so no result is returned.*

### Thought Process (as if you’re the interviewee)  
The primary task is to find the average of sale prices for each product that had at least one entry in the Sales table. So, simply group by product_id in the Sales table, and for each, compute the average. Ignore rows where there is no solds.

Join with the Product table is only necessary if the question wanted the product name, but as per problem, we just need id and average. 

### Corner cases to consider  
- Products that have no associated sales (do not include in output)
- Products with one sale (output the price itself)
- Multiple products with the same name (but different ids)
- Prices may be floating point (average may not be an integer, round to two decimals)

### Solution

```python
# For SQL variant:
# SELECT product_id, ROUND(AVG(price), 2) AS average_price
# FROM Sales
# GROUP BY product_id;

# For a functional approach (Python):
from collections import defaultdict

def averageSellingPrice(sales):
    # sales: list of dict with keys: 'product_id', 'price'
    price_sum = defaultdict(float)
    sale_count = defaultdict(int)
    for row in sales:
        price_sum[row['product_id']] += row['price']
        sale_count[row['product_id']] += 1
    result = []
    for pid in price_sum:
        avg = round(price_sum[pid] / sale_count[pid], 2)
        result.append({"product_id": pid, "average_price": avg})
    return result
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n), where n is the number of sales entries, one pass to process and another (short) pass to output.
- **Space Complexity:** O(k) where k is the number of distinct products that were sold (hashmaps).

### Potential follow-up questions (as if you’re the interviewer)  
- How would you include product name in the output?
  *Hint: Join the results with the Product table by product_id.*

- What if you wanted the average for each year, not just overall?
  *Hint: Group by both product_id and year.*

- How would you handle missing or null prices?
  *Hint: Exclude them from the calculation and count.*

### Summary
The pattern is standard aggregation by group and average. Useful for any reporting, analytics, or SQL processing problem.