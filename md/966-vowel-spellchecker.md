### Leetcode 966 (Medium): Vowel Spellchecker [Practice](https://leetcode.com/problems/vowel-spellchecker)

### Description  
Given a list of words (`wordlist`), implement a spellchecker that answers queries from another list (`queries`). For each query, the spellchecker must return:
- The exact match from `wordlist` if it exists.
- If not, a case-insensitive match (the first such word from `wordlist`).
- If still not found, a match if the word becomes identical to a word in `wordlist` after replacing all vowels ('a', 'e', 'i', 'o', 'u') with a wildcard character (e.g., `*`) (again, return the earliest such word).
- If there are no matches at all, return an empty string.
The goal is to handle both capitalization errors and errors due to misspelled vowels in queries.

### Examples  

**Example 1:**  
Input:  
wordlist=`["KiTe", "kite", "hare", "Hare"]`,  
queries=`["kite", "Kite", "KiTe", "Hare", "HARE", "Hear", "hear", "keti", "keet", "keto"]`  
Output:  
`["kite", "KiTe", "KiTe", "Hare", "hare", "hare", "hare", "KiTe", "", "KiTe"]`  
*Explanation: Returns exact matches if found, else case-insensitive match, else 'vowel-error' match, else empty string.*

**Example 2:**  
Input:  
wordlist=`["yellow"]`,  
queries=`["Yellow", "YellOw", "yellow", "yllw", "yelloww"]`  
Output:  
`["yellow", "yellow", "yellow", "", ""]`  
*Explanation: Handles both exact and case-insensitive matches; no matches for partial or extra letters.*

**Example 3:**  
Input:  
wordlist=`["Abc", "defi"]`,  
queries=`["abC", "defi", "dafi", "defg", "abcd"]`  
Output:  
`["Abc", "defi", "defi", "", ""]`  
*Explanation: Handles exact, case-insensitive, and vowel-error; returns empty string where no match exists.*

### Thought Process (as if you’re the interviewee)  
- Start with brute-force: for each query, scan `wordlist` for possible matches using the priority order. This is inefficient for large lists (O(Q×W) for Q queries and W wordlist length).
- To optimize, preprocess `wordlist`:
  - Store all words in a **set** for O(1) exact matches.
  - Store a **map of lowercased words** to their original form for fast case-insensitive lookup.
  - Store a **map of "de-voweled" lowercased words** to the original for fast vowel-error lookup.
- For each query:
  - Check for exact match.
  - If not, check for a case-insensitive match.
  - If not, check for a vowel-error match.
  - Otherwise, return "".
- This approach ensures each query is checked in O(1) time after preprocessing, and the returned word always respects the earliest appearance in `wordlist`.

### Corner cases to consider  
- Query words that are not present in `wordlist`.
- Multiple words in `wordlist` matching the same lowercase or de-voweled pattern: only the first such word should be returned.
- Case-only mismatches (e.g., "Word" vs. "word").
- All vowels replaced (e.g., "bttn" should not match "button" if consonants do not match).
- Empty string queries or wordlist (should return empty string).
- Words with no vowels at all.

### Solution

```python
def spellchecker(wordlist, queries):
    # Helper to replace all vowels in a word with '*'
    def devowel(word):
        vowels = set("aeiou")
        return ''.join('*' if c in vowels else c for c in word.lower())
    
    exact_matches = set(wordlist)
    lowercase_map = {}
    vowel_map = {}

    # Populate the maps
    for word in wordlist:
        lw = word.lower()
        if lw not in lowercase_map:
            lowercase_map[lw] = word  # first occurrence only
        vw = devowel(word)
        if vw not in vowel_map:
            vowel_map[vw] = word

    result = []
    for query in queries:
        if query in exact_matches:
            result.append(query)
        else:
            lw = query.lower()
            if lw in lowercase_map:
                result.append(lowercase_map[lw])
            else:
                vw = devowel(query)
                if vw in vowel_map:
                    result.append(vowel_map[vw])
                else:
                    result.append("")
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Preprocessing is O(W·L), where W = wordlist size and L = average word length, due to maps and devoweling.
  - Each query is checked in O(1), given the preprocessed maps.
  - Total: O(W·L + Q·L), with Q = number of queries.
- **Space Complexity:**  
  - O(W·L) for storing all maps (each word appears in each map at most once).
  - O(Q) for output list.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you support wildcards in the queries (e.g., '?at' matches 'cat', 'bat')?  
  *Hint: Consider pre-indexing using trie structures or pattern matching for wildcards.*

- What if multiple words can equally match a query?  
  *Hint: Should your solution always pick the first occurrence, and why?*

- How would your approach change if wordlist is extremely large and queried very frequently?  
  *Hint: Consider distributed or memory-mapped solutions, or lookups using more space-efficient data structures.*

### Summary
The core approach uses **map lookups for efficient spellcheck**: by mapping both case-insensitive and vowel-agnostic versions of each word to their first occurrence, we cut query time to constant. This is a classic **preprocessing and hash map lookup** pattern, common in problems involving fast lookups for multiple forms of string equivalence, such as spelling correction, fuzzy matching, or search query normalization.

### Tags
Array(#array), Hash Table(#hash-table), String(#string)

### Similar Problems
