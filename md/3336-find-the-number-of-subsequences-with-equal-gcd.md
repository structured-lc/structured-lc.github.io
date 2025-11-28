### Leetcode 3336 (Hard): Find the Number of Subsequences With Equal GCD [Practice](https://leetcode.com/problems/find-the-number-of-subsequences-with-equal-gcd)

### Description  
Given an integer array nums, return the sum of the number of non-empty subsequences of nums whose greatest common divisor (GCD) is exactly equal to each possible value.  
In other words, for each integer \( x \) from 1 to max(nums), count how many non-empty subsequences of nums have GCD \( x \), and return the sum of those counts.  
Since the answer may be very large, return it modulo \( 10^9 + 7 \).

### Examples  

**Example 1:**  
Input: `nums = [2, 4, 6, 8]`  
Output: `8`  
*Explanation:  
Possible GCDs in nums: 2, 4, 6, 8  
Number of subsequences for each GCD:  
GCD 2: [2], [2,4], [2,6], [2,8], [4,6], [4,8], [6,8], [2,4,6,8]  
So the sum is 8.*

**Example 2:**  
Input: `nums = [3, 6, 9]`  
Output: `4`  
*Explanation:  
GCD 3: [3], [3,6], [3,9], [3,6,9]  
So the sum is 4.*

**Example 3:**  
Input: `nums = [5]`  
Output: `1`  
*Explanation:  
Only one subsequence: [5], which has GCD 5.*

### Thought Process (as if you’re the interviewee)  
A brute-force solution would enumerate all possible non-empty subsequences (2ⁿ–1 combinations) and compute the GCD for each, which is not feasible for n > 20.

To optimize:
- For each possible GCD value \( g \) (from max(nums) down to 1),  
  - Count the number of elements divisible by \( g \).
  - The number of non-empty subsequences of these elements is 2ᶜ–1 (if c is the count).
  - However, some of these subsequences might have GCD strictly greater than \( g \) but still divisible by \( g \).
  - **Inclusion-Exclusion Principle**: For each g, subtract the number of subsequences already counted for multiples of g greater than g.
- Precompute freq[x] = number of occurrences of x in nums, to speed up divisor count.

This approach leverages combinatorics over brute-force enumeration and ensures the correct count for each possible GCD.

Trade-offs:  
- Uses extra space for precomputing counts and storing results for each divisor.
- Efficient due to tight bounds on the GCD range (up to max(nums)), not all 2ⁿ subsets.

### Corner cases to consider  
- Empty array (shouldn’t happen as per problem description).
- All elements are the same (test for correct GCD grouping).
- All elements are co-prime (no common divisors except 1).
- Large numbers (test modulo and integer overflow).
- Single-element array.

### Solution

```python
MOD = 10**9 + 7

def findNumOfSubsequences(nums):
    from math import gcd
    from collections import Counter

    maxN = max(nums)
    freq = [0] * (maxN + 1)

    # Count for each x, how many times x appears
    for x in nums:
        freq[x] += 1

    # cnt[g] = number of elements divisible by g
    cnt = [0] * (maxN + 1)
    for g in range(1, maxN + 1):
        # Sum up frequency of all multiples of g
        for k in range(g, maxN + 1, g):
            cnt[g] += freq[k]

    # dp[g]: number of subsequences with exact GCD = g
    dp = [0] * (maxN + 1)

    # For every possible GCD from maxN downto 1
    for g in range(maxN, 0, -1):
        if cnt[g] == 0:
            continue
        # Number of nonempty subsequences = 2^cnt[g] - 1
        subseq = pow(2, cnt[g], MOD) - 1
        # Subtract out subsequences with GCD = kg for k > 1
        kg = 2 * g
        multiple = kg
        k = 2
        while multiple <= maxN:
            subseq = (subseq - dp[multiple]) % MOD
            k += 1
            multiple = g * k
        dp[g] = subseq

    # Total count: sum over all 1 ≤ g ≤ maxN of dp[g]
    return sum(dp) % MOD
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n log A), where n = len(nums) and A = max(nums). For each possible g, we visit up to A/g numbers; this sums to O(A log A).  
- **Space Complexity:** O(A), for the frequency and dp arrays (A = max(nums)).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the numbers are very large (bigger than 10⁶)?  
  *Hint: Sieve or combinatorial methods may not be feasible for huge ranges.*

- Can you give not just the total but a mapping from each possible GCD to its subsequence count?  
  *Hint: Store the dp[g] array and output all values.*

- What if you needed to return subsequences themselves, not just their count?  
  *Hint: Impossible for large n due to exponential explosion; may need to output examples or counts only.*

### Summary
This problem is a classic inclusion-exclusion (mobius inversion) and combinatorics on multisets challenge, similar to classical divisor sieve problems. The efficient approach is broadly useful in GCD counting over arrays, factorization-sieve type counting, and other problems requiring combinatorial processing on divisors or multiples rather than explicit subset enumeration.


### Flashcard
For each possible GCD g from max(nums) down to 1, count elements divisible by g; use inclusion-exclusion to subtract subsequences with GCD strictly > g from 2^count − 1.

### Tags
Array(#array), Math(#math), Dynamic Programming(#dynamic-programming), Number Theory(#number-theory)

### Similar Problems
- Find Greatest Common Divisor of Array(find-greatest-common-divisor-of-array) (Easy)