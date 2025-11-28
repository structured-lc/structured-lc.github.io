### Leetcode 3305 (Medium): Count of Substrings Containing Every Vowel and K Consonants I [Practice](https://leetcode.com/problems/count-of-substrings-containing-every-vowel-and-k-consonants-i)

### Description  
Given a string `word` and a non-negative integer `k`, **return the total number of substrings** of `word` that contain **every vowel** ('a', 'e', 'i', 'o', 'u') at least once and **exactly k consonants**.  
- Vowels can appear multiple times, but each one (a, e, i, o, u) must appear at least once in the substring.
- Consonants are all lowercase letters that are not vowels.
- Substrings are contiguous sequences within `word`.

### Examples  

**Example 1:**  
Input: `word = "aeioqq", k = 1`  
Output: `0`  
*Explanation: No substring contains all five vowels at least once, so output is 0.*

**Example 2:**  
Input: `word = "aeiou", k = 0`  
Output: `1`  
*Explanation: Only one substring ("aeiou") contains all vowels exactly once and no consonants.*

**Example 3:**  
Input: `word = "ieaouqqieaouqq", k = 1`  
Output: `3`  
*Explanation: The substrings are: "ieaouq" (0..5), "qieaou" (6..11), and "ieaouq" (7..12). Each contains all vowels and one consonant ('q').*

### Thought Process (as if you’re the interviewee)  

- **Brute force:**  
  Try all possible substrings (`O(n²)`), and for each check if it contains all vowels and exactly `k` consonants.  
  But this is slow; substring checking and vowel/consonant counting is costly.

- **Optimization - Sliding Window:**  
  Since substring constraints involve presence of all vowels and a precise consonant count, we can:
    - Use a sliding window and keep expanding the right pointer.
    - Maintain vowel set/counter and consonant count as we slide.
    - But, we need "every vowel present at least once" and exactly `k` consonants.
    - Count substrings with at most k consonants and every vowel, and subtract substrings with at most (k-1) consonants and every vowel.
    - The difference gives us substrings with exactly k consonants.

- **Why this approach:**  
  The "at most K" trick lets us count in `O(n)` per k using a sliding window, which is efficient for mid-length strings.

### Corner cases to consider  
- Empty string or fewer than 5 letters: Output is always 0.
- k = 0: Substrings must have all vowels and no consonants (only possible with "aeiou" in sequence).
- String with no vowels or missing some vowels: Output is 0.
- All vowels are present but distributed such that no substring contains all at once.
- k exceeds possible consonant count in substrings of length ≥5.

### Solution

```python
def count_of_substrings(word: str, k: int) -> int:
    vowels = set('aeiou')
    
    def substrings_with_at_most(kc):
        if kc < 0:
            return 0
        res = 0
        left = 0
        vowel_last_seen = {}
        vowel_count = 0
        unique_vowels = 0
        consonants = 0
        
        for right, ch in enumerate(word):
            if ch in vowels:
                # New appearance or outside the current window
                if ch not in vowel_last_seen or vowel_last_seen[ch] < left:
                    unique_vowels += 1
                vowel_last_seen[ch] = right
            else:
                consonants += 1
            # Shrink window until at most kc consonants
            while consonants > kc:
                if word[left] in vowels:
                    if vowel_last_seen[word[left]] == left:
                        unique_vowels -= 1
                else:
                    consonants -= 1
                left += 1
            # If all 5 vowels present, count all valid substrings ending at right
            if unique_vowels == 5:
                min_start = min(vowel_last_seen[v] for v in vowels)
                res += min_start - left + 1
        return res

    return substrings_with_at_most(k) - substrings_with_at_most(k - 1)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = length of word.  
  Each character is processed at most twice (once in, once out of window). Inner min() is over constant size (5 vowels).

- **Space Complexity:** O(1).  
  We only keep per-vowel last-seen indices and a few counters, all constant additional space regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the set of vowels is arbitrary, or may change at runtime?  
  *Hint: Make vowel set a variable or input parameter; generalize approach.*

- If the string is millions of characters long, how does performance scale?  
  *Hint: Discuss true linear behavior and constant-space characteristics of the algorithm.*

- Can you extend this to count substrings with at least k consonants (instead of exactly)?  
  *Hint: Adapt or reuse the sliding window counting logic.*

### Summary
This problem uses the **Sliding Window + Inclusion-Exclusion** pattern (at most k − at most (k − 1)) to efficiently count substrings with specific vowel and consonant constraints.  
The critical insight is to count substrings with all vowels using a moving window, while keeping consonant count in check, and then carefully include only those with exactly k consonants.  
Such patterns are common in substring counting problems where “exactly k” or “at most k” properties matter, and they demonstrate how to use window boundaries to constrain a solution in linear time.


### Flashcard
Use sliding window with vowel frequency map and consonant counter; expand right pointer until all 5 vowels present and consonant count = k, then shrink left to count valid substrings.

### Tags
Hash Table(#hash-table), String(#string), Sliding Window(#sliding-window)

### Similar Problems
- Longest Substring Of All Vowels in Order(longest-substring-of-all-vowels-in-order) (Medium)
- Count Vowel Substrings of a String(count-vowel-substrings-of-a-string) (Easy)