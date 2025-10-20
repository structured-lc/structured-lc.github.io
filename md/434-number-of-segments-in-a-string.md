### Leetcode 434 (Easy): Number of Segments in a String [Practice](https://leetcode.com/problems/number-of-segments-in-a-string)

### Description  
Given a string s, return the number of segments in the string.

A segment is defined to be a contiguous sequence of non-space characters.

### Examples  

**Example 1:**  
Input: `s = "Hello, my name is John"`  
Output: `5`  
*Explanation: The five segments are ["Hello,", "my", "name", "is", "John"].*

**Example 2:**  
Input: `s = "Hello"`  
Output: `1`  

**Example 3:**  
Input: `s = ""`  
Output: `0`  

### Thought Process (as if you're the interviewee)  
This problem asks us to count contiguous sequences of non-space characters. The key challenges are:

1. **Multiple consecutive spaces**: Should be treated as a single separator
2. **Leading/trailing spaces**: Should not contribute to segment count
3. **Empty string**: Should return 0

Approaches:
1. **Built-in split()**: Use Python's split() which handles multiple spaces automatically
2. **Manual counting**: Iterate through string and count transitions from space to non-space
3. **Two pointers**: Track start and end of each segment
4. **State machine**: Track whether we're inside or outside a segment

The split() approach is simplest, but manual counting shows better understanding of the problem.

### Corner cases to consider  
- Empty string
- String with only spaces
- String with no spaces
- Multiple consecutive spaces
- Leading and trailing spaces
- Single character string

### Solution

```python
def countSegments(s):
    # Built-in approach - simplest and most reliable
    return len(s.split())

# Manual counting approach
def countSegmentsManual(s):
    if not s:
        return 0
    
    count = 0
    in_segment = False
    
    for char in s:
        if char != ' ':
            # Start of a new segment
            if not in_segment:
                count += 1
                in_segment = True
        else:
            # End of current segment
            in_segment = False
    
    return count

# Alternative manual approach - count transitions
def countSegmentsTransition(s):
    if not s:
        return 0
    
    count = 0
    
    for i in range(len(s)):
        # Count start of each segment
        if s[i] != ' ' and (i == 0 or s[i-1] == ' '):
            count += 1
    
    return count

# Two pointers approach
def countSegmentsTwoPointers(s):
    if not s:
        return 0
    
    count = 0
    i = 0
    n = len(s)
    
    while i < n:
        # Skip leading spaces
        while i < n and s[i] == ' ':
            i += 1
        
        # If we found a non-space character, it's start of a segment
        if i < n:
            count += 1
            # Skip to end of current segment
            while i < n and s[i] != ' ':
                i += 1
    
    return count

# Strip and manual count approach
def countSegmentsStrip(s):
    s = s.strip()  # Remove leading and trailing spaces
    if not s:
        return 0
    
    count = 1  # At least one segment if string is not empty
    
    for i in range(len(s)):
        if s[i] == ' ' and s[i-1] != ' ':
            count += 1
    
    return count

# Regular expression approach
import re

def countSegmentsRegex(s):
    # Find all sequences of non-space characters
    segments = re.findall(r'\S+', s)
    return len(segments)

# One-liner approaches
def countSegmentsOneLiner1(s):
    return len([segment for segment in s.split(' ') if segment])

def countSegmentsOneLiner2(s):
    return sum(1 for i, char in enumerate(s) 
               if char != ' ' and (i == 0 or s[i-1] == ' '))
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n) where n is the length of the string. We need to examine each character.
- **Space Complexity:** O(1) for manual counting approaches, O(k) for split() approach where k is the number of segments.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to count words (sequences of alphabetic characters only)?  
  *Hint: Change the condition from "non-space" to "alphabetic" using char.isalpha().*

- What if spaces weren't the only delimiter (e.g., tabs, newlines)?  
  *Hint: Use char.isspace() or define a set of delimiter characters.*

- How would you return the actual segments instead of just counting them?  
  *Hint: Store segments in a list while counting, or use the split() result directly.*

- Can you solve this without using any built-in string methods?  
  *Hint: Use the manual counting approach with character-by-character examination.*

### Summary
This problem tests basic string processing and understanding of edge cases with whitespace handling. While Python's split() provides an elegant one-line solution, implementing manual counting demonstrates understanding of string traversal patterns and state management. The problem highlights the importance of considering edge cases like empty strings, multiple consecutive delimiters, and leading/trailing whitespace. These patterns are fundamental in text processing and appear frequently in parsing and tokenization problems.


### Flashcard
Count segments by tracking transitions from space to non-space; ignore leading/trailing/multiple spaces.

### Tags
String(#string)

### Similar Problems
