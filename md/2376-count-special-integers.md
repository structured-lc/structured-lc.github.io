### Leetcode 2376 (Hard): Count Special Integers [Practice](https://leetcode.com/problems/count-special-integers)

### Description  
Given a positive integer **n**, count how many integers in the range **[1, n]** have all **distinct digits**. An integer is called **special** if none of its digits repeats. For example, 123 is special, but 122 is not. Output the number of special integers ≤ n.

### Examples  

**Example 1:**  
Input: `n = 20`  
Output: `19`  
Explanation: Only `11` is not special between 1 and 20 (it repeats the digit 1). So all others, 1..10, 12..20, are special.

**Example 2:**  
Input: `n = 5`  
Output: `5`  
Explanation: All numbers 1, 2, 3, 4, and 5 are special (single-digit numbers always have distinct digits).

**Example 3:**  
Input: `n = 135`  
Output: `110`  
Explanation: 22, 114, 131, and others are NOT special because they repeat digits. There are 110 special integers between 1 and 135.

### Thought Process (as if you’re the interviewee)  
Start with brute-force:  
- For every integer k from 1 to n, check if all digits are unique (can use set for this check).  
- Time complexity is O(n × digits in n), which is too slow for n up to 2 × 10⁹.

Observation:  
- We are only interested in numbers where no digit repeats.  
- For all numbers with fewer digits than n, all possible special numbers can be counted by position permutations.  
- For numbers with the same number of digits as n, we must ensure prefix constraints (cannot exceed n at any digit).

Optimized approach:  
- Use **digit dynamic programming (DP)**:  
    - For each position, track:
        - The set of digits already used (can use int mask).
        - Whether the current prefix matches n so far (tight bound).
    - At each digit, try all valid digits not already used.
    - If tight, must not exceed the corresponding digit in n.
    - DP state: pos, mask, tight.  

Breakdown:  
- For numbers with fewer digits than n, count all unique digit numbers using permutations.
- For same length, use digit DP to handle the prefix constraint.

Trade-offs:  
- Brute-force is too slow.
- Digit DP is more complex but works in O((num_digits) × 2¹⁰ × num_digits) (since mask can go up to 10 bits).

### Corner cases to consider  
- n is a single digit (≤ 9): all numbers are special.
- n contains repeating digits (e.g., 100,112,121,222).
- n with leading digits as zero (not allowed in input, but be careful generating numbers starting with 0).
- n = 10⁹ or other very large values (ensure performance/scalability).

### Solution

```python
def countSpecialNumbers(n: int) -> int:
    # Convert n to a list of its digits for easier access
    digits = list(map(int, str(n)))
    length = len(digits)
    
    from functools import lru_cache

    # Permutation function: A(m, k) = number of ways to pick k distinct items from m options with order
    def perm(m, k):
        res = 1
        for i in range(k):
            res *= (m - i)
        return res

    # Count numbers with fewer digits than n
    ans = 0
    for d in range(1, length):  # Numbers of length d < len(n)
        cnt = 9 * perm(9, d - 1)  # First digit can't be zero, next d-1 can pick from 9 non-used
        ans += cnt

    # Now we use digit DP to count same-length numbers ≤ n with unique digits
    @lru_cache(maxsize=None)
    def dfs(pos: int, mask: int, tight: bool, leading_zero: bool) -> int:
        if pos == length:
            # If we have placed at least one digit
            return 0 if leading_zero else 1

        res = 0
        up = digits[pos] if tight else 9
        for d in range(0, up + 1):
            if leading_zero and d == 0:
                # still haven't placed a non-zero digit
                res += dfs(pos + 1, mask, tight and d == up, True)
            else:
                if (mask >> d) & 1:
                    continue  # already used digit d
                res += dfs(pos + 1, mask | (1 << d), tight and d == up, False)
        return res

    ans += dfs(0, 0, True, True)
    return ans
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L × 2¹⁰), where L = number of digits in n (max 10). Each DP state is (position, mask, tight, leading_zero), mask is 10 bits, so at most 10 × 1024 × 2 × 2 = ~40,000 unique calls.
- **Space Complexity:** O(L × 2¹⁰), due to memoization and call stack. No extra allocations apart from DP cache.

### Potential follow-up questions (as if you’re the interviewer)  

- What if n can be extremely large (hundreds of digits)?
  *Hint: Scalability—the DP still works, but pay attention to efficiency in handling very long strings.*

- How would you count numbers with exactly k digits and all unique digits?
  *Hint: Directly use permutation formulas. First digit 1–9, others choose from remaining.*

- Modify to count numbers whose digits are all even and unique.
  *Hint: Only allow digits 0,2,4,6,8 (but first digit cannot be 0). DP for allowed digits mask.*

### Summary
The problem uses **digit DP**—a key dynamic programming pattern for combinatorial counting on numbers with digit constraints. The state encodes position, used digits, and the tight prefix flag. This approach (digit DP with bitmask for repeated digits) is widely applicable in unique digit/combinatorial number scenarios with digit-level restrictions, for example, counting numbers satisfying divisibility, bounding, or forbidden digit properties.


### Flashcard
Use digit DP with bitmask to count integers ≤ n having all unique digits; for each position, track which digits are used and whether the prefix equals n's prefix.

### Tags
Math(#math), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Count Numbers with Unique Digits(count-numbers-with-unique-digits) (Medium)
- K-th Smallest in Lexicographical Order(k-th-smallest-in-lexicographical-order) (Hard)