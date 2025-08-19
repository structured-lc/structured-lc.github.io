### Leetcode 1726 (Medium): Tuple with Same Product [Practice](https://leetcode.com/problems/tuple-with-same-product)

### Description  
Given an array `nums` of **distinct positive integers**, count the number of quadruples (a, b, c, d) such that all four numbers are from the array, all are different, and a × b = c × d.  

The order matters for each tuple, so (a, b, c, d) and (c, d, a, b) are considered different if the elements are in a different order.

### Examples  

**Example 1:**  
Input: `nums = [2,3,4,6]`  
Output: `8`  
*Explanation: The products 2×6 and 3×4 both equal 12.  
The valid tuples are:  
(2,6,3,4), (2,6,4,3), (6,2,3,4), (6,2,4,3),  
(3,4,2,6), (3,4,6,2), (4,3,2,6), (4,3,6,2).*

**Example 2:**  
Input: `nums = [1,2,4,5,10]`  
Output: `16`  
*Explanation: Product 2×10 and 4×5 are both 20.  
All permutations of (2,10,4,5) and (4,5,2,10) count:  
(2,10,4,5), (2,10,5,4), (10,2,4,5), (10,2,5,4),  
(4,5,2,10), (4,5,10,2), (5,4,2,10), (5,4,10,2)  
→ 8 per matching pair, so 16 total.*

**Example 3:**  
Input: `nums = [1,2,3,6]`  
Output: `8`  
*Explanation: Product 2×3 and 1×6 both equal 6.  
All permutations of (2,3,1,6) and (1,6,2,3) count:  
(2,3,1,6), (2,3,6,1), (3,2,1,6), (3,2,6,1),  
(1,6,2,3), (1,6,3,2), (6,1,2,3), (6,1,3,2).*

### Thought Process (as if you’re the interviewee)  
- **Naive/Brute-force:**  
  Try all quadruples (a, b, c, d) where all 4 numbers are unique (`O(n⁴)`). For each, check if a × b == c × d.  
  But this is far too slow even for n=1000.

- **Optimization Idea:**  
  The key is that for each product p, we want to know how many unique pairs make up p.  
  For all pairs (i, j), compute nums[i] × nums[j] and use a hash map to count how many times each product occurs.

- For each product with count ≥ 2, the number of ways to pick two distinct pairs to form (a, b, c, d) is C(count, 2).

- **Tuples, not combinations:**  
  For each choice of 2 pairs, there are 8 possible orderings for (a, b, c, d) (because each pair (a, b) and (c, d) are ordered, and (a, b) ≠ (c, d)). So for each product with count = v, total = C(v, 2) × 8.

- **Implementation:**  
  For every pair i < j, update `product_count[nums[i] × nums[j]] += 1`.  
  Then for each product with count ≥ 2, add (count × (count - 1) // 2) × 8 to the answer.

- **Why this is optimal:**  
  Pair generation is O(n²), and all map operations are O(1) per operation for reasonable n.  
  This approach leverages hashing + combinatorial counting to avoid brute-force quadruple checking.

### Corner cases to consider  
- nums length < 4 → no quadruples are possible, answer should be 0
- No two pairs produce the same product → answer is 0
- Large numbers, products might be equal even with different factors (test for collision)
- All numbers are primes (no product overlap)
- Smallest values (like nums = [1,2,3,4])

### Solution

```python
def tupleSameProduct(nums):
    # Map: product → number of pairs producing this product
    product_count = {}
    n = len(nums)
    # For every unique pair, count the product
    for i in range(n):
        for j in range(i+1, n):
            prod = nums[i] * nums[j]
            if prod in product_count:
                product_count[prod] += 1
            else:
                product_count[prod] = 1

    result = 0
    # For each product with 2 or more pairs, count # ways to pick 2 pairs
    for count in product_count.values():
        if count >= 2:
            # Number of ways to pick 2 pairs: C(count, 2)
            # For each, 8 possible orderings
            result += count * (count - 1) // 2 * 8
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²)  
  - All pairs (i, j) for n elements generate n×(n-1)/2 = O(n²) products.
  - Counting map and the final loop: both O(n²) in worst case.
- **Space Complexity:** O(n²) in the worst case (if all products are unique), but typically much less.

### Potential follow-up questions (as if you’re the interviewer)  

- If the input array was not distinct (duplicates allowed), how would you handle the case?
  *Hint: Track pairs with indices to avoid overcounting, consider same elements.*

- What if you only need to output one such quadruple tuple instead of the count?
  *Hint: Store the producing pairs in a map for each product.*

- If n is very large (greater than 10⁵), can you still solve it efficiently?
  *Hint: Hashing pairs is O(n²); would you optimize further, or accept approximate solutions?*

### Summary
This problem is a classic example of using frequency maps to reduce "quadruple finding" into a pair counting and combinatorics problem, a common hashing + counting pattern.  
This technique applies elsewhere for 4-sum, pair products, and problems where you count quadruples or combinations based on some shared value (like product, sum, or XOR).

### Tags
Array(#array), Hash Table(#hash-table), Counting(#counting)

### Similar Problems
