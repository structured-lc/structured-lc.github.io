### Leetcode 705 (Easy): Design HashSet [Practice](https://leetcode.com/problems/design-hashset)

### Description  
Implement a data structure called **MyHashSet** that simulates a set of unique integers.  
You need to support the following operations — without using any built-in hash set or hash table libraries:
- **add(key):** Inserts key into the set.
- **remove(key):** Removes key from the set; if key not present, do nothing.
- **contains(key):** Returns True if key is present in the set, False otherwise.

The challenge is to get **O(1)** time complexity for all operations, and to do so without wasting memory (the possible key range is 0 to 1,000,000).


### Examples  

**Example 1:**  
Input:  
`["MyHashSet", "add", "add", "contains", "contains", "add", "contains", "remove", "contains"]`,  
`[[], [1], [2], [1], [3], [2], [2], [2], [2]]`  
Output:  
`[null, null, null, true, false, null, true, null, false]`  
*Explanation:*
- MyHashSet myHashSet = MyHashSet()
- myHashSet.add(1) → set = [1]
- myHashSet.add(2) → set = [1, 2]
- myHashSet.contains(1) → true
- myHashSet.contains(3) → false (3 not in set)
- myHashSet.add(2) → set = [1,2] (no effect)
- myHashSet.contains(2) → true
- myHashSet.remove(2) → set = [1]
- myHashSet.contains(2) → false

**Example 2:**  
Input:  
`["MyHashSet", "add", "contains", "add", "remove", "contains"]`,  
`[[], , , , , ]`  
Output:  
`[null, null, true, null, null, false]`  
*Explanation:*
- MyHashSet myHashSet = MyHashSet()
- myHashSet.add(10) → set = 
- myHashSet.contains(10) → true
- myHashSet.add(10) → set = 
- myHashSet.remove(10) → set = []
- myHashSet.contains(10) → false

**Example 3:**  
Input:  
`["MyHashSet", "add", "add", "remove", "contains"]`,  
`[[], [999999], , [999999], ]`  
Output:  
`[null, null, null, null, true]`  
*Explanation:*
- MyHashSet myHashSet = MyHashSet()
- myHashSet.add(999999) → set = [999999]
- myHashSet.add(0) → set = [999999,0]
- myHashSet.remove(999999) → set = 
- myHashSet.contains(0) → true

### Thought Process (as if you’re the interviewee)  
First, I consider a brute-force approach: Use a simple list and search for each operation — but that leads to O(n) operations, which is too slow.

A naive array of size 1,000,001 (where index = key) supports O(1) operations, but wastes huge amounts of space if only a few keys get stored for large keyspace.

To save space and still provide O(1) lookups, we can use a hash table design — an array of buckets (using modulo operator to index), and handle collisions by chaining (using Python lists or linked lists). For simple implementation and since our key range and operations are limited, initializing the array of booleans (index = key) is acceptable for this problem, but in interview I'd mention the more space-efficient design with buckets if keyspace isn't small.

For the cleanest O(1) solution under these constraints, I will proceed with a direct-address table (boolean array).

### Corner cases to consider  
- Adding an existing key (should have no effect)
- Removing a key not present (should not error)
- Contains for a key never added or already removed (should return false)
- Edge keys: 0, 1,000,000
- Very large number of add/remove operations
- Only one key added, or no keys at all

### Solution

```python
class MyHashSet:
    def __init__(self):
        # Use a direct-address table, with a fixed array for key range 0..1_000_000
        self.data = [False] * 1000001  # Each index represents if the key is present

    def add(self, key: int) -> None:
        self.data[key] = True  # Mark key as present

    def remove(self, key: int) -> None:
        self.data[key] = False  # Mark key as not present

    def contains(self, key: int) -> bool:
        return self.data[key]  # True if present; else False
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  All operations (`add`, `remove`, `contains`) take O(1) time, since we directly index into the array.

- **Space Complexity:**  
  O(1,000,001) for the boolean array, which is independent of the number of keys stored but depends on the key range.  
  If the key range was much larger or not fixed, a more space-efficient method (hashing plus chaining) would be necessary.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle string or generic keys instead of integers in a fixed range?  
  *Hint: Think about general-purpose hash functions and resolving collisions.*

- How would you improve memory usage if only a small number of possible keys get inserted?  
  *Hint: Consider bucket-based hashing, dynamic resizing, or linked lists for chaining.*

- What if you need to support dynamic key ranges (e.g., arbitrary large/small integers)?  
  *Hint: Discuss using dictionaries/map and generic hash table implementations.*

### Summary
This problem is a classic demonstration of the **direct-address table** and basic hash set design pattern. The O(1) array approach works only for small, fixed key ranges.  
In interviews, always clarify constraints and highlight options like bucket hashing (separate chaining) when space is a concern or when working with arbitrary keys. This pattern also applies to problems like map/dictionary implementation, caches, or frequency tables.

### Tags
Array(#array), Hash Table(#hash-table), Linked List(#linked-list), Design(#design), Hash Function(#hash-function)

### Similar Problems
- Design HashMap(design-hashmap) (Easy)
- Design Skiplist(design-skiplist) (Hard)