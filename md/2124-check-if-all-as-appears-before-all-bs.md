### Leetcode 2124 (Easy): Check if All A's Appears Before All B's [Practice](https://leetcode.com/problems/check-if-all-as-appears-before-all-bs)

### Description  
Given a string s consisting only of the characters 'a' and 'b', determine if **all the 'a's appear before any 'b'** in the string. That is, once a 'b' appears, no 'a' should appear after it.  
Return True if this ordering is maintained; otherwise, return False.

### Examples  

**Example 1:**  
Input: `s = "aaabbb"`  
Output: `True`  
*Explanation: All 'a's (indices 0,1,2) appear before any 'b' (indices 3,4,5). The order is maintained.*

**Example 2:**  
Input: `s = "abab"`  
Output: `False`  
*Explanation: An 'a' at index 2 appears after a 'b' at index 1. So not all 'a's are before all 'b's.*

**Example 3:**  
Input: `s = "bbb"`  
Output: `True`  
*Explanation: There are no 'a's, so the ordering holds vacuously.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea**:  
  Scan the string; for every pair of indices i < j, if s[i] = 'b' and s[j] = 'a', then return False.  
  This is O(n²) and unnecessary, since we can check more simply.

- **Optimized approach**:  
  Realize that the _first_ time we see a 'b', there should be no 'a' after that position.  
  Alternatively, scan once, and as soon as we see a 'b', set a flag. If any 'a' appears after that, return False immediately.  
  Similarly, we can check for the substring "ba" anywhere in s—if "ba" appears, then an 'a' appears after a 'b', so we should return False.

- **Why this approach**:  
  - Checking for "ba" is direct, clean, and O(n).  
  - No extra memory is needed; a single pass with a flag or using inbuilt substring search works efficiently.
  - Trade-off: Using "in" operator for substring search can be very concise, but a manual scan with a flag is more interview-adapted and explicit.

### Corner cases to consider  
- s is empty → should return True (no ordering violation)
- s contains only 'a' or only 'b'
- s has only one character
- First character is 'b', last is 'a' → clearly violates the rule
- Large strings (performance/efficiency)
- No 'a's after any 'b'

### Solution

```python
def checkString(s: str) -> bool:
    # Once we've seen a 'b', any following 'a' is an invalid case
    found_b = False
    for c in s:
        if c == 'b':
            found_b = True
        elif c == 'a':
            if found_b:
                # Found 'a' after previously seeing 'b', invalid
                return False
    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of s. Each character is visited once.
- **Space Complexity:** O(1), only a couple of variables used, no extra space grows with input size.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the characters are not just 'a' and 'b', but any two distinct characters?
  *Hint: How can you generalize your code to accept the two characters as function parameters?*

- What if the input is a very large string, maybe streamed (cannot index or lookahead far ahead)?
  *Hint: How would you adapt your flag-based scan for a real-time data stream?*

- Could you write the solution in a single line using Python features?
  *Hint: Consider substring searching using 'ba' in s.*

### Summary
This problem uses the **single-pass scan with state flag** pattern—extremely common for string validation problems that have _ordering_ constraints. It’s a direct application of validating “all x’s appear before all y’s” which shows up in array and string questions often. The same concept is applicable in validating sorted runs, partitioning elements, and streaming/real-time validation.