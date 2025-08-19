### Leetcode 3334 (Medium): Find the Maximum Factor Score of Array [Practice](https://leetcode.com/problems/find-the-maximum-factor-score-of-array)

### Description  
Given an integer array **nums**, the **factor score** of an array is defined as the product of the LCM (least common multiple) and GCD (greatest common divisor) of all elements.  
You may remove at most one element from **nums**. Return the **maximum factor score** of any possible array after removing at most one element (including not removing any).  
- The LCM and GCD of a single number is the number itself.
- The factor score of an empty array is 0.

### Examples  

**Example 1:**  
Input: `nums = [2,4,8,16]`  
Output: `64`  
*Explanation: Removing 2 yields [4,8,16] → GCD = 4, LCM = 16.  
Factor score: 4 × 16 = 64.*

**Example 2:**  
Input: `nums = [1,2,3,4,5]`  
Output: `60`  
*Explanation: Removing nothing. GCD = 1, LCM = 60.  
Factor score = 1 × 60 = 60 (removing any element doesn't give a higher score).*

**Example 3:**  
Input: `nums = [3]`  
Output: `9`  
*Explanation: Only one element. GCD = LCM = 3, so factor score = 3 × 3 = 9.*

### Thought Process (as if you’re the interviewee)  
The brute-force approach would be to try removing every element (including the case of removing none), then calculate the GCD and LCM for each resulting array, and take the maximum product. For each removal, the new GCD and LCM can be recalculated by iterating through all the remaining elements. This would be O(n²) because for each index, we do O(n) GCD/LCM computations.

To optimize, notice that since both GCD and LCM are associative, we can precompute prefix and suffix arrays of GCD and LCM. With these, for any index i, the GCD and LCM after removing nums[i] can be obtained by combining prefix up to i-1 and suffix from i+1 onward.  
So, we:
- Precompute prefix and suffix arrays for both GCD and LCM.
- For each index, compute GCD and LCM after removing it in O(1) using the prefix and suffix values.
- Include the case where we remove nothing.
This reduces the time to O(n).

### Corner cases to consider  
- **Empty array:** Not possible as per constraints.
- **Array with one element:** Only the original array is valid.  
- **All elements the same:** GCD and LCM equal, score is that element squared.  
- **Array where removing any element decreases score:** Must include "remove no element" case.
- **Element is 1:** Removing 1 may increase GCD but decrease LCM.

### Solution

```python
def maxFactorScore(nums):
    from math import gcd
    from functools import reduce

    n = len(nums)

    # Helper for LCM
    def lcm(a, b):
        return a * b // gcd(a, b)

    # Cache prefix and suffix GCD & LCM
    prefix_gcd = [0] * n
    prefix_lcm = [0] * n
    suffix_gcd = [0] * n
    suffix_lcm = [0] * n

    prefix_gcd[0] = nums[0]
    prefix_lcm[0] = nums[0]
    for i in range(1, n):
        prefix_gcd[i] = gcd(prefix_gcd[i-1], nums[i])
        prefix_lcm[i] = lcm(prefix_lcm[i-1], nums[i])

    suffix_gcd[-1] = nums[-1]
    suffix_lcm[-1] = nums[-1]
    for i in range(n-2, -1, -1):
        suffix_gcd[i] = gcd(suffix_gcd[i+1], nums[i])
        suffix_lcm[i] = lcm(suffix_lcm[i+1], nums[i])

    # Case: Do not remove any element
    max_score = prefix_gcd[-1] * prefix_lcm[-1]

    # Try removing each element
    for i in range(n):
        if i == 0:
            curr_gcd = suffix_gcd[1] if n > 1 else 0
            curr_lcm = suffix_lcm[1] if n > 1 else 0
        elif i == n-1:
            curr_gcd = prefix_gcd[n-2]
            curr_lcm = prefix_lcm[n-2]
        else:
            curr_gcd = gcd(prefix_gcd[i-1], suffix_gcd[i+1])
            curr_lcm = lcm(prefix_lcm[i-1], suffix_lcm[i+1])
        factor_score = curr_gcd * curr_lcm if curr_gcd != 0 else 0
        max_score = max(max_score, factor_score)
    return max_score
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One forward and one backward traversal for both GCD and LCM prefix/suffix arrays, and a final O(n) loop to compute possible removal results.
- **Space Complexity:** O(n) for prefix and suffix arrays (GCD/LCM), plus O(1) extra.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you could remove *up to* k elements?
  *Hint: How can you efficiently update GCD and LCM ranges with more removals? Think DP/bitmasking.*

- How would you handle very large arrays where calculating LCM might overflow?
  *Hint: Can you use logarithms or modular arithmetic for large numbers?*

- What if the array is streaming and you want to answer removal queries online?
  *Hint: What data structures help with efficient range GCD/LCM updates? Segment trees?*

### Summary
We leveraged prefix and suffix arrays for efficient range GCD/LCM computation to make removal queries O(1) each, reducing brute-force O(n²) to O(n). This is a classic prefix/suffix decomposition (sometimes called “static range query without update”)—applicable to problems where an associative operation is needed on “all except one” or in “all except a specific subsegment” scenarios.

### Tags
Array(#array), Math(#math), Number Theory(#number-theory)

### Similar Problems
- Greatest Common Divisor of Strings(greatest-common-divisor-of-strings) (Easy)
- Remove One Element to Make the Array Strictly Increasing(remove-one-element-to-make-the-array-strictly-increasing) (Easy)