### Leetcode 291 (Medium): Word Pattern II [Practice](https://leetcode.com/problems/word-pattern-ii)

### Description  
Given a **pattern** string (e.g. "abab") and a **str** string (e.g. "redbluebluered"), determine if `str` can be segmented into substrings such that each character in the pattern bijectively maps to a unique, non-empty substring of `str`, and vice versa.  
Like a two-way mapping:  
- Each pattern character → one **unique** substring  
- Each unique substring → one pattern character

Mappings must be consistent throughout the pattern. The goal is to recreate `str` by replacing pattern letters with their associated substrings sequentially.  
For example, pattern = "abab", str = "redbluebluered" can be solved by 'a' → "red", 'b' → "blue".

### Examples  

**Example 1:**  
Input: `pattern = "abab", str = "redblueredblue"`  
Output: `True`  
Explanation:  
'a' → "red",  
'b' → "blue",  
replacing gives "redblueredblue"—matches input string.

**Example 2:**  
Input: `pattern = "aaaa", str = "asdasdasdasd"`  
Output: `True`  
Explanation:  
'a' → "asd",  
"asd" repeated 4 times is "asdasdasdasd".

**Example 3:**  
Input: `pattern = "aabb", str = "xyzabcxzyabc"`  
Output: `False`  
Explanation.  
No valid mapping: can't find unique substrings for 'a' and 'b' to recreate the original string.

**Example 4:**  
Input: `pattern = "a", str = "cat"`  
Output: `True`  
Explanation.  
'a' maps to "cat".

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Try all possible ways to partition `str` such that every pattern character consistently maps to a unique substring.  
  Since both pattern and str are small (≤20), recursion + backtracking is viable.
  
- At each recursion:
  - If the pattern character exists in our mapping, check the next substring of the correct length for a match.  
  - If it's a new character, try all possible non-empty prefixes for assignment that don't conflict with existing assignments.
  - If at any point the mapping isn't consistent, backtrack.
  
- **Why use recursion/backtracking?**  
  Because the substring divisions are not defined by spaces—so all substrings must be attempted.
  If a mapping is possible, return True at any point; otherwise, after all attempts, return False.

### Corner cases to consider  
- Empty pattern or empty str (should return False)
- Pattern longer than str (cannot be mapped)
- Pattern and str both length 1 (should return True)
- Pattern length equals str length (every character assigned to individual characters)
- Pattern with all identical characters versus str with repeated substring
- Different pattern letters mapping to overlapping substrings (should not be allowed)
- Multiple pattern characters, single substring (must be bijective mapping)

### Solution

```python
def wordPatternMatch(pattern, s):
    def backtrack(p_idx, s_idx, char_to_substr, substr_to_char):
        # If both pattern and s are fully consumed, valid assignment
        if p_idx == len(pattern) and s_idx == len(s):
            return True
        # If one is consumed but not the other, no match
        if p_idx == len(pattern) or s_idx == len(s):
            return False
        
        current_char = pattern[p_idx]
        
        # If pattern char already has a mapping
        if current_char in char_to_substr:
            sub = char_to_substr[current_char]
            # Check if s starts with mapped substring
            if not s.startswith(sub, s_idx):
                return False
            # Move forward in both pattern and string
            return backtrack(p_idx + 1, s_idx + len(sub), char_to_substr, substr_to_char)
        else:
            # Try all possible non-empty substrings starting at s_idx
            for end in range(s_idx + 1, len(s) + 1):
                candidate = s[s_idx:end]
                # Skip if this substring is already mapped to another char (enforces bijection)
                if candidate in substr_to_char:
                    continue
                # Assign both ways
                char_to_substr[current_char] = candidate
                substr_to_char[candidate] = current_char
                # Recurse
                if backtrack(p_idx + 1, end, char_to_substr, substr_to_char):
                    return True
                # Backtrack
                del char_to_substr[current_char]
                del substr_to_char[candidate]
            return False
    
    # Edge case: pattern or s is empty
    if not pattern or not s:
        return False
    
    return backtrack(0, 0, {}, {})

```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  O(kʰ), where k = length of str, h = length of pattern.  
  Since for each pattern char, we try all possible substring assignments, and backtracking explores many options, but actual number is limited due to bijection and pruning—so, exponential for worst case. For the constraints (≤20), this is acceptable.

- **Space Complexity:**  
  O(h + k):  
  - h is the recursion stack (pattern length)  
  - Dicts for mapping chars to substrings and vice versa, can be up to O(h) in size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if string or pattern length is huge (hundreds or thousands)?
  *Hint: Could you use DP/memoization or some length constraint checking to prune faster?*

- Could you return all possible valid mappings, not just check existence?
  *Hint: Modify the backtracking to collect assignments instead of bailing at first success.*

- Can you optimize further if pattern contains only k unique characters?
  *Hint: Prune by not trying substrings of the same length for already-mapped characters.*

### Summary
Uses **backtracking** (DFS) with bijective mapping.  
Pattern is similar to classic recursive string match problems, and shows up in "word pattern", "regex match with substrings", and unique substring assignments. Key pattern: recursive exploration, pruning by state, and enforcing 1-to-1 map both ways.

### Tags
Hash Table(#hash-table), String(#string), Backtracking(#backtracking)

### Similar Problems
- Word Pattern(word-pattern) (Easy)