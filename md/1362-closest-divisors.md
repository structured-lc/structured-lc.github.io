### Leetcode 1362 (Medium): Closest Divisors [Practice](https://leetcode.com/problems/closest-divisors)

### Description  
Given a positive integer num, find two integers a and b such that:
- Either a × b = num + 1 or a × b = num + 2
- The absolute difference |a - b| is minimized
Return the pair [a, b] with a ≤ b.

### Examples  

**Example 1:**  
Input: `num = 8`  
Output: `[3, 3]`  
*Explanation: 8+1=9 → 3×3=9, |3-3|=0 (minimum possible).*  

**Example 2:**  
Input: `num = 123`  
Output: `[5, 25]`  
*Explanation: 123+1=124 (no close divisors), 123+2=125 (5×25), |5-25|=20.*

**Example 3:**  
Input: `num = 999`  
Output: `[40, 25]`  
*Explanation: 999+1=1000 (closest: 25×40=1000), possible pairs: [25,40] or [40,25].*

### Thought Process (as if you’re the interviewee)  
We want to find integer pairs whose product is either num+1 or num+2, with the smallest |a-b|. To minimize |a-b|, we check divisors starting from the square root down to 1 for both num+1 and num+2. For each divisor i ≤ √target, if target mod i == 0, set a=i, b=target//i; if that's the closest so far, record it.

### Corner cases to consider  
- num is very small (1 or 2)
- num+1 and num+2 are both primes (only trivial divisors)
- num+1 or num+2 are perfect squares
- num large (ensure efficient divisor search)

### Solution
```python
import math

def closestDivisors(num):
    def get_closest(n):
        # Find divisors close to sqrt(n)
        for i in range(int(n ** 0.5), 0, -1):
            if n % i == 0:
                return [i, n // i]
        return None  # Should not happen for n >= 2
    res1 = get_closest(num + 1)
    res2 = get_closest(num + 2)
    # Choose the pair with smaller |a-b|
    if abs(res1[0] - res1[1]) <= abs(res2[0] - res2[1]):
        return res1
    else:
        return res2
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(√n), where n is max(num+1, num+2), since we iterate downward from sqrt.
- **Space Complexity:** O(1), just a few integer variables and lists.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you find the closest divisors of num itself (not num+1 or num+2)?  
  *Hint: Use the same logic for num, but skip if asked only about num+1 or num+2.*

- What if given a range [L, R], find the closest divisors in that range?  
  *Hint: Check divisors for each target in [L, R] and record the closest across all.*

- How would you adapt this for very large numbers, say, in the billions?  
  *Hint: Use integer square root functions and optimized divisor checks.*

### Summary
The approach is to check for divisors as close to the square root as possible for num+1 and num+2, minimizing the difference between factors. This minimizes |a-b|. Very efficient and commonly used for factor closest pair brute-force.

### Tags
Math(#math)

### Similar Problems
- Distinct Prime Factors of Product of Array(distinct-prime-factors-of-product-of-array) (Medium)