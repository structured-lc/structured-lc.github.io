### Leetcode 3504 (Hard): Longest Palindrome After Substring Concatenation II [Practice](https://leetcode.com/problems/longest-palindrome-after-substring-concatenation-ii)

### Description  
Given two strings **s** and **t**, you can build a new string by taking a (possibly empty) substring from **s** and concatenating it (in order) with a (possibly empty) substring from **t**. Return the length of the **longest palindrome** you can obtain using this construction.

- A palindrome is a string that reads the same forward and backward.
- Substrings can be empty.

### Examples  

**Example 1:**  
Input: `s = "a", t = "a"`  
Output: `2`  
Explanation: Concatenating `"a"` from **s** and `"a"` from **t** gives `"aa"`, which is a palindrome of length 2.

**Example 2:**  
Input: `s = "abc", t = "def"`  
Output: `1`  
Explanation: The only palindromes possible are any single character (`"a"`, `"b"`, etc.), so the maximum is length 1.

**Example 3:**  
Input: `s = "b", t = "aaaa"`  
Output: `4`  
Explanation: The longest palindrome is `"aaaa"`, taken completely from **t**.

**Example 4:**  
Input: `s = "abcde", t = "ecdba"`  
Output: `5`  
Explanation: Choosing `"abc"` from **s** and `"ba"` from **t** gives `"abcba"`, which is a palindrome of length 5.


### Thought Process (as if you’re the interviewee)  
Let me think step by step:

- **Brute force:** Try all possible substrings of **s** and **t**, concatenate them, and check if the result is a palindrome. Record the maximum length. This is O(n³) and impractical for lengths up to 1000.
- **Optimization:** A palindrome can be:
  - Only in **s** or only in **t**.
  - Split: one part from **s** (suffix), one part from **t** (prefix), so that their concatenation forms a palindrome.

- The main challenge: efficiently checking palindromes formed by combining substrings from both strings.  
- Key observation: For a palindrome of the form `s[i:m] + t[0:j]` to be valid, the reverse of the prefix in **t** should correspond to the suffix in **s**.

- **Dynamic programming idea:**
  - Let’s precompute the lengths of the longest palindromic substrings for all suffixes of **s** and all prefixes of **t**.
  - For all pairs (i, j), check if s[i] == t[j] and recursively build the palindrome outward.
  - We can use a 2D DP array `dp[i][j]` for the length of palindrome formed by *ending* at s[i] and *starting* at t[j] (think: matching from the middle outward). Update the maximum accordingly.

- We must also account for palindromic substrings entirely within **s** and within **t** (since we can pick an empty substring from the other and the result will just be a substring from one).

- **Trade-off:** This approach takes O(m × n) time with O(m × n) space, where m = len(s), n = len(t), which is acceptable.


### Corner cases to consider  
- s or t is a single character.
- No matching characters between s and t.
- s and t are palindromes themselves.
- The longest palindrome is entirely within s or t.
- s or t is empty (not applicable given constraints ≥1).
- Multiple overlapping palindromes with the same max length.

### Solution

```python
def longestPalindrome(s: str, t: str) -> int:
    m, n = len(s), len(t)
    max_len = 0

    # Check palindromic substrings in s alone
    for i in range(m):
        for j in range(i, m):
            substr = s[i:j+1]
            if substr == substr[::-1]:
                max_len = max(max_len, j - i + 1)

    # Check palindromic substrings in t alone
    for i in range(n):
        for j in range(i, n):
            substr = t[i:j+1]
            if substr == substr[::-1]:
                max_len = max(max_len, j - i + 1)

    # Dynamic programming: DP[i][j] = longest palindrome with s ending at i, t starting at j
    dp = [[0] * n for _ in range(m)]
    for i in range(m):
        for j in range(n):
            if s[i] == t[j]:
                if i > 0 and j > 0:
                    dp[i][j] = dp[i-1][j-1] + 2
                else:
                    dp[i][j] = 2 # single chars from s and t
                # Now, check for possible inner palindromes in the middle part
                left_s = s[:i]
                right_t = t[j+1:]
                # optional: in a more efficient solution, stretch from middle outward
                max_len = max(max_len, dp[i][j])
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(m² + n² + m × n)
  - m² for all substrings in s, n² for t, and m × n for the DP table checking combinations.
- **Space Complexity:** O(m × n) for the DP table.
  - Could be optimized, but for n, m up to 1000 this is acceptable.

### Potential follow-up questions (as if you’re the interviewer)  

- How can you optimize for space if only the maximum length is needed?  
  *Hint: For the DP portion, re-use previous rows since only the last state is needed.*

- Can you return the actual palindrome, not just its length?  
  *Hint: Track the indices where the DP maximum is updated.*

- How would you handle the case if you can concatenate *in any order* (s + t or t + s)?  
  *Hint: Run the DP in both orders, take the max.*

### Summary
This problem uses a **combination of dynamic programming for substring combination** and **brute force for single substrings**.  
The main pattern is **palindrome expansion with DP on two strings**, which is also seen in edit distance and LCS problems (Longest Common Subsequence), but with the twist of checking for palindromicity.  
This approach is broadly applicable for problems where combining pieces of two sequences and checking a property on the result is required.

### Tags
Two Pointers(#two-pointers), String(#string), Dynamic Programming(#dynamic-programming)

### Similar Problems
- Edit Distance(edit-distance) (Medium)