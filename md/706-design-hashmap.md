### Leetcode 706 (Easy): Design HashMap [Practice](https://leetcode.com/problems/design-hashmap)

### Description  
Design a data structure from scratch that maps integer keys to integer values, supporting three primary operations:
- **put(key, value):** Insert or update the value for the given key.
- **get(key):** Retrieve the value for a given key. If the key does not exist, return -1.
- **remove(key):** Remove the key (and its value) from the map if it exists.

You may not use any built-in hash table libraries for your implementation.  
Design should ensure efficient insertion, retrieval, and deletion for up to a few thousand key-value pairs.

### Examples  

**Example 1:**  
Input:  
```
["MyHashMap", "put", "get", "remove", "get"]
[[], [1, 1], [1], [1], [1]]
```
Output:  
```
[null, null, 1, null, -1]
```
*Explanation:*
- MyHashMap() → initializes an empty map.
- put(1, 1) → adds key 1 with value 1.
- get(1) → returns 1.
- remove(1) → deletes the key 1.
- get(1) → now returns -1 as key 1 has been removed.

**Example 2:**  
Input:  
```
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 2], [2, 3], [1], [3], [2, 4], [2], [1], [1]]
```
Output:  
```
[null, null, null, 2, -1, null, 4, null, -1]
```
*Explanation:*
- put(1, 2) → adds key 1 with value 2.
- put(2, 3) → adds key 2 with value 3.
- get(1) → returns 2 (from first put).
- get(3) → returns -1 (not found).
- put(2, 4) → updates key 2 to value 4.
- get(2) → returns 4 (updated value).
- remove(1) → removes key 1.
- get(1) → returns -1 (was removed).

**Example 3:**  
Input:  
```
["MyHashMap", "put", "get", "put", "get"]
[[], [1000, 1], [1000], [1000, 2], [1000]]
```
Output:  
```
[null, null, 1, null, 2]
```
*Explanation:*
- put(1000, 1) → adds key 1000 with value 1.
- get(1000) → returns 1.
- put(1000, 2) → updates key 1000 to 2.
- get(1000) → returns 2 (updated value).

### Thought Process (as if you’re the interviewee)  
First, since we're not allowed to use a built-in hash table, we need to simulate the hashing mechanism.  
A brute-force approach would be a fixed-size array where the key is the index, but this wastes space and doesn't support arbitrary integer keys.  

A more typical choice is to use the idea of **hash buckets**, where:
- We create an array of fixed buckets (say, 1000).
- For any key, hash(key) = key mod number_of_buckets.
- Each bucket holds a list (or linked list) of (key, value) pairs in case of collisions (separate chaining).

For put/get/remove:
- Use the hash to find the bucket.
- Scan the bucket for the correct key to update, retrieve, or remove.

If the key range is very small, direct addressing is possible, but without constraints, the above scheme scales better in time and space.

**Trade-offs:**
- More buckets mean fewer collisions and faster operations but higher memory use.
- For a reasonable number of buckets (1000 for this problem), time per operation stays low for the given constraint (thousands of ops).
- Chaining (lists in buckets) is easy to code, and since each bucket is small, iteration is fast.

### Corner cases to consider  
- Operations on keys that don't exist (get and remove).
- Updating an existing key's value (should overwrite).
- Adding/removing the same key multiple times.
- Very large or very small (negative) key values (handle hash properly).
- Collisions: multiple keys mapping to the same bucket.

### Solution

```python
class MyHashMap:
    def __init__(self):
        # Use a fixed number of buckets.
        self.size = 1000
        self.buckets = [[] for _ in range(self.size)]

    def _hash(self, key):
        # Simple hash function: key mod number of buckets
        return key % self.size

    def put(self, key, value):
        idx = self._hash(key)
        # Iterate through the bucket to find key or insert/update
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx][i] = (key, value)  # update
                return
        self.buckets[idx].append((key, value))      # insert

    def get(self, key):
        idx = self._hash(key)
        for k, v in self.buckets[idx]:
            if k == key:
                return v
        return -1

    def remove(self, key):
        idx = self._hash(key)
        for i, (k, v) in enumerate(self.buckets[idx]):
            if k == key:
                self.buckets[idx].pop(i)
                return
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - Average O(1) for put/get/remove if hash function distributes keys well since the bucket size stays small.
  - Worst-case O(n) if all keys hash to same bucket, but unlikely given constraints.

- **Space Complexity:**  
  - O(n + m), where n = number of key-value pairs stored, m = number of buckets (fixed, e.g., 1000).
  - Each bucket is a small list, total storage is linear in number of elements.

### Potential follow-up questions (as if you’re the interviewer)  

- What if the number of keys grows much larger?  
  *Hint: How would you handle resizing and rehashing buckets?*

- How would you change your design to support string keys?  
  *Hint: What would you do about the hash function and equality comparison?*

- Can you improve worst-case time complexity for operations?  
  *Hint: Could you use a different structure in buckets (e.g., BSTs)?*

### Summary
This problem is a classic example of **hash table design with separate chaining**. It exercises knowledge of hash functions, collision resolution, and space-time tradeoffs.  
The approach is widely used in building dictionaries, sets, and caches, and forms the foundation for many real-world data structures.

### Tags
Array(#array), Hash Table(#hash-table), Linked List(#linked-list), Design(#design), Hash Function(#hash-function)

### Similar Problems
- Design HashSet(design-hashset) (Easy)
- Design Skiplist(design-skiplist) (Hard)