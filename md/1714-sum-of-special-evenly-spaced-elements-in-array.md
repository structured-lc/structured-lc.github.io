### Leetcode 1714 (Hard): Sum Of Special Evenly-Spaced Elements In Array [Practice](https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array)

### Description  
You are given an array **nums** of n non-negative integers and an array of queries where each query is a pair **[xᵢ, yᵢ]**. For each query, find the sum of all nums[j] such that:
- **j ≥ xᵢ**
- **(j - xᵢ)** is divisible by **yᵢ**

Return the answer for each query modulo 10⁹ + 7.

### Examples  

**Example 1:**  
Input: `nums = [0,1,2,3,4,5,6,7]`, `queries = [[0,3],[5,1],[4,2]]`  
Output: `[9, 18, 10]`  
Explanation:  
- Query 1: j = 0,3,6 ⇒ 0+3+6 = 9  
- Query 2: j = 5,6,7 ⇒ 5+6+7 = 18  
- Query 3: j = 4,6 ⇒ 4+6 = 10

**Example 2:**  
Input: `nums = [4,5,7,8,2,11,6]`, `queries = [[1,2],[0,3]]`  
Output: `[24, 19]`  
Explanation:  
- Query 1: j = 1,3,5 ⇒ 5+8+11 = 24  
- Query 2: j = 0,3,6 ⇒ 4+8+6 = 18

**Example 3:**  
Input: `nums = [1]`, `queries = [[0,1]]`  
Output: `[1]`  
Explanation:  
- Only element at index 0, sums to 1.

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  For each query, loop from xᵢ up to the end in steps of yᵢ, summing nums[j]. This works but is too slow for large n and many queries.

- **Optimization:**  
  Notice that for each y up to ⌊√n⌋, there are many queries using the same stride. We can precompute suffix sums for each y (small y only), so we can answer each such query in O(1).  
  For large y (where y > ⌊√n⌋), strides are far apart, so each query has few elements. It is efficient enough to just sum directly.

- **Trade-off:**  
  This hybrid approach balances precomputation cost and per-query efficiency, using about O((n + q)×√n) time and O(n×√n) space.

### Corner cases to consider  
- Empty `nums` array or empty queries array  
- yᵢ = 1 (means every index after xᵢ)  
- xᵢ ≥ n (no valid j indices)  
- yᵢ > n (may select ≤1 element)  
- Duplicate queries  
- nums has zeros or all-equal elements

### Solution

```python
from math import isqrt

def sumOfSpecialEvenlySpacedElements(nums, queries):
    MOD = 10**9 + 7
    n = len(nums)
    max_stride = isqrt(n) + 1
    # Precompute dp[y][x] = sum of nums[x], nums[x+y], nums[x+2y], ...
    dp = [[0]*n for _ in range(max_stride)]
    
    for y in range(1, max_stride):
        for x in range(n-1, -1, -1):
            nxt = x + y
            dp[y][x] = nums[x]
            if nxt < n:
                dp[y][x] += dp[y][nxt]

    ans = []
    for x, y in queries:
        if y < max_stride:
            res = dp[y][x] if x < n else 0
        else:
            # For large y, sum directly (only a few elements)
            res = 0
            j = x
            while j < n:
                res += nums[j]
                j += y
        ans.append(res % MOD)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O((n + q) × ⌊√n⌋)  
  - Preprocessing: O(n × ⌊√n⌋) for all y up to ⌊√n⌋  
  - Each query: O(1) if y < ⌊√n⌋, otherwise O(n/y) ≤ O(⌊√n⌋)
- **Space Complexity:** O(n × ⌊√n⌋) for the dp table.

### Potential follow-up questions (as if you’re the interviewer)  

- What if queries can be added dynamically and we want to support online queries efficiently?  
  *Hint: Consider data structures that support interval/stride queries or segment trees with special logic.*

- Can this approach be adapted if nums can be updated?  
  *Hint: Now suffix precomputing won't work directly; need more dynamic structures.*

- What changes if we want the sum of products instead of sum for each stride?  
  *Hint: Think if precomputation can work for products as it did for sums, or if overflow becomes an issue.*

### Summary
This problem leverages the technique of hybrid precomputation (for small strides) and direct evaluation (for large strides) — a pattern seen in problems involving patterns (roots, steps, modulo) or repeated queries on arithmetic progressions. It's related to sqrt-decomposition and can be useful in range query optimization for static data.


### Flashcard
For small strides, precompute suffix sums; for large strides, sum on the fly—answer each query in optimal time based on stride size.

### Tags
Array(#array), Dynamic Programming(#dynamic-programming)

### Similar Problems
