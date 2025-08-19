### Leetcode 1763 (Easy): Longest Nice Substring [Practice](https://leetcode.com/problems/longest-nice-substring)

### Description  
Given a string, return the longest "nice" substring, where a substring is called **nice** if for every alphabet letter present, both its lowercase and uppercase versions are included. For example, "aAbB" is nice because both 'A'/'a' and 'B'/'b' are present, but "aAB" is not nice because 'b' is missing. If there are multiple longest nice substrings, return the one that occurs earliest. If no such substring exists, return an empty string.

### Examples  

**Example 1:**  
Input: `s = "YazaAay"`  
Output: `aAa`  
*Explanation: The substring "aAa" is nice because only 'A'/'a' are present and both cases exist. This is the longest nice substring.*

**Example 2:**  
Input: `s = "Bb"`  
Output: `Bb`  
*Explanation: The entire string is nice since both 'B' and 'b' exist.*

**Example 3:**  
Input: `s = "c"`  
Output: ``  
*Explanation: No substring with at least both cases for any letter exists, so output is empty.*

**Example 4:**  
Input: `s = "dDzeE"`  
Output: `dD`  
*Explanation: Both "dD" and "eE" are longest nice substrings of length 2, but "dD" appears first.*

### Thought Process (as if you’re the interviewee)  
Start by considering brute force: generate all substrings, and for each, check if it's nice. But checking all substrings (O(n²)) combined with evaluating each's "niceness" (potentially O(n) per substring) is too slow for longer strings.

Optimizing, realize that for any substring, any single character missing its pair (uppercase or lowercase) means no substring containing it can be nice. Thus, use a **divide and conquer** approach:  
- For a given string, find the first character missing its pair.  
- Recursively check the left and right substrings (excluding that character), and return the longer nice substring.  
- If no such character exists, the whole substring is nice.

This leverages the problem structure and guarantees that we look at fewer unnecessary substrings, resulting in much better performance for practical input sizes.

### Corner cases to consider  
- Empty string (`""`): should return `""`.
- String with no valid pairs at all (e.g., `"a"`, `"xyz"`): return `""`.
- Strings where the entire input is nice.
- Multiple nice substrings of equal max length: return the first one.
- All letters paired but interleaved (e.g., `"aAbBcC"`).

### Solution

```python
def longestNiceSubstring(s: str) -> str:
    # Helper to toggle the case of a character
    def toggle_case(c):
        return chr(ord(c) ^ 32)  # ASCII trick to swap case
    
    # If string too short, can't be nice
    if len(s) < 2:
        return ""
    
    # Unique characters in string
    char_set = set(s)
    
    for i, c in enumerate(s):
        if toggle_case(c) not in char_set:
            # Partition at index i: current char cannot be in any nice substring
            left = longestNiceSubstring(s[:i])
            right = longestNiceSubstring(s[i+1:])
            # Return the longer one (leftmost if same length)
            return left if len(left) >= len(right) else right
    # If no such partition found, whole string is nice
    return s
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n²) in the worst-case—at each call, in the worst case, we may partition the string at each position, and for each substring, we create a set (O(n) space/time per call). However, the recursion and checks guarantee practical performance for n ≤ 100.
- **Space Complexity:** O(n²) in the worst-case due to recursion stack and substring creation.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the string includes non-alphabetic characters?
  *Hint: Should those be considered as dividers or just ignored in the characterization of "nice"?*

- Can you solve it with less extra space?
  *Hint: Think about using bitmasks for letter pairs and processing substrings in-place.*

- How would you handle the case where letter pairs apply to Unicode letters (beyond ASCII)?
  *Hint: Consider the complexity of case-mapping across the Unicode character set.*

### Summary
This problem is a classic example of **divide and conquer on substrings**, similar to problems that try to find the longest substring satisfying a custom property (like "longest substring with at most k unique characters", etc.). The technique of dividing the problem at elements that make the full condition fail is a flexible pattern seen in substring search/interview problems.

### Tags
Hash Table(#hash-table), String(#string), Divide and Conquer(#divide-and-conquer), Bit Manipulation(#bit-manipulation), Sliding Window(#sliding-window)

### Similar Problems
- Number of Good Paths(number-of-good-paths) (Hard)