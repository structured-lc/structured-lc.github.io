### Leetcode 3521 (Medium): Find Product Recommendation Pairs [Practice](https://leetcode.com/problems/find-product-recommendation-pairs)

### Description  
Given two tables, `ProductPurchases` (user_id, product_id, quantity) and `ProductInfo` (product_id, category, price), identify all product pairs (product1_id, product2_id) such that:
- product1_id < product2_id,
- at least **three different users** have purchased both products,
- For each pair, add their respective categories and the number of customers who bought both.
Return the result ordered by customer_count descending, then by product1_id and product2_id ascending.
Think: "For which product pairs bought together often should I recommend one when the other is bought?"


### Examples  

**Example 1:**  
Input:  
ProductPurchases =  
| user_id | product_id | quantity |  
|---------|------------|----------|  
| 1       | 101        | 1        |  
| 1       | 102        | 2        |  
| 2       | 101        | 1        |  
| 2       | 102        | 2        |  
| 3       | 101        | 1        |  
| 3       | 103        | 2        |  
| 4       | 101        | 1        |  
| 4       | 102        | 2        |  
| 4       | 103        | 1        |  
| 5       | 102        | 1        |  
| 5       | 104        | 1        |  

ProductInfo =  
| product_id | category     | price |  
|------------|-------------|-------|  
| 101        | Electronics | 10    |  
| 102        | Books       | 5     |  
| 103        | Clothing    | 7     |  
| 104        | Kitchen     | 12    |  

Output:  
| product1_id | product2_id | product1_category | product2_category | customer_count |  
|-------------|-------------|------------------|------------------|----------------|  
|    101      |    102      |  Electronics     |   Books          |     3          |  
|    101      |    103      |  Electronics     |   Clothing       |     3          |  
|    102      |    104      |  Books           |   Kitchen        |     3          |  

*Explanation: Users 1,2,4 bought both 101 & 102. Users 1,3,4 bought both 101 & 103. Users 2,4,5 bought both 102 & 104. All these have 3 customers. The table is sorted by customer_count desc, product1_id, then product2_id.*

**Example 2:**  
Input:  
ProductPurchases =  
| user_id | product_id | quantity |  
|---------|------------|----------|  
| 1       | 10         | 1        |  
| 2       | 11         | 1        |  
| 3       | 12         | 1        |  

ProductInfo =  
| product_id | category | price |  
|------------|----------|-------|  
| 10         | A        | 1     |  
| 11         | B        | 1     |  
| 12         | C        | 1     |  

Output:  
(empty table)

*Explanation: No pair has at least 3 shared users.*

**Example 3:**  
Input:  
ProductPurchases =  
| user_id | product_id | quantity |  
|---------|------------|----------|  
| 1       | 20         | 5        |  
| 2       | 20         | 3        |  
| 3       | 21         | 2        |  
| 4       | 20         | 1        |  
| 4       | 21         | 1        |  
| 2       | 21         | 1        |  
| 1       | 21         | 1        |  

ProductInfo =  
| product_id | category | price |  
|------------|----------|-------|  
| 20         | D        | 11    |  
| 21         | E        | 14    |  

Output:  
| product1_id | product2_id | product1_category | product2_category | customer_count |  
|-------------|-------------|------------------|------------------|----------------|  
|    20       |    21       |   D              |    E             |    3           |  

*Explanation: Users 1,2,4 all bought both 20 and 21.*

### Thought Process (as if you’re the interviewee)  

- **Brute-force:**  
  - For each product pair (product1_id < product2_id), count how many *distinct* users bought *both* products.
  - Join on user_id to form user-product lists, then for every possible pair, count the users.
  - But there are many combinations: this is slow for large inputs.

- **Optimized Approach:**  
  - For each user, list all products they have purchased.
  - For each user, generate all (product_i, product_j) pairs for their list where product_i < product_j.
  - Use a dictionary to count how many users have bought each pair (product_i, product_j).
  - After going through all users, output pairs with a count ≥ 3.
  - Join with ProductInfo to get categories.

- **Why this approach:**  
  - Maximizes efficiency: Only processes pairs users have bought (not all possible pairs).
  - Scalable; hashmaps/dictionaries are fast for counting.

### Corner cases to consider  
- No pairs have ≥ 3 shared users (output empty)
- Only one user (output empty)
- Some products never appear in ProductInfo (skip or handle gracefully)
- A user buys same product multiple times (count only unique product per user)
- Product list may be unsorted in ProductInfo
- Product_id can be large, but always integer

### Solution

```python
from collections import defaultdict

def findProductRecommendationPairs(product_purchases, product_info):
    # Build product to category mapping
    product_to_category = {}
    for row in product_info:
        product_id, category, _ = row
        product_to_category[product_id] = category

    # Build user to unique set of purchased products
    user_purchases = defaultdict(set)
    for user_id, product_id, _ in product_purchases:
        user_purchases[user_id].add(product_id)

    # Count product pairs across all users
    pair_count = defaultdict(int)
    for products in user_purchases.values():
        # For each user, sort their products to keep order (for product1_id < product2_id)
        prod_list = sorted(products)
        n = len(prod_list)
        for i in range(n):
            for j in range(i+1, n):
                p1, p2 = prod_list[i], prod_list[j]
                pair_count[(p1, p2)] += 1

    result = []
    for (p1, p2), count in pair_count.items():
        if count >= 3:
            cat1 = product_to_category.get(p1, '')
            cat2 = product_to_category.get(p2, '')
            result.append([p1, p2, cat1, cat2, count])

    # Sort as required: customer_count desc, product1_id asc, product2_id asc
    result.sort(key=lambda x: (-x[4], x[0], x[1]))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - O(U × k² ) where U is the number of users and k is average products per user (generate all product pairs per user).
  - Sorting and lookup are negligible in comparison, unless result is huge.
- **Space Complexity:**  
  - O(P²) for storing counts (P is total products, but only pairs that occur at least once).
  - O(U × k) for user to products mapping.
  - Extra for product_info mapping.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to scale for very large datasets, where product pairs exceed memory size?  
  *Hint: Can you use distributed counting? Consider map-reduce or external storage.*

- How would you modify this to recommend *category pairs* instead of product pairs?  
  *Hint: Track (category1, category2) for each customer's pairs.*

- How would you support dynamic updates (new purchases coming in live)?  
  *Hint: Think of maintaining streaming counts, or incrementally updating pair counters.*

### Summary
This problem uses the "hashmap counting + pair generation" pattern: for every entity (user), generate relevant pairs and count them with a dictionary for efficient grouping. This is a common technique for problems involving shared associations, co-purchases, or co-occurrences (like Netflix recommendations, market basket analysis). Patterns here are applicable in product association rules, recommendations, and network clustering.


### Flashcard
For each user, generate all product pairs they bought; use a hash map to count distinct users per pair, then filter by threshold.

### Tags
Database(#database)

### Similar Problems
