### Leetcode 3564 (Medium): Seasonal Sales Analysis [Practice](https://leetcode.com/problems/seasonal-sales-analysis)

### Description  
Given two tables, `products` and `sales`, for each **season** (Winter: Dec/Jan/Feb, Spring: Mar/Apr/May, Summer: Jun/Jul/Aug, Fall: Sep/Oct/Nov), find the **most popular product category** by **total quantity sold**. If there's a tie, choose the one with higher **total revenue** (quantity × price). Output each season's category, total quantity, and total revenue, sorted by season.

### Examples  

**Example 1:**  
Input:  
`products = [[1, "Shoes", "Footwear"], [2, "Boots", "Footwear"], [3, "Scarf", "Accessory"]]`  
`sales = [[1, "2023-01-10", 10, 50], [2, "2023-12-12", 5, 100], [3, "2023-04-10", 20, 10]]`  
Output:  
`[["Winter", "Footwear", 15, 1000], ["Spring", "Accessory", 20, 200]]`  
*Explanation:*
- Winter: Jan & Dec sales. Footwear (Shoe + Boots): 10 + 5 = 15 sold, revenue = 10×50 + 5×100 = 500 + 500 = 1000
- Spring: Scarf sold in Apr: 20×10 = 200 revenue, quantity = 20

**Example 2:**  
Input:  
`products = [[1, "Watch", "Accessory"], [2, "Hat", "Accessory"], [3, "Sneakers", "Footwear"]]`  
`sales = [[1, "2023-07-04", 7, 80], [2, "2023-08-15", 3, 50], [3, "2023-07-21", 7, 100]]`  
Output:  
`[["Summer", "Footwear", 7, 700], ["Summer", "Accessory", 10, 710]]`  
*Explanation:*  
- Summer: Jul/Aug. Accessory: 7 (Watch) + 3 (Hat) = 10, revenue: 7×80 + 3×50 = 560 + 150 = 710; Footwear: 7×100 = 700. Accessory wins on quantity and revenue.

**Example 3:**  
Input:  
`products = [[10, "Dress", "Apparel"]]`  
`sales = []`  
Output:  
`[]`  
*Explanation:*  
- No sales, so no seasons with popular categories.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each sale, figure out its season, connect it to category, and add up quantity and revenue for each (season, category). Then, for every season, pick the category with highest total quantity (ties broken by revenue).
- **Join first:** Join `sales` with `products` on `product_id` to get the `category` for every sale.
- **Season mapping:** For each sale's date, map the month to its season.
- **Aggregate:** Group by (season, category), sum quantities and revenues.
- **Rank within season:** For each season, choose the category with highest quantity (and revenue for tie).
- **Tradeoffs:** 
  - Brute-force is inefficient for large tables.
  - Optimized group-by with sort or rank is much better: O(N) time if N = sales.
  - Window functions or dictionaries can be used for ranking in code.
- The final approach efficiently aggregates, groups, and ranks per season.

### Corner cases to consider  
- No sales at all (`sales` is empty): output empty.
- Months that don’t map (invalid data): should not happen if input is well-formed.
- Tied quantity, but different revenues: pick higher revenue.
- Multiple seasons present or missing some seasons entirely.
- Price or quantity of zero.
- Large input sizes for aggregation bottleneck.

### Solution

```python
def seasonal_sales_analysis(products, sales):
    # Mapping product_id to category and price
    prod_info = {}
    for p in products:
        # p = [product_id, name, category]
        # price comes from sales, not from products
        prod_info[p[0]] = p[2]  # map id → category

    # Month number to season
    month_to_season = {
        1: 'Winter', 2: 'Winter', 12: 'Winter',
        3: 'Spring', 4: 'Spring', 5: 'Spring',
        6: 'Summer', 7: 'Summer', 8: 'Summer',
        9: 'Fall', 10: 'Fall', 11: 'Fall'
    }

    # (season, category) → [qty_sum, revenue_sum]
    season_cat_stat = {}
    for sale in sales:
        prod_id, date_str, qty, price = sale
        # parse month
        month = int(date_str[5:7])
        season = month_to_season[month]
        category = prod_info[prod_id]
        key = (season, category)
        if key not in season_cat_stat:
            season_cat_stat[key] = [0, 0]
        season_cat_stat[key][0] += qty
        season_cat_stat[key][1] += qty * price

    # For each season, choose category with max qty (break tie by revenue)
    season_winner = {}
    for (season, category), (qty, revenue) in season_cat_stat.items():
        if season not in season_winner:
            season_winner[season] = (category, qty, revenue)
        else:
            best_cat, best_qty, best_rev = season_winner[season]
            if qty > best_qty or (qty == best_qty and revenue > best_rev):
                season_winner[season] = (category, qty, revenue)

    # Sort by season order
    season_order = ['Winter', 'Spring', 'Summer', 'Fall']
    res = []
    for season in season_order:
        if season in season_winner:
            cat, qty, rev = season_winner[season]
            res.append([season, cat, qty, rev])
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(M + N), where M is # of products and N is # of sales. Each product and sale is processed once; group-by and sorting are over max 4 seasons × #categories.
- **Space Complexity:** O(M + S×C), where S = max 4 seasons and C = category count. Dicts store aggregation. Minimal extra space beyond input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle ties in both quantity and revenue?
  *Hint: Further tie-breaker, e.g., alphabetical.*

- What if products table includes category prices, not sales table?
  *Hint: Adjust join mapping to use price from products.*

- Suppose seasons mapping varies by country?
  *Hint: Make month-to-season mapping configurable via parameter.*

### Summary
This problem is a classic **group by aggregation + tie-breaking** pattern, requiring careful mapping and aggregation, typically asked to assess comfort with data processing and edge case management. The coding pattern here is widely applicable in data analytics, reporting by category/group, and in windowed/tagged aggregation tasks.