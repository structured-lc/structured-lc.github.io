### Leetcode 3136 (Easy): Valid Word [Practice](https://leetcode.com/problems/valid-word)

### Description  
Given a string word, the goal is to determine if it's a **valid word**.  
A word is valid if:
- It has at least 3 characters
- It contains **only** digits (0-9) and English letters (A-Z, a-z)
- It includes **at least one vowel** ('a', 'e', 'i', 'o', 'u', case-insensitive)
- It includes **at least one consonant** (any English letter that is **not** a vowel, case-insensitive)
Digits are *allowed*, but do not count as vowels or consonants.  
Return true if all these conditions are met; otherwise, return false.

### Examples  

**Example 1:**  
Input: `word = "234Adas"`  
Output: `true`  
*Explanation:  
- Length is 7 (≥3)  
- Only digits and letters  
- Vowels present: 'A', 'a'  
- Consonants present: 'd', 's'*  

**Example 2:**  
Input: `word = "b3"`  
Output: `false`  
*Explanation:  
- Length is 2 (<3)  
- Only digits and letters  
- No vowels present  
- Consonants: 'b'  
- Too short and missing vowel*  

**Example 3:**  
Input: `word = "a3$e"`  
Output: `false`  
*Explanation:  
- Contains invalid character '$'  
- Has vowels: 'a', 'e'  
- No consonant*  


### Thought Process (as if you’re the interviewee)  
I’ll start by analyzing the constraints, then tackle each requirement step by step.

- **Brute-force idea:**  
  - Loop through the string and check each character for validity (must be a digit or English letter).  
  - Count the length; if <3, return false immediately.  
  - Track if we’ve seen at least one vowel *and* at least one consonant.
  
- **Optimization:**  
  - Since the word is very short (max length = 20), a single pass is sufficient.  
  - We don’t need sets for vowels, can just check directly.  
  - Maintain two flags (`has_vowel`, `has_consonant`).  
  - If all chars are validated during traversal, and both flags are set, return true at the end.

**Trade-offs:**  
Single pass is clean and optimal (no extra data structures).  
No need to over-engineer for such a short string: simplicity + correctness.


### Corner cases to consider  
- Empty string: not possible (length constraint, but should return false for len < 3)  
- All digits: should fail (no vowels/consonants)  
- Only vowels or only consonants: should fail  
- Invalid character at any position: must fail  
- Exactly 3 chars, barely meeting criteria  
- Case sensitivity for vowels/consonants  
- Digits present: should not count as vowel/consonant  
- Repeated vowels/consonants: still fine, only need at least one of each  
- String with special chars: must fail

### Solution

```python
def isValidWord(word: str) -> bool:
    # If length is less than 3, return False immediately
    if len(word) < 3:
        return False

    # Define vowel set (both lowercase and uppercase for efficiency)
    vowels = set('aeiouAEIOU')

    has_vowel = False
    has_consonant = False

    for ch in word:
        if ch.isdigit():
            # Digits allowed, but don't count as vowel/consonant
            continue
        if ch.isalpha():
            # Is a letter
            if ch in vowels:
                has_vowel = True
            else:
                has_consonant = True
        else:
            # Invalid character found
            return False

    # Valid if both a vowel and a consonant are present
    return has_vowel and has_consonant
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n)  
  Where n = length of the string (≤20). We scan all characters once.

- **Space Complexity:** O(1)  
  Uses only a constant amount of extra space (for flags and vowel set). Does not depend on input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we want to ignore case sensitivity?  
  *Hint: Use `lower()` or `upper()` when checking vowels/consonants.*

- How would you handle Unicode or accents (like é, ñ)?  
  *Hint: Could normalize characters, or expand checks using `unicodedata`.*

- Can the code be further optimized for extremely large input?  
  *Hint: With known constraints, current code is optimal; for streaming, consider character reading pipeline.*


### Summary
This is a **basic string validation** + flag-setting (state-checking) problem.  
Pattern: *Single pass, early exit on invalid data, track required features with flags.*  
This coding pattern is widely applicable for input validators/policy checkers, e.g., custom password rules, form validation, or lexical analyzers.  
Common in both interviews and daily software work for basic input sanitation and property enforcement.


### Flashcard
Single pass through string: check length ≥ 3, verify all chars are alphanumeric, and track presence of at least one vowel and one consonant.

### Tags
String(#string)

### Similar Problems
