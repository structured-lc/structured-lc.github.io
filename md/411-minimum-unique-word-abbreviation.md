### Leetcode 411 (Hard): Minimum Unique Word Abbreviation [Practice](https://leetcode.com/problems/minimum-unique-word-abbreviation)

### Description  
Given a **target** word and a dictionary (set) of words, find the **shortest possible abbreviation** of the target that does **not** conflict with any abbreviation of any word in the dictionary.  
An abbreviation replaces any number of **non-adjacent** substrings with their lengths (as numbers), and each **number or letter** in the abbreviation counts as length = 1.  
An abbreviation conflicts with a dictionary word if the dictionary word can be abbreviated into the same abbreviation.

Return any one minimal-length abbreviation if multiple are possible.

**For example:**  
The string `"word"` can be abbreviated in various ways: `["word", "1ord", "w1rd", "wo1d", "wor1", "2rd", "w2d", "wo2", "1o1d", "1or1", "w1r1", "1o2", "2r1", "3d", "w3", "4"]`[1][2][3][4].

**Constraints:**  
- 1 ≤ len(target) = m ≤ 21  
- 0 ≤ len(dictionary) = n ≤ 1000  
- Only letters  
- log₂(n) + m ≤ 20  

### Examples  

**Example 1:**  
Input: `target = "apple", dictionary = ["blade"]`  
Output: `"a4"`  
*Explanation: The possible 5-letter abbreviations are `"5"` (conflicts with `"blade"`), `"4e"` (conflicts with `"blade"`), `"a4"` (unique: only "apple" can have an abbreviation starting with "a").*

**Example 2:**  
Input: `target = "apple", dictionary = ["plain", "amber", "blade"]`  
Output: `"1p3"`  
*Explanation: Other patterns like `"ap3"`, `"a3e"`, `"2p2"`, `"3le"`, `"3l1"` are also possible and valid, as long as they are unique wrt all dictionary words of length 5.*

**Example 3:**  
Input: `target = "apple", dictionary = []`  
Output: `"5"`  
*Explanation: With no conflicting words, the shortest abbreviation is just using the length itself (“5”).*

### Thought Process (as if you’re the interviewee)

- **Brute-force:**  
  Try all possible abbreviations for the target, and for each, check if any word in the dictionary can be abbreviated to the same abbreviation. This is computationally infeasible for long words because the number of possible abbreviations is 2^m (where m = len(target)).

- **Optimization:**  
  Key insight: Only dictionary words of the *same length* as target are relevant, since only those can produce the same abbreviations.  
  Represent each possible abbreviation as a **bitmask**: 1 means keep letter; 0 means abbreviate (replace by number).  
  For each mask, check if *every* conflicting word (i.e., words having letters in the positions where the abbreviation keeps the target's letter) differs from the target at any position where the bitmask is 1; if so, the abbreviation cannot be formed by any dict word, so it's unique.  
  Try all possible bitmasks (2^m), sort by abbreviation length, and return the first unique one.  
  **To avoid generating all abbreviations**: Use BFS or priority queue to try abbreviations from shortest to longest.

- **Trade-off:**  
  Since m ≤ 21, 2^m is at most ≈ 2 million, which is feasible due to constraints.

### Corner cases to consider  
- Dictionary is empty  
- Dictionary has words of different lengths  
- Target and dictionary words are identical  
- Multiple abbreviations with same shortest length  
- Target length = 1  
- All dictionary words conflict in every possible way (no unique abbreviation except fully spelled out word)

### Solution

```python
def minAbbreviation(target, dictionary):
    from collections import deque

    m = len(target)
    diffs = []
    for word in dictionary:
        if len(word) != m:
            continue
        diff = 0
        for i in range(m):
            if target[i] != word[i]:
                diff |= (1 << i)
        diffs.append(diff)
    if not diffs:
        return str(m)  # No conflicts at all

    # Generate all abbreviation masks (bitmask: 1 - keep letter, 0 - abbreviate)
    min_len = float('inf')
    best_mask = None
    for mask in range(1 << m):
        # For this mask, is it unique with respect to all dict words?
        for diff in diffs:
            if (mask & diff) == 0:  # All positions kept are SAME (not unique)
                break
        else:
            # Unique! Calculate length
            abbr_len = 0
            i = 0
            while i < m:
                if not (mask & (1 << i)):
                    while i < m and not (mask & (1 << i)):
                        i += 1
                    abbr_len += 1  # Number token
                else:
                    abbr_len += 1
                    i += 1
            if abbr_len < min_len:
                min_len = abbr_len
                best_mask = mask

    # Build abbreviation string from mask
    res, i = '', 0
    while i < m:
        if not (best_mask & (1 << i)):
            j = i
            while j < m and not (best_mask & (1 << j)):
                j += 1
            res += str(j - i)
            i = j
        else:
            res += target[i]
            i += 1
    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(2ᵐ × n × m), 
  - Try all 2ᵐ abbreviation masks, for each, check all n dictionary words, each of length m (bit checks).
  - Due to constraints m ≤ 21 and log₂(n) + m ≤ 20, this remains tractable.

- **Space Complexity:** O(n + m)
  - Store bitmasks for all dictionary words of relevant length (at most n items).
  - Intermediate storage is proportional to the size of the input.

### Potential follow-up questions (as if you’re the interviewer)  

- What’s the fastest way to enumerate all possible abbreviations efficiently for a word of length m?  
  *Hint: Use bitmasking—each bit represents whether to keep or abbreviate a character.*

- Can you optimize further if the dictionary is static for many target queries?  
  *Hint: Pre-process all possible patterns and build a trie or lookup table.*

- How would you generate the k shortest unique abbreviations, not just the shortest?  
  *Hint: Use a priority queue to try abbreviations in increasing order of length.*

### Summary
The core of this problem is **bitmask state compression**, a common tactic for subset, permutation, or combinatorial search problems when n is small (like m ≤ 21 here). The "abbreviation via mask" technique is general—it's also used in word games, pattern matching, and limits-exploration where 2ᵐ is tractable. Using bitmasks to represent keep/abbreviate status is especially potent in string/word puzzles with abbreviation or masking constraints.


### Flashcard
Generate all 2^m abbreviations as bitmasks, filter out those matching any same-length dictionary word, return shortest valid abbreviation using bit manipulation.

### Tags
Array(#array), String(#string), Backtracking(#backtracking), Bit Manipulation(#bit-manipulation)

### Similar Problems
- Generalized Abbreviation(generalized-abbreviation) (Medium)
- Valid Word Abbreviation(valid-word-abbreviation) (Easy)
- Word Abbreviation(word-abbreviation) (Hard)