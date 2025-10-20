### Leetcode 1416 (Hard): Restore The Array [Practice](https://leetcode.com/problems/restore-the-array)

### Description  
Given a string `s` consisting of digits, and an integer `k`:  
You must split `s` into a sequence of integers so that:
- Each integer is between 1 and `k`, inclusive.
- The sequence does **not** have leading zeros.
- Every digit in `s` must be used exactly once.
Return the number of possible ways to split `s` into such a sequence, modulo 1,000,000,007.

In other words: *How many valid arrays can you make from `s` in which each number (from left to right, in order) is between 1 and k, and no number starts with '0'?*

### Examples  

**Example 1:**  
Input: `s = "1000", k = 10000`  
Output: `1`  
*Explanation: The only valid split is [1000], because [1, 000] is invalid (leading zero).*

**Example 2:**  
Input: `s = "1000", k = 10`  
Output: `0`  
*Explanation: No valid split. [1, 0, 0, 0] and [10, 0, 0] have invalid numbers (0 or leading zeros), [100, 0] exceeds k.*

**Example 3:**  
Input: `s = "1317", k = 2000`  
Output: `8`  
*Explanation: All splits into numbers ≤ 2000 and no leading zeros: [1,3,1,7], [13,1,7], [1,31,7], [1,3,17], [13,17], [1,317], [131,7], [1317].*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Consider every way to split the string at every position, check if the resulting number is between 1 and k (and no leading zero), recursively continue for the rest.  
  However, this leads to exponential time for long s.

- **Optimized (DP with memoization):**  
  Since the string length can be large, storing the number of ways to split at each starting index (DP) helps avoid recomputation.
  - Let dp[i] = number of ways to split s[i:]
  - For each i, try all j from i+1 to min(len(s), i+max_len), where max_len is the max number of digits in k.
  - For each substring s[i:j], if it is a valid integer between 1 and k, accumulate dp[j] into dp[i].
  - Base case: dp[n] = 1 (empty suffix == one valid split).
- Tradeoffs:  
  - DP increases space to O(n)
  - Time is reduced from exponential to O(n × log k) (since the max number of digits to try is bounded by len(str(k)))

### Corner cases to consider  
- s starts with a '0' (invalid)
- s contains a '0' not at the start (valid only if as a single digit and not as leading)
- k is very small or very large
- s length is 1
- Entire s as a number ≤ k
- Entire s as a number > k
- Large s and small k (time and overflow)

### Solution

```python
MOD = 10**9 + 7

def numberOfArrays(s: str, k: int) -> int:
    n = len(s)
    max_width = len(str(k))  # max possible width of valid value
    
    dp = [0] * (n + 1)
    dp[n] = 1  # base case: empty suffix, 1 way
    
    for i in range(n-1, -1, -1):
        if s[i] == '0':  # cannot start a number with zero
            dp[i] = 0
            continue
        
        num = 0
        for j in range(i, min(n, i + max_width)):
            num = num * 10 + int(s[j])
            if num > k:
                break
            dp[i] = (dp[i] + dp[j+1]) % MOD
                
    return dp[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × log k)  
  For each position in the string, we consider up to log₁₀(k) splits (the number of digits in k). Each split processes in O(1) time.

- **Space Complexity:** O(n)  
  The DP array stores one value per position in the input string.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to return all possible arrays, not just the count?  
  *Hint: How could you build the solutions recursively and backtrack to generate sequences?*

- How would you adapt this to allow numbers with leading zeros?  
  *Hint: What changes would you make to the validation step for each substring?*

- How do you handle very large k efficiently?  
  *Hint: When converting s[i:j+1] to a number, can you stop early if the prefix exceeds k?*

### Summary
This is a classic **DP on substrings** problem, where you use a DP table to cache the number of ways to split the rest of the string at each index.  
It’s closely related to "decode ways" and "word break" style problems: wherever we have a string and need to count (#) of ways to split it into valid pieces, DP fits well.  
Key tricks: limit the substring window to the number of digits in k, check for leading zeros, and use a rolling integer construction to avoid the expense of substring conversion.  
Pattern is common for parsing, dynamic programming on strings, and combinatorial counts over segmentations.


### Flashcard
Use dynamic programming with memoization to efficiently split the string into numbers between 1 and k, avoiding leading zeros.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Number of Ways to Separate Numbers(number-of-ways-to-separate-numbers) (Hard)
- Number of Beautiful Partitions(number-of-beautiful-partitions) (Hard)