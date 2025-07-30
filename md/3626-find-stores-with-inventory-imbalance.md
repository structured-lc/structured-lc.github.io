### Leetcode 3626 (Medium): Find Stores with Inventory Imbalance [Practice](https://leetcode.com/problems/find-stores-with-inventory-imbalance)

### Description  
Given a table `Inventory` with columns: `store_id`, `store_name`, `location`, `product_name`, `price`, `quantity`, find all stores where the most expensive product has a *smaller* stock count than the cheapest product for that store. For each such store, return:
- store_id
- store_name
- location
- most_exp_product (name of most expensive product)
- cheapest_product (name of cheapest product)
- difference between the quantity of the cheapest and the most expensive products, rounded to 2 decimal places (as `inventory_diff`).

### Examples  

**Example 1:**  
Input:  
Inventory =  
| store_id | store_name | location | product_name | price | quantity |
|----------|------------|----------|--------------|-------|----------|
| 1        | NY Outlet  | NYC      | Shoes        | 200   | 30       |
| 1        | NY Outlet  | NYC      | Cap          | 50    | 70       |

Output:  
| store_id | store_name | location | most_exp_product | cheapest_product | inventory_diff |
|----------|------------|----------|------------------|------------------|----------------|
| 1        | NY Outlet  | NYC      | Shoes            | Cap              | 40.00          |

*Explanation: Shoes is the most expensive (price=200, quantity=30), Cap is cheapest (price=50, quantity=70); 30 < 70, so diff=70-30=40.*

**Example 2:**  
Input:  
| store_id | store_name | location | product_name | price | quantity |
|----------|------------|----------|--------------|-------|----------|
| 2        | LA Mall    | LA       | Phone        | 500   | 10       |
| 2        | LA Mall    | LA       | Charger      | 20    | 5        |

Output:  
(no rows)

*Explanation: Most expensive (Phone) has 10, cheapest (Charger) has 5; as 10 > 5, does not qualify.*

**Example 3:**  
Input:  
| store_id | store_name | location | product_name | price | quantity |
|----------|------------|----------|--------------|-------|----------|
| 3        | ShopC      | SF       | Hat          | 20    | 15       |
| 3        | ShopC      | SF       | Gloves       | 20    | 25       |

Output:  
(no rows)

*Explanation: Both items are at the same price, so it doesn't matter which is most expensive or cheapest, but the rule is strict inequality on price, so if there is only one price, there is no imbalance.*

### Thought Process (as if you're the interviewee)  
To solve this problem:
- First, for each store, find the product(s) with the highest price and the product(s) with the lowest price.
- For those, get the corresponding quantities and names.
- For each store, check if the quantity of the most expensive product is *less than* the quantity of the cheapest product.
- If so, report the store, product names, and the difference.
- Brute-force would be to scan all products store by store, but an optimized approach is possible if stored in a database (via GROUP BY + aggregation), but in code, we loop once to group by store, then process per store.

### Corner cases to consider  
- Store with only one product (should not appear in output)
- Multiple products with same max/min price in the store (choose any for product name, or list all)
- Most expensive and cheapest are the same product (should not appear in output)
- Quantities equal (strict 'less than' is required)
- Negative or zero quantity (should work per the same logic)

### Solution

```python
from collections import defaultdict

def find_inventory_imbalance(inventory):
    # inventory: list of dicts matching input table

    # Step 1: Group products by store_id
    stores = defaultdict(list)
    for item in inventory:
        stores[item['store_id']].append(item)
    
    result = []
    
    for store_id, products in stores.items():
        # Find product(s) with max price and min price
        max_price = max(p['price'] for p in products)
        min_price = min(p['price'] for p in products)
        
        # If each store has only one price, skip
        if max_price == min_price:
            continue
        
        # Grab any product with max/min price
        most_exp = [p for p in products if p['price'] == max_price][0]
        cheapest = [p for p in products if p['price'] == min_price][0]
        
        # If most expensive product's quantity is less, store it
        if most_exp['quantity'] < cheapest['quantity']:
            result.append({
                'store_id': store_id,
                'store_name': most_exp['store_name'],
                'location': most_exp['location'],
                'most_exp_product': most_exp['product_name'],
                'cheapest_product': cheapest['product_name'],
                'inventory_diff': round(cheapest['quantity'] - most_exp['quantity'], 2)
            })
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** **O(n)**, where \( n \) is the number of inventory records. Each record is processed once to build the groupings, and each store list is processed in linear time relative to its size.
- **Space Complexity:** **O(n)** to store the grouping of products per store, and output list.

### Follow-up questions  
- How would you handle ties where multiple products are equally most or least expensive?
- How would the query change if instead of strict 'less than', it was 'less than or equal', or if we wanted to output all qualifying product pairs?