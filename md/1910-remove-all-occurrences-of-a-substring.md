### Leetcode 1910 (Medium): Remove All Occurrences of a Substring [Practice](https://leetcode.com/problems/remove-all-occurrences-of-a-substring)

### Description  
Given two strings, **s** and **part**, repeatedly remove the leftmost occurrence of **part** from **s** until **part** no longer appears in **s**. Keep checking after each removal as new occurrences may be created.  
Return the resulting string after all possible removals.

### Examples  

**Example 1:**  
Input: `s = "daabcbaabcbc", part = "abc"`  
Output: `"dab"`  
Explanation:  
- Remove `"abc"` at index 2 → `"dabaabcbc"`  
- Remove `"abc"` at index 4 → `"dababcbc"`  
- Remove `"abc"` at index 4 → `"dab"`  
- `"abc"` no longer found.

**Example 2:**  
Input: `s = "axxxxyyyyb", part = "xy"`  
Output: `"ab"`  
Explanation:  
- `"axxxxyyyyb"`: remove `"xy"` at index 4 → `"axxxyyyb"`  
- `"axxxyyyb"`: remove `"xy"` at index 3 → `"axxyyb"`  
- `"axxyyb"`: remove `"xy"` at index 2 → `"axyb"`  
- `"axyb"`: remove `"xy"` at index 1 → `"ab"`  
- No `"xy"` left.

**Example 3:**  
Input: `s = "aabababa", part = "aba"`  
Output: `"ab"`  
Explanation:  
- `"aabababa"`: remove `"aba"` at index 1 → `"aababa"`  
- `"aababa"`: remove `"aba"` at index 2 → `"aaba"`  
- `"aaba"`: no `"aba"` present.

### Thought Process (as if you’re the interviewee)  
The brute-force way is to use a loop:  
- While **part** exists in **s**, find its index and remove the leftmost occurrence by slicing.
- This can be slow since each search and modification can scan large sections of the string, leading to inefficiencies for large inputs.

**Optimization:**  
A better approach is to build the new string as we scan **s** using a stack-like list:
- For each character `c` in **s**, add it to the result/stack.
- After each addition, check if the end of the current string (the last **len(part)** chars) matches **part**.
- If they match, remove those characters.
- This ensures that new occurrences formed from recent removals are caught immediately.  
This method processes every character exactly once, is efficient, and prevents rescanning.

Trade-offs:
- **Stack/result array approach**: O(n × m) time, O(n) space, processes each character in a single pass.
- **String find/replace approach**: potentially O(n²) time if repeated scans are needed.

### Corner cases to consider  
- **Empty s** or **part** (but both are at least length 1 by constraints)
- **part** not found at all (should return original **s**)
- **part** is a single character
- Overlapping and adjacent occurrences (e.g., `aaaa`, part=`aa`)
- **s** and **part** are identical (should return empty string)
- Removals form new matches (e.g., removing one makes another match appear)

### Solution

```python
def removeOccurrences(s: str, part: str) -> str:
    stack = []
    plen = len(part)
    for c in s:
        stack.append(c)  # Add char to result
        # Check if we have a potential match at the end
        if len(stack) >= plen and ''.join(stack[-plen:]) == part:
            # Remove the matched part from the end
            for _ in range(plen):
                stack.pop()
    return ''.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m),  
  where n = len(s) and m = len(part), since for each character, at most we compare up to m characters for each addition.
- **Space Complexity:** O(n) for the stack holding up to all chars (if no removals), plus output string assembly.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize it further if **part** is very long or has complex patterns?  
  *Hint: Think KMP or rolling hash for substring detection.*

- What if you had to handle Unicode or multi-byte characters?  
  *Hint: Be sure your code splits and joins entire characters, not just bytes.*

- How would the algorithm change for very large inputs, e.g., streamed data or files too large for memory?  
  *Hint: Discuss window/streaming techniques, memory constraints, chunked processing.*

### Summary
This uses the classic **stack/string builder** pattern: scan the string, build up the answer, and remove matches on-the-fly as soon as they form at the end. This is similar to problems like "remove all adjacent duplicates" and can be generalized to any on-the-fly substring removal. The approach is efficient, O(n × m) time and O(n) space, and is usually optimal unless substring matching itself can be further improved by advanced algorithms.

### Tags
String(#string), Stack(#stack), Simulation(#simulation)

### Similar Problems
- Maximum Deletions on a String(maximum-deletions-on-a-string) (Hard)