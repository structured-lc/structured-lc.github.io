### Leetcode 2336 (Medium): Smallest Number in Infinite Set [Practice](https://leetcode.com/problems/smallest-number-in-infinite-set)

### Description  
You have an *infinite set* containing all positive integers: 1, 2, 3, 4, 5, ...  
You need to design a class that supports two operations:

- `popSmallest()`: Removes and returns the smallest integer in the set.
- `addBack(num)`: Adds the given positive integer back into the set, if it is not already present.

You must ensure efficient operations even as the set evolves over many adds and pops.

### Examples  

**Example 1:**  
Input:  
```
SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.popSmallest(); // 1
smallestInfiniteSet.popSmallest(); // 2
smallestInfiniteSet.addBack(1);
smallestInfiniteSet.popSmallest(); // 1
smallestInfiniteSet.popSmallest(); // 3
smallestInfiniteSet.popSmallest(); // 4
```
Output:  
1  
2  
1  
3  
4  
*Explanation: `1` and `2` are popped; then `1` is added back, so `1` is again the smallest and popped; next are `3` and `4`.*

**Example 2:**  
Input:  
```
SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
smallestInfiniteSet.popSmallest(); // 1
smallestInfiniteSet.addBack(2);
smallestInfiniteSet.popSmallest(); // 2
smallestInfiniteSet.popSmallest(); // 3
```
Output:  
1  
2  
3  
*Explanation: After popping `1`, `2` is added back, so the next pop gives `2`, then `3`.*

**Example 3:**  
Input:  
```
SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
[popSmallest(), popSmallest(), popSmallest(), addBack(2), addBack(3), popSmallest(), popSmallest()]
```
Output:  
1  
2  
3  
2  
3  
*Explanation: Pop `1`, `2`, `3`; add back `2`, `3`; next pops return the re-added numbers in order.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force idea:**  
  Simulate the whole set—keep a list or array for elements in the set or not. This is infeasible since the set is *infinite*.

- **Optimized Approach:**
  - Use a *min-heap* to manage integers that have been "added back" so they can be returned as smallest before moving to the next untouched integer.
  - Keep a pointer `current` that represents the smallest integer *not* yet popped and *never* added back.  
  - When popping, return the smaller of the heap's min (if any) and `current`.
  - To avoid duplicates, maintain a set with all numbers currently in the heap. Only push to the heap if not already present and less than `current`.
  - `addBack(num)` pushes `num` to the heap if and only if `num` is less than `current` and not already in the set.

**Why this approach?**  
  - Avoids storing the whole infinite set in memory.
  - Efficient pop: O(log n) for heap, or O(1) if just moving `current`.
  - Efficient addBack: O(log n) for heap insertion, O(1) for set lookup.
  - Keeps popped, added-back, and untouched number regions well tracked.

### Corner cases to consider  
- Adding back a number that's already present (should do nothing).
- Adding back a number >= current (should do nothing).
- Popping after many addBacks and pops (mixed order).
- Popping when the heap is empty (should use current).
- Re-add numbers previously popped, then pop again.

### Solution

```python
import heapq

class SmallestInfiniteSet:
    def __init__(self):
        # Heap for all numbers added back and not yet popped
        self.heap = []
        # Set to prevent duplicate numbers in heap
        self.inHeap = set()
        # Pointer to the smallest number never popped nor added back
        self.current = 1

    def popSmallest(self) -> int:
        # If heap has smaller elements, pop from heap first
        if self.heap and (self.heap[0] < self.current):
            res = heapq.heappop(self.heap)
            self.inHeap.remove(res)
            return res
        else:
            res = self.current
            self.current += 1
            return res

    def addBack(self, num: int) -> None:
        # Only add back numbers less than current not in heap already
        if num < self.current and num not in self.inHeap:
            heapq.heappush(self.heap, num)
            self.inHeap.add(num)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Constructor: O(1)
  - `popSmallest()`: O(log n) when popping from heap (n = # of addedBack, not total range); O(1) otherwise.
  - `addBack(num)`: O(log n) for heap insertion; O(1) for set lookup.
- **Space Complexity:** O(k), where k is the number of addedBack’s coexisting in the system (not the whole infinite set).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you optimize if `addBack` is called much more frequently than `popSmallest`?  
  *Hint: Consider bulk operations or lazy deletion techniques.*

- Can you support `remove(num)` for arbitrary positive integers, not just the smallest?  
  *Hint: How would you design the data structure to efficiently remove any number?*

- What if you wanted to start the infinite set at some arbitrary number instead of 1?  
  *Hint: Adjust the initial current, and reasoning for addBack boundaries.*

### Summary
This approach applies the *priority queue + set* pattern for *custom-ordered retrieval*, which is widely useful in scheduling, streaming order management, and interval management problems. The logic of only simulating parts of an infinite (or large) set is a key pattern in “infinite, virtual, or lazy” data structures.

### Tags
Hash Table(#hash-table), Design(#design), Heap (Priority Queue)(#heap-priority-queue), Ordered Set(#ordered-set)

### Similar Problems
- First Missing Positive(first-missing-positive) (Hard)