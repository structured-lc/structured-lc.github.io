### Leetcode 284 (Medium): Peeking Iterator [Practice](https://leetcode.com/problems/peeking-iterator)

### Description  
You are given an existing iterator over a collection of integers, which supports `next()` and `hasNext()` methods. Your task is to design a `PeekingIterator` class which not only supports all the usual iterator operations, but also a new operation called `peek()`. This `peek()` method should return the next element in the iteration **without advancing the iterator**. The goal is to be able to check the next value before actually consuming it with `next()`. This design is useful when decisions need to be made based on the next upcoming value, without actually moving past it in the iteration sequence.

### Examples  

**Example 1:**  
Input: `["PeekingIterator", "next", "peek", "next", "next", "hasNext"] [[[1, 2, 3]], [], [], [], [], []]`  
Output: `[null, 1, 2, 2, 3, false]`  
*Explanation:*
- Create peekingIterator = PeekingIterator([1,2,3])
- peekingIterator.next() ➔ 1 (moves to next item)
- peekingIterator.peek() ➔ 2 (shows next item, does **not** move iterator)
- peekingIterator.next() ➔ 2 (now moves to previously peeked item)
- peekingIterator.next() ➔ 3 (moves to the last item)
- peekingIterator.hasNext() ➔ false (no more elements) [2][4]

**Example 2:**  
Input: `["PeekingIterator", "peek", "next", "peek", "next", "hasNext"] [[[7, 8]], [], [], [], [], []]`  
Output: `[null, 7, 7, 8, 8, false]`  
*Explanation:*
- Create peekingIterator = PeekingIterator([7,8])
- peekingIterator.peek() ➔ 7
- peekingIterator.next() ➔ 7
- peekingIterator.peek() ➔ 8
- peekingIterator.next() ➔ 8
- peekingIterator.hasNext() ➔ false

**Example 3:**  
Input: `["PeekingIterator", "peek", "next", "hasNext"] [[], [], [], []]`  
Output: `[null, 42, 42, false]`  
*Explanation:*
- Create peekingIterator = PeekingIterator()
- peekingIterator.peek() ➔ 42
- peekingIterator.next() ➔ 42
- peekingIterator.hasNext() ➔ false

### Thought Process (as if you’re the interviewee)  

Start by thinking about how an iterator works:
- `next()` advances the iterator and returns the next element.
- `hasNext()` checks if elements remain.
- But `peek()` should return what the next `next()` would return, **without actually calling** `next()`.

**Brute-force idea:**  
On `peek()`, call `next()` and remember (cache) what you got, then reinsert the value into the iterator. But standard iterators don't provide a way to "un-get" or "push back" a value.

**Optimized approach:**  
Instead, always keep a cache of the "next element" and a flag indicating whether we've peeked ahead or not.  
- On initialization or after any real `next()`, prefetch and store the next value (if any).
- `peek()` simply returns the cached value, without advancing the iterator.
- `next()` returns the cached value and then advances the iterator, updating the cache.
- `hasNext()` checks if there is anything left in the cache.

This method ensures O(1) operations and clean distinction between peeking and advancing. It also makes consecutive calls (peek() before next() or vice versa) work as expected.

### Corner cases to consider  
- Calling `peek()` or `next()` when no elements remain (should not throw, should match how the base iterator behaves).
- Multiple consecutive `peek()` calls (should always return the same value).
- Multiple consecutive `next()` and `hasNext()` calls after iteration ends.
- Empty iterator from the start.
- Only one element.

### Solution

```python
# The Iterator class interface is given and should not be modified:
# class Iterator:
#     def __init__(self, nums):
#         ...
#     def hasNext(self):
#         ...
#     def next(self):
#         ...

class PeekingIterator:
    def __init__(self, iterator):
        # Store the given iterator.
        self.iterator = iterator
        # Advance and cache the next element, if there is one.
        self._has_peeked = False
        self._peeked_element = None

    def peek(self):
        # If we haven't peeked yet, fetch and cache the next value.
        if not self._has_peeked:
            if self.iterator.hasNext():
                self._peeked_element = self.iterator.next()
                self._has_peeked = True
            else:
                raise StopIteration("No more elements to peek.")
        return self._peeked_element

    def next(self):
        # If we have peeked, use the cached value, else fetch via iterator.
        if self._has_peeked:
            result = self._peeked_element
            self._has_peeked = False
            self._peeked_element = None
            return result
        if self.iterator.hasNext():
            return self.iterator.next()
        else:
            raise StopIteration("No more elements to return.")

    def hasNext(self):
        # If we've peeked, definitely has next.
        return self._has_peeked or self.iterator.hasNext()
```

### Time and Space complexity Analysis  

- **Time Complexity:** All operations are O(1):  
  - `peek()` may fetch and cache one value.
  - `next()` and `hasNext()` also require only cached operations or a single call to the underlying iterator.
- **Space Complexity:** O(1)  
  - Only a single-element cache is needed for peeked value.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the iterator can also remove elements, as in Java’s `Iterator.remove()`?  
  *Hint: How would peeking impact the semantics of removing elements if the peeked value has not yet been returned?*

- How would you modify your design if multiple consecutive lookahead (`peek(k)`) operations are needed?  
  *Hint: Would you need more storage? A queue or deque might help for arbitrary look-ahead.*

- Can you generalize this pattern to other iterators (e.g., over files, streams, or not just arrays)?  
  *Hint: Think about any side effects/cost of peeking and how to minimize memory usage.*

### Summary
This problem is a common design pattern for **iterator wrappers** with lookahead—by caching the next element, we efficiently separate "peeking" from actual advancement. The **pre-fetch** or **lookahead cache** pattern can be used in merging sorted lists, stream processing, parsers, or anywhere you need to “peek ahead” in a sequence without consuming input.


### Flashcard
Cache the next element in a variable during construction or first peek(); hasNext() and next() operate on this cached value.

### Tags
Array(#array), Design(#design), Iterator(#iterator)

### Similar Problems
- Binary Search Tree Iterator(binary-search-tree-iterator) (Medium)
- Flatten 2D Vector(flatten-2d-vector) (Medium)
- Zigzag Iterator(zigzag-iterator) (Medium)