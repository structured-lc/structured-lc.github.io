### Leetcode 527 (Hard): Word Abbreviation [Practice](https://leetcode.com/problems/word-abbreviation)

### Description  
Given a list of **unique, non-empty strings**, generate the **shortest possible unique abbreviation** for each word, following these rules:
- The abbreviation consists of the **first letter**, followed by the **number of omitted middle letters**, and then the **last letter** (*e.g.*, "internationalization" → "i18n").
- If multiple words result in the same abbreviation, **increase the prefix length** (keep more letters at the start) until all abbreviations are unique.
- If abbreviating a word does **not make it shorter**, use the original word (e.g., "me" cannot be abbreviated).
- All words are distinct and consist of lowercase English letters; 1 ≤ words.length ≤ 20; 4 ≤ words[i].length ≤ 20[1][3][4].

### Examples  

**Example 1:**  
Input: `["like","god","internal","me"]`  
Output: `["l2e", "g2d", "i6l", "me"]`  
*Explanation:*
- "like" → "l2e"  
- "god" → "g2d"  
- "internal" → "i6l"  
- "me": abbreviation "m0e" isn't shorter, so keep "me"[1][3].

**Example 2:**  
Input: `["internationalization", "localization"]`  
Output: `["i18n", "l10n"]`  
*Explanation:*
- "internationalization" → "i18n"  
- "localization" → "l10n"  
Both are unique and shorter than the originals[1].

**Example 3:**  
Input: `["like", "love", "live", "lose"]`  
Output: `["l2e", "lo2e", "li2e", "lo2e"]`  
*Explanation:*
- Initial: ["l2e", "l2e", "l2e", "l2e"] (conflict on "l2e")
- Increase prefix:
  - "like" → "li1e"
  - "love" → "lo1e"
  - "live" and "lose" both "li2e"/"lo2e", repeat until unique etc.

**Example 4:**  
Input: `["internal", "internet", "interval", "intension", "intrusion"]`  
Output: `["inte4l", "inte4t", "interval", "inte4n", "intr4n"]`  
*Explanation:*
- Increase prefixes until each word's abbreviation is unique and shorter than the original[3][4].

### Thought Process (as if you’re the interviewee)  

- **Brute-force idea:**  
  - For every word, generate the basic abbreviation (first letter + #omitted + last letter).
  - If there is a conflict (duplicate abbreviation), incrementally increase the prefix size (keep more starting letters) and recompute for conflicting words.
  - Do this until all abbreviations are unique.
- **Optimization:**  
  - Use a **grouping-by-abbreviation** and resolve conflicts together.
  - Only update conflicting groupings, so most words finish fast.
  - Remember, **don't abbreviate if not shorter**.
- **Trade-offs:**  
  - Group and resolve conflicts efficiently rather than recomputing all words each cycle.
  - Slightly more complex, but guarantees uniqueness with minimal runtime.
  - Uses dynamic prefix increments and checks abbreviation length at every change.

### Corner cases to consider  
- Words with length ≤ 3: can't be abbreviated shorter, return the word as-is (e.g., "me").
- Words that differ only at end or mid-section: need large prefix before abbreviation is unique.
- All words reduce to the same basic abbreviation: need to keep increasing prefix for all.
- Abbreviation longer or the same length as word: output original word.
- No conflicts at all: just initial abbreviation for each.
- Very similar words: require many prefix letters before uniqueness.

### Solution

```python
def wordsAbbreviation(words):
    from collections import defaultdict

    def abbr(word, prefix_len):
        # If abbreviation is not shorter, return word
        if prefix_len >= len(word) - 2:
            return word
        return word[:prefix_len] + str(len(word) - 1 - prefix_len) + word[-1]

    n = len(words)
    res = [""] * n
    prefix = [1] * n  # Start each with a 1-letter prefix

    # Map each word to its index, as output must preserve input order
    indices = list(range(n))
    while True:
        abbr_map = defaultdict(list)
        for i in indices:
            ab = abbr(words[i], prefix[i])
            abbr_map[ab].append(i)

        groups_resolved = True
        new_indices = []
        for ab, idxs in abbr_map.items():
            if len(idxs) == 1:
                i = idxs[0]
                res[i] = ab
            else:
                # Conflict: all these indices need bigger prefix next round
                for i in idxs:
                    prefix[i] += 1
                    new_indices.append(i)
                groups_resolved = False
        if groups_resolved:
            break
        indices = new_indices  # Only attempt to fix unresolved in next round

    return res
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(L × N²)  
  - Each round, conflicting groups get their prefix increased. In worst case, for N words (N ≤ 20), if all are similar, each may need up to L prefix increments (L = length of the word, max 20), and in each pass, O(N) processing. So, total O(L × N²).
- **Space Complexity:** O(L × N)  
  - Store output list and prefix lengths, and at each round, mapping of abbreviations.

### Potential follow-up questions (as if you’re the interviewer)  

- How does the algorithm perform with **large word lists** (N is very big)?  
  *Hint: Could you use a Trie or advanced grouping to improve?*

- What if the **input words are not unique**?  
  *Hint: Should you de-duplicate or how does that affect abbreviation conflict resolution?*

- Can you **restore the original word** given an abbreviation + list of all words?  
  *Hint: Only if abbreviation mapping is still unique after this construction.*

### Summary
This problem is a notable example of the **group-and-resolve** pattern sometimes encountered in uniqueness/generating problems.  
It uses a **progressive disambiguation** strategy, incrementally growing prefixes for words with abbreviation conflicts until all are distinct, while always checking that the abbreviation stays efficient.  
A similar pattern is used in resolved naming in compilers, or in minimization of identifiers, and has natural extensions to problems where efficient, non-clashing naming is needed.


### Flashcard
Iteratively increase abbreviation prefix length for conflicting words, grouping and resolving until all abbreviations are unique.

### Tags
Array(#array), String(#string), Greedy(#greedy), Trie(#trie), Sorting(#sorting)

### Similar Problems
- Valid Word Abbreviation(valid-word-abbreviation) (Easy)
- Minimum Unique Word Abbreviation(minimum-unique-word-abbreviation) (Hard)
- Check if a String Is an Acronym of Words(check-if-a-string-is-an-acronym-of-words) (Easy)