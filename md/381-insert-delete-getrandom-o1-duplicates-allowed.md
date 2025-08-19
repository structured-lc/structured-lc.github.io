### Leetcode 381 (Hard): Insert Delete GetRandom O(1) - Duplicates allowed [Practice](https://leetcode.com/problems/insert-delete-getrandom-o1-duplicates-allowed)

### Description  
Design a data structure that allows:
- **Insert** an integer value—even if it already exists in the data structure.
- **Remove** a specific integer, deleting only one occurrence if duplicates exist.
- **Get a random element**, with each element's chance proportional to how often it appears.
All operations must run in average **O(1)** time.  
Duplicates are allowed, so the data structure is essentially a multiset or "bag".

### Examples  

**Example 1:**  
Input:  
`insert(1)`, `insert(1)`, `insert(2)`, `getRandom()`, `remove(1)`, `getRandom()`  
Output:  
`True`, `False`, `True`, `1 or 2`, `True`, `1 or 2`  
Explanation:  
- `insert(1)` → returns True (first time for 1).  
- `insert(1)` → returns False (1 already present).  
- `insert(2)` → returns True (first time for 2).  
- `getRandom()` → returns 1 with probability 2⁄3, 2 with 1⁄3, since collection is `[1,1,2]`.  
- `remove(1)` → returns True, now collection is `[1,2]`.  
- `getRandom()` → returns 1 or 2 with probability 1⁄2 each.

**Example 2:**  
Input:  
`insert(4)`, `insert(4)`, `insert(4)`, `remove(4)`, `getRandom()`  
Output:  
`True`, `False`, `False`, `True`, `4`  
Explanation:  
- Multiple inserts return False after the first.  
- `remove(4)` removes just one 4, so collection is `[4,4]`.  
- `getRandom()` always picks 4.

**Example 3:**  
Input:  
`insert(10)`, `remove(10)`, `getRandom()`  
Output:  
`True`, `True`, `N/A or error`  
Explanation:  
- After removing 10, collection is empty; `getRandom()` would handle or error as appropriate.

### Thought Process (as if you’re the interviewee)  
First, let's break down the needed operations and their challenges:

- **Insert:** With duplicates, a simple set is not enough. We can use a dynamic array (list) to store elements (fast random access) and a hashmap to map values to all their indices in the list.
- **Remove:** Need to remove only one occurrence. If we can always delete the last element in O(1), then for an arbitrary element, we swap it with the last element and pop.
- **GetRandom:** Use a list for O(1) access and random.choice.

Initial approach:
- Use a list, but tracking indices for duplicates is tricky. With only a set for positions, removal would be O(n).
- Optimize by using a hashmap where the value points to a set of indices in the list, allowing O(1) removal.

**Chosen design:**
- List (`nums`) stores actual values.  
- Dictionary (`idx_map`): maps value → set of all its indices in `nums`.

**Trade-offs:**  
- Storing sets as values in hashmap can make removal O(1) by popping any index.
- List enables fast random access for getRandom.

### Corner cases to consider  
- Insert and remove on an empty collection.
- Removing elements not present at all.
- Removing when multiple copies exist.
- Random element retrieval from empty collection.
- Operations with only one element in the collection.
- Sequence of many insert/remove operations causing reallocations.

### Solution

```python
import random

class RandomizedCollection:
    def __init__(self):
        # nums: stores elements (including duplicates)
        self.nums = []
        # idx_map: val -> set of indices in nums for this val
        self.idx_map = {}

    def insert(self, val: int) -> bool:
        # Insert to nums
        inserted = val not in self.idx_map
        self.nums.append(val)
        if val in self.idx_map:
            self.idx_map[val].add(len(self.nums) - 1)
        else:
            self.idx_map[val] = {len(self.nums) - 1}
        return inserted

    def remove(self, val: int) -> bool:
        # If not present, return False
        if val not in self.idx_map or not self.idx_map[val]:
            return False
        # Remove one index belonging to val
        remove_idx = self.idx_map[val].pop()
        last_val = self.nums[-1]
        # Move last element to remove_idx
        self.nums[remove_idx] = last_val
        # Update idx_map for moved last_val, if it's not the val we're removing
        if remove_idx != len(self.nums) - 1:
            self.idx_map[last_val].remove(len(self.nums) - 1)
            self.idx_map[last_val].add(remove_idx)
        # Remove last element
        self.nums.pop()
        # Clean up idx_map entry if empty
        if not self.idx_map[val]:
            del self.idx_map[val]
        return True

    def getRandom(self) -> int:
        # Return random element from nums
        return random.choice(self.nums)
```

### Time and Space complexity Analysis  

- **Time Complexity:**  
  - `insert(val)`: O(1) average, set add and list append.
  - `remove(val)`: O(1) average, because set remove, swap with last, update maps.
  - `getRandom()`: O(1), random access by index.
- **Space Complexity:** O(n), for the list of elements and the hashmap/set of their indices. n = total number of elements (counting duplicates).

### Potential follow-up questions (as if you’re the interviewer)  

- How would you handle getRandom if the collection is empty?  
  *Hint: Should it raise an exception or return a special value?*

- Is it possible to make all operations worst-case O(1), not just average-case?  
  *Hint: Discuss Python's set performance and possible rare slowdowns.*

- How would your solution change if duplicates were not allowed?  
  *Hint: Could you simplify the index structure?*

### Summary
This problem uses the **HashMap + Array** pattern for O(1) insert, remove, and random retrieval, cleverly supporting duplicates by mapping values to sets of indices. It's a classic use of dual data structures to get both fast lookup and random access—this approach also appears in problems like "Insert Delete GetRandom O(1)" (no duplicates), and random shuffling or set data structure interview questions.

### Tags
Array(#array), Hash Table(#hash-table), Math(#math), Design(#design), Randomized(#randomized)

### Similar Problems
- Insert Delete GetRandom O(1)(insert-delete-getrandom-o1) (Medium)