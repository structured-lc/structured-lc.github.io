### Leetcode 1472 (Medium): Design Browser History [Practice](https://leetcode.com/problems/design-browser-history)

### Description  
Implement a browser history manager that can:
- Visit a new URL from the current page (clearing forward history)
- Move back up to n steps
- Move forward up to n steps

Your class should support:
- `BrowserHistory(homepage)`: constructor initializing with homepage
- `visit(url)`: visits the url, drops forward history
- `back(steps)`: move up to `steps` steps back
- `forward(steps)`: move up to `steps` steps forward
Always return the current URL after back/forward.

### Examples  
**Example 1:**  
Input: 
```
BrowserHistory("leetcode.com")
visit("google.com")
visit("facebook.com")
visit("youtube.com")
back(1)
back(1)
forward(1)
visit("linkedin.com")
forward(2)
back(2)
back(7)
```
Output: 
```
[null,null,null,null,"facebook.com","google.com","facebook.com",null,"linkedin.com","google.com","leetcode.com"]
```
*Explanation: Maintains a history pointer. Forward/Back go stepwise; visit clears forward history.*

### Thought Process (as if you’re the interviewee)  
You need an efficient structure for visiting (inserting), moving back and forward—both O(1) preferred. Two stacks or an array with a pointer can handle all operations efficiently.
 
Options:
- Use a list with a cursor for the current index
- On visit: append up to cursor, then add new url and advance cursor; drop forward history
- Back/Forward: move index pointer safely within bounds

### Corner cases to consider  
- back() beyond the start
- forward() beyond the end
- visit() after back, then back again
- One item history

### Solution

```python
class BrowserHistory:
    def __init__(self, homepage):
        self.history = [homepage]  # List of visited URLs
        self.current = 0           # Current page index

    def visit(self, url):
        # Remove all forward history entries
        self.history = self.history[:self.current + 1]
        self.history.append(url)
        self.current += 1

    def back(self, steps):
        self.current = max(0, self.current - steps)
        return self.history[self.current]

    def forward(self, steps):
        self.current = min(len(self.history) - 1, self.current + steps)
        return self.history[self.current]
```

### Time and Space complexity Analysis  

- **Time Complexity:** All operations O(1) on average (no shifting, just pointer/index increments)
- **Space Complexity:** O(n), n = number of visits (stored history)

### Potential follow-up questions (as if you’re the interviewer)  

- (What if unlimited history is not allowed?)  
  *Hint: Truncate old pages if history exceeds size limit.*

- (How to support tabs or multiple browsers?)  
  *Hint: One BrowserHistory per tab; consider shared or isolated histories.*

- (How to make it thread-safe?)  
  *Hint: Locking or concurrent data structures for shared histories.*

### Summary
Classic design/implementation problem for browser command patterns. List+pointer is a standard way, and simulates stack-like back/forward efficiently. This question is similar to undo/redo editors and other command-history scenarios.

### Tags
Array(#array), Linked List(#linked-list), Stack(#stack), Design(#design), Doubly-Linked List(#doubly-linked-list), Data Stream(#data-stream)

### Similar Problems
- Design Video Sharing Platform(design-video-sharing-platform) (Hard)