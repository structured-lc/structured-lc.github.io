### Leetcode 722 (Medium): Remove Comments [Practice](https://leetcode.com/problems/remove-comments)

### Description  
Given a list of strings, each representing a line of C++ source code, remove all the comments and return the uncommented code as a list of strings.  
There are **two types of comments**:
- **Line comments:** Start with `//` and extend to the end of the line.
- **Block comments:** Start with `/*` and end with `*/`, possibly spanning multiple lines.

When removing comments:
- Ignore content inside comments.
- Remove lines that become empty after comments are stripped.

### Examples  

**Example 1:**  
Input: `["int main() {", "  // print hello", "  printf(\"Hello\");", "}"]`  
Output: `["int main() {", "  printf(\"Hello\");", "}"]`  
*Explanation: The line comment `// print hello` is stripped; otherwise, lines remain unchanged.*

**Example 2:**  
Input: `["int a = 1;", "/* block comment", "   still in comment */", "int b = 2;"]`  
Output: `["int a = 1;", "int b = 2;"]`  
*Explanation: Block comment removes lines 2 and 3; only code before and after is retained.*

**Example 3:**  
Input: `["int x = 1; /* start block", "still in block", "end block */ int y = 2;"]`  
Output: `["int x = 1;", "int y = 2;"]`  
*Explanation: Block comment spans the first three lines. Only "int x = 1;" and "int y = 2;" remain.*

### Thought Process (as if you’re the interviewee)  
**Brute-force:**  
- Go through each line. For each, track if currently in a block comment.
- If inside a block comment, skip content until reaching closing `*/`.
- If not inside a block comment:
  - On `//`, ignore all content after.
  - On `/*`, start a block comment and ignore content until finding `*/`.

**Optimized approach:**  
- Maintain an **in_block** boolean flag.
- For each line, use a buffer (string builder) to collect code outside of comments.
- Scan char-by-char:
  - If entering a line comment (`//`) outside block, break line immediately.
  - If entering a block (`/*`), set in_block, skip until `*/` found.
  - If in a block, keep skipping chars until it ends.
- At the end of each line, if **not in a block** and buffer is not empty, append the line to result.
- Repeat for all lines.

**Trade-offs:**  
This approach is:
- Efficient: Each character is processed at most once.
- Handles nested and overlapping comments robustly.
- Uses constant extra space besides output.

### Corner cases to consider  
- Code with only comments; output should be empty.
- Block comment starts mid-line, ends mid-line.
- Multiple block and line comments in sequence or nested.
- Block comment spanning multiple lines.
- Code with no comments at all.
- Empty source input.

### Solution

```python
def removeComments(source):
    result = []
    in_block = False
    buffer = []

    for line in source:
        i = 0
        if not in_block:
            buffer = []
        length = len(line)
        while i < length:
            # If not in a block
            if not in_block and i + 1 < length and line[i] == '/' and line[i + 1] == '/':
                # Line comment found, ignore rest of line
                break
            elif not in_block and i + 1 < length and line[i] == '/' and line[i + 1] == '*':
                # Block comment starts
                in_block = True
                i += 2
            elif in_block and i + 1 < length and line[i] == '*' and line[i + 1] == '/':
                # Block comment ends
                in_block = False
                i += 2
            elif not in_block:
                # Normal code character
                buffer.append(line[i])
                i += 1
            else:
                # Within block comment, skip
                i += 1
        # Add to result if buffer non-empty and not in block comment
        if buffer and not in_block:
            result.append(''.join(buffer))
    return result
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n × m) where n is the number of lines, and m is the average length of a line. Each character is processed at most once.
- **Space Complexity:** O(n × m) for storing the output list (worst case: no comments removed, all code returned).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you extend this to ignore comments that occur inside string literals?
  *Hint: Track if currently inside quotes as you process each character.*
- What if you wanted to preserve empty lines in the output?
  *Hint: Change the output condition to always append lines, even if they are empty after stripping comments.*
- How would you modify the solution for languages with different comment syntax, e.g., Python or HTML?
  *Hint: Abstract the markers for line and block comments as configurable parameters.*

### Summary
We used a **state-machine pattern** with a single pass per character, toggling an in_block flag to distinguish code from comments. This finite state approach is robust and commonly used for parsing or lexical analysis problems, and can be adapted for similar source code refactoring or mini-compiler tasks.

### Tags
Array(#array), String(#string)

### Similar Problems
- Mini Parser(mini-parser) (Medium)
- Ternary Expression Parser(ternary-expression-parser) (Medium)