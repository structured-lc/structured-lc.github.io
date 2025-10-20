### Leetcode 1278 (Hard): Palindrome Partitioning III [Practice](https://leetcode.com/problems/palindrome-partitioning-iii)

### Description  
You are given a string **s** of lowercase English letters and an integer **k**.  
Your task is to partition the string **s** into **k** non-empty, disjoint substrings such that **each substring is a palindrome** after you may change any number of characters in **s**.  
Return the minimal number of characters that you need to change to achieve this partition.

A *palindrome* is a string that reads the same forward and backward.

### Examples  

**Example 1:**  
Input: `s = "abc", k = 2`  
Output: `1`  
*Explanation: Split as "ab" | "c". Change 1 letter in "ab" ('b' → 'a'), so both partitions are palindromes ("aa", "c").*

**Example 2:**  
Input: `s = "aabbc", k = 3`  
Output: `0`  
*Explanation: Split as "aa" | "bb" | "c". All partitions are already palindromes.*

**Example 3:**  
Input: `s = "leetcode", k = 8`  
Output: `0`  
*Explanation: Each letter is a single-character palindrome. No changes needed.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every possible way to split **s** into **k** substrings, for each, calculate the number of changes needed for each substring to become palindrome, and pick the minimal sum.  
  This is very slow: exponential in both the number of splits and substring processing.

- **Optimize using DP:**  
  - First, precompute for every substring **s[i:j]** the minimum number of changes needed to make it a palindrome.  
  - Use a DP table: `dp[i][k]` = minimum number of changes needed to partition **s[0:i]** into **k** palindromic parts.  
  - Transition: For each possible split point **j**, update `dp[i][k] = min(dp[j][k-1] + cost(j, i-1))`, where `cost(j, i-1)` is the palindrome-repair cost for **s[j:i]**.
  - Base case: `dp = 0`.  
  - The answer is `dp[n][k]` (split whole string into k parts).

- **Why this works:**  
  - This reduces redundant calculation by breaking down the problem into smaller, overlapping subproblems.
  - Precomputing the palindrome transformation cost allows efficient state updating.

- **Trade-off:**  
  - Using extra space for palindrome conversion cost table (n²).
  - Running nested DP with splitability (n³).

### Corner cases to consider  
- k == 1 (whole string must be a palindrome, minimal changes)
- k == len(s) (every character is its own palindrome—always zero changes)
- s is already all palindromes for every partition
- Minimum-length strings (`s = "a"`, `k = 1`)
- k > len(s) (invalid due to constraints; problem guarantees 1 ≤ k ≤ s.length)

### Solution

```python
def palindromePartition(s: str, k: int) -> int:
    n = len(s)
    
    # cost[i][j] = minimal changes to make s[i:j+1] a palindrome
    cost = [[0] * n for _ in range(n)]
    for l in range(1, n + 1):  # substring length
        for i in range(n - l + 1):
            j = i + l - 1
            cnt = 0
            left, right = i, j
            while left < right:
                if s[left] != s[right]:
                    cnt += 1
                left += 1
                right -= 1
            cost[i][j] = cnt

    # dp[i][kk] = min changes for s[0:i] using kk partitions
    dp = [[float('inf')] * (k + 1) for _ in range(n + 1)]
    dp[0][0] = 0  # zero chars with 0 partitions
    
    for i in range(1, n + 1):  # end index exclusive
        for kk in range(1, min(k, i) + 1):
            for j in range(kk - 1, i):
                dp[i][kk] = min(dp[i][kk], dp[j][kk - 1] + cost[j][i - 1])
    
    return dp[n][k]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n³)  
  - Precomputing `cost[i][j]` for all pairs (O(n²)), with each cost computation at most O(n).
  - Filling DP: For every position `i` and partition count `k`, loop up to O(n) previous positions: O(n × k × n) = O(n³).
- **Space Complexity:** O(n²)  
  - For `cost` table and the `dp` table. Each uses O(n²) space.

### Potential follow-up questions (as if you’re the interviewer)  

- If k can be much larger, or n up to 10⁵, how would you optimize further?  
  *Hint: Is there a faster way to compute min changes, or can you reduce the DP state?*

- Can you reconstruct the partitioning that achieves the minimal changes?  
  *Hint: Store traceback pointers during DP, backtrack for reconstruction.*

- What if only lower case changes are not allowed, i.e., you can only partition, not edit?  
  *Hint: The problem reduces to minimum cuts for palindrome partitioning.*

### Summary
This problem is a classic **string DP with partitioning and transformation cost**—a mix of palindrome preprocessing and optimal substructure over cuts, which is a recurrent pattern in DP problems involving substrings and partition counts.  
Core patterns:  
- **Precompute transformation costs** (palindrome repairs) in O(n²)
- **DP for cuts/partitioning** (2D, over substring and partition count)
- This approach applies to similar "split into k blocks minimizing/optimizing cost" scenarios, like word break, palindrome cuts, and edit distance segmentations.


### Flashcard
Precompute min changes to make any substring a palindrome, then use DP: dp[i][k] = min changes to partition s[i:] into k palindromic substrings.

### Tags
String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Palindrome Partitioning IV(palindrome-partitioning-iv) (Hard)
- Maximum Number of Non-overlapping Palindrome Substrings(maximum-number-of-non-overlapping-palindrome-substrings) (Hard)
- Minimum Changes to Make K Semi-palindromes(minimum-changes-to-make-k-semi-palindromes) (Hard)