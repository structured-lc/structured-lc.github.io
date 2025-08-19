### Leetcode 205 (Easy): Isomorphic Strings [Practice](https://leetcode.com/problems/isomorphic-strings)

### Description  
Given two strings, determine if they are **isomorphic**. Two strings are isomorphic if the characters in one string can be replaced to get the other string, with the requirement that:
- Each character in the first string maps to only one character in the second string.
- No two different characters in the first string map to the same character in the second string.
- The order of characters must be preserved.
- A character may map to itself, but a mapping must be consistent throughout the string.

### Examples  

**Example 1:**  
Input: `s = "egg", t = "add"`  
Output: `True`  
*Explanation: 'e' maps to 'a', 'g' maps to 'd'. All mappings are consistent, so the strings are isomorphic.*

**Example 2:**  
Input: `s = "foo", t = "bar"`  
Output: `False`  
*Explanation: 'f' → 'b', but the two 'o's would need to map to both 'a' and 'r', which is not consistent. Mapping is not one-to-one.*

**Example 3:**  
Input: `s = "paper", t = "title"`  
Output: `True`  
*Explanation: Mappings are 'p'→'t', 'a'→'i', 'p'→'t', 'e'→'l', 'r'→'e'.  
Every character from `s` consistently maps to exactly one character in `t`, with no conflicts.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:** Verify all possible mappings, but this is infeasible due to O(n²) comparisons and too many cases to check, especially with duplicate characters.
- **Better approach:**  
  - Use a hash map (dictionary) to store mappings from characters of `s` to characters of `t`.  
  - For every index, check:  
    - If a mapping exists for `s[i]`, ensure it's always mapping to `t[i]`.  
    - If not, create a new mapping but also check that `t[i]` isn't already mapped to by a different character in `s` (to ensure one-to-one).
- **Optimal solution:**  
  - Use two dictionaries (or array of size 256 for ASCII), one mapping `s`→`t` and another `t`→`s`, ensuring the relationship remains bijective (one-to-one and onto). This validates both directions and catches mapping conflicts immediately.
- **Trade-offs:**  
  - Both approaches are O(n), but using two dictionaries is cleaner and avoids subtle corner case issues.

### Corner cases to consider  
- Empty strings: Both being empty should return True.
- Strings of different lengths must immediately return False.
- Repeated characters mapping inconsistently (e.g., `s="ab", t="aa"` → False).
- All unique characters (no duplicates), mapping should still be one-to-one.
- A character mapping to itself is allowed as long as consistency holds.

### Solution

```python
def isIsomorphic(s: str, t: str) -> bool:
    # If lengths differ, they can't be isomorphic
    if len(s) != len(t):
        return False

    # Hash maps to track mapping from s→t and t→s
    map_s_t = {}
    map_t_s = {}

    for c1, c2 in zip(s, t):
        # Check mapping from s→t
        if c1 in map_s_t:
            if map_s_t[c1] != c2:
                return False
        else:
            map_s_t[c1] = c2

        # Check mapping from t→s, to ensure bijection
        if c2 in map_t_s:
            if map_t_s[c2] != c1:
                return False
        else:
            map_t_s[c2] = c1

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) — We loop over the strings once.
- **Space Complexity:** O(∣charset∣) — The maps may have up to the number of unique characters in s and t (constant for ASCII, up to 256).

### Potential follow-up questions (as if you’re the interviewer)  

- What if the input strings include Unicode characters?  
  *Hint: Consider Python dictionaries, not just ASCII-sized arrays.*

- Can you do this in one pass using only one dictionary?  
  *Hint: Map only in one direction, but ensure values are not duplicated.*

- If the strings are very large but only contain lowercase letters, how can you optimize?  
  *Hint: Use fixed-size integer arrays for mapping for constant time lookup.*

### Summary
This problem uses the **hashing and bijection mapping** pattern, where you ensure a one-to-one correspondence between items in two collections. The technique is common for mapping letters or bijective relationships, and applies to word pattern, course scheduling problems, and other assignment/mapping scenarios.

### Tags
Hash Table(#hash-table), String(#string)

### Similar Problems
- Word Pattern(word-pattern) (Easy)
- Find and Replace Pattern(find-and-replace-pattern) (Medium)