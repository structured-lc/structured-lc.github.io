### Leetcode 1178 (Hard): Number of Valid Words for Each Puzzle [Practice](https://leetcode.com/problems/number-of-valid-words-for-each-puzzle)

### Description  
Given a list of words and a list of 7-letter puzzles (with no repeated letters), find for each puzzle how many words are "valid".  
A word is valid for a puzzle if:
- The word contains the first letter of the puzzle.
- Every letter in the word appears somewhere in the puzzle.

For each puzzle, return the count of valid words.

### Examples  

**Example 1:**  
Input:  
words = `["apple","pleas","please"]`,  
puzzles = `["aelwxyz","aelpxyz","aelpsxy","saelpxy","xaelpsy"]`  
Output:  
`[0, 1, 3, 2, 0]`  
*Explanation:*
- For "aelwxyz": none of the words contains only letters from the puzzle and the required first letter 'a' — count = 0.
- For "aelpxyz": only "apple" matches (has 'a', all letters in puzzle) — count = 1.
- For "aelpsxy": both "pleas" and "please" match, and "apple" as well — count = 3.
- For "saelpxy": "pleas" and "please" (contain 's' and fit the puzzle) — count = 2.
- For "xaelpsy": none of the words — count = 0.

**Example 2:**  
Input:  
words = `["aaaa","asas","able","ability","actt","actor","access"]`,  
puzzles = `["aboveyz","abrodyz","abslute","absoryz","actresz","gaswxyz"]`  
Output:  
`[1,1,3,2,4,0]`  
*Explanation:*
- For "aboveyz": only "aaaa" is valid (contains 'a', all letters in puzzle).
- For "abrodyz": only "aaaa".
- For "abslute": "aaaa", "asas", "able".
- For "absoryz": "aaaa", "asas".
- For "actresz": "aaaa", "asas", "actt", "actor".
- For "gaswxyz": none.

**Example 3:**  
Input:  
words = `["hold","cold","clo","hole"]`,  
puzzles = `["chloe","dolph"]`  
Output:  
`[2, 1]`  
*Explanation:*
- For "chloe": "clo" and "hole" are valid (must have 'c' and use only letters from "chloe").
- For "dolph": only "hold" is valid.

### Thought Process (as if you’re the interviewee)  
Let's start with the brute-force solution:
- For each puzzle, check every word:
  - Does it contain the first letter of the puzzle?
  - Are all its letters within the puzzle's letters?
- This is extremely slow for large inputs — up to 10⁵ words × 10⁴ puzzles — not scalable.

Optimized approach:
- Use a **bitmask** to encode each word and puzzle, since only presence/absence of letters matters.
- For each word, store its bitmask frequency in a hash map.
  - Skip words with more than 7 unique letters (since no puzzle can match them).
- For each puzzle:
  - Fix the first letter (must be included).
  - Generate all subsets of the remaining 6 letters (2⁶ = 64 possible combinations), add the first letter for each, then check how many words correspond to each candidate mask using the hash map, sum counts for all.

This leverages that with 7 puzzle letters, there are only 64 meaningful bitmask candidates to consider per puzzle. 
Tradeoff:  
- Storing each unique bitmask of found words (at most 2²⁶).
- Processing each puzzle in constant time O(2⁶).

### Corner cases to consider  
- Words with more than 7 unique letters (never match any puzzle).
- Puzzles with letters not in any word.
- Multiple words with identical letters.
- Large input sizes: words or puzzles count reaches constraints.
- Empty words or puzzles (shouldn’t happen given constraints).

### Solution

```python
def findNumOfValidWords(words, puzzles):
    # Create a hash map to count masks of each word (skip words with >7 unique letters)
    from collections import Counter

    def word_mask(word):
        mask = 0
        for c in set(word):      # Use set to avoid double-counting letters
            mask |= 1 << (ord(c) - ord('a'))
        return mask

    word_count = Counter()
    for w in words:
        mask = word_mask(w)
        # Only words with 7 or fewer unique letters can match any puzzle
        if bin(mask).count('1') <= 7:
            word_count[mask] += 1

    result = []
    for p in puzzles:
        # First letter mask (must be included in matches)
        first = 1 << (ord(p[0]) - ord('a'))
        # Mask for the rest 6 letters
        masks = []
        # Generate all possible combinations of the 6 remaining letters
        n = 6
        subset = 0
        ans = 0
        # Precompute the masks for the 6 letters
        ch = [ord(p[i+1]) - ord('a') for i in range(n)]
        for s in range(1 << n):
            mask = first
            for i in range(n):
                if s & (1 << i):
                    mask |= 1 << ch[i]
            ans += word_count.get(mask, 0)
        result.append(ans)

    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing words: O(W × L) where W = number of words, L = max word length (for mask conversion).
  - For each puzzle: O(2⁶) = 64 (generate all combinations of 6 letters), P = number of puzzles, so O(P × 64) = O(P).
  - Total: O(W × L + P)

- **Space Complexity:**  
  - O(U) where U is the number of unique word bitmasks (at most combinations of 7 letters: C(26,7)), plus output O(P).

### Potential follow-up questions (as if you’re the interviewer)  

- What if words could contain uppercase or non-English letters?  
  *Hint: Think about how to generalize bitmask or change encoding.*

- What if puzzles could have repeated letters?  
  *Hint: How does that affect validity checks and bitmask logic?*

- How would you optimize for memory, or if words could be extremely long?  
  *Hint: Could you avoid storing masks for rarely used combinations?*

### Summary
This problem leverages the **bitmask and subset enumeration** pattern, especially common when the problem space is “all combinations” of a small set (here, 2⁶). It efficiently reduces brute-force matching by using precomputed frequencies and bit operations, similar to how “subsets of sets” problems are handled—this pattern is common in subset DP and advanced set intersection queries.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Bit Manipulation(#bit-manipulation), Trie(#trie)

### Similar Problems
