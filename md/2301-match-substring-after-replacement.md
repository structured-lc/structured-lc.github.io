### Leetcode 2301 (Hard): Match Substring After Replacement [Practice](https://leetcode.com/problems/match-substring-after-replacement)

### Description  
You are given two strings, **s** and **sub**, and a list of valid character **mappings** as pairs `[old, new]`, meaning you can replace character `old` from `sub` with `new` in order to match against `s`. Each character in `sub` can be replaced only once per comparison. Your task is to **determine if `sub` can match any substring of `s` of the same length** after performing zero or more of the allowed replacements, where the comparison for each position is either:
- the characters are equal, or
- the character from `sub` can be replaced (using the mapping) to match the target.

Return `True` if possible, `False` otherwise.

### Examples  

**Example 1:**  
Input: `s = "fool3eetbar", sub = "leet", mappings = [["e", "3"], ["t","7"], ["t","8"]]`  
Output: `True`  
*Explanation: The substring "l3et" (replace 'e' with '3') exists in s, so "leet" can match s after the given replacement.*

**Example 2:**  
Input: `s = "fooleetbar", sub = "f00l", mappings = [["o","0"]]`  
Output: `False`  
*Explanation: No substring that could be produced via the allowed mappings matches "f00l" in s, so answer is False.*

**Example 3:**  
Input: `s = "baz", sub = "abz", mappings = [["a","b"],["b","a"]]`  
Output: `True`  
*Explanation: By replacing 'a'→'b' and 'b'→'a', "abz" can match substring "baz".*

### Thought Process (as if you’re the interviewee)  
- **Brute-force approach:**  
    - For every substring of `s` with length equal to `sub`, try to match `sub` with that substring.
    - For each index, allow either the character is the same, or use the mapping for a one-time replacement at that position.
    - Try all possibilities for every window in `s`. Time complexity will be O(len(s) × len(sub) × size of mappings) if naive lookups.

- **Optimized approach:**  
    - Preprocess mappings to quickly check if a character in `sub` can match the character in `s` (e.g., using a dict-of-sets or boolean table).
    - Slide a window of length `len(sub)` over `s`, and for each position, check if every character in the window matches or a mapping exists to allow the match.
    - Stop as soon as a valid match is found.

- **Trade-offs:**  
    - Hash lookups make checking allowed replacements fast (O(1)).
    - The windowed scan is necessary as we have to consider every possible starting index in `s`.
    - No need for backtracking since each replacement can be applied at most once per position.

### Corner cases to consider  
- The mapping list is empty: only exact matches are allowed.
- Characters in `sub` need to be replaced to something not in `s`.
- `sub` is longer than `s`: always False.
- Overlapping allowed replacements (multiple options for replacement at the same position).
- Duplicates in mappings list.
- Edge case: empty `sub` and/or `s`.

### Solution

```python
def matchReplacement(s: str, sub: str, mappings: list[list[str]]) -> bool:
    # Preprocess mappings: for each character in sub, create a set of allowable replacements
    mapping_dict = {}
    for old, new in mappings:
        if old not in mapping_dict:
            mapping_dict[old] = set()
        mapping_dict[old].add(new)
        
    n, m = len(s), len(sub)
    for i in range(n - m + 1):
        match = True
        for j in range(m):
            sub_char = sub[j]
            s_char = s[i + j]
            # Check if the chars match directly or via mapping
            if s_char == sub_char:
                continue
            if sub_char not in mapping_dict or s_char not in mapping_dict[sub_char]:
                match = False
                break
        if match:
            return True
    return False
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m), where n = len(s), m = len(sub), as each possible substring is checked.
- **Space Complexity:** O(K), for the mapping dict, where K is the number of mappings; otherwise, only constant extra space.

### Potential follow-up questions (as if you’re the interviewer)  

- What if `mappings` can contain cycles or self-mappings; how would you handle transitivity?
  *Hint: Consider building a reachability matrix or using BFS/DFS for indirect replacements.*

- What if you are allowed unlimited (chain) replacements?
  *Hint: Precompute transitive closure for replacements before matching.*

- How do you generalize this if character replacement cost varies or is limited per window?
  *Hint: Use dynamic programming or weighted graph traversal for minimal cost matchings.*

### Summary
This problem is a variant of pattern matching that combines sliding window with an "allowed substitutions" condition. The approach efficiently maps character-to-character replacement, then scans with a sliding window to check matchability for each possible substring—classic for advanced string manipulation and often appears in pattern matching, spellcheckers, and bioinformatics scenarios.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), String Matching(#string-matching)

### Similar Problems
- Design Add and Search Words Data Structure(design-add-and-search-words-data-structure) (Medium)
- Number of Subarrays That Match a Pattern II(number-of-subarrays-that-match-a-pattern-ii) (Hard)