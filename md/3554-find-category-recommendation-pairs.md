### Leetcode 3554 (Hard): Find Category Recommendation Pairs [Practice](https://leetcode.com/problems/find-category-recommendation-pairs)

### Description  
Given purchase records including users and products, and product info including product categories, **find all pairs of distinct categories** (category1, category2) where category1 < category2 such that **at least 3 unique users have purchased products from both categories**. The output should list these category pairs along with the count of unique users who bought from both, sorted by descending count then category1 and category2.

In other words, for every pair of categories, count how many distinct users have bought products in both categories and report those pairs where this count is at least 3.

---

### Examples  

**Example 1:**  
Input:  
- ProductPurchases:  
  | user_id | product_id |  
  |---------|------------|  
  | 1       | 10         |  
  | 1       | 20         |  
  | 2       | 10         |  
  | 2       | 30         |  
  | 3       | 20         |  
  | 3       | 30         |  
  | 4       | 20         |  

- ProductInfo:  
  | product_id | category |  
  |------------|----------|  
  | 10         | A        |  
  | 20         | B        |  
  | 30         | C        |  

Output:  
`(A, B), 2`  
`(B, C), 2`  

*Explanation*:  
- Users 1 and 2 purchased from categories A and B => 2 unique users (less than 3, so not included if threshold is ≥3).  
- Users 2 and 3 purchased from B and C => 2 unique users.  
Since count is 2 for both pairs, no pairs meet the 3 or more threshold, so output would be empty if threshold is enforced strictly.

---

**Example 2:**  
Input: User purchases that lead to pairs with at least 3 users overlap.  
Output: Category pairs with unique user count ≥ 3.

*Explanation*: Similar logic to above, but with data where 3 or more users buy from both categories.

---

**Example 3:**  
Input where users purchase only within a single category or no overlaps.  
Output: empty list.

*Explanation:* No pairs of categories have 3 or more common users.

---

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For each pair of categories, iterate over every user and check if the user bought from both categories. But this is expensive since number of categories, users, and products can be large.

- **Optimized approach:**  
  1. Build a mapping from each user to the distinct categories they purchased.  
  2. For each user, generate all pairs of categories they bought (with category1 < category2 to avoid duplicates).  
  3. Count how many unique users contributed to each pair.  
  4. Filter pairs with count ≥ 3 and sort output.

This approach avoids cross-joining all pairs blindly and uses the user purchases to group data efficiently.

- **SQL approach:**  
  - Use a self-join on user categories to find pairs of categories for each user.  
  - Group by category pairs to count distinct users.  
  - Filter by user count ≥ 3.  
  - Order by count desc, then category names.

This can also be achieved programmatically using hash maps and sets with similar logic.

---

### Corner cases to consider  
- Users who have purchased products from only one category.  
- Categories with only one user purchasing.  
- Exactly 3 users overlapping for a category pair (boundary case).  
- No users overlap categories.  
- Categories with same names but different products.  
- Large number of users or categories (performance concerns).

---

### Solution

```python
def find_category_recommendation_pairs(purchases, product_info):
    """
    purchases: List of tuples [(user_id, product_id), ...]
    product_info: Dict mapping product_id -> category
    
    Returns: List of tuples [(category1, category2, user_count), ...]
    """
    
    # Map user to set of categories purchased
    user_categories = {}
    for user_id, product_id in purchases:
        category = product_info.get(product_id)
        if category is None:
            continue
        if user_id not in user_categories:
            user_categories[user_id] = set()
        user_categories[user_id].add(category)
    
    # Count pairs of categories per user
    pair_counts = {}
    for categories in user_categories.values():
        categories = sorted(categories)
        n = len(categories)
        # Generate all pairs category1 < category2
        for i in range(n):
            for j in range(i+1, n):
                pair = (categories[i], categories[j])
                pair_counts[pair] = pair_counts.get(pair, 0) + 1
    
    # Filter pairs with at least 3 users
    result = [(c1, c2, count) for (c1, c2), count in pair_counts.items() if count >= 3]
    # Sort by count descending, then category1, then category2
    result.sort(key=lambda x: (-x[2], x[0], x[1]))
    return result
```

---

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Building user-category map: O(P) for P purchases.  
  For each user, generating pairs: if user purchased k categories, O(k²). Sum over all users is O(U * k²) where U is users count.  
  Overall complexity depends on data distribution but generally efficient if k (categories per user) is small.

- **Space Complexity:**  
  Storing mapping user_categories: O(U*k) where k is average categories per user.  
  Storing pair_counts: depends on number of distinct category pairs, worst case O(C²) for C categories.  

---

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case if the threshold of users (≥3) changed dynamically?  
  *Hint:* Use a parameter for threshold; can adjust filter step without changing counting logic.

- What if we need to find pairs with users who purchased within a specific time range?  
  *Hint:* Pre-filter purchases by time range before processing.

- How to optimize for cases with very many categories or very large datasets?  
  *Hint:* Use distributed processing or approximate counting (e.g., hashing, sketches).

---

### Summary  
This problem uses the **pattern of combining user-based groupings to find pairs of frequent co-occurrences** (category pairs purchased by same users). It relies on generating pairs from sets per user to avoid costly cross joins over global categories. The solution pattern emphasizes transforming data to user-category mapping, pair generation per user, aggregation, and filtering.

This kind of problem and approach applies to many recommendation and co-purchasing analyses in big data and e-commerce domains.

### Tags
Database(#database)

### Similar Problems
