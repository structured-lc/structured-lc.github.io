### Leetcode 71 (Medium): Simplify Path [Practice](https://leetcode.com/problems/simplify-path)

### Description  
Given a Unix-style **absolute path** string (always starting with '/'), simplify it to its canonical path as a Unix shell would. The rules are:
- `.` means current directory (ignore it).
- `..` means move to parent directory (pop previous if possible).
- Multiple consecutive slashes (`//`) count as a single slash.
- The output should **start with a single slash**, have **no trailing slash (except for root '/')**, and **only single slashes between directory names**.

You must ignore empty directories, reduce multiple slashes, and handle `.` or `..` correctly.

### Examples  

**Example 1:**  
Input: `/home/`  
Output: `/home`  
*Explanation: Trailing slash is ignored and extra slashes are removed.*

**Example 2:**  
Input: `/../`  
Output: `/`  
*Explanation: `..` means go up, but we’re already at root, so stay at `/`. No higher directory to go up.*

**Example 3:**  
Input: `/home//foo/`  
Output: `/home/foo`  
*Explanation: Ignore repeated slashes; simplify path to canonical form.*

**Example 4:**  
Input: `/a/./b/../../c/`  
Output: `/c`  
*Explanation:*
- `/a/` goes to "a".
- `.` ignored.
- `/b/` goes to "a/b".
- `/../` means remove "b" (move up: now at "a").
- `/../` means remove "a" (move up: now at root).
- `/c/` enters "c".

**Example 5:**  
Input: `/a/./b/c/`  
Output: `/a/b/c`  
*Explanation: "." is ignored; path simply builds as a → b → c.*

### Thought Process (as if you’re the interviewee)  

Start by observing that *directories are separated by slashes*, and special cases are `.`, `..`, and empty strings (from multiple slashes).  
- **Brute-force idea:** Parse input character by character, keeping a stack to model movement (`..` pops the stack, names push onto it, `.` and empty strings are ignored).
- Each slash-separated chunk is handled independently.
- Stack simulates the current path.  
- At the end, join the stack with slashes to form the canonical path.

**Optimizations/trade-offs:**  
- Since we process input in one left-to-right scan and use a stack, this is optimal for both time and space.
- No need for complex parsing or recursion, since stack suffices for parent-child traversal.  
- Edge considerations: must avoid empty components (from `//`), handle root and no names gracefully.

### Corner cases to consider  
- Path is just `/` (root).
- Path includes very deep `..` so that stack is empty early.
- Sequential/multiple slashes, e.g., `//`.
- Components with only `.` (do nothing).
- Path ending with slash, e.g., `/abc/`.
- Path starts and stays at root, e.g., `/../`.
- Path with only special components, e.g., `/./././`.

### Solution

```python
def simplifyPath(path: str) -> str:
    # Use a stack to store the parts of the path
    stack = []
    # Split the path by '/' to process each component
    for part in path.split('/'):
        if part == '' or part == '.':
            # Skip empty and current directory references
            continue
        elif part == '..':
            # Pop the top if possible to go back to parent directory
            if stack:
                stack.pop()
        else:
            # Add valid directory name to stack
            stack.append(part)
    # Build the simplified path
    return '/' + '/'.join(stack)
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the path string. Each character is processed once as we split and iterate over all segments.
- **Space Complexity:** O(k), where k is the number of directory names in the simplified path. The stack holds at most all valid directory names in the input (excluding '.' and ignoring `..` when at root).

### Potential follow-up questions (as if you’re the interviewer)  

- What if path is not absolute (doesn’t start with `/`)?  
  *Hint: How would you handle relative paths or paths in Windows format?*

- What if invalid characters or malformed sequences appear (e.g., `/home/../..//etc/./`)?  
  *Hint: Should we validate directory names or only process special cases?*

- Can you modify this to return the list of directory components instead of the canonical string?  
  *Hint: Instead of joining at the end, just return the stack.*

### Summary
The solution uses the **stack** pattern, simulating path traversal as Unix-like shells do. This canonicalization is a classic example of using stacks for "undo" or "backtracking" style operations, and similar logic appears in file path normalization, browser history navigation, parsing matching parentheses, etc. Efficient, straightforward, and robust—handling all expected directory rules cleanly.

### Tags
String(#string), Stack(#stack)

### Similar Problems
