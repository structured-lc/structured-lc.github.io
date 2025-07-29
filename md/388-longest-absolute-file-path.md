### Leetcode 388 (Medium): Longest Absolute File Path [Practice](https://leetcode.com/problems/longest-absolute-file-path)

### Description  
Given a string representation of a file system, where directories and files are organized with `\n` (newline) and `\t` (tab) as indentation, compute the length of the longest absolute path to a file.  
- Each directory level is indented by one `\t`.  
- Files contain a dot `.` in their names (directories do not).  
- Absolute path uses `/` as a separator (but input doesn't contain literal `/`).  
If there are no files, return 0.

### Examples  

**Example 1:**  
Input: `"dir\n\tsubdir1\n\tsubdir2\n\t\tfile.ext"`  
Output: ``20``  
*Explanation: The only file is at "dir/subdir2/file.ext", which contains 20 characters including the separators (`/`).*

**Example 2:**  
Input: `"dir\n\tsubdir1\n\t\tfile1.ext\n\t\tsubsubdir1\n\tsubdir2\n\t\tsubsubdir2\n\t\t\tfile2.ext"`  
Output: ``32``  
*Explanation: There are two files:  
- "dir/subdir1/file1.ext" (length 21)  
- "dir/subdir2/subsubdir2/file2.ext" (length 32)    
The longest path is for "file2.ext".*

**Example 3:**  
Input: `"a"`  
Output: ``0``  
*Explanation: No files, only a directory.*

### Thought Process (as if you’re the interviewee)  
To tackle the problem, I'd first consider parsing the input line by line, splitting by `\n`. For each line, I'll need to determine its depth (by counting `\t`), its name, and whether it's a file or a directory.

**Brute-force idea:**  
Reconstruct every absolute path for each file, keeping track of possible parent directories at every level, and then compute the maximum length. The problem is that building all paths for each file would be inefficient, especially with deeply nested directories.

**Optimized approach (Stack):**  
Use a stack/list to keep running totals of path lengths at each depth:
- For each line:  
  - The number of leading `\t` gives the current level.
  - If we're at level L, then the parent is at level L-1.
  - Pop from the stack if we've moved up a directory.
  - The current total length is (parent length) + 1 (for `/`) + (len of current name).
  - If it's a file, update the result with the maximum path length.
- This approach only processes each character once, giving O(n) time and O(n) space.

### Corner cases to consider  
- No file at all, only directories (should return 0)
- Files at the root level (no tabs)
- Files or directories with empty names (input constraint: all names have positive length)
- Continuous directories without files
- Large depth (deeply nested)
- Multiple files at the same or different depths

### Solution

```python
def lengthLongestPath(input: str) -> int:
    # Stack to hold the length of path at each depth
    stack = [0]  # stack[depth] = total length to this depth
    max_len = 0

    for line in input.split('\n'):
        # Level is the number of leading '\t'
        level = line.count('\t')
        name = line.lstrip('\t')
        
        # If we move up the directory hierarchy, pop until reach current depth
        while len(stack) > level + 1:
            stack.pop()
        # Current length = parent length + '/' + len(name)
        curr_len = stack[-1] + len(name) + (1 if level > 0 else 0)
        # If it's a file
        if '.' in name:
            max_len = max(max_len, curr_len)
        else:
            # It's a directory, push current length to stack
            stack.append(curr_len)
    return max_len
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n = len(input). Each character is visited once, and all stack operations are O(1).
- **Space Complexity:** O(d), where d = maximum depth of the directory, since stack holds at most (depth + 1) items.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the maximum input string is extremely large (10⁵ or more)?  
  *Hint: Can you process the input without fully storing every directory name?*

- What if you had to output the full path itself, not just the length?  
  *Hint: How to reconstruct the path as you backtrack through the stack?*

- How would you handle Unicode or non-English directory names?  
  *Hint: Does your method depend on ASCII or string splitting?*

### Summary
This is a classic **parsing and stack** pattern, frequently used whenever there's a need to reconstruct path-based or nested structures from a linear input (e.g., directory tree, HTML/XML tags, or expressions). It's efficient and avoids excessive string operations, and applies broadly across parsing problems with nested, indented, or token-based input formats.