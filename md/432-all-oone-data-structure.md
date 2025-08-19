### Leetcode 432 (Hard): All O`one Data Structure [Practice](https://leetcode.com/problems/all-oone-data-structure)

### Description  
Design a data structure to store the strings' count with the ability to return the strings with minimum and maximum counts.

Implement the `AllOne` class:
- `AllOne()` Initializes the object of the data structure.
- `inc(string key)` Increments the count of the string key by 1. If key does not exist in the data structure, insert it with count 1.
- `dec(string key)` Decrements the count of the string key by 1. If the count of key is 0 after the decrement, remove it from the data structure. It is guaranteed that key exists in the data structure before the decrement.
- `getMaxKey()` Returns one of the keys with the maximal count. If no element exists, return an empty string "".
- `getMinKey()` Returns one of the keys with the minimal count. If no element exists, return an empty string "".

Note that each function must run in O(1) average time complexity.

### Examples  

**Example 1:**  
Input: `["AllOne", "inc", "inc", "getMaxKey", "getMinKey", "inc", "getMaxKey", "getMinKey"]`  
       `[[], ["hello"], ["hello"], [], [], ["leet"], [], []]`  
Output: `[null, null, null, "hello", "hello", null, "hello", "leet"]`  
*Explanation: AllOne allOne = new AllOne(); allOne.inc("hello"); allOne.inc("hello"); allOne.getMaxKey(); // return "hello" allOne.getMinKey(); // return "hello" allOne.inc("leet"); allOne.getMaxKey(); // return "hello" allOne.getMinKey(); // return "leet"*

### Thought Process (as if you're the interviewee)  
This problem requires O(1) operations for all methods, which means we need efficient data structures. The key challenges:

1. **Track counts**: Need to map keys to their counts
2. **Find min/max efficiently**: Need to quickly access keys with minimum and maximum counts
3. **Update operations**: Increment/decrement must maintain the min/max efficiently

Approaches:
1. **HashMap + Doubly Linked List**: Use DLL to maintain count order, HashMap for O(1) access
2. **HashMap + TreeMap**: TreeMap for ordered counts, but operations might not be O(1)
3. **Multiple HashMaps**: Separate maps for different counts

The HashMap + Doubly Linked List approach with count buckets is optimal.

### Corner cases to consider  
- Empty data structure
- Single key operations
- All keys have same count
- Key count becomes 0 (removal)
- Multiple keys with same min/max count
- Large number of unique counts

### Solution

```python
class AllOne:
    def __init__(self):
        # Node structure for doubly linked list
        class CountNode:
            def __init__(self, count):
                self.count = count
                self.keys = set()  # Keys with this count
                self.prev = None
                self.next = None
        
        # HashMap to store key -> count mapping
        self.key_count = {}
        
        # HashMap to store count -> CountNode mapping
        self.count_node = {}
        
        # Dummy head and tail for doubly linked list
        self.head = CountNode(0)  # Dummy head
        self.tail = CountNode(float('inf'))  # Dummy tail
        self.head.next = self.tail
        self.tail.prev = self.head
    
    def _add_node_after(self, prev_node, count):
        """Add a new count node after prev_node."""
        new_node = AllOne.CountNode(count)
        new_node.prev = prev_node
        new_node.next = prev_node.next
        prev_node.next.prev = new_node
        prev_node.next = new_node
        self.count_node[count] = new_node
        return new_node
    
    def _remove_node(self, node):
        """Remove a count node from the linked list."""
        node.prev.next = node.next
        node.next.prev = node.prev
        del self.count_node[node.count]
    
    def inc(self, key):
        if key in self.key_count:
            # Key exists, increment count
            old_count = self.key_count[key]
            new_count = old_count + 1
            
            # Update key_count mapping
            self.key_count[key] = new_count
            
            # Remove key from old count node
            old_node = self.count_node[old_count]
            old_node.keys.remove(key)
            
            # Find or create new count node
            if new_count not in self.count_node:
                # Create new node after old_node
                new_node = self._add_node_after(old_node, new_count)
            else:
                new_node = self.count_node[new_count]
            
            # Add key to new count node
            new_node.keys.add(key)
            
            # Remove old node if empty
            if not old_node.keys:
                self._remove_node(old_node)
        else:
            # New key, count = 1
            self.key_count[key] = 1
            
            # Find or create count node for 1
            if 1 not in self.count_node:
                # Add after head
                new_node = self._add_node_after(self.head, 1)
            else:
                new_node = self.count_node[1]
            
            new_node.keys.add(key)
    
    def dec(self, key):
        old_count = self.key_count[key]
        
        # Remove key from old count node
        old_node = self.count_node[old_count]
        old_node.keys.remove(key)
        
        if old_count == 1:
            # Remove key completely
            del self.key_count[key]
        else:
            # Decrement count
            new_count = old_count - 1
            self.key_count[key] = new_count
            
            # Find or create new count node
            if new_count not in self.count_node:
                # Create new node before old_node
                new_node = self._add_node_after(old_node.prev, new_count)
            else:
                new_node = self.count_node[new_count]
            
            # Add key to new count node
            new_node.keys.add(key)
        
        # Remove old node if empty
        if not old_node.keys:
            self._remove_node(old_node)
    
    def getMaxKey(self):
        # Last non-dummy node has maximum count
        if self.tail.prev == self.head:
            return ""  # No keys
        return next(iter(self.tail.prev.keys))
    
    def getMinKey(self):
        # First non-dummy node has minimum count
        if self.head.next == self.tail:
            return ""  # No keys
        return next(iter(self.head.next.keys))

# Alternative implementation using different approach
class AllOneAlternative:
    def __init__(self):
        from collections import defaultdict
        
        # Key to count mapping
        self.key_count = {}
        
        # Count to set of keys mapping
        self.count_keys = defaultdict(set)
        
        # Track min and max counts
        self.min_count = 0
        self.max_count = 0
    
    def inc(self, key):
        old_count = self.key_count.get(key, 0)
        new_count = old_count + 1
        
        # Update key_count
        self.key_count[key] = new_count
        
        # Update count_keys
        if old_count > 0:
            self.count_keys[old_count].remove(key)
            if not self.count_keys[old_count] and old_count == self.min_count:
                self.min_count += 1
        else:
            self.min_count = 1
        
        self.count_keys[new_count].add(key)
        self.max_count = max(self.max_count, new_count)
    
    def dec(self, key):
        old_count = self.key_count[key]
        
        # Remove from old count
        self.count_keys[old_count].remove(key)
        
        if old_count == 1:
            # Remove key completely
            del self.key_count[key]
            if not self.count_keys[1]:
                self._update_min_count()
        else:
            new_count = old_count - 1
            self.key_count[key] = new_count
            self.count_keys[new_count].add(key)
            
            if old_count == self.min_count and not self.count_keys[old_count]:
                self.min_count = new_count
        
        # Update max_count if needed
        if not self.count_keys[self.max_count]:
            self._update_max_count()
    
    def _update_min_count(self):
        if not self.key_count:
            self.min_count = 0
        else:
            for count in range(1, self.max_count + 1):
                if self.count_keys[count]:
                    self.min_count = count
                    break
    
    def _update_max_count(self):
        if not self.key_count:
            self.max_count = 0
        else:
            for count in range(self.max_count, 0, -1):
                if self.count_keys[count]:
                    self.max_count = count
                    break
    
    def getMaxKey(self):
        if self.max_count == 0:
            return ""
        return next(iter(self.count_keys[self.max_count]))
    
    def getMinKey(self):
        if self.min_count == 0:
            return ""
        return next(iter(self.count_keys[self.min_count]))

# Simple but not O(1) implementation for comparison
class AllOneSimple:
    def __init__(self):
        from collections import defaultdict
        self.key_count = defaultdict(int)
    
    def inc(self, key):
        self.key_count[key] += 1
    
    def dec(self, key):
        self.key_count[key] -= 1
        if self.key_count[key] == 0:
            del self.key_count[key]
    
    def getMaxKey(self):
        if not self.key_count:
            return ""
        max_count = max(self.key_count.values())
        for key, count in self.key_count.items():
            if count == max_count:
                return key
        return ""
    
    def getMinKey(self):
        if not self.key_count:
            return ""
        min_count = min(self.key_count.values())
        for key, count in self.key_count.items():
            if count == min_count:
                return key
        return ""
```

### Time and Space complexity Analysis  

- **Time Complexity:** O(1) for all operations (inc, dec, getMaxKey, getMinKey) in the optimal solution using doubly linked list.
- **Space Complexity:** O(n) where n is the number of unique keys. Each key appears in exactly one count bucket.

### Potential follow-up questions (as if you're the interviewer)  

- How would you modify this to support getting all keys with min/max count?  
  *Hint: Return the entire set instead of just one key, or provide an iterator interface.*

- What if you needed to support range queries (keys with count between x and y)?  
  *Hint: Use additional data structures like balanced BST to maintain count ordering.*

- How would you handle very large counts that might cause integer overflow?  
  *Hint: Use appropriate data types or implement custom arithmetic for very large numbers.*

- Can you optimize space usage if most keys have similar counts?  
  *Hint: Use sparse representations or compress count ranges with similar patterns.*

### Summary
This problem demonstrates advanced data structure design requiring multiple components working together to achieve O(1) complexity. The key insight is using a doubly linked list to maintain count ordering while using hash maps for O(1) key lookups. The count buckets approach efficiently handles the dynamic nature of count changes while maintaining quick access to min/max elements. This pattern is fundamental in designing high-performance caching systems, real-time analytics, and database indexing structures where fast access to extremal values is crucial.

### Tags
Hash Table(#hash-table), Linked List(#linked-list), Design(#design), Doubly-Linked List(#doubly-linked-list)

### Similar Problems
