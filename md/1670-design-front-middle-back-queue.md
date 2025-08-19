### Leetcode 1670 (Medium): Design Front Middle Back Queue [Practice](https://leetcode.com/problems/design-front-middle-back-queue)

### Description  
Design a queue-like data structure with these operations:
- `pushFront(val)`: Add val to the front.
- `pushMiddle(val)`: Add val in the middle (just before ⌊n/2⌋&#x2014;0-based index).
- `pushBack(val)`: Add val to the end.
- `popFront()`: Remove and return front element. If empty, return -1.
- `popMiddle()`: Remove and return middle element (at ⌊(n-1)/2⌋ if even). If empty, return -1.
- `popBack()`: Remove and return back element. If empty, return -1.
Support all operations efficiently.

### Examples  

**Example 1:**  
Input: 
```
FrontMiddleBackQueue q = new FrontMiddleBackQueue();
q.pushFront(1);   // [1]
q.pushBack(2);    // [1,2]
q.pushMiddle(3);  // [1,3,2]
q.pushMiddle(4);  // [1,4,3,2]
q.popFront();     // returns 1, [4,3,2]
q.popMiddle();    // returns 3, [4,2]
q.popMiddle();    // returns 4, [2]
q.popBack();      // returns 2, []
q.popFront();     // returns -1, []
```
Output: `[1,3,4,2,-1]`
*Explanation: Operations manipulate the sequence as described.*

**Example 2:**  
Input:
```
q = new FrontMiddleBackQueue();
q.pushFront(7); // [7]
q.popBack();    // []
q.popMiddle();  // -1
q.popFront();   // -1
```
Output: `[7,-1,-1]`
*Explanation: Handles empty edge cases.*

**Example 3:**  
Input:
```
q = new FrontMiddleBackQueue();
q.pushBack(10); // [10]
q.pushFront(20); // [20,10]
q.pushMiddle(30); // [20,30,10]
q.popMiddle(); // returns 30, [20,10]
```
Output: ``
*Explanation: Shows effect of `pushMiddle` and `popMiddle` with both odd and even length.*


### Thought Process (as if you’re the interviewee)  
- The structure requires efficient insert/delete at both ends and in the middle.
- Python list insert/remove at middle is O(n) but can use two deques to efficiently simulate.
- Maintain two deques (`front`, `back`) so that:
  - `front` stores first ⌊n/2⌋ elements, `back` stores the rest.
  - `pushFront` → add to `front`; `pushBack` → add to `back`.
  - `pushMiddle` → add to end of `front` if fronts are not bigger, else to start of `back`.
  - After any push/pop, rebalance so sizes differ by at most 1.
- `popFront`/`popBack` are just pops from either end; `popMiddle` is pop from end of `front` (if sizes equal, or from front of `back`), choosing left-middle.

### Corner cases to consider  
- Popping from empty queue (must return -1)
- Middle when number of items is even vs odd
- Rebalancing after each operation
- Multiple consecutive pops, edge cases

### Solution

```python
from collections import deque

class FrontMiddleBackQueue:
    def __init__(self):
        self.front = deque()
        self.back = deque()
    
    def _rebalance(self):
        # Keep sizes equal or front bigger by one
        while len(self.front) > len(self.back) + 1:
            self.back.appendleft(self.front.pop())
        while len(self.front) < len(self.back):
            self.front.append(self.back.popleft())

    def pushFront(self, val: int) -> None:
        self.front.appendleft(val)
        self._rebalance()

    def pushMiddle(self, val: int) -> None:
        self.front.append(val)
        self._rebalance()

    def pushBack(self, val: int) -> None:
        self.back.append(val)
        self._rebalance()

    def popFront(self) -> int:
        if self.front:
            val = self.front.popleft()
            self._rebalance()
            return val
        elif self.back:
            val = self.back.popleft()
            self._rebalance()
            return val
        else:
            return -1

    def popMiddle(self) -> int:
        if not self.front and not self.back:
            return -1
        if len(self.front) == len(self.back):
            val = self.front.pop()
        else:
            val = self.front.pop()
        self._rebalance()
        return val

    def popBack(self) -> int:
        if self.back:
            val = self.back.pop()
            self._rebalance()
            return val
        elif self.front:
            val = self.front.pop()
            self._rebalance()
            return val
        else:
            return -1
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(1) amortized per operation, due to deque rebalancing.
- **Space Complexity:** O(n), for n total items, split between two deques.


### Potential follow-up questions (as if you’re the interviewer)  
- Can you achieve strict O(1) worst-case per operation?
  *Hint: Consider double-linked lists and explicit pointers.*

- What if you had to return the right-middle instead of left-middle for even sizes?
  *Hint: Adjust which deque you pop from; update balancing rules.*

- How does the structure change if only pushMiddle/popMiddle are required?
  *Hint: You might be able to use one deque or a different split.*

### Summary
This is a classic double-ended queue/pointer splitting design, adapted for efficiently supporting dynamic middle insertions and removals. The pattern generalizes to cases where a data structure needs to support random-access middle operations but full random-access would be too slow or complicated.

### Tags
Array(#array), Linked List(#linked-list), Design(#design), Queue(#queue), Data Stream(#data-stream)

### Similar Problems
- Design Circular Deque(design-circular-deque) (Medium)
- Design Circular Queue(design-circular-queue) (Medium)