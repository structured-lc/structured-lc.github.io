### Leetcode 380 (Medium): Insert Delete GetRandom O(1) [Practice](https://leetcode.com/problems/insert-delete-getrandom-o1)

### Description  
Design a data structure `RandomizedSet` that supports three operations in average O(1) time:
- **insert(val):** Insert the integer `val` if it is not already present. Returns `True` if the value was added, `False` otherwise.
- **remove(val):** Remove the integer `val` if it is present. Returns `True` if the value existed and was removed, `False` otherwise.
- **getRandom():** Return a random element from the current set, with each element having equal probability.

The set must not allow duplicate entries and all elements must be unique.

### Examples  

**Example 1:**  
Input: `["RandomizedSet","insert","remove","insert","getRandom","remove","insert","getRandom"]`, `[[], [1], [2], [2], [], [1], [2], []]`  
Output: `[null, true, false, true, 2, true, false, 2]`  
*Explanation:*
- `insert(1) → True` (insert 1, set is now [1])
- `remove(2) → False` (2 not present)
- `insert(2) → True` (insert 2, set is now [1,2])
- `getRandom() → 2` (could return either 1 or 2)
- `remove(1) → True` (now only 2 remains)
- `insert(2) → False` (2 is already present)
- `getRandom() → 2` (only 2 is left)

**Example 2:**  
Input: `["RandomizedSet","insert","insert","remove","getRandom"]`, `[[], [3], [3], [3], []]`  
Output: `[null, true, false, true, null]`  
*Explanation:*
- `insert(3) → True` (set: [3])
- `insert(3) → False` (3 already inserted)
- `remove(3) → True` (set: [])
- `getRandom()` → Error/undefined since set is empty

**Example 3:**  
Input: `["RandomizedSet","insert","insert","getRandom","remove","getRandom"]`, `[[], , , [], , []]`  
Output: `[null, true, true, 10, true, 20]`  
*Explanation:*
- `insert(10)` and `insert(20)`, set: [10,20]
- `getRandom()` returns 10 or 20 with equal probability
- `remove(10)`, set: 
- `getRandom()` returns 20

### Thought Process (as if you’re the interviewee)  
First, I’d consider normal approaches:
- Using a **hash set** (built-in set): allows O(1) insert and remove. However, random access is O(n) because you have to convert to a list to pick a random entry.
- Using a **list**: allows O(1) getRandom, but O(n) for remove because we must find the index.

To get all three operations in O(1), combine **two data structures**:
- An **array** (`values`) to store elements for random access (getRandom).
- A **hash map** (`val_to_idx`) mapping value → its index in the array for constant-time lookup and deletion.

**Insert:**  
If val not in hash map, add val to end of array and record its index.

**Remove:**  
If val is in hash map, swap it with the last element in array, update hash map for the swapped value, then delete last element. This avoids O(n) shifting.

**GetRandom:**  
Pick a random index in array.

Trade-offs:
- This approach needs extra space for the map and array.
- All three operations are O(1) average time.

### Corner cases to consider  
- Removing or getting random from an **empty set**
- Insert and remove **duplicate values**
- Insert, remove, and getRandom with only **one element**
- **Multiple getRandom** after sequential inserts/removes
- **Negative numbers or large integers**
- Insert and remove very **large n** (stress test for efficiency)

### Solution

```python
import random

class RandomizedSet:
    def __init__(self):
        # Array to store values for O(1) random access
        self.values = []
        # Hash map: value → index in values array
        self.val_to_idx = {}

    def insert(self, val: int) -> bool:
        # If already present, don't insert
        if val in self.val_to_idx:
            return False
        # Add to array, map value to index
        self.val_to_idx[val] = len(self.values)
        self.values.append(val)
        return True

    def remove(self, val: int) -> bool:
        # Only remove if present
        if val not in self.val_to_idx:
            return False
        # Find index of element to remove
        idx = self.val_to_idx[val]
        # Move last element to idx and update map
        last_val = self.values[-1]
        self.values[idx] = last_val
        self.val_to_idx[last_val] = idx
        # Remove last element from array and val from map
        self.values.pop()
        del self.val_to_idx[val]
        return True

    def getRandom(self) -> int:
        # Returns a random value from array
        return random.choice(self.values)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `insert`: O(1) average (hash map + list append)  
  - `remove`: O(1) average (hash map lookup, swap + pop)  
  - `getRandom`: O(1) (random index lookup in array)
- **Space Complexity:**  
  - O(n) — up to n elements in both list and hash map.

### Potential follow-up questions (as if you’re the interviewer)  

- How would you modify the structure to allow **duplicate elements**?
  *Hint: Use a hash map to map each value to a set of indices instead of just one index.*

- What if you need to track **the probability** of each element being picked with different weights?
  *Hint: Think about Prefix Sum arrays or alias method for weighted random selection.*

- Can you implement **getRandom in O(1)** if the structure is changed to a Linked List?
  *Hint: Linked lists do not support random access, so you may need a different approach or additional pointers/arrays.*

### Summary
For constant-time insert, delete, and getRandom, combine a **hash map** (for fast lookup and removal) with a **list** (for O(1) random access and compact removal by swapping).  
This is a common pattern for data structures requiring both fast lookup and fast modification, and it shows up in randomized algorithms and custom LRU caches.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Design(#design), Randomized(#randomized)

### Similar Problems
- Insert Delete GetRandom O(1) - Duplicates allowed(insert-delete-getrandom-o1-duplicates-allowed) (Hard)