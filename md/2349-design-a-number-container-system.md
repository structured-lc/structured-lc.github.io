### Leetcode 2349 (Medium): Design a Number Container System [Practice](https://leetcode.com/problems/design-a-number-container-system)

### Description  
Design a class called **NumberContainers** that supports two operations:  
- You can insert or replace a number at a given index (indices are unique).
- You can query for the **smallest index** which contains a given number — return -1 if no index holds that number.  
Think of it as a data structure that, at any point, lets you quickly look up where a number first occurs, as well as update the mapping of numbers to indices as desired.

### Examples  

**Example 1:**  
Input=`["NumberContainers","find","change","change","change","change","find","change","find"]`,  
      `[[],,[2,10],[1,10],[3,10],[5,10],,[1,20],]`  
Output=`[null,-1,null,null,null,null,1,null,2]`  
*Explanation:*
- Call find(10): returns -1 (no number is stored yet)
- change(2,10): sets index 2 = 10
- change(1,10): sets index 1 = 10
- change(3,10): sets index 3 = 10
- change(5,10): sets index 5 = 10
- find(10): returns 1 (smallest index where value is 10)
- change(1,20): updates index 1 to value 20 (removes index 1 from 10)
- find(10): returns 2 (index 1 is now 20, 2 is now the lowest with value 10)

**Example 2:**  
Input=`["NumberContainers","change","change","find","change","find","change","find"]`,  
      `[[],[7,5],[3,4],[4],[7,4],[4],[3,5],[4]]`  
Output=`[null,null,null,-1,null,7,null,3]`  
*Explanation:*
- change(7,5): sets index 7 = 5
- change(3,4): sets index 3 = 4
- find(4): returns -1 (index 3 was just set, so should return 3, but with input as shown may be just a typo)
- change(7,4): updates index 7 = 4, index 7 is now 4
- find(4): returns 3 (both 3 and 7 are 4, 3 is smallest)
- change(3,5): sets index 3 = 5
- find(4): returns 7

**Example 3:**  
Input=`["NumberContainers","find"]`,  
      `[[],[1]]`  
Output=`[null,-1]`  
*Explanation:*  
- No changes yet, so find(1) returns -1.

### Thought Process (as if you’re the interviewee)  
- **Naive/Brute-force:**  
  Use a dictionary mapping indices to numbers. For change, just update this dictionary. For find, iterate all keys and return the minimum index where the value is the target number.  
  - Problem: find takes O(n) each time, too slow.

- **Optimized:**  
  - To quickly find the smallest index for a number, keep a mapping from each number to a *sorted set of indices* where that number appears.  
  - For change:  
    - If index was already used, remove it from the old number's set.
    - Insert it into the set for the new number.  
  - For find: just look up the number in the dict, and return the smallest value (set's first element) or -1 if not present.

- **Implementation Details:**  
  - Use a dictionary for `index → number` (current assignment).
  - Use another dictionary for `number → set of indices` (for fast lookup).
  - For "sorted set", in Python, use `SortedSet` (from `sortedcontainers`), or simulate with a list+bisect, but that's slower.
  - If using only built-ins, a heap (heapq) can be used, but must be carefully pruned if indices are stale.  
  - Tradeoff:  
    - Insertion/removal in tree/ordered set: O(log n).
    - Fast find(min): O(1).  
    - Space: Dicts store at most one entry per index and per (number,index) pair.

### Corner cases to consider  
- `find(x)` when x not present ⇒ should return -1.
- Multiple changes to same index; ensure previous value removed from set.
- Changing index to the *same* value; should have no effect.
- Setting and then resetting to different values on same index.
- All indices pointing to same value.
- Deleting a value from all indices and calling find.

### Solution

```python
# We avoid external packages like sortedcontainers for interviews.
# So, we use heapq for min-index tracking and a dict for mapping.

import heapq

class NumberContainers:
    def __init__(self):
        # Maps index → number currently at that index
        self.index_to_number = {}
        # Maps number → min-heap of indices (for O(1) min extraction)
        self.number_to_indices = {}
        # Used to mark if an index is currently active for a given number
        # number → set(indices)
        self.number_active_indices = {}

    def change(self, index: int, number: int) -> None:
        # If this index was already present with a different number, remove from that set
        if index in self.index_to_number:
            old_number = self.index_to_number[index]
            if old_number != number:
                if old_number in self.number_active_indices:
                    self.number_active_indices[old_number].discard(index)
        self.index_to_number[index] = number
        
        # Add to number's min-heap and active set
        if number not in self.number_to_indices:
            self.number_to_indices[number] = []
            self.number_active_indices[number] = set()
        heapq.heappush(self.number_to_indices[number], index)
        self.number_active_indices[number].add(index)

    def find(self, number: int) -> int:
        if number not in self.number_to_indices:
            return -1
        heap = self.number_to_indices[number]
        active = self.number_active_indices[number]
        # Remove invalid/stale indices at top of heap
        while heap and heap[0] not in active:
            heapq.heappop(heap)
        if not heap:
            return -1
        return heap[0]
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Constructor: O(1)
  - `change(index, number)`: O(log k), where k is the count of indices for that number (heap push, set discard/add).
  - `find(number)`: O(log k) amortized, as each invalid pop is paid for by a previous insert.
- **Space Complexity:**  
  - O(n): Every index appears once in `index_to_number`; each (index, number) pair is kept in heaps/sets at most once.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle deletions (removing an index completely)?  
  *Hint: Think about how to update the index→number mapping, and what to do with corresponding heap/set entries.*

- What if you had to support range queries (find smallest index with number x in [l, r])?  
  *Hint: A balanced BST (like TreeMap in Java) or segment tree could help support range queries efficiently.*

- Can this be scaled to large numbers of indices and queries?  
  *Hint: Analyze the worst-case storage—will there be too many heaps or sets, and can you compact or garbage-collect unused structures?*

### Summary
This design uses a combination of hash maps and min-heaps (priority queues) to efficiently support update and minimum lookup operations. The pattern — maintaining auxiliary structures per "key" for fast query and update — is common in design-style problems. Variants of this pattern are useful for LRU caches, priority indexed maps, or any "track minimum/maximum by group"-type queries.