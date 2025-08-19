### Leetcode 193 (Easy): Valid Phone Numbers [Practice](https://leetcode.com/problems/valid-phone-numbers)

### Description  
Given a text file named `file.txt` where each line contains a phone number, you are required to print only those lines that are *valid US phone numbers*. Valid numbers must match one of two formats:  
- **(xxx) xxx-xxxx** (parentheses around the area code, a space, then three digits, a dash, four digits)  
- **xxx-xxx-xxxx** (just digits and dashes)  
No other formats, such as spaces-only or dots as separators, should be accepted.

### Examples  

**Example 1:**  
Input: `(123) 456-7890`  
Output: `(123) 456-7890`  
*Explanation: This matches the first valid pattern — three digits in parentheses, space, three digits, dash, four digits.*

**Example 2:**  
Input: `123-456-7890`  
Output: `123-456-7890`  
*Explanation: This matches the second valid pattern — three digits, dash, three digits, dash, four digits.*

**Example 3:**  
Input: `123 456 7890`  
Output: (no output)  
*Explanation: This line does not match either of the valid formats due to the spaces and lack of dashes or parentheses.*

### Thought Process (as if you’re the interviewee)  
First, read the problem: Each line in the file could be a phone number in a variety of forms, but I must *only* print lines matching *exactly* two specific formats. My brute force way would be to read each line, check for matches using string patterns, and output if found.  

Regex fits well, as the formats are strictly defined.  
- For `(xxx) xxx-xxxx`, the regex is: `'^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$'`  
- For `xxx-xxx-xxxx`, the regex is: `'^[0-9]{3}-[0-9]{3}-[0-9]{4}$'`  

I’d:  
- Read the file line by line  
- Check if the line matches *either* of the patterns using regex  
- Print if matched  

Optimize by merging into a single regex or using `grep -E` for regular expression alternation.

### Corner cases to consider  
- Lines with leading/trailing spaces
- Lines with too few/many digits
- Numbers with extra symbols: dots, slashes, extra parentheses
- Lines with mixed valid and invalid formats (should reject)
- Completely empty lines
- Lines with text or alphabetic characters

### Solution

```python
# This is a shell scripting problem, but here's equivalent logic shown in Python for clarity.
# Do not use regex libraries as a shortcut; construct pattern explicitly.

import re

def print_valid_phone_numbers(file_path):
    # Regular expressions for valid formats
    pattern1 = r'^\([0-9]{3}\) [0-9]{3}-[0-9]{4}$'
    pattern2 = r'^[0-9]{3}-[0-9]{3}-[0-9]{4}$'
    
    with open(file_path) as f:
        for line in f:
            line = line.rstrip('\n')
            # Check if line matches either valid pattern
            if re.match(pattern1, line) or re.match(pattern2, line):
                print(line)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(N) where N is the number of lines in the file. Each regex match operation is O(1) due to fixed size.
- **Space Complexity:** O(1) additional — no extra storage, just processing line by line.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend the solution to support more phone number formats (e.g., with country code, or dots as separators)?  
  *Hint: Consider how regex patterns would be modified or modularized for additional patterns.*

- How would your solution change if you had to process a much larger file (maybe in the order of GBs)?  
  *Hint: Discuss memory usage, buffering, streaming lines instead of loading all at once.*

- Can you write a solution that removes invalid numbers instead of just displaying the valid ones?  
  *Hint: Invert the regex logic.*

### Summary
This problem is a classic *filter-by-pattern* task and is best solved with regular expressions. It's a common shell or scripting pattern — reading and matching text with fixed (or parameterized) formats. The code pattern here applies to log filtering, data cleaning, or any case where only strictly formatted text lines are needed from messy input.

### Tags
Shell(#shell)

### Similar Problems
