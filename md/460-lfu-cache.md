### Leetcode 460 (Hard): LFU Cache [Practice](https://leetcode.com/problems/lfu-cache)

### Description  
Design and implement a data structure for a Least Frequently Used (LFU) cache. Implement the LFUCache class with: LFUCache(int capacity) initializes the object, int get(int key) gets the value if key exists otherwise returns -1, void put(int key, int value) updates the value if present or inserts if not present. When the cache reaches capacity, it should invalidate and remove the least frequently used key before inserting a new item. For ties in frequency, the least recently used key is invalidated. Both get and put must run in O(1) average time complexity.

### Examples  

**Example 1:**  
Input: `["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]`  
       `[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]`  
Output: `[null, null, null, 1, null, -1, 3, null, -1, 3, 4]`  
*Explanation:*
*LFUCache lfu = new LFUCache(2);*
*lfu.put(1, 1); // cache=[1,_], cnt(1)=1*
*lfu.put(2, 2); // cache=[2,1], cnt(2)=1, cnt(1)=1*
*lfu.get(1); // return 1, cache=[1,2], cnt(2)=1, cnt(1)=2*
*lfu.put(3, 3); // 2 is LFU, invalidate 2, cache=[3,1], cnt(3)=1, cnt(1)=2*
*lfu.get(2); // return -1 (not found)*
*lfu.get(3); // return 3, cache=[3,1], cnt(3)=2, cnt(1)=2*
*lfu.put(4, 4); // tie between 1 and 3, but 1 is LRU, invalidate 1*


### Thought Process (as if you're the interviewee)  
This is more complex than LRU cache because we need to track both frequency and recency.

**Key Requirements:**
1. O(1) get and put operations
2. Track frequency of each key
3. On tie-breaking, use LRU policy
4. Remove LFU (then LRU) when capacity is exceeded

**Data Structures Needed:**
1. Hash map: key → Node (for O(1) access)
2. Hash map: frequency → doubly linked list of nodes with that frequency
3. Min frequency tracker: to quickly find the least frequent items

**Design Approach:**
- Each node stores key, value, and frequency
- Maintain frequency buckets (freq → DLL of nodes)
- Track minimum frequency for eviction
- When frequency changes, move node between frequency buckets
- Use DLL for O(1) insertion/deletion and LRU ordering within each frequency

**Operations:**
- get(): increment frequency, move to next frequency bucket, update min_freq
- put(): if exists, update like get(); if new and at capacity, evict LFU-LRU item


### Corner cases to consider  
- Capacity is 0: get should return -1, put should do nothing  
- Single item cache: Simple case to verify  
- All items have same frequency: Should use LRU policy  
- Updating existing key: Should increment frequency  


### Solution

```python
# Just like in interviews, please do not use python libraries to take shortcuts.
# They aren't usually allowed in real interviews.
# Add comments to each step of your logic

class Node:
    def __init__(self, key=0, value=0):
        self.key = key
        self.value = value
        self.freq = 1
        self.prev = None
        self.next = None

class DoublyLinkedList:
    def __init__(self):
        # Create dummy head and tail for easier operations
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0
    
    def add_to_head(self, node):
        # Add node right after head
        node.prev = self.head
        node.next = self.head.next
        self.head.next.prev = node
        self.head.next = node
        self.size += 1
    
    def remove_node(self, node):
        # Remove the given node
        node.prev.next = node.next
        node.next.prev = node.prev
        self.size -= 1
    
    def remove_tail(self):
        # Remove and return the last real node (before dummy tail)
        if self.size == 0:
            return None
        last_node = self.tail.prev
        self.remove_node(last_node)
        return last_node

class LFUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.size = 0
        self.min_freq = 0
        
        # Hash maps
        self.key_to_node = {}  # key -> node
        self.freq_to_list = {}  # frequency -> doubly linked list
    
    def _update_freq(self, node):
        # Remove node from current frequency list
        old_freq = node.freq
        old_list = self.freq_to_list[old_freq]
        old_list.remove_node(node)
        
        # If this was the only node with min_freq, update min_freq
        if old_freq == self.min_freq and old_list.size == 0:
            self.min_freq += 1
        
        # Increment frequency and add to new frequency list
        node.freq += 1
        new_freq = node.freq
        
        if new_freq not in self.freq_to_list:
            self.freq_to_list[new_freq] = DoublyLinkedList()
        
        self.freq_to_list[new_freq].add_to_head(node)
    
    def get(self, key):
        if key not in self.key_to_node:
            return -1
        
        node = self.key_to_node[key]
        self._update_freq(node)
        return node.value
    
    def put(self, key, value):
        if self.capacity == 0:
            return
        
        if key in self.key_to_node:
            # Update existing key
            node = self.key_to_node[key]
            node.value = value
            self._update_freq(node)
        else:
            # Insert new key
            if self.size >= self.capacity:
                # Remove LFU (and LRU if tie) item
                min_freq_list = self.freq_to_list[self.min_freq]
                node_to_remove = min_freq_list.remove_tail()
                del self.key_to_node[node_to_remove.key]
                self.size -= 1
            
            # Create new node
            new_node = Node(key, value)
            self.key_to_node[key] = new_node
            
            # Add to frequency 1 list
            if 1 not in self.freq_to_list:
                self.freq_to_list[1] = DoublyLinkedList()
            
            self.freq_to_list[1].add_to_head(new_node)
            self.min_freq = 1
            self.size += 1

```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) for both get and put operations. All hash map operations and doubly linked list operations (add/remove) are O(1).
- **Space Complexity:** O(capacity) - We store at most 'capacity' nodes in our data structures. The frequency maps and linked lists combined use linear space relative to the number of items stored.


### Potential follow-up questions (as if you're the interviewer)  

- How would you implement this if you also needed to support a "delete" operation?  
  *Hint: Similar to get, but remove the node from frequency list and key map without incrementing frequency*

- What if you needed to implement LFU with TTL (time-to-live) for each entry?  
  *Hint: Add timestamp to nodes and periodically clean up expired entries, or check expiration on access*

- How would you modify this to support different eviction policies (like LRU-K)?  
  *Hint: Track multiple access timestamps per node and use more sophisticated frequency calculations*

### Summary
LFU Cache combines concepts from hash tables and doubly linked lists to achieve O(1) performance. The key insight is maintaining separate doubly linked lists for each frequency level, allowing efficient access to the least frequently (and least recently) used items. The challenge lies in correctly updating frequencies and managing the minimum frequency tracker. This data structure demonstrates how complex caching policies can be implemented efficiently through careful design of supporting data structures.

### Tags
Hash Table(#hash-table), Linked List(#linked-list), Design(#design), Doubly-Linked List(#doubly-linked-list)

### Similar Problems
- LRU Cache(lru-cache) (Medium)
- Design In-Memory File System(design-in-memory-file-system) (Hard)