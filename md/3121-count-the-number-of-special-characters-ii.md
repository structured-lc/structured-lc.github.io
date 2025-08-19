### Leetcode 3121 (Medium): Count the Number of Special Characters II [Practice](https://leetcode.com/problems/count-the-number-of-special-characters-ii)

### Description  
Given a string `word`, a letter `c` is called **special** if:
- `c` appears **both** in lowercase and uppercase in `word`, and
- Every occurrence of lowercase `c` appears **before** the first occurrence of uppercase `C` in `word`.

Return the number of such special letters in the string.

Example: For `"aaAbcBC"`, `'a'` is special because all `'a'`s appear before the first `'A'` and both `'a'` and `'A'` are present. Do this check for all letters.

### Examples  

**Example 1:**  
Input: `word = "aaAbcBC"`  
Output: `3`  
*Explanation: The special characters are 'a', 'b', and 'c':
- All 'a' (positions 0, 1) come before the first 'A' (position 2).
- Both 'b' and 'B' are present, and 'b' (position 4) is before the first 'B' (position 5).
- Both 'c' and 'C' are present, and 'c' (position 6) is before the first 'C' (does not exist in this string, but 'c' comes before any uppercase version if it exists).*

**Example 2:**  
Input: `word = "abc"`  
Output: `0`  
*Explanation: No letter appears in both lowercase and uppercase; result is 0.*

**Example 3:**  
Input: `word = "AbBCab"`  
Output: `0`  
*Explanation: For letter 'a', the uppercase 'A' (position 0) occurs before any 'a'. For 'b', lowercase 'b' (positions 4, 5) come after 'B' (positions 1, 2). No letter meets the requirement.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** For each letter, scan the string and check where lowercase and uppercase versions appear. Check if all lowercase `c` come before any uppercase `C`. This is O(26 × n), inefficient for long strings.
- **Optimized Approach:** 
  - Store the **last occurrence index** of each lowercase letter and the **first occurrence index** of each uppercase letter.
  - For each letter (`'a'` to `'z'`), if both the lowercase and uppercase exist, and last lowercase comes before first uppercase, increment the result.
  - This approach is O(n) since it just requires single passes and a scan for 26 letters.

*Tradeoff: Uses extra storage for indices, but remains constant-sized arrays.*

### Corner cases to consider  
- String with no uppercase letters.
- String with no lowercase letters.
- A letter appears only in one case.
- Mix of many duplicates/interleaved cases.
- All lowercase occur **after** uppercase; should not count.
- Lowercase and uppercase never both present.

### Solution

```python
def numberOfSpecialChars(word: str) -> int:
    # Initialize storage for last occurrence of lowercase and first occurrence of uppercase
    last_lower = [-1] * 26      # 'a' to 'z'
    first_upper = [len(word)] * 26  # 'A' to 'Z', start with a high value

    for idx, ch in enumerate(word):
        if 'a' <= ch <= 'z':
            last_lower[ord(ch) - ord('a')] = idx  # update last seen position
        elif 'A' <= ch <= 'Z':
            # only set if first time
            i = ord(ch) - ord('A')
            if first_upper[i] == len(word):
                first_upper[i] = idx

    special_count = 0
    for i in range(26):
        # Both cases must exist, and all lowercase appear before any uppercase
        if last_lower[i] != -1 and first_upper[i] != len(word):
            if last_lower[i] < first_upper[i]:
                special_count += 1

    return special_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Single pass for the string, plus check for 26 letters.
- **Space Complexity:** O(1)  
  Only arrays of size 26, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle case with Unicode (e.g., non-English letters)?
  *Hint: Think about generalizing to unicode points and possibly using dictionaries.*

- How to handle dynamic updates: If the string is being edited constantly, how would you re-compute efficiently?
  *Hint: Consider segment trees or dynamic programming.*

- What if you want to report **which** letters are special, not just the count?
  *Hint: Store the letters themselves if they meet the criteria.*

### Summary
This problem is a variation of string/window/prefix check patterns, compressing info per letter and validating in linear time. The pattern—tracking character first/last occurrences—is common for scanline or range-tracking in strings, and applies to many substring order, window, and character uniqueness problems.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Detect Capital(detect-capital) (Easy)
- Greatest English Letter in Upper and Lower Case(greatest-english-letter-in-upper-and-lower-case) (Easy)
- Count the Number of Special Characters I(count-the-number-of-special-characters-i) (Easy)