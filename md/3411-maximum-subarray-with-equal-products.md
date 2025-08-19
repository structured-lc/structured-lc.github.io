### Leetcode 3411 (Easy): Maximum Subarray With Equal Products [Practice](https://leetcode.com/problems/maximum-subarray-with-equal-products)

### Description  
Given an array of positive integers, find the length of the **longest contiguous subarray** where the **product** of all elements is exactly the same as the **gcd** (greatest common divisor) of all elements multiplied by their **lcm** (least common multiple).  
Formally, for a subarray arr, it must satisfy:  
prod(arr) = gcd(arr) × lcm(arr)  
Return the length of the longest such subarray.

### Examples  

**Example 1:**  
Input: `nums = [1, 2, 1, 2, 1, 1, 1]`  
Output: `5`  
*Explanation: Subarray `[1, 2, 1, 1, 1]` has: prod=2, gcd=1, lcm=2. 2 = 2 × 1 = 2*

**Example 2:**  
Input: `nums = [2, 3, 4, 5, 6]`  
Output: `3`  
*Explanation: Subarray `[3, 4, 5]`. prod=60, gcd=1, lcm=60. 60 = 60 × 1.*

**Example 3:**  
Input: `nums = [1, 2, 3, 1, 4, 5, 1]`  
Output: `5`  
*Explanation: Subarray `[2, 3, 1, 4, 5]` has prod=120, gcd=1, lcm=120. 120 = 120 × 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force**:  
  For every possible subarray, calculate product, gcd, and lcm. Check if prod = gcd × lcm. Track the maximum length.  
  Time: O(n³) (n² subarrays; O(n) to compute values per subarray).

- **Optimization**:  
  Since n ≤ 100 and nums[i] ≤ 10, we can precompute and re-use the gcd/lcm/product progressively as we expand subarrays.
  - Use nested loops. Initialize prod, gcd, lcm at each starting index.
  - Update each with the next element on extension.
  - Early break: If prod exceeds gcd × lcm (since prod only increases), no point in going further.
- **Why this approach**:  
  It's brute force but optimized for the constraints. The numbers are small so doing math ops repeatedly is feasible.

### Corner cases to consider  
- Array of all 1’s (product/gcd/lcm = 1 for any subarray)
- Only two elements
- No valid subarray longer than 1
- Numbers like [2,2,2,2] (product/gcd/lcm same for any length)
- Array with maximum allowed size
- Edge: nums contains only 1’s and exactly one 2

### Solution

```python
def max_product_equivalent_subarray(nums):
    # Helper functions for GCD and LCM of two numbers
    def gcd(a, b):
        while b:
            a, b = b, a % b
        return a

    def lcm(a, b):
        return a * b // gcd(a, b)

    n = len(nums)
    max_len = 1  # Every subarray of at least length 1 is always valid per definition

    for i in range(n):
        cur_prod = nums[i]
        cur_gcd = nums[i]
        cur_lcm = nums[i]

        for j in range(i, n):
            if j != i:
                cur_prod *= nums[j]
                cur_gcd = gcd(cur_gcd, nums[j])
                cur_lcm = lcm(cur_lcm, nums[j])

            # Check if product equals gcd × lcm
            if cur_prod == cur_gcd * cur_lcm:
                max_len = max(max_len, j - i + 1)
            # Optional speedup: if cur_prod > cur_gcd * cur_lcm, break early
            elif cur_prod > cur_gcd * cur_lcm:
                break  # Can't get back to equality later

    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n² × logM), where n is the length of nums (≤100), M is the maximum value in nums (≤10).
    - Outer and inner loops: O(n²)
    - Each extension computes gcd/lcm/product: each gcd is O(logM); lcm is O(logM).
    - Numbers are small; practically, it runs fast.
- **Space Complexity:** O(1) extra space, aside from input. Only a few variables for calculations.

### Potential follow-up questions (as if you’re the interviewer)  

- What if nums could contain negative numbers or zero?  
  *Hint: How do prod, gcd, lcm behave then?*

- How would you extend for very large n (n > 10⁵)?  
  *Hint: Can you preprocess or use hash maps or other math properties?*

- How to return not just the length but also the indices of the subarray(s)?  
  *Hint: Track start and end whenever you find longer subarrays.*

### Summary
This problem uses a **brute-force sliding window** with math invariants, leveraging the small array and element sizes. The main pattern is sliding window + progressive aggregation (gcd/lcm/product), frequently used in range queries with associative operations. This approach applies to other array range problems, especially those involving sequence properties or windowing with math calculations.

### Tags
Array(#array), Math(#math), Sliding Window(#sliding-window), Enumeration(#enumeration), Number Theory(#number-theory)

### Similar Problems
- Find Greatest Common Divisor of Array(find-greatest-common-divisor-of-array) (Easy)