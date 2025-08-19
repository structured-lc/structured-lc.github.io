### Leetcode 195 (Easy): Tenth Line [Practice](https://leetcode.com/problems/tenth-line)

### Description  
Given a text file called `file.txt`, print only the tenth line of the file. If the file has fewer than 10 lines, do not output anything.  
This problem is typically solved in Bash (shell scripting); you may be asked for alternatives or code in other languages.

### Examples  

**Example 1:**  
Input:  
```
file.txt:
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
Line 10
```
Output:  
```
Line 10
```
Explanation: The tenth line in the file is "Line 10".

**Example 2:**  
Input:  
```
file.txt:
Line 1
Line 2
Line 3
Line 4
Line 5
Line 6
Line 7
Line 8
Line 9
```
Output:  
```
```
Explanation: There are only 9 lines, so nothing is printed.

**Example 3:**  
Input:  
```
file.txt:
a
b
c
d
e
f
g
h
i
j
k
```
Output:  
```
j
```
Explanation: The tenth line is "j" regardless of what follows.

### Thought Process (as if you’re the interviewee)  
Start by reading the file line by line. Maintain a counter of how many lines you've seen. When the counter reaches 10, print that line and exit (or ignore subsequent lines).  
- **Brute-force:** Read all lines and store them, then print line 10 if it exists.  
- **Optimized:** No need to store all lines—just increment a counter, and print only when the count equals 10.  
- **Shell approach:** Use `sed`, `awk`, or a combination of `head` and `tail` to extract the tenth line efficiently.  
The simplest and direct approach is usually best here due to the line-based nature.

### Corner cases to consider  
- The file is empty.
- The file contains fewer than 10 lines (including exactly 0 or 9).
- The file has exactly 10 lines.
- The file contains more than 10 lines.
- Lines may be empty or contain special characters (shouldn't affect logic since we're only counting lines).

### Solution

```python
# Read file.txt, print only the 10th line if present

def print_tenth_line():
    try:
        with open('file.txt', 'r') as f:
            for i, line in enumerate(f):     # i starts at 0
                if i == 9:                   # 10ᵗʰ line: (i = 9)
                    print(line.rstrip('\n')) # remove trailing newline
                    return
        # Less than 10 lines: print nothing
    except FileNotFoundError:
        # File not found: print nothing or handle as needed
        pass
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of lines in the file, since we may need to process up to all lines in the worst case.
- **Space Complexity:** O(1), since no extra space is used besides a constant-size counter and the currently processed line.

### Potential follow-up questions (as if you’re the interviewer)  

- What if you need to print the 1000ᵗʰ line?  
  *Hint: How many lines do you need to traverse? Should logic change if the file is huge?*

- How would you print all lines between the 10ᵗʰ and 20ᵗʰ (inclusive)?  
  *Hint: Use counters and comparisons, or adjust your shell/programming command accordingly.*

- What if the file is very large—how would you minimize memory usage?  
  *Hint: Process line by line instead of reading the whole file at once (which the current solution already does).*

### Summary
This is a classic "kᵗʰ element in a stream" question, commonly solved with a counter. The coding pattern (single pass, constant space) is standard for problems where you need only a specific line or item from sequential input. This approach applies to finding any particular index in a file/stream, or simple parsing tasks where full context isn't needed.

### Tags
Shell(#shell)

### Similar Problems
