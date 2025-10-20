### Leetcode 2040 (Hard): Kth Smallest Product of Two Sorted Arrays [Practice](https://leetcode.com/problems/kth-smallest-product-of-two-sorted-arrays)

### Description  
Given two **sorted integer arrays** `nums1` and `nums2`, and an integer `k`, find the kᵗʰ (1-based) **smallest product** you can get by multiplying an element from `nums1` by an element from `nums2` (i.e., for all valid pairs (i, j), where `0 ≤ i < nums1.length`, `0 ≤ j < nums2.length`).  
Return the kᵗʰ smallest product among all such pairs.

### Examples  

**Example 1:**  
Input: `nums1 = [1,7]`, `nums2 = [2,3,4]`, `k = 4`  
Output:`14`  
Explanation:  
Possible products are: [1×2=2, 1×3=3, 1×4=4, 7×2=14, 7×3=21, 7×4=28].  
The 4ᵗʰ smallest is 14.

**Example 2:**  
Input: `nums1 = [-4,-2,0,3]`, `nums2 = [2,4]`, `k = 6`  
Output:`0`  
Explanation:  
Products: [-4×2=-8, -4×4=-16, -2×2=-4, -2×4=-8, 0×2=0, 0×4=0, 3×2=6, 3×4=12].  
Sorted: [-16, -8, -8, -4, 0, 0, 6, 12].  
The 6ᵗʰ smallest is 0.

**Example 3:**  
Input: `nums1 = [-6,-4,-3,0,1,3,4,7]`, `nums2 = [-5,2,3,4]`, `k = 40`  
Output:`147`  
Explanation:  
There are 8×4=32 pairs. The largest is 7×4=28, but since arrays have many negative numbers, the products can be negative, zero, or positive. Products sorted, 40ᵗʰ smallest is 147.

### Thought Process (as if you’re the interviewee)  

- Brute-force:  
  - Generate all possible products between elements of the two arrays, collect all n×m products, then sort and retrieve the kᵗʰ smallest.  
  - **Time:** O(n×m log(n×m)), which is not feasible for n, m up to 2×10⁴.
- Optimization:
  - The arrays are sorted, so we can use **binary search on the answer** (i.e., on the value of the product).
  - The core is: For any candidate product `x`, **count** how many products are ≤ x.
  - Use a **helper function** to, for a given mid value, count all pairs (i, j) so that nums1[i]×nums2[j] ≤ mid.
  - For each num in nums1, use the monotonicity of nums2 to binary search how many nums2[j] satisfy num×nums2[j] ≤ mid:
    - If num == 0: if mid ≥ 0, all pairs count; else, 0.
    - If num > 0: bisect_right(nums2, mid // num).
    - If num < 0: bisect_left(nums2, ceil(mid / num)).
  - Carefully handle 0, negative, and positive numbers to avoid sign errors.
- Use binary search for the answer in range [minP, maxP], e.g. [-1e10, 1e10].
- This reduces time complexity to O((n + m) × logM × log(maxP)), where M is input size and maxP is product range.

### Corner cases to consider  
- Arrays contain 0 → any 0×x=0, affects the result.
- All positive or all negative arrays.
- Very large positive/negative values; be wary of overflows.
- k is 1 or k = n×m.
- Duplicate values in arrays.
- Arrays of length 1 (minimum input size).
- Arrays with only zeros.

### Solution

```python
def kthSmallestProduct(nums1, nums2, k):
    # Helper: count pairs with product ≤ x
    def count_leq(x):
        count = 0
        for a in nums1:
            if a == 0:
                if x >= 0:
                    count += len(nums2)
                # else, product cannot be ≤ negative x
            elif a > 0:
                # For positive a, product increases as nums2 increases
                # Find rightmost index where a * nums2[j] ≤ x
                l, r = 0, len(nums2)
                while l < r:
                    m = (l + r) // 2
                    if a * nums2[m] <= x:
                        l = m + 1
                    else:
                        r = m
                count += l
            else:  # a < 0
                # For negative a, product decreases as nums2 increases
                l, r = 0, len(nums2)
                while l < r:
                    m = (l + r) // 2
                    if a * nums2[m] <= x:
                        r = m
                    else:
                        l = m + 1
                count += len(nums2) - l
        return count

    # Binary search on product value
    left, right = -10**10, 10**10
    ans = 0
    while left <= right:
        mid = (left + right) // 2
        cnt = count_leq(mid)
        if cnt >= k:
            ans = mid
            right = mid - 1
        else:
            left = mid + 1
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + m) × logN × log(maxProduct)), where n and m are the lengths of nums1 and nums2, maxProduct ≈ 1e10. Each binary search on candidate value does O(n log m) or O(m log n).
- **Space Complexity:** O(1) extra, since we do not use extra structures besides variables for pointers and counters.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the arrays are not sorted?
  *Hint: Sorting both arrays first, but increases prep time.*
  
- How would you extend this to find the k largest product?
  *Hint: The same binary search strategy works, but count pairs ≥ x instead of ≤ x.*

- How would the approach change for the sum instead of product?
  *Hint: The logic is similar but without negative/positive subtleties.*

### Summary
This problem uses the **"binary search on the answer"** pattern, optimized by leveraging the sorted property of input arrays and a custom count function. This is a classic advanced technique in problems where brute-force is infeasible and the problem can be phrased as "How many pairs have value ≤ X?"—resembling Kth Smallest Pair Distance, Find Kth Smallest Number, or similar problems involving sorted pairs and k-selection.


### Flashcard
Binary search the answer; for each candidate, count products ≤ x using two pointers on sorted arrays—avoid O(n×m) brute force.

### Tags
Array(#array), Binary Search(#binary-search)

### Similar Problems
- Find K Pairs with Smallest Sums(find-k-pairs-with-smallest-sums) (Medium)
- K-diff Pairs in an Array(k-diff-pairs-in-an-array) (Medium)
- Maximum Number of Robots Within Budget(maximum-number-of-robots-within-budget) (Hard)