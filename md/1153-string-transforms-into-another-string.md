### Leetcode 1153 (Hard): String Transforms Into Another String [Practice](https://leetcode.com/problems/string-transforms-into-another-string)

### Description  
You’re given two strings **str1** and **str2** of the same length, both containing only lowercase English letters.  
In each move, you can pick a character ch from **str1** and change **all its occurrences** to any other lowercase letter.  
Your task: determine if it’s possible—through zero or more such conversions—to transform **str1** into **str2**.

### Examples  

**Example 1:**  
Input: `str1 = "aabcc", str2 = "ccdee"`  
Output: `true`  
Explanation: Convert all `'c'`→`'e'`, then all `'b'`→`'d'`, then all `'a'`→`'c'`. The order matters. Each transformation rewrites every instance at once.

**Example 2:**  
Input: `str1 = "vultrcore", str2 = "corevultr"`  
Output: `false`  
Explanation: No possible sequence of character-conversion steps will resolve conflicting mappings.

**Example 3:**  
Input: `str1 = "leetcode", str2 = "codeleet"`  
Output: `false`  
Explanation: Mapping `'l'` or `'e'` would cause conflicts—multiple source characters targeting the same destination without a free character as a buffer.

### Thought Process (as if you’re the interviewee)  

Start brute-force: try every order of conversions, but with 26! possibilities, this is intractable.

**Main Observations:**
- You must map each letter in **str1** consistently to the corresponding letter in **str2**.
- If a letter in **str1** must map to two different letters in **str2** (e.g., `'a'`→`'x'` in one place and `'a'`→`'y'` elsewhere), it’s impossible.
- If **str2** uses *all 26* different letters, and you still need to “free up” a character, you’re stuck—no spare character for the temporary mapping.

**Optimized approach:**
- For each letter ch in **str1**, note what it maps to in **str2**.
- If at any point a letter must map to different targets, return `False`.
- If **str1 == str2**, return `True` (already matching).
- If **str2** uses <26 different letters, it is always possible (a “buffer” character allows breaking mapping cycles).
- If **str2** uses 26 distinct letters, you cannot break cycles, so mapping is only possible if **str1 == str2**.

### Corner cases to consider  
- Both strings are already equal (`str1 == str2`)
- **str2** contains all 26 lowercase letters: only a perfect mapping will work
- A character in **str1** maps to multiple targets in **str2**
- Empty strings (shouldn’t occur due to constraints)
- Repeated characters that swap into one another (cycles: a→b, b→a)
- Length 1 strings

### Solution

```python
def canConvert(str1, str2):
    # If strings are already equal, nothing to convert
    if str1 == str2:
        return True

    # Build mapping str1_char -> str2_char
    mapping = {}
    for ch1, ch2 in zip(str1, str2):
        if ch1 in mapping:
            # Inconsistent mapping is impossible
            if mapping[ch1] != ch2:
                return False
        else:
            mapping[ch1] = ch2

    # If str2 uses all 26 letters, no spare char to break cycles
    if len(set(str2)) == 26:
        return False

    # Possible to convert (consistent mapping and at least one buffer character available)
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Where n = length of **str1**/**str2**. Each character is traversed once for mapping.
- **Space Complexity:** O(1)  
  The mapping dictionary and set are bounded by constant alphabet size (max 26).

### Potential follow-up questions (as if you’re the interviewer)  

- What if characters were allowed to be mapped only once (not all at once)?
  *Hint: Would you need to track positions instead of global mappings?*

- How would your approach change if both strings could use uppercase and lowercase (52 letters)?
  *Hint: Does buffer character logic generalize?*

- Can this be extended to Unicode characters or non-ascii alphabets?
  *Hint: How would you generalize unique character counting and mapping logic?*

### Summary
This problem is a **string mapping** and **cycle detection (with buffer character)** pattern problem. It applies to problems involving **global character substitution** and the need to handle cycles, similar to graph mapping and topological sorting in disguise. The main insight is that having a spare/unused character allows breaking mapping cycles; without it, only trivial (equal strings) mapping is possible. This pattern recurs in various data normalization and translation tasks.


### Flashcard
Map each letter in str1 to str2 consistently; if str2 uses all 26 letters and cycles are needed, transformation is impossible.

### Tags
Hash Table(#hash-table), String(#string), Graph(#graph)

### Similar Problems
