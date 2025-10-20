### Leetcode 2063 (Medium): Vowels of All Substrings [Practice](https://leetcode.com/problems/vowels-of-all-substrings)

### Description  
Given a string `word`, return the total number of vowels ('a', 'e', 'i', 'o', 'u') contained in **all possible non-empty substrings** of `word`.  
A single vowel may contribute to many substrings as part of different starting and ending indexes—so for each substring, count every vowel separately.

### Examples  

**Example 1:**  
Input: `word = "aba"`  
Output: `6`  
*Explanation: All substrings: "a", "ab", "aba", "b", "ba", "a".  
Vowel counts: "a"→1, "ab"→1, "aba"→2, "b"→0, "ba"→1, "a"→1;  
Total = 1 + 1 + 2 + 0 + 1 + 1 = 6.*

**Example 2:**  
Input: `word = "abc"`  
Output: `3`  
*Explanation: All substrings: "a", "ab", "abc", "b", "bc", "c".  
Vowel counts: "a"→1, "ab"→1, "abc"→1, (b, bc, c have 0 vowels); Total = 1 + 1 + 1 + 0 + 0 + 0 = 3.*

**Example 3:**  
Input: `word = "bcdfg"`  
Output: `0`  
*Explanation: All substrings have 0 vowels.*

### Thought Process (as if you’re the interviewee)  
A brute-force approach would list all possible substrings (n² of them), count vowels in each, and sum. This is inefficient for long strings (O(n³) total ops).  

To optimize:  
Notice each character at index i is present in (i+1) × (n-i) substrings:
- (i+1) choices for a starting position at or before i
- (n-i) choices for an ending position at or after i  
If a character is a vowel, it’s counted in all those substrings.  
So, for each vowel at position i, add (i+1) × (n-i) to the total.

This gives an O(n) single-pass solution, much better for long strings.

### Corner cases to consider  
- Empty string (`""`): should return 0.
- No vowels anywhere: should return 0.
- All vowels: every substring has as many vowels as possible.
- Very long string: must be O(n) or will timeout.
- Upper/lower case handling: per problem, only lowercase vowels count (`'A'` not a vowel).

### Solution

```python
def countVowels(word: str) -> int:
    n = len(word)
    vowels = {'a', 'e', 'i', 'o', 'u'}
    total = 0

    # For each character, check if it's a vowel
    for i, c in enumerate(word):
        if c in vowels:
            # Each vowel at index i is in (i+1) * (n-i) substrings
            count = (i + 1) * (n - i)
            total += count
            # Debug: print(f"Vowel {c} at {i}: contributes {count}")

    return total
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — One pass through the string, each letter checked once.
- **Space Complexity:** O(1) — Only a set of vowels and a few integer variables; no extra storage based on input length.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string is in uppercase or mixed-case?  
  *Hint: Should we map to lowercase first, or adjust our vowels set?*

- How would you extend this to count ALL consonants in all substrings?  
  *Hint: Just change the set of counted characters.*

- What would you do if the substring is restricted (e.g., only consider substrings of length exactly k)?  
  *Hint: Change the counting formula for each position to count only such substrings.*

### Summary
This problem is a great example of **combinatorics plus string traversal**—the formula for substring presence of each character means you can count contributions in linear time, instead of brute-force substring enumeration. This approach—counting pattern contributions efficiently—is common in substring/suffix and window-based problems.


### Flashcard
Calculate vowel counts in substrings efficiently by considering each character's contribution.

### Tags
Math(#math), String(#string), Dynamic Programming(#dynamic-programming), Combinatorics(#combinatorics)

### Similar Problems
- Number of Substrings Containing All Three Characters(number-of-substrings-containing-all-three-characters) (Medium)
- Total Appeal of A String(total-appeal-of-a-string) (Hard)