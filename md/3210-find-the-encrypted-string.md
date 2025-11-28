### Leetcode 3210 (Easy): Find the Encrypted String [Practice](https://leetcode.com/problems/find-the-encrypted-string)

### Description  
Given a string `s` and an integer `k`, you want to "encrypt" the string using this rule:  
For every character at position `i` in `s`, replace it with the character that is `k` positions ahead, wrapping around to the beginning of the string if necessary. This means, for each `i`, the new character will be at index `(i + k) % n`, where `n` is the length of `s`.  
Return the encrypted string after applying this transformation to each character.

### Examples  

**Example 1:**  
Input: `s = "dart", k = 3`  
Output: `"tdar"`  
*Explanation:*
- n = 4; indices: 0="d", 1="a", 2="r", 3="t".
- Encrypted:  
  index 0 → (0+3)%4 = 3 ⇒ "t"  
  index 1 → (1+3)%4 = 0 ⇒ "d"  
  index 2 → (2+3)%4 = 1 ⇒ "a"  
  index 3 → (3+3)%4 = 2 ⇒ "r"  
  So, output is "tdar".

**Example 2:**  
Input: `s = "aaa", k = 1`  
Output: `"aaa"`  
*Explanation:*
- All characters are the same, so after any cyclic shift, the result remains "aaa".

**Example 3:**  
Input: `s = "leetcode", k = 4`  
Output: `"codeltee"`  
*Explanation:*
- n = 8  
  index 0 → (0+4)%8 = 4 ⇒ "c"  
  index 1 → (1+4)%8 = 5 ⇒ "o"  
  index 2 → (2+4)%8 = 6 ⇒ "d"  
  index 3 → (3+4)%8 = 7 ⇒ "e"  
  index 4 → (4+4)%8 = 0 ⇒ "l"  
  index 5 → (5+4)%8 = 1 ⇒ "t"  
  index 6 → (6+4)%8 = 2 ⇒ "e"  
  index 7 → (7+4)%8 = 3 ⇒ "e"  

### Thought Process (as if you’re the interviewee)  
- **Brute-force**: For each character at index `i`, we can manually compute `(i + k) % n` and build a new result by mapping to the character at that position.
- **Optimization**: Instead of repeated lookups, recognize that this is a cyclic right-shift of the string by `k` positions. So, for each `i`, position it at `(i + k) % n` in the result.
- Alternatively, to generate the encrypted string in order, for index `i` in the output, pick `s[(i + k) % n]`.
- Both approaches have the same time and space complexity, but shifting and then joining the result is straightforward and readable.
- **Trade-off**: By building a new array of the same length, we avoid in-place modifications, which could be tricky due to overlapping replacements.

### Corner cases to consider  
- k = 0 (no encryption, output same as input)
- k ≥ n (since `(i+k)%n` cycles back, so just use `k % n`)
- All identical characters ("aaa")
- Single character (`s = "z"`)
- Edge of wrap-around (input like `abc`, k = 2)
- Empty string (problem constraints: 1 ≤ s.length, so doesn’t occur here)
- Maximum k (k = 10)
- Maximum s length (n = 100)

### Solution

```python
def get_encrypted_string(s: str, k: int) -> str:
    # Step 1: Length of the string
    n = len(s)
    # Step 2: Make sure k is within range (since k can be ≥ n)
    k = k % n
    # Step 3: For each index, find (i + k) % n and build result
    result = []
    for i in range(n):
        # Shift i by k, wrap using modulo n
        result.append(s[(i + k) % n])
    # Step 4: Join the list to create output string
    return ''.join(result)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is length of `s`. We visit each character once to build the result.
- **Space Complexity:** O(n), for the result string (excluding input).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle the case where the input is a very large string and you must encrypt in place?
  *Hint: Think about overlapping writes and cycle decompositions for in-place rotations.*

- How would you encrypt only a substring of `s` instead of the whole string?
  *Hint: Consider indices range and modify the algorithm only within that range.*

- What if k could be negative (left shift)?
  *Hint: Adjust modulo arithmetic to handle negative k values properly.*

### Summary
This problem is a classic example of **cyclic array/string rotation** and modular indexing. The approach uses simple modular arithmetic and indexed lookup, a common technique in circular buffer problems and rotating arrays. The pattern appears in problems like rotate array, right or left shifting strings, and even in some cryptography basics. The key insight is using (i + k) % n for cyclic access without extra checks for wrapping.


### Flashcard
Recognize cyclic right-shift by k; output character at position (i - k + n) % n for each index i.

### Tags
String(#string)

### Similar Problems
