### Leetcode 1429 (Medium): First Unique Number [Practice](https://leetcode.com/problems/first-unique-number)

### Description  
Design a class to manage a queue of integers and efficiently support the following:
- Return the first unique integer (present only once) in the queue at any time.
- Add new integers to the end of the queue.
- If there is no unique integer, return -1.

You must handle up to 10⁵ initial numbers and 5 × 10⁴ operations efficiently.

### Examples  
**Example 1:**  
Input: `["FirstUnique","showFirstUnique","add","showFirstUnique","add","showFirstUnique","add","showFirstUnique"]` 
Input: `[[[2,3,5]],[],[5],[],[2],[],[3],[]]`  
Output: `[null,2,null,2,null,3,null,-1]`  
*Explanation: Initialize with [2,3,5]. First unique: 2. Add 5 (now [2,3,5,5]): unique is still 2. Add 2 ([2,3,5,5,2]): unique is 3. Add 3 ([2,3,5,5,2,3]): now all numbers repeat, returns -1.*

**Example 2:**  
Input: `["FirstUnique","showFirstUnique","add","showFirstUnique"]` 
Input: `[[],[],,[]]`  
Output: `[null,809,null,-1]`  
*Explanation: Initialize with . First unique: 809. Add 809 ([809,809]): all numbers repeat, returns -1.*

### Thought Process (as if you’re the interviewee)  
Brute force: Each time, scan the queue from left finding the first element whose count is 1. This would be too slow for larger input sizes (O(n) per query).

Optimized: Use an ordered data structure to track candidates for uniqueness. We can combine:
- A counter (dict) for frequency.
- An OrderedDict or regular queue for element order.
- Each time an element is added, update its count and push to the queue if needed. For showFirstUnique, process queue head(s) until we find an element with count == 1.
All operations can be kept O(1) on average.

### Corner cases to consider  
- Empty initial queue.
- All elements are repeats (no unique number).
- Adding multiple new unique numbers.
- All numbers in queue added multiple times.
- Large numbers (up to 10⁸).

### Solution

```python
from collections import deque, Counter

class FirstUnique:
    def __init__(self, nums):
        # Counts for frequency
        self.counts = Counter()
        # Maintain order of UNIQUE candidates
        self.q = deque()
        for num in nums:
            self.add(num)
    
    def showFirstUnique(self):
        # Remove head(s) with count > 1
        while self.q and self.counts[self.q[0]] > 1:
            self.q.popleft()
        # Return front if exists, else -1
        if self.q:
            return self.q[0]
        return -1
    
    def add(self, value):
        self.counts[value] += 1
        # Only append when first time seen
        if self.counts[value] == 1:
            self.q.append(value)
```

### Time and Space complexity Analysis  
- **Time Complexity:**
    - Constructor: O(n) for n initial numbers.
    - add(value): O(1) average case (Counter, deque operations).
    - showFirstUnique(): O(1) average case – each duplicate gets popleft only once.
- **Space Complexity:** O(n + m) for n initial elements and m added elements/tracking counts.

### Potential follow-up questions (as if you’re the interviewer)  
- What if the numbers stream never ends?  
  *Hint: Would you need to remove old elements from memory?*

- Could you optimize for space if you have a tight ceiling?  
  *Hint: Use a double-ended linked list instead of queue? Remove counts for values with count > 1?*

- Suppose you have to support remove operations (remove(num) anywhere in the queue)?  
  *Hint: You'd need additional pointers or a doubly-linked list for O(1) removals.*

### Summary
This uses the classic "first unique" or queue + hash map pattern: efficient adding, frequency checking, and order tracking with Counter and queue. Similar logic can be used in LRU cache, streaming data uniqueness, and "first non-repeating character" types of problems.


### Flashcard
Use a counter and an ordered data structure to track unique elements and find the first unique number in the queue.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design), Queue(#queue), Data Stream(#data-stream)

### Similar Problems
