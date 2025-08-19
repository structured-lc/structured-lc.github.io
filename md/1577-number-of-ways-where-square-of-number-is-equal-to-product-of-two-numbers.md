### Leetcode 1577 (Medium): Number of Ways Where Square of Number Is Equal to Product of Two Numbers [Practice](https://leetcode.com/problems/number-of-ways-where-square-of-number-is-equal-to-product-of-two-numbers)

### Description  
Given two arrays of positive integers, nums1 and nums2, count the number of tuples (i, j, k, l) such that:
- For some element from one array (nums1[i]), its square equals the product of two elements from the other array (nums2[j] × nums2[k]), where j < k (order does not matter).
- Or vice versa: nums2[i]² equals nums1[j] × nums1[k], with j < k.
Return the total number of such tuples.

### Examples  

**Example 1:**  
Input: `nums1 = [7,4]`, `nums2 = [5,2,8,9]`  
Output: `1`  
*Explanation: 4² = 16, and 2 × 8 = 16.*

**Example 2:**  
Input: `nums1 = [1,1]`, `nums2 = [1,1,1]`  
Output: `9`  
*Explanation: There are 2×2=4 ways to choose (i,j) from nums1 and 3×2/2=3 ways to pick a pair from nums2: 4×3=12. But since all elements are 1, there are 9 valid tuples (see how to avoid overcounting pairs when indices overlap).*  

**Example 3:**  
Input: `nums1 = [2,3,4,6]`, `nums2 = [1,2,3,4]`  
Output: `2`  
*Explanation: 2² = 4, and (2,2) from nums2, and 4² = 16, (4,4) and no valid pair as only one 4 in nums2.*  

### Thought Process (as if you’re the interviewee)  
First, note we need to count all index quadruples (i, j, k, l) such that a square from one array equals the product of a distinct pair from the other. Since the indices are not necessarily unique, but order among the pair doesn't matter, we care about unordered pairs in the second array.

A brute-force solution would try all squares from the first array and all pairs in the second — O(n³) — which is too slow.
Better:
- For each array, count all possible products of all unordered pairs (use dictionary to store count of each product).
- For each number y in nums1, see if y² appears as a product in nums2's dictionary, and sum the occurrences.
- Do the same swapping roles of nums1 and nums2.


### Corner cases to consider  
- All elements are 1 (potential for large counts).
- Arrays with duplicate numbers.
- Arrays of length 1 (should output 0, as need two for a pair).
- No matching pairs at all.

### Solution

```python
def numTriplets(nums1, nums2):
    from collections import Counter

    def get_prod_counts(arr):
        counts = Counter()
        n = len(arr)
        for i in range(n):
            for j in range(i+1, n):
                counts[arr[i] * arr[j]] += 1
        return counts

    nums1_prod = get_prod_counts(nums1)
    nums2_prod = get_prod_counts(nums2)

    total = 0
    # nums1[i]^2 from nums1 matches product in nums2
    for x in nums1:
        total += nums2_prod.get(x * x, 0)
    # nums2[i]^2 from nums2 matches product in nums1
    for y in nums2:
        total += nums1_prod.get(y * y, 0)
    return total
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(n² + m²), where n = len(nums1), m = len(nums2). For each list, we compute all unordered pairs.
- **Space Complexity:** O(K), where K is the number of unique products (could be up to O(n²) in the worst case).


### Potential follow-up questions (as if you’re the interviewer)  
- How would you avoid over-counting if numbers are repeated several times in the array?
  *Hint: Use combinations and account for frequencies properly.*
- How do you optimize further if n and m are both large (>10⁴)?
  *Hint: Is there a way to avoid generating ALL pairs?*
- What if we also want to return the actual tuples, not just the count?
  *Hint: Store indices or enumerate possible combinations.*

### Summary
This is a classic hash table counting pattern—use dictionaries to precompute counts of all pair products, then check for each value's square in the other. It's a two-array two-pass hash map problem commonly seen in counting tuple/pair sum (or product) questions.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Two Pointers(#two-pointers)

### Similar Problems
