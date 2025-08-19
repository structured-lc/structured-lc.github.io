### Leetcode 895 (Hard): Maximum Frequency Stack [Practice](https://leetcode.com/problems/maximum-frequency-stack)

### Description  
Design a special stack-like data structure that supports two operations:
- **push(x)**: Pushes integer x onto the stack.
- **pop()**: Removes and returns the most frequent element in the stack. If there’s a tie (multiple elements have the same highest frequency), return the element that was most recently pushed (i.e., closest to the top of the stack).

The push and pop operations should run in O(1) average time.

### Examples  

**Example 1:**  
Input=`push(5), push(7), push(5), push(7), push(4), push(5), pop(), pop(), pop(), pop()`  
Output=`5, 7, 5, 4`  
Explanation.  
- Stack after pushes: [5,7,5,7,4,5]  
- pop(): 5 has frequency 3 (max), return 5  
- pop(): Both 7 and 5 have frequency 2; 7 was pushed after most recent 5, return 7  
- pop(): Now 5 (freq 2), 4 and 7 (freq 1), return 5  
- pop(): Only 4 and 7 left with freq 1; 4 was pushed after 7, return 4

**Example 2:**  
Input=`push(1), push(2), push(3), pop(), pop(), pop()`  
Output=`3, 2, 1`  
Explanation.  
All have same frequency 1. Most recent first, so 3, 2, 1 returned.

**Example 3:**  
Input=`push(2), push(2), push(1), pop(), pop()`  
Output=`2, 2`  
Explanation.  
2 is highest frequency (2 times), so both pops return 2.

### Thought Process (as if you’re the interviewee)  
First, a naive approach would be to keep a regular stack and count occurrences for each pop, but this results in O(n) pop as we’d scan the stack.

To optimize:
- We need quick access to the most frequent element and, in case of ties, to the most recently added among them.
- Idea: 
  - Keep a frequency map (val → count) to track how many times each element appears.
  - For each frequency, maintain a stack of numbers at that frequency (freq → stack).
  - Keep track of the current maximum frequency.
  - On push: 
    - Increment its frequency, add to the stack for that frequency.
    - Update maximum frequency if needed.
  - On pop:
    - Pop from the stack for the current max frequency.
    - Decrement the number’s frequency.
    - If the stack for max frequency is empty, decrease max frequency.

This guarantees all operations are O(1) time.

### Corner cases to consider  
- Multiple elements with same frequency.
- All elements unique.
- Pushing and popping until empty, then new inserts.
- Repeated pops with only one value.
- Handling negative or large integers.
- Edge: only pops, no pushes.
- Large sequences: efficiency.

### Solution

```python
class FreqStack:
    def __init__(self):
        # Map from value to its current frequency
        self.val_to_freq = {}
        # Map from frequency to stack of values with that frequency
        self.freq_to_vals = {}
        # Track the current maximum frequency in the stack
        self.max_freq = 0

    def push(self, x):
        # Step 1: Increment this value's frequency
        freq = self.val_to_freq.get(x, 0) + 1
        self.val_to_freq[x] = freq

        # Step 2: If this is a new max frequency, update max_freq
        if freq > self.max_freq:
            self.max_freq = freq
        # Step 3: Add value to freq's stack
        if freq not in self.freq_to_vals:
            self.freq_to_vals[freq] = []
        self.freq_to_vals[freq].append(x)

    def pop(self):
        # Step 1: Pop from the stack associated with max frequency
        x = self.freq_to_vals[self.max_freq].pop()
        # Step 2: Decrement value's frequency
        self.val_to_freq[x] -= 1
        # Step 3: If no more values at this max frequency, lower max_freq
        if not self.freq_to_vals[self.max_freq]:
            self.max_freq -= 1
        return x
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  Both `push` and `pop` run in O(1) average time. All underlying operations—hash lookup, update, and append/pop to or from list—are O(1).
- **Space Complexity:**  
  O(n), where n is the number of pushes into the stack (sum of all frequencies), since each pushed value could be kept in a stack (in freq_to_vals), and we also track each value’s frequency.

### Potential follow-up questions (as if you’re the interviewer)  

- What if we needed to support duplicates in pop (allow identical values to be returned as part of a batch)?
  *Hint: Think about batch popping and how to maintain underlying frequency stacks.*

- How would you implement it if instead of max frequency we wanted to pop the min frequency element, or both?
  *Hint: Could a min-heap or ordered map help here?*

- Could you persist this structure for massive data or distributed systems?
  *Hint: How to shard by frequency, use database tables, or mitigate concurrent modification?*

### Summary
The solution leverages two hash maps: one to track the frequency of each element, and another mapping frequencies to stacks of elements, which allows popping the most frequent (and most recent in case of ties) in O(1) time. This problem is an application of the "Stack of stacks"/"Group by frequency" pattern, and is also relevant for LRU/LFU cache designs, run-length encoding, and stack-based ordering with custom pop rules.

### Tags
Hash Table(#hash-table), Stack(#stack), Design(#design), Ordered Set(#ordered-set)

### Similar Problems
