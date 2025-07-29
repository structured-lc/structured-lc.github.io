### Leetcode 281 (Medium): Zigzag Iterator [Practice](https://leetcode.com/problems/zigzag-iterator)

### Description  
Implement an iterator that takes two one-dimensional integer lists `v1` and `v2` and returns their elements *alternately*—one from `v1`, then one from `v2`, then the next from `v1`, and so on. If one list runs out of elements, continue returning elements from the other list until both are exhausted. The iterator should provide `next()` to fetch the next element and `hasNext()` to check if elements remain.

### Examples  

**Example 1:**  
Input: `v1 = [1, 2]`, `v2 = [3, 4, 5, 6]`  
Output: `[1, 3, 2, 4, 5, 6]`  
Explanation: next() calls yield: 1 (v1), 3 (v2), 2 (v1), 4 (v2), then as v1 exhausted, 5 (v2), 6 (v2).

**Example 2:**  
Input: `v1 = []`, `v2 = [10, 20]`  
Output: `[10, 20]`  
*Explanation: Only v2 has elements, so next() returns 10, 20.*

**Example 3:**  
Input: `v1 = [7, 8]`, `v2 = []`  
Output: `[7, 8]`  
*Explanation: Only v1 has elements, so next() returns 7, 8.*

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Use two pointers, one per list, and a flag to alternate. After each next(), the flag toggles. Special case: if one list is exhausted, keep taking from the other.
- **Problem:** Alternating gets tricky if one list is exhausted while the other isn’t. We need to check, on every next(), if the current list has items left—if not, simply take from the other.
- **Optimized:** Use a queue that keeps track of which list (and its pointer) is next. For each non-exhausted list, add (list, pointer) to the queue. On each next():
  - Pop the front (list, pointer), yield value, increment pointer. If more elements remain in that list, enqueue (list, pointer+1) back.
- **Trade-off:** The queue-based approach is scalable (works for >2 lists with zero change), and always efficiently selects from whichever lists still have elements.

### Corner cases to consider  
- Both lists empty: hasNext() is immediately false.
- Only one list empty: should return all elements from the other.
- Lists of vastly different lengths.
- Lists containing negative numbers or large values (but these do not affect logic).
- Lists with only one element each.

### Solution

```python
class ZigzagIterator:
    def __init__(self, v1, v2):
        # Store the lists and their pointers in tuples if not empty
        self.queue = []
        if v1:
            self.queue.append([v1, 0])  # [list, current_index]
        if v2:
            self.queue.append([v2, 0])

    def next(self):
        # Pop the first (list, pointer)
        curr, idx = self.queue.pop(0)
        val = curr[idx]
        idx += 1
        # If there are more elements in the list, enqueue back
        if idx < len(curr):
            self.queue.append([curr, idx])
        return val

    def hasNext(self):
        return len(self.queue) > 0
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) per `next()` and `hasNext()`, as all operations are queue/array accesses and updates. Total number of calls is O(n), where n = total elements.
- **Space Complexity:** O(1) auxiliary space, as the queue at most contains two pointers at any time (for v1 and v2). No extra copy of input arrays.

### Potential follow-up questions (as if you’re the interviewer)  

- Could this be extended to k lists instead of 2?  
  *Hint: Try a queue of (list, index) for all non-empty lists, process cyclically.*

- What if each iterator is not a list, but a stream or generator?  
  *Hint: Queue up the next available (iterator, next value), but handle StopIteration.*

- How would you handle frequent queries interleaving with modifications (insert/remove/replace) while keeping O(1) `hasNext()`/`next()`?  
  *Hint: Consider doubly-linked structures or deques to allow fast updates; may complicate state management.*

### Summary
This problem is a classic application of the **cyclic round-robin** pattern and queue for alternating iteration over multiple sources. By always storing only currently available sources in a queue, we ensure O(1) selection and generalize well to k lists, streams, or iterators. The technique is broadly useful in scheduling, resource multiplexing, and merging data from heterogenous sources.