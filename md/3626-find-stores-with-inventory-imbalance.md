### Leetcode 3626 (Medium): Find Stores with Inventory Imbalance [Practice](https://leetcode.com/problems/find-stores-with-inventory-imbalance)

### Description  
Given two tables, `Stores` and `Products`, write a query to **find all stores with inventory imbalance**.  
*A store is said to have an inventory imbalance if, within that store, the most expensive product has fewer units in stock than the cheapest product.*  
For each store with imbalance, return the store's `store_id` and `store_name` (sorted by `store_id`).

**Tables:**  
- `Stores(store_id, store_name)`
- `Products(product_id, store_id, product_name, price, stock)`

A typical interview rephrase:  
*"Given the definition of imbalance, find all stores where the highest-priced product's stock is less than the lowest-priced product's stock."*

### Examples  

**Example 1:**  
Input:  
Stores =  
| store_id | store_name |
|----------|------------|
| 1        | StoreA     |
| 2        | StoreB     |

Products =  
| product_id | store_id | product_name | price | stock |
|------------|----------|--------------|-------|-------|
| 11         | 1        | Apple        | 10    | 7     |
| 12         | 1        | Banana       | 2     | 15    |
| 21         | 2        | Orange       | 5     | 20    |
| 22         | 2        | Berry        | 8     | 20    |

Output:  
`[[1, "StoreA"]]`  
Explanation. StoreA: Cheapest product Banana ($2, stock 15), Most expensive Apple ($10, stock 7). Imbalance (7 < 15).  
StoreB: cheapest is Orange (5, 20), most expensive Berry (8, 20). 20 ≯ 20, so no imbalance.

**Example 2:**  
Input:  
Stores =  
| store_id | store_name |
|----------|------------|
| 3        | Alpha      |

Products =  
| product_id | store_id | product_name | price | stock |
|------------|----------|--------------|-------|-------|
| 101        | 3        | Milk         | 3     | 8     |
| 102        | 3        | Cheese       | 9     | 12    |
| 103        | 3        | Yogurt       | 2     | 15    |

Output:  
`[[3, "Alpha"]]`  
Explanation. Cheapest: Yogurt ($2, 15), Most expensive: Cheese ($9, 12). 12 < 15, hence imbalance.

**Example 3:**  
Input:  
Stores =  
| store_id | store_name |
|----------|------------|
| 5        | Nosh       |

Products =  
| product_id | store_id | product_name | price | stock |
|------------|----------|--------------|-------|-------|
| 111        | 5        | Juice        | 4     | 14    |

Output:  
`[]`  
Explanation. Only one product, so cheapest and most expensive are the same. Stock not smaller, so no imbalance; output empty.

### Thought Process (as if you’re the interviewee)  

- *Brute-force*:  
  For each store, collect all its products. Compute the minimum price and its stock, then maximum price and its stock. If the stock of the max-priced product is less than that of the min-priced one, record the store.

- *Optimized SQL*:  
  Since the input is SQL tables, use a CTE (Common Table Expression) or subqueries to:
  - For each store, find min_price and max_price.
  - Join back to Products to get stock for products at min and max price for each store.
  - Compare—if the stock of the max-priced product < min-priced product, select the store.

- The challenge is multiple products can share the same min or max price.  
  *If so, use MIN(stock) for min_price, and MIN(stock) for max_price (or any, since we just care about the comparison, but follow the SQL convention: if multiple, aggregate using MIN).*

- *Trade-off*:  
  This approach is efficient since all is done in SQL and only returns relevant stores.

### Corner cases to consider  
- Store has only one product: should not be counted (min= max, so imbalance fails)
- Multiple products can have same min or max price: pick the stock min or aggregate appropriately
- All products have the same price: again, no imbalance (since min= max)
- Store with no products: ignore; shouldn't appear in output
- Min_price_stock equals max_price_stock: no imbalance, must not include

### Solution

```python
# Example Python simulation, since typical coding interviews won't use SQL,
# but in interviews you might be asked how to simulate this or reason about a solution.

from collections import defaultdict

def find_stores_with_inventory_imbalance(stores, products):
    # Map store_id to all its product (price, stock)
    store_products = defaultdict(list)
    store_names = {}
    for store_id, store_name in stores:
        store_names[store_id] = store_name

    for prod in products:
        # unpack product attributes
        _, store_id, _, price, stock = prod
        store_products[store_id].append((price, stock))

    result = []
    for store_id, items in store_products.items():
        if not items:
            continue
        # Find min and max price in products for this store
        min_price = min(items, key=lambda x: x[0])[0]
        max_price = max(items, key=lambda x: x[0])[0]
        # There might be several products with min or max price
        min_price_stock = min(stock for price, stock in items if price == min_price)
        max_price_stock = min(stock for price, stock in items if price == max_price)
        # Inventory imbalance: max_price_stock < min_price_stock
        if max_price != min_price and max_price_stock < min_price_stock:
            result.append([store_id, store_names[store_id]])

    # Sort by store_id as required
    result.sort()
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N is the number of products.  
  Building the dictionary and min/max operations scan per store, usually a small number of products per store.
- **Space Complexity:** O(S + N), S is number of stores, N is number of products.  
  We store all products per store.

### Potential follow-up questions (as if you’re the interviewer)  

- How to handle ties if multiple products have same min or max price?  
  *Hint: Aggregate using MIN(stock) for that price; must be careful with groupings.*

- What if the Products table is very large (millions of rows)?  
  *Hint: Consider database indices on store_id and price; optimize queries by filtering early.*

- Can you write this in efficient SQL?  
  *Hint: Use CTEs or window functions to find min/max price and then select required stocks efficiently.*

### Summary
This problem is a neat example of the **aggregation per group** and **conditional filter** coding patterns. It checks per-group (per-store) data for a business logic property using *min*, *max*, and *comparison*. Elsewhere, this arises in reporting “group max/min” discrepancies or when finding "groups where x is less than y," applicable in database analytics, inventory logic, and error detection scenarios.