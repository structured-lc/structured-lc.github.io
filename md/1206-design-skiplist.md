### Leetcode 1206 (Hard): Design Skiplist [Practice](https://leetcode.com/problems/design-skiplist)

### Description  
Design a **Skiplist**, a probabilistic data structure that allows fast search, insertion, and deletion operations, all in average O(log n) time.  
In a skiplist, each node has multiple forward pointers spanning different "levels." Higher levels enable faster traversal by skipping more elements, similar to express lanes in a highway.  
You must implement these methods:  
- `search(target)`: Returns True if the target exists in the skiplist, otherwise False.  
- `add(num)`: Inserts the number into the skiplist (duplicates allowed).
- `erase(num)`: Removes one occurrence of the number from the skiplist. Returns True if removed, otherwise False. If multiple exist, any one occurrence may be removed.

### Examples  

**Example 1:**  
Input:  
`["Skiplist", "add", "add", "add", "search", "add", "search", "erase", "erase", "search"]`  
`[[], [1], [2], [3], , [4], [1], , [1], [1]]`  
Output:  
`[null, null, null, null, false, null, true, false, true, false]`  
Explanation.  
- Skiplist skiplist = new Skiplist()
- skiplist.add(1)
- skiplist.add(2)
- skiplist.add(3)
- skiplist.search(0) → False
- skiplist.add(4)
- skiplist.search(1) → True
- skiplist.erase(0) → False
- skiplist.erase(1) → True
- skiplist.search(1) → False (`1` was erased)[3][4]

### Thought Process (as if you’re the interviewee)  
First, typical linked lists don’t support efficient search, insert, or delete in log-time.  
A **skiplist** enhances efficiency by allowing rapid jumps across increasing “levels” (each node can have links that skip over 2, 4, 8, ... nodes). The more levels, the faster we can search.  
- **Brute-force:** Use an ordered list or linked list — but all search/add/erase are O(n).
- **Optimal:** Skiplist uses randomization so that:
    - Each node gets a `random_level` (the higher, the fewer).
    - At each level, we keep pointers that let us “skip” ahead.
    - To add, track update paths with an array, then re-route pointers at each affected level.
    - To search or erase, traverse top-down, left-to-right, always greedily jumping as far as possible.

Why skiplist? Performs closely to a balanced BST but easier to implement, supports duplicates, and is efficient for both search and update.

### Corner cases to consider  
- Inserting numbers already present (supports duplicates)
- Erasing a non-existent value (should safely return False)
- Completely empty skiplist (all operations should not crash)
- Inserting very large/small numbers
- Erasing a value when multiple exist (removes just one)
- Dynamic max level growth
- Searching for a value at head/tail/both ends

### Solution

```python
import random

class Node:
    def __init__(self, value, level):
        self.value = value
        self.forwards = [None] * (level + 1)

class Skiplist:
    MAX_LEVEL = 16  # Adjust as needed for practical use
    P_FACTOR = 0.5  # Probability of promoting to a higher level
    
    def __init__(self):
        self.head = Node(-1, Skiplist.MAX_LEVEL)  # Dummy head node
        self.level = 0  # Highest level
    
    def random_level(self):
        lvl = 0
        while random.random() < Skiplist.P_FACTOR and lvl < Skiplist.MAX_LEVEL:
            lvl += 1
        return lvl

    def search(self, target: int) -> bool:
        node = self.head
        # Traverse levels from top to bottom
        for i in range(self.level, -1, -1):
            while node.forwards[i] and node.forwards[i].value < target:
                node = node.forwards[i]
        node = node.forwards[0]
        return node is not None and node.value == target

    def add(self, num: int) -> None:
        update = [None] * (Skiplist.MAX_LEVEL + 1)
        node = self.head
        # Record nodes at each level needing update
        for i in range(self.level, -1, -1):
            while node.forwards[i] and node.forwards[i].value < num:
                node = node.forwards[i]
            update[i] = node
        lvl = self.random_level()
        if lvl > self.level:
            for i in range(self.level + 1, lvl + 1):
                update[i] = self.head
            self.level = lvl
        new_node = Node(num, lvl)
        for i in range(lvl + 1):
            new_node.forwards[i] = update[i].forwards[i]
            update[i].forwards[i] = new_node

    def erase(self, num: int) -> bool:
        update = [None] * (Skiplist.MAX_LEVEL + 1)
        node = self.head
        for i in range(self.level, -1, -1):
            while node.forwards[i] and node.forwards[i].value < num:
                node = node.forwards[i]
            update[i] = node
        target = node.forwards[0]
        if not target or target.value != num:
            return False
        for i in range(self.level + 1):
            if update[i].forwards[i] != target:
                continue
            update[i].forwards[i] = target.forwards[i]
        # Reduce level if upper levels become empty
        while self.level > 0 and self.head.forwards[self.level] is None:
            self.level -= 1
        return True
```

### Time and Space complexity Analysis  

- **Time Complexity:** Average O(log n) for `search`, `add`, and `erase`, since at each level, expected nodes traversed are halved.
- **Space Complexity:** O(add operations) — Each added node may appear in multiple levels, so total space is proportional to number of insertions, on average O(n).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle variable probability factors for different use-cases?  
  *Hint: Try adjusting P_FACTOR for performance trade-offs and analyze the impact on time / space efficiency.*

- Can you remove *all* occurrences of a given number at once?  
  *Hint: What about making `erase` remove repeatedly until search fails?*

- How could you persist a skiplist to disk for very large storage?  
  *Hint: Consider representing nodes as disk pages and using B+ Tree-style mechanisms.*

### Summary
This solution implements the classic **Skiplist** probabilistic data structure, leveraging randomization for O(log n) average-case efficiency in search, add, and erase.  
Skiplist is a commonly tested data structure pattern — comparable to balanced BSTs — and is useful for design interviews, ordered maps/sets, and building in-memory indexes where fast insert/search and support for duplicates is needed.


### Flashcard
Use a randomized multi-level linked list (skiplist) to achieve O(log n) average search, insert, and erase by promoting nodes to higher levels with probability.

### Tags
Linked List(#linked-list), Design(#design)

### Similar Problems
- Design HashSet(design-hashset) (Easy)
- Design HashMap(design-hashmap) (Easy)
- Design Linked List(design-linked-list) (Medium)