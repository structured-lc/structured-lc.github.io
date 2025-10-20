### Leetcode 2911 (Hard): Minimum Changes to Make K Semi-palindromes [Practice](https://leetcode.com/problems/minimum-changes-to-make-k-semi-palindromes)

### Description  
Given a string \( s \) and an integer \( k \), partition \( s \) into \( k \) contiguous substrings.  
Your task is to make each substring a **semi-palindrome** with as few character changes as possible, and return the minimum total number of changes needed.

A **semi-palindrome** is defined as any string where for any valid divisor \( d \) (with \( 1 \leq d < \text{len} \)), if you group the characters at positions congruent modulo \( d \), each such group forms a palindrome.

Intuitively:  
For every substring you create, you may rearrange or swap indices with the same modulus, and you want every such 'modular group' across all divisors to be palindromic (so minimal changes are needed).

### Examples  

**Example 1:**  
Input:`s = "abcdef", k = 2`  
Output:`2`  
Explanation: Split as `"abc" | "def"`. Changing `'b'`→`'a'` in `"abc"` and `'e'`→`'d'` in `"def"` gives `"aac"` and `"ddf"` (both are semi-palindromes). Each substring needs 1 change; total 2.

**Example 2:**  
Input:`s = "aabbaa", k = 3`  
Output:`0`  
Explanation: Split as `"aa" | "bb" | "aa"`. Each is already a semi-palindrome (all are even-length palindromes), so 0 changes are needed.

**Example 3:**  
Input:`s = "abba", k = 2`  
Output:`0`  
Explanation: Split as `"ab" | "ba"`. Each is already a semi-palindrome (the only possible divisor is 1, and all length-2 strings are semi-palindromes, since pairs can match).

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Try every way to split s into k parts, and for each substring, check every possible divisor d, and for each, check if groups formed by taking every dᵗʰ character can be made palindromic (by minimum replacements).  
  But the space is exponential if we check all partitions, and nested checking is slow.

- **Optimize:**  
  - Use **dynamic programming**:  
    - Let `dp[i][j]` = min cost to make the first i characters into j semi-palindromic parts.
    - For all possible previous cuts, and for each possible split, precompute the minimum cost to make s[l:r] a semi-palindrome.
    - Use preprocessing to quickly check the minimal number of changes for any substring `[l:r]` to become a semi-palindrome.
    - For each substring and divisor, for every modulus group, count mismatches in reflected indices.

- **Why this approach:**  
  - The DP reduces the solution to O(n² × k) time, since for every substring, we just look up or calculate semi-palindrome cost in O(1) (if we preprocess).

### Corner cases to consider  
- k = 1 (the whole string): need to make the whole string a semi-palindrome.
- s of length 2: both length-2 substrings and splits.
- Substrings with all equal letters (no changes needed).
- k close to n/2 (minimal substrings, many are of length 2).
- Odd/even length substrings.
- s already semi-palindromic (expect output 0).

### Solution

```python
def min_changes_to_make_k_semi_palindromes(s: str, k: int) -> int:
    n = len(s)
    # Precompute cost to make any s[l:r] (r exclusive) into a semi-palindrome
    
    # cost[i][j]: min changes to turn s[i:j] into a semi-palindrome
    cost = [[0] * (n+1) for _ in range(n+1)]
    
    # For every substring s[l:r]
    for l in range(n):
        for r in range(l+1, n+1):
            length = r - l

            min_changes = float('inf')
            # Try every possible divisor d (1 <= d < len)
            for d in range(1, length):
                total = 0
                for offset in range(d):
                    chars = []
                    # Collect the group
                    idxs = list(range(l + offset, r, d))
                    for idx in idxs:
                        chars.append(s[idx])
                    # Count changes needed to make this group a palindrome
                    # Two pointers
                    left, right = 0, len(chars) - 1
                    group_changes = 0
                    while left < right:
                        if chars[left] != chars[right]:
                            group_changes += 1
                        left += 1
                        right -= 1
                    total += group_changes
                min_changes = min(min_changes, total)
            if length == 1:
                min_changes = 0   # Any single char is trivially semi-palindrome
            cost[l][r] = min_changes if min_changes != float('inf') else 0

    # DP: dp[i][parts] = min cost to partition s[0:i] into 'parts' semi-palindromes
    dp = [[float('inf')] * (k+2) for _ in range(n+1)]
    dp[0][0] = 0

    for i in range(1, n+1):   # [0, i) as substring
        for part in range(1, k+1):
            # Try every possible previous split
            for j in range(part-1, i):
                # s[j:i] is the last partition
                prev = dp[j][part-1]
                curr_cost = cost[j][i]
                dp[i][part] = min(dp[i][part], prev + curr_cost)

    return dp[n][k]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing substring costs: O(n³) (for every pair l, r, and every possible divisor, with each group at most size n)
  - DP: O(n² × k) to fill the table.  
  - Overall: O(n³)
- **Space Complexity:**  
  - cost table: O(n²)
  - dp table: O(nk)

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize the preprocessing to handle larger n?  
  *Hint: Can you avoid recomputing palindromic group costs for overlap?*

- What if k can be up to n/2?  
  *Hint: Consider memory usage and DP optimizations.*

- How would you handle the case where the allowed alphabet is not only lowercase?  
  *Hint: Generalize group counting for arbitrary symbols.*

### Summary
This problem is best solved with a **dynamic programming** pattern, using careful preprocessing to minimize the cost of making any substring a semi-palindrome.  
The key insight is to combine substring DP (similar to "palindrome partitioning") with local palindrome group checks for all possible divisors.  
This pattern -- DP + substring property preprocessing -- frequently appears in hard string partitioning and transformation problems.


### Flashcard
Use DP: dp[i][j] = min cost to split first i chars into j semi-palindromic parts, where each part is made palindromic by minimal replacements.

### Tags
Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Palindrome Partitioning III(palindrome-partitioning-iii) (Hard)