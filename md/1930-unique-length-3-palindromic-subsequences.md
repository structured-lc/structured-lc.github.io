### Leetcode 1930 (Medium): Unique Length-3 Palindromic Subsequences [Practice](https://leetcode.com/problems/unique-length-3-palindromic-subsequences)

### Description  
Given a string `s`, return the number of **unique palindromic subsequences of length 3** that can be formed from `s`.  
- A **subsequence** is a sequence that can be derived from `s` by deleting some (possibly zero) characters without changing the order of the remaining characters.  
- A **palindrome** is a sequence that reads the same forwards and backwards, so for length 3 it must be of the form "aba" (first and last character same, middle can be any char).  
- Count **each unique 3-character palindromic subsequence only once**, even if it can be formed in multiple ways.  
- Constraints require an efficient approach (string length up to 10⁵).

### Examples  

**Example 1:**  
Input: `s = "aabca"`  
Output: `3`  
Explanation: Possible unique palindromic subsequences of length 3 are:  
- "aba" (indices 0,1,4)
- "aaa" (indices 0,1,2)  
- "aca" (indices 0,3,4)  
So, output is 3.

**Example 2:**  
Input: `s = "adc"`  
Output: `0`  
Explanation: No palindromic subsequence of length 3 possible since no character repeats.

**Example 3:**  
Input: `s = "bbcbaba"`  
Output: `4`  
Explanation: The palindromic subsequences are:  
- "bbb" (indices 0,1,2 or 0,1,6)
- "bab" (indices 0,4,6)
- "bcb" (indices 0,2,6)
- "aba" (indices 4,5,6)

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Try all triplets (i, j, k) where 0 ≤ i < j < k < n and check if s[i] == s[k] and record unique (s[i], s[j]).  
  But this is O(n³); not feasible for n up to 10⁵.

- **Optimization:**  
  For a length-3 palindrome: first and third chars must be the same (say char `a`), and a middle char `b` (could be != a).  
  For every possible char `a`, find its leftmost and rightmost occurrence in `s`;  
  For all chars `b` that occur strictly between these positions, add ("a","b","a") to a set (to ensure uniqueness).  
  This reduces to:
    - For each letter a ('a' to 'z'):  
        - Find leftmost and rightmost positions.
        - If left < right, look at all unique chars between them — for each, ("a", "b", "a") is valid.
  This is O(26 × n), very fast, and only needs a set of found palindromes.

- **Trade-offs:**  
  - Time: O(26 × n)
  - Space: O(26×26) for unique triplets ("a", "b", "a").
  - Much faster than trying all subsequences or all possible triplets.

### Corner cases to consider  
- Empty input: "" (should return 0)
- Input of length < 3 (should return 0)
- All same letter: "aaaaa" (e.g., only one unique: "aaa")
- No repeated character: "abc"
- Long string with all 26 letters
- Palindromes that can be formed multiple times, should count only uniquely

### Solution

```python
def countPalindromicSubsequence(s: str) -> int:
    # To store unique (outside, inner) char pairs for palindromes
    res = set()
    # For each char as the outer char of the palindrome
    for ch in set(s):
        left = s.find(ch)
        right = s.rfind(ch)
        # Only proceed if there are at least one char between left and right
        if left < right - 1:
            # Collect all unique chars between left and right (exclusive)
            between = set(s[left+1:right])
            for mid in between:
                # Store as tuple for uniqueness
                res.add((ch, mid))
    # Each (a, b) maps to palindrome "aba"
    return len(res)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(26 × n) —  
  For up to 26 letters, for each one we scan the substring between first and last occurrence, which in worst case totals O(n).  
  Extracting unique characters from a substring can be O(n) in the worst case but since we are capped at 26 letters (only a-z), it's very fast.

- **Space Complexity:** O(1) (w.r.t input size n) —  
  The set `res` at most stores 26 × 26 pairs.  
  No extra data structures proportional to input, except minor intermediate sets.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string contained Unicode characters, not just lowercase a-z?  
  *Hint: How would you adjust your data structures and the search space for larger alphabets?*

- How would you solve it if length-5 palindromic subsequences were required?  
  *Hint: Would your approach scale? Think about the number and their symmetry properties.*

- Can you do this in a single pass with precomputation (prefix/suffix data)?  
  *Hint: Consider prefix/suffix arrays of character occurrences, so middle character can be checked efficiently.*

### Summary
This problem uses a **pattern of sliding window/interval search for first-and-last appearance** of characters, and **set-based counting for uniqueness**. The final code efficiently counts all "aba"-form palindromic subsequences by fixing the outer letter and searching for all inner possibilities.  
This pattern applies wherever you need to fix outer structure and enumerate middle variations, especially with small alphabets or fixed-size subsequences.  
Common in problems involving **palindromic substrings/subsequences, two pointers, character frequency, or set-based uniqueness.**