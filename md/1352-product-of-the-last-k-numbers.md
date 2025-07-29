### Leetcode 1352 (Medium): Product of the Last K Numbers [Practice](https://leetcode.com/problems/product-of-the-last-k-numbers)

### Description  
Design a data structure that receives a stream of numbers. Implement two operations:
- `add(num)`: Add `num` to the data structure.
- `getProduct(k)`: Return the product of the last k numbers added (in order).

Values can be zero, and if any number in the last k numbers is zero, the product should be zero. All operations should be efficient.

### Examples  

**Example 1:**  
Input: `add(3), add(0), add(2), add(5), add(4), getProduct(2)`  
Output: `20`  
*Explanation: Last 2 numbers are 5 and 4, so 5 × 4 = 20.*

**Example 2:**  
Input: `getProduct(3)`  
Output: `40`  
*Explanation: Last 3 numbers are 2,5,4 → 2 × 5 × 4 = 40.*

**Example 3:**  
Input: `add(8), getProduct(2)`  
Output: `32`  
*Explanation: Last two numbers are 4 and 8: 4 × 8 = 32.*

**Example 4:**  
Input: `add(0), getProduct(2)`  
Output: `0`  
*Explanation: Last two numbers are 8,0. Product is 0.*


### Thought Process (as if you’re the interviewee)  
Brute-force: For each getProduct(k), traverse the list to multiply the last k numbers ➔ O(k) per query. Inefficient for large k or frequent queries.

Optimized: Use prefix products. Maintain a list of prefix products: each entry is the product of all numbers from the start up to that point.
- For each add(num):
    - If num == 0, reset prefix list (since multiplication resets).
    - Else, append current product × num.
- For getProduct(k):
    - If k exceeds length since last zero, product is zero.
    - Else, prefix_products[-1] // prefix_products[-k-1]

### Corner cases to consider  
- Adding a zero (resets product chain)
- Multiple zeros
- getProduct(k) where k > count since last zero → product is 0
- Initial empty list
- Single value

### Solution

```python
class ProductOfNumbers:
    def __init__(self):
        self.prefix_products = [1] # to handle getProduct(1) at start

    def add(self, num):
        if num == 0:
            self.prefix_products = [1] # reset on zero
        else:
            self.prefix_products.append(self.prefix_products[-1] * num)

    def getProduct(self, k):
        if k >= len(self.prefix_products):
            return 0
        return self.prefix_products[-1] // self.prefix_products[-k-1]
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(1) for both add and getProduct. All operations are constant time.
- **Space Complexity:** O(n) for n `add` operations (stores prefix_product list).

### Potential follow-up questions (as if you’re the interviewer)  
- How does the approach change if negative numbers are involved?
  *Hint: Absolute value unchanged, but products/multiplication rules hold.*

- Can this be done with less space?
  *Hint: Only O(n) needed, but cannot be O(1) due to need for prefix lookup.*

- What if you were asked for sum instead of product? Does the prefix approach still apply?
  *Hint: Yes, cumulative sum works, and easier to handle zeros.*

### Summary
Prefix products are a common pattern in stream and windowed-product queries. The reset-on-zero trick is key, similar to many subarray product/sum problems. This pattern applies to range product/sum queries, subarray product constraints, and similar scenarios in array handling.
