### Leetcode 2337 (Medium): Move Pieces to Obtain a String [Practice](https://leetcode.com/problems/move-pieces-to-obtain-a-string)

### Description  
Given two strings, **start** and **target**, each consisting only of `'L'`, `'R'`, and `'_'` (underscore), determine whether it is possible to transform **start** into **target** using some allowed operations:
- You can move each `'L'` left into an empty adjacent slot `('_')` (but never right).
- You can move each `'R'` right into an empty adjacent slot (but never left).
You can repeat these moves any number of times.  
The task is to check if it's possible to obtain the **target** string from **start** using these moves.

### Examples  

**Example 1:**  
Input: `start = "_L__R__R_", target = "L______RR"`  
Output: `True`  
*Explanation: Move the first 'L' left to position 0, shift each 'R' to the rightmost available slots.*

**Example 2:**  
Input: `start = "R_L_", target = "__LR"`  
Output: `False`  
*Explanation: The 'R' can't move left and 'L' can't move right, so transformation is not possible.*

**Example 3:**  
Input: `start = "_R", target = "R_"`  
Output: `False`  
*Explanation: 'R' in start is to the left of the target, but it can't move left to reach that position.*

### Thought Process (as if you’re the interviewee)  
- **Brute force** would simulate all possible moves, but the state space is too large, making it infeasible for long strings.
- **Optimization:**  
  - Observe that the order and number of non-'_' characters must match in both strings.  
  - For each 'L': It must never move right, so its position in **start** should be ≤ its target index.  
  - For each 'R': It must never move left, so its position in **start** should be ≥ its target index.
  - Use two pointers to walk through both **start** and **target**, ignoring '_' and compare the positions and type. If all such checks succeed, the transformation is possible.
  - **Edge:** If the non-underscore letters don't match in order and count, it's immediately impossible.

### Corner cases to consider  
- Empty strings.
- Strings of different lengths.
- All underscores (no pieces to move).
- All 'L's or all 'R's.
- Multiple pieces clustering together (e.g., "LL__RR").
- Pieces appear in different orders between start and target.

### Solution

```python
def canChange(start: str, target: str) -> bool:
    n = len(start)
    i, j = 0, 0

    while i < n or j < n:
        # Skip underscores in both strings
        while i < n and start[i] == '_':
            i += 1
        while j < n and target[j] == '_':
            j += 1

        # If both pointers reach the end, it's a match!
        if i == n and j == n:
            return True
        # If only one pointer is at the end, mismatch
        if i == n or j == n:
            return False

        # Piece must match
        if start[i] != target[j]:
            return False

        # For 'L', it can only move left (i ≥ j)
        if start[i] == 'L' and i < j:
            return False
        # For 'R', it can only move right (i ≤ j)
        if start[i] == 'R' and i > j:
            return False

        i += 1
        j += 1

    return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(n), where n is the length of the strings. Each pointer scans the string once.
- **Space Complexity:** O(1), since only a few integer variables are used, regardless of input size.

### Potential follow-up questions (as if you’re the interviewer)  

- Can you modify the algorithm for arbitrary movements for both 'L' and 'R' (they can move in either direction)?
  *Hint: How would position checks change if both letters were able to move both ways, or what if movement has a fixed range?*

- What if the pieces could jump over each other, not just to adjacent underscores?
  *Hint: Would the relative order matter, or would only the count be enough?*

- Can you return the sequence of moves rather than just a boolean?
  *Hint: Can you reconstruct the moves, and is it always unique?*

### Summary
This approach uses the **two-pointer pattern** on both input strings, comparing only the meaningful pieces and ensuring their movement constraints are satisfied relative to their allowable directions. This is a classic pointer movement and state validation problem, frequently encountered when transforming states under strict rules (it also appears in sliding puzzles and other movement-based string problems).

### Tags
Two Pointers(#two-pointers), String(#string)

### Similar Problems
- Valid Parentheses(valid-parentheses) (Easy)
- Swap Adjacent in LR String(swap-adjacent-in-lr-string) (Medium)