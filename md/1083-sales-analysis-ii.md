### Leetcode 1083 (Easy): Sales Analysis II [Practice](https://leetcode.com/problems/sales-analysis-ii)

### Description  
Given two database tables, **Product** and **Sales**:
- The **Product** table lists information about products with columns: product_id, product_name, unit_price.
- The **Sales** table records purchases, with columns: seller_id, product_id, buyer_id, sale_date, quantity, price.

You need to **find all buyer IDs who bought the product "S8" but did not buy the product "iPhone"**. Return the list of these buyer IDs (distinct, no duplicates).

### Examples  

**Example 1:**  
Input:  
Product =  
| product_id | product_name | unit_price |
|------------|-------------|------------|
| 1          | S8          | 1000       |
| 2          | G4          | 800        |
| 3          | iPhone      | 1400       |

Sales =  
| seller_id | product_id | buyer_id | sale_date   | quantity | price |
|-----------|------------|----------|-------------|----------|-------|
| 1         | 1          | 1        | 2019-01-21  | 2        | 2000  |
| 1         | 2          | 2        | 2019-02-17  | 1        | 800   |
| 2         | 1          | 3        | 2019-06-02  | 1        | 800   |
| 3         | 3          | 3        | 2019-05-13  | 2        | 2800  |

Output:  
| buyer_id |
|----------|
| 1        |

*Explanation:*
- Buyer 1 bought S8 only.
- Buyer 3 bought both S8 and iPhone (excluded).
- Buyer 2 never bought S8 (excluded).

  
**Example 2:**  
Input:  
Product =  
| product_id | product_name | unit_price |
|------------|-------------|------------|
| 1          | S8          | 1000       |
| 2          | G4          | 800        |
| 3          | iPhone      | 1400       |

Sales =  
| seller_id | product_id | buyer_id | sale_date  | quantity | price |
|-----------|------------|----------|------------|----------|-------|
| 1         | 2          | 8        | 2019-03-01 | 1        | 800   |
| 2         | 3          | 1        | 2019-03-02 | 1        | 1400  |

Output:  
| buyer_id |
|----------|
|          |

*Explanation:*
- No buyer bought S8 (so, output is empty).

  
**Example 3:**  
Input:  
Product =  
| product_id | product_name | unit_price |
|------------|-------------|------------|
| 1          | S8          | 1000       |
| 2          | G4          | 800        |
| 3          | iPhone      | 1400       |

Sales =  
| seller_id | product_id | buyer_id | sale_date  | quantity | price |
|-----------|------------|----------|------------|----------|-------|
| 1         | 1          | 6        | 2019-02-10 | 1        | 1000  |
| 2         | 3          | 9        | 2019-02-11 | 1        | 1400  |

Output:  
| buyer_id |
|----------|
| 6        |

*Explanation:*
- Buyer 6 bought S8 only.
- Buyer 9 bought only iPhone (excluded).


### Thought Process (as if you’re the interviewee)  

First, I need to figure out which buyers purchased an S8 and remove all buyers who also purchased an iPhone.

1. **Brute-force idea:**  
   - Go through the Sales table.
   - For each buyer, check all their purchases:  
     - If they bought S8, add to a set.
     - If they bought iPhone, add to another set.
   - At the end, output the set of buyers who bought S8 but not iPhone (subtract sets).

2. **Optimized/SQL thoughts:**  
   - Use JOINs between Product and Sales to map product names.
   - Find all buyer_ids who bought S8.
   - Exclude any buyer_ids who show up in purchases of iPhone.

**Trade-offs:**  
- The brute-force idea is easy but not scalable for large datasets.
- Set operations are quick with proper indexing.
- In SQL, queries with `IN`/`NOT IN` or `EXISTS`/`NOT EXISTS` achieve this efficiently.


### Corner cases to consider  
- No buyers bought S8 → output should be empty.
- A buyer bought both S8 and iPhone → should not be included.
- Duplicates in Sales table → must return distinct buyer ids only.
- More products in Product table → only care about S8 and iPhone.
- Null or invalid entries (not realistic here: IDs should be present/integer).

  
### Solution

```python
# Since this is SQL-like, let's simulate in Python.
# Table structure:
# - products: list of dicts [{'product_id': int, 'product_name': str, ...}]
# - sales: list of dicts [{'product_id': int, 'buyer_id': int, ...}]

def sales_analysis_II(products, sales):
    # Map product_name to product_id
    name_to_id = {}
    for p in products:
        name_to_id[p['product_name']] = p['product_id']
        
    s8_id = name_to_id.get('S8')
    iphone_id = name_to_id.get('iPhone')

    # Sets to collect buyer_ids based on product bought
    s8_buyers = set()
    iphone_buyers = set()
    
    for sale in sales:
        if sale['product_id'] == s8_id:
            s8_buyers.add(sale['buyer_id'])
        if sale['product_id'] == iphone_id:
            iphone_buyers.add(sale['buyer_id'])

    # Buyers who bought S8 but not iPhone
    result = sorted(s8_buyers - iphone_buyers)
    return result

# For SQL interview: The SQL would be
'''
SELECT DISTINCT s1.buyer_id
FROM Sales s1
JOIN Product p1 ON s1.product_id = p1.product_id
WHERE p1.product_name = 'S8'
  AND s1.buyer_id NOT IN (
    SELECT s2.buyer_id
    FROM Sales s2
    JOIN Product p2 ON s2.product_id = p2.product_id
    WHERE p2.product_name = 'iPhone'
  )
'''
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N), where N = number of rows in **Sales**. Each sale is processed once to check product types and buyer_ids.
- **Space Complexity:** O(B), where B = number of unique buyers. Sets store buyer ids for S8 and iPhone buyers.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the product names can change (e.g., typo), or there are multiple S8/iPhone models?
  *Hint: Could use LIKE or similar fuzzy match logic, or normalize product names first.*

- What if a buyer bought S8 multiple times?
  *Hint: DISTINCT ensures no duplicates. Would logic change for other queries?*

- How would you design the query for "buyers who bought both S8 and iPhone"?
  *Hint: Use INTERSECT logic or matching in both sets/tables.*

- What if you needed the list of all products that a buyer who bought S8 but not iPhone, has ever bought?
  *Hint: Extend set logic to aggregate all such purchased products for qualifying buyers.*

### Summary
This problem is a classic **set operation/filtering** task, mapping closely to set difference: find all buyers buying S8, exclude those who bought iPhone. The pattern is common for "A but not B" or "exclusive group" queries, found in both SQL and Python. The coding approach leverages dictionaries and sets for efficient lookup, and the SQL solution makes use of JOIN and subqueries with IN/NOT IN for accurate filtering.