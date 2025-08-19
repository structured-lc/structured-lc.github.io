### Leetcode 1598 (Easy): Crawler Log Folder [Practice](https://leetcode.com/problems/crawler-log-folder)

### Description  
Given an array of string operations representing moves in a simulated file system, determine the minimum number of steps needed to return to the root (main) folder after performing all the operations.  
Operations:  
- `"../"`: Move up one level (to parent folder). If already at the root, stay at root.  
- `"./"`: Stay in the current folder.  
- `"x/"`: Move into a child folder named x (guaranteed to exist).  

The goal is to track the current depth and return to root using the minimum undo operations.

### Examples  

**Example 1:**  
Input: `["d1/","d2/","../","d21/","./"]`  
Output: `2`  
*Explanation: Go into d1 (depth 1), go into d2 (depth 2), "../" returns to d1 (depth 1), enter d21 (depth 2), "./" does nothing. Final depth: 2.*

**Example 2:**  
Input: `["d1/","d2/","./","d3/","../","d31/"]`  
Output: `3`  
*Explanation: d1 (1), d2 (2), "./" (still 2), d3 (3), "../" (back to d2, 2), d31 (3). End depth = 3.*

**Example 3:**  
Input: `["d1/","../","../","../"]`  
Output: `0`  
*Explanation: d1 (1), "../" (back to 0), "../" (can't go below 0), "../" (still at 0).*

### Thought Process (as if you’re the interviewee)  
- **Brute-Force**: Use a stack to represent the folder structure, pushing for every subfolder and popping for "../".  
- **Optimized**: A counter variable is sufficient: increase for a child folder, decrease for "../" (but never below 0), ignore "./".  
- Stack is not strictly necessary since we only need the depth, not the path. This gives O(1) space and O(n) time.

### Corner cases to consider  
- All operations are `"./"`: Output should be 0.
- Multiple `"../"` at root: Should not go negative.
- Empty logs array: Output should be 0.
- Series with only up and down commands.
- No directory changes at all.
- Consecutive `../` after single subfolder.

### Solution

```python
def minOperations(logs):
    # Track the "depth" in directory structure
    depth = 0
    for op in logs:
        if op == "../":
            # Move up if we're not already at root
            depth = max(0, depth - 1)
        elif op == "./":
            # Stay in current directory, do nothing
            continue
        else:
            # Move into subdirectory
            depth += 1
    return depth
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the number of log entries, since we traverse the input once.
- **Space Complexity:** O(1), only a variable for current depth. No extra structures required.

### Potential follow-up questions (as if you’re the interviewer)  

- How would your solution change if there is an upper bound on folder depth?  
  *Hint: Is the logic affected if there’s a max depth constraint?*

- If logs included absolute paths, how would you compute the final state?  
  *Hint: Would need to parse and handle the entire path string.*

- If you had to print the *actual path* instead of just steps to root?  
  *Hint: Stack data structure to store each entered directory.*

### Summary
This problem is a classic example of simulating stack-like navigation using a simple counter pattern, avoiding unnecessary data structures when possible. The approach is efficient and common for problems where only the "depth" or "balance" is tracked (e.g., parenthesis matching, mountain/valley counting).

### Tags
Array(#array), String(#string), Stack(#stack)

### Similar Problems
- Baseball Game(baseball-game) (Easy)
- Backspace String Compare(backspace-string-compare) (Easy)