### Leetcode 2663 (Hard): Lexicographically Smallest Beautiful String [Practice](https://leetcode.com/problems/lexicographically-smallest-beautiful-string)

### Description  
Given a string `s` of length `n`, where each character is a lowercase English letter and an integer `k` (2 ≤ k ≤ 26), return the **lexicographically smallest** string strictly greater than `s`, of the same length, consisting only of the first `k` lowercase letters, that does **not contain any palindromic substring** of length `2` or `3`.

- A substring is a palindrome if it reads the same forwards and backwards.
- "Strictly greater" means: the returned string must be lexicographically larger than `s`, but as small as possible beyond `s`.
- For example, with k = 3, valid characters are 'a', 'b', 'c'.
- If no such string exists, return `""`.

### Examples  

**Example 1:**  
Input: `"abcz"`, `k=4`  
Output: `"abda"`  
*Explanation: The next string greater than "abcz" using ['a', 'b', 'c', 'd'], that's not containing any 2 or 3 length palindromes, is "abda".*

**Example 2:**  
Input: `"aaa"`, `k=3`  
Output: `"aba"`  
*Explanation: "aaa" → next greater is "aab", but "aab" contains "aa" (palindrome), next is "aac", "aac" contains "aa"; finally, "aba" is valid ("ab", "ba", "ab" are not palindromic substrings of length 2 or 3).*

**Example 3:**  
Input: `"cba"`, `k=3`  
Output: `""`  
*Explanation: All possible strings greater than "cba" using 'a','b','c' violate the no-palindrome rule. So answer is empty string.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Try every string greater than `s` and check the palindrome property. This is exponential in time complexity (up to kⁿ), so it's not feasible for large `n`.
- **Optimization:**  
  Notice that the lex smallest string > s is very similar to incrementing a lexicographically ordered string (like counting in base-k numerals).  
  For each position from right to left, try incrementing it while ensuring:
  - The character does **not equal** the previous (`i-1`) or second previous character (`i-2`). This prevents palindromic substrings of length 2 and 3.
- Once a valid increment is found, fill the rest (positions after i) with the smallest possible valid characters, obeying the palindromic constraint.
- This is a **greedy construction** with backtracking at each index if we cannot satisfy the constraint.
- We choose this approach because it is both correct and efficient:  
  - Greedy on rightmost for ‘minimum increment’
  - Greedy for filling with smallest legal chars gives lex smallest

### Corner cases to consider  
- s = "zzzz" with k < 26 (all at max char) -- likely no answer.
- Only 1 valid character (k=1) -- impossible since every substring will be palindrome.
- Consecutive identical chars at end, e.g., "aaba" or "abbc".
- The answer barely changes s, e.g., only last character is changed.
- The answer changes earliest possible significant position.
- No next valid string exists (must detect).

### Solution

```python
def smallestBeautifulString(s: str, k: int) -> str:
    n = len(s)
    cs = list(s)
    # Convert to integer values for easier manipulation
    for i in reversed(range(n)):
        # Try to increment position i
        for next_c in range(ord(cs[i]) - ord('a') + 1, k):
            char = chr(ord('a') + next_c)
            # Check for palindrome restrictions:
            if i >= 1 and cs[i-1] == char:
                continue
            if i >= 2 and cs[i-2] == char:
                continue
            # Place char at cs[i]
            cs[i] = char
            # Fill the rest (i+1 to end) with the smallest valid chars
            for j in range(i+1, n):
                for cand in range(k):
                    fill_char = chr(ord('a') + cand)
                    if (j >= 1 and cs[j-1] == fill_char) or (j >= 2 and cs[j-2] == fill_char):
                        continue
                    cs[j] = fill_char
                    break
            return ''.join(cs)
        # If cannot increment at i, will try to the next left position
    return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × k)  
  For each of the n positions, we may try up to k possible replacements, and for updating remainder, at most k tries per fill step. Since string length is usually not huge, this is efficient.
- **Space Complexity:** O(n)  
  Only one array of n characters for mutable string construction.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize the function if k is very small or very large?
  *Hint: What changes in performance if k=2 or k=26?*

- What if palindromic substrings of length 4 are also disallowed?
  *Hint: How does the neighbor-check generalize for longer forbidden lengths?*

- Can you enumerate all possible beautiful strings of a given length and k?
  *Hint: This becomes a backtracking question with pruning based on previous characters.*

### Summary
This problem is a classic **greedy construction** with backtracking for string generation under adjacency constraints. By incrementing and greedily filling each position respecting forbidden local patterns, we efficiently find the minimal valid next string. The pattern used here appears in lexicographical string generation with local no-repeat/adjacency constraints, and also relates to problems in de Bruijn sequences or combinatorial generation with forbidden substrings.

### Tags
String(#string), Greedy(#greedy)

### Similar Problems
- Smallest String With Swaps(smallest-string-with-swaps) (Medium)
- Find Palindrome With Fixed Length(find-palindrome-with-fixed-length) (Medium)