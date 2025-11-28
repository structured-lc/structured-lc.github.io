### Leetcode 2584 (Hard): Split the Array to Make Coprime Products [Practice](https://leetcode.com/problems/split-the-array-to-make-coprime-products)

### Description  
Given an integer array **nums** of length n, find the smallest index **i** (0 ≤ i ≤ n - 2) such that splitting the array into two parts at index i makes the product of the first (i+1) elements coprime with the product of the remaining elements.  
Formally, find the smallest i so that  
gcd(nums₀ × nums₁ × ... × numsᵢ, numsᵢ₊₁ × ... × numsₙ₋₁) = 1.  
Return that index, or -1 if no such index exists.  
Two numbers are coprime iff their greatest common divisor is 1.

### Examples  

**Example 1:**  
Input: `nums = [4,7,8,15,3,5]`  
Output: `2`  
*Explanation: The only valid split is at index 2:  
Left: 4 × 7 × 8 = 224  
Right: 15 × 3 × 5 = 225  
gcd(224, 225) = 1.*

**Example 2:**  
Input: `nums = [4,7,15,8,3,5]`  
Output: `-1`  
*Explanation: No split index i produces coprime left and right products.*

**Example 3:**  
Input: `nums = [2,3,5,7,11]`  
Output: `0`  
*Explanation: Split at index 0:  
Left: 2  
Right: 3 × 5 × 7 × 11 = 1155  
gcd(2, 1155) = 1.*

### Thought Process (as if you’re the interviewee)  
- **Brute force**:  
  - For each possible split 0 ≤ i < n-1, compute the product of nums[0..i] and nums[i+1..n-1] and check if they are coprime using gcd.  
  - This is not feasible because products can become huge (up to 10⁶⁰⁰⁰⁰), leading to overflow and performance issues.

- **Smarter: Use prime factorization tracking**:  
  - For two products to be coprime, they must share no common prime factors.  
  - Factorize all numbers in nums.  
  - Track for each prime when its last occurrence is.  
  - As we scan from left to right, we know for each prefix, what prime factors have "ended" (i.e., don’t appear in the right suffix any more).  
  - To find the earliest index such that after i, all primes used so far are "done" in the left side, we can precompute for each prime the last index where it appears.
  - For each split point i, check all prime factors in prefix—if any prime in the left also appears later, cannot split here.

- **Algorithm**:
  - For each number, get its set of prime factors; for each prime, record the last index it appears in nums.
  - As we scan, maintain a rightmost "blocked" index for all current prefix primes.
  - If at index i, the maximum of "last occurrence" for all prefix primes is ≤ i, i.e., all prefix primes are contained to the left, then split at i is valid.

- **Trade-offs**:  
  - Using prime factorizations requires sieving up to 10⁶, which is feasible (~800 primes).
  - Memory for last-occurrence mapping and processing each prefix is efficient for n ≤ 10⁴.

### Corner cases to consider  
- nums has only one element (should never split, return -1)
- All elements are 1 (product coprime for any split since gcd(1,1)=1)
- All elements are the same value, especially if not 1 (no split possible)
- Primes and composites
- Large repeated primes at both ends
- Input with 0 (not allowed by constraints, but check)
- All products share a common prime factor

### Solution

```python
def findValidSplit(nums):
    # Helper: Sieve for fast prime factorization
    MAX_A = 10 ** 6 + 1
    spf = [0] * MAX_A  # Smallest prime factor for each number
    for i in range(2, MAX_A):
        if spf[i] == 0:
            for j in range(i, MAX_A, i):
                if spf[j] == 0:
                    spf[j] = i

    n = len(nums)
    # Step 1: For every prime, find the last index it appears in nums
    from collections import defaultdict
    prime_last = dict()
    for idx, x in enumerate(nums):
        x0 = x
        factors = set()
        while x > 1:
            p = spf[x]
            factors.add(p)
            while x % p == 0:
                x //= p
        for p in factors:
            prime_last[p] = idx

    # Step 2: Scan and maintain "furthest" we need to go for each split due to overlapping primes
    blocked = -1
    seen = set()
    for i in range(n - 1):
        x = nums[i]
        # Add all prime factors of x
        factors = set()
        while x > 1:
            p = spf[x]
            factors.add(p)
            while x % p == 0:
                x //= p
        for p in factors:
            blocked = max(blocked, prime_last[p])
        if blocked <= i:  # All prefix primes now finished
            return i
    return -1
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Building sieve: O(MAX_A log log MAX_A), about 8 million operations.
  - For each element (n elements): O(log nums[i]) to factorize (since max value 10⁶).
  - Total: O(MAX_A + n log MAX_A)
- **Space Complexity:**  
  - Sieve of size up to 10⁶.
  - Hash map for primes (~800 keys), last-occurrence indices, and sets for factors (temporary).
  - Overall: O(MAX_A)

### Potential follow-up questions (as if you’re the interviewer)  

- What if the array contains zero or negative values?  
  *Hint: How would the definition of coprime products change?*

- How would you adapt this if you wanted all valid split indices, not just the smallest one?  
  *Hint: Can you track the running maximum "blocked" index at each step?*

- What if you just want to minimize the gcd of the split products, not necessarily 1?  
  *Hint: Consider dynamic programming storing attainable gcds at each split position.*

### Summary
This problem uses the **prefix attribute tracking** pattern, similar to union-find intervals, but specifically leverages properties of the primes for efficient lookups. The blocking-pointer technique elegantly avoids expensive product/gcd calculations, making this approach suitable for input up to n=10⁴. The "factor overlap tracking" trick shows up in a few hard number-theory interview problems, such as "Least Common Multiple Split" or interval coverage with factor tracking.


### Flashcard
Track prime factorization of prefix and suffix products; two products are coprime iff they share no common prime factors.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Number Theory(#number-theory)

### Similar Problems
- Replace Non-Coprime Numbers in Array(replace-non-coprime-numbers-in-array) (Hard)