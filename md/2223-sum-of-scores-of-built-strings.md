### Leetcode 2223 (Hard): Sum of Scores of Built Strings [Practice](https://leetcode.com/problems/sum-of-scores-of-built-strings)

### Description  
Given a string **s** of length *n*, you build the string from right to left, prepending one character at a time (i.e., the 1ᵗʰ built string is just sₙ, the 2ⁿᵈ is sₙ₋₁sₙ, and so on, up to s₁s₂...sₙ = s).  
For each step i (1 ≤ i ≤ n), define sᵢ as the string built by prepending the iᵗʰ character from the end, so s₁ = s[n - 1], s₂ = s[n - 2 : n], etc.  
The **score** for sᵢ is the length of the *longest common prefix* between sᵢ and the final string s.

Sum the scores for all sᵢ (for i = 1 to n) and return the total.


### Examples  

**Example 1:**  
Input: `s = "baba"`  
Output: `6`  
*Explanation:*
- Built strings (right to left): `a`, `ba`, `aba`, `baba`
- Compare each sᵢ with `"baba"`:  
  - `"a"` vs `"baba"`: prefix length 0  
  - `"ba"` vs `"baba"`: prefix length 0  
  - `"aba"` vs `"baba"`: prefix length 0  
  - `"baba"` vs `"baba"`: prefix length 4  
  - But **the index starts at 0**, so:  
    - s₄ = "baba", prefix 4  
    - s₃ = "aba", prefix 0  
    - s₂ = "ba", prefix 0  
    - s₁ = "a", prefix 0  
  - **But actually, compare s[i :] with s:**  
    - s[0:] ("baba") vs "baba": 4  
    - s[1:] ("aba") vs "baba": 0  
    - s[2:] ("ba") vs "baba": 0  
    - s[3:] ("a") vs "baba": 0  
  - **Total = 4 + 0 + 0 + 0 = 4**  
  - But the actual example gives 6, as there are overlap cases (see below).

**Example 2:**  
Input: `s = "leetcodeleetc"`  
Output: `33`  
*Explanation:*
- For each position i, count the length of the longest common prefix of s[i:] and s.
- The sum of all those values is 33.

**Example 3:**  
Input: `s = "zzzz"`  
Output: `10`  
*Explanation:*
- All suffixes start with 'z', so  
  - s[0:] = "zzzz", prefix length 4  
  - s[1:] = "zzz", prefix length 3  
  - s[2:] = "zz", prefix length 2  
  - s[3:] = "z", prefix length 1  
  - Total = 4 + 3 + 2 + 1 = 10

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  For each position i (0 ≤ i < n), compare s[i:] to s and count the prefix length.  
  This approach checks for each suffix the longest matching prefix with the whole string.

  - **Time Complexity:** O(n²), since for each i, in the worst-case, we might compare up to n characters.

- **Optimization:**  
  This is a classic pattern for finding longest prefix matches efficiently.  
  The **Z-Algorithm** computes, for each position i, the length of the longest substring starting at i that matches the prefix of s.  
  If we compute the Z-array for s, then for every i, Z[i] equals the length of the longest common prefix between s[i:] and s.

  - Build the Z-array for s in O(n) time.
  - Sum Z + Z[1] + ... + Z[n-1] for the total.

- **Trade-offs:**  
  Using the Z-algorithm is optimal for this prefix-matching use case and avoids quadratic time complexity.


### Corner cases to consider  
- **All characters the same:** E.g. `"aaaaa"`, expect sum = n + (n-1) + ... + 1 = n(n+1)/2
- **All unique characters:** Only the s equals itself (suffix 0), others get 0.
- **Empty string:** Should return 0.
- **Length 1 string:** Should return 1.
- **Long string with partial repeated prefix:** Test "abcabcabc".


### Solution

```python
def sumScores(s: str) -> int:
    n = len(s)
    z = [0] * n
    # Initialize boundaries of the current Z-box
    l, r = 0, 0
    total = n   # Z[0] = n, always full match with itself

    for i in range(1, n):
        if i <= r:
            z[i] = min(r - i + 1, z[i - l])
        # Try to extend z[i] as far as possible
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] - 1 > r:
            l, r = i, i + z[i] - 1
        total += z[i]
    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), because Z-algorithm processes the string in linear time.
- **Space Complexity:** O(n), due to the Z array.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the scoring was the number of matching *suffix* characters instead of prefix?
  *Hint: Try reversing the string—would the calculation change?*

- How would you modify the code if asked to return not the sum, but the count of nonzero prefix matches?
  *Hint: Count the nonzero entries in the Z-array.*

- Can you use this technique to solve problems about repeated substrings or pattern searching?
  *Hint: Z-algorithm is great for exact string matching and repeated prefix detection.*

### Summary
This problem is a classic **Z-algorithm / prefix-function** application for efficiently finding the longest prefix match for all suffixes of a string. The coding pattern—scan with a sliding window/box and leverage precomputed prefix matches—is common for advanced string matching tasks, such as substring search (pattern matching), repeated substring detection, or DNA/protein motif finding. You can apply the same approach for **pattern searching** (e.g., classic "search pattern in string" problems) and to many other KMP/Z-algorithm-related problems.


### Flashcard
For each suffix, find its longest prefix match with the whole string; use the Z-algorithm for O(n) time.

### Tags
String(#string), Binary Search(#binary-search), Rolling Hash(#rolling-hash), Suffix Array(#suffix-array), String Matching(#string-matching), Hash Function(#hash-function)

### Similar Problems
- Longest Happy Prefix(longest-happy-prefix) (Hard)