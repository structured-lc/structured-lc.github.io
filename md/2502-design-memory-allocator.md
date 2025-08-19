### Leetcode 2502 (Medium): Design Memory Allocator [Practice](https://leetcode.com/problems/design-memory-allocator)

### Description  
Design a memory allocator for a one-dimensional block of memory, indexed from 0 to n-1.  
You must support:
- **allocate(size, mID):** Allocate the first available block of `size` contiguous free memory units and assign them the given memory ID (`mID`). Return the start index of this block, or -1 if it’s not possible.
- **free(mID):** Free all blocks currently holding the given `mID`. Return the total number of units freed.

All memory is initially free. Each memory unit can only be owned by one `mID` at a time.

### Examples  

**Example 1:**  
Input:  
`Allocator allocator = Allocator(5)`  
`allocator.allocate(2, 1)`  
`allocator.allocate(1, 2)`  
`allocator.allocate(1, 3)`  
`allocator.free(2)`  
Output:  
`0`  
`2`  
`3`  
`1`  
*Explanation:*
- `allocate(2, 1)` reserves indices 0,1 for mID 1 → returns 0
- `allocate(1, 2)` reserves index 2 for mID 2 → returns 2
- `allocate(1, 3)` reserves index 3 for mID 3 → returns 3
- `free(2)` frees index 2 → returns 1

**Example 2:**  
Input:  
`Allocator allocator = Allocator(4)`  
`allocator.allocate(4, 5)`  
`allocator.allocate(1, 4)`  
`allocator.free(5)`  
Output:  
`0`  
`-1`  
`4`  
*Explanation:*
- `allocate(4, 5)` allocates all memory for mID 5 → returns 0
- `allocate(1, 4)` finds no free block of size 1 → returns -1
- `free(5)` frees all 4 units → returns 4

**Example 3:**  
Input:  
`Allocator allocator = Allocator(3)`  
`allocator.allocate(3, 2)`  
`allocator.free(1)`  
`allocator.free(2)`  
Output:  
`0`  
`0`  
`3`  
*Explanation:*
- `allocate(3, 2)` allocates the full array to mID 2 → returns 0
- `free(1)` finds no units with mID 1 → returns 0
- `free(2)` frees all → returns 3

### Thought Process (as if you’re the interviewee)  
- **Brute-force:**  
  Use an array of length `n` to represent memory (0 = free, non-zero = mID).
  For `allocate(size, mID)`, linearly scan to find the first stretch of `size` zeros, then set those elements to `mID`.
  For `free(mID)`, scan the array and reset all elements equal to `mID` to 0, counting the number freed.
  Time: O(n) per operation; Space: O(n).

- **Optimizations:**  
  If memory or call count is large, we could use advanced data structures for interval management (segment trees, interval trees), but those are overkill given constraints and increase code complexity.
  For most interviews, an array-based approach suffices.

- **Chosen approach:**  
  Simple array with linear scans is clean, easy to code, and passes constraints.

### Corner cases to consider  
- Full allocation/frees (entire memory block).
- Allocate size == memory length.
- No available block large enough (should return -1).
- free(mID) for an mID never allocated or already freed (should return 0).
- Allocations leading to fragmented space (multiple small free blocks).
- Allocating or freeing with size = 0 (if allowed, though specs suggest size ≥ 1).


### Solution

```python
class Allocator:
    def __init__(self, n: int):
        # Initialize memory array of size n, 0 means free, >0 means allocated with mID
        self.memory = [0] * n
        self.n = n

    def allocate(self, size: int, mID: int) -> int:
        # Try every possible starting index
        i = 0
        while i <= self.n - size:
            # Check if block [i, i+size) is all zero (free)
            is_free = True
            for j in range(i, i + size):
                if self.memory[j] != 0:
                    is_free = False
                    # Can skip ahead to just after this occupied unit
                    i = j + 1
                    break
            if is_free:
                # Allocate block to mID
                for j in range(i, i + size):
                    self.memory[j] = mID
                return i
        # No suitable block found
        return -1

    def free(self, mID: int) -> int:
        freed = 0
        # Free every cell with this mID
        for i in range(self.n):
            if self.memory[i] == mID:
                self.memory[i] = 0
                freed += 1
        return freed
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `allocate`: O(n) worst case (checking the whole memory for a free block).
  - `free`: O(n), as we must examine all memory units.
- **Space Complexity:**  
  - O(n), where n = size of memory. Only an array is used; no extra data structures.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize allocation/free for large memory (e.g., n = 10⁹)?  
  *Hint: Consider interval trees or segment trees for sparse memory representation.*

- Can you support allocation of arbitrary blocks, not just consecutive memory?  
  *Hint: What changes if blocks can be non-contiguous?*

- How would you add a `defragment()` operation to shuffle alive blocks down to the left?  
  *Hint: Move allocated segments towards the start of memory, updating their positions.*

### Summary
This is a **simulation problem**: use an array as memory and scan for allocate/free operations.  
Patterns: array manipulation, sliding window, two pointers for block search.  
Similar patterns arise in **interval management, process scheduling, and contiguous resource allocation**.  
This technique is fundamental and prevalent in system design, memory management, and OS simulation interview problems.

### Tags
Array(#array), Hash Table(#hash-table), Design(#design), Simulation(#simulation)

### Similar Problems
