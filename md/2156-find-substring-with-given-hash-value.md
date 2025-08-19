### Leetcode 2156 (Hard): Find Substring With Given Hash Value [Practice](https://leetcode.com/problems/find-substring-with-given-hash-value)

### Description  
Given a string **s** and integers **power**, **modulo**, **k**, and **hashValue**, find and return the first substring of length **k** in **s** (from the left) such that its hash, computed by:

val(s) × power⁰ + val(s[1]) × power¹ + ... + val(s[k-1]) × powerᵏ⁻¹  mod modulo

(where val(c) is the 1-based position of c in 'a'-'z'), is equal to **hashValue**.  
The substring must be contiguous and test cases ensure an answer always exists.

### Examples  

**Example 1:**  
Input: `s = "leetcode", power = 7, modulo = 20, k = 2, hashValue = 0`  
Output: `"ee"`  
Explanation:  
val('e') = 5  
Hash("ee") = 5 × 1 + 5 × 7 = 5 + 35 = 40; 40 mod 20 = 0.  
"ee" is the first substring of length 2 with hashValue 0.

**Example 2:**  
Input: `s = "fbxzaad", power = 31, modulo = 100, k = 3, hashValue = 32`  
Output: `"fbx"`  
Explanation:  
Hash("fbx") = 6 × 1 + 2 × 31 + 24 × 31² = 6 + 62 + 23,064 = 23,132  
23,132 mod 100 = 32.  
So, "fbx" fits.

**Example 3:**  
Input: `s = "xmmhdakfursinye", power = 96, modulo = 45, k = 15, hashValue = 21`  
Output: `"xmmhdakfursinye"`  
Explanation:  
There's only one substring of length 15, and its hashValue is 21.

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  For every substring of length **k**, calculate the hash using the given function, and return the first substring that matches **hashValue**.  
  This is O(n\*k) since there are n−k+1 substrings, and each hash takes O(k) time.

- **Optimization:**  
  The hash function is a rolling hash, similar to Rabin-Karp.  
  We can efficiently compute each next substring's hash from the previous hash in O(1), by:
  - Removing the contribution of the character sliding out (multiplied by the highest power)
  - Dividing remainder by power (since we are moving one step to the right)
  - Adding contribution of the new character at the end

  But the power terms—and the way the hash function is defined—mean this approach is easier working from the *end* of the string, so that coefficients increase from right to left and the incoming character always comes with power⁰.

  Thus, iterate from the right, update the rolling hash as you form each substring, and update an answer as soon as its hash equals **hashValue**.

- **Trade-offs:**  
  - Brute-force: easy, slow.
  - Rolling hash: more involved, but efficient and avoids unnecessary recalculation, with O(n) time.  
  - Care needed with modulo arithmetic to prevent negative numbers.



### Corner cases to consider  
- Substrings at the start or end (ensure index math is correct)
- All characters are same
- k = 1 or k = len(s)
- Any possible modulo behavior (large/small numbers, zero)
- s contains minimum or maximum possible characters



### Solution

```python
def subStrHash(s: str, power: int, modulo: int, k: int, hashValue: int) -> str:
    n = len(s)
    # Rolling hash from the right
    result_index = 0
    current_hash = 0
    power_k = 1
    res = -1
    
    # Precompute powerᵏ mod modulo for scaling out char that leaves window
    for _ in range(k):
        power_k = (power_k * power) % modulo

    # We'll go right-to-left to add chars at left as power⁰
    # For window [i, i+k-1], loop i from n-1 to 0
    for i in range(n-1, -1, -1):
        char_val = ord(s[i]) - ord('a') + 1
        # Add incoming char at left
        current_hash = (current_hash * power + char_val) % modulo

        # If window too big, remove out-going char at right
        if i + k < n:
            out_val = ord(s[i + k]) - ord('a') + 1
            current_hash = (current_hash - out_val * power_k) % modulo
            # ensure non-negative modulo
            if current_hash < 0:
                current_hash += modulo

        # Check if hash matches when window is exactly k
        if n - i >= k and current_hash == hashValue:
            res = i

    return s[res:res + k]
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Each character is visited once, with constant time work for updating the rolling hash.

- **Space Complexity:** O(1)  
  Only a fixed number of variables; no extra space proportional to input.


### Potential follow-up questions (as if you’re the interviewer)  

- What if the alphabet can include uppercase, digits, or symbols?  
  *Hint: How would you map character values, or generalize val(c)?*

- How do you avoid hash collision if power or modulo are chosen poorly?  
  *Hint: Can you use a double-hash or better hash parameters?*

- How to return all such substrings with the correct hash value, not just the first?  
  *Hint: Save the indices where the rolling hash matches.*


### Summary
This problem uses the **rolling hash** (like Rabin-Karp) to slide a window over a string and efficiently compute hash values for all substrings of fixed length, achieving O(n) performance. The pattern arises in substring search, duplicate substring detection, and is commonly used in bioinformatics and text search algorithms. The key insight is reversing the direction to fit the hash function so new characters are always at power⁰, simplifying modular math and implementation.

### Tags
String(#string), Sliding Window(#sliding-window), Rolling Hash(#rolling-hash), Hash Function(#hash-function)

### Similar Problems
- Distinct Echo Substrings(distinct-echo-substrings) (Hard)