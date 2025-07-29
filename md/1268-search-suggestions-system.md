### Leetcode 1268 (Medium): Search Suggestions System [Practice](https://leetcode.com/problems/search-suggestions-system)

### Description  
Suppose you're building an autocomplete feature for a shopping site. You have a list of product names (**products**), and as a user types each character of a **searchWord**, you want to show up to 3 product suggestions that start with the typed prefix. These suggestions must be in lexicographical (dictionary) order. For each character typed, return the top three matching products (or fewer if less are available), or an empty list if no products match that prefix.

### Examples  

**Example 1:**  
Input: `products = ["mobile","mouse","moneypot","monitor","mousepad"]`, `searchWord = "mouse"`  
Output: `[["mobile","moneypot","monitor"], ["mobile","moneypot","monitor"], ["mouse","mousepad"], ["mouse","mousepad"], ["mouse","mousepad"]]`  
*Explanation:*
- After typing 'm' and 'mo', all products match, so the top three are `["mobile","moneypot","monitor"]`.
- After 'mou', only products starting with 'mou' match, so top three are `["mouse","mousepad"]` (less than three available).
- This result repeats for 'mous' and 'mouse' prefixes.

**Example 2:**  
Input: `products = ["bags","baggage","banner","box","cloths"]`, `searchWord = "bags"`  
Output: `[["baggage","bags","banner"], ["baggage","bags","banner"], ["baggage","bags"], ["bags"]]`  
*Explanation:*  
- Sorted: ["baggage","bags","banner","box","cloths"]
- After 'b' or 'ba', first three lexicographically are `["baggage","bags","banner"]`.
- After 'bag', two match: `["baggage","bags"]`.
- After 'bags', only `["bags"]` matches.

**Example 3:**  
Input: `products = ["havana"], searchWord = "havana"`  
Output: `[["havana"], ["havana"], ["havana"], ["havana"], ["havana"], ["havana"]]`  
*Explanation:*  
- The only product matches every prefix.

### Thought Process (as if you’re the interviewee)  
- **Brute Force:** For each prefix of `searchWord`, scan every product and collect matches, sort them, and take up to 3. This is inefficient for large input sizes: for each character+product, you do a scan and sort.
- **Optimization 1:**  
  - **Sort products lexicographically** at the start.
  - For each prefix, instead of scanning all, filter only products starting with the current prefix.
  - Use **binary search** to find the first product in sorted order that matches each prefix, then check the next 3 for matches (since after sorting, matching products are contiguous)[3].
- **Optimization 2:**  
  - Use a **Trie (prefix tree)**. Each node holds up to 3 lexicographically smallest products for its prefix, so you can efficiently traverse as the user types, and quickly retrieve or update suggestions[1][4].
- **Trade-off:**
  - **Sorting + binary search** is simple to code, low overhead, and very efficient for moderate list sizes[2][3].
  - **Trie** is efficient for many search queries or if you want to support fast prefix queries repeatedly[4].  
  - For a single query (as in this question) and small/moderate n, sort + binary search is most practical.

### Corner cases to consider  
- Empty `products` or `searchWord`.
- No products matching the prefix at some point.
- All products shorter than prefix.
- Repeated product names.
- Products with varying cases (assuming case sensitivity, as per LeetCode default).
- Products with common prefixes but only one or two matching.
- Very long `searchWord` or product names.

### Solution

```python
def suggestedProducts(products, searchWord):
    # Step 1: Sort products lexicographically
    products.sort()
    result = []
    prefix = ''
    for char in searchWord:
        prefix += char
        # Binary search for the first suitable product
        left, right = 0, len(products)
        while left < right:
            mid = (left + right) // 2
            if products[mid] < prefix:
                left = mid + 1
            else:
                right = mid
        # At this point, left is the first product >= prefix
        suggestions = []
        i = left
        # Collect up to 3 matching products
        while i < len(products) and len(suggestions) < 3 and products[i].startswith(prefix):
            suggestions.append(products[i])
            i += 1
        result.append(suggestions)
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `O(N \cdot log N + M \cdot log N + 3M)`, where \(N\) = number of products, \(M\) = length of `searchWord`.
    - Sorting: \(O(N \cdot log N)\).
    - For each prefix (max `M`), binary search: \(O(logN)\), and linearly check next 3 products: \(O(3M)\).
- **Space Complexity:**  
  - \(O(N)\) for storing and sorting input.  
  - Output storage is \(O(M)\), since for each prefix, we store up to 3 suggestions.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you want to update products dynamically (insert/remove)?
  *Hint: Consider Trie with update capability.*

- How would you handle case-insensitive queries?
  *Hint: Normalize input and searchWord before processing.*

- Can you extend this to suggest more than 3 products or apply other ranking (e.g., popularity)?
  *Hint: Store full or ranked lists per prefix/trie node.*

### Summary
The problem is primarily a **prefix search** problem. The most interview-friendly and efficient solution is: **Sort the product list** and, for each prefix, use **binary search** to find the first candidate, then add up to 3 lexically smallest matches. The approach is efficient, simple, and leverages classic search patterns. This same pattern is applicable to auto-complete widgets, command suggestion tools, or anywhere prefix lookups are required.  
The **Trie** method generalizes better for frequent dynamic operations or bulk prefix searches.