### Leetcode 2478 (Hard): Number of Beautiful Partitions [Practice](https://leetcode.com/problems/number-of-beautiful-partitions)

### Description  
You are given a string `s` consisting of digits '1' to '9', and two integers `k` and `minLength`. You must partition `s` into exactly **k** non-overlapping substrings, each at least **minLength** long. Each substring must **start with a prime digit** ('2', '3', '5', '7') and **end with a non-prime digit** (other digits). Return the number of such possible partitionings, modulo 10⁹+7.

### Examples  

**Example 1:**  
Input: `s = "23542185131", k = 3, minLength = 2`  
Output: `3`  
*Explanation:*
- "2354" | "218" | "5131"
- "2354" | "21851" | "31"
- "2354218" | "51" | "31"

**Example 2:**  
Input: `s = "23542185131", k = 3, minLength = 3`  
Output: `1`  
*Explanation:*
- Only possible: "2354" | "218" | "5131"

**Example 3:**  
Input: `s = "3312958", k = 3, minLength = 1`  
Output: `1`  
*Explanation:*
- Only possible: "331" | "29" | "58"

### Thought Process (as if you’re the interviewee)  
- **Brute Force:**  
  Try all ways to break `s` into k substrings ≥ minLength, satisfying the start/end digit rules.  
  ⮕ Exponential in `n`. TLE for n up to 1000.

- **DP Optimization:**  
  Define `dp[i][j]` = number of ways to partition first `i` chars into `j` beautiful substrings.  
  Only consider valid split points: for each possible `i`, if `s[i]` starts a prime digit substring, and for each previous valid split position `p` (satisfying substring length and ending digit constraints), accumulate the valid ways.  
  Use prefix sums to speed up counting over possible split points.

- **Key Observations:**  
  - Maintain checks for prime/non-prime at start/end of substrings.
  - Avoid unnecessary computations by skipping invalid split points.
  - Use modulo 10⁹+7 at each step.

- **Trade-offs:**  
  - Brute force is not feasible.
  - DP is much more efficient (O(nk)), leveraging substring properties and prefix sums.

### Corner cases to consider  
- `s` too short to allow k substrings of `minLength`.
- Start or end digits not allowing any valid partitions.
- All digits are prime or all are non-prime.
- `k = 1` (whole string must meet constraints).
- `minLength = len(s) / k` (each substring must be exact).

### Solution

```python
MOD = 10**9 + 7

def beautifulPartitions(s: str, k: int, minLength: int) -> int:
    n = len(s)
    prime_set = {'2', '3', '5', '7'}

    # Helper to check if a character is prime
    def is_prime(c):
        return c in prime_set

    # Early exit: first char must be start-of-beautiful, last must be end-of-beautiful
    if not is_prime(s[0]) or is_prime(s[-1]):
        return 0

    # dp[i][j] = #ways to partition s[:i] into j groups
    dp = [[0] * (k + 1) for _ in range(n + 1)]
    dp[0][0] = 1

    # Prefix sum for dp[i][j-1]
    pre = [[0] * (k + 1) for _ in range(n + 2)]
    pre[0][0] = 1

    for i in range(1, n + 1):  # i is end index (exclusive)
        for j in range(1, k + 1):
            # Only consider possible starts for segment j ending at i
            # The previous cut must be at least minLength before
            start = i - minLength
            if start < 0: continue
            # Only cut if segment s[start:i] starts with prime, ends with non-prime
            if is_prime(s[start]) and not is_prime(s[i-1]):
                # Add sum of all dp[p][j-1] where previous cut position p is valid
                dp[i][j] = (pre[start][j-1] - pre[max(0, start-1)][j-1]) % MOD
        # Build prefix sums
        for j in range(k + 1):
            pre[i][j] = (pre[i-1][j] + dp[i][j]) % MOD

    return dp[n][k]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(nk), since we iterate over n positions and up to k partitions, and prefix sums make the inner accumulation step O(1).
- **Space Complexity:**  
  O(nk), due to the dp and prefix sum tables.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input string `s` can also include '0'?  
  *Hint: How does it affect the valid prime/non-prime checks?*

- How would you modify this if the prime digits set were an input argument?  
  *Hint: Pass the set to helper, update checks adaptively.*

- Could you optimize the space further?  
  *Hint: Do you need to keep all rows of dp for prefix sums, or just a rolling window?*

### Summary
This problem is a classic use of dynamic programming with range/splitting properties, similar to substring partitioning and palindrome partitioning DP. The two-dimensional dp plus prefix sum trick allows efficient computation for large inputs by exploiting constraints on valid start/end points for each substring. This pattern is common in substring, interval, or split counting problems and is widely applicable where range accumulations or choices are restricted by local properties.

### Tags
String(#string), Dynamic Programming(#dynamic-programming), Prefix Sum(#prefix-sum)

### Similar Problems
- Restore The Array(restore-the-array) (Hard)
- Number of Ways to Separate Numbers(number-of-ways-to-separate-numbers) (Hard)