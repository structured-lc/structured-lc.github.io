### Leetcode 146 (Medium): LRU Cache [Practice](https://leetcode.com/problems/lru-cache)

### Description  
Implement an **LRU (Least Recently Used) cache**, a data structure that stores key-value pairs up to a fixed capacity.  
- Each time you `get(key)`, return the value if found (otherwise return -1), and mark the key as *most recently used*.
- Each time you `put(key, value)`, insert or update the key-value pair. If adding causes the cache to exceed its capacity, evict the *least recently used* key (the one not accessed for the longest time).
- Both `get` and `put` must run in **O(1) time**.

### Examples  

**Example 1:**  
Input:   
`["LRUCache","put","put","get","put","get","put","get","get"]`  
`[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]`  
Output:  
`[null,null,null,1,null,-1,null,-1,3,4]`  
*Explanation:*
- Initialize LRUCache with capacity 2.
- put(1,1): cache = {1=1}
- put(2,2): cache = {1=1, 2=2}
- get(1): returns 1, cache = {2=2, 1=1} (1 is most recently used)
- put(3,3): evicts key 2, cache = {1=1, 3=3}
- get(2): returns -1 (not found)
- put(4,4): evicts key 1, cache = {3=3, 4=4}
- get(1): returns -1 (evicted)
- get(3): returns 3
- get(4): returns 4

**Example 2:**  
Input:  
`["LRUCache","put","get","put","get"]`  
`[[1],[2,1],[2],[3,2],[2]]`  
Output:  
`[null,null,1,null,-1]`  
*Explanation:*
- Capacity = 1.
- put(2,1): {2=1}
- get(2): 1
- put(3,2): evicts 2, {3=2}
- get(2): -1

**Example 3:**  
Input:  
`["LRUCache","get","put","get"]`  
`[[1],,[0,2],]`  
Output:  
`[null,-1,null,2]`  
*Explanation:*
- get(0): -1 (cache empty)
- put(0,2): {0=2}
- get(0): 2

### Thought Process (as if you’re the interviewee)  
- **Brute-force:** Use a dictionary for fast lookups and a list to record usage order. Every `get`/`put` would require moving the accessed key to the end/start of the list (O(n)). Eviction would also be O(n).
- **Optimized Approach:** We want **O(1) operations**.  
  The standard way is to use a **doubly linked list** for maintaining usage order, and a **hash map** for fast (O(1)) key lookup.
  - Each time a key is accessed, move it to the *head* of the linked list.
  - If a new key is added and the cache is full, remove the *tail* node (i.e., least recently used).
  - Hash map holds key → node (so we can update and move in O(1)).
- **Why this works:**  
  The hash map gives O(1) access; the doubly linked list gives O(1) insertion and removal once the node is known, without scanning.  
  This is a classic "design" and data structure combo question, testing understanding of custom data structures and efficient operations.

### Corner cases to consider  
- get or put called on non-existing key (should return -1 or insert)
- repeated put on existing key (should update, not insert new)
- capacity is 1 (simplest eviction)
- all keys evicted (do we properly clear deleted references?)
- consecutive gets on keys for updates in usage order

### Solution

```python
class Node:
    def __init__(self, key, value):
        self.key = key
        self.value = value
        self.prev = None  # previous in linked list
        self.next = None  # next in linked list

class LRUCache:

    def __init__(self, capacity: int):
        self.cache = {}  # key -> Node
        self.capacity = capacity
        # Dummy head and tail - makes insert/remove logic much cleaner
        self.head = Node(0, 0)  # head.next is most recently used
        self.tail = Node(0, 0)  # tail.prev is least recently used
        self.head.next = self.tail
        self.tail.prev = self.head

    # Helper: remove node from current position
    def _remove(self, node):
        prev_node = node.prev
        next_node = node.next
        prev_node.next = next_node
        next_node.prev = prev_node

    # Helper: insert node right after head (most recently used)
    def _add(self, node):
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        node = self.cache[key]
        # Move node to front - most recently used
        self._remove(node)
        self._add(node)
        return node.value

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            # Remove the old node
            node = self.cache[key]
            self._remove(node)
        else:
            # If full, remove least recently used node
            if len(self.cache) == self.capacity:
                lru = self.tail.prev
                self._remove(lru)
                del self.cache[lru.key]
        # Insert new node at front
        new_node = Node(key, value)
        self._add(new_node)
        self.cache[key] = new_node
```

### Time and Space complexity Analysis  

- **Time Complexity:** All operations (`get`, `put`) are O(1), since hash map lookups and linked list insert/remove (when node is known) are O(1).
- **Space Complexity:** O(capacity), to store up to capacity nodes and hashmap entries.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle frequent insertions/evictions with many repeated keys?
  *Hint: Focus on updating existing values and avoiding stale references.*

- If values are very large objects, how does that affect your design?
  *Hint: Consider memory usage, pointers vs. object copies.*

- Can you implement a thread-safe (concurrent) LRU cache?
  *Hint: Think about locks or other synchronization methods.*

### Summary
This problem demonstrates the **Hash Map + Doubly Linked List** pattern, a classic approach for O(1) cache management.  
It's a common design used in memory caches, browser history, and session management—anywhere LRU eviction is beneficial.  
Being able to design LRU structures efficiently is a must-have for system design and interviews targeting scalable, high-performance code.