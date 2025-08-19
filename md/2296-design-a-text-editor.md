### Leetcode 2296 (Hard): Design a Text Editor [Practice](https://leetcode.com/problems/design-a-text-editor)

### Description  
Design a **text editor** supporting the following:
- `addText(text)`: Insert text at the current cursor position.
- `deleteText(k)`: Delete up to `k` characters left of the cursor. Returns how many were deleted.
- `cursorLeft(k)`: Move the cursor `k` positions left (as far as possible). Returns last 10 characters left of cursor.
- `cursorRight(k)`: Move cursor `k` positions right (as far as possible). Returns last 10 characters left of cursor.

Initial text is empty, and the cursor is at the start (`|`).

### Examples  

**Example 1:**  
Input:  
`["TextEditor","addText","deleteText","addText","cursorRight","cursorLeft","deleteText","cursorLeft","cursorRight"]`  
`[[],["leetcode"],[4],["practice"],[3],,,[2],]`  
Output:  
`[null,null,4,null,"etpractice","leet",4,"","practi"]`  
Explanation:  
- Init: `|`  
- addText("leetcode"): `leetcode|`  
- deleteText(4): `leet|` (deletes "code", returns 4)  
- addText("practice"): `leetpractice|`  
- cursorRight(3): cursor cannot move past end, remains at end, returns last 10 chars left of cursor: `"etpractice"`  
- cursorLeft(8): cursor moves 8 left: `leet|practice`, returns `"leet"`  
- deleteText(10): deletes 4 left of cursor: `|practice`, returns 4  
- cursorLeft(2): cursor already at start, stays, returns `""`  
- cursorRight(6): cursor moves 6 right: `practi|ce`, returns `"practi"`

**Example 2:**  
Input:  
`["TextEditor","addText","cursorLeft","addText","cursorRight"]`  
`[[],["abc"],[1],["d"],[2]]`  
Output:  
`[null,null,"ab",null,"abd"]`  
Explanation:  
- Init: `|`  
- addText("abc"): `abc|`  
- cursorLeft(1): `ab|c`, returns "ab"  
- addText("d"): `abd|c`  
- cursorRight(2): `abdc|`, returns "abd"

**Example 3:**  
Input:  
`["TextEditor","addText","cursorLeft","deleteText","cursorRight"]`  
`[[],["xyz"],[2],[5],[1]]`  
Output:  
`[null,null,"x",1,"x"]`  
Explanation:  
- Init: `|`  
- addText("xyz"): `xyz|`  
- cursorLeft(2): `x|yz`, returns "x"  
- deleteText(5): only "x" can be deleted left of cursor, returns 1  
- cursorRight(1): cursor moves right to between "" and "y": `|y z`, returns ""

### Thought Process (as if you’re the interviewee)  
Initially, I would try using a single string and a cursor index; all operations would simulate normal text editing.  
- **Brute-force:** Each insert, delete, or movement requires string slicing or concatenation, which may be O(n) per operation—too slow for lots of edits.
- **Optimized:** Instead, I'll split content into two stacks/lists:
    - One for content **left** of the cursor.
    - One for content **right** of the cursor.
  - This way, cursor movement and local edits are O(1) (list append/pop). Only returning the "last 10" characters to the left of the cursor needs O(10).
- **Trade-offs:** Minimizes time per operation. Amortized time is O(1) for each editing/moving step. This is a well-known "two-stack" trick for text editors.

### Corner cases to consider  
- Move cursor left/right more positions than text length.
- Delete more characters than present.
- Add/delete from empty text.
- Asking for last 10 left of cursor with less than 10 characters total.
- Repeated add/delete/move ops making list(s) empty/fill rapidly.

### Solution

```python
class TextEditor:
    def __init__(self):
        # left_stack: characters to the left of cursor (cursor at len(left_stack))
        # right_stack: characters to the right of cursor
        self.left = []
        self.right = []

    def addText(self, text: str) -> None:
        # Add each character to the left stack, putting them before the cursor
        for c in text:
            self.left.append(c)

    def deleteText(self, k: int) -> int:
        # Remove up to k from left stack
        deleted = 0
        while self.left and deleted < k:
            self.left.pop()
            deleted += 1
        return deleted

    def cursorLeft(self, k: int) -> str:
        # Move up to k from left to right of cursor
        for _ in range(min(k, len(self.left))):
            self.right.append(self.left.pop())
        # Return last 10 left of cursor
        return ''.join(self.left[-10:])

    def cursorRight(self, k: int) -> str:
        # Move up to k from right to left of cursor
        for _ in range(min(k, len(self.right))):
            self.left.append(self.right.pop())
        return ''.join(self.left[-10:])
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Each operation (add, delete, move) is O(k) where k is the argument (but only up to available chars).
  - Getting last 10 chars is O(1).
  - Amortized, each call is fast as stacks only move elements between them.

- **Space Complexity:**  
  - O(n) for n = total text length; each character in either left or right stack.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we need to support undo/redo of operations?  
  *Hint: You'd need a stack of operation history, similar to implementing a Command pattern or snapshotting.*

- How could you efficiently support very large text files (millions of characters) with insertions in the middle?  
  *Hint: Use balanced trees or a rope data structure, not stacks/lists, to get O(log n) insert/delete anywhere in text.*

- How to implement find/replace efficiently in this text editor?  
  *Hint: Store text in a suitable structure and support substring search algorithms.*

### Summary
This problem uses the **two-stack (left/right) pattern** for cursor-editable structures, a classic design for efficient edits and cursor moves. It's useful in simulating editors, calculators, or undo/redo—but for huge files or random-access, trees/ropes may be better. The approach here is a common, highly performant design for most real-world editors’ inner loops.

### Tags
Linked List(#linked-list), String(#string), Stack(#stack), Design(#design), Simulation(#simulation), Doubly-Linked List(#doubly-linked-list)

### Similar Problems
