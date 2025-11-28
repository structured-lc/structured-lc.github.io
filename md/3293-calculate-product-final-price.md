### Leetcode 3293 (Medium): Calculate Product Final Price [Practice](https://leetcode.com/problems/calculate-product-final-price/)

### Description  
You are given a list of products, each with a `product_id`, `price`, and `category`. You are also given a list of `discounts` for certain categories. Each discount is represented as a percentage. Your task is to compute the **final price for each product** after applying the discount associated with its category (if available). If the category has no discount, the price remains unchanged. Output the result as a list of objects/Dicts, each with the product ID, the final price, and the category.

### Examples  

**Example 1:**  
Input:  
products = `[{"product_id":1, "price":100, "category":"A"}, {"product_id":2, "price":200, "category":"B"}]`  
discounts = `[{"category":"A", "discount":10}]`  
Output:  
`[{"product_id":1, "final_price":90.0, "category":"A"}, {"product_id":2, "final_price":200.0, "category":"B"}]`  
*Explanation: Product 1 has category A, which gets a 10% discount ⇒ 100 × (1 - 0.10) = 90. Product 2 has no discount, so price remains 200.*

**Example 2:**  
Input:  
products = `[{"product_id":5, "price":40, "category":"Gadgets"}]`  
discounts = `[{"category":"Gadgets", "discount":20}]`  
Output:  
`[{"product_id":5, "final_price":32.0, "category":"Gadgets"}]`  
*Explanation: 40 × (1 - 0.20) = 32.0.*

**Example 3:**  
Input:  
products = `[{"product_id":11, "price":33, "category":"Home"}, {"product_id":12, "price":44, "category":"Electronics"}]`  
discounts = `[]`  
Output:  
`[{"product_id":11, "final_price":33.0, "category":"Home"}, {"product_id":12, "final_price":44.0, "category":"Electronics"}]`  
*Explanation: No discounts apply, so prices remain unchanged.*

### Thought Process (as if you’re the interviewee)  
First, I’d consider a brute-force approach: for each product, loop through the discounts array to find if its category matches any discount, then apply it. This would be O(n × m) where n is number of products and m is number of discounts—inefficient for large inputs.

To optimize:  
- Build a mapping from `category` to `discount` using a dictionary in O(m) time.  
- Then iterate through each product once, lookup the discount with O(1) time, and calculate the final price.  
- This reduces overall time to O(n + m).

This dictionary approach is efficient and simple—trade-off is one extra O(m) space for the discount mapping, but this is justified by much faster lookups.

### Corner cases to consider  
- No discounts exist (discounts list is empty).
- Some products have categories not found in `discounts` (should remain unchanged).
- More than one product in the same category.
- Discounts are 0 (no change) or 100 (final price is 0).
- Product list is empty.
- Discount percent is not an integer, e.g. 12.5%.
- Categories or product IDs are duplicated.
- Very large product or discount lists (emphasis on linear solution).

### Solution

```python
def calculate_product_final_price(products, discounts):
    # Step 1: Build category to discount percent mapping
    category_to_discount = {}
    for d in discounts:
        category_to_discount[d['category']] = d['discount']

    # Step 2: For each product, lookup discount and compute final price
    results = []
    for p in products:
        discount = category_to_discount.get(p['category'], 0)
        # Apply discount: price × (1 - discount/100)
        final = p['price'] * (1 - discount / 100.0)
        results.append({
            "product_id": p['product_id'],
            "final_price": final,
            "category": p['category']
        })
    return results
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n + m)  
  n = number of products, m = number of discounts.  
  - O(m) for building the discount map,
  - O(n) to process each product.
- **Space Complexity:** O(m + n)  
  - O(m) for the discount map, 
  - O(n) for the result list.

### Potential follow-up questions (as if you’re the interviewer)  

- What if a product's category can have more than one discount (e.g., season + clearance) — how would you combine them?  
  *Hint: Consider cumulative or maximum discounts.*

- How would your solution change if discounts can be added/removed frequently at runtime?  
  *Hint: Should lookup structure be mutable and thread-safe?*

- What if discounts vary per product, not just per category?  
  *Hint: Should mapping be on product_id or a combination of attributes?*

### Summary
This problem uses the common *hash map* (dictionary) pattern for fast lookups, which is widely applicable for any "enrich with side data" or "join-two-lists-by-key" types of problems. Similar logic often appears in database joins, as well as in joining APIs or merging datasets. The approach balances speed and space, and is easily extended to more complex join or discount scenarios.


### Flashcard
Build a dictionary mapping category to discount in O(m) time; iterate through products once, lookup discount in O(1), and calculate final price.

### Tags
Database(#database)

### Similar Problems
