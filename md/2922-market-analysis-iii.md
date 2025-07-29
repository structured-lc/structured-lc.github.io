### Leetcode 2922 (Medium): Market Analysis III [Practice](https://leetcode.com/problems/market-analysis-iii)

### Description  
Given three tables: `Users`, `Items`, and `Orders`.  
- Each `User` is a seller of items, each user has a favorite brand (for ex. Nike, Adidas, etc.).
- The `Items` table tracks the brand of each item.
- The `Orders` table records purchases, linking together sellers and what was sold.

For each seller, count the number of **distinct items** they have sold **that are NOT of their favorite brand**.
Return the seller(s) and `num_items` for those with the **highest such count**.

### Examples  

**Example 1:**  
Input:  
`Users = [ [1, "Nike"], [2, "Adidas"], [3, "Nike"] ]`  
`Items = [ [101, "Nike"], [102, "Adidas"], [103, "Puma"] ]`  
`Orders = [ [1, 101], [1, 102], [1, 103], [2, 102], [2, 103], [3, 101] ]`  
Output:  
`[ [1, 2], [2, 1] ]`  
*Explanation:*  
- Seller 1 ('Nike') sold 102 ('Adidas') and 103 ('Puma'): 2 items not their favorite brand.  
- Seller 2 ('Adidas') sold 103 ('Puma'): 1 item not their favorite brand.  
- Seller 3 only sold 101 ('Nike'), which matches their favorite — not counted.  
- Seller 1 has the highest count (2), seller 2 is next (1).

**Example 2:**  
Input:  
`Users = [ [10, "Apple"] ]`  
`Items = [ [100, "Apple"], [101, "Samsung"] ]`  
`Orders = [ [10, 101] ]`  
Output:  
`[ [10, 1] ]`  
*Explanation:*  
- Seller 10's favorite is 'Apple'.  
- They sold item 101 ('Samsung'), which does not match. Count is 1.

**Example 3:**  
Input:  
`Users = [ [5, "Sony"] ]`  
`Items = []`  
`Orders = []`  
Output:  
`[]`  
*Explanation:*  
- No sales. No sellers with non-zero non-favorite-brand sales.


### Thought Process (as if you’re the interviewee)  
Start with the brute-force idea:  
- For each seller, for each order, look up the item, then look up item brand and seller favorite, and count if not equal.

Brute-force time is high: for each seller, scan all orders. That’s O(sellers × orders × items).

Optimization:  
- Use SQL/join or dictionary lookups to connect orders to item brands and seller’s favorite brands quickly.
- For each order, join seller, item, and their brands, then for each seller count distinct item_ids where item brand ≠ favorite brand.
- Once seller counts are computed, find the max and return all sellers with that max.

Trade-offs:  
- Fastest approach batches the lookups:  
  * Build maps for seller → favorite brand, item → brand  
  * For each order, check item brand vs seller favorite; accumulate unique (seller, item) pairs  
  * Tally per seller the count of such items  
  * Output all sellers tied for the max count

### Corner cases to consider  
- Sellers with no orders
- All items are the seller’s favorite brand
- Multiple sellers tie for highest count
- Orders contain duplicate sales on the same item (should count distinct item ids only)
- Empty `Users`, `Items`, or `Orders` tables

### Solution

```python
def marketAnalysisIII(users, items, orders):
    # Build mappings: seller_id -> favorite_brand, item_id -> brand
    seller_fav = {sid: fav for sid, fav in users}
    item_brand = {iid: brand for iid, brand in items}
    
    # seller_id -> set of distinct item_ids sold (non-favorite brand)
    from collections import defaultdict
    seller_nonfav_items = defaultdict(set)
    
    for seller_id, item_id in orders:
        if item_id not in item_brand or seller_id not in seller_fav:
            continue  # skip invalid ids
        brand = item_brand[item_id]
        fav = seller_fav[seller_id]
        if brand != fav:
            seller_nonfav_items[seller_id].add(item_id)
    
    if not seller_nonfav_items:
        return []
    
    # get each seller and their count
    result = []
    max_count = 0
    for seller, items_set in seller_nonfav_items.items():
        count = len(items_set)
        max_count = max(max_count, count)
        result.append( (seller, count) )
    
    # filter only those with max count
    return [ [seller, count] for seller, count in result if count == max_count ]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(u + i + o), where u = num of users, i = num of items, o = num of orders. Each list is traversed once or used for lookup in a hash table.
- **Space Complexity:** O(u + i + o), for mapping sellers to favorites, items to brands, and the sets per seller holding unique non-favorite-brand item_ids.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to handle large datasets if all data cannot fit in memory?  
  *Hint: Use streaming or chunked processing, or leverage a database for joins.*

- What if we care about the top-k sellers, not just those with the highest count?  
  *Hint: Sort all counts and select top k sellers, taking care to handle ties.*

- What if, instead of favorite brand, we exclude a dynamic set of brands per seller?  
  *Hint: Adjust your mapping and lookup logic to use a set of excluded brands for each seller.*

### Summary
This problem uses the **hash map / grouping** pattern and set tracking, common for "per-user statistics" with exclusions.  
The approach generalizes to data analysis problems where per-entity aggregations need to exclude or filter certain categories before tallying results.  
SQL solutions use GROUP BY and filtering, while coding interviews expect neat dictionary/set logic with maximal efficiency.