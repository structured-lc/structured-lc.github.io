### Leetcode 1704 (Easy): Determine if String Halves Are Alike [Practice](https://leetcode.com/problems/determine-if-string-halves-are-alike)

### Description  
Given a string `s` of **even length**, split it into two halves: the first half `a` and the second half `b`. A string half is defined as "alike" if both halves contain the **same number of vowels** (a, e, i, o, u, both upper- and lower-case).  
Return `True` if the two halves are alike (same count of vowels), otherwise return `False`.  
*You are guaranteed the input string's length is even.*

### Examples  

**Example 1:**  
Input: `s = "book"`  
Output: `True`  
*Explanation: Split "book" into "bo" and "ok". "bo" has 1 vowel ('o'), "ok" also has 1 vowel ('o'). Both halves have 1 vowel → return True.*

**Example 2:**  
Input: `s = "textbook"`  
Output: `False`  
*Explanation: Split "textbook" into "text" and "book". "text" has 1 vowel ('e'); "book" has 2 vowels ('o', 'o'). 1 ≠ 2, so return False.*

**Example 3:**  
Input: `s = "AbCdEfGh"`  
Output: `True`  
*Explanation: Split into "AbCd" and "EfGh". "AbCd" has 1 vowel ('A'), "EfGh" has 1 vowel ('E'). Both halves have 1 vowel → return True.*

### Thought Process (as if you’re the interviewee)  
- **Brute force approach:**  
  - Split `s` into two halves at the middle index (`mid = len(s) // 2`).
  - For each half, count the number of vowels (consider both lowercase and uppercase vowels).
  - Compare the two counts and return True if they match.

- **Optimizations:**  
  - Avoid extra space by not creating new substring objects, and instead looping with indices to count vowels in-place.  
  - Use a set for vowels for O(1) lookup for each character.

- **Trade-offs:**  
  - Both substring and index-based approaches are O(n) time, but the index-based approach is more space-efficient (O(1) additional space).  
  - Substring creation is cleaner but can use O(n) additional space unnecessarily.

### Corner cases to consider  
- All consonant strings: e.g., "bzzzmmmm" → both halves have 0 vowels, so they are alike.
- All vowel strings: e.g., "AAee" → both halves have equal vowels.
- Case sensitivity: e.g., "AaBb" → uppercase and lowercase vowels must be counted.
- Empty string: Problem guarantees even length, assume at least length 2.

### Solution

```python
def halves_are_alike(s: str) -> bool:
    # Set containing all vowels (both lower and upper case)
    vowels = {'a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'}
    n = len(s)
    mid = n // 2

    # Count vowels in both halves
    left_count = 0
    right_count = 0

    for i in range(mid):
        if s[i] in vowels:
            left_count += 1
        if s[mid + i] in vowels:
            right_count += 1

    # Check if both halves have the same number of vowels
    return left_count == right_count
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the string. Each character is examined exactly once.
- **Space Complexity:** O(1). Only a set for vowels and a few counters are used, all of which are independent of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify your solution if the string length can be odd?  
  *Hint: Consider what "halves" means for odd-length, and whether to round down, or include a middle char.*

- What changes if you must support any arbitrary set of "alike" characters, not just vowels?  
  *Hint: Use a parameterized set instead of hardcoding vowels.*

- Could you solve the problem with a one-pass solution (single scan), using two pointers?  
  *Hint: Initialize pointers at both ends and move towards the middle.*

### Summary
We use a **counting/partition pattern**: scan two halves of the string and compare features (here, vowel count). It's a standard approach for "split and compare" problems. Variants of this logic apply to palindrome checks, balancing problems, and any task requiring symmetrical evaluation of string halves.