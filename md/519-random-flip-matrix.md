### Leetcode 519 (Medium): Random Flip Matrix [Practice](https://leetcode.com/problems/random-flip-matrix)

### Description  
Design a class to efficiently simulate flipping random entries in a binary matrix. Imagine you have an m × n grid, all initialized to 0. Each time you call `flip()`, you must randomly pick an index (i, j) with matrix[i][j] == 0, and set it to 1, ensuring every zero is equally likely to be picked. Once an entry is set to 1, it cannot be picked again until you call `reset()`, which sets all entries back to 0. Implement the following API:

- `Solution(m, n)`: initializes an m × n matrix of zeroes.
- `flip()`: returns the coordinates [i, j] of a zero flipped to one, ensuring uniform randomness.
- `reset()`: resets the matrix to all zeroes.

### Examples  

**Example 1:**  
Input:  
`Solution(3, 1)`  
`flip()`  
Output=`[1, 0]`  
Explanation. Only indices [0,0], [1,0], and [2,0] are available; output could be any of them with equal probability.

**Example 2:**  
Input:  
After `flip()` once, call `flip()` again (from Example 1).  
Output=`[2, 0]`  
Explanation. Now only two zeros remain, so only [2,0] or [0,0] are possible.

**Example 3:**  
Input:  
After all cells have been flipped, call `reset()`. Then, `flip()` again.  
Output=`[2, 0]`  
Explanation. Matrix is reset, so [0,0], [1,0], and [2,0] are again all possible.

### Thought Process (as if you’re the interviewee)  
A brute-force approach would be to maintain the entire matrix and, for each `flip()`, randomly choose indices until finding a 0. However, this is inefficient for large grids: as the grid fills up, it could take many tries to find an unused cell.

A more optimal strategy is to **simulate the matrix as a flat array** (size m × n). We can use a **hashmap to record which indices have been flipped**, so we never repeat a cell, but without actually storing the whole matrix. 

- To select uniformly, randomly pick an integer from 0 to total_remaining-1.
- Use a hashmap to record "virtual swaps": if an index is flipped, map it to the last available index.
- Each flip decreases the available count. 
- When resetting, just clear the hashmap and reset the counter.
  
This gives us **O(1)** time per flip and keeps space proportional to the number of flips, not the whole matrix.

### Corner cases to consider  
- `m` or `n` is 1 (single row or column).
- Only one cell in the matrix.
- All entries are flipped, then `reset()` is called.
- Multiple consecutive resets.
- Large m × n (up to 10⁴ × 10⁴; ensure no O(mn) operations).

### Solution

```python
import random

class Solution:
    def __init__(self, m: int, n: int):
        self.m = m
        self.n = n
        self.total = m * n
        self.flipped = {}  # maps from picked index to its swap
        self.remaining = self.total

    def flip(self):
        # Pick random index among remaining zeros
        rand_idx = random.randint(0, self.remaining - 1)
        # Use map to find the "actual" index to flip
        x = self.flipped.get(rand_idx, rand_idx)
        # Mark this index as flipped by mapping it to the last available in the pool
        # Find what would have been at position remaining - 1
        self.flipped[rand_idx] = self.flipped.get(self.remaining - 1, self.remaining - 1)
        self.remaining -= 1
        # Convert x back to 2D coordinates
        return [x // self.n, x % self.n]
    
    def reset(self):
        self.flipped.clear()
        self.remaining = self.total
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `flip()` runs in O(1) time due to direct access and update in the hashmap.
  - `reset()` runs in O(1) time as we only clear the map and reset a variable.

- **Space Complexity:**  
  - O(k), where k is the number of flips since we store only the swapped indices, *not* the full matrix.

### Potential follow-up questions (as if you’re the interviewer)  

- **What if flip() needs to return multiple random unused cells at once?**  
  *Hint: Consider if your mapping data structure can efficiently support sampling k cells at once.*

- **How would you handle a distributed version, with flips happening across multiple servers?**  
  *Hint: Think about how to avoid duplicate flips without centralized state.*

- **How would you modify this if you needed to un-flip a particular cell (set it back to zero), not just wholesale reset?**  
  *Hint: Would you need to change your internal data structure?*

### Summary
This approach leverages the **random sampling with mapping trick** that simulates array "shuffling" via a hashmap, common in design problems requiring random selection without replacement. It's highly efficient for large matrices and can be adapted for other "random pick without replacement" scenarios.  
Common patterns used: hash mapping, random sampling, simulating compact data structures for large/sparse grids.

### Tags
Hash Table(#hash-table), Math(#math), Reservoir Sampling(#reservoir-sampling), Randomized(#randomized)

### Similar Problems
