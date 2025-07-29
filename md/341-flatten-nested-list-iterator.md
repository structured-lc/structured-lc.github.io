### Leetcode 341 (Medium): Flatten Nested List Iterator [Practice](https://leetcode.com/problems/flatten-nested-list-iterator)

### Description  
You are given a **nested list** of integers. Each element is either an integer, or a list whose elements may also be integers or other lists (i.e., it can nest arbitrarily deep). Implement an iterator to **flatten** this structure so you can access each integer sequentially as if the original list was flat.  
Your iterator should support:
- `next()`: returns the next integer in the sequence.
- `hasNext()`: returns `True` if there are still integers to return.

### Examples  

**Example 1:**  
Input: `nestedList = [[1,1],2,[1,1]]`  
Output: `1,1,2,1,1`  
*Explanation: We flatten as follows: [1,1] → 1,1; then 2; then [1,1] → 1,1. So the sequence is 1,1,2,1,1.*

**Example 2:**  
Input: `nestedList = [1,[4,]]`  
Output: `1,4,6`  
*Explanation: The first is 1, then flatten [4,]: 4 comes next, then flatten , get 6. Sequence is 1,4,6.*

**Example 3:**  
Input: `nestedList = []`  
Output:  (no output)  
*Explanation: The list is empty, so there are no integers to iterate.*

### Thought Process (as if you’re the interviewee)  
- **Brute force:**  
  Flatten the entire structure into a simple list at initialization (in the constructor), and then just iterate through it using an index. This makes each `next()` and `hasNext()` call O(1), but can have high memory usage if the nested list is huge or deeply nested.
- **Optimized for large/deep lists:**  
  Instead of flattening everything up front, use a **stack** to store your place in the nested list. Each time you call `next()` or `hasNext()`, you only flatten as needed, which is more memory efficient, especially for very large lists. But each call might take longer in the worst case.
- **Trade-offs:**  
  Full flattening at construction (DFS) is simple and makes iterator methods very fast. Lazy flattening is more complex, but saves on unnecessary memory if you're not going to consume the whole iterator.

In most interviews, starting with the flatten-at-init is easiest to code and explain, so I'll show that approach first.

### Corner cases to consider  
- Empty outer list: `[]`
- Nested lists with no integers, e.g., `[[], []]`
- Very deeply nested single element, e.g., `[[[[[1]]]]]`
- Nested list containing only one integer
- Nested lists with mixed empty and non-empty lists, e.g., `[[],1,[],[2,[]]]`
- All elements are lists

### Solution

```python
# This solution assumes the NestedInteger API as described by Leetcode:
# - isInteger(): returns True if it holds an integer
# - getInteger(): returns the integer (if isInteger() is True)
# - getList(): returns a list of NestedInteger

class NestedIterator:
    def __init__(self, nestedList):
        # Flatten the nested list into a simple list
        self.flat_list = []
        self.index = 0
        self._flatten(nestedList)
    
    def _flatten(self, nestedList):
        for elem in nestedList:
            if elem.isInteger():
                self.flat_list.append(elem.getInteger())
            else:
                self._flatten(elem.getList())

    def next(self):
        result = self.flat_list[self.index]
        self.index += 1
        return result

    def hasNext(self):
        return self.index < len(self.flat_list)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Construction is O(N), where N is the total number of integers in all nested lists, since we visit every element once during flattening.
  - Each `next()` and `hasNext()` call is O(1).
- **Space Complexity:**  
  - O(N) to store the fully flattened list.
  - Call stack can be as deep as the nesting level during flattening.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you implement this if you could not use extra space for flattening the whole list?  
  *Hint: Try simulating the traversal with a stack instead of a precomputed list.*

- Can you implement the iterator such that both next() and hasNext() run in average O(1) time without pre-flattening the list?  
  *Hint: Think about only flattening just enough to guarantee the next integer is on top.*

- How would your solution change if the nested structure could be mutated during iteration?  
  *Hint: Pre-flattening would break in this case; a stack-based lazy approach is better.*

### Summary
This solution uses the **preprocessing + flatten** pattern via DFS recursion. It trades memory for fast iteration, a common design in iterator implementations when data fits in memory. For interviews, it's clear, easy to reason about, and usually a good starting point. Variants of this pattern appear in problems dealing with list flattening, custom iterators, and tree traversals. For massive or mutating datasets, a stack-based **lazy flattening** (on-demand exploration) is preferable.