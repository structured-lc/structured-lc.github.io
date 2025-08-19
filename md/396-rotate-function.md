### Leetcode 396 (Medium): Rotate Function [Practice](https://leetcode.com/problems/rotate-function)

### Description  
Given an integer array `nums` of length *n*, we define a "rotation function" F such that for each rotation k (from 0 up to n‒1), rotate `nums` right by k positions, then calculate:  
F(k) = 0×nums_k + 1×nums_k[1] + … + (n–1)×nums_k[n–1],  
where nums_k is the array rotated k times.  
Your task: find the maximum value F(k) across all k (0 to n–1).  
Typical brute-force is too slow for large n; you are expected to optimize.

### Examples  

**Example 1:**  
Input: `nums = [4, 3, 2, 6]`  
Output: `26`  
*Explanation:*
- F(0) = 0×4 + 1×3 + 2×2 + 3×6 = 0 + 3 + 4 + 18 = 25
- F(1) = 0×6 + 1×4 + 2×3 + 3×2 = 0 + 4 + 6 + 6 = 16
- F(2) = 0×2 + 1×6 + 2×4 + 3×3 = 0 + 6 + 8 + 9 = 23
- F(3) = 0×3 + 1×2 + 2×6 + 3×4 = 0 + 2 + 12 + 12 = 26  
Maximum is 26.

**Example 2:**  
Input: `nums = `  
Output: `0`  
*Explanation:*
- F(0) = 0×100 = 0  
No rotation changes a single-element array. Maximum is 0.

**Example 3:**  
Input: `nums = [1, 2, 3, 4, 5, 6]`  
Output: `85`  
*Explanation:*
Compute F(0)…F(5); the maximal sum is 85.

### Thought Process (as if you’re the interviewee)  
At first glance, I would consider simulating every rotation and recalculating F(k) for each—brute-force, which takes O(n²) time. Since n may reach 100,000, this will time out.

To optimize, notice a relationship between F(k) and F(k+1).  
If I write out F(0), F(1), and so on, a pattern emerges:
- F(0) = 0×A₀ + 1×A₁ + … + (n–1)×Aₙ₋₁
- F(1): All elements move right, last element moves to front, so  
  F(1) = F(0) + total_sum - n×Aₙ₋₁  
Each subsequent F(k+1) = F(k) + total_sum - n×Aₙ₋ₖ₋₁

Thus, we can:
- Precompute total_sum (sum of all elements)
- Calculate F(0)
- Slide through k = 1 to n-1, updating the value with the above formula and track maximum.

Time: O(n); Space: O(1) extra.

### Corner cases to consider  
- Array has only one element (always 0).
- All elements equal (function doesn't change).
- Empty array (though per problem, n ≥ 1).
- Very large negative or positive numbers (overflow in other languages, but Python is safe).
- Some negative numbers mixed with positives.

### Solution

```python
def maxRotateFunction(nums):
    n = len(nums)
    total_sum = sum(nums)
    # Compute initial F(0)
    f = sum(i * num for i, num in enumerate(nums))
    max_f = f

    # For each further rotation, update using math relation:
    # F(k+1) = F(k) + total_sum - n * nums[n - k - 1]
    for i in range(n - 1, 0, -1):
        f += total_sum - n * nums[i]
        if f > max_f:
            max_f = f
    return max_f
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  We calculate initial F(0) and then update F(k) for each remaining k—a total of n passes.
- **Space Complexity:** O(1)  
  Only a few integer variables; no extra arrays created.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you had to also return the value of k (rotation count) giving the maximum?
  *Hint: Track the index as you compute max.*
- What if the array was immutable and queries for various subarrays’ rotate functions needed to be answered repeatedly?
  *Hint: Preprocessing, prefix sums, segment trees, or other advanced structures could help.*
- How do negative numbers or zeros affect your solution's correctness?
  *Hint: Think about impact on running sums and multiplicative steps.*

### Summary
This problem is a classic example where a **mathematical recurrence relation** drastically improves efficiency from brute-force O(n²) to an O(n) **sliding sum** approach. This “mathematical transformation” trick is common in many array problems involving rotation, prefix or suffix updates, and offers a powerful way to optimize problems on cyclic or circular arrays.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
