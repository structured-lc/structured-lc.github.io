### Leetcode 1622 (Hard): Fancy Sequence [Practice](https://leetcode.com/problems/fancy-sequence)

### Description  
Implement a sequence with three operations:
- append(val): Append an integer val to the end of the sequence.
- addAll(inc): Add integer inc to every element in the sequence.
- multAll(m): Multiply every element in the sequence by integer m.
- getIndex(idx): Return the idxᵗʰ element (0-based) after performing all operations. If idx is out-of-bounds, return -1. All operations must be efficient (no brute force updating the whole sequence each time).

### Examples  
**Example 1:**  
Input: `append(2), addAll(3), append(7), multAll(2), getIndex(0)`  
Output: `10`  
*Explanation: Sequence evolves: [2] → [5] → [5,7] → [10,14]; getIndex(0) = 10*

**Example 2:**  
Input: `append(3), multAll(4), addAll(1), getIndex(0)`  
Output: `13`  
*Explanation: [3] →  → ; getIndex(0) = 13*

**Example 3:**  
Input: `getIndex(1)`  
Output: `-1`  
*Explanation: Only 0 elements in sequence, so -1 as idx out of bound*

### Thought Process (as if you’re the interviewee)  
A brute force solution is too slow: Updating every sequence element for addAll/multAll is O(n) per op. Need amortized O(1) operations. Think mathematically: treat appends as storing values along with the 'history' of applied mult/add at insertion. For every append, store the value after inverting all future add/mult, and to query, "replay" ops with modular inverse as needed. All calculations are modulo 10⁹+7.

### Corner cases to consider  
- Empty sequence (any getIndex returns -1)
- Large chains of adds/mults (test for integer overflow and modular ops)
- Repeated appends; index out of range

### Solution

```python
class Fancy:
    def __init__(self):
        self.MOD = 10 ** 9 + 7
        self.seq = []
        self.add = 0
        self.mul = 1
        self.inv = [1]

    def append(self, val):
        # Store value after 'reversing' all adds/mults applied so far.
        # To 'rewind', store (val - add) * pow(mul, -1) % MOD
        inv_mul = pow(self.mul, -1, self.MOD)
        self.seq.append(((val - self.add) * inv_mul) % self.MOD)

    def addAll(self, inc):
        self.add = (self.add + inc) % self.MOD

    def multAll(self, m):
        self.mul = (self.mul * m) % self.MOD
        self.add = (self.add * m) % self.MOD

    def getIndex(self, idx):
        if idx >= len(self.seq):
            return -1
        # Return seq[idx] * mul + add, under mod
        return (self.seq[idx] * self.mul + self.add) % self.MOD
```

### Time and Space complexity Analysis  
- **Time Complexity:** O(1) for all operations except pow(inv), which is log(MOD); overall amortized O(1)
- **Space Complexity:** O(n), sequence storage

### Potential follow-up questions (as if you’re the interviewer)  

- Can you support range updates/query efficiently too?  
  *Hint: Segment tree with lazy propagation can do so.*

- How to extend for division?
  *Hint: Store additional inverses for modular division applications.*

- Can you retrieve the max/min in O(1)?  
  *Hint: Requires managing aggregate values separately.*

### Summary
Math pattern exploiting the distributive property and modular arithmetic for efficient updates. Similar to "prefix mul/add tracking" seen in persistent structures, common in advanced data structure problems.


### Flashcard
Store appended values with the cumulative effect of pending operations; on query, apply the inverse of future operations modulo 10⁹+7 to get the current value.

### Tags
Math(#math), Design(#design), Segment Tree(#segment-tree)

### Similar Problems
