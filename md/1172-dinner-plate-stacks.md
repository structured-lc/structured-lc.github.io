### Leetcode 1172 (Hard): Dinner Plate Stacks [Practice](https://leetcode.com/problems/dinner-plate-stacks)

### Description  
You are given an infinite row of stacks, each with the same **maximum capacity**. Plates are always added to the **leftmost stack that is not full**. When popping, you always remove and return the **top plate from the rightmost non-empty stack**. Additionally, you can pop from the top of a specific stack by index. Implement this with efficient push/pop/popAtStack operations, as the number of stacks can grow unbounded and stack indices can become sparse.

### Examples  

**Example 1:**  
Input:  
```
DinnerPlates D = DinnerPlates(2)
D.push(1)
D.push(2)
D.push(3)
D.push(4)
D.push(5)
```
Output:  
No Return  
*Explanation: You have 3 stacks (because capacity=2), so stacks look like:*
```
Stack 0: [1, 2]
Stack 1: [3, 4]
Stack 2: [5]
```

**Example 2:**  
Input:  
```
D.popAtStack(0)
```
Output: `2`  
*Explanation: Pops top plate from stack 0. Stacks now:*  
```
Stack 0: [1]
Stack 1: [3, 4]
Stack 2: [5]
```

**Example 3:**  
Input:  
```
D.pop()
D.pop()
D.pop()
D.pop()
```
Output: `5`, `4`, `3`, `1`  
*Explanation: Each pop removes and returns the rightmost value (ignoring empty stacks). Stack transitions go:*
- pop → `5` → stacks: [1] [3,4]
- pop → `4` → stacks: [1] [3]
- pop → `3` → stacks: [1]
- pop → `1` → stacks: []
All stacks empty at the end.

### Thought Process (as if you’re the interviewee)  
First, notice this is a variant of the classic stack but requires dynamic management of **multiple stacks**.  
A brute-force solution would scan all stacks on each operation, but that is much too slow if we have many operations.   
**Optimized Design:**
- Plates are pushed to the leftmost non-full stack.  
- We need to pop from the rightmost non-empty stack.
- To quickly find these stacks, we need:
  - **Min-heap** to track the *leftmost* non-full stacks.
  - **List** of stacks, which may contain empty stacks at the end but can be lazily shrunk.
  - For pop(), efficiently skip empty stacks at the end.

**Trade-offs:**  
  - Maintaining a min-heap (or sorted set) for available stacks handles push in O(log n).
  - List of stacks gives direct access and can be cleaned up at pop, popping empty stacks from the end.
  - This avoids O(n) scans for every push/pop; all operations become O(log n) or faster.

### Corner cases to consider  
- Popping from an empty collection (should return -1).
- popAtStack on an empty stack.
- Pushing when all current stacks are full (must create a new stack).
- Skipping completely empty stacks at the end (don't break pop).
- Reusing freed spots if a stack became empty mid-list.
- Large inputs, high heap churn, or wide sparsity.

### Solution

```python
import heapq

class DinnerPlates:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.stacks = []  # Each stack is a list
        self.available = []  # Min-heap of indexes of stacks which have space
        self.rightmost = -1  # Highest index of non-empty stack

    def push(self, val: int) -> None:
        # Find leftmost stack with room
        while self.available and self.available[0] < len(self.stacks) and len(self.stacks[self.available[0]]) == self.capacity:
            heapq.heappop(self.available)
        if self.available and self.available[0] < len(self.stacks):
            idx = self.available[0]
            self.stacks[idx].append(val)
            if len(self.stacks[idx]) == self.capacity:
                heapq.heappop(self.available)
        else:
            self.stacks.append([val])
            if self.capacity > 1:
                heapq.heappush(self.available, len(self.stacks) - 1)
        self.rightmost = max(self.rightmost, len(self.stacks) - 1)

    def pop(self) -> int:
        # Pop from rightmost non-empty stack
        while self.rightmost >= 0 and (self.rightmost >= len(self.stacks) or not self.stacks[self.rightmost]):
            self.rightmost -= 1
        if self.rightmost < 0:
            return -1
        val = self.stacks[self.rightmost].pop()
        heapq.heappush(self.available, self.rightmost)
        # Clean up trailing empty stacks
        while self.rightmost >= 0 and not self.stacks[self.rightmost]:
            self.rightmost -= 1
        return val

    def popAtStack(self, index: int) -> int:
        if index < 0 or index >= len(self.stacks) or not self.stacks[index]:
            return -1
        val = self.stacks[index].pop()
        heapq.heappush(self.available, index)
        if index == self.rightmost and not self.stacks[index]:
            while self.rightmost >= 0 and not self.stacks[self.rightmost]:
                self.rightmost -= 1
        return val
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `push`/`popAtStack`: O(log n) for heap adjustment (where n is number of stacks).
  - `pop`: amortized O(log n) for heap adjustment and potentially O(1) for skipping empty stacks at the end (if we don't keep sparse empty stacks in the middle).
  - Most operations are efficient; no O(total plates) or O(stacks) scans.
- **Space Complexity:**  
  - O(total plates) for the stacks.
  - O(number of stacks) for the heap, since each stack index might appear in the heap as "available" at most once.

### Potential follow-up questions (as if you’re the interviewer)  

- What if popAtStack is called very frequently compared to push?
  *Hint: Is your available-tracking heap growing too large or leaking unused indices?*

- How could you optimize memory if a huge number of stacks are created and then mostly emptied?
  *Hint: Do you want to shrink the stacks list? How would you avoid index invalidation?*

- How to handle concurrency/thread safety for this data structure?
  *Hint: Would you need locks around stacks or the heap? How granular can you make locking for optimal throughput?*

### Summary
This problem is a practical example of *multiple stack simulation* with efficient support for sparse and dynamic indices. It leverages **heap/min-heap or balanced BST** to quickly find leftmost non-full stacks, a **list** for direct indexable storage, and careful management to pop from the rightmost. This pattern—*coordinate heap/priority structure plus dynamic array*—also appears in problems like merging k sorted lists, CPU scheduling, and resource-allocation simulations.

### Tags
Hash Table(#hash-table), Stack(#stack), Design(#design), Heap (Priority Queue)(#heap-priority-queue)

### Similar Problems
