### Leetcode 483 (Hard): Smallest Good Base [Practice](https://leetcode.com/problems/smallest-good-base)

### Description  
Given a string representing an integer n, return the **smallest good base** of n as a string.  
A good base k (k ≥ 2) for n is one where n in base k is written as all 1's (for example: n = 13 in base 3 is 111).  
In other words, find the smallest integer k ≥ 2 where n can be represented as k⁰ + k¹ + ... + k^(m-1) = n for some integer m ≥ 2. Return k as a string.

### Examples  

**Example 1:**  
Input: `"13"`  
Output: `"3"`  
Explanation: 13 in base 3 is 1×3² + 1×3¹ + 1×3⁰ = 9 + 3 + 1 = 13, which is "111" in base 3.

**Example 2:**  
Input: `"4681"`  
Output: `"8"`  
Explanation: 4681 in base 8: 8⁴ + 8³ + 8² + 8¹ + 8⁰ = 4096 + 512 + 64 + 8 + 1 = 4681, which is "11111".

**Example 3:**  
Input: `"1000000000000000000"`  
Output: `"999999999999999999"`  
Explanation: 1000000000000000000 in base 999999999999999999:  
999999999999999999¹ + 1 = 1000000000000000000 (only two digits: "11").

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
  We could try every possible base k from 2 up to n-1 and check if n can be represented as all 1's in base k. However, this is highly inefficient for large n.
- **Pattern recognition:**  
  If n = k⁰ + k¹ + ... + k^(m-1) = (k^m - 1)/(k - 1), for some m ≥ 2 and integer k ≥ 2.  
  For each possible length m (number of 1's), solve for integer k such that the expression holds.
- **Optimizing:**  
  - For each m from the largest possible down to 2 (because more digits means smaller k), estimate a candidate k using k ≈ n^{1/(m-1)}.
  - Use binary search to efficiently test if a candidate k fits the formula (since numbers are large).
  - The maximum number of digits m is bounded by ⌊log₂(n+1)⌋.
- **Final approach:**  
  Iterate over possible m from high to low. For each m, do a binary search for candidate k in [2, n^{1/(m-1)}]. Test using fast exponentiation and accumulate sum to avoid overflows.

### Corner cases to consider  
- n is already 1 or less (special case, but always n ≥ 3 per constraints)
- n is a perfect power (e.g., n = k^m, which cannot yield all-1's except in trivial cases)
- n just above a power of two (to test if multiple m's give valid k's)
- Huge n (up to 10¹⁸), so numerical overflow and precision issues must be considered

### Solution

```python
def smallestGoodBase(n_str):
    n = int(n_str)
    max_m = n.bit_length()  # As max m is at most log₂(n+1)
    
    # Try all possible lengths m (number of 1's), from largest to 2
    for m in range(max_m, 1, -1):
        # Use binary search for k in [2, n**(1/(m-1))]
        left, right = 2, int(n ** (1 / (m - 1))) + 1
        
        while left <= right:
            k = (left + right) // 2
            s = 1
            curr = 1
            for _ in range(m - 1):
                curr *= k
                s += curr
                if s > n:
                    break
            if s == n:
                return str(k)
            elif s < n:
                left = k + 1
            else:
                right = k - 1
    # If no base found, answer is n-1 (i.e., '11' in base n-1)
    return str(n - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(log² n)  
  There are at most log₂ n candidates for m, and each uses binary search up to O(log n) for k. Each exponentiation or sum is at most O(log n) time.
- **Space Complexity:** O(1)  
  Only a constant amount of extra space is used aside from the input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle much larger n, well above 10²⁰?  
  *Hint: Can you avoid float in candidate base estimation and depend entirely on integer logic?*
- What if you need to print all good bases instead of the smallest?
  *Hint: Build a list while iterating m.*
- Can you generalize for representations other than all 1's? For example, find the smallest base where n's representation is all 2's.
  *Hint: Change the digit sum formula accordingly.*

### Summary
This problem combines **math (geometric progressions)**, **binary search**, and **bit manipulation**. For each valid length m of consecutive 1's, estimate a candidate base k using exponentials, then validate using sum of geometric progression. The coding pattern here is "enumerate parameter, binary search candidate, validate using mathematical formula." This is broadly applicable to digital base-conversion, representation, and digit pattern problems.

### Tags
Math(#math), Binary Search(#binary-search)

### Similar Problems
