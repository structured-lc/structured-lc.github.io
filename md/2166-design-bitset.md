### Leetcode 2166 (Medium): Design Bitset [Practice](https://leetcode.com/problems/design-bitset)

### Description  
Design a **Bitset** class to efficiently represent and manipulate a fixed-size array of bits (0s and 1s). The Bitset supports:
- **fix(idx):** Sets the bit at index `idx` to 1.
- **unfix(idx):** Sets the bit at index `idx` to 0.
- **flip():** Flips all bits (0→1, 1→0).
- **all():** Returns True if all bits are 1.
- **one():** Returns True if at least one bit is 1.
- **count():** Returns number of bits set to 1.
- **toString():** Returns a string representation of the bits.

Your implementation must make all operations efficient, especially flip (which happens to the whole array).

### Examples  

**Example 1:**  
Input: `["Bitset","fix","fix","flip","all","unfix","flip","one","count","toString"]`, `[[5],[3],[1],[],[],,[],[],[],[]]`  
Output: `[null,null,null,null,false,null,null,true,2,"01010"]`  
*Explanation:*
- Bitset(5) initializes as "00000".
- fix(3): "00010"
- fix(1): "01010"
- flip(): "10101" (all bits inverted)
- all(): false (not all bits are 1)
- unfix(0): "00101"
- flip(): "11010"
- one(): true (at least one 1 exists)
- count(): 2 ("11010" has two 1s)
- toString(): "01010"

**Example 2:**  
Input: `["Bitset","flip","flip","fix","all","toString"]`, `[[2],[],[],,[],[]]`  
Output: `[null,null,null,null,false,"10"]`  
*Explanation:*
- Bitset(2) → "00"
- flip(): "11"
- flip(): "00" (back to original)
- fix(0): "10"
- all(): false
- toString(): "10"

**Example 3:**  
Input: `["Bitset","fix","fix","unfix","count","flip","toString"]`, `[[3],,[1],,[],[],[]]`  
Output: `[null,null,null,null,1,null,"010"]`  
*Explanation:*
- Bitset(3): "000"
- fix(0): "100"
- fix(1): "110"
- unfix(0): "010"
- count(): 1 ("010" has one 1)
- flip(): "101"
- toString(): "010"

### Thought Process (as if you’re the interviewee)  
Starting brute-force, I could use a plain list of bits. But the O(n) flip (inverting the entire array) becomes too slow for large n.

Observing the operations:
- fix/unfix/one/count/all must be O(1) or close.
- flip needs to be O(1).

So, instead of actually flipping the array on every flip(), I’ll use a flip flag that tracks parity. All accesses will interpret the real bit as `bit ^ flipped` (xor). I'll also keep a count of 1s (actual representation) to answer count/all/one efficiently.

Trade-off: this uses a little more logic in each operation, but all become O(1).

### Corner cases to consider  
- flip() called multiple times in a row.
- fix/unfix on already-fixed/unfixed indices (should be idempotent).
- all/unfix/flip/one/count on empty Bitset (`size == 0`).
- fix/unfix after many flips; correctness of parity handling.
- toString() after several operations.

### Solution

```python
class Bitset:
    def __init__(self, size: int):
        # bits[i]: stores the real bit in unflipped form (0 or 1)
        self.bits = [0] * size
        self.flipped = False
        self.cnt_ones = 0        # number of 1s in bits as seen (accounting for parity)
        self.size = size

    def fix(self, idx: int) -> None:
        # If flip flag is False, 1 is real; if flip is True, 0 is real '1'
        if (self.bits[idx] ^ self.flipped) == 0:
            self.bits[idx] ^= 1
            self.cnt_ones += 1

    def unfix(self, idx: int) -> None:
        if (self.bits[idx] ^ self.flipped) == 1:
            self.bits[idx] ^= 1
            self.cnt_ones -= 1

    def flip(self) -> None:
        self.flipped = not self.flipped
        self.cnt_ones = self.size - self.cnt_ones

    def all(self) -> bool:
        return self.cnt_ones == self.size

    def one(self) -> bool:
        return self.cnt_ones > 0

    def count(self) -> int:
        return self.cnt_ones

    def toString(self) -> str:
        # Reconstruct the string based on flip parity
        if self.flipped:
            return ''.join(str(1 - b) for b in self.bits)
        return ''.join(str(b) for b in self.bits)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  All operations (fix, unfix, flip, all, one, count) are O(1) due to the use of a flip flag and a running count.  
  toString() is O(n), as it must iterate over all bits to build the string.

- **Space Complexity:**  
  O(n), where n is the Bitset size. All storage (bits, counters, flip flag) scales with input.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement Bitset if the size was very large (e.g., 10⁹)?
  *Hint: Consider a sparse or chunked representation instead of a dense array.*

- Can you support range fix/unfix/flip efficiently?
  *Hint: Use segment trees or lazy propagation techniques.*

- If the requirement is to support setting all bits to a value efficiently, how do you do it?
  *Hint: Global value/flag with lazy writing; similar to flip logic.*

### Summary
This problem uses efficient bit manipulation and lazy logic inversion to achieve O(1) per operation, a common pattern for array operations where mass updates and queries occur (segment trees use similar tricks). The concept applies in bitmap indexing, network packet processing, image masks, and set/trie data structures where bulk inversion or “global” operations must remain fast.

### Tags
Array(#array), Hash Table(#hash-table), String(#string), Design(#design)

### Similar Problems
- Design Underground System(design-underground-system) (Medium)