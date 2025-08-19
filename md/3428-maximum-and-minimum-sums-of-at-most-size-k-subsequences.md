### Leetcode 3428 (Medium): Maximum and Minimum Sums of at Most Size K Subsequences [Practice](https://leetcode.com/problems/maximum-and-minimum-sums-of-at-most-size-k-subsequences)

### Description  
Given an array of integers `nums` and an integer `k`, for every possible subsequence of length **1** up to **k** (inclusive), compute the maximum and minimum sums that can be obtained by such subsequences. Return the **difference** between the sum of all maximum values and the sum of all minimum values from these subsequences.

Put simply:  
- For every subsequence length l where 1 ≤ l ≤ k, find all possible subsequences of size l.
- For each subsequence, compute its **maximum** element and **minimum** element.  
- For all such subsequences, compute Σ(maximums) and Σ(minimums) and return the difference:  
  **ans = (Sum over all max in all ≤k-length subsequences) - (Sum over all min in all ≤k-length subsequences)**

### Examples  

**Example 1:**  
Input: `nums = [1, 2], k = 2`  
Output: `1`  
*Explanation:  
For subsequences of size 1:  
  - max: [1]:1, [2]:2 ⟶ sum: 1+2=3  
  - min: [1]:1, [2]:2 ⟶ sum: 1+2=3  
For subsequences of size 2:  
  - only one: [1,2], max=2, min=1  
  - sum for max: 2, sum for min: 1  
Total max: 3+2=5  
Total min: 3+1=4  
Answer: 5-4=1*

**Example 2:**  
Input: `nums = [3,2,1], k = 2`  
Output: `5`  
*Explanation:  
Subsequences size 1: [3], [2], [1]  
- max sum: 3+2+1=6  
- min sum: 3+2+1=6  
Subsequences size 2: [3,2]: max=3,min=2; [3,1]:3,1; [2,1]:2,1  
- sum max: 3+3+2=8  
- sum min: 2+1+1=4  
Total max: 6+8=14  
Total min: 6+4=10  
Answer: 14-10=4*

**Example 3:**  
Input: `nums = [5, 7, 6], k = 3`  
Output: `15`  
*Explanation:  
All subsequences of size 1,2,3:  
For size 1: max=sum=5+6+7=18, min=18.  
For size 2:  
  - [5,6] max=6,min=5  
  - [5,7] max=7,min=5  
  - [6,7] max=7,min=6  
  sum max: 6+7+7=20  
  sum min: 5+5+6=16  
For size 3: [5,6,7] max=7,min=5  
sum max: 7  
sum min: 5  
Total max: 18+20+7=45  
Total min: 18+16+5=39  
Answer: 45-39=6*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach**:  
  - Generate all possible subsequences of size ≤ k.
  - For each, calculate maximum and minimum, sum those.
  - Too slow: generating all subsequences (2ⁿ possibilities), not feasible for large n.
- **Optimization thoughts**:
  - For each position, **count how many subsequences of size l** this number would be the maximum (or minimum).
  - **Observation**: By sorting the array, we can fix positions. For subsequences of length l, for each index, count subsequences where nums[i] is max/min.
  - Use combinatorics: Fix the element at index i as max (or min), then pick l-1 from the rest (left for min, right for max).
- **Final approach**:
  - Sort nums.
  - For each position i, and each subsequence length l = 1..k:
    - For min sum: nums[i] is min in all l-length subsequences that include nums[i] and l-1 elements right of it. Count: C(n-i-1, l-1) for each l.
    - For max sum: nums[i] is max for l-length subsequences where nums[i] and l-1 elements left of it are picked. Count: C(i, l-1)
  - Precompute combinations efficiently (nCr with mod).

### Corner cases to consider  
- Empty `nums` array.
- `k > len(nums)`
- All elements equal.
- Single element case (`n = 1`).
- Large `n` or `k` (for performance).
- Negative or zero values.

### Solution

```python
def maxMinSums(nums, k):
    MOD = 10**9+7
    n = len(nums)
    
    # Precompute factorial and inverse factorial for nCr calculation
    fact = [1] * (n+1)
    inv = [1] * (n+1)
    for i in range(1, n+1):
        fact[i] = fact[i-1] * i % MOD
    inv[n] = pow(fact[n], MOD-2, MOD)
    for i in range(n-1, -1, -1):
        inv[i] = inv[i+1] * (i+1) % MOD

    def nCr(a, b):
        if b > a or b < 0:
            return 0
        return fact[a] * inv[b] % MOD * inv[a-b] % MOD

    nums.sort()
    min_sum = 0
    max_sum = 0

    for i in range(n):
        # Go through all sizes l = 1..k
        for l in range(1, k+1):
            # As minimum: must pick current i, choose l-1 elements right of i
            count_min = nCr(n-i-1, l-1)
            min_sum = (min_sum + nums[i] * count_min) % MOD

            # As maximum: must pick current i, choose l-1 elements left of i
            count_max = nCr(i, l-1)
            max_sum = (max_sum + nums[i] * count_max) % MOD

    return (max_sum - min_sum) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Sorting: O(n log n).
  - Precomputing factorials: O(n).
  - Main double loop: O(n × k), since for each i we try each l up to k.
  - nCr computation is O(1) after precompute.
  - **Overall:** O(n × k + n log n)
  
- **Space Complexity:**  
  - O(n) for factorials and inverses.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle very large n and k (e.g. n, k ~10⁵)?
  *Hint: Is it possible to compute only for the largest/smallest l?*

- Can you extend this solution for other operations instead of min/max (like sum, product)?
  *Hint: Consider the combinatorics for those operations.*

- What if you want to print all actual subsequences, not only the sum?  
  *Hint: Brute force is unavoidable for large n; discuss why the sum approach scales.*

### Summary
This problem exemplifies the **combinatorics + counting contribution pattern**: for each element, count how many subsequences of size l for which it is the min or max, using nCr. This pattern is common in problems where brute force is impossible due to combinatorial explosion, but outcome can be counted by *contribution* (not explicit listing). It’s frequently seen in prefix/suffix, min/max, or sum contribution problems in combinatorics, arrays, or DP settings.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Sorting(#sorting), Combinatorics(#combinatorics)

### Similar Problems
